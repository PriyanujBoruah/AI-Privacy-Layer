/**
 * API Key Authentication, Rate Limiting & Usage Metering Module
 * Securely hashes keys with SHA-256 (raw keys are never stored).
 * Supports Cloudflare D1 SQL storage with an ultra-fast in-memory cache.
 */

import { Context, Next } from "hono";

export interface ApiKeyRecord {
  id: string;
  key_prefix: string;
  name: string;
  tier: "free" | "pro" | "enterprise" | "byok";
  monthly_quota: number;
  requests_used: number;
  is_active: number;
  created_at: string;
  user_id?: string;
  byok_google_key?: string | null;
  byok_mistral_key?: string | null;
  byok_groq_key?: string | null;
  byok_providers?: string[];
}

export interface ApiKeyValidationResult {
  valid: boolean;
  error?: string;
  statusCode?: number;
  record?: ApiKeyRecord;
}

// In-memory cache for edge performance across invocations on the same isolate
const inMemoryKeyCache = new Map<string, { record: ApiKeyRecord; cachedAt: number }>();
const CACHE_TTL_MS = 60_000; // 1 minute

// Local fallback store for environments without Cloudflare D1 binding
const localKeyStore = new Map<string, ApiKeyRecord>();

/**
 * Hash raw API key with SHA-256 using standard Web Crypto
 */
