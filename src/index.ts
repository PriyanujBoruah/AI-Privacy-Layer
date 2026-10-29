import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import tokenizationApp from "./routes/tokenization";
import openaiApp from "./routes/openai";
import { DASHBOARD_HTML } from "./dashboard";
import { PRIVACY_POLICY_HTML } from "./legal_privacy";
import { TERMS_OF_SERVICE_HTML } from "./legal_terms";
import { getApiCallLogs } from "./audit/logger";
import { LOGO_DATA_URIS, LOGO_FILES } from "./assets/logos";
import { PROJECTSPG_LOGO_SVG } from "./assets/brand";

const app = new Hono();

// Enable CORS for all routes so browsers, local files, and documentation playgrounds can connect
app.use(
  "*",
  cors({
    origin: (origin) => origin || "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "api-key",
      "x-api-key",
      "x-spg-api-key",
      "x-detection-categories",
      "x-categories",
      "x-custom-entities",
      "x-custom-keywords",
      "x-tokenization-mode",
      "x-upstream-base-url",
      "x-upstream-url",
      "x-preserve-session",
      "x-vault-encryption-key",
      "OpenAI-Organization",
      "OpenAI-Project",
    ],
    exposeHeaders: [
      "Content-Length",
      "X-Kms-Status",
      "x-privacy-gateway",
      "x-privacy-session-id",
      "x-privacy-entities-intercepted",
      "x-privacy-latency-us",
      "x-privacy-mode",
    ],
    maxAge: 86400,
  })
);

app.options("*", (c) => c.body(null, 204));

// Serve Enterprise Privacy Console & Playground
app.get("/", (c) => c.html(DASHBOARD_HTML));
app.get("/dashboard", (c) => c.html(DASHBOARD_HTML));

// Direct Console Routes
app.get("/playground", (c) => c.redirect("/#playground"));
app.get("/home", (c) => c.redirect("/"));

// Redirect legacy marketing/blog routes straight to console
app.get("/blog/*", (c) => c.redirect("/"));
app.get("/blog", (c) => c.redirect("/"));
app.get("/test-results*", (c) => c.redirect("/"));
app.get("/countries", (c) => c.redirect("/"));
app.get("/supported-countries", (c) => c.redirect("/"));
app.get("/industries", (c) => c.redirect("/"));
app.get("/supported-industries", (c) => c.redirect("/"));
app.get("/stack", (c) => c.redirect("/"));
app.get("/comparison", (c) => c.redirect("/"));

// Serve Legal & Compliance Pages (Privacy Policy, Terms of Service)
app.get("/privacy", (c) => c.html(PRIVACY_POLICY_HTML));
app.get("/privacy-policy", (c) => c.html(PRIVACY_POLICY_HTML));
app.get("/terms", (c) => c.html(TERMS_OF_SERVICE_HTML));
app.get("/terms-of-service", (c) => c.html(TERMS_OF_SERVICE_HTML));

