// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Energy and Utilities Operations";
export const industryDomain = "energy-utilities";
export const journeys = [
  {
    "title": "Service point and synthetic meter registration",
    "section": "Customers|Meters|Assets",
    "createAction": "New service point|Register meter",
    "fields": [
      "Service point ID",
      "Meter ID"
    ],
    "submitAction": "Create|Register",
    "createdText": "Service point|Meter",
    "nextAction": "Readings|History"
  },
  {
    "title": "Simulated grid event and operator acknowledgment",
    "section": "Grid|Events|Operations",
    "createAction": "New event|Create event",
    "fields": [
      "Event ID",
      "Region"
    ],
    "submitAction": "Create|Save",
    "createdText": "Event",
    "nextAction": "Acknowledge|Review"
  },
  {
    "title": "Outage scope and restoration reconciliation",
    "section": "Outages|Operations",
    "createAction": "New outage|Create outage",
    "fields": [
      "Outage ID",
      "Service area"
    ],
    "submitAction": "Create|Save",
    "createdText": "Outage",
    "nextAction": "Affected meters|Restore"
  },
  {
    "title": "Field work dispatch and simulated site visit",
    "section": "Workforce|Field Service",
    "createAction": "New work order|Create work order",
    "fields": [
      "Work order ID",
      "Asset ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Work order",
    "nextAction": "Dispatch|Complete"
  },
  {
    "title": "Preventive maintenance and asset release",
    "section": "Maintenance|Assets",
    "createAction": "New maintenance task|Create task",
    "fields": [
      "Asset ID",
      "Due date"
    ],
    "submitAction": "Create|Save",
    "createdText": "Task",
    "nextAction": "Inspection|Release"
  },
  {
    "title": "Interval bill calculation and adjustment review",
    "section": "Billing|Accounts",
    "createAction": "New bill run|Calculate bill",
    "fields": [
      "Account ID",
      "Period"
    ],
    "submitAction": "Create|Run",
    "createdText": "Bill run",
    "nextAction": "Adjustments|Review"
  },
  {
    "title": "Virtual distributed resource and dispatch validation",
    "section": "DER|Resources|Operations",
    "createAction": "New resource|Register resource",
    "fields": [
      "Resource ID",
      "Capacity"
    ],
    "submitAction": "Create|Save",
    "createdText": "Resource",
    "nextAction": "Dispatch|Telemetry"
  },
  {
    "title": "Market transaction submission and settlement",
    "section": "Market|Transactions",
    "createAction": "New transaction|Submit",
    "fields": [
      "Transaction ID",
      "Interval"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Transaction",
    "nextAction": "Settlement|History"
  },
  {
    "title": "Synthetic regulatory report and lineage review",
    "section": "Reporting|Regulatory|Sustainability",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Period"
    ],
    "submitAction": "Create|Save",
    "createdText": "Report",
    "nextAction": "Lineage|Validate"
  },
  {
    "title": "Mock feed outage and buffered event recovery",
    "section": "Operations|Resilience|Monitoring",
    "createAction": "New recovery test|Replay events",
    "fields": [
      "Run ID",
      "Feed"
    ],
    "submitAction": "Start|Replay",
    "createdText": "Recovery run",
    "nextAction": "Reconcile|History"
  }
] as const;
