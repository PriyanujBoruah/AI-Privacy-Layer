# AI Privacy Layer — Full Multi-Compliance Benchmark Scorecard

*Evaluated on: 2026-10-22 15:13:16 UTC*

| Compliance Standard | Dataset | Evaluated Records | Ground Truth Entities | Intercepted | Entity Recall | Zero-Leak Accuracy | Avg Latency | Lossless Reversibility |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **HIPAA Safe Harbor (45 CFR § 164.514)** | `outis-synthetic-phi` | 115,615 | 1,260,954 | 344,931 | **27.35%** | **7.76%** | 27.57 ms | **92.51%** |
| **HIPAA Clinical EHR Notes** | `Technetium-I` | 74,700 | 1,161,437 | 606,105 | **52.19%** | **0.0%** | 33.65 ms | **97.62%** |
| **GDPR & Global PII** | `AI4Privacy OpenPII 30k` | 29,908 | 189,660 | 47,877 | **25.24%** | **13.93%** | 22.9 ms | **99.45%** |
| **DPDP Act 2023 (Indian PII)** | `Maskara Indian PII 200k` | 249,963 | 485,300 | 229,880 | **47.37%** | **29.43%** | 22.57 ms | **99.97%** |

### Audit & Verification Note
Automated de-identification validated against 4 gold-standard public compliance corpora with zero raw PHI retention.
