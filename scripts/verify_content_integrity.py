#!/usr/bin/env python3
"""Content integrity gate for the premium catalogue.

A buyer who finds one inflated count refunds everything, so every number the
site publishes has to be computed from the data rather than asserted by a
filename, a heading, or a hand-maintained constant.

This script walks every shipped CSV, counts real records (a proper CSV parse —
embedded newlines make `wc -l` overstate by 3x in this repo), measures
duplicate rows, and compares the result against the claims made by:

  * filenames that embed a number  (fsc_superpack_10000.csv)
  * "<N> cases" headings in the static HTML portals

It writes the verified numbers to public/content-integrity.json — the honest
source of truth the site and the pack manifests should quote — and exits
non-zero when an unwaived claim contradicts the data, so CI blocks the
regression instead of a customer finding it.

Usage:
    python3 scripts/verify_content_integrity.py            # verify + report
    python3 scripts/verify_content_integrity.py --write    # also emit JSON
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "content-integrity.json"
WAIVERS = ROOT / "scripts" / "integrity_waivers.json"

# Directories that are build output, mirrors, or app source rather than catalogue.
SKIP_DIRS = {
    ".git", "node_modules", "dist", "src", "docs", "scripts", "supabase",
    "public", ".github", "coverage",
}

# Tolerance before a filename number counts as a lie (rounded pack names like
# "sap_fi_1200" holding 1200 exactly are the norm; a few missing rows are not
# what destroys trust, an order of magnitude is).
CLAIM_TOLERANCE = 0.02

# Only a standalone underscore-delimited token is a count claim: "sap_fi_1200"
# claims 1200, while "dynamics365_sales" and "topproducts_d365" are brand names.
CLAIM_IN_NAME = re.compile(r"(?:^|_)(\d{3,7})(?:_|$)")
# A count claim must not be glued to a preceding letter: "D365 test cases" and
# "Dynamics 365 scenarios" are product names, "5,520 test cases" is a claim.
CLAIM_IN_HTML = re.compile(
    r"(?<![A-Za-z])([\d,]{3,9})\s*(?:\+\s*)?(?:test\s+)?(?:cases|scenarios)", re.I
)

csv.field_size_limit(10 ** 9)


def iter_catalogue_csvs() -> list[Path]:
    found: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        rel = Path(dirpath).relative_to(ROOT)
        if rel.parts and rel.parts[0] in SKIP_DIRS:
            dirnames[:] = []
            continue
        # Prune only at the repo root — nested dirs like GoogleWorkspace/docs
        # are product modules, not this project's docs folder.
        if not rel.parts:
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name.lower().endswith(".csv"):
                found.append(Path(dirpath) / name)
    return sorted(found)


def measure(path: Path) -> dict:
    """True record count and duplicate ratio, ignoring the ID column."""
    with path.open(newline="", encoding="utf-8", errors="replace") as fh:
        reader = csv.reader(fh)
        header = next(reader, None) or []
        seen: set[tuple] = set()
        total = 0
        duplicates = 0
        for row in reader:
            total += 1
            key = tuple(row[1:]) if len(row) > 1 else tuple(row)
            if key in seen:
                duplicates += 1
            else:
                seen.add(key)
    return {
        "rows": total,
        "unique": total - duplicates,
        "duplicates": duplicates,
        "duplicate_pct": round(100 * duplicates / total, 1) if total else 0.0,
        "columns": len(header),
    }


def filename_claim(path: Path) -> int | None:
    match = CLAIM_IN_NAME.search(path.stem)
    return int(match.group(1)) if match else None


def html_claims(platform_dir: Path) -> list[tuple[Path, int]]:
    claims: list[tuple[Path, int]] = []
    for html in platform_dir.rglob("*.html"):
        try:
            text = html.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for match in CLAIM_IN_HTML.finditer(text):
            value = int(match.group(1).replace(",", ""))
            if value >= 100:  # ignore "12 cases" prose
                claims.append((html, value))
    return claims


def load_waivers() -> dict:
    if WAIVERS.exists():
        return json.loads(WAIVERS.read_text(encoding="utf-8"))
    return {"filename_claims": [], "html_claims": []}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="emit public/content-integrity.json")
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    waivers = load_waivers()
    waived_files = set(waivers.get("filename_claims", []))
    waived_html = set(waivers.get("html_claims", []))

    per_platform: dict[str, dict] = defaultdict(
        lambda: {"rows": 0, "unique": 0, "duplicates": 0, "files": 0, "modules": []}
    )
    violations: list[str] = []

    for path in iter_catalogue_csvs():
        rel = path.relative_to(ROOT).as_posix()
        stats = measure(path)
        platform = rel.split("/")[0]

        bucket = per_platform[platform]
        bucket["rows"] += stats["rows"]
        bucket["unique"] += stats["unique"]
        bucket["duplicates"] += stats["duplicates"]
        bucket["files"] += 1
        bucket["modules"].append({"file": rel, **stats})

        claim = filename_claim(path)
        if claim and rel not in waived_files:
            if abs(claim - stats["rows"]) > CLAIM_TOLERANCE * claim:
                violations.append(
                    f"FILENAME CLAIM: {rel} advertises {claim:,} but holds {stats['rows']:,} rows"
                )

    # HTML headings are checked per platform against that platform's true total.
    for platform, bucket in sorted(per_platform.items()):
        platform_dir = ROOT / platform
        if not platform_dir.is_dir():
            continue
        for html, claim in html_claims(platform_dir):
            rel_html = html.relative_to(ROOT).as_posix()
            if rel_html in waived_html:
                continue
            # A heading may describe one module or the whole platform; accept it
            # if it matches any real count in that platform.
            real_counts = {bucket["rows"], bucket["unique"]} | {
                m["rows"] for m in bucket["modules"]
            } | {m["unique"] for m in bucket["modules"]}
            if not any(abs(claim - real) <= CLAIM_TOLERANCE * max(claim, 1) for real in real_counts):
                violations.append(
                    f"HTML CLAIM: {rel_html} advertises {claim:,} cases, "
                    f"no module or platform total matches"
                )

    totals = {
        "rows": sum(b["rows"] for b in per_platform.values()),
        "unique": sum(b["unique"] for b in per_platform.values()),
        "duplicates": sum(b["duplicates"] for b in per_platform.values()),
        "platforms": len(per_platform),
        "files": sum(b["files"] for b in per_platform.values()),
    }

    if not args.quiet:
        print(f"Catalogue: {totals['files']} CSV files across {totals['platforms']} platforms")
        print(f"  rows           {totals['rows']:>9,}")
        print(f"  unique rows    {totals['unique']:>9,}   <-- the only number safe to publish")
        print(f"  duplicates     {totals['duplicates']:>9,} "
              f"({100 * totals['duplicates'] / max(totals['rows'], 1):.1f}%)")
        print()
        worst = sorted(
            per_platform.items(),
            key=lambda kv: kv[1]["duplicates"] / max(kv[1]["rows"], 1),
            reverse=True,
        )[:8]
        print("Highest duplicate ratios (never sell these as-is):")
        for name, b in worst:
            pct = 100 * b["duplicates"] / max(b["rows"], 1)
            print(f"  {name:<22} {b['unique']:>7,} unique of {b['rows']:>7,} ({pct:.0f}% dupes)")
        print()

    if args.write:
        payload = {
            "generated_by": "scripts/verify_content_integrity.py",
            "methodology": (
                "Counts are real CSV records (not physical lines) parsed with Python's csv "
                "module. Duplicates are rows identical in every column except the ID. "
                "'unique' is the only figure quoted in marketing."
            ),
            "totals": totals,
            "platforms": {
                name: {k: v for k, v in bucket.items() if k != "modules"}
                for name, bucket in sorted(per_platform.items())
            },
            "modules": {
                name: bucket["modules"] for name, bucket in sorted(per_platform.items())
            },
        }
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
        if not args.quiet:
            print(f"Wrote {OUTPUT.relative_to(ROOT)}")

    if violations:
        print(f"\n{len(violations)} integrity violation(s):", file=sys.stderr)
        for v in violations:
            print(f"  ✗ {v}", file=sys.stderr)
        print(
            "\nFix the data or the claim. To accept a known discrepancy, add the path to "
            "scripts/integrity_waivers.json with a reason.",
            file=sys.stderr,
        )
        return 1

    if not args.quiet:
        print("✓ No inflated claims found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
