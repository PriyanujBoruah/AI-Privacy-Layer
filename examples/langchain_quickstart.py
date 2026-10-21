"""
AI Privacy Core — LangChain Callback Quickstart

Demonstrates:
1. Using PrivacyCallbackHandler with LangChain LLMs and Chat Models.
2. Transparent in-place prompt sanitization before model execution.
3. Automatic output rehydration before returning to the application.
"""

import sys
import os

# Ensure local SDK is discoverable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "sdk", "python")))

from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

def main():
    GATEWAY_URL = os.getenv("AI_PRIVACY_GATEWAY_URL", "http://localhost:8787/v1")
    KMS_KEY = os.getenv("AI_PRIVACY_KMS_KEY", "customer-byok-passphrase")

    print(f"Initializing PrivacyCallbackHandler pointing to: {GATEWAY_URL}")

    # 1. Instantiate the Callback Handler
    privacy_handler = PrivacyCallbackHandler(
        base_url=GATEWAY_URL,
        encryption_key=KMS_KEY,
        categories=["global", "north_america", "european_union"],
        mode="structural",
    )

    # 2. Attach to LangChain LLM / ChatModel
    print("\nLangChain Callback attached to pipeline:")
    print("  - on_llm_start: Tokenizes sensitive entities before upstream dispatch.")
    print("  - on_llm_end: Rehydrates response text before final chain resolution.")

    print("\nCode Example:")
    print("""
    from langchain_openai import ChatOpenAI
    from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

    handler = PrivacyCallbackHandler(
        base_url="http://localhost:8787/v1",
        encryption_key="customer-kms-secret"
    )

    llm = ChatOpenAI(model="gpt-4o", callbacks=[handler])
    response = llm.invoke("Check record for Alice (SSN: 123-45-6789)")
    print(response.content)
    """)

if __name__ == "__main__":
    main()
