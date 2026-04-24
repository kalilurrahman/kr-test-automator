---
name: Industries Section
description: Industries page groups 36.5k scenarios under 16 parent domains; sub-industries roll up via keyword rules; all IDs resolvable via /t/:id
type: feature
---
- Data: `public/data/industry_scenarios.json` (36,500 rows: v3 + strict + incremental B21–B35) covering 281 fine-grained sub-industries.
- Domain taxonomy: `src/data/industryDomains.ts` keyword-bucket-resolves any sub-industry → 16 parent domains (Healthcare, Pharma & Life Sciences, Financial Services, Manufacturing, Energy & Utilities, Logistics & Supply Chain, Retail & Commerce, Telecom & Network, Cloud & Platform, Cybersecurity, Public Sector, Education & Research, Media & Content, Workforce & Shared Services, Edge/IoT & High Tech, Other). New batches auto-bucket via substring match.
- `/industries` (`src/pages/Industries.tsx`) renders 16 parent-domain tiles with rolled-up scenario/high/auto counts + sub-industry chips (top 6 + overflow).
- `/industries/:slug` (`src/pages/IndustryDetail.tsx`) accepts parent-domain slug (aggregates), legacy curated tile slug, OR sub-industry slug (`industry_scenarios` summary). Domain view adds a sub-industry filter dropdown.
- Generator deep link unchanged: stashes prefill in sessionStorage, navigates `/?platform=&prefill=&industry=&script=`.
- Global ID index (`src/lib/globalIndex.ts`) now ingests all 36.5k industry scenarios so `/t/:id` resolves PH-SAP-*, E2E-PHA-*, B21-* IDs. `productRoute` points to `/industries/<domain-slug>`. IndexedDB cache key bumped to `v2`.
- Master downloads on /industries: `unified_strict_e2e_final.{xlsx,csv,json,ts}`, `e2e_master_summary.csv`, `industry_stats.json`.
