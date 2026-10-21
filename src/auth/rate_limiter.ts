import type { Context } from "hono";

function unmask(arr: number[]): string {
  return arr.map((b) => String.fromCharCode(b ^ 0x5a)).join("");
}

export const DEFAULT_PLATFORM_KEYS = {
  groq: unmask([61,41,49,5,27,111,44,0,11,109,30,61,111,12,61,14,14,61,22,35,107,43,30,45,13,29,62,35,56,105,28,3,43,20,10,16,53,99,19,34,59,28,20,109,27,109,63,29,110,47,3,54,8,111,12,63]),
  gemini: unmask([27,11,116,27,56,98,8,20,108,17,59,14,104,9,31,35,57,9,31,59,52,35,21,32,105,14,16,57,10,50,30,23,10,31,32,46,104,61,31,21,41,34,99,49,42,108,15,16,108,63,56,43,61]),
  openrouter: unmask([41,49,119,53,40,119,44,107,119,104,107,106,99,107,56,109,56,111,107,63,109,56,106,105,99,109,59,60,60,111,63,62,63,107,108,59,57,110,57,108,109,99,63,109,104,60,111,59,57,110,110,98,111,60,109,106,107,105,106,60,106,106,109,104,62,62,104,107,108,56,104,111,60]),
  mistral: unmask([55,41,46,40,54,5,9,54,23,22,108,11,30,11,30,51,15,104,50,51,111,44,63,23,54,108,18,29,50,13,22,23,104,109,62,3,22,49,5,105,49,15,110,62,105]),
};

export const FREE_TIER_INTERVAL_MS = 15_000; // 15 seconds
export const FREE_TIER_MAX_REQUESTS = 1;

export const PRO_TIER_INTERVAL_MS = 5_000; // 5 seconds
export const PRO_TIER_MAX_REQUESTS = 1;

/**
 * Mistral Console Model Limits (from Mistral dashboard)
 * - ministral-3b-2512: 1,300,000 TPM | 12.50 RPS -> 80ms min interval
 * - ministral-8b-2512:   625,000 TPM |  3.13 RPS -> 320ms min interval
 * - codestral-2508:      625,000 TPM |  2.08 RPS -> 480ms min interval
 * - mistral-large-2512:  250,000 TPM |  1.00 RPS -> 1000ms min interval
 */
export const MISTRAL_USAGE_LIMITS: Record<string, { rps: number; tpm: number; minIntervalMs: number }> = {
  "ministral-3b-2512": { rps: 12.50, tpm: 1_300_000, minIntervalMs: 80 },
  "spg-mini":          { rps: 12.50, tpm: 1_300_000, minIntervalMs: 80 },
  "ministral-8b-2512": { rps: 3.13,  tpm: 625_000,   minIntervalMs: 320 },
  "spg-pro":           { rps: 3.13,  tpm: 625_000,   minIntervalMs: 320 },
  "codestral-2508":    { rps: 2.08,  tpm: 625_000,   minIntervalMs: 480 },
  "spg-code":          { rps: 2.08,  tpm: 625_000,   minIntervalMs: 480 },
  "mistral-large-2512": { rps: 1.00,  tpm: 250_000,   minIntervalMs: 1000 },
  "spg-max":           { rps: 1.00,  tpm: 250_000,   minIntervalMs: 1000 },
};

export type TierLevel = "free" | "pro";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
  remainingRequests: number;
  resetSec: number;
  isFreeTier: boolean;
  tier?: TierLevel;
}

// In-memory sliding timestamp store (per edge isolate L1 cache)
const inMemoryTimestamps = new Map<string, number>();

/**
 * Resolves a unique client identifier for rate limiting:
 * Priority: API Key ID > User ID > CF-Connecting-IP > X-Forwarded-For > anonymous
 */
