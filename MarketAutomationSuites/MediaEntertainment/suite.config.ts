// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Media & Entertainment";
export const industryDomain = "media-content";
export const journeys = [
  {
    "title": "Synthetic asset ingest, metadata validation, and quarantine",
    "section": "Content|Ingest",
    "createAction": "New asset|Upload media",
    "fields": [
      "Asset ID",
      "Content type"
    ],
    "submitAction": "Upload|Save",
    "createdText": "Asset",
    "nextAction": "Validate|Quarantine"
  },
  {
    "title": "Editorial review, revision locking, and embargo scheduling",
    "section": "Editorial|Planning",
    "createAction": "New story|Create story",
    "fields": [
      "Story ID",
      "Desk"
    ],
    "submitAction": "Create|Save",
    "createdText": "Story",
    "nextAction": "Review|Schedule"
  },
  {
    "title": "Mock license territory, expiration, and rights extension",
    "section": "Rights|Licensing",
    "createAction": "New rights record|Create license",
    "fields": [
      "License ID",
      "Asset"
    ],
    "submitAction": "Create|Save",
    "createdText": "Rights record",
    "nextAction": "Review|Extend"
  },
  {
    "title": "Production task assignment, edit revision, and quality gate",
    "section": "Production|Post-production",
    "createAction": "New project|Create project",
    "fields": [
      "Project ID",
      "Production type"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Review|Deliver"
  },
  {
    "title": "Media rendition processing, retry, and package verification",
    "section": "Processing|Delivery",
    "createAction": "New job|Transcode asset",
    "fields": [
      "Asset ID",
      "Profile"
    ],
    "submitAction": "Start|Simulate",
    "createdText": "Processing job",
    "nextAction": "Retry|Verify"
  },
  {
    "title": "Channel publish schedule, webhook retry, and withdrawal",
    "section": "Publishing|Channels",
    "createAction": "New release|Schedule",
    "fields": [
      "Release ID",
      "Channel"
    ],
    "submitAction": "Schedule|Publish",
    "createdText": "Release",
    "nextAction": "Withdraw|History"
  },
  {
    "title": "Mock subscription entitlement and payment-provider timeout",
    "section": "Subscriptions|Monetization",
    "createAction": "New plan|Create plan",
    "fields": [
      "Plan ID",
      "Term"
    ],
    "submitAction": "Create|Save",
    "createdText": "Subscription",
    "nextAction": "Entitlement|Cancel"
  },
  {
    "title": "Pseudonymous audience moderation and independent appeal",
    "section": "Audience|Community",
    "createAction": "New comment|Create fixture",
    "fields": [
      "Comment ID",
      "Community"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Moderation case",
    "nextAction": "Appeal|Disposition"
  },
  {
    "title": "Caption accessibility, localized metadata, and release matrix",
    "section": "Accessibility|Localization",
    "createAction": "New locale|Add translation",
    "fields": [
      "Asset ID",
      "Locale"
    ],
    "submitAction": "Create|Save",
    "createdText": "Locale package",
    "nextAction": "Validate|Approve"
  },
  {
    "title": "Synthetic analytics lineage, tenant isolation, and job recovery",
    "section": "Analytics|Security",
    "createAction": "New report|Create report",
    "fields": [
      "Report ID",
      "Date range"
    ],
    "submitAction": "Create|Run",
    "createdText": "Report",
    "nextAction": "Lineage|Recover"
  }
] as const;
