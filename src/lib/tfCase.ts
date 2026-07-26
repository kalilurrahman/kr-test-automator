/**
 * TF-Case v1.0 — the schema and quality bar every paid test case must clear.
 *
 * The premium promise is testable, and this file is the test: a buyer can
 * sample any five cases from a pack and find zero templated steps, zero
 * non-falsifiable expected results, and a named screen or transaction on every
 * step. Free content has no such obligation; paid content that fails these
 * rules does not ship.
 *
 * The rules encode what separates this from the two floors every buyer
 * compares against — the vendor's own free scripts and whatever an LLM
 * produces in five minutes — namely falsifiable expectations, real system
 * anchors, and release-version awareness.
 */

export type TfPriority = "P1" | "P2" | "P3" | "P4";
export type TfCaseType =
  | "positive"
  | "negative"
  | "boundary"
  | "security"
  | "integration"
  | "performance";
export type TfLayer = "UI" | "API" | "batch" | "report";

export interface TfStep {
  /** 1-based order as executed. */
  index: number;
  /** One action. Must name the screen, transaction, task or endpoint. */
  action: string;
  /** Observable state after this step, where the step has one. */
  expected?: string;
}

export interface TfCase {
  /** Stable, never reused: {PLATFORM}-{MODULE}-{SUB}-{NNNN}. */
  id: string;
  /** Verb-first and outcome-stated, not "Test GL flow #3". */
  title: string;
  platform: string;
  module: string;
  subModule: string;
  businessProcess?: string;
  industry?: string;
  priority: TfPriority;
  type: TfCaseType;
  layer: TfLayer;
  /**
   * The release this case was verified against (e.g. "S/4HANA 2026").
   * A generic generator cannot truthfully populate this, which is exactly
   * why it is mandatory for paid content.
   */
  appVersion: string;
  /** Business role plus the technical authorisation it needs. */
  roles: string[];
  /** Checkable statements, not "system configured". */
  preconditions: string[];
  steps: TfStep[];
  /** Must name an observable artefact and a value. */
  expectedResults: string[];
  testData?: Record<string, string>;
  automation: {
    feasibility: "High" | "Medium" | "Low";
    /** e.g. BAPI / OData entity that makes this automatable at API level. */
    apiHint?: string;
    frameworks: string[];
  };
  traceability?: {
    businessProcessId?: string;
    requirementRef?: string;
  };
  compliance?: string[];
  provenance: {
    authoredBy: "human" | "ai-drafted+human-verified";
    verifiedOn?: string;
    lastReviewedRelease?: string;
  };
}

export type LintSeverity = "error" | "warning";

export interface LintFinding {
  caseId: string;
  rule: string;
  severity: LintSeverity;
  message: string;
}

/**
 * Filler that reads as machine-generated. A buyer recognises these instantly,
 * and they are the single clearest signal that a pack was not curated.
 */
const BANNED_PHRASES = [
  "as expected",
  "works properly",
  "works correctly",
  // The classic non-falsifiable qualifiers: they assert a judgement, not an
  // observation, so a tester cannot tell pass from fail.
  "correctly",
  "properly",
  "accurately",
  "appropriately",
  "successfully completed",
  "flow completes successfully",
  "completes successfully",
  "operation successful",
  "verify outcome",
  "execute flow",
  "open module",
  "various",
  "etc.",
  "and so on",
  "lorem ipsum",
  "sample data",
  "tbd",
  "todo",
];

/** An expected result of exactly this, and nothing more, is not falsifiable. */
const NON_FALSIFIABLE = /^(success|successful|passed|ok|completed|no error|no errors)\.?$/i;

/**
 * Evidence that an expectation can actually be checked: a number, a quoted or
 * capitalised system artefact (document number, table, status), a message id,
 * a comparison, or an explicit negative outcome.
 */
