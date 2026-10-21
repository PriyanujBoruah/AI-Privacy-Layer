import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Hono } from "hono";
import openaiApp from "./openai";
import { saveUserProfile } from "../auth/profile";

describe("OpenAI Drop-In Wire-Compatible Proxy (/v1/chat/completions)", () => {
  let app: Hono;
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    (globalThis as any).__DISABLE_RATE_LIMIT__ = true;
    app = new Hono();
    app.route("/v1", openaiApp);
    app.route("/", openaiApp);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should intercept and sanitize prompts, forward to upstream, and rehydrate non-streaming response", async () => {
    let capturedUpstreamBody: any = null;
    let capturedUpstreamHeaders: any = null;

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      expect(url).toBe("https://api.openai.com/v1/chat/completions");
      capturedUpstreamHeaders = init.headers;
      capturedUpstreamBody = JSON.parse(init.body);

      // Return simulated OpenAI response referencing the tokenized entity
      const mockResponse = {
        id: "chatcmpl-mock-123",
        object: "chat.completion",
        created: 1715368132,
        model: "gpt-4o",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: "I have verified your account associated with EMAIL_1.",
            },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 25, completion_tokens: 12, total_tokens: 37 },
      };

      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-test-key-12345",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a secure assistant." },
          { role: "user", content: "Hello, my email is alice.smith@secure-bank.ch. Please verify." },
        ],
      }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("x-privacy-gateway")).toBe("ai-privacy-core");
    expect(res.headers.get("x-privacy-entities-intercepted")).toBe("1");
    expect(Number(res.headers.get("x-privacy-latency-us"))).toBeGreaterThanOrEqual(0);

    // 1. Verify upstream received the sanitized prompt, never the raw email
    expect(capturedUpstreamBody.messages[1].content).toContain("EMAIL_1");
    expect(capturedUpstreamBody.messages[1].content).not.toContain("alice.smith@secure-bank.ch");
    expect(capturedUpstreamHeaders["Authorization"]).toBe("Bearer sk-test-key-12345");

    // 2. Verify client response received the seamlessly rehydrated original email
    const data: any = await res.json();
    expect(data.choices[0].message.content).toBe(
      "I have verified your account associated with alice.smith@secure-bank.ch."
    );
  });

  it("should handle multimodal message arrays containing text and non-text parts", async () => {
    let capturedUpstreamBody: any = null;

    globalThis.fetch = vi.fn().mockImplementation(async (_url: string, init: any) => {
      capturedUpstreamBody = JSON.parse(init.body);
      const mockResponse = {
        id: "chatcmpl-multi-123",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "Acknowledged user EMAIL_1." },
            finish_reason: "stop",
          },
        ],
      };
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Contact me at dev@enterprise.io" },
              { type: "image_url", image_url: { url: "https://example.com/chart.png" } },
            ],
          },
        ],
      }),
    });

    expect(res.status).toBe(200);
    expect(capturedUpstreamBody.messages[0].content[0].text).toContain("EMAIL_1");
    expect(capturedUpstreamBody.messages[0].content[0].text).not.toContain("dev@enterprise.io");
    expect(capturedUpstreamBody.messages[0].content[1].type).toBe("image_url");

    const data: any = await res.json();
    expect(data.choices[0].message.content).toBe("Acknowledged user dev@enterprise.io.");
  });

  it("should handle streaming SSE completions with split-token rehydration", async () => {
    // Simulate an upstream SSE stream where the token "EMAIL_1" is split across two chunks:
    // Chunk 1: "... email is <EM"
    // Chunk 2: "AIL_1> on file."
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            'data: {"id":"chatcmpl-s1","choices":[{"delta":{"role":"assistant","content":"Your email is <EM"}}]}\n\n'
          )
        );
        controller.enqueue(
          encoder.encode(
            'data: {"id":"chatcmpl-s1","choices":[{"delta":{"content":"AIL_1> on file."}}]}\n\n'
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(stream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        stream: true,
        messages: [{ role: "user", content: "My contact is support@acme.corp" }],
      }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");

    const text = await res.text();
    expect(text).toContain("data: [DONE]");
    // Ensure the client received the rehydrated email, and never split token fragments
    expect(text).toContain("support@acme.corp");
    expect(text).not.toContain("<EMA");
  });

  it("should rehydrate tool call arguments in assistant messages", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      const mockResponse = {
        id: "chatcmpl-tools",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              tool_calls: [
                {
                  id: "call_abc123",
                  type: "function",
                  function: {
                    name: "lookup_user",
                    arguments: '{"email":"EMAIL_1"}',
                  },
                },
              ],
            },
          },
        ],
      };
      return new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: "Query user john@doe.org" }],
      }),
    });

    const data: any = await res.json();
    expect(data.choices[0].message.tool_calls[0].function.arguments).toBe(
      '{"email":"john@doe.org"}'
    );
  });

  it("should support custom enterprise keywords via x-custom-keywords header", async () => {
    let capturedBody: any;
    globalThis.fetch = vi.fn().mockImplementation(async (_url: string, init: any) => {
      capturedBody = JSON.parse(init.body);
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: "Understood CUSTOM_1." } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-custom-keywords": "ProjectApollo, ProjectHelios",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Deploy ProjectApollo to cluster." }],
      }),
    });

    expect(capturedBody.messages[0].content).toContain("CUSTOM_1");
    expect(capturedBody.messages[0].content).not.toContain("ProjectApollo");

    const data: any = await res.json();
    expect(data.choices[0].message.content).toBe("Understood ProjectApollo.");
  });

  it("should allow custom upstream base URL via x-upstream-base-url header", async () => {
    let requestedUrl = "";
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      requestedUrl = url;
      return new Response(JSON.stringify({ choices: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    await app.request("/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-upstream-base-url": "https://api.groq.com/openai/v1",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello world" }],
      }),
    });

    expect(requestedUrl).toBe("https://api.groq.com/openai/v1/chat/completions");
  });

  it("should return 400 for invalid request body missing messages", async () => {
    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o" }),
    });

    expect(res.status).toBe(400);
    const data: any = await res.json();
    expect(data.error.param).toBe("messages");
  });

  it("should faithfully forward upstream errors (e.g. 401 Unauthorized)", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(
        JSON.stringify({
          error: {
            message: "Incorrect API key provided.",
            type: "invalid_request_error",
            code: "invalid_api_key",
          },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }],
      }),
    });

    expect(res.status).toBe(401);
    const data: any = await res.json();
    expect(data.error.code).toBe("invalid_api_key");
  });

  it("should protect vector embeddings via POST /v1/embeddings", async () => {
    let capturedBody: any;
    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      expect(url).toBe("https://api.openai.com/v1/embeddings");
      capturedBody = JSON.parse(init.body);
      return new Response(
        JSON.stringify({
          object: "list",
          data: [{ object: "embedding", index: 0, embedding: [0.01, 0.02, 0.03] }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: "Customer email is confidential@corp.com",
      }),
    });

    expect(res.status).toBe(200);
    expect(capturedBody.input).toContain("EMAIL_1");
    expect(capturedBody.input).not.toContain("confidential@corp.com");
  });

  it("should serve GET /v1/models catalog", async () => {
    const res = await app.request("/v1/models", { method: "GET" });
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.object).toBe("list");
    expect(data.data.some((m: any) => m.id === "ministral-3b-2512")).toBe(true);
    expect(data.data.some((m: any) => m.id === "codestral-2508")).toBe(true);
  });

  it("should work on root /chat/completions without /v1 prefix", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(JSON.stringify({ choices: [{ message: { content: "OK" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const res = await app.request("/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Ping" }],
      }),
    });

    expect(res.status).toBe(200);
  });

  it("should automatically route Gemini models (e.g. gemini-3.5-flash) to Google AI Studio OpenAI endpoint", async () => {
    let capturedUrl = "";
    let capturedBody: any = null;

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body);
      return new Response(
        JSON.stringify({
          id: "chatcmpl-gemini",
          choices: [
            {
              message: { role: "assistant", content: "Processed Gemini request for EMAIL_1." },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer AIzaSyTestGoogleStudioKey",
      },
      body: JSON.stringify({
        model: "gemini-3.5-flash",
        messages: [{ role: "user", content: "Contact dev@gemini.ai" }],
      }),
    });

    expect(res.status).toBe(200);
    // Verified: automatically directed to Google AI Studio's endpoint
    expect(capturedUrl).toBe("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");
    expect(capturedBody.messages[0].content).toContain("EMAIL_1");
    expect(capturedBody.messages[0].content).not.toContain("dev@gemini.ai");

    const data: any = await res.json();
    expect(data.choices[0].message.content).toBe("Processed Gemini request for dev@gemini.ai.");
  });

  it("should support native Google AI Studio SDK calls via POST /v1beta/models/:action", async () => {
    let capturedUrl = "";
    let capturedBody: any = null;

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body);
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                role: "model",
                parts: [{ text: "Hello! Verified account for EMAIL_1." }],
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyFakeKey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello, my email is alice@google.com" }],
          },
        ],
      }),
    });

    expect(res.status).toBe(200);
    expect(capturedUrl).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyFakeKey");
    expect(capturedBody.contents[0].parts[0].text).toContain("EMAIL_1");
    expect(capturedBody.contents[0].parts[0].text).not.toContain("alice@google.com");

    const data: any = await res.json();
    expect(data.candidates[0].content.parts[0].text).toBe("Hello! Verified account for alice@google.com.");
  });

  it("should record structured SIEM audit telemetry and allow querying via GET /v1/audit/events", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "OK EMAIL_1" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const completionRes = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: "Reach out to audit.user@corp.com" }],
      }),
    });
    expect(completionRes.status).toBe(200);

    // Query audit telemetry endpoint
    const auditRes = await app.request("/v1/audit/events?eventType=PROMPT_INTERCEPTED", {
      method: "GET",
    });
    expect(auditRes.status).toBe(200);

    const auditData: any = await auditRes.json();
    expect(auditData.object).toBe("list");
    expect(auditData.total).toBeGreaterThanOrEqual(1);

    const event = auditData.data[0];
    expect(event.eventType).toBe("PROMPT_INTERCEPTED");
    expect(event.entities[0].fingerprint).toBeDefined();
    expect(event.entities[0].fingerprint.length).toBe(16);
    // Non-PII guarantee: Raw email is NOT present anywhere in the audit event object
    expect(JSON.stringify(event)).not.toContain("audit.user@corp.com");
  });

  it("should support customer BYOK KMS encryption header on chat completions", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "Acknowledged EMAIL_1" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vault-encryption-key": "customer-kms-secret-key-42",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: "Contact me at secure@vault.io" }],
      }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("X-Kms-Status")).toBe("encrypted");

    const data: any = await res.json();
    expect(data.choices[0].message.content).toBe("Acknowledged secure@vault.io");
  });

  it("should automatically forward with pre-configured Groq platform key when user has no key", async () => {
    let capturedUrl: string = "";
    let capturedAuth: string = "";

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      capturedUrl = url;
      capturedAuth = init.headers["Authorization"];
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "Groq response" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Explain quantum computing" }],
      }),
    });

    expect(res.status).toBe(200);
    expect(capturedUrl).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(capturedAuth.startsWith("Bearer gsk_")).toBe(true);
  });

  it("should automatically forward with pre-configured Google Gemini platform key when user has no key", async () => {
    let capturedUrl: string = "";
    let capturedAuth: string = "";

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      capturedUrl = url;
      capturedAuth = init.headers["Authorization"];
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "Gemini response" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    const res = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemini-2.5-flash",
        messages: [{ role: "user", content: "Summarize this report" }],
      }),
    });

    expect(res.status).toBe(200);
    expect(capturedUrl).toBe("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");
    expect(capturedAuth.startsWith("Bearer AQ.")).toBe(true);
  });

  it("should enforce 1 request per 15 seconds rate limit on free tier when enabled", async () => {
    (globalThis as any).__DISABLE_RATE_LIMIT__ = false;

    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "OK" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    // 1st request -> 200 OK
    const res1 = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": "198.51.100.42" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Test call 1" }],
      }),
    });
    expect(res1.status).toBe(200);

    // 2nd request immediately -> 429 Too Many Requests
    const res2 = await app.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": "198.51.100.42" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Test call 2" }],
      }),
    });
    expect(res2.status).toBe(429);
    expect(res2.headers.get("Retry-After")).toBeDefined();
    expect(res2.headers.get("x-ratelimit-period")).toBe("15s");

    const errData: any = await res2.json();
    expect(errData.error.code).toBe("rate_limit_exceeded");
    expect(errData.error.message).toContain("1 protected request per 15 seconds");
  });

  it("should enforce 1 request per 5 seconds rate limit on Pro tier when enabled", async () => {
    (globalThis as any).__DISABLE_RATE_LIMIT__ = false;

    const testApp = new Hono();
    testApp.use("*", async (c, next) => {
      (c as any).set("apiKeyRecord", { id: "test_pro_key_rl", user_id: "test_pro_user_rl", tier: "pro" });
      await next();
    });
    testApp.route("/v1", openaiApp);

    globalThis.fetch = vi.fn().mockImplementation(async () => {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "OK" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    });

    // 1st request -> 200 OK
    const res1 = await testApp.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Pro call 1" }],
      }),
    });
    expect(res1.status).toBe(200);

    // 2nd request immediately -> 429 Too Many Requests
    const res2 = await testApp.request("/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Pro call 2" }],
      }),
    });
    expect(res2.status).toBe(429);
    expect(res2.headers.get("Retry-After")).toBeDefined();
    expect(res2.headers.get("x-ratelimit-period")).toBe("5s");

    const errData: any = await res2.json();
    expect(errData.error.code).toBe("rate_limit_exceeded");
    expect(errData.error.tier).toBe("pro");
    expect(errData.error.message).toContain("1 protected request per 5 seconds");
  });

  it("should correctly route specific playground models to Groq, Google AI Studio, and Mistral AI", async () => {
    let capturedUrl = "";
    let capturedBody: any = null;
    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init: any) => {
      capturedUrl = url;
      if (init?.body) capturedBody = JSON.parse(init.body);
      return new Response(JSON.stringify({ choices: [{ message: { content: "OK" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    // 1. Groq Cloud: openai/gpt-oss-120b, openai/gpt-oss-20b, qwen/qwen3.8-27b
    for (const model of ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"]) {
      await app.request("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }] }),
      });
      expect(capturedUrl).toBe("https://api.groq.com/openai/v1/chat/completions");
    }

    // 2. Google AI Studio: gemma-4-26b-it (normalized to a4b), gemma-4-31b-it
    for (const model of ["gemma-4-26b-it", "gemma-4-31b-it", "gemma-4-26b-a4b-it"]) {
      await app.request("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }] }),
      });
      expect(capturedUrl).toBe("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");
      if (model === "gemma-4-26b-it") {
        expect(capturedBody.model).toBe("gemma-4-26b-a4b-it");
      }
    }

    // 3. Mistral AI: codestral-2508, ministral-8b-2512, ministral-14b-2512, mistral-large-2512
    for (const model of ["codestral-2508", "ministral-8b-2512", "ministral-14b-2512", "mistral-large-2512"]) {
      await app.request("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "user", content: "hi" }] }),
      });
      expect(capturedUrl).toBe("https://api.mistral.ai/v1/chat/completions");
    }
  });

  it("should allow accounts full access to all models without restriction", async () => {
    await saveUserProfile({}, {
      userId: "test_unrestricted_user",
      name: "Standard User",
      email: "standard@example.com",
      invitationCode: "",
    });

    const testApp = new Hono();
    testApp.use("*", async (c, next) => {
      (c as any).set("apiKeyRecord", { user_id: "test_unrestricted_user", tier: "free" });
      await next();
    });
    testApp.route("/v1", openaiApp);

    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ choices: [{ message: { content: "OK" } }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    );

    // All models succeed without gating
    for (const model of ["codestral-2508", "ministral-8b-2512", "ministral-14b-2512", "mistral-large-2512", "openai/gpt-oss-120b", "gemma-4-31b-it"]) {
      const res = await testApp.request("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "user", content: "hello" }] }),
      });
      expect(res.status).toBe(200);
    }

    // Native Gemini route also succeeds
    const geminiRes = await testApp.request("/v1/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: "hello" }] }] }),
    });
    expect(geminiRes.status).toBe(200);
  });
});