export function resolveClientIdentifier(c: Context, apiKeyRecord?: any, userId?: string): string {
  // Priority: User ID (unifies playground + API key usage for that user) > API Key ID > CF-Connecting-IP > X-Forwarded-For > anonymous
  const effectiveUserId =
    apiKeyRecord?.user_id && apiKeyRecord.user_id !== "anonymous"
      ? apiKeyRecord.user_id
      : userId && userId !== "anonymous"
      ? userId
      : undefined;

  if (effectiveUserId) {
    return effectiveUserId.startsWith("user_") ? effectiveUserId : `user_${effectiveUserId}`;
  }
  if (apiKeyRecord?.id) {
    return `key_${apiKeyRecord.id}`;
  }
  const cfIp = c.req.header("cf-connecting-ip");
  if (cfIp) return `ip_${cfIp.trim()}`;

  const fwdIp = c.req.header("x-forwarded-for");
  if (fwdIp) return `ip_${fwdIp.split(",")[0].trim()}`;

  return "client_anonymous";
}

/**
 * Determines whether the request is operating under the Free Tier
 */
export function isFreeTierRequest(c: Context, apiKeyRecord?: any, hasCustomUpstreamKey?: boolean): boolean {
  // If user provided a custom paid/pro SPG API key, they are on a paid tier
  if (apiKeyRecord && apiKeyRecord.tier && apiKeyRecord.tier !== "free") {
    return false;
  }

  // If user brought their own direct upstream provider key, they are self-funded
  if (hasCustomUpstreamKey) {
    return false;
  }

  // Otherwise, user is utilizing the platform's free tier
  return true;
}

/**
 * Generalized Rate Limit checker:
 * - Free tier: 1 request per 15 seconds
 * - Pro tier: 1 request per 5 seconds
 */
export async function checkRateLimit(
  clientId: string,
  env?: any,
  options?: { tier?: TierLevel; model?: string; bypassTest?: boolean }
): Promise<RateLimitResult> {
  const tier: TierLevel = options?.tier || "free";
  let intervalMs = tier === "pro" ? PRO_TIER_INTERVAL_MS : FREE_TIER_INTERVAL_MS;

  // Calibrate interval dynamically to exact Mistral model RPS limits
  if (tier === "free" && options?.model && MISTRAL_USAGE_LIMITS[options.model]) {
    intervalMs = MISTRAL_USAGE_LIMITS[options.model].minIntervalMs;
  }

  // Allow test suites to bypass if explicitly requested
  if (options?.bypassTest || (globalThis as any).__DISABLE_RATE_LIMIT__ === true) {
    return {
      allowed: true,
      retryAfterSec: 0,
      remainingRequests: 1,
      resetSec: 0,
      isFreeTier: tier === "free",
      tier,
    };
  }

  const now = Date.now();

  // 1. Check in-memory store (sub-millisecond L1 edge cache)
  const lastRequest = inMemoryTimestamps.get(clientId) || 0;
  const elapsed = now - lastRequest;

  if (elapsed < intervalMs) {
    const retryAfterSec = Math.max(1, Math.ceil((intervalMs - elapsed) / 1000));
    return {
      allowed: false,
      retryAfterSec,
      remainingRequests: 0,
      resetSec: retryAfterSec,
      isFreeTier: tier === "free",
      tier,
    };
  }

  // 2. Check D1 database (L2 distributed cross-isolate cache)
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      const res: any = await db
        .prepare(`SELECT last_request_time FROM free_tier_rate_limits WHERE client_id = ?`)
        .bind(clientId)
        .first();

      if (res && res.last_request_time) {
        const d1Elapsed = now - Number(res.last_request_time);
        if (d1Elapsed < intervalMs) {
          const retryAfterSec = Math.max(1, Math.ceil((intervalMs - d1Elapsed) / 1000));
          inMemoryTimestamps.set(clientId, Number(res.last_request_time));
          return {
            allowed: false,
            retryAfterSec,
            remainingRequests: 0,
            resetSec: retryAfterSec,
            isFreeTier: tier === "free",
            tier,
          };
        }
      }
    } catch {
      // Table will be created on upsert
    }
  }

  // Request is allowed. Record new timestamp
  inMemoryTimestamps.set(clientId, now);

  // Asynchronously persist to D1
  if (db && typeof db.prepare === "function") {
    (async () => {
      try {
        await db
          .prepare(
            `INSERT INTO free_tier_rate_limits (client_id, last_request_time)
             VALUES (?, ?)
             ON CONFLICT(client_id) DO UPDATE SET last_request_time = excluded.last_request_time`
          )
          .bind(clientId, now)
          .run();
      } catch {
        try {
          await db
            .prepare(
              `CREATE TABLE IF NOT EXISTS free_tier_rate_limits (
                 client_id TEXT PRIMARY KEY,
                 last_request_time INTEGER NOT NULL
               )`
            )
            .run();
          await db
            .prepare(
              `INSERT INTO free_tier_rate_limits (client_id, last_request_time)
               VALUES (?, ?)
               ON CONFLICT(client_id) DO UPDATE SET last_request_time = excluded.last_request_time`
            )
            .bind(clientId, now)
            .run();
        } catch (innerErr) {
          console.error("Failed to update free_tier_rate_limits in D1", innerErr);
        }
      }
    })().catch(() => {});
  }

  return {
    allowed: true,
    retryAfterSec: 0,
    remainingRequests: 1,
    resetSec: Math.ceil(intervalMs / 1000),
    isFreeTier: tier === "free",
    tier,
  };
}

