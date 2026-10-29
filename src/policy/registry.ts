import { CompliancePolicyId, PolicyDefinition } from "./types";

/**
 * Standard Regulatory Compliance Policies
 */
export const COMPLIANCE_POLICIES: Record<CompliancePolicyId, PolicyDefinition> = {
  DPDP_INDIA: {
    id: "DPDP_INDIA",
    name: "Digital Personal Data Protection Act (India)",
    description: "Enforces de-identification for Indian Aadhaar, PAN, voter IDs, bank accounts, and addresses.",
    regulatoryFramework: "DPDP Act 2023",
    jurisdictions: ["IN"],
    categories: ["asia_non_sea", "global"],
  },
  HIPAA_DEID: {
    id: "HIPAA_DEID",
    name: "HIPAA Safe Harbor De-identification",
    description: "Neutralizes 18 statutory personal health identifiers, medical notes, patient names, and dates.",
    regulatoryFramework: "HIPAA 45 CFR § 164.514(b)",
    jurisdictions: ["US"],
    categories: ["north_america", "global"],
  },
  GDPR_GLOBAL: {
    id: "GDPR_GLOBAL",
    name: "General Data Protection Regulation (Global Suite)",
    description: "Comprehensive protection across EU, UK, Asian, and global identification standards.",
    regulatoryFramework: "GDPR EU 2016/679",
    jurisdictions: ["EU", "GB", "CH", "GLOBAL"],
    categories: [
      "european_union",
      "europe_non_eu",
      "global",
      "north_america",
      "asia_non_sea",
      "south_east_asia",
      "south_america",
      "africa",
      "oceania",
      "corporate",
    ],
  },
  ALL: {
    id: "ALL",
    name: "Universal Sovereign & Financial Registry",
    description: "Evaluates all 109 sovereign national IDs, payment cards, cryptokeys, and telecoms.",
    regulatoryFramework: "Universal Coverage",
    jurisdictions: ["GLOBAL"],
    categories: ["all"],
  },
  CUSTOM: {
    id: "CUSTOM",
    name: "Enterprise Custom Policy",
    description: "User-defined entity classes and proprietary keyword masking rules.",
    regulatoryFramework: "Enterprise BYOP (Bring Your Own Policy)",
    jurisdictions: ["CUSTOM"],
    categories: ["all"],
  },
};
