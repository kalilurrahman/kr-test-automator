// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "CrewAI";
export const journeys = [
  {
    "title": "Agent creation and bounded task execution",
    "section": "Agents|Crew",
    "createAction": "New agent|Create agent",
    "fields": [
      "Role",
      "Goal"
    ],
    "submitAction": "Create|Save",
    "createdText": "Agent",
    "nextAction": "Run|Test"
  },
  {
    "title": "Crew assembly and sequential run",
    "section": "Crews",
    "createAction": "New crew|Create crew",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Crew",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Flow creation and conditional routing",
    "section": "Flows",
    "createAction": "New flow|Create flow",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Flow",
    "nextAction": "Run|Test"
  },
  {
    "title": "Tool registration and argument validation",
    "section": "Tools|Integrations",
    "createAction": "New tool|Add tool",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Tool",
    "nextAction": "Test|Validate"
  },
  {
    "title": "Knowledge ingestion and cited retrieval",
    "section": "Knowledge|Sources",
    "createAction": "Add source|Ingest",
    "fields": [
      "Name",
      "File|URL"
    ],
    "submitAction": "Add|Ingest|Save",
    "createdText": "Knowledge source",
    "nextAction": "Search|Query"
  },
  {
    "title": "Guardrail setup and rejected output review",
    "section": "Guardrails|Settings",
    "createAction": "New guardrail|Create guardrail",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Guardrail",
    "nextAction": "Test|Run"
  },
  {
    "title": "Approval pause and resume",
    "section": "Approvals|Runs",
    "createAction": "New approval|Create policy",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Approval",
    "nextAction": "Approve|Review"
  },
  {
    "title": "Deployment health and rollback",
    "section": "Deployments",
    "createAction": "New deployment|Deploy",
    "fields": [
      "Name"
    ],
    "submitAction": "Deploy|Create",
    "createdText": "Deployment",
    "nextAction": "Health|Rollback"
  },
  {
    "title": "Trace inspection and evaluation",
    "section": "Traces|Evaluations",
    "createAction": "New evaluation|Create evaluation",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Evaluation",
    "nextAction": "Run|Compare"
  },
  {
    "title": "Scoped API access and audit",
    "section": "Settings|Users|API",
    "createAction": "Create key|New token",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "API key|Token",
    "nextAction": "Audit|Access"
  }
] as const;
