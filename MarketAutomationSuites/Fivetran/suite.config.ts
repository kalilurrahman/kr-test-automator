// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Fivetran";
export const journeys = [
  {
    "title": "Source connector setup and connectivity test",
    "section": "Connectors|Sources",
    "createAction": "Add connector|New connector",
    "fields": [
      "Name",
      "Host|Server"
    ],
    "submitAction": "Save|Continue",
    "createdText": "Connector",
    "nextAction": "Test connection|Validate"
  },
  {
    "title": "Destination setup and schema isolation",
    "section": "Destinations",
    "createAction": "Add destination|New destination",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Destination",
    "nextAction": "Test connection|Validate"
  },
  {
    "title": "Initial sync and CDC progress verification",
    "section": "Connectors|Syncs",
    "createAction": "Create connector|New connector",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Connector",
    "nextAction": "Sync now|Run sync"
  },
  {
    "title": "Schema change approval and downstream reconciliation",
    "section": "Connectors|Schema changes",
    "createAction": "Review changes|New connector",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Approve",
    "createdText": "Schema|Change",
    "nextAction": "Apply|Approve"
  },
  {
    "title": "Transformation run and data test gate",
    "section": "Transformations|dbt",
    "createAction": "New transformation|Create job",
    "fields": [
      "Name",
      "Command|Selector"
    ],
    "submitAction": "Save|Create",
    "createdText": "Transformation|Job",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Orchestration workflow and retry inspection",
    "section": "Orchestration|Workflows",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Freshness alert configuration and recovery",
    "section": "Alerts|Monitoring",
    "createAction": "New alert|Create alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Test|Preview"
  },
  {
    "title": "Team access assignment and secret rotation",
    "section": "Settings|Users|Access",
    "createAction": "Invite user|Create role",
    "fields": [
      "Email|Name"
    ],
    "submitAction": "Invite|Create",
    "createdText": "User|Role",
    "nextAction": "Permissions|Roles"
  },
  {
    "title": "Failure replay and checkpoint reconciliation",
    "section": "History|Connectors|Syncs",
    "createAction": "Resync|Replay",
    "fields": [
      "Connector|Name"
    ],
    "submitAction": "Run|Confirm",
    "createdText": "Sync|Run",
    "nextAction": "Retry|Replay"
  },
  {
    "title": "Usage report generation and billing review",
    "section": "Usage|Billing",
    "createAction": "Export report|New report",
    "fields": [
      "Name|Date range"
    ],
    "submitAction": "Export|Generate",
    "createdText": "Report|Usage",
    "nextAction": "Download|Export"
  }
] as const;
