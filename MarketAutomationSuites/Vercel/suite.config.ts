// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Vercel";
export const journeys = [
  {
    "title": "Git project import and preview deployment",
    "section": "Projects",
    "createAction": "Add new|Import project|New project",
    "fields": [
      "Repository|Git URL"
    ],
    "submitAction": "Import|Create",
    "createdText": "Project",
    "nextAction": "Deploy|Create deployment"
  },
  {
    "title": "Preview build validation and production promotion",
    "section": "Deployments",
    "createAction": "New deployment|Deploy",
    "fields": [
      "Branch|Commit"
    ],
    "submitAction": "Deploy|Create",
    "createdText": "Deployment",
    "nextAction": "Promote|Assign to production"
  },
  {
    "title": "Environment variable scoping and redeploy",
    "section": "Settings|Environment variables",
    "createAction": "Add|New variable",
    "fields": [
      "Name",
      "Value"
    ],
    "submitAction": "Save|Add",
    "createdText": "Variable",
    "nextAction": "Redeploy|Deploy"
  },
  {
    "title": "Domain verification and routing validation",
    "section": "Domains",
    "createAction": "Add domain|New domain",
    "fields": [
      "Domain"
    ],
    "submitAction": "Add|Save",
    "createdText": "Domain",
    "nextAction": "Verify|Configure"
  },
  {
    "title": "Function deployment and cron invocation",
    "section": "Functions|Cron jobs",
    "createAction": "Create function|New function",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Deploy",
    "createdText": "Function",
    "nextAction": "Run|Test"
  },
  {
    "title": "Cache revalidation and rendered page verification",
    "section": "Caching|Deployments",
    "createAction": "Create revalidation|New rule",
    "fields": [
      "Name|Path"
    ],
    "submitAction": "Save|Create",
    "createdText": "Cache|Rule",
    "nextAction": "Revalidate|Test"
  },
  {
    "title": "AI Gateway provider routing and usage inspection",
    "section": "AI Gateway|AI",
    "createAction": "New route|Create gateway",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Gateway|Route",
    "nextAction": "Test|Run request"
  },
  {
    "title": "Incident trace review and diagnostic export",
    "section": "Observability|Logs",
    "createAction": "Create alert|New alert",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Alert",
    "nextAction": "View logs|Export"
  },
  {
    "title": "Firewall rule deployment and request verification",
    "section": "Security|Firewall",
    "createAction": "Add rule|New rule",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Rule",
    "nextAction": "Test|Deploy"
  },
  {
    "title": "Team role assignment and usage review",
    "section": "Team|Settings|Usage",
    "createAction": "Invite member|Add member",
    "fields": [
      "Email"
    ],
    "submitAction": "Invite|Add",
    "createdText": "Member",
    "nextAction": "Usage|Billing"
  }
] as const;
