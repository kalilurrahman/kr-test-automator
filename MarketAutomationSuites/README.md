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

## Why these products

- **Data platforms:** Microsoft Fabric, dbt, Confluent Cloud, MongoDB Atlas, and Fivetran extend the catalog across analytics, transformation, streaming, operational databases, and ingestion. Microsoft's 2025 earnings commentary described Fabric adoption as accelerating; dbt Labs' 2025 analytics engineering report documents the shift toward AI-enabled analytics workflows; Confluent's annual report describes cross-enterprise streaming use cases; MongoDB cites production AI adoption in its survey material; and Fivetran's enterprise report highlights data readiness for AI.
- **Developer and AI platforms:** Supabase, Vercel, LangChain/LangSmith, Pinecone, and Hugging Face Hub cover application backends, deployment and AI inference routing, agent observability, vector retrieval, and model/data distribution. Vercel reported more than 3 million AI SDK weekly downloads in 2025; Hugging Face reported over 2 million public models, 500,000 public datasets, and 1 million Spaces; G2 included Pinecone on its 2025 fastest-growing software list; and LangChain's agent engineering survey describes agent use moving into production.

Sources: [Microsoft FY25 Q2 earnings](https://www.microsoft.com/en-us/investor/events/fy-2025/earnings-fy-2025-q2), [dbt Labs State of Analytics Engineering 2025](https://www.getdbt.com/resources/state-of-analytics-engineering-2025), [Confluent 2025 annual report](https://www.sec.gov/Archives/edgar/data/1699838/000169983826000006/cflt-20251231.htm), [MongoDB AI-in-production survey](https://www.mongodb.com/resources/solutions/use-cases/retool-2024-state-of-ai-in-production), [Fivetran enterprise data report](https://www.fivetran.com/press/fivetran-report-finds-enterprises-racing-toward-ai-without-the-data-to-support-it), [Vercel AI SDK growth](https://vercel.com/blog/series-f), [Hugging Face Hub scale](https://huggingface.co/blog/huggingface-hub-v1), [G2 fastest-growing products](https://www.g2.com/best-software-companies/2025/fastest-growing), and [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering).

Run any suite independently by following its README. Each targets a non-production product tenant and requires tenant-specific accessible-name patterns in `suite.config.ts`. The app-facing CSV, JSON, and TypeScript cases are regenerated with `npm run generate:app-data`.
