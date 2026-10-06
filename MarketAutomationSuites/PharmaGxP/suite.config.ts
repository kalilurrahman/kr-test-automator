// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Pharma GxP";
export const industryDomain = "pharma-life-sciences";
export const journeys = [
  {
    "title": "Controlled product change and approval",
    "section": "Products|Product Catalog",
    "createAction": "New product|Create product",
    "fields": [
      "Name",
      "Product code"
    ],
    "submitAction": "Create|Save",
    "createdText": "Product",
    "nextAction": "Change control|Edit"
  },
  {
    "title": "Master record revision and impact review",
    "section": "Manufacturing|Master records",
    "createAction": "New master record|Create record",
    "fields": [
      "Name",
      "Version"
    ],
    "submitAction": "Create|Save",
    "createdText": "Master record",
    "nextAction": "Impact assessment|Review"
  },
  {
    "title": "Synthetic batch execution and step reconciliation",
    "section": "Batches|Manufacturing",
    "createAction": "New batch|Create batch",
    "fields": [
      "Batch|Lot ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Batch",
    "nextAction": "Steps|Execute"
  },
  {
    "title": "Deviation investigation and corrective action",
    "section": "Quality|Deviations",
    "createAction": "New deviation|Create deviation",
    "fields": [
      "Title|Summary",
      "Description"
    ],
    "submitAction": "Create|Save",
    "createdText": "Deviation",
    "nextAction": "Investigation|Actions"
  },
  {
    "title": "Controlled document review and publication",
    "section": "Documents|SOPs",
    "createAction": "New document|Upload document",
    "fields": [
      "Title|Name"
    ],
    "submitAction": "Create|Save|Upload",
    "createdText": "Document",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Training assignment and completion status",
    "section": "Training|Learning",
    "createAction": "Assign training|New assignment",
    "fields": [
      "User|Learner",
      "Course"
    ],
    "submitAction": "Assign|Save",
    "createdText": "Assignment",
    "nextAction": "Complete|Review"
  },
  {
    "title": "Lab sample result and exception routing",
    "section": "Laboratory|Samples",
    "createAction": "New sample|Create sample",
    "fields": [
      "Sample ID",
      "Batch|Lot"
    ],
    "submitAction": "Create|Save",
    "createdText": "Sample",
    "nextAction": "Results|Enter result"
  },
  {
    "title": "Materials lot receipt and genealogy",
    "section": "Materials|Inventory",
    "createAction": "Receive lot|New receipt",
    "fields": [
      "Lot ID",
      "Supplier"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Lot",
    "nextAction": "Genealogy|Trace"
  },
  {
    "title": "Release package completeness and disposition",
    "section": "Quality|Batch release",
    "createAction": "New release|Create package",
    "fields": [
      "Batch|Lot ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Release package",
    "nextAction": "Review|Disposition"
  },
  {
    "title": "Synthetic safety case triage and audit",
    "section": "Safety|Cases",
    "createAction": "New case|Create case",
    "fields": [
      "Case ID",
      "Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Case",
    "nextAction": "Review|History"
  }
] as const;
