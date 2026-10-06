// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Automotive & Mobility";
export const industryDomain = "automotive";
export const journeys = [
  {
    "title": "Vehicle program baseline and model-year release",
    "section": "Programs|Configurations",
    "createAction": "New program|Create program",
    "fields": [
      "Program name",
      "Model year"
    ],
    "submitAction": "Create|Save",
    "createdText": "Program",
    "nextAction": "Baseline|Approve"
  },
  {
    "title": "Engineering change impact and requirement trace",
    "section": "Engineering|Changes",
    "createAction": "New change|Create change",
    "fields": [
      "Change ID",
      "Subsystem"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Change",
    "nextAction": "Impact|Review"
  },
  {
    "title": "Mock software update staging, interruption, and rollback",
    "section": "Software|Updates",
    "createAction": "New update|Stage package",
    "fields": [
      "Package ID",
      "Cohort"
    ],
    "submitAction": "Stage|Save",
    "createdText": "Update",
    "nextAction": "Simulate|Rollback"
  },
  {
    "title": "Dealer offer publication and regional access controls",
    "section": "Dealers|Offers",
    "createAction": "New offer|Create offer",
    "fields": [
      "Offer name",
      "Market"
    ],
    "submitAction": "Create|Save",
    "createdText": "Offer",
    "nextAction": "Publish|Review"
  },
  {
    "title": "Vehicle order configuration and fulfillment recovery",
    "section": "Orders|Fulfillment",
    "createAction": "New order|Create order",
    "fields": [
      "Order ID",
      "Vehicle variant"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Order",
    "nextAction": "Fulfillment|History"
  },
  {
    "title": "Fleet reservation, trip completion, and utilization",
    "section": "Fleet|Mobility",
    "createAction": "New reservation|Book vehicle",
    "fields": [
      "Reservation ID",
      "Vehicle"
    ],
    "submitAction": "Create|Reserve",
    "createdText": "Trip",
    "nextAction": "Complete|Utilization"
  },
  {
    "title": "Simulated charging session and tariff reconciliation",
    "section": "Charging|Energy",
    "createAction": "New station|Create station",
    "fields": [
      "Station ID",
      "Connector count"
    ],
    "submitAction": "Create|Save",
    "createdText": "Session",
    "nextAction": "Settle|Reconcile"
  },
  {
    "title": "Supplier lot hold, genealogy, and approved substitution",
    "section": "Suppliers|Parts",
    "createAction": "Receive lot|New receipt",
    "fields": [
      "Lot ID",
      "Part number"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Lot",
    "nextAction": "Genealogy|Disposition"
  },
  {
    "title": "Warranty eligibility and synthetic service case",
    "section": "Service|Warranty",
    "createAction": "New case|Create case",
    "fields": [
      "Case ID",
      "Vehicle ID"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Case",
    "nextAction": "Review|Close"
  },
  {
    "title": "Connected-service authorization and credential revocation",
    "section": "Security|Connected services",
    "createAction": "New test identity|Create identity",
    "fields": [
      "Identity ID",
      "Scope"
    ],
    "submitAction": "Create|Save",
    "createdText": "Identity",
    "nextAction": "Revoke|Audit"
  }
] as const;