// Official Brand Logo & Favicon Endpoints
app.get("/favicon.ico", (c) => {
  return new Response(PROJECTSPG_LOGO_SVG, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
});
app.get("/favicon.svg", (c) => {
  return new Response(PROJECTSPG_LOGO_SVG, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
});
app.get("/logo.svg", (c) => {
  return new Response(PROJECTSPG_LOGO_SVG, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
});

// Mount Data De-identification & Reversible Tokenization Engine on /v1
app.route("/v1", tokenizationApp);

// Mount Drop-In OpenAI Wire-Compatible Gateway on /v1 and / (for root baseURL configs)
app.route("/v1", openaiApp);
app.route("/", openaiApp);

// Public API Keys route (Hackathon Mode - Open Access)
app.get("/api/keys", (c) => {
  return c.json({
    keys: [
      {
        id: "key_open_access",
        name: "Hackathon Public Key",
        key_prefix: "spg_open_access",
        tier: "pro",
        monthly_quota: 1000000,
        requests_used: 0,
        is_active: 1,
        created_at: new Date().toISOString(),
      },
    ],
  });
});
app.post("/api/keys", async (c) => {
  const body: any = await c.req.json().catch(() => ({}));
  return c.json({
    id: `key_${Date.now()}`,
    rawKey: "spg_live_open_access_hackathon",
    keyPrefix: "spg_live_open",
    name: body.name || "Hackathon Key",
    tier: body.tier || "pro",
    monthlyQuota: 1000000,
  }, 201);
});
app.delete("/api/keys/:id", (c) => {
  return c.json({ success: true, message: "API key removed." });
});

// =========================================================================
// Developer Lead Capture Endpoint (/api/leads)
// Persists work emails and company ASNs captured via the Home hero demo
// =========================================================================
app.post("/api/leads", async (c) => {
  try {
    const body: any = await c.req.json().catch(() => ({}));
    const email = (body.email || "").toLowerCase().trim();
    if (!email) return c.json({ error: "Email is required" }, 400);

    const ip = c.req.header("CF-Connecting-IP") || c.req.header("X-Forwarded-For") || "anonymous";
    const cf = (c.req.raw as any)?.cf || {};
    const companyAsn = cf.asOrganization || "Unknown";
    const country = cf.country || "Unknown";

    console.log(`[LEAD_CAPTURED] email="${email}" company="${companyAsn}" country="${country}" ip="${ip}" source="${body.source || "home"}"`);

    const db = c.env?.DB;
    if (db && typeof db.prepare === "function") {
      try {
        await db.prepare(
          `CREATE TABLE IF NOT EXISTS leads (
             id TEXT PRIMARY KEY,
             email TEXT NOT NULL,
             company_asn TEXT,
             country TEXT,
             ip TEXT,
             source TEXT,
             created_at DATETIME DEFAULT CURRENT_TIMESTAMP
           )`
        ).run();

        const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        await db.prepare(
          `INSERT INTO leads (id, email, company_asn, country, ip, source) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(leadId, email, companyAsn, country, ip, body.source || "home").run();
      } catch (dbErr) {
        console.warn("D1 lead persistence warning:", dbErr);
      }
    }

    return c.json({ status: "success", message: "Free tier access unlocked" });
  } catch (err: any) {
    return c.json({ error: err?.message || "Internal error" }, 500);
  }
});

// =========================================================================
// BYOK Multi-Provider Live Model Discovery Endpoint
// Queries Groq Cloud, Google AI Studio, and Mistral AI concurrently
// =========================================================================
async function handleByokModelsDiscovery(c: Context) {
  let body: any = {};
  if (c.req.method === "POST") {
    try {
      body = await c.req.json();
    } catch {
      // fallback to headers or query
    }
  }

  const groqKey =
    body.groqKey?.trim() ||
    c.req.query("groqKey")?.trim() ||
    c.req.header("x-byok-groq-key")?.trim() ||
    "";
  const googleKey =
    body.googleKey?.trim() ||
    c.req.query("googleKey")?.trim() ||
    c.req.header("x-byok-google-key")?.trim() ||
    "";
  const mistralKey =
    body.mistralKey?.trim() ||
    c.req.query("mistralKey")?.trim() ||
    c.req.header("x-byok-mistral-key")?.trim() ||
    "";

  const results: {
    groq: { models: { id: string; name: string }[]; error?: string; count: number };
    google: { models: { id: string; name: string }[]; error?: string; count: number };
    mistral: { models: { id: string; name: string }[]; error?: string; count: number };
  } = {
    groq: { models: [], count: 0 },
    google: { models: [], count: 0 },
    mistral: { models: [], count: 0 },
  };

  await Promise.allSettled([
    // 1. Groq Cloud Models (api.groq.com/openai/v1/models)
    (async () => {
      if (!groqKey) return;
      try {
        const res = await fetch("https://api.groq.com/openai/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${groqKey}` },
        });
        if (!res.ok) {
          const errText = await res.text();
          results.groq.error = `Groq error (${res.status}): ${errText.slice(0, 100)}`;
          return;
        }
        const data: any = await res.json();
        if (Array.isArray(data?.data)) {
          const models = data.data
            .filter(
              (m: any) =>
                m.active !== false &&
                !m.id.startsWith("whisper-") &&
                !m.id.startsWith("distil-whisper-") &&
                !m.id.includes("guard")
            )
            .map((m: any) => ({
              id: m.id,
              name: m.id,
            }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id));
          results.groq.models = models;
          results.groq.count = models.length;
        }
      } catch (err: any) {
        results.groq.error = err?.message || "Failed to fetch Groq models";
      }
    })(),

    // 2. Google AI Studio Models (generativelanguage.googleapis.com)
    (async () => {
      if (!googleKey) return;
      try {
        // Try OpenAI compatibility endpoint first
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${googleKey}` },
        });

        if (res.ok) {
          const data: any = await res.json();
          if (Array.isArray(data?.data) && data.data.length > 0) {
            const models = data.data
              .filter(
                (m: any) =>
                  !m.id.includes("embedding") &&
                  !m.id.includes("aqa") &&
                  (m.id.startsWith("gemini") || m.id.startsWith("gemma") || m.id.includes("gemini"))
              )
              .map((m: any) => ({
                id: m.id,
                name: m.id,
              }))
              .sort((a: any, b: any) => a.id.localeCompare(b.id));
            results.google.models = models;
            results.google.count = models.length;
            return;
          }
        }

        // Fallback to Native Gemini models API
        const nativeRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${googleKey}`,
          { method: "GET" }
        );
        if (!nativeRes.ok) {
          const errText = await nativeRes.text();
          results.google.error = `Google error (${nativeRes.status}): ${errText.slice(0, 100)}`;
          return;
        }
        const nativeData: any = await nativeRes.json();
        if (Array.isArray(nativeData?.models)) {
          const models = nativeData.models
            .filter((m: any) =>
              Array.isArray(m.supportedGenerationMethods)
                ? m.supportedGenerationMethods.includes("generateContent")
                : true
            )
            .map((m: any) => {
              const cleanId = m.name?.replace(/^models\//, "") || m.name;
              return {
                id: cleanId,
                name: cleanId,
              };
            })
            .sort((a: any, b: any) => a.id.localeCompare(b.id));
          results.google.models = models;
          results.google.count = models.length;
        }
      } catch (err: any) {
        results.google.error = err?.message || "Failed to fetch Google models";
      }
    })(),

    // 3. Mistral AI Models (api.mistral.ai/v1/models)
    (async () => {
      if (!mistralKey) return;
      try {
        const res = await fetch("https://api.mistral.ai/v1/models", {
          method: "GET",
          headers: { Authorization: `Bearer ${mistralKey}` },
        });
        if (!res.ok) {
          const errText = await res.text();
          results.mistral.error = `Mistral error (${res.status}): ${errText.slice(0, 100)}`;
          return;
        }
        const data: any = await res.json();
        if (Array.isArray(data?.data)) {
          const models = data.data
            .filter(
              (m: any) =>
                !m.id.includes("embed") &&
                (m.capabilities ? m.capabilities.completion_chat !== false : true)
            )
            .map((m: any) => ({
              id: m.id,
              name: m.id,
            }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id));
          results.mistral.models = models;
          results.mistral.count = models.length;
        }
      } catch (err: any) {
        results.mistral.error = err?.message || "Failed to fetch Mistral models";
      }
    })(),
  ]);

  return c.json({
    status: "ok",
    providers: results,
    totalDiscovered: results.groq.count + results.google.count + results.mistral.count,
  });
}

