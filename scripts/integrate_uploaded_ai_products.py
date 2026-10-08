"""Register original uploaded AI cases additively without modifying generated suites."""
import csv
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/data/ai-products/ai_products_5000_test_cases.json"
PRODUCTS = {
    "Claude Code": ("claudecode", "ClaudeCode"),
    "Codex": ("codex", "Codex"),
    "Databricks": ("databricks", "Databricks"),
    "Snowflake": ("snowflakeai", "SnowflakeAI"),
    "Palantir Foundry": ("foundryai", "PalantirFoundryAI"),
}


def main():
    rows = json.loads(SOURCE.read_text())
    assert len(rows) == 5000 and len({r["test_case_id"] for r in rows}) == 5000
    grouped = defaultdict(list)
    for row in rows:
        grouped[(row["product"], row["module"])].append(row)
    modules = defaultdict(list)
    manifest = []
    for (product, label), cases in grouped.items():
        key, folder = PRODUCTS[product]
        slug = "uploaded_" + re.sub(r"[^a-z0-9]+", "_", label.lower()).strip("_")
        prefix = slug + "_cases"
        out = ROOT / "public" / folder / slug
        out.mkdir(parents=True, exist_ok=True)
        with (out / f"{prefix}.csv").open("w", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=list(cases[0]))
            writer.writeheader()
            writer.writerows(cases)
        (out / f"{prefix}.json").write_text(json.dumps(cases, ensure_ascii=False))
        module = {"id": slug, "label": label, "folder": slug, "prefix": prefix, "formats": ["csv", "json"]}
        modules[key].append(module)
        manifest.append({"source": key, "product": product, "publicBase": f"/{folder}", "module": module, "count": len(cases)})
    (ROOT / "public/data/ai-products/uploaded-modules.json").write_text(json.dumps(manifest, indent=2))
    (ROOT / "src/data/uploaded-ai-product-modules.ts").write_text(
        'import type { PlatformModule } from "@/data/platformManifests";\n\n'
        'export const UPLOADED_AI_PRODUCT_MODULES: Record<string, PlatformModule[]> = '
        + json.dumps(dict(modules), indent=2) + ';\n'
    )
    print(f"Preserved {len(rows)} uploaded IDs in {len(manifest)} additive modules.")


if __name__ == "__main__":
    main()