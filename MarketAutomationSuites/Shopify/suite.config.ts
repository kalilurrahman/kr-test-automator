// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Shopify";
export const journeys = [
  {
    "title": "Product creation and channel publication",
    "section": "Products|Catalog",
    "createAction": "Add product|Create product",
    "fields": [
      "Title",
      "Price"
    ],
    "submitAction": "Save|Create",
    "createdText": "Product",
    "nextAction": "Publish|Manage"
  },
  {
    "title": "Inventory receipt and balance reconciliation",
    "section": "Products|Inventory",
    "createAction": "Adjust quantity|Receive inventory",
    "fields": [
      "SKU",
      "Quantity"
    ],
    "submitAction": "Save|Update",
    "createdText": "Inventory",
    "nextAction": "Locations|History"
  },
  {
    "title": "Discounted checkout and order creation",
    "section": "Orders|Checkout",
    "createAction": "Create order|New draft order",
    "fields": [
      "Customer",
      "Product"
    ],
    "submitAction": "Create|Save",
    "createdText": "Order",
    "nextAction": "Checkout|Complete"
  },
  {
    "title": "Order fulfillment and tracking",
    "section": "Orders|Fulfillment",
    "createAction": "Open order|Fulfill items",
    "fields": [
      "Order"
    ],
    "submitAction": "Fulfill|Create",
    "createdText": "Fulfillment",
    "nextAction": "Tracking|Mark fulfilled"
  },
  {
    "title": "Partial refund and financial status",
    "section": "Orders|Payments",
    "createAction": "Open order|Refund",
    "fields": [
      "Order",
      "Amount"
    ],
    "submitAction": "Refund|Submit",
    "createdText": "Refund",
    "nextAction": "Transactions|Timeline"
  },
  {
    "title": "Shipping rate and label creation",
    "section": "Orders|Shipping",
    "createAction": "Create shipment|Fulfill items",
    "fields": [
      "Order"
    ],
    "submitAction": "Create|Save",
    "createdText": "Shipment|Fulfillment",
    "nextAction": "Buy label|Create label"
  },
  {
    "title": "Promotion rule and eligibility",
    "section": "Discounts",
    "createAction": "Create discount|Add discount",
    "fields": [
      "Code|Title",
      "Value"
    ],
    "submitAction": "Save|Create",
    "createdText": "Discount",
    "nextAction": "Test|Preview"
  },
  {
    "title": "Customer consent and account scope",
    "section": "Customers",
    "createAction": "Add customer|Create customer",
    "fields": [
      "Email",
      "First name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Customer",
    "nextAction": "Orders|View"
  },
  {
    "title": "App scopes and webhook delivery",
    "section": "Apps|Settings|Notifications",
    "createAction": "Install app|Add webhook",
    "fields": [
      "Name|URL"
    ],
    "submitAction": "Install|Save|Create",
    "createdText": "App|Webhook",
    "nextAction": "Test|Send"
  },
  {
    "title": "Market tax setup and analytics reconciliation",
    "section": "Settings|Markets|Analytics",
    "createAction": "Add market|Create market",
    "fields": [
      "Name",
      "Country|Region"
    ],
    "submitAction": "Save|Create",
    "createdText": "Market",
    "nextAction": "Reports|Analytics"
  }
] as const;
