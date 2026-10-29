/**
 * Utility APIs and Edge Scenarios Verification Script
 * Validates advanced features: FPE mode, custom keywords, edge SLA guardrails, and session persistence.
 */

const BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8787";

async function runUtilityTests() {
  console.log(`\n========================================`);
  console.log(`Running Utility & Edge Case Tests: ${BASE_URL}`);
  console.log(`========================================\n`);

  let allPassed = true;

  // Test 1: FPE Mode (Format-Preserving Encryption / Synthetic Mocks)
  try {
    const res = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "Contact bob@corp.com with card 4532-0151-1283-0366",
        mode: "fpe"
      })
    });
    const data = await res.json();
    if (res.ok && data.mode === "fpe" && !data.sanitizedText.includes("4532-0151-1283-0366")) {
      console.log(`[PASS] FPE mode tokenization:`);
      console.log(`       Sanitized: "${data.sanitizedText}"`);
    } else {
      console.error(`[FAIL] FPE mode unexpected:`, data);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] FPE test error: ${err.message}`);
    allPassed = false;
  }

  // Test 2: Custom Keywords via Headers & Body
  try {
    const res = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-custom-entities": "ProjectTitan, SecretFalcon"
      },
      body: JSON.stringify({
        text: "Deploying ProjectTitan for SecretFalcon at Orion HQ",
        customKeywords: ["Orion HQ"]
      })
    });
    const data = await res.json();
    if (res.ok && !data.sanitizedText.includes("ProjectTitan") && !data.sanitizedText.includes("Orion HQ")) {
      console.log(`[PASS] Custom Enterprise Keywords masking (Headers & Body):`);
      console.log(`       Sanitized: "${data.sanitizedText}"`);
    } else {
      console.error(`[FAIL] Custom keywords masking failed:`, data);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] Custom keywords test error: ${err.message}`);
    allPassed = false;
  }

  // Test 3: All Canonical Regional Packs Active (categories: ["all"])
  try {
    const res = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "Sample text",
        categories: ["all"]
      })
    });
    const data = await res.json();
    if (res.ok && Array.isArray(data.categoriesApplied) && data.categoriesApplied.length >= 10) {
      console.log(`[PASS] All Canonical Packs Active: ${data.categoriesApplied.length} packs applied simultaneously`);
    } else {
      console.error(`[FAIL] Expected all canonical packs applied, got:`, res.status, data);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] All canonical packs test error: ${err.message}`);
    allPassed = false;
  }

  // Test 4: Missing required fields
  try {
    const res = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (res.status === 400 && data.error?.type === "invalid_request_error") {
      console.log(`[PASS] Validation check: Missing text rejected with 400 invalid_request_error`);
    } else {
      console.error(`[FAIL] Expected 400 invalid_request_error, got:`, res.status, data);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] Validation test error: ${err.message}`);
    allPassed = false;
  }

  // Test 5: Multi-read session persistence without purgeAfterRead
  try {
    const tokRes = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "Meeting with Alice Wong (email: alice@test.org)",
        categories: ["global"]
      })
    });
    const tokData = await tokRes.json();
    const sessionId = tokData.sessionId;

    // Read 1 (purgeAfterRead: false)
    const read1 = await fetch(`${BASE_URL}/v1/detokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        tokenizedText: tokData.sanitizedText,
        purgeAfterRead: false
      })
    });
    const read1Data = await read1.json();

    // Read 2
    const read2 = await fetch(`${BASE_URL}/v1/detokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        tokenizedText: tokData.sanitizedText,
        purgeAfterRead: false
      })
    });
    const read2Data = await read2.json();

    if (read1.ok && read2.ok && read1Data.sessionStatus === "active" && read2Data.sessionStatus === "active") {
      console.log(`[PASS] Multi-read session persistence confirmed (active across repeated queries)`);
    } else {
      console.error(`[FAIL] Multi-read session failed:`, { read1Data, read2Data });
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] Multi-read session test error: ${err.message}`);
    allPassed = false;
  }

  // Test 6: Username Pattern Checking (Social Handles & Contextual Usernames)
  try {
    const originalText = "Mention @sprintcare or ping username: dev_guru99 regarding server issue.";
    const tokRes = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: originalText,
        mode: "structural"
      })
    });
    const tokData = await tokRes.json();
    if (
      tokRes.ok &&
      tokData.sanitizedText.includes("USERNAME_1") &&
      tokData.sanitizedText.includes("USERNAME_2") &&
      !tokData.sanitizedText.includes("@sprintcare") &&
      !tokData.sanitizedText.includes("dev_guru99")
    ) {
      console.log(`[PASS] Username pattern checking (Handles & Labeled):`);
      console.log(`       Sanitized: "${tokData.sanitizedText}"`);

      // Verify Detokenization
      const detokRes = await fetch(`${BASE_URL}/v1/detokenize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: tokData.sessionId,
          tokenizedText: tokData.sanitizedText,
          purgeAfterRead: true
        })
      });
      const detokData = await detokRes.json();
      if (detokRes.ok && detokData.rehydratedText === originalText) {
        console.log(`[PASS] Username rehydration exact match:`);
        console.log(`       Restored: "${detokData.rehydratedText}"`);
      } else {
        console.error(`[FAIL] Username rehydration mismatch:`, detokData);
        allPassed = false;
      }
    } else {
      console.error(`[FAIL] Username tokenization failed:`, tokData);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] Username test error: ${err.message}`);
    allPassed = false;
  }

  console.log(`\n========================================`);
  if (allPassed) {
    console.log(`ALL UTILITY & EDGE TESTS PASSED!`);
    process.exit(0);
  } else {
    console.error(`SOME UTILITY TESTS FAILED.`);
    process.exit(1);
  }
}

runUtilityTests();
