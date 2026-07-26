#!/usr/bin/env python3
"""Rebuild the stub coverage pages into honest, indexable funnel pages.

709 of the 851 static HTML files are sub-300-byte stubs; 266 of them assert a
hardcoded "800 cases" that the sibling CSV contradicts (it holds 240). Those
pages are simultaneously the site's largest SEO surface and its biggest trust
liability, so this regenerates each one to:

  * quote the real, de-duplicated record count from the sibling CSV
  * show the first 25 scenarios as a free preview (the free/paid line: free
    tells you WHAT to test, paid tells you HOW and hands you the artifacts)
  * carry a title/description/JSON-LD worth indexing
  * link to the app's platform page and to /pricing, so every top-of-funnel
    page has a route to a purchase

Rich pages (>= 300 bytes) are left untouched — they are hand-built portals.

Usage:
    python3 scripts/build_coverage_pages.py           # rewrite stubs
    python3 scripts/build_coverage_pages.py --dry-run # report only
"""

from __future__ import annotations

import argparse
import csv
import html
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://testautomator.keyarite.com"
STUB_MAX_BYTES = 300
PREVIEW_ROWS = 25
# Marks pages this script owns, so regeneration is idempotent rather than
# one-way (a stub becomes a full page and would otherwise never update again).
GENERATED_MARKER = "<!-- generated-by: scripts/build_coverage_pages.py -->"

SKIP_DIRS = {
    ".git", "node_modules", "dist", "src", "docs", "scripts", "supabase",
    "public", ".github", "coverage", "Industry Scripts",
}

# Platforms with a curated core deep enough to sell. Every other platform is
# free breadth: its pages must not promise a pack that will never exist.
FLAGSHIP_PLATFORMS = {"SAP", "Salesforce", "workday", "Veeva", "ServiceNow", "OracleApps"}

csv.field_size_limit(10 ** 9)


def titleize(name: str) -> str:
    cleaned = re.sub(r"[_-]+", " ", name).strip()
    # Preserve well-known acronyms/product spellings.
    special = {
        "hcm": "HCM", "erp": "ERP", "crm": "CRM", "plm": "PLM", "bom": "BOM",
        "api": "API", "ui": "UI", "gl": "GL", "ap": "AP", "ar": "AR",
        "itsm": "ITSM", "itom": "ITOM", "csm": "CSM", "hrsd": "HRSD",
        "aem": "AEM", "dlp": "DLP", "vm": "VM", "ha": "HA", "drs": "DRS",
        "mfa": "MFA", "sap": "SAP", "cad": "CAD", "e2e": "E2E", "rfis": "RFIs",
        # SAP module codes — "SAP Fi" reads as a typo to the buyer who matters.
        "fi": "FI", "co": "CO", "mm": "MM", "sd": "SD", "pp": "PP",
        "qm": "QM", "pm": "PM", "ps": "PS", "scm": "SCM", "ewm": "EWM",
        "secops": "SecOps", "cx": "CX", "epm": "EPM", "m365": "M365",
        "eks": "EKS", "ec2": "EC2", "s3": "S3", "rds": "RDS", "iam": "IAM",
        "aks": "AKS", "gke": "GKE", "sql": "SQL", "siem": "SIEM",
        "rum": "RUM", "apm": "APM", "raml": "RAML", "clm": "CLM",
    }
    return " ".join(special.get(w.lower(), w.capitalize()) for w in cleaned.split())


def read_csv(path: Path) -> tuple[list[str], list[list[str]]]:
    with path.open(newline="", encoding="utf-8", errors="replace") as fh:
        reader = csv.reader(fh)
        header = next(reader, None) or []
        rows = list(reader)
    return header, rows


def dedupe(rows: list[list[str]]) -> list[list[str]]:
    seen: set[tuple] = set()
    out: list[list[str]] = []
    for row in rows:
        key = tuple(row[1:]) if len(row) > 1 else tuple(row)
        if key not in seen:
            seen.add(key)
            out.append(row)
    return out


def pick(header: list[str], *candidates: str) -> int | None:
    lowered = [h.strip().lower() for h in header]
    for cand in candidates:
        if cand in lowered:
            return lowered.index(cand)
    for i, h in enumerate(lowered):
        if any(cand in h for cand in candidates):
            return i
    return None


def sibling_csv(directory: Path) -> Path | None:
    csvs = sorted(directory.glob("*.csv"), key=lambda p: p.stat().st_size, reverse=True)
    return csvs[0] if csvs else None


