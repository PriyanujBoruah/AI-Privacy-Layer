/**
 * Upstream AI Provider Types & Architecture
 * AI Privacy Layer - Multi-Model Gateway
 */

export type ProviderId =
  | "openai"
  | "mistral"
  | "google"
  | "groq"
  | "openrouter"
  | "custom";

export interface ProviderConfig {
  id: ProviderId;
  name: string;
  defaultBaseUrl: string;
  defaultHeaderName: string;
}

export interface UpstreamAuthResult {
  headerName: string;
  headerValue: string;
  isUserKey: boolean;
}
