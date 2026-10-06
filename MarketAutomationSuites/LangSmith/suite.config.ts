// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "LangChain and LangSmith";
export const journeys = [
  {
    "title": "Project setup and first trace inspection",
    "section": "Projects",
    "createAction": "New project|Create project",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Traces|Runs"
  },
  {
    "title": "Prompt revision publish and rollback",
    "section": "Prompts",
    "createAction": "Create prompt|New prompt",
    "fields": [
      "Name|Prompt name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Prompt",
    "nextAction": "Publish|Version"
  },
  {
    "title": "Dataset import and schema validation",
    "section": "Datasets",
    "createAction": "Create dataset|New dataset",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Dataset",
    "nextAction": "Examples|Add examples"
  },
  {
    "title": "Evaluation run and quality gate review",
    "section": "Evaluations|Experiments",
    "createAction": "New evaluation|Run evaluation",
    "fields": [
      "Name|Dataset"
    ],
    "submitAction": "Create|Run",
    "createdText": "Evaluation|Experiment",
    "nextAction": "Run|Start"
  },
  {
    "title": "Agent graph deployment and checkpoint resume",
    "section": "Deployments|Agents|Playground",
    "createAction": "New deployment|Create graph",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Deployment|Graph",
    "nextAction": "Test|Run"
  },
  {
    "title": "Tool allowlist and human approval workflow",
    "section": "Settings|Tools|Approvals",
    "createAction": "Add tool|New approval",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Tool|Approval",
    "nextAction": "Approve|Review"
  },
  {
    "title": "Thread creation, stream review, and resume",
    "section": "Threads|Runs",
    "createAction": "New thread|Create thread",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Thread",
    "nextAction": "Resume|Continue"
  },
  {
    "title": "Model route setup and provider fallback review",
    "section": "Models|Settings",
    "createAction": "Add model|New route",
    "fields": [
      "Name|Model"
    ],
    "submitAction": "Save|Create",
    "createdText": "Model|Route",
    "nextAction": "Test|Run"
  },
  {
    "title": "Role revocation and private trace boundary",
    "section": "Settings|Members|Access",
    "createAction": "Invite member|Add member",
    "fields": [
      "Email"
    ],
    "submitAction": "Invite|Add",
    "createdText": "Member|Role",
    "nextAction": "Permissions|Roles"
  },
  {
    "title": "Deployment health alert and incident trace export",
    "section": "Monitoring|Alerts",
    "createAction": "Create alert|New alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "Test|Export"
  }
] as const;
