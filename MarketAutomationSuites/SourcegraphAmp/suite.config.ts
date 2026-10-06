// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Sourcegraph Amp";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Codebase search, cited context, and revision freshness",
    "section": "Amp|Threads|Search",
    "createAction": "New thread|Ask codebase",
    "fields": [
      "Question",
      "Repository"
    ],
    "submitAction": "Start|Submit",
    "createdText": "Thread",
    "nextAction": "Results|Citations"
  },
  {
    "title": "Thread creation, orb revision, and cloud cleanup",
    "section": "Amp|Threads|Orbs",
    "createAction": "New thread|Start task",
    "fields": [
      "Task",
      "Repository"
    ],
    "submitAction": "Start|Run",
    "createdText": "Orb",
    "nextAction": "Revision|Stop"
  },
  {
    "title": "Agentic feature implementation, tests, and diff review",
    "section": "Amp|Threads|Code",
    "createAction": "New implementation task|Start",
    "fields": [
      "Task description",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Change",
    "nextAction": "Tests|Diff"
  },
  {
    "title": "MCP tool registration, approval, and endpoint denial",
    "section": "Settings|MCP|Tools",
    "createAction": "Add server|New tool",
    "fields": [
      "Server name",
      "Endpoint"
    ],
    "submitAction": "Add|Save",
    "createdText": "Tool",
    "nextAction": "Run|Audit"
  },
  {
    "title": "Allowed model route, provider outage, and recovery",
    "section": "Settings|Models",
    "createAction": "New model profile|Add provider",
    "fields": [
      "Profile name",
      "Provider"
    ],
    "submitAction": "Add|Save",
    "createdText": "Profile",
    "nextAction": "Run|Recover"
  },
  {
    "title": "Background task disconnect, completion notification, and resume",
    "section": "Threads|Notifications",
    "createAction": "New background task|Start",
    "fields": [
      "Task",
      "Notify channel"
    ],
    "submitAction": "Start|Run",
    "createdText": "Thread",
    "nextAction": "Status|Resume"
  },
  {
    "title": "Draft change creation, pending checks, and merge prevention",
    "section": "Code review|Changes",
    "createAction": "New review task|Prepare change",
    "fields": [
      "Task",
      "Repository"
    ],
    "submitAction": "Start|Prepare",
    "createdText": "Draft change",
    "nextAction": "Checks|Review"
  },
  {
    "title": "Thread sharing, collaborator scope, and link revocation",
    "section": "Threads|Sharing",
    "createAction": "Share thread|Invite collaborator",
    "fields": [
      "Thread ID",
      "Collaborator"
    ],
    "submitAction": "Share|Invite",
    "createdText": "Share link",
    "nextAction": "Access|Revoke"
  },
  {
    "title": "Excluded secret fixture, tenant isolation, and sandbox boundary",
    "section": "Security|Privacy",
    "createAction": "New security review|Run check",
    "fields": [
      "Workspace",
      "Policy"
    ],
    "submitAction": "Run|Start",
    "createdText": "Security report",
    "nextAction": "Findings|Audit"
  },
  {
    "title": "Pinned regression prompt, trace evidence, and scoped report",
    "section": "Evaluations|Observability",
    "createAction": "New evaluation|Run regression",
    "fields": [
      "Suite name",
      "Revision"
    ],
    "submitAction": "Create|Run",
    "createdText": "Evaluation",
    "nextAction": "Trace|Export"
  }
] as const;
