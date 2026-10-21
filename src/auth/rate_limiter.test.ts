import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_PLATFORM_KEYS,
  isFreeTierRequest,
  checkFreeTierRateLimit,
  checkProTierRateLimit,
  checkDailyLimit,
  clearRateLimits,
  createRateLimitErrorPayload,
  createDailyLimitErrorPayload,
  getRateLimitHeaders,
  getDailyLimitHeaders,
  resolveClientIdentifier,
  DAILY_PLATFORM_LIMIT,
  DAILY_BYOK_LIMIT,
} from "./rate_limiter";

describe("Free Tier Rate Limiter & Upstream Provider Keys", () => {
  beforeEach(() => {
    clearRateLimits();
    (globalThis as any).__DISABLE_RATE_LIMIT__ = false;
  });

  it("should provide pre-configured platform keys for all supported services", () => {
    expect(DEFAULT_PLATFORM_KEYS.groq.startsWith("gsk_")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.gemini.startsWith("AQ.")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.openrouter.startsWith("sk-or-v1-")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.mistral.startsWith("mstrl_")).toBe(true);
  });

  it("should identify free tier vs paid tier accurately", () => {
    const fakeContext = {} as any;

    // Anonymous or missing key => free tier
    expect(isFreeTierRequest(fakeContext, undefined, false)).toBe(true);

    // Free tier SPG key => free tier
    expect(isFreeTierRequest(fakeContext, { tier: "free" }, false)).toBe(true);

    // Pro or enterprise SPG key => NOT free tier
    expect(isFreeTierRequest(fakeContext, { tier: "pro" }, false)).toBe(false);
    expect(isFreeTierRequest(fakeContext, { tier: "enterprise" }, false)).toBe(false);

    // User brought their own direct upstream key => NOT free tier
    expect(isFreeTierRequest(fakeContext, undefined, true)).toBe(false);
  });

  it("should allow first request and enforce 1 request per 15 seconds rate limit", async () => {
    const clientId = "client_test_user_1";

    // 1st request -> Allowed
    const firstRes = await checkFreeTierRateLimit(clientId);
    expect(firstRes.allowed).toBe(true);
    expect(firstRes.remainingRequests).toBe(1);

    // 2nd request immediately after -> Rejected with 429 Retry-After
    const secondRes = await checkFreeTierRateLimit(clientId);
    expect(secondRes.allowed).toBe(false);
    expect(secondRes.remainingRequests).toBe(0);
    expect(secondRes.retryAfterSec).toBeGreaterThan(0);
    expect(secondRes.retryAfterSec).toBeLessThanOrEqual(15);

    // Different client -> Allowed
    const otherClientRes = await checkFreeTierRateLimit("client_test_user_2");
    expect(otherClientRes.allowed).toBe(true);
  });

  it("should generate standard rate limit error payload and headers", () => {
    const errorPayload = createRateLimitErrorPayload(14);
    expect(errorPayload.error.type).toBe("rate_limit_error");
    expect(errorPayload.error.code).toBe("rate_limit_exceeded");
    expect(errorPayload.error.retry_after).toBe(14);
    expect(errorPayload.error.message).toContain("1 protected request per 15 seconds");

    const headers = getRateLimitHeaders(14);
    expect(headers["Retry-After"]).toBe("14");
    expect(headers["x-ratelimit-limit"]).toBe("1");
    expect(headers["x-ratelimit-period"]).toBe("15s");
    expect(headers["x-ratelimit-reset"]).toBe("14");
  });

  it("should allow first request and enforce 1 request per 5 seconds rate limit for Pro tier", async () => {
    const clientId = "client_pro_user_1";

    // 1st request -> Allowed
    const firstRes = await checkProTierRateLimit(clientId);
    expect(firstRes.allowed).toBe(true);
    expect(firstRes.remainingRequests).toBe(1);
    expect(firstRes.tier).toBe("pro");

    // 2nd request immediately after -> Rejected with 429 Retry-After
    const secondRes = await checkProTierRateLimit(clientId);
    expect(secondRes.allowed).toBe(false);
    expect(secondRes.remainingRequests).toBe(0);
    expect(secondRes.retryAfterSec).toBeGreaterThan(0);
    expect(secondRes.retryAfterSec).toBeLessThanOrEqual(5);

    // Different client -> Allowed
    const otherClientRes = await checkProTierRateLimit("client_pro_user_2");
    expect(otherClientRes.allowed).toBe(true);
  });

  it("should generate Pro tier rate limit error payload and headers", () => {
    const errorPayload = createRateLimitErrorPayload(4, "pro");
    expect(errorPayload.error.type).toBe("rate_limit_error");
    expect(errorPayload.error.code).toBe("rate_limit_exceeded");
    expect(errorPayload.error.retry_after).toBe(4);
    expect(errorPayload.error.tier).toBe("pro");
    expect(errorPayload.error.message).toContain("1 protected request per 5 seconds");
    expect(errorPayload.error.message).toContain("Pro tier rate limit exceeded");

    const headers = getRateLimitHeaders(4, "pro");
    expect(headers["Retry-After"]).toBe("4");
    expect(headers["x-ratelimit-limit"]).toBe("1");
    expect(headers["x-ratelimit-period"]).toBe("5s");
    expect(headers["x-ratelimit-reset"]).toBe("4");
  });

  it("should enforce daily limit of 150 requests for platform keys", async () => {
    const clientId = "client_plat_daily_1";
    expect(DAILY_PLATFORM_LIMIT).toBe(150);

    // 1st request -> Allowed
    const first = await checkDailyLimit(clientId, undefined, { isByok: false });
    expect(first.allowed).toBe(true);
    expect(first.used).toBe(1);
    expect(first.limit).toBe(150);
    expect(first.remaining).toBe(149);

    // Simulate exhausting up to 150 requests
    for (let i = 2; i <= 150; i++) {
      const res = await checkDailyLimit(clientId, undefined, { isByok: false });
      expect(res.allowed).toBe(true);
      expect(res.used).toBe(i);
    }

    // 151st request -> Blocked with 429
    const blocked = await checkDailyLimit(clientId, undefined, { isByok: false });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.used).toBe(150);
    expect(blocked.resetsInSeconds).toBeGreaterThan(0);
  });

  it("should enforce daily limit of 10,000 requests for BYOK mode", async () => {
    const clientId = "client_byok_daily_1";
    expect(DAILY_BYOK_LIMIT).toBe(10_000);

    const first = await checkDailyLimit(clientId, undefined, { isByok: true });
    expect(first.allowed).toBe(true);
    expect(first.used).toBe(1);
    expect(first.limit).toBe(10_000);
    expect(first.remaining).toBe(9_999);
  });

  it("should generate Daily Limit error payload and headers accurately", () => {
    const errorPayload = createDailyLimitErrorPayload(150, 150, 3600, false);
    expect(errorPayload.error.type).toBe("rate_limit_error");
    expect(errorPayload.error.code).toBe("daily_limit_exceeded");
    expect(errorPayload.error.daily_limit).toBe(150);
    expect(errorPayload.error.daily_used).toBe(150);
    expect(errorPayload.error.resets_in_seconds).toBe(3600);
    expect(errorPayload.error.message).toContain("maximum 150 requests per day");
    expect(errorPayload.error.message).toContain("switch to BYOK mode");

    const byokError = createDailyLimitErrorPayload(10000, 10000, 3600, true);
    expect(byokError.error.daily_limit).toBe(10000);
    expect(byokError.error.message).toContain("maximum 10,000 requests per day for BYOK mode");

    const headers = getDailyLimitHeaders(150, 0, 3600);
    expect(headers["Retry-After"]).toBe("3600");
    expect(headers["x-ratelimit-limit-daily"]).toBe("150");
    expect(headers["x-ratelimit-remaining-daily"]).toBe("0");
    expect(headers["x-ratelimit-reset-daily"]).toBe("3600");
  });

  it("should unify user ID across playground and API key for shared daily tracking", () => {
    const fakeContext = { req: { header: () => undefined } } as any;

    // 1. API key with user_id
    const keyWithUser = { id: "key_abc", user_id: "user_john_doe" };
    expect(resolveClientIdentifier(fakeContext, keyWithUser, undefined)).toBe("user_john_doe");

    // 2. Playground session with same user_id
    expect(resolveClientIdentifier(fakeContext, undefined, "user_john_doe")).toBe("user_john_doe");

    // 3. API key without user_id
    const keyAnonymous = { id: "key_xyz", user_id: "anonymous" };
    expect(resolveClientIdentifier(fakeContext, keyAnonymous, undefined)).toBe("key_key_xyz");

    // 4. IP fallback for anonymous visitor
    const fakeIpContext = { req: { header: (name: string) => name === "cf-connecting-ip" ? "1.2.3.4" : undefined } } as any;
    expect(resolveClientIdentifier(fakeIpContext, undefined, undefined)).toBe("ip_1.2.3.4");
  });
});
