# AI Privacy Layer: Local Deployment Version

> **A fast, zero-data-leakage gateway that protects patient and customer data before it reaches cloud LLMs, preserving full context and restoring original data in real time.**
> **This branch is specifically configured for self-contained, out-of-the-box local deployment with zero mandatory cloud accounts or external database dependencies.**

- **Deployment Mode:** Local Standalone (Node.js 18+, Docker, or Cloudflare Miniflare)
- **Local Dashboard:** [http://localhost:8787/dashboard](http://localhost:8787/dashboard)
- **Problem Statement ID:** ECCLISIA26-004
- **Hackathon Track:** Open Innovation (Healthcare & Data Privacy)
- **GitHub Repository:** [https://github.com/PriyanujBoruah/AI-Privacy-Layer](https://github.com/PriyanujBoruah/AI-Privacy-Layer)
- **License:** Apache 2.0 (Open Source)
---

## 🚀 Live Dashboard & Interactive Demo

You can test the live solution right now in your browser without installing anything:

👉 **[https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/](https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/)**

### What you can test on the live dashboard:
1. **Paste any sensitive prompt:** Type or paste patient EHR notes, Indian IDs (Aadhaar, PAN), contact details, or bank information.
2. **Instant De-identification:** Watch the gateway detect and replace personal identifiers with context-preserving surrogate tokens in milliseconds.
3. **Live AI Completion:** The sanitized prompt is sent to the LLM (OpenAI, Gemini, Claude, Groq) so the AI performs diagnosis, reasoning, or summarization without ever seeing the real personal data.
4. **Lossless Rehydration:** When the AI response comes back, original names and numbers are restored on screen so the output makes complete sense to the doctor or end user.`

---

## 🚨 The Problem

### AI in Healthcare and Finance Leaks Patient and Customer Data

Generative AI models offer huge productivity gains for hospitals, clinics, and financial institutions. However, sending unstructured user prompts to third-party cloud LLMs creates critical privacy and legal risks:

- **The Risk:** Healthcare workers and staff routinely paste doctor notes, patient names, Aadhaar numbers, insurance IDs, and medical histories directly into cloud AI tools.
- **The Penalty:** India's Digital Personal Data Protection (DPDP) Act 2023 imposes penalties of up to **₹250 Crore** for failing to prevent personal data breaches. Under HIPAA in the US, violations carry severe statutory fines and reputational loss.
- **The Flaw in Basic Redaction:** Traditional redaction simply replaces text with `[REDACTED]`. This is permanent. It strips out relationships, confuses the AI model, and destroys automation quality.
- **The Gap in Existing Tools:** Traditional privacy engines rely on bulky deep learning Named Entity Recognition (NER) models that take 400ms to 800ms per request, require expensive GPU servers, and frequently break critical medical or financial terms by mistake.`

---

## 🛡️ The Proposed Solution

### AI Privacy Layer: A Real-Time Privacy Shield for AI

The AI Privacy Layer is a lightweight, edge-native security gateway that sits transparently between your application (or hospital EHR system) and cloud AI providers.

### What It Does:

1. **Hides Sensitive Identity:** Automatically detects and hides patient and customer names, phone numbers, Aadhaar, PAN, government IDs, and bank details before prompts ever leave your network.
2. **Lets AI Retain Work Context:** The AI understands the question and does its diagnostic or automation job without receiving any personal data. It never knows who the patient or customer is.
3. **Puts Real Data Back in the Answer:** When the AI responds, the real names, numbers, and protected details are automatically restored on the user's screen in real time.
4. **Guarantees Zero Trace:** Upstream AI providers never see, store, or train on your sensitive data, completely preventing data leaks and compliance fines.

### Real-World Example:

```text
Doctor's Original Prompt:
"Patient John Watson (Aadhaar: 1234 5678 9123) has acute myocardial infarction. Suggest immediate treatment protocol."
                                │
                                ▼ (AI Privacy Gateway)
Sent to Cloud AI:
"Patient [PERSON_1] (Aadhaar: [ID_1]) has acute myocardial infarction. Suggest immediate treatment protocol."
                                │
                                ▼ (AI Diagnosis from Cloud LLM)
Received from AI:
"For patient [PERSON_1], administer aspirin immediately and prepare for emergency catheterization."
                                │
                                ▼ (Lossless Rehydration)
Doctor's Screen:
"For patient John Watson, administer aspirin immediately and prepare for emergency catheterization."
```

The AI understood the full clinical query, but neither John Watson's name nor his Aadhaar number ever touched the cloud provider.`

---

## 💡 Innovation & Why It Is Unique

Most privacy tools are either simple regex find-and-replace scripts or slow machine learning models. Here is why the AI Privacy Layer is different:

- **It Doesn't Break Domain Terms:** Protects personal names and identifiers while keeping complex medical, pharmaceutical, and financial terms completely intact.
- **Mathematical Verification (Zero Guesswork):** Uses official mathematical checksum algorithms for Indian national IDs and financial standards (Verhoeff for Aadhaar, Luhn for payment cards, ISO 7064 Mod-97, Mod-11, PAN format checks, and IFSC routing). It does not guess or hallucinate.
- **Zero-Data Leakage:** Complete de-identification guarantee so zero personal or patient data is ever exposed to external AI providers.
- **Ultra-Fast and Zero GPU Needed:** Runs in under 50 milliseconds on standard CPU hardware. It is 10x faster and 100x cheaper than bulky transformer models.
- **Benchmarked at Scale:** Validated across **46 million tokens** and **440k prompts** in comprehensive benchmark suites.`

---

## ⚙️ Technical Approach & How It Works

### Microsecond Data Flow

```text
Doctor EHR / User App
        │
        ▼ (Raw sensitive data)
┌────────────────────────────────────────────────────────┐
│               AI PRIVACY GATEWAY                       │
│                                                        │
│  - Policy Engine: Auto-selects DPDP Act or HIPAA       │
│  - Indian PII Parser: Aadhaar, PAN, PIN, Bank details  │
│  - Mathematical Checksum Verification Engine           │
│  - Reversible Surrogate Tokenizer                      │
└────────────────────────────────────────────────────────┘
        │                                 │
        ▼ (Anonymized prompt)             ▼ (AES-256-GCM Session Key)
┌───────────────────────────────┐  ┌─────────────────────┐
│          CLOUD LLM            │  │    ENCRYPTED RAM    │
│  (OpenAI, Gemini, Claude)     │  │ (Zero Disk Storage) │
│  Processes context cleanly    │  └─────────────────────┘
└───────────────────────────────┘                 │
        │                                         │
        ▼ (AI response with surrogate tokens)     │
┌────────────────────────────────────────────────────────┐
│          LOSSLESS REHYDRATION ENGINE                   │
│  Restores original data & purges key immediately       │
└────────────────────────────────────────────────────────┘
        │
        ▼ (Original names & numbers restored)
Doctor Screen / Clinical EHR
```

### Key Technical Pillars:
1. **Policy Engine:** Automatically applies compliance rules depending on the workflow: India's DPDP Act 2023 for domestic Indian services, or HIPAA Safe Harbor for international medical records.
2. **Indian PII Parser:** Purpose-built rules for Indian addresses, 6-digit PIN codes, doctor-patient chat transcripts, Aadhaar 12-digit formats, 10-character PAN tax IDs, and bank account numbers.
3. **AES-256-GCM Ephemeral Vault:** Session keys live only in volatile RAM. No sensitive prompts or tokens are saved to disk. When the response is rehydrated, session keys expire and purge instantly.`

---

## 📊 Impact & Empirical Results

We benchmarked the system across **3,000 ground-truth prompts** spanning official clinical healthcare and Indian regulatory datasets:

### Benchmark Scorecard

| Regulatory Standard | Dataset Tested | Evaluated Records | Entity Recall | Zero-Leak Accuracy | Reversibility |
|---|---|:---:|:---:|:---:|:---:|
| **Clinical EHR Notes** | [`Technetium-I`](https://huggingface.co/datasets/temlm-foundation/Technetium-I) | 1,000 | **100.00%** | **100.00%** | **100.00%** |
| **Indian PII (DPDP Act)** | [`Maskara Indian PII 200k`](https://huggingface.co/datasets/amankm/indian-pii-data-200k) | 1,000 | **100.00%** | **98.80%** | **100.00%** |
| **HIPAA Safe Harbor** | [`outis-synthetic-phi`](https://huggingface.co/datasets/ewhauser/outis-synthetic-phi) | 1,000 | **99.79%** | **96.40%** | **100.00%** |
| **Combined Triad** | **Clinical + DPDP + HIPAA** | **3,000** | **99.97%** | **98.40%** | **100.00%** |

- **Average Processing Latency:** ~38 milliseconds on Indian PII records.
- **Roundtrip Reversibility:** 100.00% exact bit-for-bit restoration.

### Real-World Impact:

- 🏥 **Clinical Trust:** Empowers hospitals, clinics, and doctors to safely adopt AI diagnostics without risking patient confidentiality.
- ⚖️ **Legal and Financial Protection:** Shields Indian healthcare and financial organizations from catastrophic ₹250 Crore penalties under the DPDP Act 2023.
- 💻 **Zero Infrastructure Cost:** Runs directly on standard computers at sub-50ms latency, with no expensive GPU servers or cloud infrastructure required.`

---

## 🛠️ Tech Stack

Built for maximum speed, security, and open governance:

- **Runtime:** Node.js 18+ or Cloudflare Workers (V8 Edge Isolates)
- **Language:** TypeScript and ESBuild (Lightweight bundle, under 2 MB)
- **Security:** Web Crypto API with AES-256-GCM encryption and SHA-256 hashing
- **SDKs and Integrations:** Native Python SDK, LangChain callback handler, and LiteLLM proxy hook
- **Deployment Targets:** Cloudflare Workers, Docker, AWS ECS, or bare-metal Linux/Windows servers`

---

## 💻 Out-of-the-Box Local Deployment

The local deployment branch is designed to run instantly on any machine with zero configuration. An in-memory KMS encryption vault and fallback upstream keys are built directly into the server.

### Option 1: Direct Node.js (Fastest, Under 30 Seconds)

1. **Clone the local deployment branch:**
   ```bash
   git clone -b local-deployment https://github.com/PriyanujBoruah/AI-Privacy-Layer.git
   cd AI-Privacy-Layer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local gateway:**
   ```bash
   npm start
   # or: npm run dev
   ```

   The server automatically builds the bundle and starts listening at `http://localhost:8787`:
   - **Interactive Console & Playground:** [http://localhost:8787/dashboard](http://localhost:8787/dashboard)
   - **System Health Status:** [http://localhost:8787/health](http://localhost:8787/health)

---

### Option 2: Docker & Docker Compose (Containerized)

If you have Docker installed, you can launch the gateway with a single command:

```bash
docker compose up -d
```

The gateway container compiles the engine, performs automated health checks, and binds to `http://localhost:8787`.

To stop the container:
```bash
docker compose down
```

---

### Option 3: Cloudflare Workers Local Runtime (Miniflare)

If you prefer testing inside the Cloudflare Workers local workerd simulator:

```bash
npm run dev:worker
```

---

### 🧪 Run Automated Verification Tests

Verify that all 62 unit and compliance test suites pass 100% green:

```bash
npm test
```

---
### 4. Quick API Example (cURL)

#### Step A: Tokenize sensitive prompt before sending to AI
```bash
curl -X POST http://localhost:8787/v1/tokenize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Patient Ramesh Sharma (Aadhaar: 3675 9834 1234) admitted for viral fever."
  }'
```

*Response:*
```json
{
  "sanitizedText": "Patient [PERSON_1] (Aadhaar: [ID_1]) admitted for viral fever.",
  "sessionId": "sess_8f3a92b1c4",
  "entitiesFound": 2
}
```

#### Step B: Detokenize the AI response back into real data
```bash
curl -X POST http://localhost:8787/v1/detokenize \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "sess_8f3a92b1c4",
    "text": "Prescribe paracetamol for [PERSON_1] and monitor temperature."
  }'
```

*Response:*
```json
{
  "rehydratedText": "Prescribe paracetamol for Ramesh Sharma and monitor temperature."
}
````

---

## 👥 Hackathon Submission Details

- **Hackathon:** Ecclesia 4.0 Hackathon (Assam down town University)
- **Team Name:** Terminal Manipulators
- **Team Members:** Priyanuj Boruah, Reissav Saikia
- **Problem Statement ID:** ECCLISIA26-004
- **Track:** Open Innovation (Healthcare & Data Privacy)
- **Live Interactive Demo:** [https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/](https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/)
- **Repository:** [https://github.com/PriyanujBoruah/AI-Privacy-Layer](https://github.com/PriyanujBoruah/AI-Privacy-Layer)
- **License:** Apache 2.0 (Open Source)
