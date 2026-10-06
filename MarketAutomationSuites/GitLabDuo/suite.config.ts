// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "GitLab Duo Agent Platform";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Issue-to-draft-merge-request flow and CI check",
    "section": "Issues|Merge requests",
    "createAction": "New issue|Create issue",
    "fields": [
      "Title",
      "Description"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Issue",
    "nextAction": "Create merge request|Review"
  },
  {
    "title": "Custom agent catalog publication and version review",
    "section": "Duo|AI Catalog|Agents",
    "createAction": "New agent|Create agent",
    "fields": [
      "Agent name",
      "Instructions"
    ],
    "submitAction": "Create|Save",
    "createdText": "Agent",
    "nextAction": "Validate|Publish"
  },
  {
    "title": "Multi-step flow pause, approval, and resume",
    "section": "Duo|Flows",
    "createAction": "New flow|Run flow",
    "fields": [
      "Flow name",
      "Project"
    ],
    "submitAction": "Run|Start",
    "createdText": "Flow run",
    "nextAction": "Approve|Resume"
  },
  {
    "title": "Merge-request review findings and corrected-thread resolution",
    "section": "Merge requests|Review",
    "createAction": "New merge request|Create",
    "fields": [
      "Source branch",
      "Target branch"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Merge request",
    "nextAction": "Review|Resolve thread"
  },
  {
    "title": "Pipeline failure evidence, minimal repair, and rerun",
    "section": "CI/CD|Pipelines",
    "createAction": "New pipeline|Run pipeline",
    "fields": [
      "Branch",
      "Commit"
    ],
    "submitAction": "Run|Start",
    "createdText": "Pipeline",
    "nextAction": "Jobs|Retry"
  },
  {
    "title": "Synthetic vulnerability triage, remediation, and retest",
    "section": "Security|Vulnerabilities",
    "createAction": "New finding|Import fixture",
    "fields": [
      "Finding ID",
      "Severity"
    ],
    "submitAction": "Create|Import",
    "createdText": "Finding",
    "nextAction": "Remediate|Verify"
  },
  {
    "title": "Tool approval policy and denied external action",
    "section": "Settings|Duo|Governance",
    "createAction": "New tool rule|Add policy",
    "fields": [
      "Tool name",
      "Decision"
    ],
    "submitAction": "Save|Create",
    "createdText": "Policy",
    "nextAction": "Test|Audit"
  },
  {
    "title": "Mock MCP server registration and token rotation",
    "section": "Settings|Integrations|MCP",
    "createAction": "Add server|New connection",
    "fields": [
      "Server name",
      "Endpoint"
    ],
    "submitAction": "Add|Save",
    "createdText": "MCP server",
    "nextAction": "Validate|Rotate"
  },
  {
    "title": "Self-managed gateway health and model-route recovery",
    "section": "Admin|Duo|Health",
    "createAction": "New health check|Run check",
    "fields": [
      "Instance",
      "Provider route"
    ],
    "submitAction": "Run|Start",
    "createdText": "Health check",
    "nextAction": "Status|Recover"
  },
  {
    "title": "Group audit report, usage reconciliation, and export",
    "section": "Analytics|Audit",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Time range"
    ],
    "submitAction": "Create|Run",
    "createdText": "Audit report",
    "nextAction": "Reconcile|Export"
  }
] as const;
