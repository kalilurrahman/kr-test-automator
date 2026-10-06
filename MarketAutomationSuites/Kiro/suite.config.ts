// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Kiro";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Requirement prompt, spec review, and approval",
    "section": "Specs|Requirements",
    "createAction": "New spec|Create spec",
    "fields": [
      "Feature name",
      "Requirements"
    ],
    "submitAction": "Create|Save",
    "createdText": "Spec",
    "nextAction": "Review|Approve"
  },
  {
    "title": "Steering file context and directory-specific guidance",
    "section": "Workspace|Steering",
    "createAction": "Add steering file|New guidance",
    "fields": [
      "File path",
      "Instructions"
    ],
    "submitAction": "Save|Create",
    "createdText": "Guidance file",
    "nextAction": "Preview|Apply"
  },
  {
    "title": "Approved task implementation and diff review",
    "section": "Workspace|Tasks",
    "createAction": "New task|Start implementation",
    "fields": [
      "Task name",
      "Spec reference"
    ],
    "submitAction": "Start|Run",
    "createdText": "Task",
    "nextAction": "Diff|Review"
  },
  {
    "title": "File-save hook policy, confirmation, and audit",
    "section": "Automation|Hooks",
    "createAction": "New hook|Create hook",
    "fields": [
      "Hook name",
      "Event"
    ],
    "submitAction": "Save|Create",
    "createdText": "Hook",
    "nextAction": "Run|History"
  },
  {
    "title": "Generated unit tests, local execution, and failure repair",
    "section": "Tests|Validation",
    "createAction": "Generate tests|Add test",
    "fields": [
      "Requirement ID",
      "Test path"
    ],
    "submitAction": "Generate|Save",
    "createdText": "Test run",
    "nextAction": "Results|Re-run"
  },
  {
    "title": "Design artifact generation and source traceability",
    "section": "Design|Documentation",
    "createAction": "New design artifact|Generate diagram",
    "fields": [
      "Artifact name",
      "Spec"
    ],
    "submitAction": "Generate|Save",
    "createdText": "Artifact",
    "nextAction": "Traceability|Review"
  },
  {
    "title": "Mock MCP registration and gated tool invocation",
    "section": "Integrations|MCP",
    "createAction": "Add server|New MCP server",
    "fields": [
      "Server name",
      "Endpoint"
    ],
    "submitAction": "Add|Save",
    "createdText": "Server",
    "nextAction": "Tools|Approve"
  },
  {
    "title": "Stale diff approval rejection and re-review",
    "section": "Reviews|Approvals",
    "createAction": "New review|Request approval",
    "fields": [
      "Change ID",
      "Reviewer"
    ],
    "submitAction": "Request|Submit",
    "createdText": "Review",
    "nextAction": "Diff|Approve"
  },
  {
    "title": "Session interruption, checkpoint resume, and cleanup",
    "section": "Sessions|History",
    "createAction": "New session|Start",
    "fields": [
      "Session name",
      "Repository"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Resume|Cleanup"
  },
  {
    "title": "Workspace boundary, secret redaction, and security audit",
    "section": "Security|Governance",
    "createAction": "New security review|Run scan",
    "fields": [
      "Review name",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Review",
    "nextAction": "Findings|Audit"
  }
] as const;
