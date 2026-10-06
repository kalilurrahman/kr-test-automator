// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Industrial Automation and OT";
export const industryDomain = "industrial-automation";
export const journeys = [
  {
    "title": "Simulated asset inventory and zone assignment",
    "section": "Assets|Inventory",
    "createAction": "New asset|Discover asset",
    "fields": [
      "Asset ID",
      "Site|Zone"
    ],
    "submitAction": "Create|Save",
    "createdText": "Asset",
    "nextAction": "Classification|Zone"
  },
  {
    "title": "Virtual zone conduit policy validation",
    "section": "Network|Zones|Policies",
    "createAction": "New conduit|Create rule",
    "fields": [
      "Source zone",
      "Destination zone"
    ],
    "submitAction": "Create|Save",
    "createdText": "Conduit",
    "nextAction": "Validate|Review"
  },
  {
    "title": "Digital twin logic load and HMI review",
    "section": "Digital Twin|PLC|HMI",
    "createAction": "New simulation|Load logic",
    "fields": [
      "Simulation name",
      "Logic revision"
    ],
    "submitAction": "Create|Load",
    "createdText": "Simulation",
    "nextAction": "Run|HMI"
  },
  {
    "title": "Simulated alarm acknowledgment and escalation",
    "section": "Alarms|Events",
    "createAction": "New alarm rule|Create rule",
    "fields": [
      "Rule name",
      "Threshold"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alarm rule",
    "nextAction": "Test|Acknowledge"
  },
  {
    "title": "Synthetic telemetry ingest and historian replay",
    "section": "Historian|Telemetry",
    "createAction": "New stream|Ingest",
    "fields": [
      "Stream name",
      "Tag"
    ],
    "submitAction": "Create|Start",
    "createdText": "Stream",
    "nextAction": "Replay|History"
  },
  {
    "title": "Logic package approval and virtual rollback",
    "section": "Changes|Deployments",
    "createAction": "New package|Deploy logic",
    "fields": [
      "Package name",
      "Revision"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Package",
    "nextAction": "Approve|Rollback"
  },
  {
    "title": "Safety interlock simulator and fail-safe evidence",
    "section": "Safety|Interlocks|Simulation",
    "createAction": "New test|Run simulation",
    "fields": [
      "Test name",
      "Interlock"
    ],
    "submitAction": "Create|Run",
    "createdText": "Test run",
    "nextAction": "Evidence|Results"
  },
  {
    "title": "Lab remote access grant and expiry",
    "section": "Administration|Remote Access",
    "createAction": "New access grant|Invite user",
    "fields": [
      "User|Email",
      "Role"
    ],
    "submitAction": "Grant|Save",
    "createdText": "Access grant",
    "nextAction": "Expire|Review"
  },
  {
    "title": "Digital twin snapshot restore and verification",
    "section": "Backup|Recovery|Digital Twin",
    "createAction": "New snapshot|Create backup",
    "fields": [
      "Name",
      "Environment"
    ],
    "submitAction": "Create|Save",
    "createdText": "Snapshot",
    "nextAction": "Restore|Verify"
  },
  {
    "title": "Simulated security alert correlation and response",
    "section": "Security|Monitoring|Incidents",
    "createAction": "New rule|Create incident",
    "fields": [
      "Rule name",
      "Source"
    ],
    "submitAction": "Create|Save",
    "createdText": "Rule|Incident",
    "nextAction": "Correlate|Review"
  }
] as const;
