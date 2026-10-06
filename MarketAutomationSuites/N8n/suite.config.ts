// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "n8n";
export const journeys = [
  {
    "title": "Workflow creation and node validation",
    "section": "Workflows",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Edit|Open"
  },
  {
    "title": "Webhook trigger and request response",
    "section": "Workflows|Triggers",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Activate|Test"
  },
  {
    "title": "Credential setup and connection check",
    "section": "Credentials|Settings",
    "createAction": "Add credential|New credential",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Credential",
    "nextAction": "Test|Connect"
  },
  {
    "title": "Execution launch and node results",
    "section": "Workflows|Executions",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Execute|Run"
  },
  {
    "title": "Error workflow and recovery run",
    "section": "Workflows|Settings",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Execute|Run"
  },
  {
    "title": "Environment creation and promotion",
    "section": "Projects|Environments",
    "createAction": "New project|Create project",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Promote|Deploy"
  },
  {
    "title": "Worker queue health and concurrency",
    "section": "Settings|Queue|Workers",
    "createAction": "Add worker|New worker",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Add",
    "createdText": "Worker",
    "nextAction": "Health|Queue"
  },
  {
    "title": "Workflow sharing and viewer permissions",
    "section": "Workflows|Projects|Users",
    "createAction": "Invite|Share",
    "fields": [
      "Email",
      "Role"
    ],
    "submitAction": "Invite|Share",
    "createdText": "User|Workflow",
    "nextAction": "Permissions|Access"
  },
  {
    "title": "Execution retry and retention review",
    "section": "Executions|Workflows",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Executions|Run"
  },
  {
    "title": "API workflow creation and audit verification",
    "section": "Workflows|Settings|API",
    "createAction": "New workflow|Create workflow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Audit|History"
  }
] as const;
