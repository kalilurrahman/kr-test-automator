// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Telecom Network Operations";
export const industryDomain = "telecom-network";
export const journeys = [
  {
    "title": "Service order capture, eligibility, and simulated fulfillment",
    "section": "Catalog|Orders",
    "createAction": "New service order|Create order",
    "fields": [
      "Order ID",
      "Offer"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Order",
    "nextAction": "Orchestrate|Review"
  },
  {
    "title": "Network topology import, relationship validation, and impact query",
    "section": "Inventory|Topology",
    "createAction": "Import inventory|New resource",
    "fields": [
      "Resource ID",
      "Region"
    ],
    "submitAction": "Import|Create",
    "createdText": "Resource",
    "nextAction": "Validate|Impact"
  },
  {
    "title": "Activation workflow timeout, idempotent resume, and cancellation",
    "section": "Provisioning|Orchestration",
    "createAction": "New activation|Start workflow",
    "fields": [
      "Subscriber fixture",
      "Service"
    ],
    "submitAction": "Start|Simulate",
    "createdText": "Workflow run",
    "nextAction": "Resume|Cancel"
  },
  {
    "title": "Subscriber support intake, role scope, and case escalation",
    "section": "Support|Cases",
    "createAction": "New case|Create case",
    "fields": [
      "Case ID",
      "Issue type"
    ],
    "submitAction": "Create|Save",
    "createdText": "Case",
    "nextAction": "Assign|Escalate"
  },
  {
    "title": "Usage batch rating, invoice reconciliation, and rerating",
    "section": "Usage|Billing",
    "createAction": "Import usage|New batch",
    "fields": [
      "Batch ID",
      "Period"
    ],
    "submitAction": "Import|Rate",
    "createdText": "Invoice",
    "nextAction": "Reconcile|Rerate"
  },
  {
    "title": "Alarm correlation, incident impact, and simulated recovery",
    "section": "Assurance|Incidents",
    "createAction": "New incident|Create incident",
    "fields": [
      "Incident ID",
      "Alarm source"
    ],
    "submitAction": "Create|Save",
    "createdText": "Incident",
    "nextAction": "Recover|Close"
  },
  {
    "title": "Partner event signature, retry, and duplicate-message handling",
    "section": "Partners|Interfaces",
    "createAction": "New partner|Create connection",
    "fields": [
      "Partner ID",
      "Environment"
    ],
    "submitAction": "Create|Save",
    "createdText": "Message",
    "nextAction": "Retry|Disposition"
  },
  {
    "title": "Maintenance window conflict, review, and change closure",
    "section": "Changes|Maintenance",
    "createAction": "New change|Create change",
    "fields": [
      "Change ID",
      "Resource"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Change",
    "nextAction": "Approve|Close"
  },
  {
    "title": "Operator scope, subscriber privacy, and credential rotation",
    "section": "Security|Identity",
    "createAction": "New test operator|Create identity",
    "fields": [
      "Operator ID",
      "Role"
    ],
    "submitAction": "Create|Save",
    "createdText": "Access policy",
    "nextAction": "Rotate|Audit"
  },
  {
    "title": "Sandbox recovery, service metrics, and report lineage",
    "section": "Operations|Analytics",
    "createAction": "New recovery run|Restore snapshot",
    "fields": [
      "Run ID",
      "Snapshot"
    ],
    "submitAction": "Start|Restore",
    "createdText": "Report",
    "nextAction": "Reconcile|Lineage"
  }
] as const;