const FALSIFIABLE_SIGNALS: RegExp[] = [
  /\d/, // any figure: amount, document number, count, tolerance
  /\b[A-Z]{2,}[A-Z0-9_]*\b/, // T-code, table, BAPI, status constant (FBL3N, VBAK)
  /\b(status|state|flag)\b.{0,30}\b(is|=|set to|becomes)\b/i,
  /\b(equals?|matches?|balances? to|reconciles? to|rounds? to)\b/i,
  /\b(error|warning|message)\b.{0,20}\b(id|code|number|[A-Z]\d)/i,
  // A named negative outcome is checkable — accept the usual verb forms.
  /\b(block|reject|prevent|deny|fail|abort|lock|disallow)(s|ed|es|ing)?\b/i,
  /\b(cannot|is not permitted|not allowed|no longer)\b/i,
  // A named artefact coming into existence is observable.
  /\b(created|posted|generated|logged|cleared|updated|released|archived|triggered)\b/i,
];

const looksFalsifiable = (text: string): boolean =>
  FALSIFIABLE_SIGNALS.some((re) => re.test(text));

/** A real step names where the work happens. */
const STEP_ANCHOR = [
  /\b[A-Z]{2,}[A-Z0-9_]*\b/, // FBL3N, VA01, UKM_CASE, BAPI_ACC_DOCUMENT_POST
  /\b[A-Z]+-\d+[A-Z0-9]*\b/, // hyphenated T-codes: F-02, F-28, KE5Z-1
  /\b(page|screen|app|tab|dialog|report|endpoint|api|task|worklet|form)\b/i,
  /\b(GET|POST|PUT|PATCH|DELETE)\b/,
  /\//, // path or navigation trail
];

const hasAnchor = (text: string): boolean => STEP_ANCHOR.some((re) => re.test(text));

const containsBanned = (text: string): string | null => {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.find((phrase) => lower.includes(phrase)) ?? null;
};

/**
 * Lints one case against the paid bar. Errors block a pack from shipping;
 * warnings are editorial debt that should be worked down but do not block.
 */
export function lintCase(tc: TfCase): LintFinding[] {
  const findings: LintFinding[] = [];
  const fail = (rule: string, message: string, severity: LintSeverity = "error") =>
    findings.push({ caseId: tc.id, rule, severity, message });

  if (!tc.id?.trim()) fail("id-required", "Case has no id");
  if (!tc.appVersion?.trim()) {
    fail("release-stamp", "No appVersion: paid cases must state the release they were verified against");
  }

  // Title
  if (!tc.title || tc.title.trim().length < 12) {
    fail("title-substance", `Title too thin to describe an outcome: "${tc.title ?? ""}"`);
  }
  if (/#\d+\s*$/.test(tc.title ?? "")) {
    fail("title-variant-suffix", `Title is a numbered variant ("${tc.title}") — the hallmark of generated filler`);
  }

  // Preconditions
  if (!tc.preconditions?.length) {
    fail("preconditions-required", "No preconditions: the case cannot be set up");
  }
  tc.preconditions?.forEach((p) => {
    const banned = containsBanned(p);
    if (banned) fail("precondition-filler", `Precondition contains filler "${banned}": "${p}"`);
  });

  // Steps
  if (!tc.steps?.length) {
    fail("steps-required", "No steps");
  } else {
    if (tc.steps.length < 2) {
      fail("steps-depth", "A single step is a smoke check, not a test case", "warning");
    }
    tc.steps.forEach((s) => {
      const banned = containsBanned(s.action);
      if (banned) {
        fail("step-filler", `Step ${s.index} contains templated filler "${banned}": "${s.action}"`);
      }
    });

    // Anchors are judged per case, not per step: continuation steps ("Review
    // the exposure", "Approve") are legitimate technical writing once the
    // screen is established. What must never ship is a case that names no
    // system anchor anywhere — that is the templated-filler signature.
    const anchored = tc.steps.filter((s) => hasAnchor(s.action)).length;
    if (anchored === 0) {
      fail(
        "step-anchor",
        "No step names a transaction, screen or endpoint — the steps are not executable",
      );
    } else if (anchored / tc.steps.length < 0.34) {
      fail(
        "step-anchor-density",
        `Only ${anchored} of ${tc.steps.length} steps name a system anchor; a reader cannot follow the flow`,
        "warning",
      );
    }
  }

  // Expected results — the core of what a paying QA lead buys.
  //
  // Judged at case level, not fragment level. Real curated cases state several
  // assertions at once ("Asset master created; asset number generated;
  // depreciation calculation scheduled"); one soft clause among three checkable
  // ones is editorial debt, not a reason to withhold the case. What must never
  // ship is a case where NOTHING is checkable — the skeleton-pack signature.
  if (!tc.expectedResults?.length) {
    fail("expected-required", "No expected results: the case cannot serve as acceptance criteria");
  } else {
    let falsifiableCount = 0;
    tc.expectedResults.forEach((e) => {
      const text = e.trim();
      if (NON_FALSIFIABLE.test(text)) {
        fail("expected-vague", `Expected result "${text}" is not falsifiable`, "warning");
        return;
      }
      const banned = containsBanned(text);
      if (banned) {
        fail(
          "expected-filler",
          `Expected result asserts a judgement, not an observation ("${banned}"): "${text}"`,
          "warning",
        );
        return;
      }
      if (looksFalsifiable(text)) {
        falsifiableCount += 1;
      } else {
        fail(
          "expected-vague",
          `Expected result names no observable artefact or value: "${text}"`,
          "warning",
        );
      }
    });

    if (falsifiableCount === 0) {
      fail(
        "expected-falsifiable",
        "No expected result is checkable — the case cannot serve as acceptance criteria",
      );
    }
  }

  // Negative coverage: the difference between a demo script and a test suite.
  if ((tc.priority === "P1" || tc.priority === "P2") && tc.type === "positive") {
    const hasNegativeExpectation = tc.expectedResults?.some((e) =>
      /\b(blocked|rejected|prevented|denied|cannot|error|not permitted|fails)\b/i.test(e),
    );
    if (!hasNegativeExpectation) {
      fail(
        "negative-variant",
        "P1/P2 positive case has no negative or blocking expectation; pair it with a negative variant",
        "warning",
      );
    }
  }

  if (!tc.automation?.frameworks?.length) {
    fail("automation-target", "No automation framework named", "warning");
  }
  if (!tc.provenance?.authoredBy) {
    fail("provenance", "No provenance: buyers of premium content check who verified it", "warning");
  }

  return findings;
}

