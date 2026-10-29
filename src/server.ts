import { serve } from "@hono/node-server";
import * as fs from "node:fs";
import * as path from "node:path";
import app from "./index";

// Automatically load local .env file if present in workspace root
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const rawContent = fs.readFileSync(envPath, "utf-8");
    const lines = rawContent.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!(globalThis as any).process?.env[key]) {
          (globalThis as any).process.env[key] = val;
        }
      }
    }
  }
} catch {
  // Non-fatal if .env cannot be read
}

const port = Number((globalThis as any).process?.env?.PORT) || 8787;

console.log(`
================================================================
   AI Privacy Layer: Sovereign Privacy Gateway (Local Edition)
================================================================
   Local URL:      http://localhost:${port}
   Dashboard:      http://localhost:${port}/dashboard
   Health Check:   http://localhost:${port}/health
   API Base URL:   http://localhost:${port}/v1
================================================================
   Status: Ready out of the box with in-memory KMS vault.
================================================================
`);

serve({
  fetch: app.fetch,
  port,
});
