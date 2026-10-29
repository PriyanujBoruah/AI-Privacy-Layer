/**
 * Compliance Policy Engine Types & Definitions
 * AI Privacy Layer - Regulatory Enforcement Module
 */

export type CompliancePolicyId =
  | "DPDP_INDIA"
  | "HIPAA_DEID"
  | "GDPR_GLOBAL"
  | "ALL"
  | "CUSTOM";

export interface PolicyDefinition {
  id: CompliancePolicyId;
  name: string;
  description: string;
  regulatoryFramework: string;
  jurisdictions: string[];
  categories: string[];
}

export interface PolicyResolutionOptions {
  bodyPolicy?: string;
  headerPolicy?: string;
  bodyCategories?: string[];
  headerCategories?: string;
}
