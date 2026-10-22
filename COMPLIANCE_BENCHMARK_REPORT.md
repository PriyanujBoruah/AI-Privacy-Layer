# AI Privacy Layer — Full Multi-Compliance Benchmark Scorecard

*Evaluated on: 2026-10-22 20:49:11 UTC*

| Compliance Standard | Dataset | Evaluated Records | Ground Truth Entities | Intercepted | Entity Recall | Zero-Leak Accuracy | Avg Latency | Lossless Reversibility |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **HIPAA Safe Harbor (45 CFR § 164.514)** | `outis-synthetic-phi` | 1,000 | 3,878 | 3,870 | **99.79%** | **96.4%** | 103.87 ms | **100.0%** |
| **HIPAA Clinical EHR Notes** | `Technetium-I` | 1,000 | 15,573 | 15,573 | **100.0%** | **100.0%** | 130.54 ms | **100.0%** |
| **GDPR & Global PII** | `AI4Privacy OpenPII 30k` | 1,000 | 6,107 | 4,909 | **80.38%** | **50.2%** | 84.84 ms | **100.0%** |
| **DPDP Act 2023 (Indian PII)** | `Maskara Indian PII 200k` | 1,000 | 1,919 | 1,673 | **87.18%** | **68.4%** | 28.02 ms | **100.0%** |

### Audit & Verification Note
Automated de-identification validated against 4 gold-standard public compliance corpora with zero raw PHI retention.