def render(platform: str, module: str | None, csv_path: Path | None, depth: int) -> str:
    # Module pages link up to the platform index; a platform index links back
    # into the app rather than to itself.
    back_href = ("../" * depth + "index.html") if depth else f"{SITE}/platforms"
    platform_label = titleize(platform)
    module_label = titleize(module) if module else None
    scope = f"{platform_label} {module_label}" if module_label else platform_label

    unique_count = 0
    preview_rows: list[tuple[str, str, str]] = []
    if csv_path and csv_path.exists():
        header, rows = read_csv(csv_path)
        unique = dedupe(rows)
        unique_count = len(unique)
        i_id = pick(header, "test case id", "id")
        i_scn = pick(header, "test scenario", "scenario", "title")
        i_pri = pick(header, "priority")
        for row in unique[:PREVIEW_ROWS]:
            def cell(idx: int | None) -> str:
                return row[idx].strip() if idx is not None and idx < len(row) else ""
            preview_rows.append((cell(i_id), cell(i_scn), cell(i_pri)))

    is_flagship = platform in FLAGSHIP_PLATFORMS
    upgrade_target = (
        f"the {platform_label} Premium Pack" if is_flagship
        else "the SAP, Salesforce and Workday Premium Packs"
    )

    title = f"{scope} test cases — {unique_count:,} scenarios | TestForge AI"
    description = (
        f"Free coverage checklist of {unique_count:,} de-duplicated {scope} test scenarios: "
        f"IDs, scenario titles and priorities. "
        + (
            f"Full steps, test data and runnable automation ship with the "
            f"{platform_label} Premium Pack."
            if is_flagship
            else "Deep, automation-ready packs are available for SAP, Salesforce and Workday."
        )
    )

    rows_html = "\n".join(
        "        <tr><td><code>{}</code></td><td>{}</td><td>{}</td></tr>".format(
            html.escape(rid), html.escape(scn), html.escape(pri)
        )
        for rid, scn, pri in preview_rows
    ) or '        <tr><td colspan="3">Coverage data is being rebuilt for this module.</td></tr>'

    remaining = max(0, unique_count - len(preview_rows))
    jsonld = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": f"{scope} test scenario coverage checklist",
            "description": description,
            "creator": {"@type": "Organization", "name": "TestForge AI"},
            "isAccessibleForFree": True,
            "variableMeasured": "test scenario count",
            "size": f"{unique_count} scenarios",
        },
        separators=(",", ":"),
    )

    return f"""<!doctype html>
{GENERATED_MARKER}
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<link rel="canonical" href="{SITE}/{platform}/{(module + '/') if module else ''}">
<script type="application/ld+json">{jsonld}</script>
<style>
  :root {{ color-scheme: light dark; }}
  body {{ font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0; padding: 2rem 1rem; max-width: 60rem; margin-inline: auto; }}
  header a {{ text-decoration: none; color: #b8860b; font-weight: 600; }}
  h1 {{ font-size: 1.6rem; margin: .5rem 0; }}
  .meta {{ color: #6b7280; font-size: .9rem; }}
  .cta {{ display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; justify-content: space-between;
          border: 1px solid rgba(184,134,11,.4); background: rgba(184,134,11,.06);
          border-radius: .6rem; padding: 1rem; margin: 1.5rem 0; }}
  .cta a.btn {{ background: #b8860b; color: #fff; padding: .5rem .9rem; border-radius: .4rem; text-decoration: none; font-weight: 600; }}
  table {{ width: 100%; border-collapse: collapse; font-size: .9rem; }}
  th, td {{ text-align: left; padding: .5rem .6rem; border-bottom: 1px solid rgba(128,128,128,.25); vertical-align: top; }}
  th {{ font-size: .75rem; text-transform: uppercase; letter-spacing: .05em; color: #6b7280; }}
  code {{ font-size: .85em; }}
  footer {{ margin-top: 2rem; font-size: .85rem; color: #6b7280; }}
</style>
</head>
<body>
<header><a href="{back_href}">← {html.escape(platform_label) if depth else "All platforms"}</a></header>

<h1>{html.escape(scope)} test cases</h1>
<p class="meta"><strong>{unique_count:,}</strong> de-duplicated scenarios in this module ·
counts verified by <code>scripts/verify_content_integrity.py</code></p>

<div class="cta">
  <div>
    <strong>This page is the free coverage checklist.</strong><br>
    It tells you <em>what</em> to test. {html.escape(upgrade_target.capitalize())} give you the how:
    full steps, roles, test data, negative variants and runnable automation.
  </div>
  <a class="btn" href="{SITE}/pricing">See Premium Packs</a>
</div>

<h2>Scenario preview</h2>
<table>
  <thead><tr><th>ID</th><th>Scenario</th><th>Priority</th></tr></thead>
  <tbody>
{rows_html}
  </tbody>
</table>
<p class="meta">Showing {len(preview_rows)} of {unique_count:,} scenarios{f" — {remaining:,} more in the full checklist" if remaining else ""}.
Browse the searchable library at <a href="{SITE}/platforms">{SITE}/platforms</a>.</p>

<footer>
  <p>Free to browse and reference. Test steps, expected results, test data and
  automation scripts are part of {html.escape(upgrade_target)} —
  <a href="{SITE}/pricing">see pricing</a>.</p>
</footer>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    rewritten = 0
    skipped_rich = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        rel = Path(dirpath).relative_to(ROOT)
        if rel.parts and rel.parts[0] in SKIP_DIRS:
            dirnames[:] = []
            continue
        # Prune only at the repo root: "docs" there is this project's docs,
        # but GoogleWorkspace/docs is a product module that must be included.
        if not rel.parts:
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            continue

        platform = rel.parts[0]
        module = rel.parts[1] if len(rel.parts) > 1 else None
        depth = len(rel.parts) - 1

        for name in filenames:
            if not name.lower().endswith(".html"):
                continue
            path = Path(dirpath) / name
            existing = path.read_text(encoding="utf-8", errors="replace")
            owned = GENERATED_MARKER in existing
            if len(existing) >= STUB_MAX_BYTES and not owned:
                skipped_rich += 1
                continue

            csv_path = sibling_csv(Path(dirpath))
            page = render(platform, module, csv_path, depth)
            if args.dry_run:
                print(f"would rewrite {path.relative_to(ROOT)} "
                      f"({path.stat().st_size}B -> {len(page)}B)")
            else:
                path.write_text(page, encoding="utf-8")
            rewritten += 1

    verb = "Would rewrite" if args.dry_run else "Rewrote"
    print(f"{verb} {rewritten} stub pages; left {skipped_rich} rich pages untouched.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
