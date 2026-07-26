#!/usr/bin/env node
/**
 * Control test for the TF-Case quality bar.
 *
 * Any time the bar is recalibrated there is a risk of quietly lowering it until
 * the numbers look good. This checks the opposite end: it runs the same linter
 * over the skeleton-tier packs — the generated filler nobody should ever pay
 * for ("1. Open module. 2. Execute flow.", "Expected: Success") — and asserts
 * they still fail overwhelmingly.
 *
 * If the flagship pass rate rises while this control also rises, the bar was
 * loosened rather than the content improved.
 *
 * Usage: node scripts/lint_control_test.mjs
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/** Skeleton-tier samples: the junk the bar exists to reject. */
const CONTROL_SETS = [
  "Coupa/procurement/coupa_procurement_suite.csv",
  "NetSuite/financials/netsuite_financials_suite.csv",
  "3DEXPERIENCE/plm/3dexperience_plm_suite.csv",
  "Dynamics365/sales/dynamics365_sales_suite.csv",
];

/** Maximum share of skeleton cases allowed to pass before the bar is suspect. */
const MAX_CONTROL_PASS_RATE = 0.05;

async function loadModule(relPath) {
  const result = await build({
    entryPoints: [path.join(ROOT, relPath)],
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
    logLevel: "silent",
  });
  const dataUrl =
    "data:text/javascript;base64," +
    Buffer.from(result.outputFiles[0].text).toString("base64");
  return import(dataUrl);
}

/** Minimal CSV parse good enough for these files (quoted fields, newlines). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else { quoted = false; }
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function toTfCase(header, row, source) {
  const get = (...names) => {
    for (const n of names) {
      const i = header.findIndex((h) => h.trim().toLowerCase() === n);
      if (i >= 0) return (row[i] ?? "").trim();
    }
    return "";
  };
  const steps = get("steps")
    .split(/\n+|\s*>\s*|(?=\b\d+\.\s)/)
    .map((s) => s.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .map((action, i) => ({ index: i + 1, action }));

  return {
    id: get("test case id", "id") || `${source}-?`,
    title: get("scenario", "test scenario", "title"),
    platform: source,
    module: get("folder", "module", "product"),
    subModule: get("folder", "module"),
    priority: { High: "P1", Medium: "P2", Low: "P3" }[get("priority")] ?? "P3",
    type: "positive",
    layer: "UI",
    appVersion: "unstated",
    roles: [],
    preconditions: get("preconditions").split(/;\s*/).filter(Boolean),
    steps,
    expectedResults: get("expected result", "expected")
      .split(/;\s+/)
      .map((s) => s.trim())
      .filter(Boolean),
    automation: { feasibility: "Medium", frameworks: [] },
    provenance: { authoredBy: "human" },
  };
}

async function main() {
  const tfCase = await loadModule("src/lib/tfCase.ts");

  let total = 0;
  let passed = 0;
  console.log("Control test — the bar must reject skeleton-tier filler\n");

  for (const rel of CONTROL_SETS) {
    let text;
    try {
      text = await readFile(path.join(ROOT, rel), "utf8");
    } catch {
      console.log(`  (skipped, missing: ${rel})`);
      continue;
    }
    const rows = parseCsv(text).filter((r) => r.length > 1);
    const header = rows.shift() ?? [];
    const source = rel.split("/")[0];
    const cases = rows.slice(0, 200).map((r) => toTfCase(header, r, source));
    const report = tfCase.lintPack(cases);
    total += report.total;
    passed += report.passed;
    const rate = report.total ? (100 * report.passed) / report.total : 0;
    console.log(
      `  ${source.padEnd(16)} ${String(report.passed).padStart(4)}/${String(report.total).padEnd(5)} pass (${rate.toFixed(1)}%)`,
    );
  }

  const rate = total ? passed / total : 0;
  console.log(`\n  Overall skeleton pass rate: ${(100 * rate).toFixed(1)}% ` +
    `(must stay below ${(100 * MAX_CONTROL_PASS_RATE).toFixed(0)}%)`);

  if (rate > MAX_CONTROL_PASS_RATE) {
    console.error(
      "\n✗ The quality bar is letting generated filler through. " +
      "It was loosened too far — tighten it before shipping any pack.",
    );
    process.exit(1);
  }
  console.log("\n✓ Bar still discriminates: skeleton content is rejected.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
