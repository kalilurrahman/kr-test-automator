// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Airbyte";
export const journeys = [
  {
    "title": "Source setup and schema discovery",
    "section": "Sources",
    "createAction": "New source|Create source",
    "fields": [
      "Name",
      "URL|Host"
    ],
    "submitAction": "Create|Save",
    "createdText": "Source",
    "nextAction": "Discover|Discover schema"
  },
  {
    "title": "Destination setup and connection check",
    "section": "Destinations",
    "createAction": "New destination|Create destination",
    "fields": [
      "Name",
      "Host|URL"
    ],
    "submitAction": "Create|Save",
    "createdText": "Destination",
    "nextAction": "Test|Check connection"
  },
  {
    "title": "Connection creation and stream selection",
    "section": "Connections",
    "createAction": "New connection|Create connection",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connection",
    "nextAction": "Configure|Set up"
  },
  {
    "title": "Initial sync and record reconciliation",
    "section": "Connections|Syncs",
    "createAction": "New connection|Create connection",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connection",
    "nextAction": "Sync now|Run sync"
  },
  {
    "title": "Incremental sync and checkpoint review",
    "section": "Connections|Jobs",
    "createAction": "New connection|Create connection",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connection",
    "nextAction": "Sync now|Run sync"
  },
  {
    "title": "Schedule creation and next-run review",
    "section": "Connections|Schedules",
    "createAction": "New schedule|Create schedule",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Schedule",
    "nextAction": "Enable|Activate"
  },
  {
    "title": "Connector validation and publication",
    "section": "Connector Builder|Connectors",
    "createAction": "New connector|Create connector",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connector",
    "nextAction": "Test|Validate"
  },
  {
    "title": "Job failure inspection and retry",
    "section": "Jobs|History",
    "createAction": "New connection|Create connection",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Job|Connection",
    "nextAction": "Retry|Run again"
  },
  {
    "title": "Workspace role boundary review",
    "section": "Settings|Users|Access",
    "createAction": "Invite user|Add user",
    "fields": [
      "Email",
      "Role"
    ],
    "submitAction": "Invite|Save",
    "createdText": "User",
    "nextAction": "Permissions|Access"
  },
  {
    "title": "API-created connection and job status",
    "section": "Connections|Jobs",
    "createAction": "New connection|Create connection",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Connection",
    "nextAction": "View job|History"
  }
] as const;
