// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Prefect";
export const journeys = [
  {
    "title": "Flow registration and parameterized run",
    "section": "Flows|Deployments",
    "createAction": "New flow|Create flow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Flow",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Deployment creation and schedule validation",
    "section": "Deployments",
    "createAction": "New deployment|Create deployment",
    "fields": [
      "Name",
      "Flow"
    ],
    "submitAction": "Create|Save",
    "createdText": "Deployment",
    "nextAction": "Run|Schedule"
  },
  {
    "title": "Work pool setup and worker health",
    "section": "Work Pools|Workers",
    "createAction": "New work pool|Create pool",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Work pool",
    "nextAction": "Workers|Start worker"
  },
  {
    "title": "Task retry and final state inspection",
    "section": "Runs|Flows",
    "createAction": "Run flow|New run",
    "fields": [
      "Name"
    ],
    "submitAction": "Run|Create",
    "createdText": "Flow run",
    "nextAction": "Retry|Logs"
  },
  {
    "title": "Event automation creation and test trigger",
    "section": "Automations|Events",
    "createAction": "New automation|Create automation",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Automation",
    "nextAction": "Test|Trigger"
  },
  {
    "title": "Block creation and secret reference",
    "section": "Blocks|Settings",
    "createAction": "New block|Create block",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Block",
    "nextAction": "Test|Save"
  },
  {
    "title": "Concurrency configuration and queue review",
    "section": "Settings|Concurrency",
    "createAction": "New limit|Create limit",
    "fields": [
      "Name",
      "Limit"
    ],
    "submitAction": "Create|Save",
    "createdText": "Concurrency limit",
    "nextAction": "Runs|Queue"
  },
  {
    "title": "Artifact publication and run trace",
    "section": "Runs|Artifacts",
    "createAction": "Run flow|New run",
    "fields": [
      "Name"
    ],
    "submitAction": "Run|Create",
    "createdText": "Flow run",
    "nextAction": "Artifacts|Logs"
  },
  {
    "title": "API-triggered run and idempotency",
    "section": "Deployments|API",
    "createAction": "New deployment|Create deployment",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Deployment",
    "nextAction": "Runs|History"
  },
  {
    "title": "Role boundary and deployment permission",
    "section": "Settings|Users|Workspace",
    "createAction": "Invite user|Add user",
    "fields": [
      "Email",
      "Role"
    ],
    "submitAction": "Invite|Save",
    "createdText": "User",
    "nextAction": "Access|Permissions"
  }
] as const;
