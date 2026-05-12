import { describe, it, expect } from "vitest";
import {
  detectSpecialKind,
  validateSpecialOutput,
  previewLines,
  buildDownloadFilename,
} from "./specialOutputValidation";

const validToscaYaml = `
business_process: SAP PO Approval
modules:
  - name: ManagePOApp
xmodules:
  - name: VendorSearch
test_steps:
  - step: open
action_modes:
  - input
  - verify
  - wait
`;

const validVbScript = `
Option Explicit
Sub LoginFlow()
  Browser("Bank").Page("Login").WebEdit("user").Set("alice")
  Browser("Bank").Page("Login").WebButton("Sign in").Click()
  Reporter.ReportEvent micPass, "Login", "OK"
End Sub
`;

describe("detectSpecialKind", () => {
  it("detects tosca via framework", () => {
    expect(detectSpecialKind("tricentis_tosca", "")).toBe("tosca");
  });
  it("detects vbscript via language", () => {
    expect(detectSpecialKind("", "vbscript")).toBe("vbscript");
  });
  it("returns null for generic frameworks", () => {
    expect(detectSpecialKind("playwright_ts", "typescript")).toBeNull();
  });
});

describe("validateSpecialOutput", () => {
  it("passes a complete Tosca YAML", () => {
    const r = validateSpecialOutput(validToscaYaml, "tosca");
    expect(r.ok).toBe(true);
    expect(r.missing).toEqual([]);
  });

  it("flags missing Tosca sections", () => {
    const r = validateSpecialOutput("business_process: only", "tosca");
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(
      expect.arrayContaining(["modules", "xmodules", "test_steps", "action_modes"]),
    );
  });

  it("warns when Tosca output contains JS imports", () => {
    const bad = validToscaYaml + "\nimport { x } from 'y';\n```";
    const r = validateSpecialOutput(bad, "tosca");
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it("passes a complete VBScript", () => {
    const r = validateSpecialOutput(validVbScript, "vbscript");
    expect(r.ok).toBe(true);
    expect(r.missing).toEqual([]);
  });

  it("flags missing VBScript sections", () => {
    const r = validateSpecialOutput("' empty file", "vbscript");
    expect(r.ok).toBe(false);
    expect(r.missing).toEqual(
      expect.arrayContaining([
        "Option Explicit",
        "Sub/Function blocks",
        "Object Repository calls",
        "Reporter assertions",
      ]),
    );
  });

  it("warns when VBScript contains JS-style syntax", () => {
    const bad = validVbScript + "\nconsole.log('x');\n";
    const r = validateSpecialOutput(bad, "vbscript");
    expect(r.warnings.some((w) => /JavaScript/i.test(w))).toBe(true);
  });

  it("returns ok for null kind", () => {
    expect(validateSpecialOutput("anything", null)).toEqual({
      ok: true,
      missing: [],
      warnings: [],
    });
  });
});

describe("previewLines", () => {
  it("returns first N lines", () => {
    const src = Array.from({ length: 500 }, (_, i) => `line ${i + 1}`).join("\n");
    const out = previewLines(src, 200);
    expect(out.split("\n")).toHaveLength(200);
    expect(out.split("\n")[0]).toBe("line 1");
    expect(out.split("\n")[199]).toBe("line 200");
  });

  it("handles CRLF line endings", () => {
    const src = "a\r\nb\r\nc\r\nd";
    expect(previewLines(src, 2)).toBe("a\nb");
  });

  it("returns full text when shorter than N", () => {
    expect(previewLines("a\nb", 200)).toBe("a\nb");
  });
});

describe("buildDownloadFilename", () => {
  it("builds Tosca filename with .tosca.yaml extension", () => {
    const name = buildDownloadFilename(
      "SAP PO Approval Flow",
      "tricentis_tosca",
      "model-based",
      ".ts",
    );
    expect(name).toBe("tosca-sap-po-approval-flow.tosca.yaml");
  });

  it("builds UFT One filename with .vbs extension", () => {
    const name = buildDownloadFilename(
      "Online Banking Login!",
      "uft_one",
      "vbscript",
      ".ts",
    );
    expect(name).toBe("uftone-online-banking-login.vbs");
  });

  it("falls back to generic testforge filename for other frameworks", () => {
    const name = buildDownloadFilename(
      "Cypress Smoke",
      "cypress_ts",
      "typescript",
      ".ts",
    );
    expect(name).toBe("testforge-cypress-smoke.ts");
  });

  it("uses default slug when title is empty", () => {
    const name = buildDownloadFilename("", "playwright_ts", "typescript", ".ts");
    expect(name).toBe("testforge-test-suite.ts");
  });

  it("truncates very long titles to 60 chars", () => {
    const long = "a".repeat(120);
    const name = buildDownloadFilename(long, "uft_one", "vbscript", ".ts");
    expect(name.startsWith("uftone-")).toBe(true);
    // slug portion capped at 60
    expect(name).toBe(`uftone-${"a".repeat(60)}.vbs`);
  });
});
