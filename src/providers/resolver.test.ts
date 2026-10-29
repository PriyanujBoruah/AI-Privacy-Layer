import { describe, it, expect } from "vitest";
import {
  detectProvider,
  PROVIDER_REGISTRY,
  resolveUpstreamBaseUrl,
  resolveUpstreamAuth,
  DEFAULT_PLATFORM_KEYS,
} from "./index";

function mockContext(headers: Record<string, string> = {}, query: Record<string, string> = {}, env: Record<string, any> = {}) {
  return {
    req: {
      header: (name: string) => headers[name.toLowerCase()] || headers[name] || undefined,
      query: (name: string) => query[name] || undefined,
    },
    env,
  } as any;
}

describe("Upstream AI Provider Adapters & Resolver", () => {
  it("should detect Google AI Studio for Gemini and Gemma models", () => {
    const gemini = detectProvider("gemini-1.5-pro");
    expect(gemini.id).toBe("google");
    expect(gemini.defaultBaseUrl).toContain("googleapis.com");

    const gemma = detectProvider("gemma-4-31b-it");
    expect(gemma.id).toBe("google");
  });

  it("should detect Mistral AI for Mistral and Codestral models", () => {
    const mistral = detectProvider("mistral-large-2512");
    expect(mistral.id).toBe("mistral");
    expect(mistral.defaultBaseUrl).toContain("mistral.ai");

    const codestral = detectProvider("codestral-2508");
    expect(codestral.id).toBe("mistral");
  });

  it("should detect Groq Cloud for Llama and DeepSeek models", () => {
    const llama = detectProvider("llama-3.3-70b-versatile");
    expect(llama.id).toBe("groq");
    expect(llama.defaultBaseUrl).toContain("groq.com");

    const deepseek = detectProvider("deepseek-r1-distill-llama-70b");
    expect(deepseek.id).toBe("groq");
  });

  it("should detect OpenRouter for models with slash naming", () => {
    const openrouter = detectProvider("anthropic/claude-3-5-sonnet");
    expect(openrouter.id).toBe("openrouter");
  });

  it("should fallback to OpenAI for default or standard GPT models", () => {
    const openai = detectProvider("gpt-4o");
    expect(openai.id).toBe("openai");
    expect(openai.defaultBaseUrl).toContain("openai.com");
  });

  it("should prioritize x-upstream-base-url header over smart detection", () => {
    const ctx = mockContext({ "x-upstream-base-url": "https://custom-enterprise-llm.internal/v1" });
    const url = resolveUpstreamBaseUrl(ctx, "gemini-1.5-pro");
    expect(url).toBe("https://custom-enterprise-llm.internal/v1");
  });

  it("should resolve direct user authorization headers when provided", () => {
    const ctx = mockContext({ authorization: "Bearer sk-custom-user-secret-12345" });
    const auth = resolveUpstreamAuth(ctx, "gpt-4o");
    expect(auth).toBeDefined();
    expect(auth?.isUserKey).toBe(true);
    expect(auth?.headerValue).toBe("Bearer sk-custom-user-secret-12345");
  });

  it("should fallback to platform keys for anonymous or demo requests", () => {
    const ctx = mockContext({ authorization: "Bearer hackathon-guest" });
    const auth = resolveUpstreamAuth(ctx, "mistral-large-2512");
    expect(auth).toBeDefined();
    expect(auth?.isUserKey).toBe(false);
    expect(auth?.headerValue).toContain(DEFAULT_PLATFORM_KEYS.mistral);
  });
});
