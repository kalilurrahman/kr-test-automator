// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Financial Services Core";
export const industryDomain = "financial-services";
export const journeys = [
  {
    "title": "Synthetic account opening and ownership review",
    "section": "Customers|Accounts",
    "createAction": "New account|Open account",
    "fields": [
      "Account ID",
      "Customer ID"
    ],
    "submitAction": "Create|Open",
    "createdText": "Account",
    "nextAction": "Ownership|Review"
  },
  {
    "title": "Payment initiation, approval and idempotent retry",
    "section": "Payments|Transfers",
    "createAction": "New transfer|Create payment",
    "fields": [
      "Payment ID",
      "Amount"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Payment",
    "nextAction": "Approve|History"
  },
  {
    "title": "Balanced journal posting and period reconciliation",
    "section": "Ledger|Reconciliation",
    "createAction": "New journal|Create entry",
    "fields": [
      "Journal ID",
      "Accounting period"
    ],
    "submitAction": "Create|Post",
    "createdText": "Journal",
    "nextAction": "Reconcile|Balance"
  },
  {
    "title": "Loan application, offer and schedule generation",
    "section": "Lending|Credit",
    "createAction": "New application|Create loan",
    "fields": [
      "Application ID",
      "Product"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Application",
    "nextAction": "Offer|Schedule"
  },
  {
    "title": "Treasury position and market data valuation",
    "section": "Treasury|Positions",
    "createAction": "New position batch|Import",
    "fields": [
      "Batch ID",
      "Entity"
    ],
    "submitAction": "Create|Import",
    "createdText": "Batch",
    "nextAction": "Valuation|Reconcile"
  },
  {
    "title": "Risk limit breach and dual-approved override",
    "section": "Risk|Limits",
    "createAction": "New limit|Create limit",
    "fields": [
      "Limit ID",
      "Portfolio"
    ],
    "submitAction": "Create|Save",
    "createdText": "Limit",
    "nextAction": "Override|Review"
  },
  {
    "title": "Mock KYC screening and case disposition",
    "section": "Compliance|KYC|Cases",
    "createAction": "New screening|Screen customer",
    "fields": [
      "Customer ID",
      "Case ID"
    ],
    "submitAction": "Create|Screen",
    "createdText": "Screening",
    "nextAction": "Review|Disposition"
  },
  {
    "title": "Digital channel step-up and session expiry",
    "section": "Digital Banking|Security",
    "createAction": "New test user|Create session",
    "fields": [
      "User|Email",
      "Channel"
    ],
    "submitAction": "Create|Sign in",
    "createdText": "Session",
    "nextAction": "Verify|Expire"
  },
  {
    "title": "Regulatory report lineage and independent approval",
    "section": "Reporting|Regulatory",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Period"
    ],
    "submitAction": "Create|Save",
    "createdText": "Report",
    "nextAction": "Lineage|Approve"
  },
  {
    "title": "Sandbox recovery and ledger balance verification",
    "section": "Operations|Recovery|Audit",
    "createAction": "New recovery run|Restore",
    "fields": [
      "Run ID",
      "Snapshot"
    ],
    "submitAction": "Start|Restore",
    "createdText": "Recovery run",
    "nextAction": "Verify|Reconcile"
  }
] as const;
