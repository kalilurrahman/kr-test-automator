import { describe, it, expect } from "vitest";
import { lintCase, lintPack, type TfCase } from "./tfCase";

const base: TfCase = {
  id: "SAP-FI-GL-0001",
  title: "Post cross-company-code journal entry and verify clearing in both codes",
  platform: "SAP",
  module: "FI",
  subModule: "General Ledger",
  priority: "P1",
  type: "positive",
  layer: "UI",
  appVersion: "S/4HANA 2026",
  roles: ["GL Accountant (auth object F_BKPF_BUK)"],
  preconditions: ["Posting period 07/2026 open in variant 0001 via OB52"],
  steps: [
    { index: 1, action: "F-02 → enter document header for company code 1000" },
    { index: 2, action: "FBL3N → display the resulting open item" },
  ],
  expectedResults: [
    "Document number in range 01xxxxxxxx; FBL3N shows the item cleared and FAGLL03 balance is 0.00 in both company codes",
    "Posting to a closed period is blocked with message F5 201",
  ],
  automation: { feasibility: "High", apiHint: "BAPI_ACC_DOCUMENT_POST", frameworks: ["Playwright", "Gherkin"] },
  provenance: { authoredBy: "human", verifiedOn: "2026-07-01" },
};

const clone = (patch: Partial<TfCase>): TfCase => ({ ...base, ...patch });

describe("lintCase — the paid quality bar", () => {
  it("passes a well-formed curated case", () => {
    expect(lintCase(base).filter((f) => f.severity === "error")).toEqual([]);
  });

  it("rejects non-falsifiable expected results", () => {
    const findings = lintCase(clone({ expectedResults: ["Success"] }));
    expect(findings.some((f) => f.rule === "expected-falsifiable")).toBe(true);
  });

  it("rejects the generated-filler expectation seen across the skeleton packs", () => {
    const findings = lintCase(clone({ expectedResults: ["Flow completes successfully"] }));
    expect(findings.some((f) => f.severity === "error")).toBe(true);
  });

  it("rejects templated steps that name no screen or transaction", () => {
    const findings = lintCase(
      clone({
        steps: [
          { index: 1, action: "Open module" },
          { index: 2, action: "Execute flow" },
          { index: 3, action: "Verify outcome" },
        ],
      }),
    );
    expect(findings.some((f) => f.rule === "step-filler")).toBe(true);
    expect(findings.some((f) => f.rule === "step-anchor")).toBe(true);
  });

  it("requires a release stamp, which generic generators cannot supply", () => {
    const findings = lintCase(clone({ appVersion: "" }));
    expect(findings.some((f) => f.rule === "release-stamp")).toBe(true);
  });

  it("flags numbered-variant titles", () => {
    const findings = lintCase(clone({ title: "Revenue Forecasting E2E #3" }));
    expect(findings.some((f) => f.rule === "title-variant-suffix")).toBe(true);
  });

  it("accepts an expectation that names a blocking outcome without digits", () => {
    const findings = lintCase(
      clone({ expectedResults: ["Posting is blocked and the user is denied authorisation"] }),
    );
    expect(findings.filter((f) => f.rule === "expected-falsifiable")).toEqual([]);
  });

  it("warns when a P1 positive case carries no negative expectation", () => {
    const findings = lintCase(
      clone({ expectedResults: ["Document number 0100000123 is created in FBL3N"] }),
    );
    expect(findings.some((f) => f.rule === "negative-variant" && f.severity === "warning")).toBe(true);
  });
});

describe("lintPack", () => {
  it("detects numbered-variant duplicates that inflate counts", () => {
    const report = lintPack([
      clone({ id: "A-1", title: "Run revenue forecast for region 1" }),
      clone({ id: "A-2", title: "Run revenue forecast for region 2" }),
    ]);
    expect(report.duplicates).toHaveLength(1);
    expect(report.duplicates[0]).toMatchObject({ caseId: "A-2", duplicateOf: "A-1" });
  });

  it("counts a case once regardless of how many rules it breaks", () => {
    const report = lintPack([
      base,
      clone({ id: "BAD-1", expectedResults: ["Success"], steps: [{ index: 1, action: "Execute flow" }] }),
    ]);
    expect(report.total).toBe(2);
    expect(report.passed).toBe(1);
  });
});
