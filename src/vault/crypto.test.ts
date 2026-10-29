import { describe, it, expect } from "vitest";
import {
  deriveAesKey,
  encryptTokenMap,
  decryptTokenMap,
  computeSha256Fingerprint,
} from "./crypto";

describe("Vault Cryptography (AES-256-GCM & SHA-256 Fingerprinting)", () => {
  const sampleTokenMap: Record<string, string> = {
    EMAIL_1: "alice.wong@fintech.sg",
    CARD_1: "4532-0151-9988-1002",
    SSN_1: "123-45-6789",
  };
  const customerKey = "enterprise-kms-secret-passphrase-2026";

  it("should derive a valid AES-GCM CryptoKey", async () => {
    const key = await deriveAesKey(customerKey);
    expect(key).toBeDefined();
    expect(key.algorithm.name).toBe("AES-GCM");
    expect(key.type).toBe("secret");
  });

  it("should encrypt and successfully decrypt tokenMap using the correct key", async () => {
    const encrypted = await encryptTokenMap(sampleTokenMap, customerKey);
    expect(encrypted).toContain(":");
    expect(encrypted).not.toContain("alice.wong@fintech.sg");

    const decrypted = await decryptTokenMap(encrypted, customerKey);
    expect(decrypted).toEqual(sampleTokenMap);
  });

  it("should fail decryption when given an incorrect encryption key", async () => {
    const encrypted = await encryptTokenMap(sampleTokenMap, customerKey);
    await expect(decryptTokenMap(encrypted, "wrong-customer-key")).rejects.toThrow(
      "KMS Decryption failed"
    );
  });

  it("should produce a deterministic 16-character SHA-256 fingerprint for audit logs", async () => {
    const fp1 = await computeSha256Fingerprint("alice.wong@fintech.sg");
    const fp2 = await computeSha256Fingerprint("alice.wong@fintech.sg");
    const fp3 = await computeSha256Fingerprint("bob.smith@corp.com");

    expect(fp1).toBe(fp2);
    expect(fp1).not.toBe(fp3);
    expect(fp1.length).toBe(16);
    expect(/^[a-f0-9]{16}$/.test(fp1)).toBe(true);
  });
});