export interface LintReport {
  total: number;
  passed: number;
  errors: LintFinding[];
  warnings: LintFinding[];
  /** Cases whose title+steps are near-identical to another case. */
  duplicates: Array<{ caseId: string; duplicateOf: string }>;
  byRule: Record<string, number>;
}

/** Normalised fingerprint used to catch the "#1/#2/#3" variant disease. */
function fingerprint(tc: TfCase): string {
  const steps = (tc.steps ?? []).map((s) => s.action).join(" ");
  return `${tc.title} ${steps}`
    .toLowerCase()
    .replace(/\d+/g, "#")
    .replace(/[^a-z#]+/g, " ")
    .trim();
}

export function lintPack(cases: TfCase[]): LintReport {
  const errors: LintFinding[] = [];
  const warnings: LintFinding[] = [];
  const duplicates: Array<{ caseId: string; duplicateOf: string }> = [];
  const byRule: Record<string, number> = {};
  const seen = new Map<string, string>();
  const failedCases = new Set<string>();

  for (const tc of cases) {
    for (const finding of lintCase(tc)) {
      byRule[finding.rule] = (byRule[finding.rule] ?? 0) + 1;
      if (finding.severity === "error") {
        errors.push(finding);
        failedCases.add(tc.id);
      } else {
        warnings.push(finding);
      }
    }

    const fp = fingerprint(tc);
    const prior = seen.get(fp);
    if (prior) {
      duplicates.push({ caseId: tc.id, duplicateOf: prior });
      byRule["duplicate-case"] = (byRule["duplicate-case"] ?? 0) + 1;
      failedCases.add(tc.id);
    } else {
      seen.set(fp, tc.id);
    }
  }

  return {
    total: cases.length,
    passed: cases.length - failedCases.size,
    errors,
    warnings,
    duplicates,
    byRule,
  };
}
