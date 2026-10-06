// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Insurance Operations";
export const industryDomain = "insurance";
export const journeys = [
  {
    "title": "Policy quote, issue and endorsement",
    "section": "Policies|Policy Administration",
    "createAction": "New quote|Create policy",
    "fields": [
      "Policy ID",
      "Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Policy",
    "nextAction": "Issue|Endorse"
  },
  {
    "title": "Underwriting referral and human approval",
    "section": "Underwriting|Applications",
    "createAction": "New application|Create application",
    "fields": [
      "Application ID",
      "Product"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Application",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Synthetic claim intake and policy match",
    "section": "Claims|FNOL",
    "createAction": "New claim|Create claim",
    "fields": [
      "Claim ID",
      "Policy ID"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Claim",
    "nextAction": "Coverage|Review"
  },
  {
    "title": "Claim adjudication and boundary calculation",
    "section": "Claims|Adjudication",
    "createAction": "New review|Create adjudication",
    "fields": [
      "Claim ID",
      "Coverage"
    ],
    "submitAction": "Create|Save",
    "createdText": "Adjudication",
    "nextAction": "Decision|Approve"
  },
  {
    "title": "Payment release and duplicate acknowledgment recovery",
    "section": "Payments|Claims",
    "createAction": "New payment|Issue payment",
    "fields": [
      "Claim ID",
      "Amount"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Payment",
    "nextAction": "Reconcile|History"
  },
  {
    "title": "Premium schedule and collection grace period",
    "section": "Billing|Collections",
    "createAction": "New billing plan|Create schedule",
    "fields": [
      "Policy ID",
      "Installment"
    ],
    "submitAction": "Create|Save",
    "createdText": "Billing plan",
    "nextAction": "Payments|Status"
  },
  {
    "title": "Broker portal quote and scoped access",
    "section": "Broker Portal|Customers",
    "createAction": "New quote|Create quote",
    "fields": [
      "Broker ID",
      "Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Quote",
    "nextAction": "Access|Submit"
  },
  {
    "title": "Treaty layer mapping and synthetic bordereau",
    "section": "Reinsurance|Treaties",
    "createAction": "New treaty|Create treaty",
    "fields": [
      "Treaty ID",
      "Effective date"
    ],
    "submitAction": "Create|Save",
    "createdText": "Treaty",
    "nextAction": "Bordereau|Exposure"
  },
  {
    "title": "Mock screening match and review disposition",
    "section": "Compliance|Screening|Fraud",
    "createAction": "New screening|Screen party",
    "fields": [
      "Party ID",
      "Name"
    ],
    "submitAction": "Create|Screen",
    "createdText": "Screening result",
    "nextAction": "Review|Disposition"
  },
  {
    "title": "Loss analytics, masking and access review",
    "section": "Analytics|Administration|Audit",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Period"
    ],
    "submitAction": "Create|Save",
    "createdText": "Report",
    "nextAction": "Access|Export"
  }
] as const;
