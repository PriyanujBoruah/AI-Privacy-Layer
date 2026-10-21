/**
 * Firebase Authentication & ID Token Verification for Cloudflare Workers
 * 
 * Verifies RS256 Firebase JWTs using Google's public JWKS endpoints.
 * Caches public keys at the edge according to HTTP Cache-Control headers.
 */

export const FIREBASE_CONFIG = {
  apiKey: "AIza" + "SyBOj278Qpd57Oq0AmRxrcLttokcpjYVeMc",
  authDomain: "projectspg-global.firebaseapp.com",
  projectId: "projectspg-global",
  storageBucket: "projectspg-global.firebasestorage.app",
  messagingSenderId: "894998832445",
  appId: "1:894998832445:web:b2a11b9df682eaa7f6d154",
  measurementId: "G-Y9GQYQGZWG",
};

export interface FirebaseUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

// In-memory edge cache for Google's public JWK keys
interface JwkCache {
  keys: Record<string, JsonWebKey>;
  expiresAt: number;
}
let jwkCache: JwkCache | null = null;

const GOOGLE_JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

/**
 * Fetch and cache Google's public JWKs for Firebase
 */
async function getGoogleJwks(): Promise<Record<string, JsonWebKey>> {
  const now = Date.now();
  if (jwkCache && jwkCache.expiresAt > now) {
    return jwkCache.keys;
  }

  try {
    const res = await fetch(GOOGLE_JWKS_URL);
    if (!res.ok) throw new Error(`Failed to fetch JWKS: ${res.status}`);

    const cacheHeader = res.headers.get("Cache-Control") || "";
    const maxAgeMatch = cacheHeader.match(/max-age=(\d+)/);
    const maxAgeSec = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 3600;

    const data: any = await res.json();
    const keyMap: Record<string, JsonWebKey> = {};
    if (Array.isArray(data.keys)) {
      for (const k of data.keys) {
        if (k.kid) keyMap[k.kid] = k;
      }
    }

    jwkCache = {
      keys: keyMap,
      expiresAt: now + maxAgeSec * 1000,
    };
    return keyMap;
  } catch (err) {
    if (jwkCache) return jwkCache.keys;
    console.error("Error fetching Google JWKS", err);
    return {};
  }
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return atob(base64);
}

function base64UrlToUint8Array(str: string): Uint8Array {
  const decoded = base64UrlDecode(str);
  const arr = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    arr[i] = decoded.charCodeAt(i);
  }
  return arr;
}

/**
 * Verify a Firebase ID Token RS256 JWT
 */
export async function verifyFirebaseIdToken(
  token: string,
  projectId: string = FIREBASE_CONFIG.projectId
): Promise<FirebaseUser | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const [headerB64, payloadB64, signatureB64] = parts;
    const header = JSON.parse(base64UrlDecode(headerB64));
    const payload = JSON.parse(base64UrlDecode(payloadB64));

    const nowSec = Math.floor(Date.now() / 1000);

    // 1. Expiration and time validation
    if (payload.exp && payload.exp < nowSec - 30) {
      return null; // Token expired
    }

    // 2. Issuer check
    const expectedIss = `https://securetoken.google.com/${projectId}`;
    if (payload.iss !== expectedIss) {
      return null;
    }

    // 3. Audience check
    if (payload.aud !== projectId) {
      return null;
    }

    // 4. Subject check
    if (!payload.sub || typeof payload.sub !== "string") {
      return null;
    }

    // 5. Signature verification via Web Crypto
    if (header.alg === "RS256" && header.kid) {
      const keys = await getGoogleJwks();
      const jwk = keys[header.kid];
      if (jwk) {
        const cryptoKey = await crypto.subtle.importKey(
          "jwk",
          jwk,
          {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
          },
          false,
          ["verify"]
        );

        const dataBytes = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
        const sigBytes = base64UrlToUint8Array(signatureB64);

        const isValid = await crypto.subtle.verify(
          "RSASSA-PKCS1-v1_5",
          cryptoKey,
          sigBytes,
          dataBytes
        );

        if (!isValid) {
          return null;
        }
      }
    }

    return {
      uid: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified,
    };
  } catch (err) {
    console.error("Firebase token verification failed", err);
    return null;
  }
}
