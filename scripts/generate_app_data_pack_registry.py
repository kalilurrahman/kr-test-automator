"""Generate the TypeScript registry for Python-generated test data packs."""

from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = {
    "ClaudeCode": {"id": "claudecode", "label": "Claude Code", "accent": "rose"},
    "Codex": {"id": "codex", "label": "OpenAI Codex", "accent": "indigo"},
    "GeminiAntigravity": {"id": "geminiantigravity", "label": "Gemini Antigravity", "accent": "blue"},
    "GitHubCopilot": {"id": "githubcopilot", "label": "GitHub Copilot", "accent": "cyan"},
    "Cursor": {"id": "cursor", "label": "Cursor", "accent": "violet"},
    "Windsurf": {"id": "windsurf", "label": "Windsurf", "accent": "teal"},
    "Dataiku": {"id": "dataiku", "label": "Dataiku", "accent": "amber"},
    "ApacheIceberg": {"id": "apacheiceberg", "label": "Apache Iceberg", "accent": "cyan"},
    "Medidata": {"id": "medidata", "label": "Medidata", "accent": "rose"},
    "IQVIA": {"id": "iqvia", "label": "IQVIA", "accent": "emerald"},
    "Databricks": {"id": "databricks", "label": "Databricks", "accent": "amber"},
    "SnowflakeAI": {"id": "snowflakeai", "label": "Snowflake AI", "accent": "blue"},
    "PalantirFoundryAI": {"id": "foundryai", "label": "Palantir Foundry AI", "accent": "violet"},
}


def load_manifest(root_name: str, metadata: dict):
    folder = ROOT / root_name
    manifest_path = folder / "manifest.json"
    if not manifest_path.exists():
        return None
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    modules = []
    prefix = ""
    actual_count = 0
    for module in manifest.get("modules", []):
        base = {"id": module["id"], "label": module["label"], "folder": module["folder"],
                "prefix": module["prefix"], "formats": ["csv", "json", "ts"]}
        csv_path = folder / module["folder"] / f"{module['prefix']}.csv"
        json_path = csv_path.with_suffix(".json")
        ts_path = csv_path.with_suffix(".ts")
        if not csv_path.exists() or not json_path.exists() or not ts_path.exists():
            raise FileNotFoundError(f"Missing generated CSV/JSON/TS output for {root_name}/{module['id']}")
        with csv_path.open(encoding="utf-8-sig", newline="") as stream:
            rows = list(csv.DictReader(stream))
        if len(rows) != module.get("count"):
            raise ValueError(f"Manifest count mismatch for {root_name}/{module['id']}: {len(rows)} rows")
        if rows and not prefix:
            prefix = rows[0].get("test_case_id", "").split("-", 1)[0]
        actual_count += len(rows)
        modules.append(base)
    if actual_count != manifest.get("count"):
        raise ValueError(f"Manifest count mismatch for {root_name}: {actual_count} rows")
    return {
        "folder": root_name,
        "id": metadata["id"],
        "label": metadata["label"],
        "accent": metadata["accent"],
        "idPrefix": prefix,
        "description": f"{manifest['count']:,} test cases across {len(modules)} {metadata['label']} modules.",
        "modules": modules,
        "count": manifest["count"],
    }


def main():
    packs = [load_manifest(root, metadata) for root, metadata in PACKS.items()]
    packs = [pack for pack in packs if pack]
    ids = [pack["id"] for pack in packs]
    prefixes = [pack["idPrefix"] for pack in packs]
    if len(ids) != len(set(ids)) or len(prefixes) != len(set(prefixes)):
        raise ValueError("Generated app pack IDs and test ID prefixes must be unique")

    platform_rows = []
    product_rows = []
    for pack in packs:
        platform_rows.append({
            "id": pack["id"], "label": pack["label"], "shortLabel": pack["label"],
            "description": pack["description"], "publicBase": f"/{pack['folder']}",
            "idPrefix": pack["idPrefix"], "accent": pack["accent"], "modules": pack["modules"],
        })
        product_rows.append({
            "key": pack["id"], "label": pack["label"], "shortLabel": pack["label"],
            "description": pack["description"], "route": f"/p/{pack['id']}",
            "kind": "spa", "modules": [module["label"] for module in pack["modules"]],
            "idPrefix": pack["idPrefix"], "accent": pack["accent"],
        })

    out = ROOT / "src" / "data" / "generatedDataPackRegistry.ts"
    out.write_text(
        "/* Generated from suite manifests by scripts/generate_app_data_pack_registry.py. */\n"
        'import type { PlatformDef } from "@/data/platformManifests";\n'
        'import type { ProductEntry } from "@/data/productCatalog";\n\n'
        f"export const GENERATED_DATA_PACK_PLATFORMS: PlatformDef[] = {json.dumps(platform_rows, ensure_ascii=False, indent=2)};\n\n"
        f"export const GENERATED_DATA_PACK_PRODUCTS: ProductEntry[] = {json.dumps(product_rows, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print(f"Generated {out.relative_to(ROOT)} for {len(packs)} packs.")


if __name__ == "__main__":
    main()
