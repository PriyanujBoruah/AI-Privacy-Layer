import { Context } from "hono";
import { DEFAULT_PLATFORM_KEYS } from "./keys";
import { detectProvider, PROVIDER_REGISTRY } from "./registry";
import { UpstreamAuthResult } from "./types";

/**
 * Resolve upstream base URL (e.g. OpenAI, Google AI Studio, Mistral, Groq, OpenRouter, Azure)
 */
export function resolveUpstreamBaseUrl(c: Context, model?: string): string {
  const headerUrl = c.req.header("x-upstream-base-url") || c.req.header("x-upstream-url");
  if (headerUrl) {
    return headerUrl.trim().replace(/\/+$/, "");
  }

  const queryUrl = c.req.query("upstream_url");
  if (queryUrl) {
    return queryUrl.trim().replace(/\/+$/, "");
  }

  const envUrl = (c.env as any)?.UPSTREAM_BASE_URL || (c.env as any)?.OPENAI_BASE_URL;
  if (envUrl) {
    return envUrl.trim().replace(/\/+$/, "");
  }

  const procEnv = (globalThis as any).process?.env;
  if (procEnv?.OPENAI_BASE_URL) {
    return procEnv.OPENAI_BASE_URL.trim().replace(/\/+$/, "");
  }

  // Automatic Smart Provider Detection
  const authHeader = c.req.header("Authorization") || "";
  const googHeader = c.req.header("x-goog-api-key") || "";

  const provider = detectProvider(model, authHeader, googHeader);
  return provider.defaultBaseUrl;
}

/**
 * Resolve Authorization / API Key for upstream LLM provider.
 * If user hasn't provided their own key, provide platform free tier key.
 */
