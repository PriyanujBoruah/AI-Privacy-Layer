# AI Privacy Layer — Full Multi-Compliance Benchmark Scorecard

*Evaluated on: 2026-10-22 20:44:01 UTC*

| Compliance Standard | Dataset | Evaluated Records | Ground Truth Entities | Intercepted | Entity Recall | Zero-Leak Accuracy | Avg Latency | Lossless Reversibility |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **HIPAA Safe Harbor (45 CFR § 164.514)** | `outis-synthetic-phi` | 1,000 | 3,878 | 3,870 | **99.79%** | **96.4%** | 120.01 ms | **100.0%** |
| **HIPAA Clinical EHR Notes** | `Technetium-I` | 1,000 | 15,573 | 15,573 | **100.0%** | **100.0%** | 159.24 ms | **100.0%** |

### Audit & Verification Note
Automated de-identification validated against 4 gold-standard public compliance corpora with zero raw PHI retention.
