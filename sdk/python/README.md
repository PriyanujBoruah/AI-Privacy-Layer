# 🛡️ AI Privacy Core — Python SDK

Enterprise-grade Python client, LangChain callback handler, and LiteLLM middleware for **AI Privacy Core** — the edge-native de-identification and reversible tokenization gateway for LLM pipelines.

---

## 📦 Installation

```bash
pip install ai-privacy-core

# With LangChain support:
pip install "ai-privacy-core[langchain]"

# With LiteLLM support:
pip install "ai-privacy-core[litellm]"
```

---

## ⚡ Quickstart

### 1. Synchronous Client
```python
from ai_privacy_core import Client

client = Client(
    base_url="http://localhost:8787/v1",
    encryption_key="customer-kms-secret-passphrase"  # Optional Zero-Knowledge BYOK
)

# 1. Tokenize prompt before sending to LLM
result = client.tokenize(
    text="Please wire funds to Jane Doe (email: jane@corp.de, SSN: 123-45-6789).",
    categories=["global", "north_america"]
)

print(f"Sanitized Prompt: {result.sanitized_text}")
# -> "Please wire funds to Jane Doe (email: EMAIL_1, SSN: SSN_1)."
print(f"Session ID: {result.session_id}")
print(f"KMS Status: {result.kms_status}")

# 2. Rehydrate LLM response after completion
rehydrated = client.detokenize(
    session_id=result.session_id,
    tokenized_text="Payment processed for EMAIL_1 with tax ID SSN_1.",
    purge_after_read=True  # Cryptographic zero-retention (ZDR)
)

print(f"Restored Text: {rehydrated.rehydrated_text}")
# -> "Payment processed for jane@corp.de with tax ID 123-45-6789."
```

---

### 2. Context Manager (`PrivacySession`)

Manage tokenization and rehydration seamlessly in a scoped context:

```python
from ai_privacy_core import Client
from openai import OpenAI

privacy = Client(base_url="http://localhost:8787/v1")
openai = OpenAI()

with privacy.session(categories=["global", "european_union"]) as session:
    raw_prompt = "Contact client at alice@berlin-tech.de, German Tax ID: 04 225 818 316."
    
    # Neutralize prompt
    clean_prompt = session.tokenize(raw_prompt)
    
    # Send clean prompt upstream (zero sovereign IDs or PII sent to OpenAI)
    completion = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": clean_prompt}]
    )
    
    # Rehydrate response
    final_output = session.detokenize(completion.choices[0].message.content)
    print(final_output)
```

---

### 3. Asynchronous Client (`AsyncClient`)

```python
import asyncio
from ai_privacy_core import AsyncClient

async def main():
    async with AsyncClient("http://localhost:8787/v1") as client:
        result = await client.tokenize("Call me at +1 415-555-2671")
        print(result.sanitized_text)

asyncio.run(main())
```

---

### 4. LangChain Integration (`PrivacyCallbackHandler`)

Drop-in callback handler for any LangChain chain or agent:

```python
from langchain_openai import ChatOpenAI
from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

privacy_handler = PrivacyCallbackHandler(
    base_url="http://localhost:8787/v1",
    categories=["global", "north_america"],
    encryption_key="enterprise-kms-key"
)

# Attach handler to LLM
llm = ChatOpenAI(model="gpt-4o", callbacks=[privacy_handler])

# Prompts are automatically sanitized before leaving your machine,
# and outputs are automatically rehydrated before the method returns!
response = llm.invoke("My account SSN is 123-45-6789.")
print(response.content)
```

---

### 5. LiteLLM Proxy / SDK Integration (`LiteLLMPrivacyHook`)

Integrates with LiteLLM's custom callback pipeline:

```python
import litellm
from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook

hook = LiteLLMPrivacyHook(
    base_url="http://localhost:8787/v1",
    categories=["global", "north_america"]
)

# Register hook
litellm.callbacks = [hook]

# Standard LiteLLM call
response = litellm.completion(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Send invoice to user@acme.com"}]
)
print(response.choices[0].message.content)
```

---

## 🔒 Enterprise Features

* **Zero-Knowledge BYOK KMS**: Pass `encryption_key` to encrypt volatile vault mappings in AES-256-GCM.
* **Non-PII Audit Telemetry**: Query compliance events with `client.get_audit_events()`.
* **Zero Data Retention**: Set `purge_after_read=True` to immediately erase session memory upon read.

---

## 📄 License

Apache-2.0
