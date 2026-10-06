// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Hugging Face Hub";
export const journeys = [
  {
    "title": "Organization setup and repository creation",
    "section": "Organizations|Repositories",
    "createAction": "New model|Create repository",
    "fields": [
      "Repository name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Repository",
    "nextAction": "Settings|Files"
  },
  {
    "title": "Model card publication and immutable revision review",
    "section": "Models|Repositories",
    "createAction": "New model|Create repository",
    "fields": [
      "Model name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Model",
    "nextAction": "Edit model card|Settings"
  },
  {
    "title": "Dataset upload and split validation",
    "section": "Datasets",
    "createAction": "New dataset|Create repository",
    "fields": [
      "Dataset name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Dataset",
    "nextAction": "Upload files|Add files"
  },
  {
    "title": "Space deployment and secret scoping",
    "section": "Spaces",
    "createAction": "Create new Space|New Space",
    "fields": [
      "Space name|Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Space",
    "nextAction": "Settings|Variables and secrets"
  },
  {
    "title": "Inference endpoint deployment and health check",
    "section": "Inference Endpoints|Endpoints",
    "createAction": "Create endpoint|New endpoint",
    "fields": [
      "Name|Endpoint name"
    ],
    "submitAction": "Create|Deploy",
    "createdText": "Endpoint",
    "nextAction": "Test|Invoke"
  },
  {
    "title": "Gated model request and license acceptance",
    "section": "Models|Access requests",
    "createAction": "Request access|New request",
    "fields": [
      "Reason|Name"
    ],
    "submitAction": "Submit|Request",
    "createdText": "Request",
    "nextAction": "Approve|Review"
  },
  {
    "title": "Organization role assignment and token rotation",
    "section": "Settings|Members|Access tokens",
    "createAction": "Invite member|New token",
    "fields": [
      "Username|Name"
    ],
    "submitAction": "Invite|Create",
    "createdText": "Member|Token",
    "nextAction": "Roles|Permissions"
  },
  {
    "title": "Provider routing and fallback verification",
    "section": "Inference Providers|Settings",
    "createAction": "Add provider|New route",
    "fields": [
      "Name|Model"
    ],
    "submitAction": "Save|Create",
    "createdText": "Provider|Route",
    "nextAction": "Test|Run"
  },
  {
    "title": "Collection evaluation and acceptance review",
    "section": "Collections|Evaluation",
    "createAction": "New collection|Create evaluation",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Collection|Evaluation",
    "nextAction": "Run|Evaluate"
  },
  {
    "title": "Artifact security scan and repository audit",
    "section": "Settings|Security|Repositories",
    "createAction": "Create scan|New policy",
    "fields": [
      "Name"
    ],
    "submitAction": "Create|Save",
    "createdText": "Scan|Policy",
    "nextAction": "Run|Audit"
  }
] as const;
