import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("India DPDP Act 2023 Compliance Test Suite", () => {
  it("should de-identify and restore Indian Aadhaar and PAN numbers under DPDP_INDIA policy", async () => {
    const prompt = "Customer Ramesh Sharma (Aadhaar: 3675 9834 1234, PAN: ABCDE1234F) requested credit card statement.";

    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: prompt,
        policy: "DPDP_INDIA",
      }),
    });

    expect(tokRes.status).toBe(200);
    const tokData: any = await tokRes.json();
    expect(tokData.sanitizedText).not.toContain("3675 9834 1234");
    expect(tokData.sanitizedText).not.toContain("ABCDE1234F");
    expect(tokData.sanitizedText).toContain("AADHAAR_1");
    expect(tokData.sanitizedText).toContain("PAN_1");

    // Detokenize and verify exact restoration
    const detokRes = await app.request("/v1/detokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: tokData.sessionId,
        tokenizedText: tokData.sanitizedText,
        purgeAfterRead: true,
      }),
    });

    expect(detokRes.status).toBe(200);
    const detokData: any = await detokRes.json();
    expect(detokData.rehydratedText).toBe(prompt);
  });

  it("should de-identify Indian UPI IDs and mobile numbers with +91 country prefix", async () => {
    const prompt = "Please send payment to priyanuj@okhdfcbank or call +91 98765 43210 immediately.";

    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-compliance-policy": "DPDP_INDIA",
      },
      body: JSON.stringify({
        text: prompt,
      }),
    });

    expect(tokRes.status).toBe(200);
    const tokData: any = await tokRes.json();
    expect(tokData.sanitizedText).not.toContain("priyanuj@okhdfcbank");
    expect(tokData.sanitizedText).not.toContain("98765 43210");
    expect(tokData.sanitizedText).toContain("UPI_1");
    expect(tokData.sanitizedText).toContain("PHONE_1");

    // Detokenize and verify 100% roundtrip restoration
    const detokRes = await app.request("/v1/detokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: tokData.sessionId,
        tokenizedText: tokData.sanitizedText,
        purgeAfterRead: true,
      }),
    });

    expect(detokRes.status).toBe(200);
    const detokData: any = await detokRes.json();
    expect(detokData.rehydratedText).toBe(prompt);
  });

  it("should protect Indian driving licenses and vehicle registration numbers", async () => {
    const prompt = "Driver verification: DL DL0420110012345, Vehicle DL 01 AB 1234.";

    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: prompt,
        policy: "DPDP_INDIA",
      }),
    });

    expect(tokRes.status).toBe(200);
    const tokData: any = await tokRes.json();
    expect(tokData.sanitizedText).not.toContain("DL0420110012345");
    expect(tokData.sanitizedText).not.toContain("DL 01 AB 1234");
    expect(tokData.sanitizedText).toContain("DRIVER_LICENSE_1");
    expect(tokData.sanitizedText).toContain("VEHICLE_REG_1");

    const detokRes = await app.request("/v1/detokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: tokData.sessionId,
        tokenizedText: tokData.sanitizedText,
      }),
    });

    expect(detokRes.status).toBe(200);
    const detokData: any = await detokRes.json();
    expect(detokData.rehydratedText).toBe(prompt);
  });
});
