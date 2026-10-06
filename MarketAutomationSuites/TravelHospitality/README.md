# Travel & Hospitality standalone Playwright E2E suite

This directory is a self-contained browser automation project with 10 platform-specific end-to-end workflows, form validation, authenticated navigation, and an opt-in authorization boundary check. The companion app test-data pack contains 2,000 synthetic cases across 10 modules.

Industry context: travel-hospitality. Safety boundary: Use synthetic travelers, reservations, properties, and mock payment or booking services. Do not contact live booking channels or charge real payment instruments; do not use real traveler personal data.

## Covered E2E workflows

- Availability search, competing holds, and expiry release
- Reservation itinerary creation, modification, and cancellation
- Promotion eligibility, quote calculation, and final total
- Pseudonymous traveler profile, consent, and data deletion
- Guest check-in, room assignment, and service ticket
- Mock payment authorization, idempotent capture, and refund
- Loyalty enrollment, points accrual, and cancellation reversal
- Channel reservation import and partner reconciliation
- Disruption rebooking, alternative inventory, and notification
- Occupancy analytics, tenant scope, and privacy checks

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
