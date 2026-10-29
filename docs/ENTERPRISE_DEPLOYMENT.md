# 🏢 Enterprise Deployment & Compliance Architecture Guide

> **Production Deployment Guide for Zero-Trust Private VPCs, Air-Gapped Environments, and On-Premise Kubernetes.**

---

## 📌 Executive Overview

**AI Privacy Core** is built from the ground up for high-security environments—including global investment banks, defense contractors, healthcare networks, and multinational enterprises.

When deploying Generative AI at enterprise scale, organizations face strict regulatory firewalls:
- **GDPR Article 9 & 83 (EU)**: Special category data and citizen identifiers cannot be transferred to third-party US cloud providers in plaintext.
- **DPDP Act (India)**: Citizen Aadhaar and sovereign records are subject to strict residency and handling penalties.
- **HIPAA (US)**: Safe Harbor de-identification is required before medical prompts touch external LLMs.

By hosting **AI Privacy Core inside your private VPC perimeter**, your organization neutralizes sensitive data at the network edge **before packets ever leave your sovereign boundary**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENTERPRISE PRIVATE VPC PERIMETER                      │
│                                                                             │
│  ┌───────────────────────┐          ┌────────────────────────────────────┐  │
│  │ Internal Applications │          │ Internal Load Balancer (ALB)       │  │
│  │ (RAG, Chatbots, Code) │ ───────> │ Port 80 / 443                      │  │
│  └───────────────────────┘          └─────────────────┬──────────────────┘  │
│                                                       │                     │
│                                                       ▼                     │
│                                     ┌────────────────────────────────────┐  │
│                                     │ AI Privacy Core (ECS / Kubernetes) │  │
│                                     │ • Read-Only Root Filesystem        │  │
│                                     │ • Non-Root User (node:node)        │  │
│                                     │ • Ephemeral RAM (Zero Persistence) │  │
│                                     │ • 86 µs Algorithmic Neutralization │  │
│                                     └─────────────────┬──────────────────┘  │
└───────────────────────────────────────────────────────┼─────────────────────┘
                                                        │
                                                        │ Egress: Port 443 Only
                                                        │ (Sanitized Prompts Only)
                                                        ▼
                                      ┌────────────────────────────────────┐
                                      │ Frontier AI Providers              │
                                      │ OpenAI / Google Gemini / Azure     │
                                      └────────────────────────────────────┘
```

---

## 🔒 Enterprise Security Hardening

### 1. Zero Data Retention (ZDR) Memory-Only Architecture
- **Zero Disk Writes**: All token session mappings are stored strictly in volatile RAM. 
- **Ephemeral Lifecycles**: Session mappings automatically expire after TTL (default 300s) or are destroyed immediately upon response (`purgeAfterRead: true`).
- **No Third-Party Telemetry**: AI Privacy Core contains **zero external tracking, analytics, or phone-home requests**.

### 2. CIS Docker & Kubernetes Security Controls
The production container enforces the following security specifications:
- **Non-Root Execution**: Runs as unprivileged user `node` (UID: 1000, GID: 1000).
- **Read-Only Root Filesystem**: `readOnlyRootFilesystem: true` prevents runtime file tampering or malware persistence.
- **Dropped Capabilities**: `cap_drop: ["ALL"]` strips all Linux kernel capabilities.
- **Privilege Escalation Disabled**: `allowPrivilegeEscalation: false` blocks setuid privilege escalations.

---

## 📊 Capacity Planning & Sizing Guidelines

Based on empirical benchmarks processed on 9.33M prompts (~1.94 billion tokens):

| Workload Tier | Concurrent RPS | CPU (vCPU) | RAM (MB) | Replicas | Expected Median Latency ($p_{50}$) |
|---|---|---|---|---|---|
| **Departmental / Pilot** | Up to 1,000 req/s | 0.25 vCPU | 256 MiB | 2 | `< 100 µs` engine latency |
| **Enterprise Production** | 1,000 – 5,000 req/s | 0.50 vCPU | 512 MiB | 3–5 | `< 100 µs` engine latency |
| **Global High-Throughput** | 5,000 – 25,000 req/s | 1.00 vCPU | 1,024 MiB | 5–10 | `< 100 µs` engine latency |

---

## 🚀 Deployment Methods

### Method 1: Kubernetes Deployment via Helm (Recommended)

The Helm chart is located at `charts/ai-privacy-core/`.

#### 1. Add and inspect the chart
```bash
cd charts/ai-privacy-core
helm lint .
```

#### 2. Install the chart into your namespace
```bash
kubectl create namespace ai-security

# Deploy with production autoscaling and non-root security context
helm install ai-privacy-core ./charts/ai-privacy-core \
  --namespace ai-security \
  --set replicaCount=3 \
  --set autoscaling.enabled=true \
  --set autoscaling.minReplicas=3 \
  --set autoscaling.maxReplicas=15
```

#### 3. Verify deployment status
```bash
kubectl get pods -n ai-security
kubectl get svc -n ai-security
```

---

### Method 2: 1-Click AWS Private VPC Deployment (Terraform)

Deploy directly into your AWS account behind an internal Application Load Balancer using the provided Terraform module in `deploy/terraform/aws-ecs/`.

#### 1. Configure variables
Create a `terraform.tfvars` file:
```hcl
aws_region         = "us-east-1"
environment        = "production"
vpc_id             = "vpc-0123456789abcdef0"
private_subnet_ids = [
  "subnet-0123456789abcdef1",
  "subnet-0123456789abcdef2"
]
container_image    = "ghcr.io/priyanujboruah/ai-privacy-core:latest"
container_cpu      = 512
container_memory   = 1024
desired_count      = 3
```

#### 2. Deploy infrastructure
```bash
cd deploy/terraform/aws-ecs
terraform init
terraform plan
terraform apply
```

#### 3. Connect your applications
Terraform outputs the internal DNS name:
```bash
Outputs:
internal_alb_dns = "ai-privacy-alb-production-123456.us-east-1.elb.amazonaws.com"
```

Configure your internal client SDKs to use this endpoint:
```python
client = OpenAI(base_url="http://ai-privacy-alb-production-123456.us-east-1.elb.amazonaws.com/v1")
```

---

### Method 3: Docker & Docker Compose (On-Prem / Edge Nodes)

Run directly on any bare-metal Linux server or virtual machine:

```bash
# Start in background with auto-restart
docker compose up -d

# Verify health status
curl http://localhost:8787/health
```

---

## 🛡️ Regulatory Compliance Mapping

| Standard | Requirement | AI Privacy Core Implementation |
|---|---|---|
| **GDPR Art. 9** | Special category biometric, health, and national identifiers protection | Deterministic algorithmic checksum tokenization of sovereign citizen IDs across 109 jurisdictions. |
| **GDPR Art. 17** | Right to erasure (Right to be Forgotten) | Zero Data Retention (ZDR) with immediate cryptographic purge via `purgeAfterRead: true`. |
| **HIPAA Safe Harbor** | Removal of 18 categories of Protected Health Information (PHI) | Tokenization of names, dates, phone numbers, emails, SSNs, medical record IDs, and account numbers. |
| **India DPDP 2023** | Protection of digital personal data and Aadhaar numbers | Verhoeff checksum validation for Aadhaar (`RULE_IN_AADHAAR`) and PAN cards before cross-border transfer. |
| **SOC 2 Type II** | Confidentiality and Least Privilege access | Non-root container execution, read-only rootfs, and zero external tracking. |
