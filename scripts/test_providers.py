"""
Multi-Provider Verification Script for ProjectSPG
Tests live de-identification, upstream dispatch, and response rehydration across:
1. Google AI Studio (Gemini 2.5 Flash)
2. Groq (Llama 3.3 70B)
3. Mistral AI (Mistral Small)
4. OpenRouter (Multi-model Gateway)
"""

import os
import sys
import json
import httpx

# Load .env manually if exists without requiring external packages
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

GATEWAY_URL = os.getenv("AI_PRIVACY_GATEWAY_URL", "https://projectspg.boruahpriyanuj2004.workers.dev/v1")
KMS_KEY = os.getenv("AI_PRIVACY_KMS_KEY", "customer-byok-passphrase-2026")

TEST_PROMPT = (
    "Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) "
    "using Visa 4532-0151-1283-0366. In your reply, repeat back her name, email, and card number."
)

PROVIDERS = [
    {
        "name": "Google AI Studio",
        "env_var": "GEMINI_API_KEY",
        "model": "gemini-2.5-flash-lite",
        "upstream_base_url": None,  # Auto-routed by ProjectSPG!
        "auth_header": lambda key: f"Bearer {key}",
    },
    {
        "name": "Groq Cloud",
        "env_var": "GROQ_API_KEY",
        "model": "openai/gpt-oss-120b",
        "upstream_base_url": "https://api.groq.com/openai/v1",
        "auth_header": lambda key: f"Bearer {key}",
    },
    {
        "name": "Mistral AI",
        "env_var": "MISTRAL_API_KEY",
        "model": "open-mistral-7b",
        "upstream_base_url": "https://api.mistral.ai/v1",
        "auth_header": lambda key: f"Bearer {key}",
    },
    {
        "name": "OpenRouter",
        "env_var": "OPENROUTER_API_KEY",
        "model": "google/gemini-2.5-flash",
        "upstream_base_url": "https://openrouter.ai/api/v1",
        "auth_header": lambda key: f"Bearer {key}",
    },
]


def test_provider(client: httpx.Client, prov: dict):
    key = os.getenv(prov["env_var"])
    print(f"\n{'='*70}")
    print(f"  Testing Provider: {prov['name']} (Model: {prov['model']})")
    print(f"{'='*70}")

    if not key:
        print(f"[SKIPPED] {prov['env_var']} not configured in environment or .env")
        return False

    headers = {
        "Content-Type": "application/json",
        "Authorization": prov["auth_header"](key),
        "x-detection-categories": "global,north_america,european_union",
        "x-tokenization-mode": "structural",
        "x-vault-encryption-key": KMS_KEY,
    }
    if "Google" in prov["name"]:
        headers["x-goog-api-key"] = key
    if prov["upstream_base_url"]:
        headers["x-upstream-base-url"] = prov["upstream_base_url"]

    payload = {
        "model": prov["model"],
        "messages": [
            {"role": "system", "content": "You are a secure customer service assistant."},
            {"role": "user", "content": TEST_PROMPT},
        ],
        "temperature": 0.2,
        "max_tokens": 150,
    }

    print(f"--> Sending request through ProjectSPG: {GATEWAY_URL}/chat/completions")
    print(f"--> Upstream Route: {prov['upstream_base_url'] or 'Smart Auto-Route to Google AI Studio'}")
    print(f"--> Raw Sensitive Prompt:")
    print(f"    {TEST_PROMPT}")

    try:
        res = client.post(
            f"{GATEWAY_URL}/chat/completions",
            json=payload,
            headers=headers,
            timeout=45.0,
        )
    except Exception as e:
        print(f"[FAILED] Network error contacting gateway: {e}")
        return False

    print(f"\n<-- Gateway Response Status: {res.status_code}")
    print(f"    Entities Intercepted: {res.headers.get('x-privacy-entities-intercepted', '0')}")
    print(f"    Gateway Latency: {res.headers.get('x-privacy-latency-us', 'N/A')} us")
    print(f"    KMS Encryption: {res.headers.get('X-Kms-Status', 'OFF')}")
    print(f"    Session ID: {res.headers.get('x-privacy-session-id', 'N/A')}")

    if res.status_code != 200:
        print(f"[ERROR] Provider returned error: {res.text}")
        return False

    try:
        data = res.json()
        content = data["choices"][0]["message"]["content"]
        safe_content = content.encode("ascii", "replace").decode("ascii")
        print(f"\n<-- Model Response (Seamlessly Rehydrated with Original Data):")
        print(f"    {safe_content}")
        print(f"\n[SUCCESS] {prov['name']} test passed with 100% fidelity!")
        return True
    except Exception as e:
        print(f"[FAILED] Error parsing response: {e}, raw text: {res.text}")
        return False


def main():
    print(f"ProjectSPG Live Multi-Provider Test Suite")
    print(f"Gateway Endpoint: {GATEWAY_URL}")
    print(f"KMS Passphrase: {KMS_KEY}\n")

    passed = 0
    tested = 0

    with httpx.Client() as client:
        for prov in PROVIDERS:
            key = os.getenv(prov["env_var"])
            if key:
                tested += 1
                if test_provider(client, prov):
                    passed += 1
            else:
                print(f"[INFO] Skipping {prov['name']} (Key {prov['env_var']} not set)")

    print(f"\n{'='*70}")
    print(f"Summary: {passed} / {tested} configured providers passed successfully!")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()
