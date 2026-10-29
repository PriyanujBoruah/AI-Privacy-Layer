import { ProviderConfig, ProviderId } from "./types";

export const PROVIDER_REGISTRY: Record<ProviderId, ProviderConfig> = {
  openai: {
    id: "openai",
    name: "OpenAI",
    defaultBaseUrl: "https://api.openai.com/v1",
    defaultHeaderName: "Authorization",
  },
  mistral: {
    id: "mistral",
    name: "Mistral AI",
    defaultBaseUrl: "https://api.mistral.ai/v1",
    defaultHeaderName: "Authorization",
  },
  google: {
    id: "google",
    name: "Google AI Studio",
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    defaultHeaderName: "Authorization",
  },
  groq: {
    id: "groq",
    name: "Groq Cloud",
    defaultBaseUrl: "https://api.groq.com/openai/v1",
    defaultHeaderName: "Authorization",
  },
  openrouter: {
    id: "openrouter",
    name: "OpenRouter",
    defaultBaseUrl: "https://openrouter.ai/api/v1",
    defaultHeaderName: "Authorization",
  },
  custom: {
    id: "custom",
    name: "Custom Enterprise Endpoint",
    defaultBaseUrl: "https://api.openai.com/v1",
    defaultHeaderName: "Authorization",
  },
};

/**
 * Detects the target provider based on model naming patterns and headers.
 */
export function detectProvider(model?: string, authHeader?: string, googHeader?: string): ProviderConfig {
  const modelLower = (model || "").toLowerCase();
  const authLower = (authHeader || "").toLowerCase();
  const googLower = (googHeader || "").toLowerCase();

  // 1. Google AI Studio (Gemini & Gemma models)
  if (
    modelLower.startsWith("gemini") ||
    modelLower.startsWith("gemma") ||
    modelLower.includes("gemini") ||
    modelLower.startsWith("learnlm") ||
    authHeader?.includes("AIza") ||
    googHeader?.startsWith("AIza")
  ) {
    return PROVIDER_REGISTRY.google;
  }

  // 2. Mistral AI (mistral, codestral, ministral, pixtral, spg-*)
  if (
    modelLower.startsWith("mistral") ||
    modelLower.startsWith("codestral") ||
    modelLower.startsWith("ministral") ||
    modelLower.startsWith("open-mistral") ||
    modelLower.startsWith("pixtral") ||
    modelLower.includes("mistral") ||
    modelLower.startsWith("spg-") ||
    modelLower.startsWith("spg ")
  ) {
    return PROVIDER_REGISTRY.mistral;
  }

  // 3. Groq Cloud (openai/gpt-oss-*, qwen/*, llama*, mixtral*, whisper*, deepseek, groq)
  if (
    modelLower.startsWith("openai/gpt-oss") ||
    modelLower.startsWith("qwen") ||
    modelLower.startsWith("llama") ||
    modelLower.startsWith("mixtral") ||
    modelLower.startsWith("whisper") ||
    modelLower.includes("deepseek") ||
    modelLower.includes("groq") ||
    modelLower.includes("llama")
  ) {
    return PROVIDER_REGISTRY.groq;
  }

  // 4. OpenRouter (other models containing slash or oss)
  if (modelLower.includes("/") || modelLower.includes("oss")) {
    return PROVIDER_REGISTRY.openrouter;
  }

  // 5. Default fallback to OpenAI
  return PROVIDER_REGISTRY.openai;
}
