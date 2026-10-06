// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "JetBrains Junie";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "IDE project selection, context scope, and ignored files",
    "section": "Projects|AI Chat",
    "createAction": "Open project|New session",
    "fields": [
      "Project path",
      "Task"
    ],
    "submitAction": "Open|Start",
    "createdText": "Session",
    "nextAction": "Context|Review"
  },
  {
    "title": "Multi-step implementation plan and approval",
    "section": "AI Chat|Junie",
    "createAction": "New task|Start chat",
    "fields": [
      "Task description",
      "Project"
    ],
    "submitAction": "Start|Submit",
    "createdText": "Plan",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Scoped code change, inspection, and diff review",
    "section": "Editor|Changes",
    "createAction": "Implement task|New request",
    "fields": [
      "Task description",
      "Target module"
    ],
    "submitAction": "Run|Start",
    "createdText": "Change",
    "nextAction": "Diff|Review"
  },
  {
    "title": "Debugger breakpoint inspection and safe resume",
    "section": "Debug|AI Chat",
    "createAction": "New debug task|Diagnose",
    "fields": [
      "Session",
      "Failure"
    ],
    "submitAction": "Start|Inspect",
    "createdText": "Diagnosis",
    "nextAction": "Breakpoint|Resume"
  },
  {
    "title": "Headless CLI run, validation result, and cleanup",
    "section": "CI|Junie CLI",
    "createAction": "New run|Start headless",
    "fields": [
      "Workspace",
      "Task"
    ],
    "submitAction": "Start|Run",
    "createdText": "CLI run",
    "nextAction": "Validation|Cleanup"
  },
  {
    "title": "Focused unit-test generation, execution, and repair",
    "section": "Tests|AI Chat",
    "createAction": "Generate test|New test task",
    "fields": [
      "Test name",
      "Source path"
    ],
    "submitAction": "Generate|Save",
    "createdText": "Test run",
    "nextAction": "Results|Repair"
  },
  {
    "title": "MCP server setup, write approval, and access audit",
    "section": "Settings|MCP",
    "createAction": "Add server|New MCP server",
    "fields": [
      "Server name",
      "Endpoint"
    ],
    "submitAction": "Add|Save",
    "createdText": "Server",
    "nextAction": "Tools|Audit"
  },
  {
    "title": "Project-aware PR review and revised finding",
    "section": "Pull requests|Reviews",
    "createAction": "New review|Review change",
    "fields": [
      "PR reference",
      "Revision"
    ],
    "submitAction": "Start|Review",
    "createdText": "Review",
    "nextAction": "Finding|Recheck"
  },
  {
    "title": "Terminal permission denial and sandbox boundary",
    "section": "Settings|Permissions",
    "createAction": "New policy|Configure sandbox",
    "fields": [
      "Workspace",
      "Command policy"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Policy",
    "nextAction": "Test|Audit"
  },
  {
    "title": "Interrupted IDE session resume and pending-work status",
    "section": "Sessions|History",
    "createAction": "New session|Start task",
    "fields": [
      "Session name",
      "Task"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Resume|Status"
  }
] as const;
