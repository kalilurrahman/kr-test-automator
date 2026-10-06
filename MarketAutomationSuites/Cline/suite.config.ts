// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Cline";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Plan-only task, approval, and act-mode implementation",
    "section": "Cline|Tasks",
    "createAction": "New task|Start task",
    "fields": [
      "Task description",
      "Workspace"
    ],
    "submitAction": "Start|Submit",
    "createdText": "Task",
    "nextAction": "Plan|Approve"
  },
  {
    "title": "High-risk terminal approval and denied-action record",
    "section": "Cline|Approvals",
    "createAction": "New task|Run command task",
    "fields": [
      "Task description",
      "Command"
    ],
    "submitAction": "Start|Run",
    "createdText": "Tool request",
    "nextAction": "Approve|Deny"
  },
  {
    "title": "Mock MCP server, plugin tools, and disable flow",
    "section": "Settings|MCP|Plugins",
    "createAction": "Add MCP server|New plugin",
    "fields": [
      "Name",
      "Config path"
    ],
    "submitAction": "Add|Save",
    "createdText": "Server",
    "nextAction": "Validate|Disable"
  },
  {
    "title": "Patch conflict, user-edit preservation, and terminal status",
    "section": "Workspace|Editor",
    "createAction": "New edit task|Start task",
    "fields": [
      "Task",
      "File path"
    ],
    "submitAction": "Start|Run",
    "createdText": "Change",
    "nextAction": "Diff|Review"
  },
  {
    "title": "Allowlisted browser navigation and untrusted-page handling",
    "section": "Browser|Web",
    "createAction": "New browser task|Open URL",
    "fields": [
      "Test URL",
      "Task"
    ],
    "submitAction": "Start|Open",
    "createdText": "Browser session",
    "nextAction": "Evidence|Close"
  },
  {
    "title": "Task persistence, reconnect, and checkpoint resume",
    "section": "Tasks|History",
    "createAction": "New task|Start",
    "fields": [
      "Task name",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Resume|Checkpoint"
  },
  {
    "title": "Provider selection, secret masking, and transient retry",
    "section": "Settings|Models",
    "createAction": "New provider|Add model",
    "fields": [
      "Provider",
      "Model ID"
    ],
    "submitAction": "Add|Save",
    "createdText": "Configuration",
    "nextAction": "Test|History"
  },
  {
    "title": "ACP launch, cancellation, and structured completion",
    "section": "CLI|ACP",
    "createAction": "New ACP run|Start agent",
    "fields": [
      "Prompt",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Agent run",
    "nextAction": "Cancel|Result"
  },
  {
    "title": "Scoped rules, excluded files, and safe rollback",
    "section": "Workspace|Rules|Checkpoints",
    "createAction": "Add rule|Create checkpoint",
    "fields": [
      "Rule path",
      "Pattern"
    ],
    "submitAction": "Save|Create",
    "createdText": "Rule",
    "nextAction": "Validate|Restore"
  },
  {
    "title": "Workspace boundary, ignore policy, and security review",
    "section": "Security|Workspace",
    "createAction": "New security check|Run review",
    "fields": [
      "Workspace",
      "Policy"
    ],
    "submitAction": "Run|Start",
    "createdText": "Security report",
    "nextAction": "Findings|Audit"
  }
] as const;
