/**
 * User Profile & Invitation Access Management Module
 * Manages post-login invitation/referral onboarding and access tagging.
 * Supports Cloudflare D1 SQL storage with in-memory fallback.
 */

export const ADMIN_EMAILS = new Set(["boruahpriyanuj2004@gmail.com"]);

export function isAdminEmail(email?: string): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase().trim());
}

export type AccessLevel = "Pro" | "Free";

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  org: string;
  orgWebsite: string;
  invitationCode: string;
  accessLevel: AccessLevel;
  subscriptionStartedAt?: string;
  subscriptionExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Checks whether a given subscription timestamp is still active.
 * Admin emails never expire.
 */
export function isSubscriptionActive(expiresAt?: string, email?: string): boolean {
  if (isAdminEmail(email)) return true;
  if (!expiresAt) return true; // Backward compatibility for legacy active pro records without explicit expiration
  const expTime = new Date(expiresAt).getTime();
  if (isNaN(expTime)) return true;
  return Date.now() < expTime;
}

export interface InvitationCodeRecord {
  code: string;
  description: string;
  maxUses: number; // 0 or -1 for unlimited
  usesCount: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory fallback cache for isolates or environments without Cloudflare D1
const localProfileStore = new Map<string, UserProfile>();
const localInvitationCodeStore = new Map<string, InvitationCodeRecord>();

// Pre-seeded valid codes for bootstrapping and backward test compatibility
export const DEFAULT_VALID_CODES = new Set([
  "SPG-INVITE-2026",
  "SPG-BETA-ACCESS",
  "VIP",
  "INVITE_VIP_KEY",
]);

let isTableInitialized = false;

async function ensureTable(d1: any) {
  if (isTableInitialized || !d1) return;
  try {
    await d1
      .prepare(
        `CREATE TABLE IF NOT EXISTS user_profiles (
          user_id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          org TEXT,
          org_website TEXT,
          invitation_code TEXT,
          access_level TEXT DEFAULT 'Free',
          subscription_started_at DATETIME,
          subscription_expires_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      )
      .run();

    // Safely apply schema migrations for existing tables if columns are missing
    try {
      await d1.prepare("ALTER TABLE user_profiles ADD COLUMN subscription_started_at DATETIME;").run();
    } catch (_) {}
    try {
      await d1.prepare("ALTER TABLE user_profiles ADD COLUMN subscription_expires_at DATETIME;").run();
    } catch (_) {}

    await d1
      .prepare(
        `CREATE TABLE IF NOT EXISTS invitation_codes (
          code TEXT PRIMARY KEY,
          description TEXT,
          max_uses INTEGER DEFAULT 1,
          uses_count INTEGER DEFAULT 0,
          is_active INTEGER DEFAULT 1,
          created_by TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      )
      .run();

    isTableInitialized = true;
  } catch (err) {
    console.error("Failed to ensure database tables in profile.ts:", err);
  }
}

/**
 * Validates invitation/referral codes (synchronous check against cache & defaults)
 */
export function validateInvitationCode(code?: string): boolean {
  if (!code) return false;
  const trimmed = code.trim().toUpperCase();
  if (trimmed.length < 3) return false;

  const stored = localInvitationCodeStore.get(trimmed);
  if (stored) {
    return stored.isActive && (stored.maxUses <= 0 || stored.usesCount < stored.maxUses);
  }
  if (DEFAULT_VALID_CODES.has(trimmed)) return true;
  return false;
}

/**
 * Validates and redeems an invitation code against D1 or in-memory store.
 * Increments the uses count if valid.
 */
export async function validateAndRedeemInvitationCode(
  env: any,
  rawCode?: string,
  userId?: string,
  userEmail?: string
): Promise<{ valid: boolean; reason?: string }> {
  if (isAdminEmail(userEmail)) {
    return { valid: true };
  }
  if (!rawCode) return { valid: false, reason: "No code provided" };
  const code = rawCode.trim().toUpperCase();
  if (code.length < 3) return { valid: false, reason: "Code too short" };

  await ensureTable(env?.DB);

  // 1. Check D1 database
  if (env?.DB) {
    try {
      const row: any = await env.DB.prepare(
        `SELECT code, description, max_uses, uses_count, is_active FROM invitation_codes WHERE UPPER(code) = ?`
      ).bind(code).first();

      if (row) {
        if (!row.is_active) {
          return { valid: false, reason: "Invitation code is inactive or revoked." };
        }
        if (row.max_uses > 0 && row.uses_count >= row.max_uses) {
          return { valid: false, reason: "Invitation code has reached its maximum uses." };
        }
        await env.DB.prepare(
          `UPDATE invitation_codes SET uses_count = uses_count + 1, updated_at = CURRENT_TIMESTAMP WHERE UPPER(code) = ?`
        ).bind(code).run();

        const local = localInvitationCodeStore.get(code);
        if (local) local.usesCount += 1;
        return { valid: true };
      }
    } catch (err) {
      console.warn("D1 query for invitation_codes failed:", err);
    }
  }

  // 2. Check local in-memory store
  const local = localInvitationCodeStore.get(code);
  if (local) {
    if (!local.isActive) {
      return { valid: false, reason: "Invitation code is inactive or revoked." };
    }
    if (local.maxUses > 0 && local.usesCount >= local.maxUses) {
      return { valid: false, reason: "Invitation code has reached its maximum uses." };
    }
    local.usesCount += 1;
    return { valid: true };
  }

  // 3. Fallback to default bootstrap codes
  if (DEFAULT_VALID_CODES.has(code)) {
    return { valid: true };
  }

  return { valid: false, reason: "Invalid or unrecognized invitation code." };
}

/**
 * Admin: Create a new invitation code
 */
export async function createInvitationCode(
  env: any,
  data: {
    code?: string;
    description?: string;
    maxUses?: number;
    createdBy?: string;
  }
): Promise<InvitationCodeRecord> {
  await ensureTable(env?.DB);

  let code = data.code?.trim().toUpperCase();
  if (!code) {
    const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    code = `SPG-${part1}-${part2}`;
  }

  const description = data.description?.trim() || "Partner Onboarding";
  const maxUses = typeof data.maxUses === "number" ? data.maxUses : 1;
  const createdBy = data.createdBy || "admin";
  const now = new Date().toISOString();

  const record: InvitationCodeRecord = {
    code,
    description,
    maxUses,
    usesCount: 0,
    isActive: true,
    createdBy,
    createdAt: now,
    updatedAt: now,
  };

  if (env?.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO invitation_codes (code, description, max_uses, uses_count, is_active, created_by, created_at, updated_at)
         VALUES (?, ?, ?, 0, 1, ?, ?, ?)
         ON CONFLICT(code) DO UPDATE SET
           description = excluded.description,
           max_uses = excluded.max_uses,
           is_active = 1,
           updated_at = excluded.updated_at;`
      ).bind(code, description, maxUses, createdBy, now, now).run();
    } catch (err) {
      console.warn("D1 create invitation_code failed:", err);
    }
  }

  localInvitationCodeStore.set(code, record);
  return record;
}

/**
 * Admin: List all invitation codes
 */
export async function listInvitationCodes(env: any): Promise<InvitationCodeRecord[]> {
  await ensureTable(env?.DB);
  if (env?.DB) {
    try {
      const rows: any = await env.DB.prepare(
        `SELECT code, description, max_uses, uses_count, is_active, created_by, created_at, updated_at
         FROM invitation_codes ORDER BY created_at DESC`
      ).all();

      if (rows && Array.isArray(rows.results)) {
        return rows.results.map((r: any) => ({
          code: r.code,
          description: r.description || "",
          maxUses: r.max_uses,
          usesCount: r.uses_count || 0,
          isActive: Boolean(r.is_active),
          createdBy: r.created_by || "admin",
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));
      }
    } catch (err) {
      console.warn("D1 list invitation_codes failed:", err);
    }
  }

  return Array.from(localInvitationCodeStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Admin: Revoke / deactivate an invitation code
 */
export async function revokeInvitationCode(env: any, rawCode: string): Promise<boolean> {
  await ensureTable(env?.DB);
  const code = rawCode.trim().toUpperCase();
  if (env?.DB) {
    try {
      await env.DB.prepare(
        `UPDATE invitation_codes SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE UPPER(code) = ?`
      ).bind(code).run();
    } catch (err) {
      console.warn("D1 revoke invitation_code failed:", err);
    }
  }
  const local = localInvitationCodeStore.get(code);
  if (local) {
    local.isActive = false;
  }
  return true;
}

/**
 * Retrieve user profile by user ID
 */
export async function getUserProfile(
  env: any,
  userId: string
): Promise<UserProfile | null> {
  if (!userId) return null;

  if (env?.DB) {
    try {
      await ensureTable(env.DB);
      const row: any = await env.DB.prepare(
        `SELECT user_id, name, email, org, org_website, invitation_code, access_level, subscription_started_at, subscription_expires_at, created_at, updated_at
         FROM user_profiles WHERE user_id = ?`
      )
        .bind(userId)
        .first();

      if (row) {
        const isUserAdmin = isAdminEmail(row.email);
        const rawPro = isUserAdmin || row.access_level === "Pro" || row.access_level === "Full Access";
        let subStarted = row.subscription_started_at || undefined;
        let subExpires = row.subscription_expires_at || undefined;

        if (rawPro && !isUserAdmin && !subExpires) {
          const startDate = row.created_at ? new Date(row.created_at) : new Date();
          const expireDate = new Date(startDate.getTime());
          expireDate.setFullYear(expireDate.getFullYear() + 1);
          subStarted = startDate.toISOString();
          subExpires = expireDate.toISOString();
          try {
            env.DB.prepare(
              `UPDATE user_profiles SET subscription_started_at = ?, subscription_expires_at = ? WHERE user_id = ?`
            ).bind(subStarted, subExpires, row.user_id).run().catch(() => {});
          } catch (_) {}
        }

        const profile: UserProfile = {
          userId: row.user_id,
          name: row.name,
          email: row.email,
          org: row.org || "",
          orgWebsite: row.org_website || "",
          invitationCode: row.invitation_code || "",
          accessLevel: "Pro",
          subscriptionStartedAt: subStarted,
          subscriptionExpiresAt: subExpires,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        };
        localProfileStore.set(userId, profile);
        return profile;
      }
    } catch (err) {
      console.warn("D1 query for user profile failed, using local store:", err);
    }
  }

  const cached = localProfileStore.get(userId) || null;
  if (cached) {
    cached.accessLevel = "Pro";
  }
  return cached;
}

/**
 * Save or update user profile with invitation code and determine access level
 */
export async function saveUserProfile(
  env: any,
  data: {
    userId: string;
    name: string;
    email: string;
    org?: string;
    orgWebsite?: string;
    invitationCode?: string;
  }
): Promise<UserProfile> {
  const userId = data.userId || "anonymous";
  const name = data.name?.trim() || "Anonymous User";
  const email = data.email?.trim() || "";
  const org = data.org?.trim() || "";
  const orgWebsite = data.orgWebsite?.trim() || "";
  const invitationCode = data.invitationCode?.trim() || "";

  // 1. Admin email automatically receives Pro Access
  const isUserAdmin = isAdminEmail(email);

  // 2. Otherwise check and redeem code if provided
  let hasValidCode = false;
  if (invitationCode) {
    const redeemRes = await validateAndRedeemInvitationCode(env, invitationCode, userId, email);
    hasValidCode = redeemRes.valid;
  }

  // Fetch existing profile to preserve existing active subscription dates if merely updating name/org
  const existingProfile = await getUserProfile(env, userId);

  let subscriptionStartedAt = existingProfile?.subscriptionStartedAt;
  let subscriptionExpiresAt = existingProfile?.subscriptionExpiresAt;

  if (!subscriptionStartedAt) {
    const startDate = new Date();
    const expireDate = new Date(startDate.getTime());
    expireDate.setFullYear(expireDate.getFullYear() + 1);

    subscriptionStartedAt = startDate.toISOString();
    subscriptionExpiresAt = expireDate.toISOString();
  }

  const accessLevel: AccessLevel = "Pro";

  const now = new Date().toISOString();

  const profile: UserProfile = {
    userId,
    name,
    email,
    org,
    orgWebsite,
    invitationCode: invitationCode || existingProfile?.invitationCode || "",
    accessLevel,
    subscriptionStartedAt,
    subscriptionExpiresAt,
    createdAt: existingProfile?.createdAt || now,
    updatedAt: now,
  };

  if (env?.DB) {
    try {
      await ensureTable(env.DB);
      await env.DB.prepare(
        `INSERT INTO user_profiles (user_id, name, email, org, org_website, invitation_code, access_level, subscription_started_at, subscription_expires_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_id) DO UPDATE SET
           name = excluded.name,
           email = excluded.email,
           org = excluded.org,
           org_website = excluded.org_website,
           invitation_code = excluded.invitation_code,
           access_level = excluded.access_level,
           subscription_started_at = excluded.subscription_started_at,
           subscription_expires_at = excluded.subscription_expires_at,
           updated_at = excluded.updated_at;`
      )
        .bind(
          userId,
          name,
          email,
          org,
          orgWebsite,
          profile.invitationCode,
          accessLevel,
          subscriptionStartedAt || null,
          subscriptionExpiresAt || null,
          profile.createdAt,
          now
        )
        .run();
    } catch (err) {
      console.warn("D1 save user profile failed, using local store:", err);
    }
  }

  localProfileStore.set(userId, profile);
  return profile;
}

/**
 * Admin: List all registered user profiles with their organization, referral code, validity, and usage stats
 */
export async function listAllUserProfiles(env: any): Promise<any[]> {
  await ensureTable(env?.DB);

  if (env?.DB) {
    try {
      // Query profiles along with aggregated usage telemetry (total requests, total tokens, protected entities)
      const rows: any = await env.DB.prepare(
        `SELECT 
           u.user_id,
           u.name,
           u.email,
           u.org,
           u.org_website,
           u.invitation_code,
           u.access_level,
           u.subscription_started_at,
           u.subscription_expires_at,
           u.created_at,
           u.updated_at,
           COALESCE(k_stats.total_keys, 0) AS total_api_keys,
           COALESCE(k_stats.total_key_requests, 0) AS total_key_requests,
           COALESCE(l_stats.total_requests, 0) AS total_requests,
           COALESCE(l_stats.total_tokens, 0) AS total_tokens,
           COALESCE(l_stats.total_protected_entities, 0) AS total_protected_entities,
           l_stats.last_active_at
         FROM user_profiles u
         LEFT JOIN (
           SELECT 
             user_id,
             COUNT(id) AS total_keys,
             SUM(requests_used) AS total_key_requests
           FROM api_keys
           GROUP BY user_id
         ) k_stats ON u.user_id = k_stats.user_id
         LEFT JOIN (
           SELECT 
             user_id,
             COUNT(id) AS total_requests,
             SUM(total_tokens) AS total_tokens,
             SUM(protected_entity_count) AS total_protected_entities,
             MAX(timestamp) AS last_active_at
           FROM api_request_logs
           GROUP BY user_id
         ) l_stats ON u.user_id = l_stats.user_id
         ORDER BY u.created_at DESC`
      ).all();

      if (rows && Array.isArray(rows.results)) {
        return rows.results.map((r: any) => {
          const isUserAdmin = isAdminEmail(r.email);
          const rawPro = isUserAdmin || r.access_level === "Pro" || r.access_level === "Full Access";
          const isExpActive = isSubscriptionActive(r.subscription_expires_at, r.email);
          const isPro = rawPro && isExpActive;

          return {
            userId: r.user_id,
            name: r.name,
            email: r.email,
            org: r.org || "",
            orgWebsite: r.org_website || "",
            invitationCode: r.invitation_code || "",
            accessLevel: isPro ? "Pro" : "Free",
            subscriptionStartedAt: r.subscription_started_at,
            subscriptionExpiresAt: r.subscription_expires_at,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
            totalApiKeys: r.total_api_keys || 0,
            totalRequests: Math.max(r.total_requests || 0, r.total_key_requests || 0),
            totalTokens: r.total_tokens || 0,
            totalProtectedEntities: r.total_protected_entities || 0,
            lastActiveAt: r.last_active_at || null,
          };
        });
      }
    } catch (err) {
      console.warn("D1 query for listAllUserProfiles failed, fallback to local store:", err);
    }
  }

  // Fallback for in-memory store
  return Array.from(localProfileStore.values()).map((p) => ({
    userId: p.userId,
    name: p.name,
    email: p.email,
    org: p.org || "",
    orgWebsite: p.orgWebsite || "",
    invitationCode: p.invitationCode || "",
    accessLevel: p.accessLevel,
    subscriptionStartedAt: p.subscriptionStartedAt,
    subscriptionExpiresAt: p.subscriptionExpiresAt,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    totalApiKeys: 0,
    totalRequests: 0,
    totalTokens: 0,
    totalProtectedEntities: 0,
    lastActiveAt: null,
  }));
}

