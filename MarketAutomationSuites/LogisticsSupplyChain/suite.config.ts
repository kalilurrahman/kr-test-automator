// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Logistics and Supply Chain";
export const industryDomain = "logistics-supply-chain";
export const journeys = [
  {
    "title": "Transport order route planning and dispatch",
    "section": "Transport|Orders|Planning",
    "createAction": "New shipment|Create order",
    "fields": [
      "Shipment ID",
      "Origin|Destination"
    ],
    "submitAction": "Create|Save",
    "createdText": "Shipment",
    "nextAction": "Route|Dispatch"
  },
  {
    "title": "Warehouse receipt, putaway and lot pick",
    "section": "Warehouse|Inventory",
    "createAction": "New receipt|Receive shipment",
    "fields": [
      "Receipt ID",
      "Location"
    ],
    "submitAction": "Create|Receive",
    "createdText": "Receipt",
    "nextAction": "Putaway|Pick"
  },
  {
    "title": "Partner EDI order and acknowledgment recovery",
    "section": "Integrations|EDI|Partners",
    "createAction": "New partner|Import message",
    "fields": [
      "Partner ID",
      "Message ID"
    ],
    "submitAction": "Create|Import",
    "createdText": "Partner message",
    "nextAction": "Acknowledge|Replay"
  },
  {
    "title": "Available-to-promise inventory and reservation",
    "section": "Inventory|Availability",
    "createAction": "New reservation|Check availability",
    "fields": [
      "Order ID",
      "SKU"
    ],
    "submitAction": "Create|Reserve",
    "createdText": "Reservation",
    "nextAction": "Reconcile|History"
  },
  {
    "title": "Shipment milestone and delayed delivery exception",
    "section": "Tracking|Exceptions",
    "createAction": "New shipment|Create shipment",
    "fields": [
      "Shipment ID",
      "Carrier"
    ],
    "submitAction": "Create|Save",
    "createdText": "Shipment",
    "nextAction": "Milestones|Exceptions"
  },
  {
    "title": "Synthetic customs packet validation and revision",
    "section": "Trade|Customs|Documents",
    "createAction": "New declaration|Create packet",
    "fields": [
      "Shipment ID",
      "Origin"
    ],
    "submitAction": "Create|Save",
    "createdText": "Declaration",
    "nextAction": "Validate|Review"
  },
  {
    "title": "Return authorization and quality disposition",
    "section": "Returns|Reverse Logistics",
    "createAction": "New return|Create authorization",
    "fields": [
      "Order ID",
      "SKU"
    ],
    "submitAction": "Create|Save",
    "createdText": "Return",
    "nextAction": "Inspection|Disposition"
  },
  {
    "title": "Supplier acknowledgment and date exception",
    "section": "Suppliers|Collaboration",
    "createAction": "New purchase order|Create order",
    "fields": [
      "Order ID",
      "Supplier"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Purchase order",
    "nextAction": "Acknowledgment|Exceptions"
  },
  {
    "title": "Demand plan version and shortage review",
    "section": "Planning|Demand|Supply",
    "createAction": "New plan|Create plan",
    "fields": [
      "Plan name",
      "Horizon"
    ],
    "submitAction": "Create|Save",
    "createdText": "Plan",
    "nextAction": "Shortages|Approve"
  },
  {
    "title": "Network delivery metric and event lineage",
    "section": "Analytics|Network|Reports",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Period"
    ],
    "submitAction": "Create|Save",
    "createdText": "Report",
    "nextAction": "Lineage|Reconcile"
  }
] as const;
