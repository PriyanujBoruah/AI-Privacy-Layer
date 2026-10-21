import { describe, it, expect, vi } from "vitest";
import app from "../index";
import { verifyFirebaseIdToken, FIREBASE_CONFIG } from "./firebase";
import { createApiKey, listApiKeys } from "./keys";

describe("Firebase Authentication & Configuration", () => {
  it("should return the public Firebase client configuration at /api/config/firebase", async () => {
    const res = await app.request("/api/config/firebase");
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.config).toBeDefined();
    expect(data.config.projectId).toBe("projectspg-global");
    expect(data.config.authDomain).toBe("projectspg-global.firebaseapp.com");
    expect(data.config.apiKey).toContain("AIza");
  });

  it("should return user: null at /api/auth/me when unauthenticated", async () => {
    const res = await app.request("/api/auth/me");
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.user).toBeNull();
  });

  it("should return null for malformed or invalid Firebase tokens in verifyFirebaseIdToken", async () => {
    const invalidToken = "not.a.valid.jwt";
    const user = await verifyFirebaseIdToken(invalidToken);
    expect(user).toBeNull();
  });

  it("should return null for empty token in verifyFirebaseIdToken", async () => {
    const user = await verifyFirebaseIdToken("");
    expect(user).toBeNull();
  });

  it("should associate created API keys with user ID when provided", async () => {
    const testUserId = "firebase_usr_test_12345";
    const keyData = await createApiKey("User Test Key", "pro", 50000, null, testUserId);
    expect(keyData.record.user_id).toBe(testUserId);

    const keys = await listApiKeys(null, testUserId);
    const found = keys.find((k) => k.id === keyData.record.id);
    expect(found).toBeDefined();
    expect(found?.user_id).toBe(testUserId);
  });

  it("should serve the dashboard with Firebase scripts, auth modal, and per-model usage panel", async () => {
    const res = await app.request("/dashboard");
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("firebase-app-compat.js");
    expect(html).toContain("firebase-auth-compat.js");
    expect(html).toContain("modal-auth");
    expect(html).toContain("btn-login-trigger");
    expect(html).toContain("user-profile-menu-container");
    expect(html).toContain("models-usage-container");
    expect(html).toContain("usage-activity-tbody");
    expect(html).toContain("SUPPORTED_MODELS_CATALOG");
  });
});
