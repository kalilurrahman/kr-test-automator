# Public Services standalone Playwright E2E suite

This directory is a self-contained browser automation project with 10 platform-specific end-to-end workflows, form validation, authenticated navigation, and an opt-in authorization boundary check. The companion app test-data pack contains 2,000 synthetic cases across 10 modules.

Industry context: public-sector. Safety boundary: Use synthetic resident identities and mock agency/payment endpoints only. Do not use real citizen records, contact production government systems, or make real eligibility, legal, or benefits determinations.

## Covered E2E workflows

- Accessible digital service publication and keyboard review
- Synthetic case intake, duplicate retry, and queue assignment
- Eligibility rule version, reviewer exception, and appeal
- Pseudonymous identity, consent revocation, and delegation expiry
- Appointment booking, accessible accommodation, and reschedule
- Evidence attachment, retention hold, and scoped records export
- Mock fee payment, duplicate protection, and reconciliation
- Inter-agency referral contract, redaction, and retry
- Independent appeal review, deadline, and revised outcome
- Synthetic transparency request, security scope, and audit

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
