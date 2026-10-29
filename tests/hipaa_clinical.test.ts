import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("HIPAA Safe Harbor & Clinical EHR Test Suite", () => {
  it("should de-identify patient names, MRNs, and dates while preserving clinical medical terms", async () => {
    const clinicalNote = "Patient John Watson (MRN: MRN-8849201) admitted on 2024-05-12 by Dr. Gregory House for acute myocardial infarction. Prescribed aspirin 325mg and IV heparin.";

    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: clinicalNote,
        policy: "HIPAA_DEID",
      }),
    });

    expect(tokRes.status).toBe(200);
    const tokData: any = await tokRes.json();

    // Sensitive identifiers must be replaced
    expect(tokData.sanitizedText).not.toContain("John Watson");
    expect(tokData.sanitizedText).not.toContain("MRN-8849201");
    expect(tokData.sanitizedText).not.toContain("2024-05-12");

    // Clinical medical terminology MUST be preserved intact
    expect(tokData.sanitizedText).toContain("acute myocardial infarction");
    expect(tokData.sanitizedText).toContain("aspirin 325mg");
    expect(tokData.sanitizedText).toContain("IV heparin");

    // Detokenize and verify 100% exact clinical rehydration
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
    expect(detokData.rehydratedText).toBe(clinicalNote);
  });

  it("should support HIPAA policy enforcement via x-compliance-policy HTTP header", async () => {
    const clinicalPrompt = "Discharge summary for Jane Doe (SSN: 123-45-6789) from Mayo Clinic Rochester.";

    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-compliance-policy": "HIPAA_DEID",
      },
      body: JSON.stringify({
        text: clinicalPrompt,
      }),
    });

    expect(tokRes.status).toBe(200);
    const tokData: any = await tokRes.json();

    expect(tokData.sanitizedText).not.toContain("123-45-6789");
    expect(tokData.sanitizedText).toContain("SSN_1");

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
    expect(detokData.rehydratedText).toBe(clinicalPrompt);
  });

  it("should handle simulated LLM medical diagnosis roundtrip without identity leakage", async () => {
    const rawEhr = "Patient Alice Cooper diagnosed with severe tachycardia and elevated troponin I levels.";

    // Step 1: Doctor app tokenizes EHR note before cloud LLM
    const tokRes = await app.request("/v1/tokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: rawEhr,
        policy: "HIPAA_DEID",
      }),
    });

    const tokData: any = await tokRes.json();
    expect(tokData.sanitizedText).not.toContain("Alice Cooper");

    // Step 2: Simulated LLM diagnosis response using surrogate token
    const simulatedLlmResponse = `Recommendation for ${tokData.entitiesDetected[0]?.token || "PERSON_1"}: Begin beta-blocker therapy and continuous cardiac monitoring.`;

    // Step 3: Gateway rehydrates response before presenting on doctor screen
    const detokRes = await app.request("/v1/detokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: tokData.sessionId,
        tokenizedText: simulatedLlmResponse,
      }),
    });

    expect(detokRes.status).toBe(200);
    const detokData: any = await detokRes.json();
    expect(detokData.rehydratedText).toContain("Recommendation for Alice Cooper: Begin beta-blocker therapy and continuous cardiac monitoring.");
  });
});
