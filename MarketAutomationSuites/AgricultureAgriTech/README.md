# Agriculture & Agritech standalone Playwright E2E suite

This directory is a self-contained browser automation project with 10 platform-specific end-to-end workflows, form validation, authenticated navigation, and an opt-in authorization boundary check. The companion app test-data pack contains 2,000 synthetic cases across 10 modules.

Industry context: agriculture. Safety boundary: Use synthetic farm, field, equipment, weather, and crop data only. Keep all IoT and equipment integrations simulated; do not issue live machine commands or provide pesticide, agronomic, or environmental safety determinations.

## Covered E2E workflows

- Field boundary import, validation, and crop-season assignment
- Season plan baseline, activity dependencies, and revision
- Simulated equipment service schedule and inspection hold
- Synthetic sensor stream ingestion, deduplication, and outage recovery
- Mock irrigation allocation and meter reconciliation
- Input-lot receipt, hold, release, and field allocation
- Harvest work order, lot split, and storage reconciliation
- Synthetic crop traceability from field through shipment
- Resource metric lineage and synthetic reporting limitations
- Farm workspace access, partner retry, and simulation safeguards

## Run against a test tenant

Use a dedicated non-production tenant with disposable test resources and a user authorized to create the objects covered by this pack. Copy `.env.example` to `.env`, set `BASE_URL` and any tenant-specific paths, then install browser dependencies:

```sh
npm install
npx playwright install chromium
npm run typecheck
npm test
```

For authenticated applications, sign in once with a test account and save a Playwright storage state. Keep the generated file private; it contains an active session.

```sh
node -e "require('node:fs').mkdirSync('.auth', { recursive: true })"
npx playwright codegen --save-storage=.auth/state.json https://your-test-tenant.example.test
```

Set `STORAGE_STATE=.auth/state.json` in `.env`. The state file and `.env` are git-ignored. Configure `RESTRICTED_PATH` and use a separate least-privilege storage state to enable the authorization test.

## Tenant-specific accessible labels

`suite.config.ts` contains the navigation names, create actions, form labels, submit actions, and follow-on actions used by the tests. Adjust these accessible-name patterns to match the target tenant's UI/version before running the suite. The tests use browser-visible semantic roles and labels, generate unique `TEST_DATA_PREFIX` resource names, and retain traces, screenshots, video, and HTML reports on failure.

These workflows create resources in the target tenant; run them only in an isolated test environment and clean up resources with the configured `codex-e2e-` prefix after review. No real data, patient data, model payload, or credentials are included in this repository.