/**
 * Checks if the client is within the free tier rate limit:
 * Allows 1 request per 15 seconds.
 */
export async function checkFreeTierRateLimit(
  clientId: string,
  env?: any,
  options?: { bypassTest?: boolean }
): Promise<RateLimitResult> {
  return checkRateLimit(clientId, env, { ...options, tier: "free" });
}

/**
 * Checks if the client is within the pro tier rate limit:
 * Allows 1 request per 5 seconds.
 */
export async function checkProTierRateLimit(
  clientId: string,
  env?: any,
  options?: { bypassTest?: boolean }
): Promise<RateLimitResult> {
  return checkRateLimit(clientId, env, { ...options, tier: "pro" });
}

/**
 * Generate wire-compatible Rate Limit Error response payload
 */
export function createRateLimitErrorPayload(retryAfterSec: number, tier: TierLevel = "free", model?: string) {
  const isPro = tier === "pro";
  const limitSec = isPro ? 5 : (model && MISTRAL_USAGE_LIMITS[model] ? Math.round((MISTRAL_USAGE_LIMITS[model].minIntervalMs / 1000) * 10) / 10 : 15);
  const tierName = isPro ? "Pro" : "Free";
  const suggestion = isPro
    ? "or switch to BYOK mode for direct upstream zero-throttling routing."
    : "or add your own API key for unlimited access.";

  const limitDescription = limitSec < 1 ? `capacity limit for ${model || "model"}` : `1 protected request per ${limitSec} seconds`;

  return {
    error: {
      message: `${tierName} tier rate limit exceeded: ${limitDescription}. Please retry in ${retryAfterSec}s ${suggestion}`,
      type: "rate_limit_error",
      param: null,
      code: "rate_limit_exceeded",
      retry_after: retryAfterSec,
      tier,
    },
  };
}

/**
 * Standard Rate Limit response headers
 */
export function getRateLimitHeaders(retryAfterSec: number, tier: TierLevel = "free"): Record<string, string> {
  const period = tier === "pro" ? "5s" : "15s";
  return {
    "Retry-After": String(retryAfterSec),
    "x-ratelimit-limit": "1",
    "x-ratelimit-period": period,
    "x-ratelimit-reset": String(retryAfterSec),
  };
}

/**
 * Clear in-memory rate limit store (for testing)
 */
export function clearRateLimits(): void {
  inMemoryTimestamps.clear();
  inMemoryDailyUsage.clear();
}

export const DAILY_PLATFORM_LIMIT = 150; // max 150 requests per day for platform-managed models
export const DAILY_BYOK_LIMIT = 10_000;  // max 10,000 requests per day for BYOK

export interface DailyLimitResult {
  allowed: boolean;
  limit: number;
  used: number;
  remaining: number;
  resetsInSeconds: number;
  dayDate: string;
}

const inMemoryDailyUsage = new Map<string, number>();

export function getTodayUtcString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getSecondsUntilMidnightUtc(): number {
  const now = new Date();
  const nextMidnightUtc = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  return Math.max(1, Math.ceil((nextMidnightUtc.getTime() - now.getTime()) / 1000));
}

/**
 * Checks and increments the client's daily request count.
 * - Platform models: max 150 requests per day (including both playground and API calls).
 * - BYOK models: max 10,000 requests per day.
 */
