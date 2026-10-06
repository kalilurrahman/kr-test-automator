// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Construction & AEC";
export const industryDomain = "construction";
export const journeys = [
  {
    "title": "BIM model upload, revision compare, and access review",
    "section": "Models|BIM",
    "createAction": "Upload model|New model",
    "fields": [
      "Model name",
      "Revision"
    ],
    "submitAction": "Upload|Save",
    "createdText": "Model",
    "nextAction": "Compare|Review"
  },
  {
    "title": "Coordination issue assignment and model-linked resolution",
    "section": "Coordination|Issues",
    "createAction": "New issue|Create issue",
    "fields": [
      "Issue title",
      "Model element"
    ],
    "submitAction": "Create|Save",
    "createdText": "Issue",
    "nextAction": "Assign|Resolve"
  },
  {
    "title": "Schedule baseline, dependency checks, and forecast",
    "section": "Schedule|Project controls",
    "createAction": "New schedule|Create baseline",
    "fields": [
      "Schedule name",
      "Project"
    ],
    "submitAction": "Create|Save",
    "createdText": "Schedule",
    "nextAction": "Forecast|Approve"
  },
  {
    "title": "Contract variation review and duplicate invoice handling",
    "section": "Contracts|Cost",
    "createAction": "New variation|Create change",
    "fields": [
      "Change ID",
      "Contract"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Variation",
    "nextAction": "Review|History"
  },
  {
    "title": "Field report, offline sync, and work-package reconciliation",
    "section": "Field|Daily reports",
    "createAction": "New report|Create report",
    "fields": [
      "Report date",
      "Work package"
    ],
    "submitAction": "Create|Save",
    "createdText": "Daily report",
    "nextAction": "Sync|Review"
  },
  {
    "title": "Inspection hold point and corrective action verification",
    "section": "Quality|Inspections",
    "createAction": "New inspection|Create plan",
    "fields": [
      "Plan name",
      "Specification"
    ],
    "submitAction": "Create|Save",
    "createdText": "Inspection",
    "nextAction": "Results|Corrective action"
  },
  {
    "title": "Synthetic safety observation routing and action closure",
    "section": "Safety|Environment",
    "createAction": "New observation|Log event",
    "fields": [
      "Observation ID",
      "Project"
    ],
    "submitAction": "Create|Save",
    "createdText": "Observation",
    "nextAction": "Review|Actions"
  },
  {
    "title": "Material receipt, quarantine, and site inventory trace",
    "section": "Materials|Logistics",
    "createAction": "Receive material|New receipt",
    "fields": [
      "Delivery ID",
      "Material"
    ],
    "submitAction": "Receive|Save",
    "createdText": "Receipt",
    "nextAction": "Hold|Release"
  },
  {
    "title": "RFI response approval and submittal revision history",
    "section": "RFIs|Submittals",
    "createAction": "New RFI|Create RFI",
    "fields": [
      "RFI number",
      "Subject"
    ],
    "submitAction": "Create|Submit",
    "createdText": "RFI",
    "nextAction": "Response|Approve"
  },
  {
    "title": "Commissioning package completeness and facility handover",
    "section": "Commissioning|Handover",
    "createAction": "New handover|Create package",
    "fields": [
      "Package ID",
      "Facility"
    ],
    "submitAction": "Create|Save",
    "createdText": "Package",
    "nextAction": "Verify|Transfer"
  }
] as const;
