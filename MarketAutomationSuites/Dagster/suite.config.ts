// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Dagster";
export const journeys = [
  {
    "title": "Asset catalog and materialization",
    "section": "Assets|Catalog",
    "createAction": "Materialize|Launch",
    "fields": [
      "Asset|Partition"
    ],
    "submitAction": "Materialize|Launch",
    "createdText": "Materialization",
    "nextAction": "View|Details"
  },
  {
    "title": "Asset check failure and downstream block",
    "section": "Assets|Checks",
    "createAction": "Run checks|Launch",
    "fields": [
      "Asset"
    ],
    "submitAction": "Run|Launch",
    "createdText": "Check result",
    "nextAction": "View runs|Runs"
  },
  {
    "title": "Job launch with configuration and logs",
    "section": "Jobs",
    "createAction": "Launch|Run job",
    "fields": [
      "Job"
    ],
    "submitAction": "Launch|Run",
    "createdText": "Run",
    "nextAction": "Logs|View logs"
  },
  {
    "title": "Schedule creation and next tick",
    "section": "Automation|Schedules",
    "createAction": "New schedule|Create schedule",
    "fields": [
      "Name",
      "Job"
    ],
    "submitAction": "Create|Save",
    "createdText": "Schedule",
    "nextAction": "Enable|Run"
  },
  {
    "title": "Sensor evaluation and cursor advancement",
    "section": "Automation|Sensors",
    "createAction": "New sensor|Create sensor",
    "fields": [
      "Name",
      "Job"
    ],
    "submitAction": "Create|Save",
    "createdText": "Sensor",
    "nextAction": "Evaluate|Test"
  },
  {
    "title": "Partition backfill and progress",
    "section": "Assets|Backfills",
    "createAction": "Launch backfill|New backfill",
    "fields": [
      "Start",
      "End"
    ],
    "submitAction": "Launch|Submit",
    "createdText": "Backfill",
    "nextAction": "View|Progress"
  },
  {
    "title": "Resource setup and secret masking",
    "section": "Deployments|Resources",
    "createAction": "New resource|Create resource",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Resource",
    "nextAction": "Test|Configure"
  },
  {
    "title": "Code location reload and revision review",
    "section": "Deployment|Code locations",
    "createAction": "Reload|Add location",
    "fields": [
      "Name|URL"
    ],
    "submitAction": "Reload|Add|Save",
    "createdText": "Code location",
    "nextAction": "View runs|Health"
  },
  {
    "title": "Run retry and event log reconciliation",
    "section": "Runs|Jobs",
    "createAction": "Launch|Run job",
    "fields": [
      "Job"
    ],
    "submitAction": "Launch|Run",
    "createdText": "Run",
    "nextAction": "Retry|Events"
  },
  {
    "title": "Role boundary for protected materialization",
    "section": "Settings|Users|Permissions",
    "createAction": "Invite user|Add user",
    "fields": [
      "Email",
      "Role"
    ],
    "submitAction": "Invite|Save",
    "createdText": "User",
    "nextAction": "Permissions|Access"
  }
] as const;
