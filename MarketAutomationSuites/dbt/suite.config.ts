// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "dbt";
export const journeys = [
  {
    "title": "Project connection and branch setup",
    "section": "Projects",
    "createAction": "New project|Create project",
    "fields": [
      "Name",
      "Repository|Git URL"
    ],
    "submitAction": "Create|Connect",
    "createdText": "Project",
    "nextAction": "Branches|Develop"
  },
  {
    "title": "Model build, test, and compiled SQL review",
    "section": "Develop|Studio|Models",
    "createAction": "New model|Create model",
    "fields": [
      "Name",
      "SQL|Definition"
    ],
    "submitAction": "Save|Create",
    "createdText": "Model",
    "nextAction": "Build|Run"
  },
  {
    "title": "Contract enforcement and failing-row inspection",
    "section": "Models|Contracts",
    "createAction": "New model|Create model",
    "fields": [
      "Name"
    ],
    "submitAction": "Save|Create",
    "createdText": "Model",
    "nextAction": "Test|Validate"
  },
  {
    "title": "Snapshot history capture and review",
    "section": "Snapshots",
    "createAction": "New snapshot|Create snapshot",
    "fields": [
      "Name",
      "Model"
    ],
    "submitAction": "Save|Create",
    "createdText": "Snapshot",
    "nextAction": "Run|Build"
  },
  {
    "title": "Documentation generation and lineage navigation",
    "section": "Docs|Catalog|Lineage",
    "createAction": "Generate docs|Build docs",
    "fields": [
      "Project|Environment"
    ],
    "submitAction": "Generate|Build",
    "createdText": "Documentation|Lineage",
    "nextAction": "View lineage|Lineage"
  },
  {
    "title": "Scheduled job execution and artifact promotion",
    "section": "Deploy|Jobs|Environments",
    "createAction": "New job|Create job",
    "fields": [
      "Name",
      "Command|Selector"
    ],
    "submitAction": "Save|Create",
    "createdText": "Job",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Pull request CI gate and check result",
    "section": "CI|Pull requests",
    "createAction": "New check|Create job",
    "fields": [
      "Name|Command"
    ],
    "submitAction": "Save|Create",
    "createdText": "Check|Job",
    "nextAction": "Run|Execute"
  },
  {
    "title": "Metric definition and semantic query",
    "section": "Semantic layer|Metrics",
    "createAction": "New metric|Create metric",
    "fields": [
      "Name",
      "Description"
    ],
    "submitAction": "Save|Create",
    "createdText": "Metric",
    "nextAction": "Query|Preview"
  },
  {
    "title": "Production access review and approval",
    "section": "Admin|Access|Deploy",
    "createAction": "New approval|Request access",
    "fields": [
      "Name|Reason"
    ],
    "submitAction": "Submit|Request",
    "createdText": "Request|Approval",
    "nextAction": "Approve|Review"
  },
  {
    "title": "Adapter configuration and reproducible build",
    "section": "Settings|Adapters|Environments",
    "createAction": "New environment|Create environment",
    "fields": [
      "Name",
      "Adapter"
    ],
    "submitAction": "Save|Create",
    "createdText": "Environment",
    "nextAction": "Install|Build"
  }
] as const;
