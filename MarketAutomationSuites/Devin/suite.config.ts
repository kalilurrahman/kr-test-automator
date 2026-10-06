// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Devin";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Repository attach, environment readiness, and setup review",
    "section": "Repositories|Setup",
    "createAction": "Add repository|Connect repo",
    "fields": [
      "Repository URL",
      "Branch"
    ],
    "submitAction": "Connect|Save",
    "createdText": "Repository",
    "nextAction": "Setup|Verify"
  },
  {
    "title": "Synthetic ticket implementation and draft PR handoff",
    "section": "Tasks|Tickets",
    "createAction": "New task|Start session",
    "fields": [
      "Ticket ID",
      "Repository"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Pull request|Review"
  },
  {
    "title": "Browser journey, failure evidence, and retest",
    "section": "Sessions|Browser",
    "createAction": "New browser task|Verify feature",
    "fields": [
      "Test URL",
      "Scenario"
    ],
    "submitAction": "Start|Run",
    "createdText": "Browser run",
    "nextAction": "Screenshot|Re-test"
  },
  {
    "title": "Parallel isolated strategies and result comparison",
    "section": "Sessions|Batch",
    "createAction": "New batch|Start parallel sessions",
    "fields": [
      "Task",
      "Session count"
    ],
    "submitAction": "Start|Run",
    "createdText": "Batch",
    "nextAction": "Compare|Select"
  },
  {
    "title": "Draft pull request, review comment fix, and check status",
    "section": "Pull requests|Reviews",
    "createAction": "New draft PR|Create",
    "fields": [
      "Title",
      "Branch"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Pull request",
    "nextAction": "Review|Checks"
  },
  {
    "title": "Regression test authoring, targeted run, and evidence",
    "section": "Tests|Validation",
    "createAction": "New test task|Add regression",
    "fields": [
      "Test name",
      "Module"
    ],
    "submitAction": "Create|Run",
    "createdText": "Test run",
    "nextAction": "Results|Evidence"
  },
  {
    "title": "Mock issue webhook, duplicate event, and automation audit",
    "section": "Automations|Integrations",
    "createAction": "New automation|Create trigger",
    "fields": [
      "Trigger name",
      "Project"
    ],
    "submitAction": "Create|Save",
    "createdText": "Trigger",
    "nextAction": "Run|Audit"
  },
  {
    "title": "Secret injection, denied command, and credential cleanup",
    "section": "Settings|Secrets|Permissions",
    "createAction": "Add test secret|New secret",
    "fields": [
      "Secret name",
      "Scope"
    ],
    "submitAction": "Add|Save",
    "createdText": "Session",
    "nextAction": "Run|Cleanup"
  },
  {
    "title": "Paused session recovery, correction, and worker shutdown",
    "section": "Sessions|History",
    "createAction": "New session|Start",
    "fields": [
      "Session name",
      "Task"
    ],
    "submitAction": "Start|Run",
    "createdText": "Session",
    "nextAction": "Resume|Stop"
  },
  {
    "title": "Evidence-backed outcome report and scoped export",
    "section": "Reports|Governance",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Session"
    ],
    "submitAction": "Create|Run",
    "createdText": "Report",
    "nextAction": "Evidence|Export"
  }
] as const;
