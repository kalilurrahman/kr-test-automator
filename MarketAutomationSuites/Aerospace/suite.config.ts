// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Aerospace and MRO";
export const industryDomain = "aerospace";
export const journeys = [
  {
    "title": "Aircraft configuration baseline and part trace",
    "section": "Configuration|BOM",
    "createAction": "New baseline|Create configuration",
    "fields": [
      "Asset ID",
      "Revision"
    ],
    "submitAction": "Create|Save",
    "createdText": "Baseline",
    "nextAction": "Parts|Traceability"
  },
  {
    "title": "Engineering change impact and release gate",
    "section": "Engineering|Changes",
    "createAction": "New change|Create request",
    "fields": [
      "Change ID",
      "Description"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Change request",
    "nextAction": "Impact|Approve"
  },
  {
    "title": "MRO visit work package and task sequencing",
    "section": "Maintenance|MRO|Visits",
    "createAction": "New visit|Create work package",
    "fields": [
      "Visit ID",
      "Asset ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Visit",
    "nextAction": "Work cards|Sequence"
  },
  {
    "title": "Airworthiness record assembly and signoff",
    "section": "Records|Airworthiness",
    "createAction": "New record|Create package",
    "fields": [
      "Asset ID",
      "Record type"
    ],
    "submitAction": "Create|Save",
    "createdText": "Record package",
    "nextAction": "Review|Sign off"
  },
  {
    "title": "Serialized part receipt and supplier genealogy",
    "section": "Parts|Inventory|Suppliers",
    "createAction": "Receive part|New receipt",
    "fields": [
      "Part ID",
      "Serial ID"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Part",
    "nextAction": "Genealogy|Release"
  },
  {
    "title": "Quality finding investigation and corrective action",
    "section": "Quality|Safety",
    "createAction": "New finding|Create event",
    "fields": [
      "Finding ID",
      "Asset ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Finding",
    "nextAction": "Investigation|Actions"
  },
  {
    "title": "Assembly instruction revision and component install",
    "section": "Manufacturing|Assembly",
    "createAction": "New work order|Start assembly",
    "fields": [
      "Work order ID",
      "Configuration"
    ],
    "submitAction": "Create|Start",
    "createdText": "Work order",
    "nextAction": "Components|Inspection"
  },
  {
    "title": "Offline synthetic flight-test data validation",
    "section": "Test|Simulation|Telemetry",
    "createAction": "New test run|Import data",
    "fields": [
      "Run ID",
      "Configuration"
    ],
    "submitAction": "Create|Import",
    "createdText": "Test run",
    "nextAction": "Validate|Metrics"
  },
  {
    "title": "Service bulletin scope and fleet reconciliation",
    "section": "Fleet|Service Bulletins",
    "createAction": "New bulletin|Create bulletin",
    "fields": [
      "Bulletin ID",
      "Part or model"
    ],
    "submitAction": "Create|Save",
    "createdText": "Bulletin",
    "nextAction": "Affected units|Status"
  },
  {
    "title": "Program access review and audit evidence",
    "section": "Administration|Access|Audit",
    "createAction": "New review|Review access",
    "fields": [
      "Program|Scope",
      "Reviewer"
    ],
    "submitAction": "Create|Start",
    "createdText": "Access review",
    "nextAction": "Export|History"
  }
] as const;