export function resolveUpstreamAuth(
  c: Context,
  model?: string,
  targetUrl?: string
): UpstreamAuthResult | null {
  const authHeader = c.req.header("Authorization") || "";
  const authHeaderLower = authHeader.toLowerCase();
  const isPlatformKey =
    authHeaderLower.startsWith("bearer spg_") ||
    authHeaderLower.startsWith("bearer apl_") ||
    authHeaderLower.startsWith("bearer apl-") ||
    authHeaderLower.startsWith("bearer privacy_") ||
    authHeaderLower.includes("hackathon");
  const isPlaceholderKey =
    authHeader.includes("YOUR_SPG_KEY") ||
    authHeaderLower.includes("bearer demo") ||
    authHeaderLower.includes("bearer test") ||
    authHeaderLower.includes("bearer free");

  const url = targetUrl || resolveUpstreamBaseUrl(c, model);

  // 1. If user supplied their own direct upstream provider key
  if (authHeader && !isPlatformKey && !isPlaceholderKey) {
    if (!url.includes("api.openai.com") || authHeader.startsWith("Bearer sk-")) {
      return { headerName: "Authorization", headerValue: authHeader, isUserKey: true };
    }
  }

  const googKey = c.req.header("x-goog-api-key");
  if (googKey) {
    return { headerName: "Authorization", headerValue: `Bearer ${googKey}`, isUserKey: true };
  }

  const azureKey = c.req.header("api-key");
  if (azureKey) {
    return { headerName: "api-key", headerValue: azureKey, isUserKey: true };
  }

  // 2. Check if direct provider keys or BYOK headers are provided
  const byokGoogleKey = c.req.header("x-byok-google-key");
  const byokMistralKey = c.req.header("x-byok-mistral-key");
  const byokGroqKey = c.req.header("x-byok-groq-key");
  const modelLower = (model || "").toLowerCase();

  if (byokGoogleKey || byokMistralKey || byokGroqKey) {
    // Google AI Studio
    if (
      url.includes("generativelanguage.googleapis.com") ||
      modelLower.startsWith("gemini") ||
      modelLower.startsWith("gemma") ||
      modelLower.includes("gemini") ||
      modelLower.startsWith("learnlm")
    ) {
      if (byokGoogleKey) {
        return { headerName: "Authorization", headerValue: `Bearer ${byokGoogleKey}`, isUserKey: true };
      }
    }

    // Mistral AI
    if (
      url.includes("mistral.ai") ||
      modelLower.startsWith("mistral") ||
      modelLower.startsWith("codestral") ||
      modelLower.startsWith("ministral") ||
      modelLower.startsWith("open-mistral") ||
      modelLower.startsWith("pixtral") ||
      modelLower.includes("mistral") ||
      modelLower.startsWith("spg-") ||
      modelLower.startsWith("spg ")
    ) {
      if (byokMistralKey) {
        return { headerName: "Authorization", headerValue: `Bearer ${byokMistralKey}`, isUserKey: true };
      }
    }

    // Groq Cloud
    if (
      url.includes("groq.com") ||
      modelLower.startsWith("openai/gpt-oss") ||
      modelLower.startsWith("qwen") ||
      modelLower.startsWith("llama") ||
      modelLower.startsWith("mixtral") ||
      modelLower.startsWith("whisper") ||
      modelLower.includes("deepseek") ||
      modelLower.includes("groq") ||
      modelLower.includes("llama")
    ) {
      if (byokGroqKey) {
        return { headerName: "Authorization", headerValue: `Bearer ${byokGroqKey}`, isUserKey: true };
      }
    }
  }

  // 3. User has NOT added their own key: provide free tier platform key
  // Google AI Studio (Gemini & Gemma)
  if (
    url.includes("generativelanguage.googleapis.com") ||
    modelLower.startsWith("gemini") ||
    modelLower.startsWith("gemma") ||
    modelLower.includes("gemini") ||
    modelLower.startsWith("learnlm")
  ) {
    const key =
      (c.env as any)?.GEMINI_API_KEY ||
      (globalThis as any).process?.env?.GEMINI_API_KEY ||
      DEFAULT_PLATFORM_KEYS.gemini;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Mistral AI (mistral, codestral, ministral, pixtral, spg-*)
  if (
    url.includes("mistral.ai") ||
    modelLower.startsWith("mistral") ||
    modelLower.startsWith("codestral") ||
    modelLower.startsWith("ministral") ||
    modelLower.startsWith("open-mistral") ||
    modelLower.startsWith("pixtral") ||
    modelLower.includes("mistral") ||
    modelLower.startsWith("spg-") ||
    modelLower.startsWith("spg ")
  ) {
    const key =
      (c.env as any)?.MISTRAL_API_KEY ||
      (globalThis as any).process?.env?.MISTRAL_API_KEY ||
      DEFAULT_PLATFORM_KEYS.mistral;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Groq Cloud (openai/gpt-oss, qwen, llama, mixtral, deepseek)
  if (
    url.includes("groq.com") ||
    modelLower.startsWith("openai/gpt-oss") ||
    modelLower.startsWith("qwen") ||
    modelLower.startsWith("llama") ||
    modelLower.startsWith("mixtral") ||
    modelLower.includes("deepseek") ||
    modelLower.includes("groq") ||
    modelLower.includes("llama")
  ) {
    const key =
      (c.env as any)?.GROQ_API_KEY ||
      (globalThis as any).process?.env?.GROQ_API_KEY ||
      DEFAULT_PLATFORM_KEYS.groq;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // OpenRouter
  if (url.includes("openrouter.ai") || modelLower.includes("/") || modelLower.includes("oss")) {
    const key =
      (c.env as any)?.OPENROUTER_API_KEY ||
      (globalThis as any).process?.env?.OPENROUTER_API_KEY ||
      DEFAULT_PLATFORM_KEYS.openrouter;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Fallback to OpenAI env if targeting OpenAI
  if (url.includes("api.openai.com")) {
    const envOpenAiKey = (c.env as any)?.OPENAI_API_KEY || (globalThis as any).process?.env?.OPENAI_API_KEY;
    if (envOpenAiKey) {
      return { headerName: "Authorization", headerValue: `Bearer ${envOpenAiKey}`, isUserKey: false };
    }
  }

  // Safe default platform fallback for Groq and general LLM proxy calls
  const defaultKey = (c.env as any)?.GROQ_API_KEY || DEFAULT_PLATFORM_KEYS.groq;
  return { headerName: "Authorization", headerValue: `Bearer ${defaultKey}`, isUserKey: false };
}
