import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import tokenizationApp from "./routes/tokenization";
import openaiApp from "./routes/openai";
import { DASHBOARD_HTML } from "./dashboard";
import { HOME_HTML } from "./home";
import { BENCHMARK_BLOG_HTML } from "./blog_benchmark";
import { COUNTRIES_BLOG_HTML } from "./blog_countries";
import { INDUSTRIES_BLOG_HTML } from "./blog_industries";
import { STACK_BLOG_HTML } from "./blog_stack";
import { PRIVACY_POLICY_HTML } from "./legal_privacy";
import { TERMS_OF_SERVICE_HTML } from "./legal_terms";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  createAuthMiddleware,
} from "./auth/keys";
import { getApiCallLogs } from "./audit/logger";
import { verifyFirebaseIdToken, FIREBASE_CONFIG } from "./auth/firebase";
import {
  getUserProfile,
  saveUserProfile,
  createInvitationCode,
  listInvitationCodes,
  revokeInvitationCode,
  listAllUserProfiles,
  isAdminEmail,
} from "./auth/profile";
import { LOGO_DATA_URIS, LOGO_FILES } from "./assets/logos";
import { BLOG_IMAGE_DATA_URIS, BLOG_IMAGE_FILES } from "./assets/images";
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

// Serve Single-File Enterprise Landing Page & Console
app.get("/", (c) => c.html(DASHBOARD_HTML));
app.get("/dashboard", (c) => c.html(DASHBOARD_HTML));

// Serve Modern Developer-First Home Landing Page (Interactive Hero Demo & Lead Capture)
app.get("/home", (c) => c.html(HOME_HTML));

// Serve Technical Benchmark & Empirical Reliability Blog
app.get("/blog", (c) => c.redirect("/blog/benchmark"));
app.get("/blog/benchmark", (c) => c.html(BENCHMARK_BLOG_HTML));
app.get("/test-results", (c) => c.html(BENCHMARK_BLOG_HTML));
app.get("/test-results.html", (c) => c.html(BENCHMARK_BLOG_HTML));

// Serve Global Sovereign AI Privacy & Supported Countries Blog
app.get("/blog/countries", (c) => c.html(COUNTRIES_BLOG_HTML));
app.get("/countries", (c) => c.html(COUNTRIES_BLOG_HTML));
app.get("/supported-countries", (c) => c.html(COUNTRIES_BLOG_HTML));

// Serve Enterprise Guardrails for Regulated Industries Blog
app.get("/blog/industries", (c) => c.html(INDUSTRIES_BLOG_HTML));
app.get("/industries", (c) => c.html(INDUSTRIES_BLOG_HTML));
app.get("/supported-industries", (c) => c.html(INDUSTRIES_BLOG_HTML));

// Serve Open Model AI Stack & Ranked Market Leader Blog
app.get("/blog/stack", (c) => c.html(STACK_BLOG_HTML));
app.get("/blog/comparison", (c) => c.html(STACK_BLOG_HTML));
app.get("/blog/best-ai-privacy", (c) => c.html(STACK_BLOG_HTML));
app.get("/stack", (c) => c.html(STACK_BLOG_HTML));
app.get("/comparison", (c) => c.html(STACK_BLOG_HTML));

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

// Mount API Key Authentication Middleware on /v1 routes
app.use("/v1/*", createAuthMiddleware());

// Mount Data De-identification & Reversible Tokenization Engine on /v1
app.route("/v1", tokenizationApp);

// Mount Drop-In OpenAI Wire-Compatible Gateway on /v1 and / (for root baseURL configs)
app.route("/v1", openaiApp);
app.route("/", openaiApp);

// =========================================================================
// API Key Management & Firebase Auth REST Endpoints
// =========================================================================
app.get("/api/config/firebase", (c) => {
  return c.json({ config: FIREBASE_CONFIG });
});

app.get("/api/auth/me", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return c.json({ user: null });
  }
  const token = authHeader.slice(7).trim();
  const user = await verifyFirebaseIdToken(token);
  return c.json({ user });
});

// User Profile & Invitation Access Endpoints
app.get("/api/user/profile", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  let userId = c.req.query("userId") || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  if (!userId) {
    return c.json({ profile: null, error: "Unauthorized" }, 401);
  }
  const profile = await getUserProfile(c.env, userId);
  return c.json({ profile });
});

app.post("/api/user/profile", async (c) => {
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {
    // empty body fallback
  }
  const authHeader = c.req.header("Authorization") || "";
  let userId = body.userId || "";
  let email = body.email || "";
  let name = body.name || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) {
      userId = user.uid;
      if (!email && user.email) email = user.email;
      if (!name && user.name) name = user.name;
    }
  }
  if (!userId) {
    return c.json({ error: "User ID required" }, 400);
  }
  const profile = await saveUserProfile(c.env, {
    userId,
    name: body.name || name,
    email: body.email || email,
    org: body.org,
    orgWebsite: body.orgWebsite || body.org_website,
    invitationCode: body.invitationCode || body.invitation_code,
  });
  return c.json({ success: true, profile });
});

// =========================================================================
// Admin Invitation Management Routes (Restricted to boruahpriyanuj2004@gmail.com)
// =========================================================================
async function getAdminUserFromRequest(c: Context) {
  const authHeader = c.req.header("Authorization") || "";
  if (authHeader.startsWith("Bearer ") && !authHeader.toLowerCase().startsWith("bearer spg_")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user && isAdminEmail(user.email)) {
      return user;
    }
  }
  return null;
}

