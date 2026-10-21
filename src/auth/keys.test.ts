import { describe, it, expect, beforeEach } from "vitest";
import {
  hashApiKey,
  generateRawKey,
  createApiKey,
  validateApiKey,
  listApiKeys,
  revokeApiKey,
} from "./keys";

describe("API Key Authentication & Metering", () => {
  const mockEnv: any = {};

  it("should generate formatted raw keys", () => {
    const liveKey = generateRawKey(false);
    expect(liveKey.startsWith("spg_live_")).toBe(true);
    expect(liveKey.length).toBe(9 + 48); // prefix + hex

    const testKey = generateRawKey(true);
    expect(testKey.startsWith("spg_test_")).toBe(true);
  });

  it("should hash keys deterministically using SHA-256", async () => {
    const key = "spg_live_test1234567890abcdef";
    const hash1 = await hashApiKey(key);
    const hash2 = await hashApiKey(key);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBe(64); // 256 bits = 64 hex chars
  });

  it("should create, list, validate, and meter API keys", async () => {
    const { rawKey, record } = await createApiKey("Production Backend", "pro", 5, mockEnv);
    expect(rawKey.startsWith("spg_live_")).toBe(true);
    expect(record.name).toBe("Production Backend");
    expect(record.monthly_quota).toBe(5);
    expect(record.requests_used).toBe(0);

    // Validate key
    const val1 = await validateApiKey(rawKey, mockEnv);
    expect(val1.valid).toBe(true);
    expect(val1.record?.requests_used).toBe(1);

    // Verify key appears in list
    const list = await listApiKeys(mockEnv);
    expect(list.some((k) => k.id === record.id)).toBe(true);

    // Exhaust quota
    await validateApiKey(rawKey, mockEnv); // 2
    await validateApiKey(rawKey, mockEnv); // 3
    await validateApiKey(rawKey, mockEnv); // 4
    await validateApiKey(rawKey, mockEnv); // 5

    // Next request should fail with 429 quota exceeded
    const valExhausted = await validateApiKey(rawKey, mockEnv);
    expect(valExhausted.valid).toBe(false);
    expect(valExhausted.statusCode).toBe(429);
    expect(valExhausted.error).toContain("Monthly request quota exceeded");
  });

  it("should reject revoked or invalid API keys", async () => {
    const { rawKey, record } = await createApiKey("Revoke Test", "free", 100, mockEnv);

    // Revoke
    await revokeApiKey(record.id, mockEnv);

    const val = await validateApiKey(rawKey, mockEnv);
    expect(val.valid).toBe(false);
    expect(val.statusCode).toBe(401);

    // Random non-existent key
    const valRandom = await validateApiKey("spg_live_nonexistent0000000000", mockEnv);
    expect(valRandom.valid).toBe(false);
    expect(valRandom.statusCode).toBe(401);
  });

  it("should create, store, and validate BYOK API keys with associated provider credentials", async () => {
    const byokProviders = {
      googleKey: "AIzaSyTestGoogleKey123",
      mistralKey: "api_mistral_test_456",
      groqKey: "gsk_groq_test_789",
    };

    const { rawKey, record } = await createApiKey(
      "Production BYOK Key",
      "byok",
      1000000,
      mockEnv,
      "user_123",
      byokProviders
    );

    expect(record.tier).toBe("byok");
    expect(record.byok_google_key).toBe("AIzaSyTestGoogleKey123");
    expect(record.byok_mistral_key).toBe("api_mistral_test_456");
    expect(record.byok_groq_key).toBe("gsk_groq_test_789");
    expect(record.byok_providers).toEqual(["Google", "Mistral", "Groq"]);

    // Validation should return provider keys
    const val = await validateApiKey(rawKey, mockEnv);
    expect(val.valid).toBe(true);
    expect(val.record?.tier).toBe("byok");
    expect(val.record?.byok_google_key).toBe("AIzaSyTestGoogleKey123");

    // List keys should mask provider secret keys
    const list = await listApiKeys(mockEnv, "user_123");
    const found = list.find((k) => k.id === record.id);
    expect(found).toBeDefined();
    expect(found?.byok_providers).toEqual(["Google", "Mistral", "Groq"]);
    expect(found?.byok_google_key).toContain("••••••••");
  });

  it("should enforce strict account exclusivity between different user accounts", async () => {
    // User Alpha creates a key
    const { record: keyAlpha } = await createApiKey(
      "Alpha Key",
      "free",
      10000,
      mockEnv,
      "user_alpha"
    );

    // User Beta creates a key
    const { record: keyBeta } = await createApiKey(
      "Beta Key",
      "free",
      10000,
      mockEnv,
      "user_beta"
    );

    // Alpha lists keys - must contain Alpha Key, and must NEVER contain Beta Key
    const listAlpha = await listApiKeys(mockEnv, "user_alpha");
    expect(listAlpha.some((k) => k.id === keyAlpha.id)).toBe(true);
    expect(listAlpha.some((k) => k.id === keyBeta.id)).toBe(false);

    // Beta lists keys - must contain Beta Key, and must NEVER contain Alpha Key
    const listBeta = await listApiKeys(mockEnv, "user_beta");
    expect(listBeta.some((k) => k.id === keyBeta.id)).toBe(true);
    expect(listBeta.some((k) => k.id === keyAlpha.id)).toBe(false);

    // User Beta attempts to revoke User Alpha's key - should NOT revoke Alpha's key
    await revokeApiKey(keyAlpha.id, mockEnv, "user_beta");
    const listAlphaAfterUnauthorizedRevoke = await listApiKeys(mockEnv, "user_alpha");
    expect(listAlphaAfterUnauthorizedRevoke.some((k) => k.id === keyAlpha.id && k.is_active === 1)).toBe(true);

    // User Alpha revokes their own key - should succeed
    await revokeApiKey(keyAlpha.id, mockEnv, "user_alpha");
    const listAlphaAfterAuthorizedRevoke = await listApiKeys(mockEnv, "user_alpha");
    expect(listAlphaAfterAuthorizedRevoke.some((k) => k.id === keyAlpha.id)).toBe(false);
  });

  it("should assign 100,000 requests per month quota to Pro tier keys by default", async () => {
    const { record: proKey } = await createApiKey("Pro Quota Test", "pro", undefined, mockEnv, "user_pro");
    expect(proKey.tier).toBe("pro");
    expect(proKey.monthly_quota).toBe(100_000);

    const { record: freeKey } = await createApiKey("Free Quota Test", "free", undefined, mockEnv, "user_free");
    expect(freeKey.tier).toBe("free");
    expect(freeKey.monthly_quota).toBe(10_000);

    const { record: byokKey } = await createApiKey("BYOK Quota Test", "byok", undefined, mockEnv, "user_byok");
    expect(byokKey.tier).toBe("byok");
    expect(byokKey.monthly_quota).toBe(1_000_000);
  });
});
