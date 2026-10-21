import { encryptTokenMap, decryptTokenMap } from "./crypto";

export interface TokenSessionData {
  sessionId: string;
  tokenMap?: Record<string, string>;
  encryptedPayload?: string;
  isEncrypted: boolean;
  expiresAt: string;
}

// In-memory session store fallback for local dev mode or zero-D1 setups
const memorySessions = new Map<string, TokenSessionData>();
const MAX_MEMORY_SESSIONS = 5000;
let lastSweepTime = 0;

/**
 * Periodically purges expired entries from in-memory Map to prevent memory leaks
 */
function purgeExpiredMemorySessions(): void {
  const now = Date.now();
  if (now - lastSweepTime > 10000 && memorySessions.size > 200) {
    lastSweepTime = now;
    const nowStr = new Date(now).toISOString();
    for (const [id, data] of memorySessions.entries()) {
      if (data.expiresAt <= nowStr) {
        memorySessions.delete(id);
      }
    }
  }

  while (memorySessions.size > MAX_MEMORY_SESSIONS) {
    const oldestKey = memorySessions.keys().next().value;
    if (oldestKey) {
      memorySessions.delete(oldestKey);
    } else {
      break;
    }
  }
}

export interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
}

/**
 * Saves a token mapping session with an optional customer encryption key (BYOK)
 */
export async function saveTokenSession(
  db: D1Database | undefined,
  sessionId: string,
  tokenMap: Record<string, string>,
  ttlSeconds: number = 300,
  executionCtx?: ExecutionContextLike,
  encryptionKey?: string
): Promise<{ expiresAt: string; isEncrypted: boolean }> {
  purgeExpiredMemorySessions();
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  const isEncrypted = Boolean(encryptionKey && encryptionKey.trim().length > 0);

  let encryptedPayload: string | undefined;
  if (isEncrypted) {
    encryptedPayload = await encryptTokenMap(tokenMap || {}, encryptionKey!.trim());
  }

  const sessionData: TokenSessionData = {
    sessionId,
    tokenMap: isEncrypted ? undefined : (tokenMap || {}),
    encryptedPayload,
    isEncrypted,
    expiresAt,
  };

  // 1. Store in ephemeral memory
  memorySessions.set(sessionId, sessionData);

  // 2. Persist to D1 database asynchronously in background only when tokens exist
  if (db && Object.keys(tokenMap || {}).length > 0) {
    const d1Payload = isEncrypted ? encryptedPayload! : JSON.stringify(tokenMap);
    const d1Task = (async () => {
      try {
        const query = `
          INSERT OR REPLACE INTO token_sessions (session_id, mapping_json, expires_at)
          VALUES (?, ?, ?)
        `;
        await db.prepare(query).bind(sessionId, d1Payload, expiresAt).run();
      } catch {
        // D1 unavailable; memory fallback handles request
      }
    })();

    if (executionCtx && typeof executionCtx.waitUntil === "function") {
      try {
        executionCtx.waitUntil(d1Task);
      } catch {}
    }
  }

  return { expiresAt, isEncrypted };
}

/**
 * Checks if a stored session is KMS encrypted
 */
export function isSessionEncrypted(sessionId: string): boolean {
  return Boolean(memorySessions.get(sessionId)?.isEncrypted);
}

/**
 * Retrieves an active token mapping session by sessionId, decrypting if necessary
 */
export async function getTokenSession(
  db: D1Database | undefined,
  sessionId: string,
  encryptionKey?: string
): Promise<Record<string, string> | null> {
  const nowStr = new Date().toISOString();

  // 1. Check memory fallback first
  if (memorySessions.has(sessionId)) {
    const memData = memorySessions.get(sessionId)!;
    if (memData.expiresAt > nowStr) {
      if (memData.isEncrypted) {
        if (!encryptionKey || encryptionKey.trim().length === 0) {
          throw new Error("KMS Error: Session is encrypted. Header 'x-vault-encryption-key' is required.");
        }
        return await decryptTokenMap(memData.encryptedPayload!, encryptionKey.trim());
      }
      return memData.tokenMap || {};
    } else {
      memorySessions.delete(sessionId);
      return null;
    }
  }

  // 2. Check D1 database if available
  if (db) {
    try {
      const query = `
        SELECT mapping_json, expires_at FROM token_sessions
        WHERE session_id = ? AND expires_at > ?
      `;
      const res = await db.prepare(query).bind(sessionId, nowStr).first();

      if (res && res.mapping_json) {
        const rawPayload = res.mapping_json as string;
        // Check if payload is encrypted (contains colon separator of iv:ciphertext)
        const isEncrypted = rawPayload.includes(":") && !rawPayload.startsWith("{");

        if (isEncrypted) {
          if (!encryptionKey || encryptionKey.trim().length === 0) {
            throw new Error("KMS Error: Session is encrypted. Header 'x-vault-encryption-key' is required.");
          }
          const decrypted = await decryptTokenMap(rawPayload, encryptionKey.trim());
          memorySessions.set(sessionId, {
            sessionId,
            encryptedPayload: rawPayload,
            isEncrypted: true,
            expiresAt: res.expires_at as string,
          });
          return decrypted;
        }

        const tokenMap = JSON.parse(rawPayload);
        memorySessions.set(sessionId, {
          sessionId,
          tokenMap,
          isEncrypted: false,
          expiresAt: res.expires_at as string,
        });
        return tokenMap;
      }
    } catch (err: any) {
      if (err.message && err.message.startsWith("KMS Error")) throw err;
    }
  }

  return null;
}

/**
 * Purges a token mapping session immediately (zero-retention enforcement)
 */
export async function purgeTokenSession(
  db: D1Database | undefined,
  sessionId: string,
  executionCtx?: ExecutionContextLike
): Promise<void> {
  memorySessions.delete(sessionId);

  if (db) {
    const purgeTask = (async () => {
      try {
        const query = `DELETE FROM token_sessions WHERE session_id = ?`;
        await db.prepare(query).bind(sessionId).run();
      } catch {}
    })();

    if (executionCtx && typeof executionCtx.waitUntil === "function") {
      executionCtx.waitUntil(purgeTask);
    }
  }
}