app.post("/api/byok/models", handleByokModelsDiscovery);
app.get("/api/byok/models", handleByokModelsDiscovery);

// =========================================================================
// API Request & Token Usage Logs (Telemetry & Audit Logs)
// =========================================================================
app.get("/api/logs", async (c) => {
  const limit = Number(c.req.query("limit")) || 50;
  const logs = await getApiCallLogs({ limit }, c.env);
  return c.json({ logs });
});

app.get("/v1/logs", async (c) => {
  const limit = Number(c.req.query("limit")) || 50;
  const logs = await getApiCallLogs({ limit }, c.env);
  return c.json({ object: "list", data: logs });
});

// Serve static logo images for easy referencing across the app
app.get("/logos/:filename", (c) => {
  const filename = c.req.param("filename");
  const entry = Object.entries(LOGO_FILES).find(
    ([_, file]) => file.toLowerCase() === filename.toLowerCase()
  );
  if (entry) {
    const dataUri = LOGO_DATA_URIS[entry[0] as keyof typeof LOGO_DATA_URIS];
    const base64Data = dataUri.split(",")[1];
    const binary = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
    return new Response(binary, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
  return c.text("Logo not found", 404);
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    version: "2.0.0",
    features: [
      "de-identification",
      "detokenization",
      "openai-proxy",
      "streaming-sse",
      "embeddings",
      "byok-kms",
      "siem-audit",
      "api-keys",
      "dashboard",
    ],
  });
});

app.get("/", (c) => {
  const accept = c.req.header("Accept") || "";
  if (accept.includes("text/html")) {
    return c.html(DASHBOARD_HTML);
  }
  return c.text("AI Privacy Layer: Sovereign Privacy Gateway & Edge De-identification is active. Visit /dashboard in your browser.");
});

export default app;
