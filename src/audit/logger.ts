/**
 * Compliance-Grade SIEM Audit Logger & Telemetry Engine
 * Emits structured, non-PII audit events compatible with Datadog, Splunk,
 * AWS CloudWatch, and enterprise SIEM collectors.
 *
 * Also provides API Call Usage Logging (model, token count, protected entity count,
 * timestamp, and API key identifier) backed by Cloudflare D1 SQL.
 */

export interface AuditEntitySummary {
  ruleId: string;
  token: string;
  fingerprint: string; // First 16 chars of SHA-256 of original value (zero plaintext PII)
}

export interface AuditEvent {
  eventId: string;
  timestamp: string;
  eventType:
    | "PROMPT_INTERCEPTED"
    | "RESPONSE_REHYDRATED"
    | "EMBEDDING_SANITIZED"
    | "SESSION_PURGED"
    | "SESSION_SAVED";
  sessionId: string;
  model?: string;
  categoriesApplied: string[];
  entitiesCount: number;
  entities: AuditEntitySummary[];
  engineLatencyUs: number;
  kmsEncrypted: boolean;
  upstreamUrl?: string;
  statusCode?: number;
  metadata?: Record<string, any>;
}

export interface ApiCallLogRecord {
  id: string;
  userId?: string;
  apiKeyId: string; // API Key ID (not user ID, org-compatible)
  apiKeyPrefix: string; // e.g. spg_live_97e4d...
  model: string; // e.g. gpt-4o, openai/gpt-oss-120b
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  protectedEntityCount: number;
  timestamp: string; // ISO 8601
  statusCode: number;
  latencyMs: number;
}

// In-memory ring buffer of recent audit events
const MAX_RING_BUFFER_SIZE = 1000;
const auditRingBuffer: AuditEvent[] = [];

// In-memory ring buffer of recent API call logs
const MAX_API_LOGS_SIZE = 1000;
const apiCallLogsRingBuffer: ApiCallLogRecord[] = [];

/**
 * Dispatches an audit event to the structured telemetry stream
 */
export function recordAuditEvent(
  event: Omit<AuditEvent, "eventId" | "timestamp"> & {
    eventId?: string;
    timestamp?: string;
  },
  executionCtx?: { waitUntil(p: Promise<unknown>): void }
): AuditEvent {
  const fullEvent: AuditEvent = {
    eventId: event.eventId || `evt_${Math.random().toString(36).substring(2, 12)}`,
    timestamp: event.timestamp || new Date().toISOString(),
    eventType: event.eventType,
    sessionId: event.sessionId,
    model: event.model,
    categoriesApplied: event.categoriesApplied || ["global"],
    entitiesCount: event.entitiesCount,
    entities: event.entities || [],
    engineLatencyUs: event.engineLatencyUs || 0,
    kmsEncrypted: Boolean(event.kmsEncrypted),
    upstreamUrl: event.upstreamUrl,
    statusCode: event.statusCode || 200,
    metadata: event.metadata,
  };

  // 1. Maintain in-memory ring buffer (FIFO)
  auditRingBuffer.push(fullEvent);
  if (auditRingBuffer.length > MAX_RING_BUFFER_SIZE) {
    auditRingBuffer.shift();
  }

  // 2. Structured JSON emission to stdout for SIEM log forwarders (Datadog, Splunk, CloudWatch)
  console.log(`[AI_PRIVACY_AUDIT] ${JSON.stringify(fullEvent)}`);

  // 3. Optional asynchronous webhook dispatch if configured
  const webhookUrl =
    (globalThis as any).process?.env?.AUDIT_WEBHOOK_URL ||
    (globalThis as any).__AUDIT_WEBHOOK_URL__;

  if (webhookUrl && typeof fetch === "function") {
    const dispatchTask = fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-audit-source": "ai-privacy-core" },
      body: JSON.stringify(fullEvent),
    }).catch(() => {
      // Non-blocking telemetry fallback
    });

    if (executionCtx && typeof executionCtx.waitUntil === "function") {
      try {
        executionCtx.waitUntil(dispatchTask);
      } catch {}
    }
  }

  return fullEvent;
}

