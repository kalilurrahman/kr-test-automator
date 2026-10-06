# Market-leading platform automation suites

This set extends the existing product catalog with data engineering, developer platform, and AI application products that are gaining adoption. Each platform pack has 2,000 structured synthetic cases across ten modules. Each matching Playwright project is independently installable and contains ten product-specific end-to-end workflows, input validation, session/navigation checks, and an opt-in authorization boundary check.

| Product | App pack | Standalone suite |
| --- | --- | --- |
| Microsoft Fabric | [`MicrosoftFabric/manifest.json`](../MicrosoftFabric/manifest.json) | [`MarketAutomationSuites/MicrosoftFabric/README.md`](./MicrosoftFabric/README.md) |
| dbt | [`dbt/manifest.json`](../dbt/manifest.json) | [`MarketAutomationSuites/dbt/README.md`](./dbt/README.md) |
| Confluent Cloud | [`Confluent/manifest.json`](../Confluent/manifest.json) | [`MarketAutomationSuites/Confluent/README.md`](./Confluent/README.md) |
| MongoDB Atlas | [`MongoDBAtlas/manifest.json`](../MongoDBAtlas/manifest.json) | [`MarketAutomationSuites/MongoDBAtlas/README.md`](./MongoDBAtlas/README.md) |
| Fivetran | [`Fivetran/manifest.json`](../Fivetran/manifest.json) | [`MarketAutomationSuites/Fivetran/README.md`](./Fivetran/README.md) |
| Supabase | [`SupabasePlatform/manifest.json`](../SupabasePlatform/manifest.json) | [`MarketAutomationSuites/SupabasePlatform/README.md`](./SupabasePlatform/README.md) |
| Vercel | [`Vercel/manifest.json`](../Vercel/manifest.json) | [`MarketAutomationSuites/Vercel/README.md`](./Vercel/README.md) |
| LangChain and LangSmith | [`LangSmith/manifest.json`](../LangSmith/manifest.json) | [`MarketAutomationSuites/LangSmith/README.md`](./LangSmith/README.md) |
| Pinecone | [`Pinecone/manifest.json`](../Pinecone/manifest.json) | [`MarketAutomationSuites/Pinecone/README.md`](./Pinecone/README.md) |
| Hugging Face Hub | [`HuggingFaceHub/manifest.json`](../HuggingFaceHub/manifest.json) | [`MarketAutomationSuites/HuggingFaceHub/README.md`](./HuggingFaceHub/README.md) |
| Airbyte | [`Airbyte/manifest.json`](../Airbyte/manifest.json) | [`MarketAutomationSuites/Airbyte/README.md`](./Airbyte/README.md) |
| Apache Airflow | [`ApacheAirflow/manifest.json`](../ApacheAirflow/manifest.json) | [`MarketAutomationSuites/ApacheAirflow/README.md`](./ApacheAirflow/README.md) |
| Prefect | [`Prefect/manifest.json`](../Prefect/manifest.json) | [`MarketAutomationSuites/Prefect/README.md`](./Prefect/README.md) |
| Dagster | [`Dagster/manifest.json`](../Dagster/manifest.json) | [`MarketAutomationSuites/Dagster/README.md`](./Dagster/README.md) |
| n8n | [`N8n/manifest.json`](../N8n/manifest.json) | [`MarketAutomationSuites/N8n/README.md`](./N8n/README.md) |
| CrewAI | [`CrewAI/manifest.json`](../CrewAI/manifest.json) | [`MarketAutomationSuites/CrewAI/README.md`](./CrewAI/README.md) |
| Shopify | [`Shopify/manifest.json`](../Shopify/manifest.json) | [`MarketAutomationSuites/Shopify/README.md`](./Shopify/README.md) |
| Stripe | [`Stripe/manifest.json`](../Stripe/manifest.json) | [`MarketAutomationSuites/Stripe/README.md`](./Stripe/README.md) |

## Why these products

- **Data platforms:** Microsoft Fabric, dbt, Confluent Cloud, MongoDB Atlas, and Fivetran extend the catalog across analytics, transformation, streaming, operational databases, and ingestion. Microsoft's 2025 earnings commentary described Fabric adoption as accelerating; dbt Labs' 2025 analytics engineering report documents the shift toward AI-enabled analytics workflows; Confluent's annual report describes cross-enterprise streaming use cases; MongoDB cites production AI adoption in its survey material; and Fivetran's enterprise report highlights data readiness for AI.
- **Developer and AI platforms:** Supabase, Vercel, LangChain/LangSmith, Pinecone, and Hugging Face Hub cover application backends, deployment and AI inference routing, agent observability, vector retrieval, and model/data distribution. Vercel reported more than 3 million AI SDK weekly downloads in 2025; Hugging Face reported over 2 million public models, 500,000 public datasets, and 1 million Spaces; G2 included Pinecone on its 2025 fastest-growing software list; and LangChain's agent engineering survey describes agent use moving into production.
- **Orchestration and data movement:** Airbyte, Apache Airflow, Prefect, and Dagster add connector syncs, workflow scheduling, asset lineage, backfills, retries, and worker recovery.
- **AI workflows and digital commerce:** n8n and CrewAI add event-driven workflows, agent tools, approvals, guardrails, traces, and evaluations; Shopify and Stripe add catalog, inventory, checkout, billing, payments, refunds, risk, and webhook flows.

Sources: [Microsoft FY25 Q2 earnings](https://www.microsoft.com/en-us/investor/events/fy-2025/earnings-fy-2025-q2), [dbt Labs State of Analytics Engineering 2025](https://www.getdbt.com/resources/state-of-analytics-engineering-2025), [Confluent 2025 annual report](https://www.sec.gov/Archives/edgar/data/1699838/000169983826000006/cflt-20251231.htm), [MongoDB AI-in-production survey](https://www.mongodb.com/resources/solutions/use-cases/retool-2024-state-of-ai-in-production), [Fivetran enterprise data report](https://www.fivetran.com/press/fivetran-report-finds-enterprises-racing-toward-ai-without-the-data-to-support-it), [Vercel AI SDK growth](https://vercel.com/blog/series-f), [Hugging Face Hub scale](https://huggingface.co/blog/huggingface-hub-v1), [G2 fastest-growing products](https://www.g2.com/best-software-companies/2025/fastest-growing), [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering), [Airbyte platform docs](https://docs.airbyte.com/platform), [Apache Airflow tutorials](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/), [Prefect flow tutorials](https://docs.prefect.io/latest/tutorial/flows), [Dagster asset docs](https://docs.dagster.io/guides/build/assets/defining-assets), [n8n 2026 AI agent tooling report](https://n8n.io/reports/2026-ai-agent-development-tools/), [CrewAI 2026 agent survey](https://crewai.com/blog/the-state-of-agentic-ai-in-2026), and [Shopify 2025 annual report](https://www.sec.gov/Archives/edgar/data/1594805/000159480526000011/shop-20251231.htm).

Run any suite independently by following its README. Each targets a non-production product tenant and requires tenant-specific accessible-name patterns in `suite.config.ts`. The app-facing CSV, JSON, and TypeScript cases are regenerated with `npm run generate:app-data`.
