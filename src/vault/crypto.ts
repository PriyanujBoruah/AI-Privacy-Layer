/**
 * Enterprise Zero-Knowledge BYOK (Bring Your Own Key) & Telemetry Cryptography
 * Uses native Web Crypto API (AES-256-GCM & SHA-256) compatible across
 * Cloudflare Workers, Node.js 18+, Bun, and standard Edge runtimes with zero external dependencies.
 */

function getWebCrypto(): any {
  return (globalThis as any).crypto;
}

/**
 * Derives a 256-bit AES-GCM CryptoKey from an arbitrary string key/passphrase using SHA-256
 */
export async function deriveAesKey(keyString: string): Promise<CryptoKey> {
  const subtle = getWebCrypto().subtle;
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyString);
  const hash = await subtle.digest("SHA-256", keyBytes);

  return subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a token mapping object using AES-256-GCM with a random 12-byte IV
 * Returns a self-contained string: "<iv_base64>:<ciphertext_base64>"
 */
export async function encryptTokenMap(
  tokenMap: Record<string, string>,
  keyString: string
): Promise<string> {
  const key = await deriveAesKey(keyString);
  const iv = getWebCrypto().getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(JSON.stringify(tokenMap));

  const ciphertextBuffer = await getWebCrypto().subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintextBytes
  );

  const ivBase64 = bufferToBase64(iv.buffer);
  const cipherBase64 = bufferToBase64(ciphertextBuffer);

  return `${ivBase64}:${cipherBase64}`;
}

/**
 * Decrypts an encrypted token map payload using the provided key string
 */
export async function decryptTokenMap(
  encryptedPayload: string,
  keyString: string
): Promise<Record<string, string>> {
  const parts = encryptedPayload.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted vault payload format.");
  }

  const [ivBase64, cipherBase64] = parts;
  const iv = base64ToBuffer(ivBase64);
  const ciphertext = base64ToBuffer(cipherBase64);
  const key = await deriveAesKey(keyString);

  try {
    const decryptedBuffer = await getWebCrypto().subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonStr);
  } catch (err: any) {
    throw new Error("KMS Decryption failed: Invalid or mismatched encryption key.");
  }
}

/**
 * Computes a non-reversible SHA-256 fingerprint of sensitive entity values
 * Used for SIEM audit matching and proof-of-work compliance without exposing plaintext PII.
 */
export async function computeSha256Fingerprint(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await getWebCrypto().subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").substring(0, 16);
}

// Helpers for base64 conversions across runtimes
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
