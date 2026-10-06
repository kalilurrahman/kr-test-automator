// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "CPG and Consumer Goods";
export const industryDomain = "cpg";
export const journeys = [
  {
    "title": "Product master and package revision approval",
    "section": "Products|Product Master",
    "createAction": "New product|Create item",
    "fields": [
      "Item name",
      "GTIN|SKU"
    ],
    "submitAction": "Create|Save",
    "createdText": "Product",
    "nextAction": "Packaging|Revision"
  },
  {
    "title": "Demand forecast and promotional scenario review",
    "section": "Planning|Forecasts",
    "createAction": "New forecast|Create forecast",
    "fields": [
      "Product|Item",
      "Period"
    ],
    "submitAction": "Create|Save",
    "createdText": "Forecast",
    "nextAction": "Scenarios|Review"
  },
  {
    "title": "Retail promotion budget and rebate calculation",
    "section": "Trade Promotions|Promotions",
    "createAction": "New promotion|Create promotion",
    "fields": [
      "Promotion name",
      "Retailer"
    ],
    "submitAction": "Create|Save",
    "createdText": "Promotion",
    "nextAction": "Funding|Claims"
  },
  {
    "title": "Store visit and shelf availability capture",
    "section": "Retail Execution|Visits",
    "createAction": "New visit|Schedule visit",
    "fields": [
      "Store ID",
      "Date"
    ],
    "submitAction": "Create|Schedule",
    "createdText": "Visit",
    "nextAction": "Checklist|Complete"
  },
  {
    "title": "Retailer order and split fulfillment",
    "section": "Orders|Fulfillment",
    "createAction": "New order|Create order",
    "fields": [
      "Order ID",
      "Retailer"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Order",
    "nextAction": "Allocation|Shipments"
  },
  {
    "title": "Finished goods lot and FEFO allocation",
    "section": "Inventory|Lots|Warehouse",
    "createAction": "Receive lot|New receipt",
    "fields": [
      "Lot ID",
      "Product"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Lot",
    "nextAction": "Reserve|Pick"
  },
  {
    "title": "Quality hold, investigation and release",
    "section": "Quality|Food Safety",
    "createAction": "New inspection|Create hold",
    "fields": [
      "Lot ID",
      "Reason"
    ],
    "submitAction": "Create|Save",
    "createdText": "Inspection|Hold",
    "nextAction": "Disposition|Release"
  },
  {
    "title": "Market label review and claim validation",
    "section": "Labels|Regulatory|Claims",
    "createAction": "New label|Create label",
    "fields": [
      "Product",
      "Market"
    ],
    "submitAction": "Create|Save",
    "createdText": "Label",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Supplier qualification and purchase release",
    "section": "Suppliers|Procurement",
    "createAction": "New supplier|Create purchase order",
    "fields": [
      "Supplier",
      "Item"
    ],
    "submitAction": "Create|Save",
    "createdText": "Supplier|Purchase order",
    "nextAction": "Qualification|Release"
  },
  {
    "title": "Retail feed ingest and sales reconciliation",
    "section": "Analytics|Retail Data",
    "createAction": "New feed|Import data",
    "fields": [
      "Feed name",
      "Period"
    ],
    "submitAction": "Create|Import",
    "createdText": "Feed",
    "nextAction": "Reconcile|Lineage"
  }
] as const;
