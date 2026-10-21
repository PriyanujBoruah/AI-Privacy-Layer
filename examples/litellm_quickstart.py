"""
AI Privacy Core — LiteLLM Integration Quickstart

Demonstrates:
1. Configuring LiteLLMPrivacyHook with the LiteLLM Python SDK and Proxy.
2. Intercepting requests before they reach LiteLLM router.
3. Transparent response rehydration.
"""

import sys
import os

# Ensure local SDK is discoverable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sdk", "python")))

from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook

def main():
    GATEWAY_URL = os.getenv("AI_PRIVACY_GATEWAY_URL", "http://localhost:8787/v1")
    KMS_KEY = os.getenv("AI_PRIVACY_KMS_KEY", "customer-byok-passphrase")

    print(f"Initializing LiteLLMPrivacyHook pointing to: {GATEWAY_URL}")

    hook = LiteLLMPrivacyHook(
        base_url=GATEWAY_URL,
        encryption_key=KMS_KEY,
        categories=["global", "north_america"],
    )

    print("\nLiteLLM Privacy Hook configured.")
    print("Code Example:")
    print("""
    import litellm
    from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook

    hook = LiteLLMPrivacyHook(
        base_url="http://localhost:8787/v1",
        encryption_key="customer-kms-passphrase"
    )

    # Attach hook as custom callback
    litellm.callbacks = [hook]

    # Standard completion
    response = litellm.completion(
        model="gpt-4o",
        messages=[{"role": "user", "content": "My account SSN is 123-45-6789"}]
    )
    print(response.choices[0].message.content)
    """)

if __name__ == "__main__":
    main()