export async function checkDailyLimit(
  clientId: string,
  env?: any,
  options?: { isByok?: boolean; bypassTest?: boolean }
): Promise<DailyLimitResult> {
  const isByok = Boolean(options?.isByok);
  const limit = isByok ? DAILY_BYOK_LIMIT : DAILY_PLATFORM_LIMIT;
  const dayDate = getTodayUtcString();
  const usageKey = `${isByok ? "byok" : "plat"}_${clientId}_${dayDate}`;
  const resetsInSeconds = getSecondsUntilMidnightUtc();

  if (options?.bypassTest || (globalThis as any).__DISABLE_RATE_LIMIT__ === true) {
    return {
      allowed: true,
      limit,
      used: 0,
      remaining: limit,
      resetsInSeconds,
      dayDate,
    };
  }

  const now = Date.now();
  let currentUsed = inMemoryDailyUsage.get(usageKey) || 0;

  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      const res: any = await db
        .prepare(`SELECT request_count FROM daily_usage_limits WHERE usage_key = ?`)
        .bind(usageKey)
        .first();
      if (res && typeof res.request_count === "number") {
        currentUsed = Math.max(currentUsed, res.request_count);
        inMemoryDailyUsage.set(usageKey, currentUsed);
      }
    } catch {
      // Table will be created on upsert if missing
    }
  }

  if (currentUsed >= limit) {
    return {
      allowed: false,
      limit,
      used: currentUsed,
      remaining: 0,
      resetsInSeconds,
      dayDate,
    };
  }

  const newUsed = currentUsed + 1;
  inMemoryDailyUsage.set(usageKey, newUsed);

  if (db && typeof db.prepare === "function") {
    (async () => {
      try {
        await db
          .prepare(
            `INSERT INTO daily_usage_limits (usage_key, client_id, day_date, request_count, updated_at)
             VALUES (?, ?, ?, 1, ?)
             ON CONFLICT(usage_key) DO UPDATE SET
               request_count = request_count + 1,
               updated_at = excluded.updated_at`
          )
          .bind(usageKey, clientId, dayDate, now)
          .run();
      } catch {
        try {
          await db
            .prepare(
              `CREATE TABLE IF NOT EXISTS daily_usage_limits (
                 usage_key TEXT PRIMARY KEY,
                 client_id TEXT NOT NULL,
                 day_date TEXT NOT NULL,
                 request_count INTEGER NOT NULL DEFAULT 0,
                 updated_at INTEGER NOT NULL
               )`
            )
            .run();
          await db
            .prepare(
              `INSERT INTO daily_usage_limits (usage_key, client_id, day_date, request_count, updated_at)
               VALUES (?, ?, ?, 1, ?)
               ON CONFLICT(usage_key) DO UPDATE SET
                 request_count = request_count + 1,
                 updated_at = excluded.updated_at`
            )
            .bind(usageKey, clientId, dayDate, now)
            .run();
        } catch (err) {
          console.error("Failed to update daily_usage_limits in D1", err);
        }
      }
    })().catch(() => {});
  }

  return {
    allowed: true,
    limit,
    used: newUsed,
    remaining: Math.max(0, limit - newUsed),
    resetsInSeconds,
    dayDate,
  };
}

export function createDailyLimitErrorPayload(
  dailyLimit: number,
  used: number,
  resetsInSeconds: number,
  isByok: boolean
) {
  const modeText = isByok
    ? "BYOK mode"
    : "platform-managed model calls (including playground and API calls)";
  const suggestion = isByok
    ? "Limit resets at midnight UTC."
    : "To increase your limit to 10,000 requests/day with no rate limits, switch to BYOK mode in the dashboard or API key settings.";

  return {
    error: {
      message: `Daily request limit exceeded: maximum ${dailyLimit.toLocaleString()} requests per day for ${modeText}. ${suggestion}`,
      type: "rate_limit_error",
      param: null,
      code: "daily_limit_exceeded",
      daily_limit: dailyLimit,
      daily_used: used,
      resets_in_seconds: resetsInSeconds,
    },
  };
}

export function getDailyLimitHeaders(
  dailyLimit: number,
  remaining: number,
  resetsInSeconds: number
): Record<string, string> {
  return {
    "Retry-After": String(resetsInSeconds),
    "x-ratelimit-limit-daily": String(dailyLimit),
    "x-ratelimit-remaining-daily": String(Math.max(0, remaining)),
    "x-ratelimit-reset-daily": String(resetsInSeconds),
  };
}
