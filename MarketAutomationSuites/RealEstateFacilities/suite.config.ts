// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Real Estate & Facilities";
export const industryDomain = "real-estate";
export const journeys = [
  {
    "title": "Property hierarchy import, duplicate protection, and portfolio access",
    "section": "Properties|Portfolio",
    "createAction": "Import properties|New property",
    "fields": [
      "Property ID",
      "Portfolio"
    ],
    "submitAction": "Import|Create",
    "createdText": "Property",
    "nextAction": "Validate|Review"
  },
  {
    "title": "Synthetic lease dates, renewal approvals, and unit occupancy",
    "section": "Leasing|Tenants",
    "createAction": "New lease|Create lease",
    "fields": [
      "Lease ID",
      "Unit"
    ],
    "submitAction": "Create|Save",
    "createdText": "Lease",
    "nextAction": "Renew|Approve"
  },
  {
    "title": "Facilities work request, technician assignment, and evidence closure",
    "section": "Facilities|Work orders",
    "createAction": "New request|Create request",
    "fields": [
      "Request ID",
      "Asset"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Work order",
    "nextAction": "Assign|Close"
  },
  {
    "title": "Inspection threshold, corrective action, and certificate expiry",
    "section": "Inspections|Records",
    "createAction": "New inspection|Create checklist",
    "fields": [
      "Inspection ID",
      "Property"
    ],
    "submitAction": "Create|Save",
    "createdText": "Inspection",
    "nextAction": "Correct|Review"
  },
  {
    "title": "Synthetic space allocation, capacity conflict, and report lineage",
    "section": "Space|Occupancy",
    "createAction": "New plan|Create plan",
    "fields": [
      "Plan ID",
      "Location"
    ],
    "submitAction": "Create|Save",
    "createdText": "Allocation",
    "nextAction": "Reconcile|Report"
  },
  {
    "title": "Meter fixture ingestion, duplicate intervals, and utility reconciliation",
    "section": "Utilities|Meters",
    "createAction": "Import readings|New meter batch",
    "fields": [
      "Batch ID",
      "Period"
    ],
    "submitAction": "Import|Save",
    "createdText": "Meter batch",
    "nextAction": "Reconcile|Report"
  },
  {
    "title": "Vendor qualification, mock contract expiry, and invoice retry",
    "section": "Vendors|Contracts",
    "createAction": "New vendor|Register vendor",
    "fields": [
      "Vendor ID",
      "Service"
    ],
    "submitAction": "Create|Save",
    "createdText": "Contract",
    "nextAction": "Review|Renew"
  },
  {
    "title": "Capital project change, budget reconciliation, and asset handover",
    "section": "Projects|Capital works",
    "createAction": "New project|Create project",
    "fields": [
      "Project ID",
      "Property"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Approve|Handover"
  },
  {
    "title": "Tenant portal scope, maintenance submission, and privacy",
    "section": "Tenant portal|Communications",
    "createAction": "New test tenant|Create fixture",
    "fields": [
      "Tenant ID",
      "Lease ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Request",
    "nextAction": "Submit|Review"
  },
  {
    "title": "Portfolio access revocation, snapshot restore, and reporting",
    "section": "Security|Reporting",
    "createAction": "New recovery run|Restore snapshot",
    "fields": [
      "Run ID",
      "Portfolio"
    ],
    "submitAction": "Start|Restore",
    "createdText": "Portfolio report",
    "nextAction": "Reconcile|Audit"
  }
] as const;
