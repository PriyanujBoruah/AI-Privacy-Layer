/**
 * API Connection Verification Script
 * Validates connectivity to the local AI Privacy Core endpoints.
 */

const BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8787";

async function runTests() {
  console.log(`\n========================================`);
  console.log(`Connecting to AI Privacy Core: ${BASE_URL}`);
  console.log(`========================================\n`);

  let allPassed = true;

  // 1. Health check
  try {
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    if (healthRes.ok && healthData.status === "ok") {
      console.log(`[PASS] GET /health (Status: ${healthRes.status}, Version: ${healthData.version})`);
    } else {
      console.error(`[FAIL] GET /health unexpected response:`, healthData);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] GET /health failed to connect: ${err.message}`);
    allPassed = false;
  }

  // 2. Root check
  try {
    const rootRes = await fetch(`${BASE_URL}/`);
    const rootText = await rootRes.text();
    if (rootRes.ok && rootText.includes("active")) {
      console.log(`[PASS] GET / (Status: ${rootRes.status}, Message: "${rootText}")`);
    } else {
      console.error(`[FAIL] GET / unexpected response:`, rootText);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] GET / failed: ${err.message}`);
    allPassed = false;
  }

  // 3. Tokenize endpoint
  let sessionId = null;
  let sanitizedText = null;
  try {
    const sampleText = "Transfer USD 5,000 for Contact Alice Wong (email: alice@fintech.io) with Visa 4532-0151-1283-0366 to South Africa ID 8001015009087.";
    const tokRes = await fetch(`${BASE_URL}/v1/tokenize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: sampleText,
        categories: ["africa"],
        mode: "structural",
        ttlSeconds: 300
      })
    });
    const tokData = await tokRes.json();
    if (tokRes.ok && tokData.sessionId && tokData.sanitizedText) {
      sessionId = tokData.sessionId;
      sanitizedText = tokData.sanitizedText;
      console.log(`[PASS] POST /v1/tokenize (Entities detected: ${tokData.entitiesCount}, Session: ${sessionId})`);
      console.log(`       Sanitized: "${sanitizedText}"`);
    } else {
      console.error(`[FAIL] POST /v1/tokenize unexpected response:`, tokData);
      allPassed = false;
    }
  } catch (err) {
    console.error(`[FAIL] POST /v1/tokenize failed: ${err.message}`);
    allPassed = false;
  }

  // 4. Detokenize endpoint
  if (sessionId && sanitizedText) {
    try {
      const detokRes = await fetch(`${BASE_URL}/v1/detokenize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          tokenizedText: sanitizedText,
          purgeAfterRead: true
        })
      });
      const detokData = await detokRes.json();
      if (detokRes.ok && detokData.rehydratedText && detokData.sessionStatus === "purged") {
        console.log(`[PASS] POST /v1/detokenize (Tokens resolved: ${detokData.tokensResolved}, Status: ${detokData.sessionStatus})`);
        console.log(`       Rehydrated: "${detokData.rehydratedText}"`);
      } else {
        console.error(`[FAIL] POST /v1/detokenize unexpected response:`, detokData);
        allPassed = false;
      }
    } catch (err) {
      console.error(`[FAIL] POST /v1/detokenize failed: ${err.message}`);
      allPassed = false;
    }

    // 5. Verify Zero Data Retention (purged session should now return 404)
    try {
      const replayRes = await fetch(`${BASE_URL}/v1/detokenize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          tokenizedText: sanitizedText
        })
      });
      if (replayRes.status === 404) {
        console.log(`[PASS] Zero Data Retention verification: Replay rejected with HTTP 404`);
      } else {
        console.error(`[FAIL] ZDR check: Expected 404 but got ${replayRes.status}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`[FAIL] ZDR check failed: ${err.message}`);
      allPassed = false;
    }
  }

  console.log(`\n========================================`);
  if (allPassed) {
    console.log(`ALL TESTS PASSED! Local API endpoints are healthy and operational.`);
    process.exit(0);
  } else {
    console.error(`SOME TESTS FAILED. Please review the output above.`);
    process.exit(1);
  }
}

runTests();
