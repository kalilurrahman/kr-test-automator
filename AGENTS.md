# Architecture rules

- Preserve uploaded AI-product cases as an additive collection with separate module paths; generated suites must never overwrite user-provided IDs or content.
- Ingest uploaded AI-product modules before generated modules in both static and runtime indexes so uploaded content wins exact-ID collisions.
- Normalize CSV field aliases at the shared cache boundary so repositories, search, and generator prefills consume the same canonical fields.
- Resolve exact indexed case ownership before prefix guesses and hydrate only the owning module whenever possible; Snowflake and Salesforce share a prefix.
- Dashboard charts report catalogue coverage, not execution outcomes; derive all figures from shipped data and never fabricate pass rates or trends.
- Use the public web manifest as the single installation metadata source in development and production, and version icon URLs when the artwork changes to avoid stale launcher branding.
- Derive favicon, launcher icons, maskable icons, and downloadable brand assets from one vector mark so every size preserves the same identity.
- Home product discovery uses the shared product catalogue and family taxonomy so its links and grouping stay aligned with product repositories.