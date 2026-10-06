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
    "MicrosoftFabric": {"id": "microsoftfabric", "label": "Microsoft Fabric", "accent": "blue", "automationSuiteUrl": "/market-automation-suites/microsoftfabric-playwright-e2e.zip"},
    "dbt": {"id": "dbt", "label": "dbt", "accent": "amber", "automationSuiteUrl": "/market-automation-suites/dbt-playwright-e2e.zip"},
    "Confluent": {"id": "confluentcloud", "label": "Confluent Cloud", "accent": "cyan", "automationSuiteUrl": "/market-automation-suites/confluentcloud-playwright-e2e.zip"},
    "MongoDBAtlas": {"id": "mongodb-atlas", "label": "MongoDB Atlas", "accent": "emerald", "automationSuiteUrl": "/market-automation-suites/mongodb-atlas-playwright-e2e.zip"},
    "Fivetran": {"id": "fivetran", "label": "Fivetran", "accent": "violet", "automationSuiteUrl": "/market-automation-suites/fivetran-playwright-e2e.zip"},
    "SupabasePlatform": {"id": "supabase-platform", "label": "Supabase", "accent": "emerald", "automationSuiteUrl": "/market-automation-suites/supabase-platform-playwright-e2e.zip"},
    "Vercel": {"id": "vercel", "label": "Vercel", "accent": "indigo", "automationSuiteUrl": "/market-automation-suites/vercel-playwright-e2e.zip"},
    "LangSmith": {"id": "langsmith", "label": "LangChain and LangSmith", "accent": "violet", "automationSuiteUrl": "/market-automation-suites/langsmith-playwright-e2e.zip"},
    "Pinecone": {"id": "pinecone", "label": "Pinecone", "accent": "teal", "automationSuiteUrl": "/market-automation-suites/pinecone-playwright-e2e.zip"},
    "HuggingFaceHub": {"id": "huggingfacehub", "label": "Hugging Face Hub", "accent": "amber", "automationSuiteUrl": "/market-automation-suites/huggingfacehub-playwright-e2e.zip"},
    "Airbyte": {"id": "airbyte", "label": "Airbyte", "accent": "cyan", "automationSuiteUrl": "/market-automation-suites/airbyte-playwright-e2e.zip"},
    "ApacheAirflow": {"id": "apacheairflow", "label": "Apache Airflow", "accent": "blue", "automationSuiteUrl": "/market-automation-suites/apacheairflow-playwright-e2e.zip"},
    "Prefect": {"id": "prefect", "label": "Prefect", "accent": "violet", "automationSuiteUrl": "/market-automation-suites/prefect-playwright-e2e.zip"},
    "Dagster": {"id": "dagster", "label": "Dagster", "accent": "teal", "automationSuiteUrl": "/market-automation-suites/dagster-playwright-e2e.zip"},
    "N8n": {"id": "n8n", "label": "n8n", "accent": "amber", "automationSuiteUrl": "/market-automation-suites/n8n-playwright-e2e.zip"},
    "CrewAI": {"id": "crewai", "label": "CrewAI", "accent": "amber", "automationSuiteUrl": "/market-automation-suites/crewai-playwright-e2e.zip"},
    "Shopify": {"id": "shopify", "label": "Shopify", "accent": "emerald", "automationSuiteUrl": "/market-automation-suites/shopify-playwright-e2e.zip"},
    "Stripe": {"id": "stripe", "label": "Stripe", "accent": "indigo", "automationSuiteUrl": "/market-automation-suites/stripe-playwright-e2e.zip"},
    "PharmaGxP": {"id": "phamagxp", "label": "Pharma GxP", "accent": "violet", "industryDomain": "pharma-life-sciences", "description": "GxP product lifecycle, batch genealogy, deviations, validation evidence, laboratory, release, and safety workflows.", "automationSuiteUrl": "/market-automation-suites/phamagxp-playwright-e2e.zip"},
    "MedTech": {"id": "medtech", "label": "MedTech Device Lifecycle", "accent": "rose", "industryDomain": "medical-devices", "description": "Device design controls, risk traceability, verification, complaints, field actions, manufacturing history, and supplier quality.", "automationSuiteUrl": "/market-automation-suites/medtech-playwright-e2e.zip"},
    "HealthcareOps": {"id": "healthcare-operations", "label": "Healthcare Operations", "accent": "rose", "industryDomain": "healthcare", "description": "Synthetic patient access, EHR interfaces, scheduling, claims, care coordination, laboratory exchange, consent, and resilience.", "automationSuiteUrl": "/market-automation-suites/healthcare-operations-playwright-e2e.zip"},
    "ManufacturingMES": {"id": "manufacturing-mes", "label": "Manufacturing MES", "accent": "amber", "industryDomain": "manufacturing", "description": "Production dispatch, shop-floor execution, inspection, OEE, material traceability, maintenance, and ERP/MES integration.", "automationSuiteUrl": "/market-automation-suites/manufacturing-mes-playwright-e2e.zip"},
    "DefenseSystems": {"id": "defense-systems", "label": "Defense Program Systems", "accent": "indigo", "industryDomain": "defense", "description": "Unclassified synthetic configuration, requirements traceability, supplier provenance, maintenance readiness, and audit workflows.", "automationSuiteUrl": "/market-automation-suites/defense-systems-playwright-e2e.zip"},
    "IndustrialAutomation": {"id": "industrial-automation", "label": "Industrial Automation and OT", "accent": "teal", "industryDomain": "industrial-automation", "description": "Digital-twin asset inventory, virtual PLC/HMI, alarms, historian events, simulated interlocks, and recovery workflows.", "automationSuiteUrl": "/market-automation-suites/industrial-automation-playwright-e2e.zip"},
    "CPGOperations": {"id": "cpg-operations", "label": "CPG and Consumer Goods", "accent": "amber", "industryDomain": "cpg", "description": "Product and packaging data, demand, trade promotions, retail execution, lot traceability, quality, and fulfillment.", "automationSuiteUrl": "/market-automation-suites/cpg-operations-playwright-e2e.zip"},
    "EnergyUtilities": {"id": "energy-utilities", "label": "Energy and Utilities Operations", "accent": "amber", "industryDomain": "energy-utilities", "description": "Synthetic metering, outage management, field work, asset maintenance, billing, distributed resources, and settlement.", "automationSuiteUrl": "/market-automation-suites/energy-utilities-playwright-e2e.zip"},
    "InsuranceSuite": {"id": "insurance-suite", "label": "Insurance Operations", "accent": "cyan", "industryDomain": "insurance", "description": "Policy administration, underwriting, claims, adjudication, payments, broker channels, reinsurance, and mock screening.", "automationSuiteUrl": "/market-automation-suites/insurance-suite-playwright-e2e.zip"},
    "FinancialServices": {"id": "financial-services", "label": "Financial Services Core", "accent": "indigo", "industryDomain": "financial-services", "description": "Synthetic account lifecycle, payments, ledger, lending, treasury, risk limits, AML/KYC mocks, and reporting.", "automationSuiteUrl": "/market-automation-suites/financial-services-playwright-e2e.zip"},
    "Aerospace": {"id": "aerospace", "label": "Aerospace and MRO", "accent": "blue", "industryDomain": "aerospace", "description": "Configuration baselines, engineering changes, MRO planning, controlled records, parts traceability, and offline simulation.", "automationSuiteUrl": "/market-automation-suites/aerospace-playwright-e2e.zip"},
    "LogisticsSupplyChain": {"id": "logistics-supply-chain", "label": "Logistics and Supply Chain", "accent": "amber", "industryDomain": "logistics-supply-chain", "description": "Transport planning, warehouse execution, carrier EDI, inventory visibility, tracking, returns, and supply planning.", "automationSuiteUrl": "/market-automation-suites/logistics-supply-chain-playwright-e2e.zip"},
    "AutomotiveMobility": {"id": "automotive-mobility", "label": "Automotive & Mobility", "accent": "rose", "industryDomain": "automotive", "description": "Vehicle programs, software update simulation, dealer operations, fleet mobility, charging, supplier traceability, and service workflows.", "automationSuiteUrl": "/market-automation-suites/automotive-mobility-playwright-e2e.zip"},
    "ConstructionAEC": {"id": "construction-aec", "label": "Construction & AEC", "accent": "amber", "industryDomain": "construction", "description": "BIM coordination, design reviews, project controls, site execution, quality inspections, submittals, and handover.", "automationSuiteUrl": "/market-automation-suites/construction-aec-playwright-e2e.zip"},
    "TravelHospitality": {"id": "travel-hospitality", "label": "Travel & Hospitality", "accent": "cyan", "industryDomain": "travel-hospitality", "description": "Availability, reservations, pricing, guest services, payment mocks, loyalty, channel distribution, and disruption recovery.", "automationSuiteUrl": "/market-automation-suites/travel-hospitality-playwright-e2e.zip"},
    "AgricultureAgriTech": {"id": "agriculture-agritech", "label": "Agriculture & Agritech", "accent": "lime", "industryDomain": "agriculture", "description": "Farm and field planning, simulated sensors, equipment maintenance, input inventory, harvest traceability, and reporting.", "automationSuiteUrl": "/market-automation-suites/agriculture-agritech-playwright-e2e.zip"},
    "TelecomNetworkOps": {"id": "telecom-network-ops", "label": "Telecom Network Operations", "accent": "blue", "industryDomain": "telecom-network", "description": "Service orchestration, simulated network inventory, usage rating, assurance, partner interfaces, change, and resilience.", "automationSuiteUrl": "/market-automation-suites/telecom-network-ops-playwright-e2e.zip"},
    "PublicServices": {"id": "public-services", "label": "Public Services", "accent": "indigo", "industryDomain": "public-sector", "description": "Accessible digital services, synthetic case intake, eligibility workflow, records, payment mocks, appeals, and inter-agency exchange.", "automationSuiteUrl": "/market-automation-suites/public-services-playwright-e2e.zip"},
    "EducationResearch": {"id": "education-research", "label": "Education & Research Systems", "accent": "violet", "industryDomain": "education-research", "description": "Admissions, learner records, accessible learning, assessments, grants, lab assets, reproducible data, and publication workflows.", "automationSuiteUrl": "/market-automation-suites/education-research-playwright-e2e.zip"},
    "MediaEntertainment": {"id": "media-entertainment", "label": "Media & Entertainment", "accent": "violet", "industryDomain": "media-content", "description": "Content ingest, editorial, rights, production, media delivery, publishing, subscriptions, accessibility, and analytics.", "automationSuiteUrl": "/market-automation-suites/media-entertainment-playwright-e2e.zip"},
    "RealEstateFacilities": {"id": "real-estate-facilities", "label": "Real Estate & Facilities", "accent": "teal", "industryDomain": "real-estate", "description": "Property portfolios, leasing, facilities work orders, inspections, occupancy, utilities, vendors, and capital projects.", "automationSuiteUrl": "/market-automation-suites/real-estate-facilities-playwright-e2e.zip"},
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
        "industryDomain": metadata.get("industryDomain", manifest.get("industryDomain")),
        "automationSuiteUrl": metadata.get("automationSuiteUrl"),
        "idPrefix": prefix,
        "description": metadata.get("description") or f"{manifest['count']:,} test cases across {len(modules)} {metadata['label']} modules.",
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
            **({"industryDomain": pack["industryDomain"]} if pack.get("industryDomain") else {}),
            **({"automationSuiteUrl": pack["automationSuiteUrl"]} if pack.get("automationSuiteUrl") else {}),
        })
        product_rows.append({
            "key": pack["id"], "label": pack["label"], "shortLabel": pack["label"],
            "description": pack["description"], "route": f"/p/{pack['id']}",
            "kind": "spa", "modules": [module["label"] for module in pack["modules"]],
            "idPrefix": pack["idPrefix"], "accent": pack["accent"],
            **({"industryDomain": pack["industryDomain"]} if pack.get("industryDomain") else {}),
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
