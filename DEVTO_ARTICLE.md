Integrating enterprise AI with strict privacy compliance (GDPR, HIPAA, SOC 2, CCPA) is usually a massive engineering headache.

Stakeholders demand zero customer PII leakage to third-party model providers (OpenAI, Anthropic, Mistral, Google). But the existing solutions force an unpleasant tradeoff:

1. **Python NLP / Named Entity Recognition (e.g., Microsoft Presidio, spaCy):** Heavy containers that typically add 50ms to 300ms of compute latency per prompt and require maintaining dedicated backend server clusters.
2. **Irreversible Redaction:** Blanking out entities with `[REDACTED]`, which breaks the model’s reasoning context and makes customer-facing agent responses unusable.

We wanted to know: **Can an AI privacy layer guarantee 100.00% exact roundtrip fidelity at the edge without adding perceptible latency?**

To prove it, we built **[ProjectSPG](https://projectspg.info)**—an open, edge-native drop-in OpenAI proxy on Cloudflare Workers—and ran an exhaustive benchmark across **9,334,805 prompts** (~1.94 billion tokens) and **10,281,399 protected entities**.

Here is what we learned and how the architecture works.

---

## The Architecture: Reversible Edge Tokenization

Instead of running slow multi-gigabyte neural models in the critical request path, ProjectSPG executes deterministic tokenization and Luhn/checksum verification directly inside V8 isolates across Cloudflare’s global edge network (300+ locations):

```text
[Client App]
   │
   │ (Raw Prompt: "Refund $500 to alice@company.com")
   ▼
[ProjectSPG Edge Proxy] ── (86µs V8 Tokenizer)
   │
   │ (Reversible Mapping: alice@company.com -> EMAIL_1)
   ▼
[Upstream LLM: OpenAI / Groq / Mistral / Gemini]
   │
   │ (Prompt Processed: "Refund $500 to EMAIL_1")
   │ (Model Output: "Processed refund for EMAIL_1")
   ▼
[ProjectSPG Edge Rehydrator]
   │
   │ (Reverses EMAIL_1 -> alice@company.com in real-time stream)
   ▼
[Client App Receives: "Processed refund for alice@company.com"]
```

1. **Prompt Interception:** Intercepts the raw prompt before it leaves the edge network.
2. **High-Speed Regex & Shannon Entropy Scanning:** Detects 109-country PII, financial identifiers (IBANs, credit cards with Luhn validation), and secrets at sub-millisecond speeds.
3. **Reversible Tokenization:** Swaps entities with cryptographically scoped typed tokens (`EMAIL_1`, `CARD_1`, `SSN_1`).
4. **Streaming Rehydration:** As the upstream model streams tokens back via Server-Sent Events (SSE), the proxy dynamically restores the original values on the fly. The client receives clean, contextual output with zero model hallucinations or character drift.

---

## The Benchmark: 9.33 Million Prompts

Testing on synthetic dummy strings is never enough. Real-world prompts contain messy punctuation, code snippets, mathematical symbols, Unicode emojis, and tracking numbers. 

Our benchmark corpus combined 5 major datasets into 94 Apache Parquet row groups:
- **LMSYS Chatbot Arena:** 2.52M real multi-turn conversations with frontier LLMs.
- **OpenOrca:** 2.91M technical instructions, Python stack traces, UUIDs, and SQL statements.
- **WildChat:** 2.15M unfiltered global prompts covering edge Unicode delimiters.
- **Enron Email Corpus:** 1.02M corporate email headers, signatures, and phone numbers.
- **Customer Support Twitter:** 734K unstructured complaints with tracking numbers (FedEx, UPS).
- **Sovereign ID Synthesis:** Algorithmic test vectors across 109 jurisdictions (Aadhaar, SSN, NRIC, Codice Fiscale).

---

## The Results

Every single prompt was tokenized, rehydrated, and evaluated for strict byte-for-byte exact equality (`rehydratedText === originalPrompt`):

| Metric | Measured Value | Standard |
| :--- | :--- | :--- |
| Exact Roundtrip Fidelity | 100.00% | Zero character drift |
| Engine Execution Latency | 86 µs (median) | Sub-millisecond |
| p95 Engine Latency | 142 µs | High consistency |
| p99 Engine Latency | 218 µs | SLA stable |
| Throughput (Single Node) | 17,735 prompts/sec | V8 optimized |
| Full HTTPS Network Overhead | 13.3 ms | Global Cloudflare Edge |

---

## Wire-Compatible Drop-In: How to Test

Because it follows the OpenAI wire specification, you don't need any special SDK. Just point your `baseURL` to the proxy:

```bash
curl https://api.projectspg.info/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SPG_KEY" \
  -H "x-tokenization-mode: mask" \
  -d '{
    "model": "codestral-2508",
    "messages": [
      {
        "role": "user",
        "content": "Please send the invoice for $4,500 to sarah.connor@acme.org."
      }
    ]
  }'
```

What the upstream model actually receives:
> "Please send the invoice for $4,500 to EMAIL_1."

What your application gets back:
> "Invoice for $4,500 has been dispatched to sarah.connor@acme.org."

---

## Try It Live

You can test prompt tokenization, inspection, and rehydration directly in the web playground without signing up:

- **Live Playground:** [projectspg.info](https://projectspg.info)
- **Full Empirical Benchmark Report:** [projectspg.info/blog/benchmark](https://projectspg.info/blog/benchmark)

We would love to hear your thoughts on edge tokenization, entropy edge cases, and compliance architectures!
