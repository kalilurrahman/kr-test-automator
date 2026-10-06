// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Apache Airflow";
export const journeys = [
  {
    "title": "DAG deployment and parse validation",
    "section": "DAGs|Browse",
    "createAction": "Upload DAG|Add DAG",
    "fields": [
      "DAG|File"
    ],
    "submitAction": "Save|Upload",
    "createdText": "DAG",
    "nextAction": "Refresh|Parse"
  },
  {
    "title": "Scheduled run and task graph navigation",
    "section": "DAGs|Browse",
    "createAction": "Trigger DAG|Run",
    "fields": [
      "DAG"
    ],
    "submitAction": "Trigger|Run",
    "createdText": "DAG run",
    "nextAction": "Graph|View graph"
  },
  {
    "title": "Task retry and attempt log inspection",
    "section": "DAGs|Browse",
    "createAction": "Trigger DAG|Run",
    "fields": [
      "DAG"
    ],
    "submitAction": "Trigger|Run",
    "createdText": "DAG run",
    "nextAction": "Logs|View logs"
  },
  {
    "title": "Backfill range and interval verification",
    "section": "DAGs|Browse",
    "createAction": "Backfill|Create backfill",
    "fields": [
      "Start date",
      "End date"
    ],
    "submitAction": "Backfill|Submit",
    "createdText": "Backfill",
    "nextAction": "Run|Start"
  },
  {
    "title": "Asset event and consumer run review",
    "section": "Assets|Datasets",
    "createAction": "New asset|Create asset",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Asset",
    "nextAction": "Events|Lineage"
  },
  {
    "title": "Connection creation and secret redaction",
    "section": "Admin|Connections",
    "createAction": "Add connection|New connection",
    "fields": [
      "Connection Id",
      "Host"
    ],
    "submitAction": "Save|Add",
    "createdText": "Connection",
    "nextAction": "Test|Check"
  },
  {
    "title": "Pool capacity update and queue observation",
    "section": "Admin|Pools",
    "createAction": "Add pool|New pool",
    "fields": [
      "Pool name",
      "Slots"
    ],
    "submitAction": "Save|Add",
    "createdText": "Pool",
    "nextAction": "Edit|Update"
  },
  {
    "title": "Role assignment and restricted action denial",
    "section": "Admin|Users|Security",
    "createAction": "Add user|Edit user",
    "fields": [
      "Username|Email",
      "Role"
    ],
    "submitAction": "Save|Add",
    "createdText": "User",
    "nextAction": "Permissions|Roles"
  },
  {
    "title": "DAG pause and schedule recovery",
    "section": "DAGs|Browse",
    "createAction": "Trigger DAG|Run",
    "fields": [
      "DAG"
    ],
    "submitAction": "Trigger|Run",
    "createdText": "DAG",
    "nextAction": "Pause|Unpause"
  },
  {
    "title": "Deployment health and scheduler status",
    "section": "Browse|Admin",
    "createAction": "Refresh|Check health",
    "fields": [
      "DAG"
    ],
    "submitAction": "Refresh|Run",
    "createdText": "Scheduler|DAG",
    "nextAction": "Health|Logs"
  }
] as const;
