// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Agriculture & Agritech";
export const industryDomain = "agriculture";
export const journeys = [
  {
    "title": "Field boundary import, validation, and crop-season assignment",
    "section": "Farms|Fields",
    "createAction": "Import fields|New field",
    "fields": [
      "Field ID",
      "Season"
    ],
    "submitAction": "Import|Create",
    "createdText": "Field",
    "nextAction": "Validate|Assign crop"
  },
  {
    "title": "Season plan baseline, activity dependencies, and revision",
    "section": "Planning|Crop plans",
    "createAction": "New crop plan|Create plan",
    "fields": [
      "Plan name",
      "Season"
    ],
    "submitAction": "Create|Save",
    "createdText": "Plan",
    "nextAction": "Baseline|Revise"
  },
  {
    "title": "Simulated equipment service schedule and inspection hold",
    "section": "Equipment|Maintenance",
    "createAction": "New equipment|Register",
    "fields": [
      "Equipment ID",
      "Type"
    ],
    "submitAction": "Create|Save",
    "createdText": "Equipment",
    "nextAction": "Maintenance|Inspect"
  },
  {
    "title": "Synthetic sensor stream ingestion, deduplication, and outage recovery",
    "section": "Sensors|IoT",
    "createAction": "New sensor|Register sensor",
    "fields": [
      "Sensor ID",
      "Field"
    ],
    "submitAction": "Create|Save",
    "createdText": "Stream event",
    "nextAction": "Replay|Recover"
  },
  {
    "title": "Mock irrigation allocation and meter reconciliation",
    "section": "Water|Irrigation",
    "createAction": "New schedule|Create schedule",
    "fields": [
      "Schedule ID",
      "Field"
    ],
    "submitAction": "Create|Save",
    "createdText": "Schedule",
    "nextAction": "Review|Reconcile"
  },
  {
    "title": "Input-lot receipt, hold, release, and field allocation",
    "section": "Inventory|Inputs",
    "createAction": "Receive lot|New receipt",
    "fields": [
      "Lot ID",
      "Input"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Lot",
    "nextAction": "Hold|Allocate"
  },
  {
    "title": "Harvest work order, lot split, and storage reconciliation",
    "section": "Harvest|Post-harvest",
    "createAction": "New work order|Create harvest",
    "fields": [
      "Work order",
      "Field"
    ],
    "submitAction": "Create|Save",
    "createdText": "Harvest lot",
    "nextAction": "Split|Reconcile"
  },
  {
    "title": "Synthetic crop traceability from field through shipment",
    "section": "Traceability|Lots",
    "createAction": "New trace query|Trace lot",
    "fields": [
      "Lot ID",
      "Cohort"
    ],
    "submitAction": "Create|Run",
    "createdText": "Trace report",
    "nextAction": "Lineage|Export"
  },
  {
    "title": "Resource metric lineage and synthetic reporting limitations",
    "section": "Sustainability|Reports",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Period"
    ],
    "submitAction": "Create|Run",
    "createdText": "Report",
    "nextAction": "Review|Export"
  },
  {
    "title": "Farm workspace access, partner retry, and simulation safeguards",
    "section": "Security|Integrations",
    "createAction": "New integration|Create connection",
    "fields": [
      "Connection name",
      "Scope"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connection",
    "nextAction": "Revoke|Audit"
  }
] as const;
