// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Defense Program Systems";
export const industryDomain = "defense";
export const journeys = [
  {
    "title": "Unclassified baseline creation and approval",
    "section": "Configuration|Baselines",
    "createAction": "New baseline|Create baseline",
    "fields": [
      "Program|Project",
      "Revision"
    ],
    "submitAction": "Create|Save",
    "createdText": "Baseline",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Requirement trace and verification evidence",
    "section": "Requirements|Traceability",
    "createAction": "New requirement|Create requirement",
    "fields": [
      "Requirement ID",
      "Description"
    ],
    "submitAction": "Create|Save",
    "createdText": "Requirement",
    "nextAction": "Verification|Trace"
  },
  {
    "title": "Synthetic supplier provenance review",
    "section": "Suppliers|Parts",
    "createAction": "New part|Register supplier",
    "fields": [
      "Part ID",
      "Supplier"
    ],
    "submitAction": "Create|Save",
    "createdText": "Part record",
    "nextAction": "Provenance|Review"
  },
  {
    "title": "Program milestone baseline and change review",
    "section": "Program|Schedule|Milestones",
    "createAction": "New milestone|Create milestone",
    "fields": [
      "Name",
      "Due date"
    ],
    "submitAction": "Create|Save",
    "createdText": "Milestone",
    "nextAction": "Baseline|Review"
  },
  {
    "title": "Controlled technical record upload and access",
    "section": "Technical Data|Documents",
    "createAction": "New record|Upload",
    "fields": [
      "Title|Name",
      "Classification|Marking"
    ],
    "submitAction": "Create|Upload",
    "createdText": "Record",
    "nextAction": "Access|Revision"
  },
  {
    "title": "Nonconformance disposition and corrective action",
    "section": "Quality|Nonconformance",
    "createAction": "New finding|Create case",
    "fields": [
      "Finding ID",
      "Summary"
    ],
    "submitAction": "Create|Save",
    "createdText": "Finding",
    "nextAction": "Disposition|Actions"
  },
  {
    "title": "Maintenance task and readiness evidence",
    "section": "Maintenance|Readiness",
    "createAction": "New task|Create task",
    "fields": [
      "Asset ID",
      "Task name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Task",
    "nextAction": "Evidence|Complete"
  },
  {
    "title": "Project role review and access expiry",
    "section": "Administration|Access",
    "createAction": "New access review|Grant access",
    "fields": [
      "User|Email",
      "Project|Program"
    ],
    "submitAction": "Create|Grant",
    "createdText": "Access record",
    "nextAction": "Review|Expire"
  },
  {
    "title": "Audit evidence export and integrity check",
    "section": "Audit|Evidence",
    "createAction": "New export|Export records",
    "fields": [
      "Start date",
      "End date"
    ],
    "submitAction": "Export|Create",
    "createdText": "Export",
    "nextAction": "Verify|Download"
  },
  {
    "title": "Sandbox recovery and event reconciliation",
    "section": "Operations|Recovery",
    "createAction": "New recovery run|Restore",
    "fields": [
      "Run ID",
      "Snapshot"
    ],
    "submitAction": "Start|Restore",
    "createdText": "Recovery run",
    "nextAction": "Reconcile|History"
  }
] as const;
