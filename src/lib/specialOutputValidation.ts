// Validates that specialised outputs (Tosca model-based YAML, UFT One VBScript)
// contain the sections we contractually require. Returned errors are surfaced
// inline in the OutputPanel so users can see exactly what's missing before
// they download.

export type SpecialKind = "tosca" | "vbscript" | null;

export const detectSpecialKind = (
  framework?: string,
  language?: string,
): SpecialKind => {
  const f = String(framework || "").toLowerCase();
  const l = String(language || "").toLowerCase();
  if (f === "tricentis_tosca" || l === "model-based") return "tosca";
  if (f === "uft_one" || l === "vbscript") return "vbscript";
  return null;
};

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  warnings: string[];
}

const TOSCA_REQUIRED: { key: string; patterns: RegExp[] }[] = [
  { key: "modules", patterns: [/^\s*modules\s*:/im, /\bmodule\s*:/i] },
  { key: "xmodules", patterns: [/^\s*xmodules\s*:/im, /\bxmodule\b/i] },
  { key: "test_steps", patterns: [/^\s*test_steps\s*:/im, /\btest[_\s]?steps?\b/i] },
  { key: "action_modes", patterns: [/^\s*action_modes\s*:/im, /\b(input|verify|wait|buffer)\b/i] },
  { key: "business_process", patterns: [/^\s*business_process\s*:/im, /\bbusiness[_\s]process\b/i] },
];

const VBS_REQUIRED: { key: string; patterns: RegExp[] }[] = [
  { key: "Option Explicit", patterns: [/option\s+explicit/i] },
  { key: "Sub/Function blocks", patterns: [/\b(sub|function)\s+\w+/i] },
  { key: "Object Repository calls", patterns: [/Browser\s*\(|Page\s*\(|WebEdit\s*\(|WebButton\s*\(|Window\s*\(/i] },
  { key: "Reporter assertions", patterns: [/Reporter\.ReportEvent/i] },
  { key: "Test steps", patterns: [/\.(Set|Click|Sync|Select|Check)\s*\(/] },
];

export const validateSpecialOutput = (
  script: string,
  kind: SpecialKind,
): ValidationResult => {
  if (!kind) return { ok: true, missing: [], warnings: [] };
  const required = kind === "tosca" ? TOSCA_REQUIRED : VBS_REQUIRED;
  const missing: string[] = [];
  for (const r of required) {
    if (!r.patterns.some((p) => p.test(script))) missing.push(r.key);
  }
  const warnings: string[] = [];
  if (kind === "vbscript" && /console\.log|=>|function\s*\(/.test(script)) {
    warnings.push("Output contains JavaScript-like syntax — review before running in UFT One.");
  }
  if (kind === "tosca" && /```|import\s+\{/.test(script)) {
    warnings.push("Output contains code fences or JS imports — Tosca expects pure YAML.");
  }
  return { ok: missing.length === 0, missing, warnings };
};

export const previewLines = (script: string, n = 200): string =>
  script.split(/\r?\n/).slice(0, n).join("\n");

export const buildDownloadFilename = (
  title: string,
  framework: string,
  language: string,
  fallbackExt: string,
): string => {
  const slug = (title || "test-suite")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const kind = detectSpecialKind(framework, language);
  if (kind === "tosca") return `tosca-${slug}.tosca.yaml`;
  if (kind === "vbscript") return `uftone-${slug}.vbs`;
  return `testforge-${slug}${fallbackExt}`;
};
