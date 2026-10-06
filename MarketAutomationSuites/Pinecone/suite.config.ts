// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Pinecone";
export const journeys = [
  {
    "title": "Project and index provisioning",
    "section": "Projects|Indexes",
    "createAction": "Create project|New project",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Create index|New index"
  },
  {
    "title": "Namespace creation and vector upsert",
    "section": "Indexes|Namespaces",
    "createAction": "Create namespace|New namespace",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Namespace",
    "nextAction": "Upsert|Import vectors"
  },
  {
    "title": "Filtered similarity query and result inspection",
    "section": "Indexes|Search|Query",
    "createAction": "New query|Query vectors",
    "fields": [
      "Name|Query name"
    ],
    "submitAction": "Save|Run",
    "createdText": "Query",
    "nextAction": "Search|Run query"
  },
  {
    "title": "Hybrid search configuration and reranking",
    "section": "Search|Indexes",
    "createAction": "New search|Create configuration",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Search|Configuration",
    "nextAction": "Test|Preview"
  },
  {
    "title": "Metadata policy and tenant isolation review",
    "section": "Namespaces|Security|Metadata",
    "createAction": "New policy|Create namespace",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Policy|Namespace",
    "nextAction": "Permissions|Test"
  },
  {
    "title": "Document ingestion and checkpoint recovery",
    "section": "Integrations|Ingestion",
    "createAction": "New integration|Import data",
    "fields": [
      "Name|Source"
    ],
    "submitAction": "Create|Import",
    "createdText": "Integration|Import",
    "nextAction": "Run|Start"
  },
  {
    "title": "Snapshot restore and vector reconciliation",
    "section": "Backups|Collections",
    "createAction": "Create collection|Restore",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Restore",
    "createdText": "Collection|Restore",
    "nextAction": "Start|Confirm"
  },
  {
    "title": "API credential rotation and access check",
    "section": "Settings|API keys|Access",
    "createAction": "Create API key|New key",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Key",
    "nextAction": "Rotate|Permissions"
  },
  {
    "title": "Replica scaling and resilience observation",
    "section": "Indexes|Scaling",
    "createAction": "Edit index|Scale",
    "fields": [
      "Replicas|Capacity"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Index",
    "nextAction": "Scale|Update"
  },
  {
    "title": "Usage alert configuration and report export",
    "section": "Usage|Monitoring|Alerts",
    "createAction": "Create alert|New alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Export|Test"
  }
] as const;