export async function hashApiKey(key: string): Promise<string> {
  const cryptoObj = (globalThis as any).crypto;
  const encoder = new TextEncoder();
  const data = encoder.encode(key.trim());
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate a cryptographically secure API key
 * Format: spg_live_<32 hex chars>
 */
export function generateRawKey(isTest = false): string {
  const cryptoObj = (globalThis as any).crypto;
  const bytes = new Uint8Array(24);
  cryptoObj.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const prefix = isTest ? "spg_test_" : "spg_live_";
  return `${prefix}${hex}`;
}

/**
 * Create a new API key record
 */
export async function createApiKey(
  name: string,
  tier: "free" | "pro" | "enterprise" | "byok" = "free",
  monthlyQuota?: number,
  env?: any,
  userId: string = "anonymous",
  byokKeys?: {
    googleKey?: string;
    mistralKey?: string;
    groqKey?: string;
  }
): Promise<{ rawKey: string; record: ApiKeyRecord }> {
  const rawKey = generateRawKey(tier === "free" && name.toLowerCase().includes("test"));
  const keyHash = await hashApiKey(rawKey);
  const keyPrefix = rawKey.slice(0, 14) + "...";
  const id = `key_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  const googleKey = byokKeys?.googleKey?.trim() || null;
  const mistralKey = byokKeys?.mistralKey?.trim() || null;
  const groqKey = byokKeys?.groqKey?.trim() || null;

  const providers: string[] = [];
  if (googleKey) providers.push("Google");
  if (mistralKey) providers.push("Mistral");
  if (groqKey) providers.push("Groq");

  let effectiveQuota: number;
  if (tier === "byok") {
    effectiveQuota = monthlyQuota && monthlyQuota > 1_000_000 ? monthlyQuota : 1_000_000;
  } else if (tier === "pro") {
    effectiveQuota = monthlyQuota !== undefined ? monthlyQuota : 100_000;
  } else if (tier === "enterprise") {
    effectiveQuota = monthlyQuota !== undefined ? monthlyQuota : 10_000_000;
  } else {
    effectiveQuota = monthlyQuota !== undefined ? monthlyQuota : 10_000;
  }

  const record: ApiKeyRecord = {
    id,
    key_prefix: keyPrefix,
    name: name.trim() || "Default Key",
    tier,
    monthly_quota: effectiveQuota,
    requests_used: 0,
    is_active: 1,
    created_at: createdAt,
    user_id: userId,
    byok_google_key: googleKey,
    byok_mistral_key: mistralKey,
    byok_groq_key: groqKey,
    byok_providers: providers,
  };

  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    // 1. Ensure table and columns exist
    try {
      await db
        .prepare(
          `CREATE TABLE IF NOT EXISTS api_keys (
             id TEXT PRIMARY KEY,
             key_hash TEXT UNIQUE NOT NULL,
             key_prefix TEXT NOT NULL,
             name TEXT NOT NULL,
             tier TEXT DEFAULT 'free',
             monthly_quota INTEGER DEFAULT 10000,
             requests_used INTEGER DEFAULT 0,
             is_active INTEGER DEFAULT 1,
             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
             user_id TEXT DEFAULT 'anonymous',
             byok_google_key TEXT,
             byok_mistral_key TEXT,
             byok_groq_key TEXT
           )`
        )
        .run();
    } catch {}

    try {
      await db.prepare(`ALTER TABLE api_keys ADD COLUMN user_id TEXT`).run();
    } catch {}
    try {
      await db.prepare(`ALTER TABLE api_keys ADD COLUMN byok_google_key TEXT`).run();
    } catch {}
    try {
      await db.prepare(`ALTER TABLE api_keys ADD COLUMN byok_mistral_key TEXT`).run();
    } catch {}
    try {
      await db.prepare(`ALTER TABLE api_keys ADD COLUMN byok_groq_key TEXT`).run();
    } catch {}

    try {
      await db
        .prepare(
          `INSERT INTO api_keys (id, key_hash, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at, user_id, byok_google_key, byok_mistral_key, byok_groq_key)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, keyHash, keyPrefix, record.name, tier, record.monthly_quota, 0, 1, createdAt, userId, googleKey, mistralKey, groqKey)
        .run();
    } catch {
      // Fallback insert if columns differ
      await db
        .prepare(
          `INSERT INTO api_keys (id, key_hash, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at, user_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, keyHash, keyPrefix, record.name, tier, record.monthly_quota, 0, 1, createdAt, userId)
        .run();
    }
  }

  // Update in-memory stores
  localKeyStore.set(keyHash, record);
  inMemoryKeyCache.set(keyHash, { record, cachedAt: Date.now() });

  return { rawKey, record };
}

/**
 * Validate an API key and increment usage counter
 */
export async function validateApiKey(rawKey: string, env: any): Promise<ApiKeyValidationResult> {
  if (!rawKey || typeof rawKey !== "string") {
    return { valid: false, error: "API key is required", statusCode: 401 };
  }

  const keyHash = await hashApiKey(rawKey);

  // 1. Check in-memory cache
  let record: ApiKeyRecord | undefined;
  const cached = inMemoryKeyCache.get(keyHash);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    record = cached.record;
  }

  // 2. Check D1 if bound
  const db = env?.DB;
  if (!record && db && typeof db.prepare === "function") {
    try {
      const res = await db
        .prepare(`SELECT * FROM api_keys WHERE key_hash = ? AND is_active = 1 LIMIT 1`)
        .bind(keyHash)
        .first();
      if (res) {
        const providers: string[] = [];
        if (res.byok_google_key) providers.push("Google");
        if (res.byok_mistral_key) providers.push("Mistral");
        if (res.byok_groq_key) providers.push("Groq");

        record = {
          id: res.id,
          key_prefix: res.key_prefix,
          name: res.name,
          tier: res.tier,
          monthly_quota: res.tier === "pro" && res.monthly_quota < 100_000 ? 100_000 : res.monthly_quota,
          requests_used: res.requests_used,
          is_active: res.is_active,
          created_at: res.created_at,
          user_id: res.user_id,
          byok_google_key: res.byok_google_key,
          byok_mistral_key: res.byok_mistral_key,
          byok_groq_key: res.byok_groq_key,
          byok_providers: providers,
        };
        inMemoryKeyCache.set(keyHash, { record, cachedAt: Date.now() });
      }
    } catch {
      // D1 query failed, proceed to local fallback
    }
  }

  // 3. Fallback to local store
  if (!record) {
    record = localKeyStore.get(keyHash);
  }

  if (!record || !record.is_active) {
    return { valid: false, error: "Invalid or revoked API key", statusCode: 401 };
  }

  // Check quota
  if (record.requests_used >= record.monthly_quota) {
    return {
      valid: false,
      error: `Monthly request quota exceeded (${record.requests_used}/${record.monthly_quota}). Please upgrade your plan.`,
      statusCode: 429,
    };
  }

  // Increment usage counter
  record.requests_used += 1;
  if (db && typeof db.prepare === "function") {
    db.prepare(`UPDATE api_keys SET requests_used = requests_used + 1 WHERE key_hash = ?`)
      .bind(keyHash)
      .run()
      .catch(() => {});
  }

  return { valid: true, record };
}

/**
 * List all API keys for an authenticated user (without sensitive hashes).
 * Account-exclusive: strictly returns only keys belonging to the specified userId.
 */
export async function listApiKeys(env: any, userId?: string): Promise<ApiKeyRecord[]> {
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      let query = `SELECT id, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at, user_id, byok_google_key, byok_mistral_key, byok_groq_key FROM api_keys WHERE is_active = 1`;
      const params: any[] = [];
      if (userId) {
        query += ` AND user_id = ?`;
        params.push(userId);
      }
      query += ` ORDER BY created_at DESC`;
      const res = await db.prepare(query).bind(...params).all();
      if (res && Array.isArray(res.results)) {
        return (res.results as any[]).map((row) => {
          const providers: string[] = [];
          if (row.byok_google_key) providers.push("Google");
          if (row.byok_mistral_key) providers.push("Mistral");
          if (row.byok_groq_key) providers.push("Groq");
          return {
            ...row,
            monthly_quota: row.tier === "pro" && row.monthly_quota < 100_000 ? 100_000 : row.monthly_quota,
            byok_providers: providers,
            byok_google_key: row.byok_google_key ? (row.byok_google_key.slice(0, 4) + "••••••••") : null,
            byok_mistral_key: row.byok_mistral_key ? (row.byok_mistral_key.slice(0, 4) + "••••••••") : null,
            byok_groq_key: row.byok_groq_key ? (row.byok_groq_key.slice(0, 4) + "••••••••") : null,
          } as ApiKeyRecord;
        });
      }
    } catch {
      // fallback to local store
    }
  }
  let keys = Array.from(localKeyStore.values()).filter((k) => k.is_active === 1);
  if (userId) {
    keys = keys.filter((k) => k.user_id === userId);
  }
  return keys
    .map((row) => {
      const providers: string[] = [];
      if (row.byok_google_key) providers.push("Google");
      if (row.byok_mistral_key) providers.push("Mistral");
      if (row.byok_groq_key) providers.push("Groq");
      return {
        ...row,
        byok_providers: providers,
        byok_google_key: row.byok_google_key ? (row.byok_google_key.slice(0, 4) + "••••••••") : null,
        byok_mistral_key: row.byok_mistral_key ? (row.byok_mistral_key.slice(0, 4) + "••••••••") : null,
        byok_groq_key: row.byok_groq_key ? (row.byok_groq_key.slice(0, 4) + "••••••••") : null,
      } as ApiKeyRecord;
    })
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

/**
 * Revoke an API key by ID (optionally scoped to a specific userId)
 */
export async function revokeApiKey(id: string, env: any, userId?: string): Promise<boolean> {
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      if (userId) {
        await db.prepare(`UPDATE api_keys SET is_active = 0 WHERE id = ? AND user_id = ?`).bind(id, userId).run();
      } else {
        await db.prepare(`UPDATE api_keys SET is_active = 0 WHERE id = ?`).bind(id).run();
      }
    } catch {
      // fallback
    }
  }

  for (const [hash, rec] of localKeyStore.entries()) {
    if (rec.id === id && (!userId || rec.user_id === userId)) {
      rec.is_active = 0;
      inMemoryKeyCache.delete(hash);
      return true;
    }
  }
  return true;
}

/**
 * Extract ProjectSPG API key from incoming request
 */
export function extractApiKey(c: Context): string | null {
  // Check header priority:
  // 1. x-spg-api-key
  // 2. x-api-key
  // 3. api-key
  const spgHeader = c.req.header("x-spg-api-key") || c.req.header("x-api-key") || c.req.header("api-key");
  if (spgHeader) return spgHeader.trim();

  // 4. Authorization header if it starts with spg_
  const auth = c.req.header("Authorization") || "";
  if (auth.startsWith("Bearer spg_")) {
    return auth.replace(/^Bearer\s+/i, "").trim();
  }

  // 5. Query parameter ?spg_api_key=...
  const queryKey = c.req.query("spg_api_key");
  if (queryKey) return queryKey.trim();

  return null;
}

export const PUBLIC_FREE_TIER_RECORD: ApiKeyRecord = {
  id: "key_public_free",
  key_prefix: "spg_free...",
  name: "Public Free Tier",
  tier: "free",
  monthly_quota: 100_000,
  requests_used: 0,
  is_active: 1,
  created_at: "2026-01-01T00:00:00.000Z",
  user_id: "anonymous",
};

/**
 * Hono Middleware for Optional or Required API Key verification.
 * By default, permits all unauthenticated and guest developers via Public Free Tier.
 */
export function createAuthMiddleware(options: { required?: boolean } = {}) {
  return async (c: Context, next: Next) => {
    const rawKey = extractApiKey(c);
    const requireKey =
      options.required ||
      (c.env as any)?.REQUIRE_API_KEY === "true" ||
      (globalThis as any).process?.env?.REQUIRE_API_KEY === "true";

    if (!rawKey) {
      if (requireKey) {
        return c.json(
          {
            error: {
              message: "Missing ProjectSPG API key. Provide via 'x-spg-api-key' header.",
              type: "unauthorized_error",
              code: "api_key_missing",
            },
          },
          401
        );
      }
      c.set("apiKeyRecord", PUBLIC_FREE_TIER_RECORD);
      return next();
    }

    const validation = await validateApiKey(rawKey, c.env);
    if (!validation.valid) {
      // If strict authentication is required, block; otherwise gracefully grant Public Free Tier
      if (requireKey) {
        return c.json(
          {
            error: {
              message: validation.error,
              type: validation.statusCode === 429 ? "rate_limit_error" : "unauthorized_error",
              code: validation.statusCode === 429 ? "quota_exceeded" : "invalid_api_key",
            },
          },
          validation.statusCode as any || 401
        );
      }
      c.set("apiKeyRecord", PUBLIC_FREE_TIER_RECORD);
      return next();
    }

    // Attach key record to context for route handlers
    c.set("apiKeyRecord", validation.record);
    return next();
  };
}
