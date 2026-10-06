// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Manufacturing MES";
export const industryDomain = "manufacturing";
export const journeys = [
  {
    "title": "Production order release and work-center dispatch",
    "section": "Orders|Production",
    "createAction": "New order|Create order",
    "fields": [
      "Order ID",
      "Product"
    ],
    "submitAction": "Create|Release",
    "createdText": "Production order",
    "nextAction": "Dispatch|Work center"
  },
  {
    "title": "Routing and BOM revision selection",
    "section": "Engineering|Routing|BOM",
    "createAction": "New routing|Create BOM",
    "fields": [
      "Product",
      "Revision"
    ],
    "submitAction": "Create|Save",
    "createdText": "Routing|BOM",
    "nextAction": "Components|Operations"
  },
  {
    "title": "Shop-floor operation and measurement hold",
    "section": "Execution|Shop Floor",
    "createAction": "Start operation|New job",
    "fields": [
      "Order ID",
      "Work center"
    ],
    "submitAction": "Start|Create",
    "createdText": "Operation",
    "nextAction": "Measurements|Complete"
  },
  {
    "title": "Inspection plan execution and lot disposition",
    "section": "Quality|Inspections",
    "createAction": "New inspection|Create inspection",
    "fields": [
      "Lot ID",
      "Plan"
    ],
    "submitAction": "Create|Start",
    "createdText": "Inspection",
    "nextAction": "Results|Disposition"
  },
  {
    "title": "Equipment stop event and OEE reconciliation",
    "section": "Equipment|OEE|Monitoring",
    "createAction": "New event|Record downtime",
    "fields": [
      "Equipment ID",
      "Reason"
    ],
    "submitAction": "Record|Save",
    "createdText": "Event",
    "nextAction": "OEE|Metrics"
  },
  {
    "title": "Serial assignment and genealogy trace",
    "section": "Traceability|Serials",
    "createAction": "New serial|Assign serial",
    "fields": [
      "Serial ID",
      "Order ID"
    ],
    "submitAction": "Create|Assign",
    "createdText": "Serial",
    "nextAction": "Genealogy|Trace"
  },
  {
    "title": "Material receipt, reservation and pick",
    "section": "Warehouse|Inventory",
    "createAction": "Receive material|New receipt",
    "fields": [
      "Lot ID",
      "Quantity"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Lot",
    "nextAction": "Reserve|Pick"
  },
  {
    "title": "Maintenance order and equipment release",
    "section": "Maintenance|Assets",
    "createAction": "New work order|Create work order",
    "fields": [
      "Equipment ID",
      "Work type"
    ],
    "submitAction": "Create|Save",
    "createdText": "Work order",
    "nextAction": "Complete|Release"
  },
  {
    "title": "Finite schedule publication and overload review",
    "section": "Planning|Schedules",
    "createAction": "New plan|Create schedule",
    "fields": [
      "Plan name",
      "Date"
    ],
    "submitAction": "Create|Save",
    "createdText": "Plan",
    "nextAction": "Publish|Review"
  },
  {
    "title": "ERP-MES event replay and reconciliation",
    "section": "Integrations|Operations",
    "createAction": "New replay|Replay events",
    "fields": [
      "Run ID",
      "Time range"
    ],
    "submitAction": "Start|Replay",
    "createdText": "Run",
    "nextAction": "Reconcile|History"
  }
] as const;
