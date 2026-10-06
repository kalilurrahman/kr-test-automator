// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Replit Agent";
export const industryDomain = "developer-tools";
export const journeys = [
  {
    "title": "Prompt-to-app scaffold and project preview",
    "section": "Workspace|Agent",
    "createAction": "New app|Create project",
    "fields": [
      "App name",
      "Description"
    ],
    "submitAction": "Create|Build",
    "createdText": "Project",
    "nextAction": "Preview|Open app"
  },
  {
    "title": "Responsive design iteration and visual checkpoint",
    "section": "Preview|Design",
    "createAction": "Update design|New request",
    "fields": [
      "Change request",
      "Viewport"
    ],
    "submitAction": "Apply|Run",
    "createdText": "Preview",
    "nextAction": "Compare|Restore"
  },
  {
    "title": "Disposable database, schema migration, and auth route",
    "section": "Database|Authentication",
    "createAction": "New database|Connect",
    "fields": [
      "Database name",
      "Auth provider"
    ],
    "submitAction": "Create|Connect",
    "createdText": "Integration",
    "nextAction": "Migrate|Verify"
  },
  {
    "title": "Primary browser journey, validation, and screenshot review",
    "section": "Preview|Testing",
    "createAction": "Run browser tests|New test",
    "fields": [
      "Scenario",
      "Viewport"
    ],
    "submitAction": "Run|Start",
    "createdText": "Test run",
    "nextAction": "Results|Screenshot"
  },
  {
    "title": "Pinned package install, build command, and error diagnosis",
    "section": "Tools|Shell",
    "createAction": "Install dependency|New task",
    "fields": [
      "Package",
      "Version"
    ],
    "submitAction": "Install|Run",
    "createdText": "Build",
    "nextAction": "Logs|Review"
  },
  {
    "title": "Preview deployment, approval gate, and rollback",
    "section": "Deployments|Domains",
    "createAction": "New deployment|Deploy",
    "fields": [
      "Branch",
      "Environment"
    ],
    "submitAction": "Deploy|Start",
    "createdText": "Deployment",
    "nextAction": "Approve|Rollback"
  },
  {
    "title": "Mock integration credential, event retry, and revoke",
    "section": "Integrations|Secrets",
    "createAction": "Add integration|Connect provider",
    "fields": [
      "Provider",
      "Scope"
    ],
    "submitAction": "Connect|Save",
    "createdText": "Integration",
    "nextAction": "Test|Revoke"
  },
  {
    "title": "Collaborator invitation, role boundary, and removal",
    "section": "Project|Collaborators",
    "createAction": "Invite collaborator|Add member",
    "fields": [
      "Email",
      "Role"
    ],
    "submitAction": "Invite|Save",
    "createdText": "Member",
    "nextAction": "Access|Remove"
  },
  {
    "title": "Checkpoint restore after failed change and file reconciliation",
    "section": "History|Checkpoints",
    "createAction": "Create checkpoint|Save version",
    "fields": [
      "Name",
      "Revision"
    ],
    "submitAction": "Save|Create",
    "createdText": "Checkpoint",
    "nextAction": "Restore|Compare"
  },
  {
    "title": "Resource cap, blocked host, and disposable cleanup",
    "section": "Settings|Security|Usage",
    "createAction": "New policy|Configure limits",
    "fields": [
      "Policy name",
      "Workspace"
    ],
    "submitAction": "Save|Apply",
    "createdText": "Policy",
    "nextAction": "Test|Cleanup"
  }
] as const;
