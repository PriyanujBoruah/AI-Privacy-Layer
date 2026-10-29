import { describe, it, expect } from "vitest";
import {
  resolvePolicy,
  listSupportedPolicies,
  resolvePolicyCategories,
  COMPLIANCE_POLICIES,
} from "./index";

describe("Compliance Policy Engine Module", () => {
  it("should list all supported regulatory policies", () => {
    const policies = listSupportedPolicies();
    expect(policies.length).toBeGreaterThanOrEqual(4);
    const ids = policies.map((p) => p.id);
    expect(ids).toContain("DPDP_INDIA");
    expect(ids).toContain("HIPAA_DEID");
    expect(ids).toContain("GDPR_GLOBAL");
  });

  it("should resolve known policy definitions case-insensitively", () => {
    const dpdp = resolvePolicy("dpdp_india");
    expect(dpdp).toBeDefined();
    expect(dpdp?.regulatoryFramework).toBe("DPDP Act 2023");
    expect(dpdp?.categories).toEqual(["asia_non_sea", "global"]);

    const hipaa = resolvePolicy("HIPAA_DEID");
    expect(hipaa).toBeDefined();
    expect(hipaa?.jurisdictions).toContain("US");
    expect(hipaa?.categories).toEqual(["north_america", "global"]);

    const unknown = resolvePolicy("INVALID_POLICY_NAME");
    expect(unknown).toBeUndefined();
  });

  it("should prioritize explicit body categories over policy definitions", () => {
    const categories = resolvePolicyCategories({
      bodyCategories: ["custom_scope"],
      bodyPolicy: "DPDP_INDIA",
    });
    expect(categories).toEqual(["custom_scope"]);
  });

  it("should resolve categories from body policy when specified", () => {
    const categories = resolvePolicyCategories({
      bodyPolicy: "DPDP_INDIA",
    });
    expect(categories).toEqual(["asia_non_sea", "global"]);
  });

  it("should resolve categories from header policy when body policy is absent", () => {
    const categories = resolvePolicyCategories({
      headerPolicy: "HIPAA_DEID",
    });
    expect(categories).toEqual(["north_america", "global"]);
  });

  it("should parse categories from header string (comma separated or JSON)", () => {
    const commaParsed = resolvePolicyCategories({
      headerCategories: "global, north_america",
    });
    expect(commaParsed).toEqual(["global", "north_america"]);

    const jsonParsed = resolvePolicyCategories({
      headerCategories: '["european_union", "corporate"]',
    });
    expect(jsonParsed).toEqual(["european_union", "corporate"]);
  });

  it("should fallback to 'all' when no policy or categories are provided", () => {
    const fallback = resolvePolicyCategories({});
    expect(fallback).toEqual(["all"]);
  });
});
