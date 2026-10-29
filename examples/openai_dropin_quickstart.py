"""
AI Privacy Core — Drop-In OpenAI SDK Quickstart

Demonstrates:
1. Zero-refactor 1-line integration with the official OpenAI Python SDK.
2. Automatic PII and sovereign ID de-identification in transit.
3. Full streaming SSE response rehydration with zero split-token leakage.
4. Smart auto-routing for Google Gemini models (gemini-2.5-flash / gemini-3.5-flash).
"""

import os
from openai import OpenAI

def main():
    GATEWAY_URL = os.getenv("AI_PRIVACY_GATEWAY_URL", "http://localhost:8787/v1")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-mock-key-for-testing")
    KMS_KEY = os.getenv("AI_PRIVACY_KMS_KEY", "customer-byok-passphrase")

    print(f"Connecting official OpenAI SDK via Gateway: {GATEWAY_URL}")

    # Point OpenAI client directly to AI Privacy Core gateway
    client = OpenAI(
        base_url=GATEWAY_URL,
        api_key=OPENAI_API_KEY,
        default_headers={
            "x-vault-encryption-key": KMS_KEY,
            "x-detection-categories": "global,north_america,european_union",
            "x-tokenization-mode": "structural",
        }
    )

    prompt = (
        "Verify customer Jane Doe (email: jane.doe@corp.de, SSN: 123-45-6789) "
        "and advise if her card 4532-0151-1283-0366 has foreign transaction fees."
    )

    print("\n--- Sending Chat Completion Request (Streaming SSE) ---")
    print(f"User Prompt: {prompt}\n")

    try:
        response_stream = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a secure banking assistant."},
                {"role": "user", "content": prompt}
            ],
            stream=True
        )

        print("--- Streamed & Rehydrated Response Output ---")
        for chunk in response_stream:
            content = chunk.choices[0].delta.content if chunk.choices else None
            if content:
                print(content, end="", flush=True)
        print()

    except Exception as e:
        print(f"Note: Ensure gateway is running on {GATEWAY_URL} and upstream API key is valid: {e}")

if __name__ == "__main__":
    main()
