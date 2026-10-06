// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Microsoft Fabric";
export const journeys = [
  {
    "title": "Workspace provisioning and role boundary",
    "section": "Workspaces",
    "createAction": "New workspace|Create workspace",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workspace",
    "nextAction": "Open workspace|View workspace"
  },
  {
    "title": "OneLake shortcut creation and source validation",
    "section": "OneLake|Lakehouse",
    "createAction": "New shortcut|Create shortcut",
    "fields": [
      "Name",
      "Path|URL"
    ],
    "submitAction": "Create|Save",
    "createdText": "Shortcut",
    "nextAction": "Validate|Test connection"
  },
  {
    "title": "Pipeline authoring, execution, and run history",
    "section": "Data Factory|Pipelines",
    "createAction": "New pipeline|Create pipeline",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Pipeline",
    "nextAction": "Run|Run now"
  },
  {
    "title": "Lakehouse table publication and schema review",
    "section": "Lakehouse",
    "createAction": "New table|Create table|Upload",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save|Upload",
    "createdText": "Table",
    "nextAction": "Schema|Columns"
  },
  {
    "title": "Warehouse query execution and history inspection",
    "section": "Warehouse|SQL",
    "createAction": "New query|Create warehouse",
    "fields": [
      "Name|Query name"
    ],
    "submitAction": "Save|Run",
    "createdText": "Query|Warehouse",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Semantic model refresh and report binding",
    "section": "Semantic models|Datasets|Models",
    "createAction": "New semantic model|Create model",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save|Publish",
    "createdText": "Model",
    "nextAction": "Refresh|Run refresh"
  },
  {
    "title": "Eventhouse ingestion and real-time query",
    "section": "Real-Time Intelligence|Eventhouse",
    "createAction": "New eventhouse|Create database",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Eventhouse|Database",
    "nextAction": "Ingest|Run query"
  },
  {
    "title": "Model training run and candidate registration",
    "section": "Data Science|Experiments|Models",
    "createAction": "New experiment|Create model",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Experiment|Model",
    "nextAction": "Run|Train"
  },
  {
    "title": "Catalog classification and lineage inspection",
    "section": "Catalog|OneLake catalog|Governance",
    "createAction": "New classification|Classify",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Classification|Lineage",
    "nextAction": "View lineage|Lineage"
  },
  {
    "title": "Capacity alert configuration and event review",
    "section": "Capacity|Monitoring",
    "createAction": "New alert|Create alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Test|View activity"
  }
] as const;
