# Architecture rules

- Preserve uploaded AI-product cases as an additive collection with separate module paths; generated suites must never overwrite user-provided IDs or content.
- Normalize CSV field aliases at the shared cache boundary so repositories, search, and generator prefills consume the same canonical fields.
- Resolve exact indexed case ownership before prefix guesses and hydrate only the owning module whenever possible; Snowflake and Salesforce share a prefix.
- Dashboard charts report catalogue coverage, not execution outcomes; derive all figures from shipped data and never fabricate pass rates or trends.