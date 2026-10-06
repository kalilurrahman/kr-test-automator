// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Healthcare Operations";
export const industryDomain = "healthcare";
export const journeys = [
  {
    "title": "Synthetic patient registration and duplicate match",
    "section": "Registration|Patients",
    "createAction": "New patient|Register patient",
    "fields": [
      "Patient ID",
      "Date of birth"
    ],
    "submitAction": "Create|Register",
    "createdText": "Patient",
    "nextAction": "Chart|Details"
  },
  {
    "title": "Appointment scheduling and referral routing",
    "section": "Scheduling|Referrals",
    "createAction": "New appointment|Schedule",
    "fields": [
      "Patient ID",
      "Service|Provider"
    ],
    "submitAction": "Schedule|Save",
    "createdText": "Appointment",
    "nextAction": "Referral|Status"
  },
  {
    "title": "Encounter interface message and provenance",
    "section": "Interfaces|Encounters",
    "createAction": "New encounter|Create message",
    "fields": [
      "Encounter ID",
      "Patient ID"
    ],
    "submitAction": "Create|Send",
    "createdText": "Encounter",
    "nextAction": "History|Provenance"
  },
  {
    "title": "Synthetic claim submission and adjudication",
    "section": "Claims|Revenue Cycle",
    "createAction": "New claim|Create claim",
    "fields": [
      "Claim ID",
      "Member ID"
    ],
    "submitAction": "Submit|Save",
    "createdText": "Claim",
    "nextAction": "Status|Adjudication"
  },
  {
    "title": "Care transition checklist and follow-up",
    "section": "Care Coordination|Discharge",
    "createAction": "New care plan|Create plan",
    "fields": [
      "Patient ID",
      "Plan name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Care plan",
    "nextAction": "Tasks|Checklist"
  },
  {
    "title": "Medication interface delivery and acknowledgment",
    "section": "Medication|Interfaces",
    "createAction": "New order|Create order",
    "fields": [
      "Order ID",
      "Encounter ID"
    ],
    "submitAction": "Create|Send",
    "createdText": "Order",
    "nextAction": "Status|Acknowledgment"
  },
  {
    "title": "Lab order and corrected result handling",
    "section": "Laboratory|Results",
    "createAction": "New order|Create order",
    "fields": [
      "Accession ID",
      "Encounter ID"
    ],
    "submitAction": "Create|Save",
    "createdText": "Lab order",
    "nextAction": "Results|History"
  },
  {
    "title": "Role access grant and revocation review",
    "section": "Administration|Access",
    "createAction": "New access grant|Add user",
    "fields": [
      "User|Email",
      "Role"
    ],
    "submitAction": "Grant|Save",
    "createdText": "Access grant",
    "nextAction": "Review|Revoke"
  },
  {
    "title": "Synthetic aggregate report validation",
    "section": "Population Health|Reports",
    "createAction": "New report|Create report",
    "fields": [
      "Reporting period",
      "Jurisdiction"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Report",
    "nextAction": "Validate|Preview"
  },
  {
    "title": "Interface outage recovery and reconciliation",
    "section": "Operations|Interfaces|Monitoring",
    "createAction": "New test run|Replay queue",
    "fields": [
      "Run ID",
      "Interface"
    ],
    "submitAction": "Start|Replay",
    "createdText": "Run|Queue",
    "nextAction": "History|Reconcile"
  }
] as const;
