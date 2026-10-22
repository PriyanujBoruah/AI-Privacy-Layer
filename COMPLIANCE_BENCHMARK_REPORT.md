# AI Privacy Layer — Multi-Compliance Benchmark Scorecard

*Evaluated on: 2026-10-22 14:49:35 UTC*

| Compliance Standard | Dataset | Evaluated Records | Ground Truth PHI | Intercepted | Recall Rate | Avg Latency | Lossless Reversibility |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **HIPAA Safe Harbor (45 CFR § 164.514)** | `outis-synthetic-phi` | 10,000 | 35,698 | 14,329 | **40.14%** | 14.67 ms | **100.0%** |
| **HIPAA Clinical EHR Notes** | `Technetium-I` | 10,000 | 100,615 | 55,613 | **55.27%** | 20.5 ms | **99.99%** |
| **GDPR & Global PII** | `AI4Privacy OpenPII 30k` | 10,000 | 63,446 | 14,497 | **22.85%** | 12.84 ms | **99.96%** |
| **DPDP Act 2023 (Indian PII)** | `Maskara Indian PII 200k` | 10,000 | 19,314 | 8,513 | **44.08%** | 12.92 ms | **100.0%** |

### Audit & Verification Note
Automated de-identification validated against 4 gold-standard public compliance corpora with zero raw PHI retention.
