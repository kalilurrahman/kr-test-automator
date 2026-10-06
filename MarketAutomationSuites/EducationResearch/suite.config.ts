// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Education & Research Systems";
export const industryDomain = "education-research";
export const journeys = [
  {
    "title": "Synthetic admission intake, rule review, and enrollment",
    "section": "Admissions|Enrollment",
    "createAction": "New applicant|Create application",
    "fields": [
      "Application ID",
      "Program"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Application",
    "nextAction": "Review|Enroll"
  },
  {
    "title": "Learner profile correction, record scope, and retention",
    "section": "Learners|Records",
    "createAction": "New learner|Create profile",
    "fields": [
      "Learner ID",
      "Cohort"
    ],
    "submitAction": "Create|Save",
    "createdText": "Learner record",
    "nextAction": "Correct|Export"
  },
  {
    "title": "Accessible course publication and offline progress synchronization",
    "section": "Learning|Courses",
    "createAction": "New course|Create course",
    "fields": [
      "Course name",
      "Term"
    ],
    "submitAction": "Create|Publish",
    "createdText": "Course",
    "nextAction": "Accessibility|Progress"
  },
  {
    "title": "Assessment scoring, accommodation fixture, and credential issue",
    "section": "Assessment|Credentials",
    "createAction": "New assessment|Create assessment",
    "fields": [
      "Assessment ID",
      "Course"
    ],
    "submitAction": "Create|Save",
    "createdText": "Assessment",
    "nextAction": "Score|Issue"
  },
  {
    "title": "Research project membership, protocol revision, and closure",
    "section": "Research|Projects",
    "createAction": "New project|Create project",
    "fields": [
      "Project ID",
      "Principal investigator fixture"
    ],
    "submitAction": "Create|Save",
    "createdText": "Project",
    "nextAction": "Review|Close"
  },
  {
    "title": "Grant review, budget validation, and funding amendment",
    "section": "Grants|Funding",
    "createAction": "New grant|Create application",
    "fields": [
      "Grant ID",
      "Opportunity"
    ],
    "submitAction": "Create|Submit",
    "createdText": "Grant",
    "nextAction": "Review|Amend"
  },
  {
    "title": "Lab asset reservation, maintenance hold, and sample trace",
    "section": "Labs|Assets",
    "createAction": "New asset|Register equipment",
    "fields": [
      "Asset ID",
      "Lab"
    ],
    "submitAction": "Create|Save",
    "createdText": "Reservation",
    "nextAction": "Hold|Trace"
  },
  {
    "title": "Research dataset provenance, reproducibility, and snapshot",
    "section": "Research data|Lineage",
    "createAction": "Import dataset|New dataset",
    "fields": [
      "Dataset ID",
      "Schema version"
    ],
    "submitAction": "Import|Save",
    "createdText": "Dataset",
    "nextAction": "Reproduce|Manifest"
  },
  {
    "title": "Independent manuscript review, revision, and publication",
    "section": "Publications|Review",
    "createAction": "New submission|Submit manuscript",
    "fields": [
      "Submission ID",
      "Journal fixture"
    ],
    "submitAction": "Submit|Save",
    "createdText": "Review",
    "nextAction": "Revise|Publish"
  },
  {
    "title": "Learner privacy, partner exchange, and token revocation",
    "section": "Privacy|Integrations",
    "createAction": "New connection|Create integration",
    "fields": [
      "Connection ID",
      "Purpose"
    ],
    "submitAction": "Create|Save",
    "createdText": "Exchange",
    "nextAction": "Revoke|Audit"
  }
] as const;
