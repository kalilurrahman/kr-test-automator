---
name: Industries Section
description: 120-industry hub backed by 12k strict E2E scenarios at /industries with per-industry detail and generator prefill
type: feature
---
- Data: `public/data/industry_scenarios.json` holds 12,000 strict E2E rows (120 industries, ~7 MB trimmed). Stats: `industry_stats.json`.
- Master downloads on /industries: `unified_strict_e2e_final.{xlsx,csv,json,ts}`, `e2e_master_summary.csv`, plus pre-strict working set (`unified_master_current.*`).
- Each scenario validated to span ≥3 stages, ≥2 systems, with downstream outcome (strict E2E rules).
- Tile metadata in `src/data/industryMeta.ts`; loader/index in `src/data/industryScenarios.ts` (lazy fetch, cached).
- Routes: `/industries` (grid) and `/industries/:slug` (detail with filter, script-type picker, Generate→`/?platform=&prefill=&industry=&script=` + sessionStorage prose blob).
- Dashboard pulls top-12 industry tiles + script-type/language counts from same index.
- Automation script catalogue: `AUTOMATION_SCRIPT_OPTIONS` (12 frameworks: Tosca, Playwright TS/PY, Cypress, Selenium Java/PY/CS, Robot, Katalon, UFT, Postman/Newman, Appium).
