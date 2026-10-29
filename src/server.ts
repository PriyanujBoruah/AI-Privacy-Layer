import { serve } from "@hono/node-server";
import app from "./index";

const port = Number((globalThis as any).process?.env?.PORT) || 8787;

console.log(`🛡️  AI Privacy Core Gateway running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
