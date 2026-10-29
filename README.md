# AI Privacy Layer: A Real-Time Privacy Shield for AI

> **A real-time privacy gateway designed to prevent patient and customer data leaks to cloud LLMs, preserving full context and restoring original data dynamically.**

- **Hackathon:** Ecclesia 4.0 Hackathon (Assam down town University)
- **Team Name:** Terminal Manipulators
- **Team Members:** Priyanuj Boruah, Reissav Saikia
- **Hackathon Track:** Open Innovation (Healthcare & Data Privacy)
- **Problem Statement ID:** ECCLISIA26-004
- **Branch Milestone:** Phase 1 (Selection Round Submission)
- **Project Status:** Functional Frontend Completed | Prototype Backend & Placeholder API (< 50% Development Milestone)
- **GitHub Repository:** [https://github.com/PriyanujBoruah/AI-Privacy-Layer](https://github.com/PriyanujBoruah/AI-Privacy-Layer)
- **License:** Apache 2.0 (Open Source)

---

## 📌 Phase 1 Submission Milestone (Selection Round)

In accordance with hackathon rules restricting pre-development to under 50% before Phase 2 begins, the **Phase 1 (Selection)** milestone includes:

1. **Functional Frontend (Completed):**
   - The interactive web dashboard and presentation interface is fully completed and operational.
   - Evaluators can test live interactive flows directly in the browser: [https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/](https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/)
   - Demonstrates the complete visual flow: user input, token substitution, AI response handling, and live rehydration.

2. **Prototype Backend (Semi-Working with Errors):**
   - Initial prototype backend structure and routing logic created.
   - Contains preliminary regex detection rules, but still exhibits unhandled edge cases, parsing errors, and incomplete context lookbehinds that need full resolution.

3. **API System (Placeholder Stubs):**
   - The current API endpoints (`/v1/tokenize`, `/v1/detokenize`, and `/v1/chat/completions`) operate with basic structural placeholders and preliminary mock logic.
   - The high-performance core engine, advanced mathematical checksum verification algorithms, and production-grade ephemeral vaults will be engineered from the ground up during the **Phase 2 Development Round**.

---

## 🚀 Live Dashboard & Interactive Demo

You can inspect and test the Phase 1 completed frontend right now:

👉 **[https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/](https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/)**

### What you can test on the live dashboard:
1. **Interactive Prompt Testing:** Type or select sample patient EHR notes, Indian IDs (Aadhaar, PAN), contact details, or bank information.
2. **De-identification Preview:** See how sensitive personal data is mapped to context-preserving surrogate tokens.
3. **Live AI Output:** Watch the sanitized text get sent to the AI model so it diagnoses without receiving private data.
4. **Rehydration Display:** Review how the original patient names and numbers are restored on screen for the final answer.

---

## 🚨 The Problem

### AI in Healthcare and Finance Leaks Patient and Customer Data

Generative AI adoption in healthcare and finance is growing rapidly, but sending unstructured data to third-party cloud LLMs creates critical risks:

- **The Risk:** Doctors and staff frequently paste patient names, Aadhaar numbers, clinical notes, and medical records into cloud AI tools.
- **The Penalty:** India's Digital Personal Data Protection (DPDP) Act 2023 mandates fines of up to **₹250 Crore** for personal data breaches. HIPAA enforces strict civil penalties for health information leakage.
- **The Flaw in Basic Redaction:** Traditional permanent redaction (`[REDACTED]`) breaks AI comprehension and ruins automated workflow quality.
- **The Gap in Current Tools:** Heavy machine learning models (NER) take over 400ms per call, require costly GPU infrastructure, and regularly mangle critical medical or financial terms.

---

## 🛡️ The Proposed Solution

### AI Privacy Layer: A Real-Time Privacy Shield for AI

A lightweight security gateway that intercepts prompts before they leave the hospital or corporate network, anonymizes identity, and restores real values when the AI returns its answer.

### Core Architecture Capabilities:

1. **Hides Sensitive Identity:** Detects and masks patient names, phone numbers, Aadhaar, PAN, and banking details before reaching cloud AI.
2. **Lets AI Retain Work Context:** Replaces real details with semantic surrogate tokens (`[PERSON_1]`, `[ID_1]`), enabling the AI to diagnose without ever knowing the patient's identity.
3. **Puts Real Data Back in the Answer:** Restores real patient names and numbers dynamically on the doctor's screen in real time.
4. **Guarantees Zero Trace:** Third-party AI providers never see, store, or train on private data, avoiding compliance violations and legal penalties.

### Workflow Example:

```text
Original Doctor Prompt:
"Patient John Watson (Aadhaar: 1234 5678 9123) has acute myocardial infarction. Suggest treatment."
                                │
                                ▼ (AI Privacy Gateway)
Sent to Cloud AI:
"Patient [PERSON_1] (Aadhaar: [ID_1]) has acute myocardial infarction. Suggest treatment."
                                │
                                ▼ (Cloud AI Diagnosis)
Received from AI:
"For patient [PERSON_1], administer aspirin immediately and prepare catheterization."
                                │
                                ▼ (Lossless Rehydration)
Doctor's Screen:
"For patient John Watson, administer aspirin immediately and prepare catheterization."
```

---

## 💡 Innovation & Why It Is Unique

- **Doesn't Break Domain Terms:** Keeps complex medical, clinical, and financial terms intact while safely masking sensitive identifiers.
- **Mathematical Verification (Zero Guesswork):** Uses verified mathematical formulas for Indian and international IDs (Verhoeff for Aadhaar, Luhn for cards, ISO 7064, PAN format validation) rather than hallucinating machine learning models.
- **Zero-Data Leakage:** Strict de-identification design so zero sensitive data is exposed to external AI providers.
- **Ultra-Fast and Zero GPU Needed:** Designed to run in under 50ms on standard hospital CPUs, making it 10x faster and 100x cheaper than bulky deep learning models.

---

## ⚙️ Technical Approach (How It Works)

```text
Doctor EHR / User Input
        │
        ▼ (Sensitive Data)
┌────────────────────────────────────────────────────────┐
│               AI PRIVACY GATEWAY                       │
│                                                        │
│  - Policy Engine: DPDP Act (India) or HIPAA (Medical)  │
│  - Indian PII Parser: Aadhaar, PAN, PIN, Bank details  │
│  - Checksum Verification Engine (Verhoeff, Luhn)       │
│  - Reversible Token Substitution                       │
└────────────────────────────────────────────────────────┘
        │                                 │
        ▼ (Anonymized Prompt)             ▼ (Ephemeral Key)
┌───────────────────────────────┐  ┌─────────────────────┐
│          CLOUD LLM            │  │    ENCRYPTED RAM    │
│   (OpenAI / Gemini / Mistral) │  │ (Zero Disk Storage) │
│   Processes context cleanly   │  └─────────────────────┘
└───────────────────────────────┘                 │
        │                                         │
        ▼ (Response with tokens)                  │
┌────────────────────────────────────────────────────────┐
│          LOSSLESS REHYDRATION ENGINE                   │
│  Restores original data & purges key immediately       │
└────────────────────────────────────────────────────────┘
        │
        ▼ (Real names & data restored)
Doctor Screen / Clinical Output
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+ / Cloudflare Workers (V8 Edge Isolates)
- **Language:** TypeScript & ESBuild (Lightweight bundle, under 2 MB)
- **Security:** Web Crypto API (AES-256-GCM, SHA-256)
- **Integrations:** Native Python SDK, LangChain, LiteLLM
- **Status:** Verified Working Frontend Prototype (Backend Core Engine scheduled for Phase 2)

---

## 🎯 Phase 2 Development Roadmap (Upcoming)

During the Phase 2 development round, our team will build out the core engine to replace the Phase 1 prototype and placeholder APIs:

1. **Engine Core Implementation:** Complete the deterministic, high-throughput de-identification engine to handle continuous streams and multi-turn conversations.
2. **Checksum and Validation Hardening:** Finalize mathematical checksum algorithms across all Indian national IDs (Aadhaar, PAN, Voter ID, Passport, IFSC) to eliminate false positives.
3. **Multi-Compliance Guardrails:** Deepen automated policy enforcement for both India's DPDP Act 2023 and HIPAA Safe Harbor.
4. **Latency and Performance Optimization:** Tune parallel multi-core execution to achieve sub-50ms latency across large prompt batches without GPU dependencies.
5. **Lossless Detokenization Verification:** Conduct full empirical benchmarks to verify 100% roundtrip reversibility.

---

## 👥 Hackathon Submission Information

- **Hackathon:** Ecclesia 4.0 Hackathon (Assam down town University)
- **Team Name:** Terminal Manipulators
- **Team Members:** Priyanuj Boruah, Reissav Saikia
- **Problem Statement ID:** ECCLISIA26-004
- **Track:** Open Innovation (Healthcare & Data Privacy)
- **Live Demo URL:** [https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/](https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/)
- **Repository:** [https://github.com/PriyanujBoruah/AI-Privacy-Layer](https://github.com/PriyanujBoruah/AI-Privacy-Layer)
- **License:** Apache 2.0 (Open Source)
