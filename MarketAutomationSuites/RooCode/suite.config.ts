// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Roo Code";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Ask-to-architect mode change and documentation-only restriction",
    "section": "Roo Code|Modes",
    "createAction": "New task|Start task",
    "fields": [
      "Task",
      "Mode"
    ],
    "submitAction": "Start|Submit",
    "createdText": "Task",
    "nextAction": "Switch mode|Review"
  },
  {
    "title": "Orchestrated feature plan, child modes, and result handoff",
    "section": "Roo Code|Orchestrator",
    "createAction": "New orchestration|Start task",
    "fields": [
      "Feature goal",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Orchestration",
    "nextAction": "Subtasks|Review"
  },
  {
    "title": "Custom mode creation, path restriction, and execution",
    "section": "Settings|Custom modes",
    "createAction": "New mode|Create custom mode",
    "fields": [
      "Mode name",
      "Instructions"
    ],
    "submitAction": "Create|Save",
    "createdText": "Custom mode",
    "nextAction": "Validate|Run"
  },
  {
    "title": "Mode-scoped MCP server call and write approval",
    "section": "Settings|MCP",
    "createAction": "Add server|Configure tools",
    "fields": [
      "Server name",
      "Endpoint"
    ],
    "submitAction": "Add|Save",
    "createdText": "Server",
    "nextAction": "Run tool|Approve"
  },
  {
    "title": "Local browser verification and workspace file boundary",
    "section": "Browser|Workspace",
    "createAction": "New browser task|Open app",
    "fields": [
      "Local URL",
      "Scenario"
    ],
    "submitAction": "Start|Open",
    "createdText": "Browser session",
    "nextAction": "Evidence|Close"
  },
  {
    "title": "Context compaction, checkpoint creation, and safe restore",
    "section": "Tasks|Checkpoints",
    "createAction": "New task|Start",
    "fields": [
      "Task name",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Checkpoint",
    "nextAction": "Condense|Restore"
  },
  {
    "title": "Sticky mode model selection and provider failure handling",
    "section": "Settings|Models",
    "createAction": "New model profile|Add provider",
    "fields": [
      "Provider",
      "Model"
    ],
    "submitAction": "Add|Save",
    "createdText": "Profile",
    "nextAction": "Select|History"
  },
  {
    "title": "Patch review, command permission, and denied-action handling",
    "section": "Workspace|Approvals",
    "createAction": "New edit task|Start",
    "fields": [
      "Task",
      "Target file"
    ],
    "submitAction": "Start|Run",
    "createdText": "Change",
    "nextAction": "Preview|Approve"
  },
  {
    "title": "Interrupted child task retry and parent recovery",
    "section": "Tasks|History",
    "createAction": "New task|Start orchestration",
    "fields": [
      "Task",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Task",
    "nextAction": "Retry|Resume"
  },
  {
    "title": "Security review of path, prompt, tool, and secret boundaries",
    "section": "Security|Review",
    "createAction": "New review|Run security check",
    "fields": [
      "Workspace",
      "Policy"
    ],
    "submitAction": "Run|Start",
    "createdText": "Security report",
    "nextAction": "Findings|Audit"
  }
] as const;
