# Real Estate & Facilities standalone Playwright E2E suite

This directory is a self-contained browser automation project with 10 platform-specific end-to-end workflows, form validation, authenticated navigation, and an opt-in authorization boundary check. The companion app test-data pack contains 2,000 synthetic cases across 10 modules.

Industry context: real-estate. Safety boundary: Use synthetic properties, leases, tenant profiles, and facilities data only. Do not use real personal or payment information, execute live building-control commands, or represent test workflows as safety or legal determinations.

## Covered E2E workflows

- Property hierarchy import, duplicate protection, and portfolio access
- Synthetic lease dates, renewal approvals, and unit occupancy
- Facilities work request, technician assignment, and evidence closure
- Inspection threshold, corrective action, and certificate expiry
- Synthetic space allocation, capacity conflict, and report lineage
- Meter fixture ingestion, duplicate intervals, and utility reconciliation
- Vendor qualification, mock contract expiry, and invoice retry
- Capital project change, budget reconciliation, and asset handover
- Tenant portal scope, maintenance submission, and privacy
- Portfolio access revocation, snapshot restore, and reporting

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
