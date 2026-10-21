import { describe, it, expect, beforeEach } from "vitest";
import {
  recordAuditEvent,
  getRecentAuditEvents,
  clearAuditEvents,
  recordApiCallLog,
  getApiCallLogs,
  clearApiCallLogs,
} from "./logger";

describe("SIEM Audit Logger & Telemetry Engine", () => {
  beforeEach(() => {
    clearAuditEvents();
  });

  it("should record audit events and store in ring buffer", () => {
    const event = recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_audit_test_1",
      model: "gpt-4o",
      categoriesApplied: ["global"],
      entitiesCount: 2,
      entities: [
        { ruleId: "RULE_EMAIL", token: "EMAIL_1", fingerprint: "e3b0c44298fc1c14" },
        { ruleId: "RULE_CREDIT_CARD", token: "CARD_1", fingerprint: "a591a6d40bf42040" },
      ],
      engineLatencyUs: 92,
      kmsEncrypted: true,
      upstreamUrl: "https://api.openai.com/v1",
    });

    expect(event.eventId).toMatch(/^evt_/);
    expect(event.timestamp).toBeDefined();

    const events = getRecentAuditEvents();
    expect(events.length).toBe(1);
    expect(events[0].sessionId).toBe("sess_audit_test_1");
    expect(events[0].kmsEncrypted).toBe(true);
    expect(events[0].entities[0].fingerprint).toBe("e3b0c44298fc1c14");
  });

  it("should support filtering audit events by sessionId and eventType", () => {
    recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_alpha",
      categoriesApplied: ["global"],
      entitiesCount: 1,
      entities: [],
      engineLatencyUs: 50,
      kmsEncrypted: false,
    });

    recordAuditEvent({
      eventType: "RESPONSE_REHYDRATED",
      sessionId: "sess_alpha",
      categoriesApplied: ["global"],
      entitiesCount: 1,
      entities: [],
      engineLatencyUs: 20,
      kmsEncrypted: false,
    });

    recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_beta",
      categoriesApplied: ["africa"],
      entitiesCount: 3,
      entities: [],
      engineLatencyUs: 110,
      kmsEncrypted: true,
    });

    const alphaEvents = getRecentAuditEvents({ sessionId: "sess_alpha" });
    expect(alphaEvents.length).toBe(2);

    const rehydratedEvents = getRecentAuditEvents({ eventType: "RESPONSE_REHYDRATED" });
    expect(rehydratedEvents.length).toBe(1);
    expect(rehydratedEvents[0].sessionId).toBe("sess_alpha");
  });
});

describe("API Key Request Usage & Telemetry Logging", () => {
  beforeEach(() => {
    clearApiCallLogs();
  });

  it("should record API call logs keyed by api_key_id with model, tokens, and protected entities", async () => {
    const log = recordApiCallLog({
      apiKeyId: "key_org123_abc",
      apiKeyPrefix: "spg_live_97e4d...",
      model: "gpt-4o",
      promptTokens: 42,
      completionTokens: 88,
      totalTokens: 130,
      protectedEntityCount: 3,
      statusCode: 200,
      latencyMs: 145,
    });

    expect(log.id).toMatch(/^log_/);
    expect(log.apiKeyId).toBe("key_org123_abc");
    expect(log.apiKeyPrefix).toBe("spg_live_97e4d...");
    expect(log.model).toBe("gpt-4o");
    expect(log.promptTokens).toBe(42);
    expect(log.completionTokens).toBe(88);
    expect(log.totalTokens).toBe(130);
    expect(log.protectedEntityCount).toBe(3);
    expect(log.timestamp).toBeDefined();

    const recentLogs = await getApiCallLogs();
    expect(recentLogs.length).toBe(1);
    expect(recentLogs[0].apiKeyId).toBe("key_org123_abc");
    expect(recentLogs[0].model).toBe("gpt-4o");
    expect(recentLogs[0].protectedEntityCount).toBe(3);
  });

  it("should query logs specifically by api_key_id for organization compatibility", async () => {
    recordApiCallLog({
      apiKeyId: "key_team_engineering",
      apiKeyPrefix: "spg_live_eng...",
      model: "openai/gpt-oss-120b",
      promptTokens: 100,
      completionTokens: 50,
      totalTokens: 150,
      protectedEntityCount: 5,
    });

    recordApiCallLog({
      apiKeyId: "key_team_finance",
      apiKeyPrefix: "spg_live_fin...",
      model: "claude-3-5-sonnet",
      promptTokens: 200,
      completionTokens: 100,
      totalTokens: 300,
      protectedEntityCount: 12,
    });

    const engLogs = await getApiCallLogs({ apiKeyId: "key_team_engineering" });
    expect(engLogs.length).toBe(1);
    expect(engLogs[0].apiKeyId).toBe("key_team_engineering");
    expect(engLogs[0].model).toBe("openai/gpt-oss-120b");
    expect(engLogs[0].protectedEntityCount).toBe(5);

    const finLogs = await getApiCallLogs({ apiKeyId: "key_team_finance" });
    expect(finLogs.length).toBe(1);
    expect(finLogs[0].apiKeyId).toBe("key_team_finance");
    expect(finLogs[0].model).toBe("claude-3-5-sonnet");
    expect(finLogs[0].protectedEntityCount).toBe(12);
  });

  it("should enforce account-exclusive log retrieval by userId", async () => {
    recordApiCallLog({
      userId: "user_alice_123",
      apiKeyId: "key_alice_01",
      apiKeyPrefix: "spg_live_alice...",
      model: "codestral-2508",
      promptTokens: 50,
      completionTokens: 25,
      totalTokens: 75,
      protectedEntityCount: 2,
    });

    recordApiCallLog({
      userId: "user_bob_456",
      apiKeyId: "key_bob_01",
      apiKeyPrefix: "spg_live_bob...",
      model: "openai/gpt-oss-120b",
      promptTokens: 120,
      completionTokens: 60,
      totalTokens: 180,
      protectedEntityCount: 0,
    });

    const aliceLogs = await getApiCallLogs({ userId: "user_alice_123" });
    expect(aliceLogs.length).toBe(1);
    expect(aliceLogs[0].userId).toBe("user_alice_123");
    expect(aliceLogs[0].apiKeyId).toBe("key_alice_01");
    expect(aliceLogs[0].model).toBe("codestral-2508");

    const bobLogs = await getApiCallLogs({ userId: "user_bob_456" });
    expect(bobLogs.length).toBe(1);
    expect(bobLogs[0].userId).toBe("user_bob_456");
    expect(bobLogs[0].apiKeyId).toBe("key_bob_01");
    expect(bobLogs[0].model).toBe("openai/gpt-oss-120b");

    const charlieLogs = await getApiCallLogs({ userId: "user_charlie_789" });
    expect(charlieLogs.length).toBe(0);
  });
});