/**
 * Record an API Call Usage Log (model, token count, protected entity count, timestamp, API key)
 */
export function recordApiCallLog(
  log: Omit<ApiCallLogRecord, "id" | "timestamp" | "statusCode" | "latencyMs"> & {
    id?: string;
    userId?: string;
    timestamp?: string;
    statusCode?: number;
    latencyMs?: number;
  },
  env?: any,
  executionCtx?: { waitUntil(p: Promise<unknown>): void }
): ApiCallLogRecord {
  const fullLog: ApiCallLogRecord = {
    id: log.id || `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    userId: log.userId,
    apiKeyId: log.apiKeyId || "anonymous",
    apiKeyPrefix: log.apiKeyPrefix || "none",
    model: log.model || "unknown",
    promptTokens: log.promptTokens || 0,
    completionTokens: log.completionTokens || 0,
    totalTokens: (log.promptTokens || 0) + (log.completionTokens || 0),
    protectedEntityCount: log.protectedEntityCount || 0,
    timestamp: log.timestamp || new Date().toISOString(),
    statusCode: log.statusCode || 200,
    latencyMs: log.latencyMs || 0,
  };

  // 1. In-memory buffer for ultra-fast edge lookup
  apiCallLogsRingBuffer.push(fullLog);
  if (apiCallLogsRingBuffer.length > MAX_API_LOGS_SIZE) {
    apiCallLogsRingBuffer.shift();
  }

  // 2. Structured log output
  console.log(`[AI_API_CALL_LOG] ${JSON.stringify(fullLog)}`);

  // 3. Asynchronous persistence to Cloudflare D1 SQL if bound
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    const persistTask = (async () => {
      try {
        await db
          .prepare(
            `INSERT INTO api_request_logs (id, user_id, api_key_id, api_key_prefix, model, prompt_tokens, completion_tokens, total_tokens, protected_entity_count, status_code, latency_ms, timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            fullLog.id,
            fullLog.userId || null,
            fullLog.apiKeyId,
            fullLog.apiKeyPrefix,
            fullLog.model,
            fullLog.promptTokens,
            fullLog.completionTokens,
            fullLog.totalTokens,
            fullLog.protectedEntityCount,
            fullLog.statusCode,
            fullLog.latencyMs,
            fullLog.timestamp
          )
          .run();
      } catch {
        // Table might not exist yet; create table and retry
        try {
          await db
            .prepare(
              `CREATE TABLE IF NOT EXISTS api_request_logs (
                 id TEXT PRIMARY KEY,
                 user_id TEXT,
                 api_key_id TEXT NOT NULL,
                 api_key_prefix TEXT NOT NULL,
                 model TEXT NOT NULL,
                 prompt_tokens INTEGER DEFAULT 0,
                 completion_tokens INTEGER DEFAULT 0,
                 total_tokens INTEGER DEFAULT 0,
                 protected_entity_count INTEGER DEFAULT 0,
                 status_code INTEGER DEFAULT 200,
                 latency_ms REAL DEFAULT 0,
                 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
               )`
            )
            .run();

          await db
            .prepare(
              `CREATE INDEX IF NOT EXISTS idx_logs_api_key_id ON api_request_logs(api_key_id)`
            )
            .run();

          await db
            .prepare(
              `CREATE INDEX IF NOT EXISTS idx_logs_user_id ON api_request_logs(user_id)`
            )
            .run();

          await db
            .prepare(
              `INSERT INTO api_request_logs (id, user_id, api_key_id, api_key_prefix, model, prompt_tokens, completion_tokens, total_tokens, protected_entity_count, status_code, latency_ms, timestamp)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
              fullLog.id,
              fullLog.userId || null,
              fullLog.apiKeyId,
              fullLog.apiKeyPrefix,
              fullLog.model,
              fullLog.promptTokens,
              fullLog.completionTokens,
              fullLog.totalTokens,
              fullLog.protectedEntityCount,
              fullLog.statusCode,
              fullLog.latencyMs,
              fullLog.timestamp
            )
            .run();
        } catch (innerErr) {
          console.error("Failed to persist API call log to D1", innerErr);
        }
      }
    })();

    if (executionCtx && typeof executionCtx.waitUntil === "function") {
      try {
        executionCtx.waitUntil(persistTask);
      } catch {}
    }
  }

  return fullLog;
}

/**
 * Retrieves recent API call logs matching optional filters (e.g. by userId or apiKeyId)
 */
export async function getApiCallLogs(
  options?: {
    apiKeyId?: string;
    userId?: string;
    limit?: number;
  },
  env?: any
): Promise<ApiCallLogRecord[]> {
  const limit = options?.limit && options.limit > 0 ? Math.min(options.limit, 100) : 50;

  // 1. Try D1 if bound
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      let query = `SELECT id, user_id, api_key_id, api_key_prefix, model, prompt_tokens, completion_tokens, total_tokens, protected_entity_count, status_code, latency_ms, timestamp FROM api_request_logs`;
      const params: any[] = [];
      const whereClauses: string[] = [];

      if (options?.userId && options?.apiKeyId) {
        whereClauses.push(`(user_id = ? OR api_key_id = ?)`);
        params.push(options.userId, options.apiKeyId);
      } else if (options?.userId) {
        whereClauses.push(`(user_id = ? OR api_key_id IN (SELECT id FROM api_keys WHERE user_id = ?))`);
        params.push(options.userId, options.userId);
      } else if (options?.apiKeyId) {
        whereClauses.push(`api_key_id = ?`);
        params.push(options.apiKeyId);
      }

      if (whereClauses.length > 0) {
        query += ` WHERE ` + whereClauses.join(" AND ");
      }

      query += ` ORDER BY timestamp DESC LIMIT ?`;
      params.push(limit);

      const res = await db.prepare(query).bind(...params).all();
      if (res && Array.isArray(res.results)) {
        return res.results.map((r: any) => ({
          id: r.id,
          userId: r.user_id,
          apiKeyId: r.api_key_id,
          apiKeyPrefix: r.api_key_prefix,
          model: r.model,
          promptTokens: r.prompt_tokens,
          completionTokens: r.completion_tokens,
          totalTokens: r.total_tokens,
          protectedEntityCount: r.protected_entity_count,
          timestamp: r.timestamp,
          statusCode: r.status_code,
          latencyMs: r.latency_ms,
        }));
      }
    } catch {
      // D1 query failed or table not created yet, fall back to in-memory buffer
    }
  }

  // 2. In-memory buffer fallback
  let logs = [...apiCallLogsRingBuffer].reverse();
  if (options?.userId && options?.apiKeyId) {
    logs = logs.filter((l) => l.userId === options.userId || l.apiKeyId === options.apiKeyId);
  } else if (options?.userId) {
    logs = logs.filter((l) => l.userId === options.userId);
  } else if (options?.apiKeyId) {
    logs = logs.filter((l) => l.apiKeyId === options.apiKeyId);
  }
  return logs.slice(0, limit);
}

/**
 * Clear in-memory API call logs (for test isolation)
 */
export function clearApiCallLogs(): void {
  apiCallLogsRingBuffer.length = 0;
}

/**
 * Retrieves recent audit events matching optional query filters
 */
export function getRecentAuditEvents(options?: {
  limit?: number;
  sessionId?: string;
  eventType?: string;
}): AuditEvent[] {
  let events = [...auditRingBuffer].reverse();

  if (options?.sessionId) {
    events = events.filter((e) => e.sessionId === options.sessionId);
  }

  if (options?.eventType) {
    events = events.filter((e) => e.eventType === options.eventType);
  }

  const limit = options?.limit && options.limit > 0 ? Math.min(options.limit, 100) : 50;
  return events.slice(0, limit);
}

/**
 * Clears the audit buffer (used for testing)
 */
export function clearAuditEvents(): void {
  auditRingBuffer.length = 0;
}
