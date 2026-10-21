# 🛡️ AI Privacy Core

> **Open-source, zero-trust privacy gateway for LLM pipelines. Tokenizes sensitive PII, sovereign national IDs, and financial records with mathematical checksum precision and sub-5ms edge latency.**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Tests: 14 Passing](https://img.shields.io/badge/Tests-14%20Passing%20(Vitest)-brightgreen.svg)
![Fidelity: 100%](https://img.shields.io/badge/Fidelity-100%25%20Exact%20Roundtrip-brightgreen.svg)
![Dataset: 9.33M Prompts](https://img.shields.io/badge/Evaluated-9.33M%20Prompts-blue.svg)
![Tokens: ~1.94B](https://img.shields.io/badge/Tokens-~1.94B%20Tested-purple.svg)
![Throughput: 17,735 prompts/s](https://img.shields.io/badge/Engine%20Speed-17%2C735%20prompts%2Fs-success.svg)
![Network: 2,691 RPS](https://img.shields.io/badge/HTTPS%20RPS-2%2C691%20req%2Fs-orange.svg)
![Latency: Sub-millisecond Engine](https://img.shields.io/badge/Engine%20Latency-86%20µs%20(p50)-emerald.svg)
![Coverage: 109 Jurisdictions](https://img.shields.io/badge/Coverage-109%20Jurisdictions-indigo.svg)
![Zero Data Retention](https://img.shields.io/badge/Compliance-Zero%20Data%20Retention%20(ZDR)-success.svg)

🌐 **Documentation & Live Playground:** [priyanujboruah.github.io/AI-Privacy-Core](https://priyanujboruah.github.io/AI-Privacy-Core/) • 📊 **Benchmark Report:** [priyanujboruah.github.io/AI-Privacy-Core/test-results.html](https://priyanujboruah.github.io/AI-Privacy-Core/test-results.html)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Test Results & Empirical Feats](#-test-results)
- [Architecture & Core Differentiators](#-architecture--core-differentiators)
- [Enterprise Security & Zero Data Retention (ZDR)](#-enterprise-security--zero-data-retention-zdr)
  - [Ephemeral In-Memory Operation](#1-is-cloudflare-d1-required-does-session-data-persist-on-disk)
  - [Zero Data Retention (ZDR) Enforced](#2-zero-data-retention-zdr-enforced-purgeafterread)
  - [Customer BYOK KMS Encryption (AES-256-GCM)](#3-zero-knowledge-customer-kms-byok-aes-256-gcm)
  - [SIEM Compliance Audit Telemetry & SOC 2](#4-siem-compliance-audit-telemetry--soc-2-hipaa-gdpr)
- [API Reference](#-api-reference)
  - [POST /v1/chat/completions (Drop-In OpenAI Proxy)](#1-post-v1chatcompletions-drop-in-openai-proxy)
  - [POST /v1/embeddings (Vector Embedding Gateway)](#2-post-v1embeddings)
  - [POST /v1/tokenize](#3-post-v1tokenize)
  - [POST /v1/detokenize](#4-post-v1detokenize)
  - [GET /v1/models](#5-get-v1models)
  - [GET /v1/audit/events (Compliance SIEM Telemetry)](#6-get-v1auditevents)
  - [GET /health](#7-get-health)
- [Developer SDKs & Framework Integrations](#-developer-sdks--framework-integrations)
  - [Python SDK (ai-privacy-core)](#1-python-sdk-ai-privacy-core)
  - [LangChain Integration (PrivacyCallbackHandler)](#2-langchain-integration-privacycallbackhandler)
  - [LiteLLM Router & Proxy Hook (LiteLLMPrivacyHook)](#3-litellm-router--proxy-hook-litellmprivacyhook)
- [SLA Guardrails & System Limits](#-sla-guardrails--system-limits)
- [Quickstart & Local Development](#-quickstart--local-development)
- [Deployment](#-deployment)
- [Canonical Regional Packs Catalog](#-canonical-regional-packs-catalog)
- [Country-Wise Sovereign ID Coverage & Validation Engines](#-country-wise-sovereign-id-coverage--validation-engines)
- [Open-Source Sustainable Development (UN SDGs)](#-open-source-sustainable-development-un-sdgs)
- [License](#-license)
- [Contributing & Security Disclosures](#-contributing--security-disclosures)

---

## 🌟 Overview

**AI Privacy Core** is an enterprise-grade, edge-native de-identification and reversible tokenization gateway designed specifically for Generative AI applications, RAG pipelines, and agentic LLM workflows.

When users interact with frontier models (OpenAI GPT-4, Google Gemini, Anthropic Claude, open-source Llama), prompts frequently leak high-risk data: credit card numbers, national identification numbers, bank accounts, emails, and medical records. **AI Privacy Core** intercepts user prompts at the network edge, neutralizes sensitive data with deterministic surrogate tokens, and seamlessly rehydrates model responses before delivering them back to end users.

### Standardized System Metrics

| Metric | Specification |
|---|---|
| **Roundtrip Reconstruction Fidelity** | **100.0000%** exact bit-for-bit match on 9.33M prompt corpus |
| **Engine Execution Latency** | `86 µs` median ($p_{50}$), `314 µs` average engine latency |
| **HTTPS Network Latency SLA** | `13.3 ms` median tokenize latency, `2,691 req/sec` over TLS 1.3 |
| **In-Memory Engine Throughput** | `17,735 prompts/sec` on standard multi-core hardware |
| **Geographic Coverage** | **109 Sovereign Jurisdictions** across 9 Canonical Packs (75+ with dedicated national ID checksums, 200+ for global financial and telecom standards) |
| **Algorithmic Checksum Engines** | `67` standalone mathematical verification formulas (Verhoeff, Luhn, ISO 7064, Mod-11, Mod-23, Mod-26, Elfproef) |
| **Pattern Rules** | `185` sovereign, financial, and context rules |
| **Runtime Requirements** | Serverless V8 Edge Isolates (Cloudflare Workers), Node.js 18+, Bun |
| **Storage Architecture** | Ephemeral in-memory RAM (zero disk persistence) or optional Cloudflare D1 SQL |

---

## 🧪 Test Results

To empirically prove enterprise-grade reliability and zero information loss, **AI Privacy Core** underwent exhaustive testing on a unified corpus of **9,334,805 prompts (~1.94 billion tokens)** compiled from 5 diverse production datasets:
- **LMSYS Chatbot Arena**: Multi-turn human-LLM conversations with diverse phrasing and grammar.
- **OpenOrca**: Complex reasoning tasks, code snippets, and instructions.
- **WildChat**: Unfiltered, in-the-wild conversational queries containing edge-case characters and formats.
- **Enron Email Corpus**: Real-world corporate communications with email signatures, phone numbers, and financial tables.
- **Customer Support Twitter**: Short-form unstructured complaints with courier tracking numbers, addresses, and order references.

### 1. Full Dataset In-Memory Benchmark (9,334,805 Prompts)

The standalone tokenizer and rehydration engine was evaluated across the entire 9.33M dataset using a parallel multi-core node architecture (`scripts/multicore_benchmark.mjs`). Every single prompt was tokenized, then rehydrated, and checked for byte-for-byte exact equality against the original input (`rehydratedText === originalPrompt`).

| Metric | Benchmark Result | Significance |
|---|---|---|
| **Total Prompts Processed** | **9,334,805 / 9,334,805** | **100% of entire dataset** |
| **Exact Roundtrip Matches** | **9,334,805** | **100.0000% Bit-for-Bit Exactness** |
| **Roundtrip Mismatches** | **0 (Zero)** | **0.000000% error rate** |
| **Total Intercepted Entities** | **10,281,399 entities** | Sovereign IDs, cards, emails, phones, tracking |
| **Total Tokens Analyzed** | **1,937,516,961 tokens** | **~1.94 Billion tokens** |
| **Total Execution Time** | **526.35 seconds (8.77 min)** | Continuous high-load execution |
| **Processing Throughput** | **17,735.0 prompts / sec** | Multi-threaded V8 engine speed |
| **Average Engine Latency** | **0.314 ms (314 µs)** | Sub-millisecond compute overhead |
| **Median ($p_{50}$) Latency** | **0.086 ms (86 µs)** | Ultra-fast regex and checksum resolution |

#### Progression Across Benchmark Runs:
```
┌─────────────────────────┬──────────────┬──────────────┬─────────────────────────┐
│ Benchmark Iteration     │ Mismatches   │ Fidelity     │ Root Cause Addressed    │
├─────────────────────────┼──────────────┼──────────────┼─────────────────────────┤
│ Run 1 (Initial Engine)  │ 339 / 9.33M  │ 99.9964%     │ Lookbehinds & Caps      │
│ Run 2 (Post-Fix)        │ 9 / 9.33M    │ 99.999903%   │ Invoice & Prefix Group  │
│ Run 3 (Hardened Engine) │ 0 / 9.33M    │ 100.000000%  │ PERFECT CLEAN SWEEP     │
└─────────────────────────┴──────────────┴──────────────┴─────────────────────────┘
```
*Audit Summary: [`multicore_benchmark_summary.json`](multicore_benchmark_summary.json)*

---

### 2. Real-World HTTPS Socket Latency Benchmark (50,000 Prompts)

To measure actual network latency under production conditions (including TLS 1.3 handshakes, TCP socket pooling, HTTP headers, JSON serialization, and full roundtrips), a dedicated network benchmark was conducted on **50,000 random prompts** sampled uniformly across all 94 row groups of the dataset (`scripts/http_latency_benchmark.mjs`).

Each prompt completed a **full 2-way network roundtrip** over TLS 1.3:
1. `POST /v1/tokenize` over HTTPS $\rightarrow$ records tokenize network latency.
2. `POST /v1/detokenize` over HTTPS using the returned `sessionId` and `sanitizedText` $\rightarrow$ records detokenize latency.
3. Strict verification that `rehydratedText === originalPrompt`.

#### High-Level Network Performance:
- **Total Prompts Tested**: 50,000
- **Total HTTPS Network Calls**: **100,000 requests**
- **Total Elapsed Time**: **37.15 seconds**
- **Prompt Throughput**: **1,345.98 prompts / sec**
- **HTTPS Request Throughput**: **2,691.95 HTTP requests / sec**
- **Token Throughput**: **277,506 tokens / sec**
- **Exact Roundtrip Matches**: **50,000 / 50,000 (100.0000%)**
- **Socket / Network Drops**: **0**

#### Real-World Latency Percentile Distribution (TLS 1.3 HTTPS Sockets):
| Network Operation | Min | Average | $p_{50}$ (Median) | $p_{90}$ | $p_{95}$ | $p_{99}$ | $p_{99.9}$ | Max |
|---|---|---|---|---|---|---|---|---|
| **POST `/v1/tokenize`** | 4.60 ms | 14.35 ms | **13.30 ms** | 20.98 ms | 25.22 ms | 38.00 ms | 62.68 ms | 73.93 ms |
| **POST `/v1/detokenize`** | 4.50 ms | 7.92 ms | **7.20 ms** | 10.91 ms | 12.81 ms | 18.31 ms | 26.96 ms | 64.22 ms |
| **Total Roundtrip (End-to-End)** | 12.06 ms | 22.27 ms | **20.81 ms** | 30.86 ms | 36.36 ms | 51.55 ms | 79.22 ms | 104.20 ms |

*Audit Summary: [`http_latency_benchmark_summary.json`](http_latency_benchmark_summary.json)*

---

### 3. Reproduce the Benchmarks Locally

Anyone can reproduce these empirical results directly from the repository:

```bash
# 1. Run all unit tests (14 passing tests)
npm test

# 2. Run the 50,000-prompt real-world HTTPS socket benchmark
node scripts/http_latency_benchmark.mjs --samples 50000 --concurrency 30

# 3. Run the direct multi-core benchmark on unified_prompts.parquet
node scripts/multicore_benchmark.mjs --workers 8
```

---

## 🏗️ Architecture & Core Differentiators

```
[ Client Application / User Prompt ]
                │
                ▼ (Raw text containing PII / Sovereign IDs)
┌───────────────────────────────────────────────────────────────────────────┐
│                       AI PRIVACY CORE (Edge Gateway)                      │
│                                                                           │
│  1. 4-Tier Disambiguation (Exact, Checksum, Context, Enterprise Keywords)│
│  2. Mathematical Checksum Verification (67 Algorithmic Engines)           │
│  3. Reversible Token Substitution (e.g. CARD_1, PERSON_1, ZA_ID_1)        │
│  4. Ephemeral Vault / Zero-Disk RAM Session Storage (TTL Auto-Eviction)   │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼ (Sanitized Prompt with Synthetic Tokens)
┌───────────────────────────────────────────────────────────────────────────┐
│        UPSTREAM THIRD-PARTY LLM / INFERENCE PIPELINE (External)           │
│                                                                           │
│  OpenAI GPT-4 / Google Gemini / Anthropic Claude / vLLM / Ollama          │
│  (Processes query without ever seeing plaintext PII or Sovereign IDs)     │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼ (Model Response containing Synthetic Tokens)
┌───────────────────────────────────────────────────────────────────────────┐
│                       AI PRIVACY CORE (Rehydration)                       │
│                                                                           │
│  1. Session Lookup (Token -> Original Entity)                             │
│  2. Exact String Rehydration & Coreference Resolution                     │
│  3. Cryptographic Zero Data Retention (purgeAfterRead: true)              │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼ (Restored, Plaintext Response)
[ Client Application / User ]
```

> **Boundary & Stateless Execution Note:**
> - **Where the open-source code starts & ends**: AI Privacy Core is an independent, self-contained edge gateway layer encompassing tokenization, checksum validation, ephemeral vault management, and detokenization. It sits strictly between the client and upstream LLMs. Upstream AI providers (OpenAI, Anthropic, Google, open-source inference servers) are external services that receive only de-identified text.
> - **How it runs statelessly**: AI Privacy Core executes in a stateless, zero-trust paradigm. It requires no persistent disk storage. When deployed without a database binding, all token-to-entity mappings exist solely in volatile RAM, isolated per edge worker invocation. Setting `purgeAfterRead: true` cryptographically destroys the mapping the microsecond it is accessed. No user prompts, tokens, or decrypted entities are ever logged to disk, shared upstream, or retained.

### 1. 4-Tier Detection Hierarchy & Disambiguation
- **Tier 1: High-Confidence Formats**: Cryptographic keys, emails, international phone numbers (E.164), cryptocurrency addresses (Bitcoin, Ethereum, Solana).
- **Tier 2: Algorithmic Checksum Validation**: Eliminates false positives by evaluating strict sovereign formulas: Verhoeff (India Aadhaar), Luhn Mod-10 (Credit Cards, Canada SIN, South Africa ID), ISO 7064 Mod-97 (IBAN, France NIR), Mod-11 (Singapore NRIC, UK NHS, Australia TFN), Mod-23 (Spain DNI), and Mod-26 (Italy Codice Fiscale).
- **Tier 3: Contextual Proximity Anchors**: Contextual matchers with sliding window proximity heuristics to capture unstructured names, invoices, and healthcare MRN numbers.
- **Tier 4: Dynamic Enterprise Keywords**: Header-driven custom entity lists (`x-custom-entities`, `x-custom-keywords`) masking internal project codenames and intellectual property.

### 2. Dual Tokenization Modes
- **Structural Mode (`"structural"`, Default)**: Replaces sensitive entities with semantic tokens (`CARD_1`, `PERSON_1`, `EMAIL_1`). Optimal for chat assistants and summarization tasks.
- **Format-Preserving Masking (`"fpe"`)**: Replaces entities with syntactically valid synthetic mocks (e.g., valid Luhn card mock, synthetic valid-format email) for SQL generators, code generation, and tabular format preservation.

### 3. Grammatical Suffix & Coreference Preservation
- Automatically detects and preserves possessive apostrophes and contractions (`Alice Wong's` -> `PERSON_1's`).
- Guarantees consistent token assignment for repeated mentions across long multi-turn prompts.

---

## 🔒 Enterprise Security & Zero Data Retention (ZDR)

Enterprise security teams and CISOs frequently ask two critical architecture questions:

### 1. Is Cloudflare D1 required? Does session data persist on disk?
**No.** Self-hosted deployments operate in a **100% ephemeral in-memory state** by default.
- When `DB` is unbound, session mappings reside strictly in volatile RAM with automatic TTL eviction and **zero disk persistence**.
- For multi-datacenter distributed edge architectures, Cloudflare D1 (or Redis/PostgreSQL) can be optionally bound.
- No plaintext prompts or entity values are ever written to server logs or persisted beyond their configured TTL.

### 2. Zero Data Retention (ZDR) Enforced (`purgeAfterRead`)
The detokenize endpoint supports the `purgeAfterRead: true` parameter:
- **Instant Cryptographic Obliteration**: The session token mapping is permanently erased from memory the exact microsecond it is read.
- **Subsequent Replays Rejected**: Any subsequent attempt to detokenize using that `sessionId` returns HTTP `404 session_expired_error`.
- **Compliance Alignment**: Satisfies enterprise CISO zero-retention mandates, **GDPR Article 17 (Right to Erasure)**, and **SOC 2 Type II** trust criteria.

### 3. Zero-Knowledge Customer KMS (BYOK AES-256-GCM)
Enterprises with strict sovereignty or multi-tenant requirements can supply their own cryptographic keys via the `x-vault-encryption-key` request header (or `encryptionKey` body property).
- **Client-Side Zero-Knowledge**: The gateway derives a 256-bit AES key on-the-fly using PBKDF2/SHA-256 with 100,000 iterations and a per-session cryptographic salt.
- **Authenticated Encryption at Rest**: Ephemeral session token maps stored in RAM or distributed D1 are encrypted with **AES-256-GCM** using random 96-bit initialization vectors (IVs) and 128-bit authentication tags.
- **Operator Impossibility**: Even a rogue operator or compromised database dump cannot inspect the de-identified mappings without the customer's BYOK secret key.
- **Audit Response Header**: Validates KMS enforcement by returning `X-Kms-Status: BYOK-AES-256-GCM`.

### 4. SIEM Compliance Audit Telemetry & SOC 2 / HIPAA / GDPR
Enterprises must prove compliance with privacy regulators without creating new PII honeypots in security operations centers.
- **Zero-PII Audit Fingerprinting**: Sensitive entities are **never** logged in plaintext. Every detected entity is irreversibly fingerprinted using a truncated SHA-256 digest (`ruleId`, `token`, `fingerprint`: 16 hex chars).
- **SOC 2 & HIPAA Ready**: Log entries record the timestamp, event type, session ID, model, upstream base URL, latency in microseconds, and entity fingerprints.
- **SIEM Stream Integration**: Automatically dispatches asynchronous audit batches to enterprise SIEM platforms (Splunk, Datadog, Elastic, Sentinel) via the `SIEM_WEBHOOK_URL` or `AUDIT_WEBHOOK_URL` environment variables.
- **Live Query Endpoint**: Query real-time compliance events via `GET /v1/audit/events`.

---

## 📡 API Reference

The live edge gateway is unauthenticated and open for direct consumption:
```
Base URL: https://ai-privacy-core.boruahpriyanuj2004.workers.dev
```

### 1. `POST /v1/chat/completions` (Drop-In OpenAI Wire-Compatible Proxy)

Zero-refactor, 1-line de-identification gateway for OpenAI, Claude, Groq, Mistral, Ollama, and Azure LLM pipelines.

Intercepts incoming chat completion requests, neutralizes all sovereign national IDs, credit cards, emails, and custom enterprise keywords at the edge in microseconds, forwards the sanitized prompt to the upstream model, and automatically rehydrates model responses before returning them to your application. Supports **both non-streaming JSON and streaming SSE (`stream: true`)** with split-token reassembly.

#### 1-Line Drop-In Usage (Python OpenAI SDK)
```python
from openai import OpenAI

# Simply point base_url to AI Privacy Core
client = OpenAI(
    base_url="https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1",
    api_key="sk-..."  # Your real OpenAI API key is forwarded securely
)

# Standard OpenAI call — Sovereign IDs & PII are neutralized before leaving your region
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a banking compliance assistant."},
        {"role": "user", "content": "Verify transaction for Jane Doe, email: jane@corp.de, German Tax ID: 04 225 818 316."}
    ],
    stream=True  # Full streaming SSE support with zero split-token leaks
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

#### TypeScript / Node.js Usage
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Contact support at alice@fintech.sg with card 4532-0151-9988-1002" }],
});

console.log(completion.choices[0].message.content);
```

#### Google AI Studio & Gemini Models (e.g. Gemini 2.5 Flash / 3.5 Flash)
AI Privacy Core features **smart automatic provider detection**: when you request any `gemini-*` model or provide a Google API key (`AIza...`), the gateway automatically routes to Google AI Studio with zero manual configuration.

**Option A: Via OpenAI SDK (Recommended)**
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1",
    api_key="AIzaSy..."  # Your Google AI Studio API Key
)

# Automatically routed to Google AI Studio with edge de-identification
response = client.chat.completions.create(
    model="gemini-2.5-flash",  # or gemini-3.5-flash, gemini-1.5-pro
    messages=[
        {"role": "user", "content": "Customer email is alex@health.org and SSN is 123-45-6789."}
    ],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

**Option B: Via Native Google GenAI SDK (`POST /v1beta/models/...`)**
```python
from google import genai

client = genai.Client(
    api_key="AIzaSy...",
    http_options={"base_url": "https://ai-privacy-core.boruahpriyanuj2004.workers.dev"}
)

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="My phone number is 415-555-2671 and Aadhaar is 9999 4105 1234."
)
print(response.text)
```

#### Supported Gateway Headers
| Header | Description | Default |
|---|---|---|
| `Authorization` | Upstream provider API key (`Bearer sk-...`) | Forwarded |
| `x-upstream-base-url` | Custom upstream provider endpoint (e.g. `https://api.groq.com/openai/v1`, `http://localhost:11434/v1`) | `https://api.openai.com/v1` |
| `x-vault-encryption-key` | Customer BYOK KMS passphrase for Zero-Knowledge AES-256-GCM vault encryption | None (Off) |
| `x-detection-categories` | Canonical Regional Packs to enforce (e.g. `european_union,global` or `all`) | `global` |
| `x-custom-keywords` | Enterprise terms/codenames to tokenize (e.g. `ProjectTitan, SecretAlpha`) | None |
| `x-tokenization-mode` | Token format: `"structural"` (`<CARD_1>`) or `"fpe"` (realistic synthetic mocks) | `structural` |
| `x-preserve-session` | When set to `"true"`, preserves the ephemeral vault session across multi-turn requests | `false` |

#### Response Metadata Headers
The proxy attaches security audit telemetry and cryptographic verification to every response:
- `x-privacy-gateway`: `"ai-privacy-core"`
- `X-Kms-Status`: Cryptographic vault status (`"BYOK-AES-256-GCM"` or `"OFF"`).
- `x-privacy-session-id`: Ephemeral session ID created for this turn.
- `x-privacy-entities-intercepted`: Count of sensitive entities intercepted.
- `x-privacy-latency-us`: Engine de-identification latency in microseconds (e.g., `86 µs`).
- `x-privacy-mode`: Tokenization mode applied (`"structural"` or `"fpe"`).

---

### 2. `POST /v1/embeddings`
Protects RAG indexing and vector search by de-identifying queries and text chunks before embedding models receive them.

```bash
curl https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1/embeddings \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-small",
    "input": "User email is confidential@enterprise.org"
  }'
```

---

### 3. `POST /v1/tokenize`
Scans input prompt text, runs algorithmic checksum validators, replaces detected entities with deterministic surrogate tokens, and registers an ephemeral session.

#### Headers
| Header | Type | Description |
|---|---|---|
| `Content-Type` | string | `application/json` |
| `x-vault-encryption-key` | string | *(Optional)* Customer BYOK KMS passphrase for Zero-Knowledge AES-256-GCM vault encryption |
| `x-detection-categories` | string | *(Optional)* Comma-separated Canonical Pack IDs (e.g. `africa,global`) |
| `x-custom-entities` | string | *(Optional)* Comma-separated custom enterprise keywords to mask |

#### Request Body
```json
{
  "text": "Transfer USD 5,000 for Contact Alice Wong (email: alice@fintech.io) with Visa 4532-0151-1283-0366 to South Africa ID 8001015009087.",
  "encryptionKey": "customer-kms-secret-passphrase",
  "categories": ["africa"],
  "mode": "structural",
  "customKeywords": ["ProjectTitan"],
  "ttlSeconds": 300
}
```

#### Parameters
- `text` *(string, required)*: Input prompt text (Max 1MB).
- `encryptionKey` *(string, optional)*: Customer BYOK passphrase for client-side Zero-Knowledge AES-256-GCM vault encryption.
- `categories` *(string[], optional)*: Up to 2 Canonical Regional Pack IDs. Defaults to `["global"]`.
- `mode` *(string, optional)*: `"structural"` (e.g., `<CARD_1>`, `<PERSON_1>`) or `"fpe"` (format-preserving synthetic mocks). Default: `"structural"`.
- `customKeywords` *(string[], optional)*: List of custom enterprise terms/codenames to tokenize.
- `ttlSeconds` *(number, optional)*: Vault session lifetime in seconds. Default: `300` (5 minutes), Max: `86400` (24 hours).

#### Response (`200 OK`)
Includes response header `X-Kms-Status: BYOK-AES-256-GCM` when an encryption key is supplied.
```json
{
  "mode": "structural",
  "sessionId": "sess_tok_hom91ilalo",
  "sanitizedText": "Transfer USD 5,000 for Contact PERSON_1 (email: EMAIL_1) with Visa CARD_1 to South Africa ID ZA_ID_1.",
  "entitiesCount": 4,
  "entitiesDetected": [
    { "type": "RULE_CONTEXT_NAME", "token": "PERSON_1" },
    { "type": "RULE_EMAIL", "token": "EMAIL_1" },
    { "type": "RULE_CREDIT_CARD", "token": "CARD_1" },
    { "type": "RULE_ZA_ID", "token": "ZA_ID_1" }
  ],
  "categoriesApplied": [
    "global",
    "africa"
  ],
  "expiresAt": "2026-09-04T21:16:55.212Z"
}
```

---

### 4. `POST /v1/detokenize`
Rehydrates tokenized text produced by an LLM back into original sensitive values using the session vault.

#### Headers
| Header | Type | Description |
|---|---|---|
| `Content-Type` | string | `application/json` |
| `x-vault-encryption-key` | string | *(Optional)* Customer BYOK KMS passphrase required to decrypt encrypted vault sessions |

#### Request Body
```json
{
  "sessionId": "sess_tok_hom91ilalo",
  "encryptionKey": "customer-kms-secret-passphrase",
  "tokenizedText": "Transfer USD 5,000 for Contact PERSON_1 (email: EMAIL_1) with Visa CARD_1 to South Africa ID ZA_ID_1.",
  "purgeAfterRead": true
}
```

#### Parameters
- `sessionId` *(string, required)*: Session ID returned from the original `/v1/tokenize` call.
- `encryptionKey` *(string, optional)*: Customer BYOK passphrase required to decrypt the vault session (if encrypted during tokenization).
- `tokenizedText` *(string, required)*: Text containing tokens to restore.
- `purgeAfterRead` *(boolean, optional)*: **Zero Data Retention (ZDR) Flag**. When `true`, permanently deletes the session mapping immediately upon read. Default: `false`.

#### Response (`200 OK`)
```json
{
  "rehydratedText": "Transfer USD 5,000 for Contact Alice Wong (email: alice@fintech.io) with Visa 4532-0151-1283-0366 to South Africa ID 8001015009087.",
  "tokensResolved": 4,
  "sessionStatus": "purged"
}
```

---

### 5. `GET /v1/models`
Returns the list of compatible LLM models for seamless integration with official OpenAI SDKs, LangChain, LiteLLM, and OpenWebUI.

#### Response (`200 OK`)
```json
{
  "object": "list",
  "data": [
    { "id": "gpt-4o", "object": "model", "owned_by": "system" },
    { "id": "gpt-4o-mini", "object": "model", "owned_by": "system" },
    { "id": "claude-3-5-sonnet", "object": "model", "owned_by": "system" }
  ]
}
```

---

### 6. `GET /v1/audit/events`
Compliance SIEM telemetry query endpoint. Returns real-time, non-PII audit event records for SOC 2, HIPAA, and ISO 27001 auditability. Detected entities are represented solely by irreversible 16-hex-character SHA-256 fingerprints.

#### Query Parameters
| Parameter | Type | Description | Default |
|---|---|---|---|
| `limit` | integer | Maximum events to return (max `1000`) | `50` |
| `sessionId` | string | Filter by specific vault session ID | None |
| `eventType` | string | Filter by event type (`chat_completion`, `embedding`, `tokenize`, `detokenize`) | None |

#### Response (`200 OK`)
```json
{
  "object": "list",
  "total": 1,
  "data": [
    {
      "eventId": "evt_1727361441000_abc123",
      "timestamp": "2026-09-26T14:40:00.000Z",
      "eventType": "chat_completion",
      "sessionId": "sess_tok_hom91ilalo",
      "kmsStatus": "BYOK-AES-256-GCM",
      "entitiesIntercepted": 2,
      "entities": [
        {
          "ruleId": "RULE_EMAIL",
          "token": "EMAIL_1",
          "fingerprint": "a1b2c3d4e5f67890"
        },
        {
          "ruleId": "RULE_CREDIT_CARD",
          "token": "CARD_1",
          "fingerprint": "f0e1d2c3b4a59687"
        }
      ],
      "model": "gpt-4o",
      "upstreamBaseUrl": "https://api.openai.com/v1",
      "latencyUs": 450
    }
  ]
}
```

---

### 7. `GET /health`
Returns runtime health, active version, and supported gateway features.

#### Response (`200 OK`)
```json
{
  "status": "ok",
  "version": "2.0.0",
  "features": ["de-identification", "detokenization", "openai-proxy", "streaming-sse", "embeddings"]
}
```

---

## 📦 Developer SDKs & Framework Integrations

### 1. Python SDK (`ai-privacy-core`)

Production-grade, lightweight Python package providing synchronous (`Client`) and asynchronous (`AsyncClient`) gateways, scoped session context managers, and BYOK KMS encryption.

```bash
pip install ai-privacy-core
```

#### Synchronous & Scoped Session Example
```python
from ai_privacy_core import Client
from openai import OpenAI

# Connect SDK to AI Privacy Core gateway with BYOK KMS encryption
privacy = Client(
    base_url="http://localhost:8787/v1",
    encryption_key="customer-kms-secret-passphrase",
    default_categories=["global", "north_america", "european_union"]
)
openai = OpenAI()

# Use scoped session for zero-leak prompt sanitization & exact rehydration
with privacy.session() as session:
    raw_prompt = "Contact client Jane Doe (email: jane@corp.de, SSN: 123-45-6789)."
    
    # 1. Neutralize PII/Sovereign IDs before prompt leaves your network
    clean_prompt = session.tokenize(raw_prompt)
    
    # 2. Upstream LLM receives ONLY de-identified surrogate tokens
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": clean_prompt}]
    )
    
    # 3. Seamlessly rehydrate LLM response before returning to user
    final_text = session.detokenize(response.choices[0].message.content)
    print(final_text)
```

#### Asynchronous Client Example
```python
import asyncio
from ai_privacy_core import AsyncClient

async def main():
    async with AsyncClient("http://localhost:8787/v1") as client:
        result = await client.tokenize("Call Alice at +1 415-555-2671")
        print(f"Sanitized: {result.sanitized_text}")
        print(f"Session: {result.session_id}")

asyncio.run(main())
```

---

### 2. LangChain Integration (`PrivacyCallbackHandler`)

Drop-in callback handler that intercepts prompts before LLM execution, sanitizes them in-place, and rehydrates model outputs transparently before chains or agents complete.

```bash
pip install "ai-privacy-core[langchain]"
```

```python
from langchain_openai import ChatOpenAI
from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

# 1. Instantiate privacy callback handler
privacy_handler = PrivacyCallbackHandler(
    base_url="http://localhost:8787/v1",
    categories=["global", "north_america", "european_union"],
    encryption_key="customer-kms-passphrase"
)

# 2. Attach handler to any LangChain LLM or ChatModel
llm = ChatOpenAI(model="gpt-4o", callbacks=[privacy_handler])

# Prompts are automatically neutralized on_llm_start,
# and outputs are rehydrated on_llm_end!
response = llm.invoke("What is the account status for Alice (SSN: 123-45-6789)?")
print(response.content)
```

---

### 3. LiteLLM Router & Proxy Hook (`LiteLLMPrivacyHook`)

Enables teams using [LiteLLM](https://github.com/BerriAI/litellm) as an enterprise LLM gateway to automatically sanitize prompts and rehydrate responses across all 100+ supported providers.

```bash
pip install "ai-privacy-core[litellm]"
```

#### LiteLLM Python SDK Hook
```python
import litellm
from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook

# Register privacy hook with LiteLLM callbacks
privacy_hook = LiteLLMPrivacyHook(
    base_url="http://localhost:8787/v1",
    encryption_key="enterprise-kms-key"
)
litellm.callbacks = [privacy_hook]

# Standard LiteLLM completion — privacy enforced automatically
response = litellm.completion(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Send invoice to user@acme.com"}]
)
print(response.choices[0].message.content)
```

#### LiteLLM Proxy Configuration (`config.yaml`)
Alternatively, point LiteLLM Proxy's `api_base` directly to AI Privacy Core:
```yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_base: http://localhost:8787/v1
      api_key: os.environ/OPENAI_API_KEY
      extra_headers:
        x-detection-categories: "global,north_america,european_union"
        x-vault-encryption-key: os.environ/AI_PRIVACY_KMS_KEY
```

---

## 🛡️ SLA Guardrails & System Limits

To guarantee predictable `< 5ms` execution on serverless V8 edge isolates, the engine enforces strict architectural bounds:

| Guardrail | Limit | Status Code on Breach |
|---|---|---|
| **Canonical Pack Limit** | Maximum 2 Canonical Packs per request | `400 category_limit_exceeded` |
| **Payload Size Ceiling** | 1 Megabyte (1,048,576 bytes) | `413 payload_too_large` |
| **Country Code Format** | Must use Canonical Pack IDs (no ISO country aliases) | `400 invalid_request_error` |
| **Default Session TTL** | 300 seconds (5 minutes) | `404 session_expired_error` |

---

## ⚡ Quickstart & Local Development

### Integration Examples

#### cURL
```bash
curl -X POST "https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1/tokenize" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Contact Alice Wong at alice@fintech.io with card 4532-0151-1283-0366.",
    "categories": ["global"]
  }'
```

#### Node.js (Fetch)
```javascript
const response = await fetch("https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1/tokenize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Contact Alice Wong at alice@fintech.io with card 4532-0151-1283-0366.",
    categories: ["global"]
  })
});

const { sanitizedText, sessionId } = await response.json();
console.log("Sanitized Prompt for LLM:", sanitizedText);

// Send sanitizedText to OpenAI / Claude / Gemini...
// On completion, detokenize:
const detokResponse = await fetch("https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1/detokenize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sessionId,
    tokenizedText: sanitizedText,
    purgeAfterRead: true
  })
});

const { rehydratedText } = await detokResponse.json();
console.log("Restored Prompt:", rehydratedText);
```

#### Python (Requests)
```python
import requests

url = "https://ai-privacy-core.boruahpriyanuj2004.workers.dev/v1/tokenize"
payload = {
    "text": "Contact Alice Wong at alice@fintech.io with card 4532-0151-1283-0366.",
    "categories": ["global"]
}

response = requests.post(url, json=payload).json()
print("Safe Prompt:", response["sanitizedText"])
print("Session ID :", response["sessionId"])
```

---

### Local Setup & Testing

```bash
# Clone repository
git clone https://github.com/PriyanujBoruah/AI-Privacy-Core.git
cd AI-Privacy-Core/data-deidentification-engine

# Install dependencies
npm install

# Run the complete test suite (95 unit & checksum tests)
npm test

# Run local development server
npm run dev
```

---

## 🚀 Deployment

AI Privacy Core supports four production deployment options depending on your security architecture:

### 1. Serverless Edge (Cloudflare Workers)
Deploy globally to 300+ edge locations with zero infrastructure management:
```bash
# Login to Cloudflare
npx wrangler login

# Deploy Edge Worker
npx wrangler deploy
```

### 2. Kubernetes Helm Chart (On-Prem / EKS / GKE / AKS)
Deploy into your enterprise Kubernetes cluster with Horizontal Pod Autoscaling (HPA) and non-root execution:
```bash
# Install with production autoscaling and non-root security context
helm install ai-privacy-core ./charts/ai-privacy-core \
  --namespace ai-security \
  --create-namespace
```

### 3. AWS Private VPC / ECS Fargate (Terraform)
1-Click deployment behind an internal Application Load Balancer inside your private VPC:
```bash
cd deploy/terraform/aws-ecs
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply
```

### 4. Docker & Docker Compose (Air-Gapped / Bare Metal)
Run directly inside your private infrastructure with zero external telemetry:
```bash
# Pull and start hardened non-root container
docker compose up -d

# Verify health
curl http://localhost:8787/health
```

📖 **Detailed enterprise hardening, network topology, and compliance mapping:** [Enterprise Deployment Guide](docs/ENTERPRISE_DEPLOYMENT.md)

---

## 🌐 Canonical Regional Packs Catalog

To maintain the strict sub-5ms edge SLA guarantee, each API request accepts a **maximum of 2 Canonical Pack IDs**. Universal baseline rules (`global`) are always included automatically.

| Canonical Pack ID | Region Scope | Key Sovereign Identifiers & Checksum Engines |
|---|---|---|
| **`global`** *(Always Active)* | Universal Baseline | Payment Cards (Luhn Mod-10), IBAN (ISO 7064 Mod-97-10), SWIFT/BIC, IPv4/IPv6, Crypto (BTC, ETH, SOL), API Keys, Emails, Phone Numbers (E.164), Contextual Names. |
| **`south_east_asia`** | 9 ASEAN Nations | **Singapore**: NRIC/FIN (Weighted Mod-11), UEN. **Malaysia**: MyKad (12-digit DOB/state parity), TIN. **Indonesia**: NIK (16-digit province/regency), NPWP. **Thailand**: National ID (Mod-11). **Vietnam**: CCCD (12-digit), MST. **Philippines**: PhilSys PCN, SSS, TIN. **Myanmar**: NRC. **Cambodia**: Khmer ID. |
| **`asia_non_sea`** | 12 Pan-Asian Nations | **India**: Aadhaar (Verhoeff D5), PAN, Voter ID, Passport, GSTIN (Mod-36), ABHA. **Japan**: My Number (Mod-11), Corporate Number. **South Korea**: RRN (Mod-11). **Taiwan**: National ID (Mod-10). **China**: Resident ID (ISO 7064 Mod 11-2). **Saudi Arabia**: National ID/Iqama (Luhn). **UAE**: Emirates ID (Luhn). **Israel**: Teudat Zehut (Luhn). **Turkey**: TCKN (Dual Mod-10). **Hong Kong**: HKID (Mod-11). |
| **`north_america`** | 4 Nations | **United States**: SSN (Area exclusions), ABA Routing (Fed Mod-10), Medicare MBI, NPI (Luhn), DEA Prescriber. **Canada**: SIN (Luhn Mod-10), OHIP Health (Luhn), BN. **Mexico**: CURP (Mod-10), RFC, NSS (Luhn Mod-10). **Dominican Republic**: Cédula (Luhn). |
| **`south_america`** | 12 Nations | **Brazil**: CPF (Two-stage Mod-11), CNPJ (Two-stage Mod-11). **Argentina**: CUIT/CUIL (Mod-11), DNI. **Chile**: RUN/RUT (Mod-11). **Colombia**: NIT (DIAN Mod-11), Cédula. **Peru**: RUC (Mod-11), DNI. **Ecuador**: Cédula (Mod-10). **Uruguay**: Cédula (Mod-10). |
| **`european_union`** | All 27 EU Nations | **Spain**: DNI/NIE (Mod-23). **Italy**: Codice Fiscale (Mod-26). **Poland**: PESEL (Mod-10), NIP (Mod-11). **Netherlands**: BSN (Elfproef). **Belgium**: RRN (Mod-97). **Germany**: Steuer-ID (Mod-11). **France**: NIR (Mod-97), SIREN (Luhn). **Sweden**: Personnummer (Luhn). **Austria**: SVNr (Mod-11). **Portugal**: NIF (Mod-11). |
| **`europe_non_eu`** | 6 Nations | **United Kingdom**: NHS Number (Mod-11), NINO, UTR. **Switzerland**: AHV/AVS (EAN-13), UID (Mod-11). **Norway**: Fødselsnummer (Dual Mod-11). **Iceland**: Kennitala (Mod-11). **Ukraine**: IPN (Mod-11). **Western Balkans**: JMBG/EMBG (Mod-11). |
| **`africa`** | 7 Nations | **South Africa**: ID (Luhn Mod-10), Tax Ref. **Egypt**: National ID (14-digit date/gov code). **Rwanda**: National ID (16-digit citizen indicator). **Kenya**: KRA PIN, National ID. **Ghana**: Ghana Card (`GHA-`), TIN. **Nigeria**: NIN, BVN. **Uganda**: NIN. **Tanzania**: NIDA. |
| **`oceania`** | 2 Nations | **Australia**: Tax File Number TFN (Mod-11), Medicare Card (Mod-10), Business Number ABN (Mod-89). **New Zealand**: IRD (Mod-11). |
| **`corporate`** | Enterprise & Health | Healthcare Medical Record Numbers (MRN), Invoices, Order IDs, Enterprise Project Codenames. |

---

## 🌍 Country-Wise Sovereign ID Coverage & Validation Engines

Coverage spans **109 Sovereign Jurisdictions across 9 Canonical Packs** (75+ with dedicated national ID checksums, plus universal coverage across 200+ countries for global financial and telecom formats):

| Jurisdiction | Pack ID | Sovereign Identifiers Protected | Validation Algorithm / Engine |
|---|---|---|---|
| **🌐 Global Universal** (200+ Countries) | `global` | Credit/Debit Cards, IBAN, SWIFT/BIC, IPv4/IPv6, Crypto (BTC, ETH, SOL), API Secrets | ISO 7064 Mod-97-10, Luhn Mod-10, Base58/Bech32, E.164, Regex AST |
| 🇸🇬 **Singapore** | `south_east_asia` | NRIC / FIN, UEN (Unique Entity Number) | Weighted Mod-11 with century prefix offsets (S, T, F, G, M) |
| 🇲🇾 **Malaysia** | `south_east_asia` | MyKad (National Registration Identity) | 12-digit DOB, state code & gender parity validation |
| 🇮🇩 **Indonesia** | `south_east_asia` | NIK (KTP Citizen ID), NPWP (Tax ID) | 16-digit provincial/DOB structure, 15-digit Tax Office algorithm |
| 🇹🇭 **Thailand** | `south_east_asia` | Thai National ID (บัตรประชาชน) | 13-digit weighted Mod-11 checksum formula |
| 🇻🇳 **Vietnam** | `south_east_asia` | CCCD (Citizen Identity Chip Card), MST (Tax) | 12-digit provincial/century/gender code & 10/13-digit tax verify |
| 🇵🇭 **Philippines** | `south_east_asia` | PhilSys PCN, SSS (Social Security Number) | 16-digit PhilID Luhn verification & 10-digit SSS checksum |
| 🇮🇳 **India** | `asia_non_sea` | Aadhaar, PAN, Voter ID, GSTIN | Verhoeff D5 Checksum (Aadhaar), Mod-36 (GSTIN), PAN Structure |
| 🇯🇵 **Japan** | `asia_non_sea` | My Number (マイナンバー 個人番号), Corporate No. | Weighted Mod-11 verification formula |
| 🇰🇷 **South Korea** | `asia_non_sea` | Resident Registration Number (RRN 주민등록번호) | 13-digit weighted Mod-11 checksum formula |
| 🇹🇼 **Taiwan** | `asia_non_sea` | National Identification Card (身分證字號) | Geographic letter-to-integer mapping & Mod-10 verification |
| 🇨🇳 **China** | `asia_non_sea` | Resident Identity Card (居民身份证) | 18-digit ISO 7064 Mod 11-2 check-code formula |
| 🇸🇦 **Saudi Arabia** | `asia_non_sea` | National ID (الهوية الوطنية), Iqama (إقامة) | 10-digit Luhn Mod-10 validation (1=Citizen, 2=Resident) |
| 🇦🇪 **United Arab Emirates** | `asia_non_sea` | Emirates ID Card (هوية مقيم) | 15-digit Luhn Mod-10 check on trailing sequence digit |
| 🇮🇱 **Israel** | `asia_non_sea` | Teudat Zehut (תעודת זהות) | 9-digit weighted Luhn Mod-10 checksum |
| 🇹🇷 **Turkey** | `asia_non_sea` | T.C. Kimlik No (TCKN) | 11-digit dual-stage Mod-10 checksum formula |
| 🇺🇸 **United States** | `north_america` | SSN, ABA Routing, Medicare MBI, NPI, DEA | Area exclusions, Federal Reserve Mod-10, Luhn, DEA Checksum |
| 🇨🇦 **Canada** | `north_america` | Social Insurance Number (SIN), Health OHIP | 9-digit Luhn Mod-10 (SIN), 10-digit Luhn (OHIP) |
| 🇲🇽 **Mexico** | `north_america` | CURP, RFC (Tax ID), NSS (Social Security) | 18-character Mod-10 (CURP), 11-digit Luhn Mod-10 (NSS) |
| 🇩🇴 **Dominican Republic** | `north_america` | Cédula de Identidad y Electoral | 11-digit Luhn Mod-10 checksum validation |
| 🇧🇷 **Brazil** | `south_america` | CPF (Cadastro de Pessoas Físicas), CNPJ | Dual-stage weighted Mod-11 algorithm (CPF & CNPJ) |
| 🇦🇷 **Argentina** | `south_america` | CUIT / CUIL, Documento Nacional de Identidad | 11-digit weighted Mod-11 verification formula |
| 🇨🇱 **Chile** | `south_america` | RUN / RUT (Rol Único Nacional) | Modulo 11 check digit verification (with 'K' remainder) |
| 🇨🇴 **Colombia** | `south_america` | NIT (Número de Identificación Tributaria) | DIAN 10-digit weighted prime Mod-11 verification |
| 🇪🇸 **Spain** | `european_union` | DNI (Documento Nacional de Identidad), NIE | 8-digit Modulo 23 letter-mapping table verification |
| 🇮🇹 **Italy** | `european_union` | Codice Fiscale (Tax Code) | 16-character alphanumeric odd/even parity Mod-26 check |
| 🇵🇱 **Poland** | `european_union` | PESEL (National ID), NIP (Tax Identification) | 11-digit weighted Mod-10 (PESEL) & Mod-11 (NIP) |
| 🇳🇱 **Netherlands** | `european_union` | Burgerservicenummer (BSN) | 9-digit 11-proof (Elfproef) weighted checksum algorithm |
| 🇧🇪 **Belgium** | `european_union` | Rijksregisternummer (RRN / Numéro National) | 11-digit ISO 7064 Modulo 97 verification algorithm |
| 🇩🇪 **Germany** | `european_union` | Steuer-ID (Steuerliche Identifikationsnummer) | 11-digit weighted Modulo 11 check digit algorithm |
| 🇫🇷 **France** | `european_union` | Numéro de Sécurité Sociale (NIR), SIREN | 15-digit Modulo 97 complement formula (NIR) & Luhn (SIREN) |
| 🇸🇪 **Sweden** | `european_union` | Personnummer (Personal Identity Number) | 10-digit Luhn Mod-10 checksum on birth & sequence fields |
| 🇬🇧 **United Kingdom** | `europe_non_eu` | NHS Number, National Insurance (NINO) | 10-digit weighted Mod-11 formula (NHS) & HMRC Prefix RegEx |
| 🇨🇭 **Switzerland** | `europe_non_eu` | AHV / AVS (Social Security), UID (Enterprise) | 13-digit EAN-13 weighted checksum (AHV) & Mod-11 (UID) |
| 🇳🇴 **Norway** | `europe_non_eu` | Fødselsnummer (National ID Number) | 11-digit dual-stage weighted Modulo 11 checksum verification |
| 🇺🇦 **Ukraine** | `europe_non_eu` | IPN (Individual Tax Number), EDRPOU | 10-digit weighted Modulo 11 formula |
| 🇿🇦 **South Africa** | `africa` | South African National ID Book / Smart Card | 13-digit Luhn Mod-10 verification on DOB & sequence digits |
| 🇪🇬 **Egypt** | `africa` | National ID (الرقم القومي) | 14-digit century, birthdate, and governorate code validation |
| 🇷🇼 **Rwanda** | `africa` | National ID (Indangamuntu) | 16-digit citizen indicator, birth year, and gender parity check |
| 🇰🇪 **Kenya** | `africa` | KRA PIN (Revenue Authority), National ID | 11-character alphanumeric structure [AP]\d{9}[A-Z] |
| 🇦🇺 **Australia** | `oceania` | Tax File Number (TFN), Medicare, ABN | Weighted Mod-11 (TFN), Mod-10 (Medicare), Mod-89 (ABN) |

---

## 🌱 Open-Source Sustainable Development (UN SDGs)

AI Privacy Core aligns directly with the official United Nations Sustainable Development Goals (SDGs) as open-source Digital Public Infrastructure:

### SDG Breakdown

#### 🏥 SDG 3: Good Health and Well-Being
- **Target 3.8 (Universal Healthcare Coverage)**: Scans for and tokenizes Protected Health Information (PHI) - Medical Record Numbers (MRN), National Prescriber Identifiers (NPI/DEA), clinical diagnostic codes, and healthcare beneficiary numbers (US Medicare MBI, Australian Medicare) - before clinical notes hit third-party LLMs.
- **Target 3.d (Health Risk Management)**: Enables researchers to feed raw clinical symptom sets and epidemiological case narratives through AI models, stripping personal patient indicators while preserving biomedical relationships for multi-jurisdiction disease modeling.

#### 📈 SDG 8: Decent Work and Economic Growth
- **Target 8.2 (Economic Productivity & Technological Upgrading)**: Provides a high-throughput, edge-native de-identification layer operating at sub-5ms latency, allowing developers to integrate generative AI into legacy backends without expensive infrastructure redesigns.
- **Target 8.10 (Universal Access to Financial Services)**: Algorithmic Mod-10 (Luhn) card validation, Mod-97 (ISO 7064) IBAN validation, and domestic banking routing checks (US ABA, Indian IFSC, SEPA) neutralize financial identifiers, enabling community banks and fintech startups to adopt AI while satisfying PCI-DSS standards.

#### 🏭 SDG 9: Industry, Innovation, and Infrastructure
- **Target 9.c (Access to Information & Communications Technology)**: Operates statelessly inside serverless edge isolates without requiring multi-gigabyte models, dedicated GPUs, or heavy container runtimes, democratizing enterprise-grade privacy protection in low-compute environments.
- **Target 9.5 (Encourage Domestic Innovation)**: Open-sources 67 mathematical checksum algorithms and pattern extractors under the permissive Apache-2.0 license, supplying foundational Digital Public Infrastructure (DPI) that local engineering ecosystems can independently inspect and run.

#### ⚖️ SDG 10: Reduced Inequalities
- **Target 10.2 (Promote Inclusion for All)**: Provides 185 sovereign identity and tax pattern checks covering 109 countries across 9 Canonical Packs, delivering out-of-the-box parity for nations across ASEAN, Africa, Latin America, and South Asia. Counteracts the systemic bias of legacy DLP tools that prioritize Western formats while neglecting Global South citizen identifiers.
- **Target 10.3 (Equal Opportunity & Reduced Inequalities)**: Distributes sovereign data privacy infrastructure at zero cost under an open standard, eliminating the multi-thousand-dollar licensing barriers imposed by legacy enterprise cybersecurity monopolies.

#### 🕊️ SDG 16: Peace, Justice, and Strong Institutions
- **Target 16.9 (Legal Identity for All & Registry Defense)**: Intercepts civil registration codes, national voter indices, and foundational citizen identification numbers across 75+ sovereign jurisdictions. Prevents national digital legal identities from leaking into commercial LLM training corpora or vector embeddings.
- **Target 16.10 (Public Access to Information & Fundamental Freedoms)**: Enforces cryptographic zero-retention through automated session destruction (`purgeAfterRead`) and client-side encryption options, defending the fundamental human right to digital privacy (UN Universal Declaration of Human Rights, Article 12).

### Summary Matrix

| UN SDG | Target Focus | Core Engine Mechanism | Practical Impact |
|---|---|---|---|
| **SDG 3** | `3.8, 3.d` | Intercepts PHI, MRN, NPI, and clinical identifiers before model ingress. | Enables HIPAA-compliant clinical AI adoption and cross-border research. |
| **SDG 8** | `8.2, 8.10` | Checksum validation for PCI-DSS cards, IBANs, and banking codes. | Lowers regulatory compliance barriers for early-stage fintechs and banks. |
| **SDG 9** | `9.c, 9.5` | Stateless sub-5ms edge isolate runtime; Apache-2.0 open-source release. | Delivers open Digital Public Infrastructure (DPI) without GPU/cloud lock-in. |
| **SDG 10** | `10.2, 10.3` | 185 rules across 109 countries covering ASEAN, Africa, and Latin America. | Eliminates Global South exclusion inherent in Western-centric legacy DLP tools. |
| **SDG 16** | `16.9, 16.10` | Reversible masking of sovereign IDs with cryptographic zero-retention (`purgeAfterRead`). | Protects national identity registries and defends privacy under UN Article 12. |

---

## 📜 License

Licensed under the **[Apache-2.0 License](LICENSE)**. Free, open, and transparent Digital Public Infrastructure for all developers.

---

## 🤝 Contributing & Security Disclosures

We welcome contributions, additional sovereign checksum validators, and regional pack expansions!

- **Contributing**: Please review [CONTRIBUTING.md](CONTRIBUTING.md) for code style, test requirements, and PR guidelines.
- **Reporting Vulnerabilities**: To report security issues or sensitive algorithmic bypasses, please open a private GitHub Security Advisory or contact the core maintainers directly. Do not file public issues for active vulnerabilities.
