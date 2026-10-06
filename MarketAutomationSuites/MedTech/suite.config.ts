// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "MedTech Device Lifecycle";
export const industryDomain = "medical-devices";
export const journeys = [
  {
    "title": "Device design input and trace link",
    "section": "Design|Requirements",
    "createAction": "New requirement|Create input",
    "fields": [
      "Title|Name",
      "Requirement ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Requirement",
    "nextAction": "Traceability|Links"
  },
  {
    "title": "Risk record and mitigation review",
    "section": "Risk|Hazard Analysis",
    "createAction": "New hazard|Create risk",
    "fields": [
      "Title|Hazard ID",
      "Description"
    ],
    "submitAction": "Create|Save",
    "createdText": "Risk record",
    "nextAction": "Controls|Review"
  },
  {
    "title": "Device configuration and BOM validation",
    "section": "Products|Configurations|BOM",
    "createAction": "New configuration|Create BOM",
    "fields": [
      "Name",
      "Revision"
    ],
    "submitAction": "Create|Save",
    "createdText": "Configuration",
    "nextAction": "Components|Validate"
  },
  {
    "title": "Verification protocol execution and evidence",
    "section": "Verification|Tests",
    "createAction": "New protocol|Create test",
    "fields": [
      "Name",
      "Device|Configuration"
    ],
    "submitAction": "Create|Save",
    "createdText": "Protocol",
    "nextAction": "Execute|Run"
  },
  {
    "title": "Synthetic complaint intake and triage",
    "section": "Complaints|Service",
    "createAction": "New complaint|Create case",
    "fields": [
      "Case ID",
      "Device|Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Complaint",
    "nextAction": "Triage|Review"
  },
  {
    "title": "Field action scope and response tracking",
    "section": "Field Actions|Recalls",
    "createAction": "New action|Create action",
    "fields": [
      "Name",
      "Device|Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Field action",
    "nextAction": "Scope|Recipients"
  },
  {
    "title": "Supplier quality issue and corrective action",
    "section": "Suppliers|Quality",
    "createAction": "New issue|Create supplier",
    "fields": [
      "Name",
      "Supplier"
    ],
    "submitAction": "Create|Save",
    "createdText": "Supplier record",
    "nextAction": "Corrective action|Review"
  },
  {
    "title": "Device history record and process hold",
    "section": "Manufacturing|Device History",
    "createAction": "New unit|Create record",
    "fields": [
      "Serial|Unit ID",
      "Configuration"
    ],
    "submitAction": "Create|Save",
    "createdText": "Device history",
    "nextAction": "Work instructions|Steps"
  },
  {
    "title": "Calibration failure and equipment restriction",
    "section": "Equipment|Calibration",
    "createAction": "New calibration|Create calibration",
    "fields": [
      "Equipment ID",
      "Due date"
    ],
    "submitAction": "Create|Save",
    "createdText": "Calibration",
    "nextAction": "Results|Record"
  },
  {
    "title": "Program access review and audit export",
    "section": "Administration|Access|Audit",
    "createAction": "New access review|Review access",
    "fields": [
      "Program|Scope",
      "Reviewer"
    ],
    "submitAction": "Create|Save|Start",
    "createdText": "Access review",
    "nextAction": "Export|History"
  }
] as const;