app.get("/api/admin/invitations", async (c) => {
  const admin = await getAdminUserFromRequest(c);
  if (!admin) {
    return c.json({ error: "Unauthorized: Admin access required." }, 403);
  }
  const codes = await listInvitationCodes(c.env);
  return c.json({ codes });
});

app.get("/api/admin/users", async (c) => {
  const admin = await getAdminUserFromRequest(c);
  if (!admin) {
    return c.json({ error: "Unauthorized: Admin access required." }, 403);
  }
  const users = await listAllUserProfiles(c.env);
  return c.json({ users });
});

app.post("/api/admin/invitations", async (c) => {
  const admin = await getAdminUserFromRequest(c);
  if (!admin) {
    return c.json({ error: "Unauthorized: Admin access required." }, 403);
  }
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {}
  const record = await createInvitationCode(c.env, {
    code: body.code,
    description: body.description,
    maxUses: typeof body.maxUses === "number" ? body.maxUses : (parseInt(body.maxUses, 10) || 1),
    createdBy: admin.email || "admin",
  });
  return c.json({ success: true, invitation: record }, 201);
});

app.delete("/api/admin/invitations/:code", async (c) => {
  const admin = await getAdminUserFromRequest(c);
  if (!admin) {
    return c.json({ error: "Unauthorized: Admin access required." }, 403);
  }
  const code = c.req.param("code");
  await revokeInvitationCode(c.env, code);
  return c.json({ success: true, message: `Invitation code ${code} revoked.` });
});

app.get("/api/keys", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  let userId: string | undefined = undefined;
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  if (!userId) {
    return c.json({ keys: [] });
  }
  const keys = await listApiKeys(c.env, userId);
  return c.json({ keys });
});

app.post("/api/keys", async (c) => {
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {
    // empty body fallback
  }
  const authHeader = c.req.header("Authorization") || "";
  let userId: string | undefined = undefined;
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  if (!userId || userId === "anonymous") {
    return c.json({ error: "Authentication required to generate an API key. Please sign in." }, 401);
  }
  const name = body.name || "Default Key";
  const profile = await getUserProfile(c.env, userId);
  const isPro = profile?.accessLevel === "Pro";

  const tier: "pro" | "byok" = body.tier === "byok" ? "byok" : "pro";
  const defaultQuota = tier === "byok" ? 300_000 : 4_500;
  const quota = typeof body.monthlyQuota === "number" ? body.monthlyQuota : defaultQuota;
  const byokKeys = {
    googleKey: body.byokGoogleKey || body.byok_google_key || "",
    mistralKey: body.byokMistralKey || body.byok_mistral_key || "",
    groqKey: body.byokGroqKey || body.byok_groq_key || "",
  };
  const result = await createApiKey(name, tier, quota, c.env, userId, byokKeys);
  return c.json(result, 201);
});

app.delete("/api/keys/:id", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  let userId: string | undefined = undefined;
  let userEmail: string | undefined = undefined;
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) {
      userId = user.uid;
      userEmail = user.email;
    }
  }
  if (!userId) {
    return c.json({ error: "Authentication required to revoke API keys." }, 401);
  }
  const id = c.req.param("id");
  const isAdmin = userEmail && isAdminEmail(userEmail);
  await revokeApiKey(id, c.env, isAdmin ? undefined : userId);
  return c.json({ success: true, message: `API key ${id} revoked.` });
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
// API Request & Token Usage Logs (Account-Exclusive Telemetry)
// =========================================================================
app.get("/api/logs", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  let userId: string | undefined = undefined;
  if (authHeader.startsWith("Bearer ") && !authHeader.toLowerCase().startsWith("bearer spg_")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  if (!userId) {
    return c.json({ logs: [] });
  }
  const apiKeyId = c.req.query("api_key_id");
  const limit = Number(c.req.query("limit")) || 50;
  const logs = await getApiCallLogs({ apiKeyId, userId, limit }, c.env);
  return c.json({ logs });
});

app.get("/v1/logs", async (c) => {
  const apiKeyRecord = (c as any).get("apiKeyRecord");
  const limit = Number(c.req.query("limit")) || 50;
  if (!apiKeyRecord?.id) {
    return c.json({ object: "list", data: [] });
  }
  const logs = await getApiCallLogs({ apiKeyId: apiKeyRecord.id, userId: apiKeyRecord.user_id, limit }, c.env);
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

// Serve static blog illustration images
app.get("/images/:filename", (c) => {
  const filename = c.req.param("filename");
  const normalized = filename.replace(/-v\d+/i, "").toLowerCase();
  const entry = Object.entries(BLOG_IMAGE_FILES).find(
    ([_, file]) => {
      const fLower = file.toLowerCase();
      return fLower === filename.toLowerCase() || fLower === normalized;
    }
  );
  if (entry) {
    const dataUri = BLOG_IMAGE_DATA_URIS[entry[0] as keyof typeof BLOG_IMAGE_DATA_URIS];
    const mimeMatch = dataUri.match(/^data:([^;]+);base64,/);
    const contentType = mimeMatch ? mimeMatch[1] : "image/png";
    const base64Data = dataUri.split(",")[1];
    const binary = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
    return new Response(binary, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }
  return c.text("Image not found", 404);
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
  return c.text("ProjectSPG — Sovereign Privacy Gateway & Edge De-identification is active. Visit /dashboard in your browser.");
});

export default app;
