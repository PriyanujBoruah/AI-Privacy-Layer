import { CompliancePolicyId, PolicyDefinition, PolicyResolutionOptions } from "./types";
import { COMPLIANCE_POLICIES } from "./registry";

/**
 * Resolves a compliance policy definition by name or identifier.
 */
export function resolvePolicy(policyName?: string): PolicyDefinition | undefined {
  if (!policyName || typeof policyName !== "string") {
    return undefined;
  }

  const normalized = policyName.trim().toUpperCase() as CompliancePolicyId;
  return COMPLIANCE_POLICIES[normalized] || undefined;
}

/**
 * Returns a list of all actively supported compliance policies.
 */
export function listSupportedPolicies(): PolicyDefinition[] {
  return Object.values(COMPLIANCE_POLICIES);
}

/**
 * Parses raw category strings from HTTP headers or JSON arrays.
 */
function parseCategoryHeader(headerVal?: string): string[] {
  if (!headerVal) return [];

  try {
    const trimmed = headerVal.trim();
    if (trimmed.startsWith("[")) {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : [];
    }
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Resolves the final target category array by evaluating:
 * 1. Direct explicit categories in request body.
 * 2. Explicit regulatory policy in request body.
 * 3. Regulatory policy in HTTP request header (x-compliance-policy).
 * 4. Custom categories in HTTP request headers (x-detection-categories / x-categories).
 * 5. Default fallback ("all").
 */
export function resolvePolicyCategories(options: PolicyResolutionOptions): string[] {
  // 1. Explicit body categories take precedence
  if (Array.isArray(options.bodyCategories) && options.bodyCategories.length > 0) {
    return options.bodyCategories;
  }

  // 2. Explicit policy specified in request body
  if (options.bodyPolicy && typeof options.bodyPolicy === "string") {
    const matchedPolicy = resolvePolicy(options.bodyPolicy);
    if (matchedPolicy) {
      return [...matchedPolicy.categories];
    }
  }

  // 3. Policy specified in request header
  if (options.headerPolicy && typeof options.headerPolicy === "string") {
    const matchedPolicy = resolvePolicy(options.headerPolicy);
    if (matchedPolicy) {
      return [...matchedPolicy.categories];
    }
  }

  // 4. Custom categories specified in request header
  if (options.headerCategories) {
    const headerCategories = parseCategoryHeader(options.headerCategories);
    if (headerCategories.length > 0) {
      return headerCategories;
    }
  }

  // 5. Default universal coverage
  return ["all"];
}
