// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Confluent Cloud";
export const journeys = [
  {
    "title": "Cluster provisioning and scoped access",
    "section": "Environments|Clusters",
    "createAction": "Create cluster|New cluster",
    "fields": [
      "Name",
      "Region"
    ],
    "submitAction": "Create|Provision",
    "createdText": "Cluster",
    "nextAction": "Overview|Settings"
  },
  {
    "title": "Topic lifecycle and retention validation",
    "section": "Topics",
    "createAction": "Create topic|New topic",
    "fields": [
      "Topic name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Topic",
    "nextAction": "Configuration|Settings"
  },
  {
    "title": "Schema registration and compatibility check",
    "section": "Schemas|Schema Registry",
    "createAction": "Register schema|New schema",
    "fields": [
      "Subject|Name",
      "Schema"
    ],
    "submitAction": "Register|Save",
    "createdText": "Schema",
    "nextAction": "Compatibility|Validate"
  },
  {
    "title": "Source connector deployment and sync inspection",
    "section": "Connectors",
    "createAction": "Add connector|Create connector",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Launch",
    "createdText": "Connector",
    "nextAction": "Start|Run"
  },
  {
    "title": "Producer-consumer flow and offset verification",
    "section": "Consumer groups|Topics",
    "createAction": "Create consumer group|New client",
    "fields": [
      "Name|Group ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Consumer group|Client",
    "nextAction": "Offsets|Messages"
  },
  {
    "title": "Flink statement deployment and checkpoint review",
    "section": "Flink|Stream processing",
    "createAction": "New statement|Create statement",
    "fields": [
      "Name|Statement name",
      "SQL|Statement"
    ],
    "submitAction": "Create|Run",
    "createdText": "Statement",
    "nextAction": "Run|Submit"
  },
  {
    "title": "Data contract approval and lineage inspection",
    "section": "Governance|Catalog|Data contracts",
    "createAction": "New contract|Create contract",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Contract",
    "nextAction": "Lineage|View lineage"
  },
  {
    "title": "Service-account role assignment and audit review",
    "section": "Security|Access|Accounts",
    "createAction": "Create service account|New account",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Account",
    "nextAction": "Roles|Permissions"
  },
  {
    "title": "Cluster link creation and recovery validation",
    "section": "Cluster links|Disaster recovery",
    "createAction": "Create cluster link|New link",
    "fields": [
      "Name",
      "Destination"
    ],
    "submitAction": "Create|Save",
    "createdText": "Link",
    "nextAction": "Replicate|Start"
  },
  {
    "title": "Lag alert configuration and notification review",
    "section": "Metrics|Alerts|Monitoring",
    "createAction": "Create alert|New alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Test|Preview"
  }
] as const;
