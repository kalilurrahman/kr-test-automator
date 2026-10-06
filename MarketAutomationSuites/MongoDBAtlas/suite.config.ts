// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "MongoDB Atlas";
export const journeys = [
  {
    "title": "Project and cluster provisioning",
    "section": "Projects|Clusters",
    "createAction": "Create project|New project",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Create cluster|New cluster"
  },
  {
    "title": "Database collection creation and validation",
    "section": "Data Services|Database|Collections",
    "createAction": "Create database|New collection",
    "fields": [
      "Database name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Database|Collection",
    "nextAction": "Add collection|Create collection"
  },
  {
    "title": "Index build and query-plan verification",
    "section": "Indexes|Search",
    "createAction": "Create index|New index",
    "fields": [
      "Name|Index name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Index",
    "nextAction": "Explain|Analyze"
  },
  {
    "title": "Aggregation query execution and result reconciliation",
    "section": "Data Explorer|Collections|Query",
    "createAction": "New query|Create query",
    "fields": [
      "Name|Query name"
    ],
    "submitAction": "Save|Run",
    "createdText": "Query",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Change-stream trigger deployment and retry review",
    "section": "Triggers|App Services",
    "createAction": "Create trigger|New trigger",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Trigger",
    "nextAction": "Enable|Run"
  },
  {
    "title": "Backup restore request and restored-data verification",
    "section": "Backup|Restore",
    "createAction": "Restore|Create restore",
    "fields": [
      "Name|Target name"
    ],
    "submitAction": "Restore|Create",
    "createdText": "Restore",
    "nextAction": "Start|Confirm"
  },
  {
    "title": "Network access rule and client connectivity",
    "section": "Security|Network access",
    "createAction": "Add IP address|New private endpoint",
    "fields": [
      "IP address|Name"
    ],
    "submitAction": "Save|Add",
    "createdText": "Network|Access",
    "nextAction": "Validate|Test connection"
  },
  {
    "title": "Data classification and audit export",
    "section": "Governance|Data Explorer|Audit",
    "createAction": "Classify data|New policy",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Policy|Classification",
    "nextAction": "Export audit|View audit"
  },
  {
    "title": "Application service authentication and tenant isolation",
    "section": "App Services|Applications",
    "createAction": "Create app|New application",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Application",
    "nextAction": "Rules|Permissions"
  },
  {
    "title": "Performance alert and query diagnostics",
    "section": "Monitoring|Alerts",
    "createAction": "Create alert|New alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Test|Metrics"
  }
] as const;
