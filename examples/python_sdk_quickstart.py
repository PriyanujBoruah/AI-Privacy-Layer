"""
AI Privacy Core — Python SDK Quickstart Example

Demonstrates:
1. De-identification of sensitive prompts with sovereign IDs (US SSN, German Tax ID, Credit Card).
2. Zero-Knowledge BYOK KMS AES-256-GCM authenticated encryption.
3. Response rehydration with Zero Data Retention (purgeAfterRead).
4. Compliance audit telemetry querying.
"""

import sys
import os

# Ensure local SDK is discoverable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sdk", "python")))

from ai_privacy_core import Client

def main():
    GATEWAY_URL = os.getenv("AI_PRIVACY_GATEWAY_URL", "http://localhost:8787/v1")
    KMS_PASSPHRASE = os.getenv("AI_PRIVACY_KMS_KEY", "customer-byok-passphrase-2026")

    print(f"Connecting to AI Privacy Core Gateway: {GATEWAY_URL}")
    client = Client(
        base_url=GATEWAY_URL,
        encryption_key=KMS_PASSPHRASE,
        default_categories=["global", "north_america", "european_union"],
    )

    # 1. Scoped Privacy Session
    raw_prompt = (
        "Customer Alice Smith (email: alice.smith@fintech.de, SSN: 123-45-6789) "
        "requested a balance check for Visa card 4532-0151-1283-0366."
    )

    print("\n--- Original Raw Prompt (High Risk) ---")
    print(raw_prompt)

    try:
        with client.session() as session:
            sanitized_prompt = session.tokenize(raw_prompt)
            print("\n--- Sanitized Prompt Forwarded to LLM (Zero Risk) ---")
            print(sanitized_prompt)
            print(f"Session ID: {session.session_id}")
            print(f"Entities Intercepted: {session.last_result.entities_count}")
            print(f"KMS Status: {session.last_result.kms_status}")

            # Simulated LLM response containing surrogate tokens
            mock_llm_response = (
                "Verification successful for PERSON_1. The balance for card CARD_1 "
                "linked to EMAIL_1 (SSN: SSN_1) is $4,850.00."
            )
            print("\n--- Upstream LLM Response (Containing Surrogate Tokens) ---")
            print(mock_llm_response)

            # Rehydrate response back to original sensitive values
            rehydrated_response = session.detokenize(mock_llm_response)
            print("\n--- Rehydrated Response Returned to End User ---")
            print(rehydrated_response)

        # 2. Query Non-PII SIEM Audit Telemetry
        print("\n--- Fetching Real-Time Non-PII Compliance Audit Events ---")
        events = client.get_audit_events(limit=5)
        for evt in events:
            print(f"[{evt.timestamp}] {evt.event_type} | Session: {evt.session_id} | KMS: {evt.kms_status} | Latency: {evt.latency_us}µs")

    except Exception as e:
        print(f"\n[!] Note: To execute against a live gateway, start the server (`npm start` or docker) on {GATEWAY_URL}.\n    Error encountered: {e}")

if __name__ == "__main__":
    main()
