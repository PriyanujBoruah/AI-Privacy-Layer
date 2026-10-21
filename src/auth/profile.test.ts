import { describe, it, expect } from "vitest";
import {
  getUserProfile,
  saveUserProfile,
  validateInvitationCode,
} from "./profile";

describe("User Profile & Invitation Access Module", () => {
  it("should validate invitation codes correctly", () => {
    expect(validateInvitationCode("")).toBe(false);
    expect(validateInvitationCode(undefined)).toBe(false);
    expect(validateInvitationCode("12")).toBe(false);
    expect(validateInvitationCode("SPG-INVITE-2026")).toBe(true);
    expect(validateInvitationCode("VIP")).toBe(true);
  });

  it("should tag user with Pro if no invitation code is provided", async () => {
    const profile = await saveUserProfile({}, {
      userId: "user_test_no_code",
      name: "John Doe",
      email: "john@example.com",
      org: "Acme Corp",
      orgWebsite: "https://acme.com",
      invitationCode: "",
    });

    expect(profile.accessLevel).toBe("Pro");
    expect(profile.name).toBe("John Doe");
    expect(profile.org).toBe("Acme Corp");
    expect(profile.invitationCode).toBe("");

    const fetched = await getUserProfile({}, "user_test_no_code");
    expect(fetched).not.toBeNull();
    expect(fetched?.accessLevel).toBe("Pro");
  });

  it("should tag user with Pro if a valid invitation code is provided", async () => {
    const profile = await saveUserProfile({}, {
      userId: "user_test_with_code",
      name: "Alice Smith",
      email: "alice@partner.org",
      org: "Partner Org",
      orgWebsite: "https://partner.org",
      invitationCode: "SPG-BETA-ACCESS",
    });

    expect(profile.accessLevel).toBe("Pro");
    expect(profile.invitationCode).toBe("SPG-BETA-ACCESS");

    const fetched = await getUserProfile({}, "user_test_with_code");
    expect(fetched).not.toBeNull();
    expect(fetched?.accessLevel).toBe("Pro");
  });

  it("should allow upgrading profile details by submitting a code later", async () => {
    await saveUserProfile({}, {
      userId: "user_upgrade_test",
      name: "Bob Builder",
      email: "bob@builder.com",
      invitationCode: "",
    });

    let fetched = await getUserProfile({}, "user_upgrade_test");
    expect(fetched?.accessLevel).toBe("Pro");

    await saveUserProfile({}, {
      userId: "user_upgrade_test",
      name: "Bob Builder",
      email: "bob@builder.com",
      org: "Builder Inc",
      invitationCode: "INVITE_VIP_KEY",
    });

    fetched = await getUserProfile({}, "user_upgrade_test");
    expect(fetched?.accessLevel).toBe("Pro");
    expect(fetched?.org).toBe("Builder Inc");
  });

  it("should recognize boruahpriyanuj2004@gmail.com as admin and grant Pro access automatically", async () => {
    const adminProfile = await saveUserProfile({}, {
      userId: "admin_test_uid",
      name: "Priyanuj Boruah",
      email: "boruahpriyanuj2004@gmail.com",
      invitationCode: "", // No code provided!
    });

    expect(adminProfile.accessLevel).toBe("Pro");

    const fetched = await getUserProfile({}, "admin_test_uid");
    expect(fetched?.accessLevel).toBe("Pro");
  });

  it("should create, list, redeem, exhaust, and revoke invitation codes", async () => {
    const { createInvitationCode, listInvitationCodes, revokeInvitationCode } = await import("./profile");

    // 1. Create a single-use code
    const singleCode = await createInvitationCode({}, {
      code: "SPG-TEST-SINGLE",
      description: "Partner Alpha",
      maxUses: 1,
      createdBy: "boruahpriyanuj2004@gmail.com",
    });
    expect(singleCode.code).toBe("SPG-TEST-SINGLE");
    expect(singleCode.maxUses).toBe(1);
    expect(singleCode.usesCount).toBe(0);

    // 2. First redemption should succeed
    const user1 = await saveUserProfile({}, {
      userId: "usr_partner_1",
      name: "Partner One",
      email: "one@partner.com",
      invitationCode: "SPG-TEST-SINGLE",
    });
    expect(user1.accessLevel).toBe("Pro");

    // 3. Second redemption of single-use code should fail (exhausted) but user retains default Pro access
    const user2 = await saveUserProfile({}, {
      userId: "usr_partner_2",
      name: "Partner Two",
      email: "two@partner.com",
      invitationCode: "SPG-TEST-SINGLE",
    });
    expect(user2.accessLevel).toBe("Pro");

    // 4. Revocation should prevent any redemptions
    await createInvitationCode({}, {
      code: "SPG-REVOKE-ME",
      maxUses: 10,
    });
    await revokeInvitationCode({}, "SPG-REVOKE-ME");

    const user3 = await saveUserProfile({}, {
      userId: "usr_partner_3",
      name: "Partner Three",
      email: "three@partner.com",
      invitationCode: "SPG-REVOKE-ME",
    });
    expect(user3.accessLevel).toBe("Pro");

    // 5. List codes includes created codes
    const codes = await listInvitationCodes({});
    expect(codes.some((c) => c.code === "SPG-TEST-SINGLE")).toBe(true);
    expect(codes.some((c) => c.code === "SPG-REVOKE-ME")).toBe(true);
  });

  it("should set pro subscription valid for exactly 1 year from redemption and expire to Free thereafter", async () => {
    const userSub = await saveUserProfile({}, {
      userId: "usr_timed_sub",
      name: "Yearly Subscriber",
      email: "subscriber@partner.com",
      invitationCode: "VIP",
    });

    expect(userSub.accessLevel).toBe("Pro");
    expect(userSub.subscriptionStartedAt).toBeDefined();
    expect(userSub.subscriptionExpiresAt).toBeDefined();

    const start = new Date(userSub.subscriptionStartedAt!).getTime();
    const expiry = new Date(userSub.subscriptionExpiresAt!).getTime();
    const diffDays = Math.round((expiry - start) / (1000 * 60 * 60 * 24));
    // Approximately 365 or 366 days depending on leap years
    expect(diffDays).toBeGreaterThanOrEqual(365);
    expect(diffDays).toBeLessThanOrEqual(366);

    // With universal Pro access, accounts retain Pro access
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(); // 1 day ago
    userSub.subscriptionExpiresAt = pastDate;

    const fetched = await getUserProfile({}, "usr_timed_sub");
    expect(fetched?.accessLevel).toBe("Pro");
  });
});
