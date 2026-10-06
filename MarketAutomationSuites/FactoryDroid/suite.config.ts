// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Factory Droid";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Autonomy level, command risk, and explicit policy block",
    "section": "Droid|Settings",
    "createAction": "New policy|Configure autonomy",
    "fields": [
      "Policy name",
      "Autonomy level"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Policy",
    "nextAction": "Run|Audit"
  },
  {
    "title": "Spec plan review, approval gate, and implementation start",
    "section": "Droid|Spec",
    "createAction": "New task|Start spec",
    "fields": [
      "Task description",
      "Workspace"
    ],
    "submitAction": "Start|Plan",
    "createdText": "Plan",
    "nextAction": "Approve|Implement"
  },
  {
    "title": "Mission plan, worker delegation, validation, and cancellation",
    "section": "Missions|Mission Control",
    "createAction": "New mission|Create mission",
    "fields": [
      "Mission name",
      "Goal"
    ],
    "submitAction": "Create|Start",
    "createdText": "Mission",
    "nextAction": "Workers|Validate"
  },
  {
    "title": "Custom Droid tool scope and inherited autonomy",
    "section": "Droids|Subagents",
    "createAction": "New Droid|Create agent",
    "fields": [
      "Droid name",
      "Role"
    ],
    "submitAction": "Create|Save",
    "createdText": "Droid",
    "nextAction": "Permissions|Run"
  },
  {
    "title": "Mock MCP allowlist, plugin policy, and hook audit",
    "section": "Settings|Plugins|MCP",
    "createAction": "Add server|Install plugin",
    "fields": [
      "Server URL",
      "Plugin"
    ],
    "submitAction": "Add|Install",
    "createdText": "Integration",
    "nextAction": "Validate|Audit"
  },
  {
    "title": "Browser QA evidence, blocked host, and test report",
    "section": "Droid Control|QA",
    "createAction": "New QA flow|Run QA",
    "fields": [
      "Test URL",
      "Scenario"
    ],
    "submitAction": "Run|Start",
    "createdText": "QA run",
    "nextAction": "Evidence|Report"
  },
  {
    "title": "Software Factory issue triage and review workflow",
    "section": "Software Factory|Workflows",
    "createAction": "New workflow|Create automation",
    "fields": [
      "Workflow name",
      "Trigger"
    ],
    "submitAction": "Create|Save",
    "createdText": "Workflow",
    "nextAction": "Run|Review"
  },
  {
    "title": "Managed model policy, network rule, and autonomy ceiling",
    "section": "Admin|Enterprise Controls",
    "createAction": "New managed rule|Configure policy",
    "fields": [
      "Policy name",
      "Scope"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Managed policy",
    "nextAction": "Validate|Export"
  },
  {
    "title": "SDK session launch, event stream, and resource cleanup",
    "section": "SDK|Sessions",
    "createAction": "New session|Start run",
    "fields": [
      "Workspace",
      "Prompt"
    ],
    "submitAction": "Start|Run",
    "createdText": "SDK session",
    "nextAction": "Events|Stop"
  },
  {
    "title": "Mission diff review, evidence reconciliation, and audit export",
    "section": "Reviews|Audit",
    "createAction": "New report|Create report",
    "fields": [
      "Mission ID",
      "Revision"
    ],
    "submitAction": "Create|Run",
    "createdText": "Review report",
    "nextAction": "Reconcile|Export"
  }
] as const;
