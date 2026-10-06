// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Public Services";
export const industryDomain = "public-sector";
export const journeys = [
  {
    "title": "Accessible digital service publication and keyboard review",
    "section": "Services|Accessibility",
    "createAction": "New service|Create service",
    "fields": [
      "Service name",
      "Jurisdiction"
    ],
    "submitAction": "Create|Save",
    "createdText": "Service",
    "nextAction": "Accessibility|Publish"
  },
  {
    "title": "Synthetic case intake, duplicate retry, and queue assignment",
    "section": "Cases|Intake",
    "createAction": "New case|Submit case",
    "fields": [
      "Case reference",
      "Service"
    ],
    "submitAction": "Submit|Create",
    "createdText": "Case",
    "nextAction": "Triage|Assign"
  },
  {
    "title": "Eligibility rule version, reviewer exception, and appeal",
    "section": "Benefits|Eligibility",
    "createAction": "New application|Create application",
    "fields": [
      "Application ID",
      "Program"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Application",
    "nextAction": "Review|Appeal"
  },
  {
    "title": "Pseudonymous identity, consent revocation, and delegation expiry",
    "section": "Identity|Consent",
    "createAction": "New test identity|Create identity",
    "fields": [
      "Identity ID",
      "Purpose"
    ],
    "submitAction": "Create|Save",
    "createdText": "Identity",
    "nextAction": "Consent|Revoke"
  },
  {
    "title": "Appointment booking, accessible accommodation, and reschedule",
    "section": "Appointments|Queues",
    "createAction": "New appointment|Book",
    "fields": [
      "Appointment ID",
      "Service location"
    ],
    "submitAction": "Book|Save",
    "createdText": "Appointment",
    "nextAction": "Reschedule|Cancel"
  },
  {
    "title": "Evidence attachment, retention hold, and scoped records export",
    "section": "Records|Documents",
    "createAction": "New record|Attach evidence",
    "fields": [
      "Case ID",
      "Record type"
    ],
    "submitAction": "Create|Attach",
    "createdText": "Record package",
    "nextAction": "Redact|Export"
  },
  {
    "title": "Mock fee payment, duplicate protection, and reconciliation",
    "section": "Payments|Fees",
    "createAction": "New fee request|Create request",
    "fields": [
      "Request ID",
      "Amount"
    ],
    "submitAction": "Create|Authorize",
    "createdText": "Payment",
    "nextAction": "Refund|Reconcile"
  },
  {
    "title": "Inter-agency referral contract, redaction, and retry",
    "section": "Partners|Referrals",
    "createAction": "New agency connection|Create connection",
    "fields": [
      "Agency ID",
      "Purpose"
    ],
    "submitAction": "Create|Save",
    "createdText": "Referral",
    "nextAction": "Send|Reconcile"
  },
  {
    "title": "Independent appeal review, deadline, and revised outcome",
    "section": "Appeals|Communications",
    "createAction": "New appeal|Create appeal",
    "fields": [
      "Appeal ID",
      "Case reference"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Appeal",
    "nextAction": "Review|Disposition"
  },
  {
    "title": "Synthetic transparency request, security scope, and audit",
    "section": "Transparency|Security",
    "createAction": "New request|Create request",
    "fields": [
      "Request ID",
      "Dataset"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Request",
    "nextAction": "Redact|Audit"
  }
] as const;
