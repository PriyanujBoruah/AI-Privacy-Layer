import { resolveActiveRules, Rule } from "./patterns";
import { generateFPEToken } from "./fpe";

export interface DetectedEntity {
  type: string;
  token: string;
}

export interface TokenizeOptions {
  customKeywords?: string[];
  mode?: "structural" | "fpe";
  categories?: string[];
}

export interface TokenizeResult {
  mode: "structural" | "fpe";
  sanitizedText: string;
  tokenMap: Record<string, string>;
  count: number;
  entitiesDetected: DetectedEntity[];
  categoriesApplied?: string[];
}

export interface MatchSpan {
  start: number;
  end: number;
  ruleId: string;
  tokenPrefix: string;
  targetValue: string;
  priority: number;
}

/**
 * Normalizes input text options
 */
function resolveOptions(options?: TokenizeOptions | string[]): {
  customKeywords: string[];
  mode: "structural" | "fpe";
  categories?: string[];
} {
  if (Array.isArray(options)) {
    return { customKeywords: options, mode: "structural" };
  }
  return {
    customKeywords: options?.customKeywords || [],
    mode: options?.mode || "structural",
    categories: options?.categories,
  };
}

/**
 * Main Data De-identification & Anonymization Pipeline
 */
export function tokenize(
  text: string,
  options?: TokenizeOptions | string[]
): TokenizeResult {
  const { customKeywords, mode, categories } = resolveOptions(options);

  if (!text || typeof text !== "string") {
    return {
      mode,
      sanitizedText: "",
      tokenMap: {},
      count: 0,
      entitiesDetected: [],
      categoriesApplied: ["global"],
    };
  }

  // Resolve active rules scoped to requested categories (Supports arbitrary packs or 'all')
  const { rules: activeRules, resolvedPacks, error } = resolveActiveRules(categories);
  if (error) {
    throw new Error(error);
  }

  const rawSpans: MatchSpan[] = [];

  // =========================================================================
  // STEP 1: SCAN ACTIVE DETECTION RULES
  // =========================================================================

  for (const rule of activeRules) {
    rule.pattern.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = rule.pattern.exec(text)) !== null) {
      const fullMatchedText = match[0];
      let targetValue = fullMatchedText;
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          targetValue = match[i];
          break;
        }
      }

      // Calculate exact start/end indices for extracted capture group
      let start = match.index;
      if (targetValue !== fullMatchedText) {
        start = match.index + fullMatchedText.indexOf(targetValue);
      }
      // Cleanly trim leading/trailing whitespace from targetValue
      const trimmedValue = targetValue.trim();
      if (trimmedValue.length > 0 && trimmedValue !== targetValue) {
        start = start + targetValue.indexOf(trimmedValue);
        targetValue = trimmedValue;
      }
      const end = start + targetValue.length;

      // Validate checksum/format if validator attached
      if (rule.validator && !rule.validator(targetValue)) {
        continue;
      }

      // Assign priority score based on rule tier
      let priority = 10; // Default Tier 1
      if (rule.priority !== undefined) {
        priority = rule.priority;
      } else if (rule.id.startsWith("RULE_EMAIL") || rule.id.startsWith("RULE_CREDIT_CARD") || rule.id.startsWith("RULE_PHONE") || rule.id.startsWith("RULE_DEV_KEYS")) {
        priority = 20; // High-confidence structured formats
      } else if (rule.id.startsWith("RULE_CONTEXT_NAME") || rule.id.startsWith("RULE_NAME") || rule.id.startsWith("RULE_INVOICE")) {
        priority = 15; // Tier 3 Contextual Anchors
      } else if (rule.validator) {
        priority = 20; // Tier 2 Checksums (All verified algorithmic IDs)
      } else if (match[1]) {
        priority = 15;
      }

      rawSpans.push({
        start,
        end,
        ruleId: rule.id,
        tokenPrefix: rule.tokenPrefix,
        targetValue,
        priority,
      });
    }
  }

  // 2. Scan Tier 4: Dynamic Custom Enterprise Keywords
  if (customKeywords && customKeywords.length > 0) {
    for (const keyword of customKeywords) {
      if (!keyword || keyword.trim().length === 0) continue;

      const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const customRegex = new RegExp(`\\b${escaped}\\b`, "gi");
      let match: RegExpExecArray | null;

      while ((match = customRegex.exec(text)) !== null) {
        rawSpans.push({
          start: match.index,
          end: match.index + match[0].length,
          ruleId: "RULE_CUSTOM_KEYWORD",
          tokenPrefix: "CUSTOM",
          targetValue: match[0],
          priority: 30, // Tier 4 Highest Priority
        });
      }
    }
  }

  // =========================================================================
  // STEP 2: SPAN DISAMBIGUATION PIPELINE (Priority-First & Longest-Match Sorting)
  // Higher-priority rules claim spans first; bottom-priority fallback rules (priority 1)
  // only fill in unclaimed spans and can never preempt existing pattern checkers.
  // =========================================================================
  rawSpans.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority; // Higher priority score wins first
    const lenA = a.end - a.start;
    const lenB = b.end - b.start;
    if (lenA !== lenB) return lenB - lenA;                         // Longest length wins
    return a.start - b.start;                                      // Earlier occurrence wins
  });

  const winningSpans: MatchSpan[] = [];

  for (const span of rawSpans) {
    // Check if this candidate span overlaps with any already-accepted higher/equal priority span
    const hasConflict = winningSpans.some(
      (existing) => span.start < existing.end && span.end > existing.start
    );

    if (!hasConflict) {
      winningSpans.push(span);
    }
  }

  winningSpans.sort((a, b) => a.start - b.start);

  // =========================================================================
  // STEP 3: STABLE IDENTIFIER ASSIGNMENT & REVERSE-INDEX REPLACEMENT
  // =========================================================================
  const tokenMap: Record<string, string> = {};
  const valueToTokenMap: Map<string, string> = new Map();
  const counters: Record<string, number> = {};
  const entitiesDetected: DetectedEntity[] = [];
  let totalIntercepted = 0;

  // Pre-scan text for pre-existing literal token tags (e.g. <PERSON_1 />) to avoid collision
  const existingTokenRegex = /(?:<)?([A-Z]+)_(\d+)(?:>)?/g;
  let existingMatch;
  while ((existingMatch = existingTokenRegex.exec(text)) !== null) {
    const prefix = existingMatch[1];
    const num = parseInt(existingMatch[2], 10);
    if (!isNaN(num)) {
      counters[prefix] = Math.max(counters[prefix] || 0, num);
    }
  }

  const assignedSpans = winningSpans.map((span) => {
    let syntheticToken: string;

    if (valueToTokenMap.has(span.targetValue)) {
      syntheticToken = valueToTokenMap.get(span.targetValue)!;
    } else {
      counters[span.tokenPrefix] = (counters[span.tokenPrefix] || 0) + 1;
      const counter = counters[span.tokenPrefix];

      if (mode === "fpe") {
        syntheticToken = generateFPEToken(span.tokenPrefix, counter, span.targetValue);
      } else {
        syntheticToken = `${span.tokenPrefix}_${counter}`;
      }

      valueToTokenMap.set(span.targetValue, syntheticToken);
      tokenMap[syntheticToken] = span.targetValue;
      entitiesDetected.push({ type: span.ruleId, token: syntheticToken });
      totalIntercepted++;
    }

    return { ...span, syntheticToken };
  });

  // Coreference mention propagation: scan for un-captured repeated mentions of assigned entities
  for (const [targetVal, syntheticToken] of valueToTokenMap.entries()) {
    const isPerson =
      syntheticToken.startsWith("PERSON") &&
      targetVal.length > 2 &&
      /^\p{L}/u.test(targetVal);
    const isFacility =
      syntheticToken.startsWith("FACILITY") &&
      targetVal.length > 4;
    const isLocation =
      syntheticToken.startsWith("LOCATION") &&
      targetVal.length > 3;
    const isDate =
      syntheticToken.startsWith("DATE") &&
      (/^\d{4}$/.test(targetVal) || /^\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?$/.test(targetVal));
    const isAge =
      syntheticToken.startsWith("AGE") &&
      /^\d{1,3}$/.test(targetVal) &&
      parseInt(targetVal, 10) >= 1 &&
      parseInt(targetVal, 10) <= 125;

    if (isPerson || isFacility || isLocation || isDate || isAge) {
      const candidatesToScan: string[] = [targetVal];
      if (isPerson) {
        const cleanParts = targetVal
          .split(/[\s,–—-]+/)
          .map((p) => p.trim())
          .filter(
            (p) =>
              p.length >= 2 &&
              /^\p{Lu}/u.test(p) &&
              ![
                "The",
                "Sir",
                "Mr",
                "Mrs",
                "Ms",
                "Dr",
                "Prof",
                "Attending",
                "Physician",
                "Patient",
                "Name",
                "MD",
                "DO",
                "NP",
                "PA",
                "RN",
                "PhD",
                "MBBS",
                "DOB",
              ].includes(p)
          );
        for (const cp of cleanParts) {
          if (!candidatesToScan.includes(cp)) {
            candidatesToScan.push(cp);
          }
        }
      }

      for (const candidate of candidatesToScan) {
        const escapedVal = candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(?<![\\p{L}0-9_])${escapedVal}(?![\\p{L}0-9_])`, "gu");
        let nMatch: RegExpExecArray | null;

        while ((nMatch = regex.exec(text)) !== null) {
          const nStart = nMatch.index;
          const nEnd = nStart + candidate.length;

          const overlaps = assignedSpans.some(
            (s) => nStart < s.end && nEnd > s.start
          );

          if (!overlaps) {
            assignedSpans.push({
              start: nStart,
              end: nEnd,
              ruleId: "RULE_COREFERENCE",
              tokenPrefix: syntheticToken.split("_")[0],
              targetValue: candidate,
              priority: 15,
              syntheticToken,
            });
          }
        }
      }
    }
  }

  // Sort assigned spans by start index ascending for replacement
  assignedSpans.sort((a, b) => a.start - b.start);

  // Splicing replacement right-to-left to preserve index offsets
  let sanitizedText = text;
  for (let i = assignedSpans.length - 1; i >= 0; i--) {
    const span = assignedSpans[i];
    sanitizedText =
      sanitizedText.slice(0, span.start) +
      span.syntheticToken +
      sanitizedText.slice(span.end);
  }

  return {
    mode,
    sanitizedText,
    tokenMap,
    count: totalIntercepted,
    entitiesDetected,
    categoriesApplied: resolvedPacks,
  };
}

/**
 * Rehydrates a tokenized text string by replacing synthetic tokens (PERSON_1 or FPE mock data)
 * back to their original sensitive values.
 * Uses length-descending sorting and boundary constraints.
 */
export function rehydrate(
  text: string,
  tokenMap: Record<string, string>
): string {
  if (!text || !tokenMap || Object.keys(tokenMap).length === 0) {
    return text;
  }

  let rehydratedText = text;

  // Sort tokens by key length descending to prevent partial token matching (PERSON_10 before PERSON_1)
  const sortedTokens = Object.entries(tokenMap).sort(
    ([a], [b]) => b.length - a.length
  );

  for (const [token, originalValue] of sortedTokens) {
    const isExplicitlyBracketed = token.startsWith("<") && token.endsWith(">");
    const rawToken = token.replace(/^<|>$/g, "");
    const escapedToken = rawToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 1. If the token in tokenMap was explicitly defined with brackets (e.g. <PERSON_1>), match with brackets
    if (isExplicitlyBracketed) {
      const bracketedRegex = new RegExp(`<${escapedToken}>`, "g");
      rehydratedText = rehydratedText.replace(bracketedRegex, originalValue);
    }

    // 2. Match unbracketed token PERSON_1 or FPE mock value
    const isStructuralToken = /^[A-Z_]+_\d+$/.test(rawToken);
    const endsWithDigit = /\d$/.test(rawToken);
    const leftBoundary = isStructuralToken ? "(?<![A-Z])" : "(?<![A-Za-z0-9_])";
    const rightBoundary = endsWithDigit ? "(?![0-9])" : "(?![A-Za-z0-9_])";

    const unbracketedRegex = new RegExp(`${leftBoundary}${escapedToken}${rightBoundary}`, "g");

    rehydratedText = rehydratedText.replace(unbracketedRegex, () => originalValue);
  }

  return rehydratedText;
}
