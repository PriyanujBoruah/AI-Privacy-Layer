import { Hono, Context } from "hono";
import { tokenize, rehydrate } from "../tokenizer/engine";
import { saveTokenSession, getTokenSession, purgeTokenSession } from "../vault/session";
import { computeSha256Fingerprint } from "../vault/crypto";
import { recordAuditEvent, recordApiCallLog, AuditEntitySummary } from "../audit/logger";
import {
  resolveClientIdentifier,
  checkFreeTierRateLimit,
  checkRateLimit,
  checkDailyLimit,
  createRateLimitErrorPayload,
  createDailyLimitErrorPayload,
  getRateLimitHeaders,
  getDailyLimitHeaders,
} from "../auth/rate_limiter";
import { verifyFirebaseIdToken } from "../auth/firebase";
import { getUserProfile } from "../auth/profile";

export interface Env {
  DB?: D1Database;
}

const MAX_PAYLOAD_BYTES = 1_048_576; // 1 MB payload limit safeguard for Edge isolates

/**
 * Data De-identification & Reversible Tokenization Engine Router
 */
const tokenizationApp = new Hono<{ Bindings: Env }>();

/**
 * Extract Custom Enterprise Entities/Keywords from request headers
 */
function resolveCustomKeywords(c: Context): string[] {
  const headerVal = c.req.header("x-custom-entities") || c.req.header("x-custom-keywords");
  if (!headerVal) return [];

  try {
    const trimmed = headerVal.trim();
    if (trimmed.startsWith("[")) {
      return JSON.parse(trimmed);
    }
    return trimmed.split(",").map((s: string) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Extract Detection Categories from request body or headers
 */
function resolveCategories(c: Context, bodyCategories?: string[]): string[] {
  if (Array.isArray(bodyCategories) && bodyCategories.length > 0) {
    return bodyCategories;
  }
  const headerVal = c.req.header("x-detection-categories") || c.req.header("x-categories");
  if (!headerVal) return [];

  try {
    const trimmed = headerVal.trim();
    if (trimmed.startsWith("[")) {
      return JSON.parse(trimmed);
    }
    return trimmed.split(",").map((s: string) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Extract customer BYOK encryption key
 */
function resolveEncryptionKey(c: Context, bodyKey?: string): string | undefined {
  const headerKey = c.req.header("x-vault-encryption-key");
  if (headerKey && headerKey.trim().length > 0) {
    return headerKey.trim();
  }
  if (bodyKey && bodyKey.trim().length > 0) {
    return bodyKey.trim();
  }
  return undefined;
}

// =========================================================================
// 1. Data De-identification API: POST /tokenize (Anonymize Payload)
// =========================================================================
tokenizationApp.post("/tokenize", async (c) => {
  const startTime = performance.now();
  try {
    const body = await c.req.json<{
      text: string;
      mode?: "structural" | "fpe";
      categories?: string[];
      customKeywords?: string[];
      ttlSeconds?: number;
      encryptionKey?: string;
    }>();

    if (!body.text || typeof body.text !== "string") {
      return c.json(
        { error: { type: "invalid_request_error", message: "Field 'text' is required." } },
        400
      );
    }

    // Top-level payload limit check to prevent edge isolate CPU/memory exhaustion
    if (body.text.length > MAX_PAYLOAD_BYTES) {
      return c.json(
        { error: { type: "payload_too_large", message: "Payload text exceeds maximum size limit of 1MB." } },
        413
      );
    }

    // Enforce Rate Limiting: Pro Tier (1 req / 5s) vs Free Tier (1 req / 15s)
    const apiKeyRecord = (c as any).get("apiKeyRecord");
    const authHeader = c.req.header("Authorization") || "";
    let clientUserId = apiKeyRecord?.user_id;
    if (!clientUserId && authHeader.startsWith("Bearer ") && !authHeader.toLowerCase().startsWith("bearer spg_")) {
      const token = authHeader.slice(7).trim();
      const fbUser = await verifyFirebaseIdToken(token);
      if (fbUser) clientUserId = fbUser.uid;
    }
    if (!clientUserId) {
      const userTokenHeader = c.req.header("x-user-token") || "";
      if (userTokenHeader) {
        const fbUser = await verifyFirebaseIdToken(userTokenHeader.replace(/^Bearer /i, "").trim());
        if (fbUser) clientUserId = fbUser.uid;
      }
    }

    let profile: any = null;
    if (clientUserId) {
      profile = await getUserProfile(c.env, clientUserId);
    }

    const isEnterpriseOrByok = apiKeyRecord && (apiKeyRecord.tier === "enterprise" || apiKeyRecord.tier === "byok");
    const clientId = resolveClientIdentifier(c, apiKeyRecord, clientUserId);
    const bypassTest = c.req.header("x-test-bypass-rate-limit") === "true";

    if (!isEnterpriseOrByok) {
      const isPro = apiKeyRecord?.tier === "pro" || profile?.accessLevel === "Pro";
      const tier = isPro ? "pro" : "free";
      const rateLimit = await checkRateLimit(clientId, c.env, {
        tier,
        bypassTest,
      });
      if (!rateLimit.allowed) {
        return c.json(
          createRateLimitErrorPayload(rateLimit.retryAfterSec, tier),
          429,
          getRateLimitHeaders(rateLimit.retryAfterSec, tier)
        );
      }
    }

    // Enforce daily request limits (150 req/day for platform keys, 10,000 req/day for BYOK)
    const dailyLimit = await checkDailyLimit(clientId, c.env, {
      isByok: isEnterpriseOrByok,
      bypassTest,
    });
    if (!dailyLimit.allowed) {
      return c.json(
        createDailyLimitErrorPayload(dailyLimit.limit, dailyLimit.used, dailyLimit.resetsInSeconds, isEnterpriseOrByok),
        429,
        getDailyLimitHeaders(dailyLimit.limit, dailyLimit.remaining, dailyLimit.resetsInSeconds)
      );
    }

    const categories = resolveCategories(c, body.categories);
    const ttlSeconds = body.ttlSeconds && body.ttlSeconds > 0 ? Math.min(body.ttlSeconds, 86400) : 300;
    const headerKeywords = resolveCustomKeywords(c);
    const combinedKeywords = Array.from(
      new Set([
        ...(body.customKeywords || []),
        ...headerKeywords,
      ])
    );
    const encryptionKey = resolveEncryptionKey(c, body.encryptionKey);

    const tokenResult = tokenize(body.text, {
      customKeywords: combinedKeywords,
      mode: body.mode || "structural",
      categories,
    });
    const sessionId = `sess_tok_${Math.random().toString(36).substring(2, 12)}`;

    let executionCtx;
    try {
      executionCtx = c.executionCtx;
    } catch {
      // In unit tests or runtimes without execution context
    }

    const { expiresAt, isEncrypted } = await saveTokenSession(
      c.env?.DB,
      sessionId,
      tokenResult.tokenMap,
      ttlSeconds,
      executionCtx,
      encryptionKey
    );

    const engineLatencyUs = Math.round((performance.now() - startTime) * 1000);

    // Compute non-PII SHA-256 fingerprints for SIEM telemetry
    const entitySummaries: AuditEntitySummary[] = [];
    for (const [token, originalVal] of Object.entries(tokenResult.tokenMap)) {
      const fingerprint = await computeSha256Fingerprint(originalVal);
      const entity = tokenResult.entitiesDetected.find((e) => e.token === token);
      entitySummaries.push({
        ruleId: entity?.type || "RULE_GENERIC",
        token,
        fingerprint,
      });
    }

    // Emit compliance SIEM audit event
    recordAuditEvent(
      {
        eventType: "PROMPT_INTERCEPTED",
        sessionId,
        categoriesApplied: tokenResult.categoriesApplied || ["global"],
        entitiesCount: tokenResult.count,
        entities: entitySummaries,
        engineLatencyUs,
        kmsEncrypted: isEncrypted,
      },
      executionCtx
    );

    // Record API Call Usage Log (model, token count, protected entity count, timestamp, API key)
    const apiKeyId = apiKeyRecord?.id || "anonymous";
    const apiKeyPrefix = apiKeyRecord?.key_prefix || "none";
    const userId = apiKeyRecord?.user_id || undefined;
    const promptTokens = Math.max(1, Math.ceil(body.text.length / 4));

    recordApiCallLog(
      {
        userId,
        apiKeyId,
        apiKeyPrefix,
        model: body.mode === "fpe" ? "tokenizer-fpe" : "tokenizer-structural",
        promptTokens,
        completionTokens: 0,
        totalTokens: promptTokens,
        protectedEntityCount: tokenResult.count,
        statusCode: 200,
        latencyMs: Math.round(performance.now() - startTime),
      },
      c.env,
      executionCtx
    );

    return c.json(
      {
        mode: tokenResult.mode,
        sessionId,
        sanitizedText: tokenResult.sanitizedText,
        entitiesCount: tokenResult.count,
        entitiesDetected: tokenResult.entitiesDetected,
        categoriesApplied: tokenResult.categoriesApplied,
        expiresAt,
        isEncrypted,
      },
      200,
      {
        "X-Kms-Status": isEncrypted ? "encrypted" : "active",
      }
    );
  } catch (err: any) {
    return c.json(
      { error: { type: "invalid_request_error", message: err?.message || "Failed to process tokenization request." } },
      400
    );
  }
});

// =========================================================================
// 2. Reversible Tokenization API: POST /detokenize (Rehydrate Payload)
// =========================================================================
tokenizationApp.post("/detokenize", async (c) => {
  const startTime = performance.now();
  try {
    const body = await c.req.json<{
      sessionId: string;
      tokenizedText: string;
      purgeAfterRead?: boolean;
      encryptionKey?: string;
    }>();

    if (!body.sessionId || !body.tokenizedText) {
      return c.json(
        { error: { type: "invalid_request_error", message: "Fields 'sessionId' and 'tokenizedText' are required." } },
        400
      );
    }

    if (body.tokenizedText.length > MAX_PAYLOAD_BYTES) {
      return c.json(
        { error: { type: "payload_too_large", message: "Payload tokenizedText exceeds maximum size limit of 1MB." } },
        413
      );
    }

    const encryptionKey = resolveEncryptionKey(c, body.encryptionKey);

    let tokenMap: Record<string, string> | null;
    try {
      tokenMap = await getTokenSession(c.env?.DB, body.sessionId, encryptionKey);
    } catch (kmsErr: any) {
      return c.json(
        { error: { type: "kms_decryption_error", message: kmsErr.message } },
        401
      );
    }

    if (!tokenMap) {
      return c.json(
        { error: { type: "session_expired_error", message: `Session '${body.sessionId}' not found or expired.` } },
        404
      );
    }

    const rehydratedText = rehydrate(body.tokenizedText, tokenMap);

    let tokensResolved = 0;
    for (const token of Object.keys(tokenMap)) {
      if (body.tokenizedText.includes(token)) {
        tokensResolved++;
      }
    }

    let sessionStatus = "active";
    let executionCtx;
    try {
      executionCtx = c.executionCtx;
    } catch {}

    if (body.purgeAfterRead === true) {
      await purgeTokenSession(c.env?.DB, body.sessionId, executionCtx);
      sessionStatus = "purged";

      recordAuditEvent(
        {
          eventType: "SESSION_PURGED",
          sessionId: body.sessionId,
          categoriesApplied: ["global"],
          entitiesCount: tokensResolved,
          entities: [],
          engineLatencyUs: Math.round((performance.now() - startTime) * 1000),
          kmsEncrypted: Boolean(encryptionKey),
        },
        executionCtx
      );
    } else {
      recordAuditEvent(
        {
          eventType: "RESPONSE_REHYDRATED",
          sessionId: body.sessionId,
          categoriesApplied: ["global"],
          entitiesCount: tokensResolved,
          entities: [],
          engineLatencyUs: Math.round((performance.now() - startTime) * 1000),
          kmsEncrypted: Boolean(encryptionKey),
        },
        executionCtx
      );
    }

    return c.json({
      rehydratedText,
      tokensResolved,
      sessionStatus,
    });
  } catch (err: any) {
    return c.json(
      { error: { type: "detokenize_error", message: err?.message || "Failed to process detokenization request." } },
      500
    );
  }
});

export default tokenizationApp;
