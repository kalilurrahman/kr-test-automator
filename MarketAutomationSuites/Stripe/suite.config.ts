// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Stripe";
export const journeys = [
  {
    "title": "Customer and checkout session completion",
    "section": "Customers|Payments",
    "createAction": "Add customer|Create customer",
    "fields": [
      "Email",
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Customer",
    "nextAction": "Create checkout|Checkout"
  },
  {
    "title": "Payment intent confirmation and charge inspection",
    "section": "Payments|Transactions",
    "createAction": "Create payment|New payment",
    "fields": [
      "Amount",
      "Currency"
    ],
    "submitAction": "Create|Confirm",
    "createdText": "Payment",
    "nextAction": "View charge|Details"
  },
  {
    "title": "Subscription lifecycle and invoice renewal",
    "section": "Billing|Subscriptions",
    "createAction": "Create subscription|New subscription",
    "fields": [
      "Customer",
      "Price"
    ],
    "submitAction": "Create|Save",
    "createdText": "Subscription",
    "nextAction": "Invoices|Renew"
  },
  {
    "title": "Partial refund and remaining balance",
    "section": "Payments|Transactions",
    "createAction": "Open payment|Refund",
    "fields": [
      "Payment",
      "Amount"
    ],
    "submitAction": "Refund|Submit",
    "createdText": "Refund",
    "nextAction": "Timeline|Details"
  },
  {
    "title": "Connected account onboarding and capabilities",
    "section": "Connect|Accounts",
    "createAction": "Create account|Add account",
    "fields": [
      "Name",
      "Email"
    ],
    "submitAction": "Create|Save",
    "createdText": "Account",
    "nextAction": "Requirements|Capabilities"
  },
  {
    "title": "Webhook endpoint and signed test delivery",
    "section": "Developers|Webhooks",
    "createAction": "Add endpoint|Create webhook",
    "fields": [
      "URL",
      "Events"
    ],
    "submitAction": "Add|Create|Save",
    "createdText": "Endpoint",
    "nextAction": "Send test|Test"
  },
  {
    "title": "Invoice finalization and credit adjustment",
    "section": "Billing|Invoices",
    "createAction": "Create invoice|New invoice",
    "fields": [
      "Customer"
    ],
    "submitAction": "Create|Save",
    "createdText": "Invoice",
    "nextAction": "Finalize|Review"
  },
  {
    "title": "Tax setup and invoice calculation",
    "section": "Settings|Tax|Billing",
    "createAction": "Register|Add tax location",
    "fields": [
      "Country|Region"
    ],
    "submitAction": "Save|Register",
    "createdText": "Tax registration",
    "nextAction": "Preview|Calculate"
  },
  {
    "title": "Risk rule setup and flagged payment review",
    "section": "Radar|Risk",
    "createAction": "Create rule|New rule",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Rule",
    "nextAction": "Review|Test"
  },
  {
    "title": "Restricted API key and audit",
    "section": "Developers|API keys|Settings",
    "createAction": "Create key|New key",
    "fields": [
      "Name",
      "Permissions|Scope"
    ],
    "submitAction": "Create|Save",
    "createdText": "Key",
    "nextAction": "Audit|Review"
  }
] as const;
