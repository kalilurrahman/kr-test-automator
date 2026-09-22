# Integrate new AI product test cases

## Scope
- Import the uploaded 5,000-case combined dataset as the canonical source, using the individual JSON files and ZIP contents for consistency checks only.
- Deduplicate by test-case ID and preserve the existing product, industry, SAP, Salesforce, generator-prefill, and strict E2E behavior.
- Add or refresh catalogue entries for Claude Code, Codex, Databricks, Snowflake, and Palantir Foundry with their uploaded module sets and accurate counts.
- Make every imported case searchable, viewable, and deep-linkable to the generator in the same experience as existing products.
- Add downloadable JSON/CSV bundles for the new product collection and update visible overall/product totals where the app currently reports them.

## Implementation
- Store the canonical JSON and CSV under a dedicated public data folder so large files load only on demand.
- Extend the platform catalogue/manifest and product-family mapping for the five products without changing existing product behavior.
- Extend the global precomputed index and full-case resolver to ingest the uploaded JSON schema, normalize fields, and resolve the new ID prefixes (`CC`, `COD`, `DBX`, `SF`, `PF`) safely. Snowflake’s `SF` IDs will use exact indexed lookup to avoid changing Salesforce routing.
- Update download metadata and project documentation/count copy only where required by the new data.
- Increment the client index cache version so returning visitors receive the refreshed index.

## Verification and release
- Validate JSON schema, exact product counts, and duplicate removal.
- Test representative IDs from all five products through search, detail view, and generator prefill.
- Run lint, type checks/tests, and the production build; inspect the responsive pages for regressions.
- Publish the verified build to the existing live site.
