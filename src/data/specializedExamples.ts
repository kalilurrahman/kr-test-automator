// Curated example business cases used to verify that the generator routes
// framework + language correctly for the model-based and VBScript specialised
// outputs. Surfaced as quick-pick chips in the InputPanel whenever the user
// selects Tricentis Tosca or UFT One.

export interface SpecializedExample {
  id: string;
  label: string;
  framework: "tricentis_tosca" | "uft_one";
  language: "model-based" | "vbscript";
  businessCase: string;
}

export const specializedExamples: SpecializedExample[] = [
  {
    id: "tosca-sap-po",
    label: "Tosca · SAP PO Approval",
    framework: "tricentis_tosca",
    language: "model-based",
    businessCase:
      "Build a Tricentis Tosca model-based test for SAP S/4HANA Fiori Purchase Order approval. " +
      "Include modules for the Manage Purchase Orders app, vendor search help, item table and approval dialog. " +
      "Cover input, verify and wait action modes for header data, line items and the 2-level release strategy. " +
      "Provide test data for at least three vendors and two value bands, plus a recovery scenario for missing release codes.",
  },
  {
    id: "tosca-sf-lead",
    label: "Tosca · Salesforce Lead Convert",
    framework: "tricentis_tosca",
    language: "model-based",
    businessCase:
      "Model the Salesforce Sales Cloud lead-to-opportunity conversion in Tosca. " +
      "Define xModules for the Lead detail page, Convert dialog, Account/Contact/Opportunity records. " +
      "Show input/verify steps for required fields, duplicate-detection branches and post-conversion assertions on related lists.",
  },
  {
    id: "uft-banking-login",
    label: "UFT · Online Banking Login",
    framework: "uft_one",
    language: "vbscript",
    businessCase:
      "Generate a UFT One VBScript that automates an online banking login flow. " +
      "Use Object Repository style Browser/Page/WebEdit/WebButton calls, Option Explicit, " +
      "DataTable-driven iteration over valid and invalid credentials, Reporter.ReportEvent assertions for " +
      "successful dashboard load, lockout after three failures, and synchronisation waits between page transitions.",
  },
  {
    id: "uft-erp-invoice",
    label: "UFT · ERP Invoice Posting",
    framework: "uft_one",
    language: "vbscript",
    businessCase:
      "Produce a UFT One VBScript test for posting a vendor invoice in a web ERP. " +
      "Include reusable Sub/Function blocks for login, navigation, line-item entry and tax validation. " +
      "Drive line items from the DataTable, assert posted document number with Reporter.ReportEvent, " +
      "and add On Error handling for tolerance check failures.",
  },
];
