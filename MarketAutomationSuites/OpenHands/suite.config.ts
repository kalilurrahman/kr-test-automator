// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "OpenHands";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Isolated runtime creation, workspace mount, and cleanup",
    "section": "Runtime|Workspaces",
    "createAction": "New runtime|Create workspace",
    "fields": [
      "Runtime name",
      "Repository"
    ],
    "submitAction": "Create|Start",
    "createdText": "Runtime",
    "nextAction": "Health|Cleanup"
  },
  {
    "title": "SDK agent action registration and typed failure result",
    "section": "SDK|Agents",
    "createAction": "New agent|Create agent",
    "fields": [
      "Agent name",
      "Model"
    ],
    "submitAction": "Create|Save",
    "createdText": "Agent",
    "nextAction": "Tools|Run"
  },
  {
    "title": "Remote server authentication, scoped workspace, and cancellation",
    "section": "Agent Server|Sessions",
    "createAction": "New server session|Start task",
    "fields": [
      "Workspace ID",
      "Prompt"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Stream|Cancel"
  },
  {
    "title": "Headless CI task, exit status, and artifact retention",
    "section": "CI|Headless",
    "createAction": "New run|Start job",
    "fields": [
      "Prompt file",
      "Output path"
    ],
    "submitAction": "Start|Run",
    "createdText": "CI run",
    "nextAction": "Artifacts|Status"
  },
  {
    "title": "Conversation pause, user guidance, and checkpoint resume",
    "section": "Conversations|History",
    "createAction": "New conversation|Start task",
    "fields": [
      "Task name",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Conversation",
    "nextAction": "Pause|Resume"
  },
  {
    "title": "Model route, skill selection, and secret redaction",
    "section": "Settings|Models|Skills",
    "createAction": "New profile|Create skill",
    "fields": [
      "Profile name",
      "Skill name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Configuration",
    "nextAction": "Test|Audit"
  },
  {
    "title": "High-risk action confirmation and policy denial",
    "section": "Security|Confirmations",
    "createAction": "New security task|Run action",
    "fields": [
      "Action",
      "Workspace"
    ],
    "submitAction": "Start|Run",
    "createdText": "Action request",
    "nextAction": "Confirm|Deny"
  },
  {
    "title": "Synthetic browser journey recording and masked replay",
    "section": "Browser|Recordings",
    "createAction": "New recording|Start browser",
    "fields": [
      "Test URL",
      "Scenario"
    ],
    "submitAction": "Start|Record",
    "createdText": "Recording",
    "nextAction": "Replay|Delete"
  },
  {
    "title": "Mock pull-request review summary and approval boundary",
    "section": "GitHub|Reviews",
    "createAction": "New review|Review PR",
    "fields": [
      "PR reference",
      "Revision"
    ],
    "submitAction": "Start|Review",
    "createdText": "Review summary",
    "nextAction": "Assign|Export"
  },
  {
    "title": "Deterministic evaluation run, trace quality, and comparison",
    "section": "Evaluations|Traces",
    "createAction": "New evaluation|Run benchmark",
    "fields": [
      "Suite name",
      "Runtime"
    ],
    "submitAction": "Create|Run",
    "createdText": "Evaluation",
    "nextAction": "Compare|Export"
  }
] as const;
