"""Add domain-focused test cases for modern data and life-sciences platforms.

New packs contain at least 2,000 cases across domain-specific modules and
controlled conditions. Existing Databricks, Snowflake, and Palantir Foundry
packs receive 2,000 additional cases each, appended to their module CSVs.
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIELDS = ["product", "module", "test_case_id", "test_scenario", "test_case_name",
          "test_type", "priority", "preconditions", "test_steps", "expected_result",
          "automation_framework", "tags"]

DATA_VARIANTS = [
    ("clean baseline", "Use a versioned synthetic fixture with a verified baseline snapshot."),
    ("empty input", "Run with an empty input table or partition and verify defined empty-result behavior."),
    ("single record", "Run with one valid record and verify the smallest non-empty result."),
    ("duplicate business key", "Include duplicate business keys and verify the configured deduplication or rejection rule."),
    ("nullable optional field", "Set optional fields to null while required identifiers remain valid."),
    ("boundary values", "Exercise the documented minimum, maximum, and just-outside boundary values."),
    ("late arriving data", "Deliver an older event after a newer watermark or processing window has closed."),
    ("out-of-order events", "Shuffle event and commit order while preserving source event-time values."),
    ("compatible schema addition", "Add a nullable field while older readers and stored snapshots still exist."),
    ("field rename", "Rename a field through the supported migration path and inspect historical reads."),
    ("worker restart", "Restart a worker after input processing but before the final checkpoint or commit."),
    ("least privilege", "Run once as an authorized role and once as a role lacking the required grant."),
    ("concurrent writers", "Submit two valid writers that touch overlapping logical data at the same time."),
    ("transient retry", "Inject one transient storage or service failure, then restore the dependency."),
    ("commit conflict", "Advance the table or dataset version between read and write to create an optimistic conflict."),
    ("rollback and replay", "Restore a prior version in a disposable fixture, then replay the same operation."),
    ("Unicode identifiers", "Use Unicode in safe table, column, project, and synthetic participant labels."),
    ("time-zone boundary", "Place timestamps around midnight and a daylight-saving transition in two time zones."),
    ("skewed high volume", "Use a large synthetic fixture with one intentionally skewed key or partition."),
    ("corrupt input", "Include one malformed record and verify quarantine or failure behavior without silent loss."),
    ("partial cleanup failure", "Allow the main operation to succeed, then make a cleanup step fail and retry it."),
    ("idempotent rerun", "Repeat the exact operation with the same input and idempotency key."),
    ("dependency outage", "Make an optional downstream service unavailable while core dependencies remain healthy."),
    ("expired credential", "Use an expired test credential and verify refresh or a clear fail-closed error."),
    ("cross-engine read", "Write with one supported engine and read the committed result with a second engine."),
]

CLINICAL_VARIANTS = [
    ("valid synthetic subject", "Use a consented synthetic subject with all required study data present."),
    ("screen failure", "Use a synthetic candidate who fails one protocol inclusion criterion."),
    ("visit-window boundary", "Place a synthetic visit exactly at the inclusive visit-window boundary."),
    ("out-of-window visit", "Place a synthetic visit just outside the configured protocol window."),
    ("missing required field", "Omit one required synthetic field while keeping unrelated data valid."),
    ("duplicate source record", "Deliver the same synthetic source record twice with the same source identifier."),
    ("corrected source record", "Submit a corrected synthetic record after a query or downstream export exists."),
    ("site isolation", "Use synthetic subjects from two sites and verify site-scoped access boundaries."),
    ("expired consent", "Use a synthetic subject whose consent is withdrawn or expired before the action."),
    ("blinded role", "Perform the action as a blinded synthetic study role and verify blind protection."),
    ("serious adverse event", "Use a synthetic serious adverse event requiring the configured escalation path."),
    ("audit reconstruction", "Reconstruct the synthetic record history from immutable audit evidence."),
    ("timezone date boundary", "Use a site-local timestamp that falls on a different UTC calendar date."),
    ("concurrent data entry", "Submit two synthetic updates to the same subject from separate sessions."),
    ("offline synchronization", "Queue a synthetic mobile entry offline, then synchronize after reconnection."),
    ("language variation", "Use a supported non-English locale and verify labels and encoded response values."),
    ("partial integration outage", "Temporarily interrupt one test integration while retaining local synthetic records."),
    ("role revoked mid-session", "Revoke the synthetic user's role after login but before the protected write."),
    ("repeated notification", "Retry a synthetic notification delivery and verify no duplicate clinical action."),
    ("retention boundary", "Use a synthetic record at the configured retention or archival boundary."),
]

# Each scenario names an observable product-specific operation and its key
# invariant. Conditions above produce realistic distinct boundary and recovery
# cases without relying on production data, patients, tenants, or credentials.
PACKS = {
    "Dataiku": {
        "root": "Dataiku", "key": "dataiku", "id_prefix": "DIKU", "mode": "new",
        "modules": [
            ("flow", "Flow and Lineage", "dataiku_flow", [
                "rebuild a downstream dataset after changing an upstream recipe",
                "preserve dependency order when two recipes share an input dataset",
                "propagate a compatible schema change only through dependent Flow nodes",
                "remove an unused recipe without deleting a shared source dataset",
                "export Flow lineage and reconcile each declared input and output",
                "enforce configured resource limits during a parallel Flow build",
                "detect a cycle before scheduling a circular recipe dependency",
                "rebuild only affected partitions after a partitioned input changes",
                "compare Flow lineage before and after a recipe replacement",
                "prevent a user without project access from inspecting restricted Flow nodes",
            ]),
            ("visual_recipes", "Visual Recipes", "visual_recipes", [
                "prepare a dataset using explicit null handling and string normalization",
                "join two datasets with duplicate keys and verify declared join cardinality",
                "aggregate grouped values while retaining the configured null semantics",
                "synchronize input to output when schemas differ by one nullable column",
                "pivot a dataset with an unseen category and preserve it safely",
                "apply a filter with boundary timestamps and site-local dates",
                "upsert records using a compound key without duplicating existing rows",
                "sample deterministically with a fixed seed and stable input snapshot",
                "route malformed rows to a rejected-record output with reason codes",
                "rebuild a visual recipe on the configured execution engine",
            ]),
            ("datasets", "Datasets and Connections", "datasets", [
                "read a partitioned external dataset without scanning unrelated partitions",
                "write a managed dataset atomically when the output already exists",
                "refresh dataset schema after a source adds a nullable column",
                "handle a missing source partition according to the configured build mode",
                "respect connection-level access when a project references a shared dataset",
                "validate dataset checks before publishing a downstream result",
                "preserve decimal precision while reading and writing a warehouse dataset",
                "use a custom partition format with dates across month and year boundaries",
                "prevent accidental overwrite of a read-only external dataset",
                "report a connection timeout without leaving a partial managed output",
            ]),
            ("code_environments", "Code Environments", "code_environments", [
                "run a recipe using its selected Python environment rather than the default",
                "isolate conflicting package versions between two project environments",
                "rebuild a code environment from a pinned package specification",
                "fail clearly when a required package is absent from the selected environment",
                "install from an approved private package repository without logging credentials",
                "verify a containerized recipe uses the declared environment image",
                "prevent one project environment update from changing another environment",
                "select the configured R environment for an R recipe",
                "record environment identity and package versions in a reproducible run",
                "reject an incompatible runtime version before scheduling production work",
            ]),
            ("scenarios", "Automation Scenarios", "scenarios", [
                "trigger a scenario from a dataset build and pass the trigger parameters",
                "run build, quality checks, and notification steps in declared order",
                "stop later scenario steps after a required data quality check fails",
                "scope scenario variables to the run without mutating global variables",
                "retry a transient scenario step without repeating a successful non-idempotent step",
                "verify project variables resolve consistently across recipe steps",
                "run a scenario with a schedule across a daylight-saving transition",
                "restrict a scenario trigger to users with access to every referenced object",
                "retain step-level status and error evidence after a partial scenario failure",
                "cancel a running scenario and release its reserved execution resources",
            ]),
            ("mlops", "Machine Learning and MLOps", "mlops", [
                "train a model from a versioned dataset and record its source snapshot",
                "compare candidate model metrics against a declared acceptance threshold",
                "register a model only after required evaluation checks pass",
                "reproduce training with a pinned code environment and fixed random seed",
                "reject inference input whose feature schema is incompatible with the model",
                "promote a model between environments while retaining lineage and approvals",
                "monitor feature drift using a known synthetic distribution shift",
                "prevent an unauthorized role from approving a production model promotion",
                "roll back model serving to the last approved model version",
                "record model evaluation evidence without exposing protected training rows",
            ]),
            ("llm_mesh", "LLM Mesh and Prompt Workflows", "llm_mesh", [
                "route a prompt request to the configured provider with a synthetic payload",
                "apply a token budget and return a bounded response when the limit is reached",
                "enforce a provider allowlist when project-level defaults and local overrides differ",
                "redact a synthetic secret before prompt content reaches provider telemetry",
                "evaluate prompt output against a fixed expected schema and quality threshold",
                "handle provider rate limiting with bounded retry and no duplicate side effects",
                "apply a guardrail to an adversarial synthetic prompt injection attempt",
                "record prompt version and model identity for a reproducible evaluation run",
                "keep tenant data isolated when two projects call the same model connection",
                "fail closed when the configured LLM provider is unavailable or unauthorized",
            ]),
            ("agents", "Agents and Managed Tools", "agents", [
                "limit an agent to its explicitly granted managed tools",
                "reject an agent request to access a dataset outside the project scope",
                "validate structured agent output against a declared response schema",
                "stop a tool loop after the configured step and time budgets are reached",
                "preserve provenance for every tool result used in an agent response",
                "prevent untrusted retrieved content from overriding agent safety instructions",
                "require approval before a tool performs a configured high-impact action",
                "recover from one tool timeout without replaying completed write operations",
                "redact sensitive values from agent traces and persisted evaluation samples",
                "compare agent versions on a fixed synthetic evaluation dataset",
            ]),
            ("governance", "Governance and Data Quality", "governance", [
                "fail a build when a critical dataset quality rule is violated",
                "compute row-level metrics on the expected partition and snapshot",
                "preserve quality check history when a dataset schema evolves",
                "enforce project permissions on quality results and metric details",
                "route rejected records to a controlled quarantine dataset",
                "verify lineage and ownership metadata survive a project bundle import",
                "detect a freshness breach using a deterministic synthetic clock",
                "ensure quality alerts are deduplicated for repeated failing runs",
                "restrict export of sensitive quality samples to an authorized role",
                "reconcile published metric values with their source dataset version",
            ]),
            ("deployment", "Bundles and Deployment", "deployment", [
                "create a bundle that includes required recipes and excludes local secrets",
                "deploy a bundle to a target node with compatible code environments",
                "reject a bundle when a required connection is missing in the target environment",
                "promote a bundle only after its pre-deployment checks pass",
                "preserve target-specific variables while importing a project update",
                "roll back to the last successful bundle after a failed deployment check",
                "prevent a lower-privilege role from deploying to a protected environment",
                "record bundle contents and deployment identity in an audit trail",
                "verify scheduled scenarios remain disabled until explicitly activated",
                "detect drift between deployed project configuration and its approved bundle",
            ]),
            ("api", "API and Automation", "api", [
                "create a dataset through the API using an idempotent request identifier",
                "paginate API results without omissions when records change during traversal",
                "reject an API request with an expired credential and avoid partial writes",
                "preserve structured error codes for invalid project and dataset identifiers",
                "enforce API rate limits without dropping accepted asynchronous jobs",
                "validate an API-triggered scenario's parameters before execution",
                "return only project objects visible to the authenticated service identity",
                "handle duplicate webhook delivery without starting duplicate work",
                "maintain backward compatibility for an optional API response field",
                "include a correlation identifier across API, job, and scenario logs",
            ]),
        ],
    },
    "Apache Iceberg": {
        "root": "ApacheIceberg", "key": "apacheiceberg", "id_prefix": "ICE", "mode": "new",
        "modules": [
            ("table_metadata", "Table Metadata and Commits", "metadata", [
                "commit a new snapshot through an atomic metadata pointer update",
                "preserve the last committed table state when a writer fails before commit",
                "validate metadata version references after a sequence of append commits",
                "reject a commit that references a missing data file",
                "verify manifest list counts match the live data and delete files",
                "recover from a metadata pointer conflict using optimistic concurrency",
                "preserve table properties when a schema-only commit is applied",
                "ensure each live data file appears once in a snapshot manifest set",
                "read a table after metadata files are relocated to a new object-store prefix",
                "retain snapshot ancestry and sequence information after a successful commit",
            ]),
            ("schema_evolution", "Schema Evolution", "schema", [
                "add a nullable top-level field and read old files with the new schema",
                "rename a field while preserving its field ID for historical files",
                "drop a nullable field and confirm its value does not reappear on rollback",
                "reorder fields without changing the meaning of stored column values",
                "promote an integer field to long when all existing values remain representable",
                "reject a narrowing type change that would lose stored values",
                "evolve a nested struct by adding a field and preserving nested field IDs",
                "reject an unsupported struct-to-primitive schema conversion",
                "read old and new schema versions through snapshot time travel",
                "keep default values consistent when a field is added to historical rows",
            ]),
            ("partition_evolution", "Partition Evolution and Hidden Partitioning", "partitioning", [
                "change a partition transform without rewriting existing data files",
                "plan a predicate using source values rather than caller-supplied partition paths",
                "evolve from identity to bucket partitioning while reading both layouts",
                "prune manifests using partition statistics without excluding matching rows",
                "write new files under the new spec while retaining the old spec for prior files",
                "handle null partition values consistently before and after spec evolution",
                "verify truncate and temporal transforms at negative and boundary values",
                "read a table with multiple partition specs from one current snapshot",
                "avoid duplicate rows when a query spans old and new partition layouts",
                "validate partition evolution metadata across a catalog refresh",
            ]),
            ("snapshots", "Snapshots and Time Travel", "snapshots", [
                "query a retained snapshot by snapshot identifier after later appends",
                "expire snapshots while keeping the configured minimum history",
                "roll back the current table pointer to a valid earlier snapshot",
                "reject time travel to a snapshot removed by expiration",
                "reproduce the same query result from the same snapshot across engine sessions",
                "verify snapshot timestamps and parent links across concurrent appends",
                "protect a tagged or referenced snapshot from configured cleanup",
                "read a snapshot after schema evolution using the correct historical schema",
                "expire orphan files only after confirming no retained snapshot references them",
                "distinguish a missing snapshot ID from a catalog lookup failure",
            ]),
            ("concurrency", "Transactions and Concurrency", "concurrency", [
                "commit disjoint concurrent appends without losing either writer's rows",
                "detect an overlapping update conflict and require a safe retry",
                "apply serializable validation to a delete concurrent with an append",
                "retry a commit using refreshed metadata after a pointer conflict",
                "avoid publishing uncommitted files when a transaction is aborted",
                "prevent two writers from committing the same logical delete twice",
                "verify snapshot isolation for a reader active during a concurrent commit",
                "resolve concurrent schema additions without reusing field IDs",
                "preserve exactly-once semantics for a retried idempotent writer",
                "report a conflict with actionable metadata rather than a false success",
            ]),
            ("maintenance", "Compaction and Table Maintenance", "maintenance", [
                "compact small data files while preserving row counts and values",
                "rewrite manifests without changing the logical table snapshot result",
                "remove orphan files only after retention and reference checks succeed",
                "expire snapshots and validate that still-referenced files remain available",
                "rewrite data files into a new format without changing schema IDs",
                "run a maintenance action concurrently with a safe append",
                "bound manifest rewrite work for a large synthetic table",
                "cancel a compaction and preserve the pre-operation snapshot",
                "verify delete files remain applied after compaction",
                "record maintenance metrics and failures for audit and retry",
            ]),
            ("catalogs", "Catalogs and Namespace Operations", "catalogs", [
                "create a table in a nested namespace using the selected catalog",
                "resolve a table identifier consistently across supported catalog clients",
                "reject a duplicate create when the table already exists",
                "rename a table without losing metadata or snapshot history",
                "drop a namespace only when configured dependent-table rules are satisfied",
                "refresh stale catalog state after a concurrent table replacement",
                "enforce catalog credentials and namespace-level authorization",
                "recover after a catalog timeout without creating duplicate metadata",
                "preserve table properties across catalog registration and reload",
                "prevent an unauthorized catalog client from changing the current snapshot",
            ]),
            ("deletes", "Deletes and Row-Level Changes", "deletes", [
                "apply equality deletes to matching rows and retain non-matching rows",
                "apply position deletes using the correct data-file and row-position pair",
                "read delete files correctly before and after data-file compaction",
                "merge updates and deletes without duplicating a primary business key",
                "honor sequence-number ordering for delete files and data files",
                "preserve unrelated rows when a predicate matches no records",
                "make a retried delete idempotent across snapshot commits",
                "validate delete applicability after schema evolution changes field names",
                "handle concurrent delete and append according to configured isolation",
                "verify deleted rows are absent in current reads but available in retained history",
            ]),
            ("security", "Security and Governance", "security", [
                "enforce catalog authorization before reading table metadata",
                "prevent a cross-tenant reader from resolving another tenant's table",
                "avoid exposing object-store credentials in commit and retry errors",
                "restrict snapshot expiration and table drop to authorized maintenance roles",
                "verify encrypted data-file reads use the configured key identity",
                "rotate a test encryption key without making retained snapshots unreadable",
                "audit schema and property changes with actor and snapshot identifiers",
                "reject an untrusted metadata location outside the approved warehouse root",
                "redact sensitive partition values from unauthorized query diagnostics",
                "fail closed when catalog authorization or key service is unavailable",
            ]),
            ("engines", "Engine and Format Interoperability", "engines", [
                "write a table with one supported engine and read it with another",
                "validate timestamp precision across two engine implementations",
                "read deletes consistently across supported engine versions",
                "verify a v2 table is not silently interpreted with incompatible semantics",
                "preserve decimal values across Parquet and ORC table files",
                "compare predicate pushdown results with a full-scan reference result",
                "refresh catalog metadata before cross-engine reads after a commit",
                "confirm a feature-unsupported engine fails explicitly rather than returning partial rows",
                "handle a mixed file-format table according to engine capabilities",
                "reconcile cross-engine row counts for a fixed committed snapshot",
            ]),
        ],
    },
    "Medidata": {
        "root": "Medidata", "key": "medidata", "id_prefix": "MDT", "mode": "new",
        "modules": [
            ("edc", "Rave EDC", "edc", [
                "save a synthetic CRF form only when required fields and edit checks pass",
                "raise a data query when an entered value violates a protocol edit check",
                "close a query after an authorized synthetic correction and retain its history",
                "lock a synthetic form after the configured review and signature step",
                "transfer a corrected external lab value without overwriting unrelated CRF data",
                "prevent an investigator from editing a form after its lock state is applied",
                "calculate a derived field from source values using the approved study rule",
                "audit a source-data correction with old value, new value, actor, and timestamp",
                "export a synthetic study dataset with stable subject and visit identifiers",
                "reconcile form completion status against expected synthetic study visits",
            ]),
            ("ecoa", "Rave eCOA and ePRO", "ecoa", [
                "capture a synthetic patient-reported outcome in the assigned visit window",
                "save an offline eCOA response and synchronize it exactly once after reconnect",
                "prevent a participant from submitting a measure assigned to another subject",
                "render a validated questionnaire in the participant's configured locale",
                "record completion time using site and device time-zone rules",
                "resume an interrupted synthetic questionnaire without losing saved answers",
                "enforce a required response while allowing a protocol-approved skip option",
                "route a synthetic symptom response to the configured safety escalation queue",
                "prevent edits to a submitted response unless an authorized correction flow is used",
                "report adherence using expected and completed synthetic assessments",
            ]),
            ("econsent", "Rave eConsent", "econsent", [
                "present the currently approved synthetic consent version before enrollment",
                "block enrollment when required consent sections or signatures are missing",
                "record re-consent after a new approved document version becomes effective",
                "prevent signing after consent withdrawal or subject inactivation",
                "verify an authorized witness step when required by synthetic protocol data",
                "retain a time-stamped copy of the version shown and signed by the subject",
                "restrict consent corrections to permitted study roles with an audit record",
                "display a readable supported-language version without changing stored answers",
                "synchronize consent state to linked study workflows without duplicate enrollment",
                "prevent an investigator from accessing another site's restricted consent file",
            ]),
            ("rtsm", "Rave RTSM", "rtsm", [
                "randomize an eligible synthetic subject using the configured allocation ratio",
                "reject randomization when required eligibility data is missing or failed",
                "dispense the assigned synthetic kit using site, visit, and treatment rules",
                "prevent a blinded role from viewing treatment allocation details",
                "reconcile kit inventory after a dispense, return, and resupply sequence",
                "handle a duplicate randomization request without assigning a second treatment",
                "apply a temperature-excursion quarantine to affected synthetic kit inventory",
                "verify emergency unblinding requires the configured authorization and reason",
                "preserve assignment integrity after an interrupted dispense transaction",
                "report resupply thresholds using only active, eligible site inventory",
            ]),
            ("ctms", "Rave CTMS", "ctms", [
                "reconcile synthetic enrollment counts between site and study views",
                "calculate a site visit milestone from the configured study calendar",
                "track site document status and flag an expired required document",
                "generate a synthetic site payment only from approved milestone evidence",
                "preserve a site's budget values after an authorized amendment is applied",
                "restrict site performance details by country and assigned study role",
                "synchronize subject status from EDC without creating duplicate CTMS subjects",
                "verify an unplanned visit is recorded without changing planned visit dates",
                "retain approval history when a site activation status changes",
                "reconcile planned and actual monitoring visit completion for a synthetic site",
            ]),
            ("etmf", "Rave eTMF", "etmf", [
                "file a synthetic essential document in the correct trial and artifact section",
                "prevent a superseded document version from appearing as current",
                "route an uploaded document through required review and approval roles",
                "verify completeness against the study's configured eTMF reference model",
                "retain a complete audit history after document replacement or correction",
                "restrict a site's documents from users assigned to a different site",
                "apply retention and archival rules without deleting required trial evidence",
                "validate document metadata before accepting a synthetic upload",
                "reconcile an EDC-linked document reference with its eTMF record",
                "export a controlled inspection package with manifest and version history",
            ]),
            ("rbqm", "Risk-Based Quality Management", "rbqm", [
                "calculate a synthetic risk indicator from the configured source data and threshold",
                "create a monitoring issue when a key risk indicator exceeds its limit",
                "clear or close an issue only after the required mitigation evidence is recorded",
                "recompute a risk indicator after a corrected upstream EDC record arrives",
                "restrict cross-site risk comparisons to authorized study oversight roles",
                "preserve indicator definitions and version used for historical scoring",
                "distinguish missing source data from a true zero-risk result",
                "verify a risk alert is not duplicated by a repeated source event",
                "audit threshold changes with approver and effective date",
                "reconcile dashboard totals with the underlying synthetic site-level events",
            ]),
            ("safety_coding", "Safety and Medical Coding", "safety_coding", [
                "route a synthetic serious adverse event using the configured seriousness criteria",
                "preserve event chronology when a follow-up safety record is received late",
                "apply the approved coding dictionary version to a synthetic adverse event term",
                "require medical review when an automated coding match is below threshold",
                "prevent a duplicate safety case for the same source event identifier",
                "track expedited reporting milestones using the study's configured calendar",
                "restrict sensitive safety narratives to authorized safety personnel",
                "retain coding history when a synthetic verbatim term is recoded",
                "reconcile safety case status with its linked EDC source record",
                "record a clear exception when a required safety destination is unavailable",
            ]),
            ("imaging", "Rave Imaging and External Data", "imaging", [
                "link an imaging assessment to the correct synthetic subject and visit",
                "reject an image manifest with a mismatched subject identifier",
                "verify an external imaging transfer is complete before marking it available",
                "preserve assessment history after a corrected synthetic image is uploaded",
                "apply role-based access to sensitive imaging files and derived results",
                "reconcile image receipt status with the configured study schedule",
                "handle a duplicate external transfer without duplicating the assessment",
                "validate required file metadata before accepting a synthetic imaging package",
                "quarantine a corrupt image package while retaining transfer evidence",
                "export de-identified synthetic imaging metadata without direct identifiers",
            ]),
            ("integrations", "Clinical Integrations", "integrations", [
                "map an external synthetic source identifier to one stable study subject",
                "reject an inbound payload with an invalid study or site mapping",
                "retry a transient integration failure without duplicating committed records",
                "preserve source provenance and receipt time for imported synthetic data",
                "validate schema compatibility before accepting an integration payload",
                "handle out-of-order updates using the configured source precedence rule",
                "prevent one study's integration credentials from accessing another study",
                "reconcile outbound acknowledgement counts with submitted synthetic records",
                "redact sensitive values from integration error logs and retry traces",
                "pause an integration safely when repeated validation failures exceed threshold",
            ]),
            ("audit_compliance", "Audit and Compliance", "audit_compliance", [
                "reconstruct a synthetic record's full create, update, review, and lock history",
                "verify an electronic signature remains bound to the signed record version",
                "prevent audit entries from being edited by a standard study role",
                "record actor, reason, timestamp, and affected object for a permitted correction",
                "restrict audit export to authorized roles while preserving evidence completeness",
                "verify system time changes do not reorder signed audit events",
                "retain trial records according to configured archival and retention controls",
                "detect an unauthorized attempt to alter a locked synthetic form",
                "reconcile audit event counts with controlled actions in the test run",
                "redact direct identifiers from a permitted non-production audit extract",
            ]),
        ],
    },
    "IQVIA": {
        "root": "IQVIA", "key": "iqvia", "id_prefix": "IQV", "mode": "new",
        "modules": [
            ("clinical_data", "Clinical Data Management", "clinical_data", [
                "validate synthetic CRF data against protocol edit checks",
                "raise and resolve a data query with a complete audit trail",
                "reconcile an external lab result with its synthetic subject and visit",
                "deduplicate inbound clinical records using the configured source key",
                "freeze a synthetic study dataset only after required review completion",
                "apply a corrected source record without losing the previous value history",
                "export a clinical dataset with stable visit and form ordering",
                "reconcile expected and received forms across synthetic sites",
                "restrict subject-level data by study, site, and assigned role",
                "preserve study metadata when a compatible CRF version is deployed",
            ]),
            ("ctms", "Clinical Trial Management", "ctms", [
                "calculate a synthetic site milestone from current study activation status",
                "reconcile enrollment targets against site-level subject status",
                "prevent payment generation without approved milestone evidence",
                "track site document expiration and block a prohibited workflow transition",
                "synchronize subject status from a connected clinical data source exactly once",
                "apply a study amendment without overwriting completed site milestones",
                "restrict budget and enrollment details to authorized country roles",
                "record monitoring visit changes with actor, reason, and effective date",
                "reconcile planned and actual study visit counts from synthetic events",
                "retain an audit record when a site is suspended and later reactivated",
            ]),
            ("safety", "Safety and Pharmacovigilance", "safety", [
                "create a synthetic safety case from a valid source report identifier",
                "classify seriousness and expectedness using the configured study rules",
                "escalate a serious adverse event within the configured reporting window",
                "merge a follow-up report into the matching case without losing chronology",
                "prevent duplicate case creation after a repeated source notification",
                "require human review for an ambiguous synthetic coding match",
                "restrict safety narrative access to authorized pharmacovigilance roles",
                "reconcile case status and reporting evidence across workflow transitions",
                "preserve dictionary version and coded term history after recoding",
                "queue a failed safety destination for bounded retry and clear recovery evidence",
            ]),
            ("etmf", "Trial Master File", "etmf", [
                "file a synthetic essential document in the correct study artifact group",
                "route a document through required author, reviewer, and approver roles",
                "mark a superseded synthetic document version as non-current",
                "evaluate trial-file completeness against the configured reference model",
                "restrict site document access to the assigned site team",
                "preserve document metadata and signatures through a controlled correction",
                "archive a completed trial package without removing retained audit history",
                "validate document dates and country metadata before filing",
                "generate an inspection-ready export with stable versions and a manifest",
                "detect and report a missing required artifact without fabricating completeness",
            ]),
            ("regulatory", "Regulatory Information Management", "regulatory", [
                "track a synthetic submission package through configured review milestones",
                "validate country-specific metadata before a regulatory submission export",
                "preserve document lineage across a submission amendment",
                "prevent a duplicate submission identifier in the same authority context",
                "route an approval to the correct regulatory role and country scope",
                "reconcile product, study, and authority references in a synthetic dossier",
                "apply a new regulatory requirement without changing historical submission state",
                "record submission dispatch and authority acknowledgement timestamps",
                "restrict confidential regulatory records by product and region",
                "verify a corrected dossier retains its prior approved version for inspection",
            ]),
            ("real_world_data", "Real-World Data and Evidence", "real_world_data", [
                "normalize synthetic claims records while preserving source provenance",
                "apply a documented cohort rule at inclusive and exclusive date boundaries",
                "deduplicate longitudinal patient events without joining distinct synthetic people",
                "measure missingness without converting unknown values into false negatives",
                "de-identify a synthetic dataset while retaining permitted analytic utility",
                "reconcile a derived cohort count to its source query and version",
                "handle delayed claims updates without double-counting an event",
                "enforce purpose and tenant restrictions on a synthetic research workspace",
                "validate code-set version changes against historical cohort reproducibility",
                "document limitations when a synthetic source feed is incomplete",
            ]),
            ("commercial_data", "Commercial Data and Analytics", "commercial_data", [
                "aggregate synthetic territory metrics without exposing row-level identifiers",
                "reconcile a sales metric to its approved source extract and calculation version",
                "apply territory realignment without duplicating historical transactions",
                "respect product and region filters for an authorized commercial user",
                "handle late-arriving transaction corrections in a period-close report",
                "prevent a user from exporting data outside assigned market permissions",
                "refresh a dashboard only after the upstream synthetic batch is complete",
                "compare current and prior periods using consistent calendar definitions",
                "deduplicate repeated source events by stable transaction identifier",
                "preserve data lineage from an aggregate back to permitted source systems",
            ]),
            ("patient_engagement", "Patient Engagement", "patient_engagement", [
                "enroll a synthetic participant only after consent and eligibility checks pass",
                "schedule a reminder using participant locale and permitted contact channel",
                "suppress outreach after a synthetic opt-out or consent withdrawal",
                "prevent duplicate reminders after a retried notification request",
                "synchronize a participant-reported outcome after an offline session",
                "restrict participant profile access to the assigned care or study team",
                "record delivery, failure, and read evidence for synthetic communications",
                "handle a changed contact preference before the next scheduled outreach",
                "support an accessible supported-language participant workflow",
                "escalate a synthetic safety response using approved study procedures",
            ]),
            ("analytics", "Clinical Analytics", "analytics", [
                "reconcile a study dashboard total with the underlying synthetic source rows",
                "refresh an aggregate only after dependent clinical feeds complete",
                "preserve historical metric definitions after a dashboard calculation changes",
                "apply role-level suppression to small synthetic cohorts where configured",
                "calculate visit compliance with site-local time-zone boundaries",
                "distinguish missing data from a measured zero in a study metric",
                "verify a risk alert references the source snapshot and rule version",
                "prevent duplicate alerts when a source batch is replayed",
                "filter analytics by protocol version without mixing incompatible cohorts",
                "export an approved aggregate without leaking subject-level records",
            ]),
            ("integration", "Data Integration and Interoperability", "integration", [
                "map external synthetic identifiers using a versioned integration crosswalk",
                "reject a payload with an unknown study, site, or source-system mapping",
                "retry a transient transfer failure without duplicating accepted records",
                "validate schema and required fields before applying an inbound batch",
                "preserve source timestamps and receipt timestamps as separate values",
                "resolve out-of-order updates using the declared source precedence policy",
                "reconcile outbound record counts with destination acknowledgements",
                "isolate credentials and data between two synthetic tenant integrations",
                "redact protected values from transfer errors and diagnostic logs",
                "pause a failing feed safely and resume from its last confirmed checkpoint",
            ]),
            ("identity_compliance", "Identity, Privacy, and Compliance", "identity_compliance", [
                "enforce least-privilege study access for a synthetic cross-functional role",
                "remove access promptly after a synthetic user is deactivated",
                "record a reason and actor for an approved sensitive-data access event",
                "prevent a cross-tenant query from returning another tenant's synthetic rows",
                "apply retention and archival rules to a completed synthetic study record",
                "redact direct identifiers from a role-approved analytics extract",
                "fail closed if identity or policy service is temporarily unavailable",
                "verify audit exports include all relevant events without editable gaps",
                "prevent a revoked role from writing through an already authenticated session",
                "reconcile consent status with downstream processing eligibility",
            ]),
        ],
    },
    "Databricks": {
        "root": "Databricks", "key": "databricks", "id_prefix": "DBX", "mode": "append",
        "modules": [
            ("delta_lake", "Delta Lake", "delta_lake", [
                "merge CDC updates by stable key without duplicating replayed events",
                "evolve a nested schema while retaining stable field identity",
                "read a prior committed snapshot after a current-table update",
                "apply change data feed offsets exactly once across a consumer restart",
                "enforce a check constraint and reject an invalid write atomically",
                "compact small files without changing logical results or table history",
                "delete rows under row-level concurrency while preserving unrelated writes",
                "recover a failed transaction without exposing partial files",
                "preserve generated column values through an overwrite operation",
                "enforce deletion-vector behavior consistently across reader versions",
            ]),
            ("jobs", "Jobs", "jobs", [
                "run a multi-task DAG only after all declared upstream dependencies succeed",
                "repair a failed task without rerunning a completed non-idempotent task",
                "pass task values across job tasks without leaking them to another run",
                "apply a job parameter override without mutating its saved default",
                "prevent overlapping scheduled runs when concurrency is limited to one",
                "route a failed job notification to the configured owner and channel",
                "cancel dependent tasks after a required task reaches terminal failure",
                "retry a transient task failure within the configured retry budget",
                "enforce run-as identity and task-level permissions for a service principal",
                "preserve run history and links after a job definition is edited",
            ]),
            ("notebooks", "Notebooks", "notebooks", [
                "execute notebook cells in dependency order after a kernel restart",
                "retain parameter values for a job run without changing interactive defaults",
                "prevent notebook output from exposing a synthetic secret value",
                "reproduce a notebook result using a pinned runtime and input snapshot",
                "cancel a long-running cell and release its compute resources",
                "resolve conflicting notebook edits without silently discarding either version",
                "verify a notebook library dependency is available on the attached cluster",
                "render a result deterministically after clearing stale cell output",
                "enforce notebook permissions independently from workspace navigation access",
                "export notebook source without embedding sensitive execution results",
            ]),
            ("mlflow", "MLflow", "mlflow", [
                "log metrics, parameters, and artifacts to the correct experiment run",
                "register a model version from an approved source run and artifact URI",
                "transition model stages only for an authorized principal",
                "reproduce a run from its recorded source, environment, and input version",
                "prevent duplicate run artifacts after a retried logging request",
                "compare model versions using metrics with consistent evaluation datasets",
                "preserve lineage when a registered model version is aliased or promoted",
                "resolve an artifact-store outage without marking an incomplete run successful",
                "restrict access to a private experiment and its model artifacts",
                "record an immutable audit event for model registration and promotion",
            ]),
            ("model_evaluation", "Model Evaluation", "model_evaluation", [
                "calculate classification metrics for a fixed synthetic labeled dataset",
                "apply a declared decision threshold at exact and adjacent boundary scores",
                "compare candidate and baseline models using the same evaluation snapshot",
                "detect missing labels without silently counting them as negative outcomes",
                "verify fairness slices use the configured synthetic protected-group values",
                "reject an evaluation with mismatched prediction and label identifiers",
                "reproduce metric output from a pinned evaluator version and model artifact",
                "retain per-example evidence only for authorized test roles",
                "block promotion when a required quality threshold is not met",
                "report confidence intervals using the configured sampling method",
            ]),
            ("unity_catalog", "Unity Catalog", "unity_catalog", [
                "enforce catalog, schema, table, and column grants independently",
                "apply row filters and column masks to queries by user and group identity",
                "prevent a service principal from using a grant outside its workspace scope",
                "record table lineage across a notebook, job, and SQL transformation",
                "resolve external-location credentials without revealing secret values",
                "deny a create or drop action when ownership is insufficient",
                "preserve grants through a table rename or controlled schema migration",
                "restrict a shared table to its intended recipient identity",
                "audit privilege changes with actor, object, and before/after grants",
                "fail closed when a policy tag or authorization service is unavailable",
            ]),
            ("streaming", "Structured Streaming", "streaming", [
                "resume a stream from its checkpoint without duplicating committed output",
                "handle a late event according to the configured watermark and window",
                "recover from a schema change without advancing past unprocessed offsets",
                "coordinate two streaming writers targeting independent output tables",
                "quarantine a corrupt record while continuing valid records safely",
                "preserve exactly-once sink semantics after a driver restart",
                "bound state-store growth for a high-cardinality synthetic stream",
                "apply a stream-stream join with event-time boundaries and late data",
                "stop a stream gracefully and release its checkpoint lease",
                "surface backpressure and lag metrics without losing source offsets",
            ]),
            ("sql_warehouse", "SQL Warehouse", "sql_warehouse", [
                "enforce query permissions when a warehouse uses a service identity",
                "cancel a long-running query and release its warehouse resources",
                "return consistent pagination from a query result with a stable order key",
                "isolate concurrent sessions and temporary objects between users",
                "apply a warehouse auto-stop setting after the configured idle interval",
                "preserve query parameters without unsafe SQL string interpolation",
                "return a clear error for a query referencing a revoked table grant",
                "verify result caching respects role and row-filter changes",
                "honor workload limits under concurrent synthetic query load",
                "audit query history while redacting sensitive literal values",
            ]),
        ],
    },
    "Snowflake": {
        "root": "SnowflakeAI", "key": "snowflake", "id_prefix": "SNOW", "mode": "append",
        "modules": [
            ("data_quality", "Data Quality", "data_quality", [
                "detect a null spike against a versioned table quality threshold",
                "reconcile a quality metric with the exact table snapshot evaluated",
                "route failed rows to a controlled quarantine without dropping valid rows",
                "avoid duplicate quality alerts after a repeated task execution",
                "apply a quality check to only the intended table partitions",
                "retain metric history after an upstream schema addition",
                "distinguish zero-valued measurements from absent source values",
                "verify a freshness threshold around its inclusive time boundary",
                "restrict sample-row access while allowing aggregate quality metrics",
                "fail a data pipeline before publishing a dataset that violates a critical rule",
            ]),
            ("elt_pipeline", "ELT Pipeline", "elt_pipeline", [
                "load staged files exactly once using a stable source file identifier",
                "merge CDC records with deletes and out-of-order source timestamps",
                "recover an ELT task after a transient warehouse interruption",
                "preserve destination state when a multi-step transaction fails",
                "apply schema-on-read rules to a newly added source field",
                "deduplicate a replayed batch without suppressing a legitimate later update",
                "advance a pipeline watermark only after all records are committed",
                "reconcile source and destination counts for a partitioned load",
                "prevent an untrusted stage path from loading into a protected schema",
                "bound warehouse consumption under a configured task schedule",
            ]),
            ("schema_governance", "Schema Governance", "schema_governance", [
                "add a nullable column while retaining dependent view compatibility",
                "rename a column and update governed consumers through an approved migration",
                "reject a type narrowing that would truncate existing values",
                "detect a breaking source schema change before a task publishes output",
                "preserve comments and classification tags across a table clone",
                "reconcile declared schema with staged file metadata",
                "version a schema contract and route incompatible producers to quarantine",
                "prevent an unauthorized role from changing a protected table definition",
                "validate view dependencies after an upstream column is removed",
                "record schema changes and approver identity in governance history",
            ]),
            ("rbac_and_masking", "RBAC and Masking", "rbac_and_masking", [
                "resolve inherited role grants without granting access to unrelated schemas",
                "mask a synthetic sensitive column by role while preserving authorized output",
                "apply a row access policy after a role switch within the same session",
                "prevent an owner-rights procedure from bypassing its declared data scope",
                "revoke an inherited privilege and confirm access is removed promptly",
                "audit role grants, ownership transfers, and policy changes",
                "restrict a share or clone from exposing masked source values",
                "fail closed if a policy lookup returns an unavailable state",
                "enforce least privilege for an automated task identity",
                "redact credentials and sensitive query literals from task error output",
            ]),
            ("performance", "Performance and Cost Controls", "performance", [
                "prune micro-partitions for a selective predicate and verify result parity",
                "respect warehouse statement timeout under a long-running synthetic query",
                "scale a warehouse within configured minimum and maximum cluster bounds",
                "avoid duplicate compute after an idempotent task retry",
                "verify result cache behavior after a role or policy change",
                "reconcile query profile bytes scanned with the expected partition filter",
                "throttle concurrent workloads without starving a protected critical task",
                "stop idle compute after the configured auto-suspend interval",
                "enforce a resource monitor threshold and record the resulting action",
                "compare optimized and baseline query results for identical ordering and values",
            ]),
            ("streams_and_tasks", "Streams and Tasks", "streams_and_tasks", [
                "consume each stream change once across a transaction rollback and retry",
                "handle an empty stream without advancing business state incorrectly",
                "schedule dependent tasks only after predecessor success",
                "recover a failed task graph from the last committed checkpoint",
                "prevent overlapping task executions when a run is still active",
                "preserve stream offsets when the consuming task is suspended and resumed",
                "deduplicate task-triggered notifications after a retry",
                "apply a task owner role with only required table privileges",
                "detect a stale stream and report its retention boundary clearly",
                "audit task definition and schedule changes with actor information",
            ]),
            ("data_sharing", "Secure Data Sharing", "data_sharing", [
                "share an approved database object without exposing provider credentials",
                "enforce consumer role scope on shared tables and views",
                "reflect provider-side masking and row policies in consumer queries",
                "remove consumer access after a share is revoked",
                "prevent a consumer from modifying provider-owned shared data",
                "validate a listing or share update before making it visible to consumers",
                "reconcile consumer query results with the permitted synthetic row set",
                "preserve access boundaries when a shared object is renamed",
                "audit share creation, grant changes, and consumer access",
                "handle provider suspension without returning stale unauthorized results",
            ]),
            ("snowpark", "Snowpark and UDFs", "snowpark", [
                "execute a Snowpark transformation using the declared runtime and packages",
                "preserve decimal and timestamp types between Snowpark and table storage",
                "reject a UDF package dependency not present in the approved environment",
                "enforce owner and caller rights for a synthetic UDF invocation",
                "prevent a Snowpark procedure from reading an undeclared protected table",
                "reproduce a transformation result from a pinned code artifact",
                "handle a UDF exception without committing partial output",
                "bound memory and execution time for a large synthetic input partition",
                "verify package import behavior in an isolated runtime version",
                "redact synthetic secret values from UDF logs and exception traces",
            ]),
        ],
    },
    "Palantir Foundry": {
        "root": "PalantirFoundryAI", "key": "palantirfoundry", "id_prefix": "PF", "mode": "append",
        "modules": [
            ("aip_logic", "AIP Logic", "aip_logic", [
                "validate typed inputs and outputs across a versioned logic workflow",
                "enforce an approved model and tool allowlist for an AIP request",
                "apply a token and execution budget without partial downstream writes",
                "evaluate prompt output against a fixed synthetic structured response contract",
                "prevent retrieved untrusted content from overriding system constraints",
                "trace every logic step to its source object and model configuration",
                "retry a transient model error without duplicating completed tool actions",
                "redact protected object values from traces and evaluation artifacts",
                "require an approval step before a configured high-impact action executes",
                "fail closed when model access or policy evaluation is unavailable",
            ]),
            ("workflow", "Workflows", "workflow", [
                "run dependent workflow actions only after prerequisite actions succeed",
                "resume a failed workflow from a checkpoint without repeating completed writes",
                "enforce workflow role permissions on each protected action",
                "cancel a running workflow and release reserved resources",
                "deduplicate a retried trigger using its stable event identifier",
                "preserve input object versions referenced by a workflow run",
                "route a failed action to its configured owner with actionable evidence",
                "verify workflow variables remain scoped to one execution",
                "apply a workflow schedule across a daylight-saving boundary",
                "audit workflow definition, approval, and execution state changes",
            ]),
            ("ontology", "Ontology and Actions", "ontology", [
                "resolve an object link using stable primary and foreign key mappings",
                "execute an ontology action only when the caller has required object permissions",
                "validate action parameters and reject an invalid state transition",
                "preserve object identity when a display property changes",
                "update an object atomically when an action writes multiple properties",
                "prevent duplicate action effects after an event retry",
                "reconcile ontology search results with current object visibility rules",
                "handle a deleted linked object without returning stale relationship data",
                "version an object type change while preserving compatible existing records",
                "record action actor, inputs, outputs, and timestamp for audit review",
            ]),
            ("transforms", "Transforms and Pipelines", "transforms", [
                "build a transform from pinned input dataset versions and code revision",
                "fail a pipeline before publishing output when a required quality check fails",
                "rebuild only downstream datasets affected by a changed input",
                "preserve output atomicity when a transform fails halfway through a write",
                "enforce resource quotas for a skewed high-volume synthetic partition",
                "reconcile transform schema with declared output contracts",
                "retry a transient execution failure without duplicating output rows",
                "prevent a transform from reading an undeclared restricted dataset",
                "compare incremental and full rebuild output for logical equivalence",
                "retain code, input, and output lineage for each published build",
            ]),
            ("data_lineage", "Data Lineage", "data_lineage", [
                "trace a published field from source dataset through transforms to consumer",
                "update lineage when an upstream column is renamed through migration",
                "distinguish direct dependencies from transitive lineage edges",
                "retain lineage for a historical output build after a pipeline edit",
                "avoid false lineage links for same-named fields in separate datasets",
                "restrict lineage details when source objects are not visible to the caller",
                "reconcile lineage graph edges with declared transform inputs and outputs",
                "detect a broken dependency after an upstream dataset is removed",
                "export lineage with stable dataset and field identifiers",
                "audit changes to lineage-relevant pipeline configuration",
            ]),
            ("access_control", "Access Control", "access_control", [
                "enforce project, dataset, and object permissions independently",
                "remove access after a user is removed from an assigned group",
                "apply row-level restrictions to a query after a role switch",
                "prevent a service identity from inheriting a broader human role grant",
                "restrict an action to permitted object instances and properties",
                "audit policy changes with before and after permission state",
                "redact restricted fields from search, logs, and object previews",
                "fail closed when policy evaluation times out",
                "prevent cross-organization object lookup using a guessed identifier",
                "verify access removal applies to an already-open session before a write",
            ]),
            ("sdk_ci", "SDK and CI", "sdk_ci", [
                "build an SDK client using an explicitly configured test identity",
                "reject an expired token without logging the credential value",
                "paginate API results without skipping or duplicating objects",
                "retry a rate-limited request within the configured retry budget",
                "validate generated types against the server response schema",
                "isolate CI credentials from local developer configuration",
                "run a deterministic integration test against disposable synthetic objects",
                "clean up only resources created by the current test execution",
                "surface a permission error with actionable object and role context",
                "verify API version compatibility before publishing an SDK change",
            ]),
            ("object_explorer", "Object Explorer", "object_explorer", [
                "filter synthetic objects without exposing records outside caller scope",
                "sort results stably when display labels are equal",
                "paginate through changing objects using a stable continuation key",
                "show current object values after a linked action updates the record",
                "distinguish missing properties from explicit null values in previews",
                "prevent a bulk action from affecting objects outside the selected set",
                "verify search results respect row and property-level policies",
                "handle a deleted object referenced by a saved exploration query",
                "export an authorized result set without adding hidden restricted fields",
                "audit a bulk update with per-object outcome and failure detail",
            ]),
        ],
    },
}


def variants(pack: dict):
    return CLINICAL_VARIANTS if pack["root"] in {"Medidata", "IQVIA"} else DATA_VARIANTS


def generate_rows(pack: dict, module_id: str, label: str, slug: str, tasks: list[str],
                  start_number: int, count: int):
    profiles = variants(pack)
    rows = []
    for index in range(count):
        task = tasks[index % len(tasks)]
        case_variant = profiles[(index // len(tasks)) % len(profiles)]
        variant_name, fixture = case_variant
        number = start_number + index
        scenario = f"{label}: {task} ({variant_name})"
        kind = ("Clinical Data Integrity" if pack["root"] in {"Medidata", "IQVIA"}
                else "Data Integrity" if module_id in {"delta_lake", "data_quality", "clinical_data", "snapshots", "datasets"}
                else "Security" if module_id in {"unity_catalog", "rbac_and_masking", "access_control", "security", "identity_compliance"}
                else "Resilience" if variant_name in {"worker restart", "dependency outage", "transient retry", "partial integration outage"}
                else "Functional")
        priority = "Critical" if kind in {"Security", "Clinical Data Integrity"} else "High" if index % 3 else "Medium"
        product = pack.get("display", pack["key"])
        steps = (
            f"1. Prepare a disposable, versioned synthetic fixture: {fixture} "
            f"2. Execute the operation to {task}. "
            "3. Capture the committed result, version or workflow state, and audit evidence. "
            "4. Compare output with the source fixture and the expected invariant. "
            "5. Repeat the operation where applicable and verify recovery, access, and side-effect behavior."
        )
        expected = (
            f"The platform must correctly {task}; the {variant_name} condition is handled according to the configured contract; "
            "valid data and committed state are preserved; invalid or unauthorized work is rejected or quarantined without silent loss; "
            "retries do not duplicate side effects; lineage, provenance, and audit evidence remain available; "
            "and no production data or credentials are used."
        )
        framework = ("Synthetic study API harness" if pack["root"] in {"Medidata", "IQVIA"}
                     else "Pytest + Spark" if pack["root"] == "Databricks"
                     else "SQL assertion harness" if pack["root"] == "Snowflake"
                     else "Foundry SDK + pytest" if pack["root"] == "PalantirFoundryAI"
                     else "DSS API + pytest" if pack["root"] == "Dataiku"
                     else "Spark / Trino interoperability harness")
        rows.append({
            "product": product, "module": label,
            "test_case_id": f"{pack['id_prefix']}-{slug.upper()[:8]}-{number:05d}",
            "test_scenario": scenario,
            "test_case_name": f"{product}: {task} with {variant_name}",
            "test_type": kind, "priority": priority,
            "preconditions": f"Non-production tenant or isolated local fixture; synthetic records only; {fixture}",
            "test_steps": steps, "expected_result": expected, "automation_framework": framework,
            "tags": ",".join([pack["key"], "data-platform" if pack["root"] not in {"Medidata", "IQVIA"} else "life-sciences",
                              "synthetic-data", slug, variant_name.replace(" ", "-")]),
        })
    return rows


def read_rows(path: Path):
    with path.open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def write_rows(path: Path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=FIELDS, lineterminator="\r\n")
        writer.writeheader()
        writer.writerows(rows)
    json_path = path.with_suffix(".json")
    json_path.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    variable = re.sub(r"\W+", "_", path.stem.upper())
    ts_path = path.with_suffix(".ts")
    ts_path.write_text(
        f"// Generated from {path.name}; regenerate with scripts/generate_data_ai_health_suites.py.\n"
        f"export const {variable} = {json.dumps(rows, ensure_ascii=False, indent=2)} as const;\n"
        f"export default {variable};\n",
        encoding="utf-8",
    )


def generate(pack: dict):
    root = ROOT / pack["root"]
    manifest_path = root / "manifest.json"
    if pack["mode"] == "append":
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        module_specs = pack["modules"]
        expected_modules = {m[0] for m in module_specs}
        declared_modules = {m["id"] for m in manifest["modules"]}
        if expected_modules != declared_modules:
            raise ValueError(f"Module mismatch for {pack['root']}: {expected_modules ^ declared_modules}")
        added = 0
        for module in manifest["modules"]:
            slug, label, _, tasks = next(m for m in module_specs if m[0] == module["id"])
            path = root / module["folder"] / f"{module['prefix']}.csv"
            existing = read_rows(path)
            if pack["root"] == "SnowflakeAI":
                # The original Snowflake AI CSVs reused Salesforce's SF- IDs.
                # Re-prefix them so global search and case deep-links are unique.
                for row in existing:
                    if row["test_case_id"].startswith("SF-"):
                        row["test_case_id"] = "SNOW-" + row["test_case_id"][3:]
            new_rows = generate_rows(pack, slug, label, slug, tasks, 1001, 250)
            generated_ids = {row["test_case_id"] for row in new_rows}
            preserved_rows = [row for row in existing if row["test_case_id"] not in generated_ids]
            if len({row["test_case_id"] for row in preserved_rows}) != len(preserved_rows):
                raise ValueError(f"Existing duplicate ID detected in {path}")
            write_rows(path, preserved_rows + new_rows)
            module["count"] = len(preserved_rows) + len(new_rows)
            added += len(new_rows)
        manifest["count"] = sum(module["count"] for module in manifest["modules"])
        manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
        print(f"{pack['display']}: added {added:,}; total {manifest['count']:,}")
        return

    manifest_modules = []
    total = 0
    for slug, label, prefix_slug, tasks in pack["modules"]:
        rows = generate_rows(pack, slug, label, prefix_slug, tasks, 1, 200)
        prefix = f"{pack['key']}_{prefix_slug}_suite"
        write_rows(root / slug / f"{prefix}.csv", rows)
        manifest_modules.append({"id": slug, "label": label, "folder": slug, "prefix": prefix, "count": len(rows)})
        total += len(rows)
    manifest = {"product": pack["display"], "key": pack["key"], "count": total, "modules": manifest_modules}
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"{pack['display']}: added {total:,} across {len(manifest_modules)} modules")


if __name__ == "__main__":
    for pack in PACKS.values():
        pack["display"] = "Palantir Foundry" if pack["root"] == "PalantirFoundryAI" else pack["root"]
        generate(pack)
