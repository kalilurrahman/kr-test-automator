// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Supabase";
export const journeys = [
  {
    "title": "Project creation and database provisioning",
    "section": "Projects",
    "createAction": "New project|Create project",
    "fields": [
      "Name",
      "Database password"
    ],
    "submitAction": "Create|Provision",
    "createdText": "Project",
    "nextAction": "Database|Table editor"
  },
  {
    "title": "Schema migration and table policy validation",
    "section": "Database|SQL editor|Table editor",
    "createAction": "New table|Create table|New query",
    "fields": [
      "Name|Query name"
    ],
    "submitAction": "Create|Save|Run",
    "createdText": "Table|Query",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Auth signup and row-level isolation",
    "section": "Authentication|Users",
    "createAction": "Add user|Invite user",
    "fields": [
      "Email"
    ],
    "submitAction": "Create|Invite",
    "createdText": "User",
    "nextAction": "Policies|Configure"
  },
  {
    "title": "Realtime subscription and authorization",
    "section": "Realtime",
    "createAction": "Create channel|New channel",
    "fields": [
      "Name|Channel"
    ],
    "submitAction": "Create|Save",
    "createdText": "Channel",
    "nextAction": "Subscribe|Test"
  },
  {
    "title": "Private bucket upload and signed URL access",
    "section": "Storage|Buckets",
    "createAction": "New bucket|Create bucket",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Bucket",
    "nextAction": "Upload|Add file"
  },
  {
    "title": "Edge function deployment and request verification",
    "section": "Edge Functions|Functions",
    "createAction": "Deploy function|New function",
    "fields": [
      "Name"
    ],
    "submitAction": "Deploy|Create",
    "createdText": "Function",
    "nextAction": "Invoke|Test"
  },
  {
    "title": "Preview branch migration and promotion",
    "section": "Branches|Database",
    "createAction": "Create branch|New branch",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Branch",
    "nextAction": "Migrations|Deploy"
  },
  {
    "title": "API key lifecycle and least-privilege review",
    "section": "Settings|API|Access",
    "createAction": "Create key|New key",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Key",
    "nextAction": "Permissions|Rotate"
  },
  {
    "title": "Backup restore and synthetic data reconciliation",
    "section": "Database|Backups",
    "createAction": "Restore|Create restore",
    "fields": [
      "Name|Target project"
    ],
    "submitAction": "Restore|Create",
    "createdText": "Restore",
    "nextAction": "Start|Confirm"
  },
  {
    "title": "Log correlation and incident export",
    "section": "Logs|Observability",
    "createAction": "Create alert|Export logs",
    "fields": [
      "Name|Query"
    ],
    "submitAction": "Create|Export",
    "createdText": "Alert|Logs",
    "nextAction": "Run|Preview"
  }
] as const;
