"""Generate missing market-leading data/AI platform packs and runnable E2E suites.

Run with ``python scripts/generate_market_product_suites.py``. Each platform
gets 2,000 structured synthetic cases and a self-contained Playwright project
under MarketAutomationSuites/<platform>/.
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
FIELDS = [
    "product", "module", "test_case_id", "test_scenario", "test_case_name",
    "test_type", "priority", "preconditions", "test_steps", "expected_result",
    "automation_framework", "tags",
]

VARIANTS = [
    ("clean baseline", "Use a disposable workspace, tenant, project, and versioned synthetic fixture."),
    ("empty input", "Use an empty source or namespace and verify defined empty-result behavior."),
    ("single record", "Use one valid synthetic record and verify the smallest non-empty result."),
    ("duplicate key", "Submit a duplicate business key and verify the declared deduplication or rejection rule."),
    ("nullable optional field", "Set optional fields to null while retaining all required identifiers."),
    ("boundary values", "Exercise documented minimum, maximum, and just-outside limits."),
    ("late arriving data", "Deliver an older event after a newer watermark or processing window has advanced."),
    ("out-of-order events", "Shuffle event or commit order while preserving source event-time values."),
    ("compatible schema change", "Add a nullable field while existing readers and stored versions remain active."),
    ("field rename", "Rename a field using the supported migration path and inspect historical reads."),
    ("worker restart", "Restart a worker after processing input but before final checkpoint or commit."),
    ("least privilege", "Compare the authorized role with a role missing the required grant."),
    ("concurrent writers", "Run two valid writers against overlapping logical data at the same time."),
    ("transient retry", "Inject one transient service failure, restore the dependency, and retry."),
    ("commit conflict", "Advance the resource version between read and write to create an optimistic conflict."),
    ("rollback and replay", "Restore a prior version in a disposable fixture and replay the same operation."),
    ("Unicode identifiers", "Use Unicode in safe project, model, table, index, and synthetic account labels."),
    ("time-zone boundary", "Place timestamps around local midnight and a daylight-saving transition."),
    ("skewed high volume", "Use a large synthetic fixture with one intentionally skewed key or partition."),
    ("corrupt input", "Include one malformed record and verify quarantine or clear failure without silent loss."),
    ("partial cleanup failure", "Complete the main operation, fail cleanup once, and verify cleanup can be retried."),
    ("idempotent rerun", "Repeat the exact operation with the same stable idempotency key."),
    ("dependency outage", "Make an optional downstream service unavailable while core dependencies remain healthy."),
    ("expired credential", "Use an expired test identity and verify refresh or a fail-closed response."),
    ("cross-region or engine read", "Write once and read the committed result through a second supported region or engine."),
]


def module(slug: str, label: str, tasks: str) -> tuple[str, str, list[str]]:
    return slug, label, [task.strip() for task in tasks.split("|") if task.strip()]


# Ten packs, each with ten feature areas. The task phrases describe observable
# product behavior and are expanded across 25 boundary, security, recovery,
# compatibility, and scale fixtures to produce 200 distinct cases per module.
PACKS = [
    {
        "root": "MicrosoftFabric", "key": "microsoftfabric", "display": "Microsoft Fabric",
        "prefix": "FAB", "accent": "blue",
        "modules": [
            module("workspaces", "Workspaces and Roles", "create a workspace with the intended capacity assignment|move a workspace through a controlled deployment pipeline|restrict workspace discovery to assigned groups|preserve workspace role inheritance after group membership changes|prevent deletion while dependent items remain|audit workspace settings and role changes|copy a workspace using supported lifecycle tooling|recover access after an owner leaves the tenant|apply sensitivity labels to workspace content|verify workspace activity appears in the tenant audit log"),
            module("onelake", "OneLake and Shortcuts", "create a shortcut to an approved external data location|resolve a shortcut after its source credential rotates|enforce source permissions through a shortcut read|detect a broken shortcut without returning stale data|refresh mirrored data and reconcile row counts|retain source lineage for mirrored tables|handle a source schema addition during refresh|prevent writes through a read-only shortcut|remove a shortcut without deleting its source|verify OneLake paths resolve consistently across workloads"),
            module("data_factory", "Data Factory Pipelines", "author a pipeline with dependent copy and transformation steps|run a parameterized pipeline against a synthetic source|retry a transient activity failure without duplicating writes|cancel a running pipeline and release its capacity|route malformed rows to a rejected-record output|preserve secret values in linked-service configuration|trigger a pipeline from a supported schedule|reconcile source and destination row counts after completion|resume a pipeline after a checkpointed failure|record activity inputs outputs and duration in run history"),
            module("lakehouse", "Lakehouse and Spark", "create a lakehouse table from a versioned synthetic file set|run a notebook against the selected lakehouse default database|commit a Delta write atomically after a worker retry|preserve schema and partition metadata after a merge|read a table from a second Fabric workload|enforce lakehouse item permissions for notebook execution|rebuild a table after an upstream schema addition|prevent concurrent writes from silently losing records|optimize a synthetic table without changing logical results|retain notebook run lineage to its input snapshot"),
            module("warehouse", "Warehouse and SQL", "create a warehouse object using supported SQL syntax|query a warehouse table with row-level security enabled|preserve decimal precision through a staged load|rollback a failed multi-statement transaction|run a parameterized query without exposing injected SQL|reconcile warehouse results with the source lakehouse|enforce object grants after role revocation|handle a concurrent schema update during a query|publish a stored procedure with controlled dependencies|inspect query history and execution diagnostics"),
            module("power_bi", "Power BI Semantic Models", "publish a semantic model from a governed warehouse source|refresh a model incrementally across a partition boundary|apply row-level security to a shared model|preserve measures after a compatible schema update|bind a report to the promoted model version|reconcile model refresh totals with source data|prevent unauthorized Build permission from exporting data|recover a refresh after a transient gateway failure|validate model relationships and cardinality|trace report fields to their source tables"),
            module("real_time", "Real-Time Intelligence", "ingest a synthetic event stream into an eventhouse|query events by event time across a late-arrival window|deduplicate retried events using a stable event identifier|apply a KQL function to records with nullable fields|create a real-time dashboard with a bounded refresh interval|alert on a synthetic threshold breach exactly once|preserve event ordering within the declared partition key|replay a bounded time range after a consumer restart|restrict eventhouse access by database role|reconcile event counts between ingestion and query results"),
            module("data_science", "Data Science and ML", "train a model from a versioned lakehouse dataset|track the source snapshot and parameters for a training run|compare candidate metrics with a declared acceptance threshold|register an approved model artifact with lineage|serve a model endpoint with a bounded request timeout|score a batch with missing optional features|roll back a model deployment to a prior version|restrict model access to approved workspace roles|record inference metrics without logging sensitive payloads|reproduce a model run from pinned dependencies"),
            module("governance", "Governance and Lineage", "trace a report column through transformations to its source|apply a sensitivity label and verify downstream propagation|search catalog items using caller-visible permissions|block a sensitive export for a restricted role|reconcile lineage edges with pipeline dependencies|review a data access request and record its approver|remove stale access after group membership changes|verify audit records for item permission changes|classify a synthetic dataset using configured rules|export catalog metadata without restricted field values"),
            module("capacity", "Capacity and Operations", "observe workload consumption for a scheduled refresh window|throttle a burst workload without corrupting committed data|pause and resume capacity with dependent workloads present|isolate a noisy workspace from unrelated workload results|alert when synthetic utilization crosses its configured threshold|reconcile item activity with capacity metrics|inspect failed operations and correlate their request identifiers|apply an approved capacity scale change|verify capacity limits reject an oversized job clearly|compare usage attribution across workspaces"),
        ],
        "journeys": [
            ("Workspace provisioning and role boundary", "Workspaces", "New workspace|Create workspace", ["Name"], "Create|Save", "Workspace", "Open workspace|View workspace"),
            ("OneLake shortcut creation and source validation", "OneLake|Lakehouse", "New shortcut|Create shortcut", ["Name", "Path|URL"], "Create|Save", "Shortcut", "Validate|Test connection"),
            ("Pipeline authoring, execution, and run history", "Data Factory|Pipelines", "New pipeline|Create pipeline", ["Name"], "Create|Save", "Pipeline", "Run|Run now"),
            ("Lakehouse table publication and schema review", "Lakehouse", "New table|Create table|Upload", ["Name"], "Create|Save|Upload", "Table", "Schema|Columns"),
            ("Warehouse query execution and history inspection", "Warehouse|SQL", "New query|Create warehouse", ["Name|Query name"], "Save|Run", "Query|Warehouse", "Run|Execute"),
            ("Semantic model refresh and report binding", "Semantic models|Datasets|Models", "New semantic model|Create model", ["Name"], "Create|Save|Publish", "Model", "Refresh|Run refresh"),
            ("Eventhouse ingestion and real-time query", "Real-Time Intelligence|Eventhouse", "New eventhouse|Create database", ["Name"], "Create|Save", "Eventhouse|Database", "Ingest|Run query"),
            ("Model training run and candidate registration", "Data Science|Experiments|Models", "New experiment|Create model", ["Name"], "Create|Save", "Experiment|Model", "Run|Train"),
            ("Catalog classification and lineage inspection", "Catalog|OneLake catalog|Governance", "New classification|Classify", ["Name"], "Save|Apply", "Classification|Lineage", "View lineage|Lineage"),
            ("Capacity alert configuration and event review", "Capacity|Monitoring", "New alert|Create alert", ["Name"], "Create|Save", "Alert", "Test|View activity"),
        ],
    },
    {
        "root": "dbt", "key": "dbt", "display": "dbt", "prefix": "DBT", "accent": "amber",
        "modules": [
            module("projects_git", "Projects and Git", "connect a project to the selected Git repository and branch|open a pull request from an isolated development environment|resolve a Git conflict without losing model changes|switch branches while preserving uncommitted work safely|validate repository credentials without displaying the token|restrict project access to assigned groups|compare a development branch with the production manifest|recover a project after a failed repository sync|audit repository and project setting changes|clone a project using its declared adapter and target"),
            module("models", "Models and SQL", "build a model with upstream dependencies in declared order|select a model and its descendants using graph selectors|materialize an incremental model with a stable unique key|preserve configured grants after a full refresh|compile a model with environment-specific variables|handle a compatible nullable column addition|prevent an unselected model from being rebuilt|compare compiled SQL with its source revision|build an ephemeral model through its downstream consumer|record model timing and compiled artifact metadata"),
            module("tests_contracts", "Tests and Contracts", "fail a model build when a required uniqueness test fails|enforce a model contract on column names and data types|validate accepted values with a synthetic edge case|scope a relationship test to permitted parent records|run unit tests against deterministic seed fixtures|report failing rows without exposing restricted columns|block publication after a freshness threshold is exceeded|compare test behavior across supported adapters|skip a dependent test when its required model fails|retain test artifacts for the matching run revision"),
            module("snapshots", "Snapshots and History", "capture a changed source row with a timestamp strategy|close the prior snapshot version after an update|ignore unchanged rows without creating redundant history|handle a deleted source row using the configured invalidation policy|preserve historical values after a schema evolution|replay a snapshot with a stable synthetic source fixture|prevent overlapping snapshot runs from corrupting validity windows|reconcile snapshot history with source change events|respect timezone boundaries in effective timestamps|expose snapshot lineage in generated documentation"),
            module("docs_lineage", "Documentation and Lineage", "generate documentation from model and column descriptions|trace a downstream metric to its raw source tables|hide restricted model details from unauthorized project users|render lineage after an ephemeral model is compiled|update docs after a column rename migration|verify exposures link to the intended production models|publish documentation for a pinned project revision|search catalog terms with deterministic results|export docs metadata without leaking environment secrets|preserve lineage when a model is moved between folders"),
            module("jobs_environments", "Jobs and Environments", "run a scheduled job against the intended deployment environment|promote a successful job artifact to production|cancel a running job without publishing partial artifacts|retry a transient warehouse failure within the job retry limit|ensure environment variables do not cross project boundaries|run deferred state against the correct production manifest|reconcile job results with the source commit revision|apply a schedule across a daylight-saving transition|prevent an unapproved branch from deploying to production|audit job configuration and execution state changes"),
            module("ci", "CI and Pull Request Checks", "run a slim CI build for only changed downstream models|compare a pull request with the correct base manifest|block merge when critical model tests fail|reuse a valid state artifact without stale model selection|avoid exposing CI credentials in logs and artifacts|run independent CI jobs without colliding on schemas|report a removed model as a controlled breaking change|cancel superseded builds for the same pull request|verify CI uses the declared adapter version|publish check results to the matching commit status"),
            module("metrics", "Metrics and Semantic Layer", "define a metric with a stable entity and time grain|query a metric with dimensions supported by its semantic model|reject an ambiguous join path before returning a result|preserve metric values after a compatible model change|restrict metric access using project and warehouse roles|compare metric API results with the compiled SQL result|handle an empty time range without fabricated values|apply metric filters with inclusive date boundaries|record query lineage to the metric definition revision|deprecate a metric without breaking pinned consumers"),
            module("access_audit", "Access and Audit", "deny a project action after the user role is revoked|enforce environment-specific credentials for production jobs|rotate a service token without interrupting an active run|redact secret values from run logs and compiled artifacts|prevent cross-project access to private models|audit an approval with actor and commit information|require approval before production deployment|expire a user session before a protected write|verify least-privilege warehouse grants for a job|export an access review with current project membership"),
            module("adapters_packages", "Adapters and Packages", "install a pinned adapter version into an isolated environment|reject an incompatible adapter before model execution|resolve a package dependency from the approved registry|build a project with a locked package revision|prevent a private package credential from appearing in logs|run the same model contract on two supported adapters|upgrade a package and review its breaking model changes|handle a missing adapter dependency with an actionable error|verify package macros are namespaced and deterministic|reproduce a build from its recorded adapter and package versions"),
        ],
        "journeys": [
            ("Project connection and branch setup", "Projects", "New project|Create project", ["Name", "Repository|Git URL"], "Create|Connect", "Project", "Branches|Develop"),
            ("Model build, test, and compiled SQL review", "Develop|Studio|Models", "New model|Create model", ["Name", "SQL|Definition"], "Save|Create", "Model", "Build|Run"),
            ("Contract enforcement and failing-row inspection", "Models|Contracts", "New model|Create model", ["Name"], "Save|Create", "Model", "Test|Validate"),
            ("Snapshot history capture and review", "Snapshots", "New snapshot|Create snapshot", ["Name", "Model"], "Save|Create", "Snapshot", "Run|Build"),
            ("Documentation generation and lineage navigation", "Docs|Catalog|Lineage", "Generate docs|Build docs", ["Project|Environment"], "Generate|Build", "Documentation|Lineage", "View lineage|Lineage"),
            ("Scheduled job execution and artifact promotion", "Deploy|Jobs|Environments", "New job|Create job", ["Name", "Command|Selector"], "Save|Create", "Job", "Run|Execute"),
            ("Pull request CI gate and check result", "CI|Pull requests", "New check|Create job", ["Name|Command"], "Save|Create", "Check|Job", "Run|Execute"),
            ("Metric definition and semantic query", "Semantic layer|Metrics", "New metric|Create metric", ["Name", "Description"], "Save|Create", "Metric", "Query|Preview"),
            ("Production access review and approval", "Admin|Access|Deploy", "New approval|Request access", ["Name|Reason"], "Submit|Request", "Request|Approval", "Approve|Review"),
            ("Adapter configuration and reproducible build", "Settings|Adapters|Environments", "New environment|Create environment", ["Name", "Adapter"], "Save|Create", "Environment", "Install|Build"),
        ],
    },
    {
        "root": "Confluent", "key": "confluentcloud", "display": "Confluent Cloud", "prefix": "CFLT", "accent": "cyan",
        "modules": [
            module("clusters", "Clusters and Networking", "provision a cluster with the selected cloud region and network type|restrict a cluster to an approved private endpoint|scale a cluster while preserving topic availability|rotate cluster credentials without interrupting authorized clients|prevent deletion while active connectors depend on the cluster|enforce IP allowlists for management and data access|reconcile cluster capacity with workload metrics|restore cluster access after a network policy change|audit cluster configuration and lifecycle operations|verify cross-region cluster linking uses approved identities"),
            module("topics", "Topics and Partitions", "create a topic with the required retention and replication settings|increase partition count without changing existing key ownership|reject a producer record that exceeds configured limits|expire records according to the topic retention policy|preserve message ordering within a partition key|handle a topic configuration change during active consumption|reconcile topic offsets after a consumer restart|restrict topic discovery and reads by role|prevent accidental deletion of a protected topic|audit topic creation and configuration history"),
            module("schemas", "Schema Registry", "register a schema that is backward compatible with the subject|reject an incompatible schema before producer deployment|evolve an optional field while older consumers remain active|apply subject naming rules to related topic schemas|retrieve a schema by immutable version and identifier|prevent unauthorized schema deletion or compatibility changes|validate payload encoding against the registered schema|migrate a subject with a controlled compatibility window|record schema actor and change details for audit|verify schema references resolve across supported formats"),
            module("connectors", "Connectors and Integrations", "deploy a source connector from an approved configuration|deploy a sink connector with correct offset and delivery semantics|restart a failed connector without duplicating committed records|rotate connector credentials without exposing secret values|pause and resume a connector while retaining progress|handle source schema drift using the configured policy|route poison records to an observable dead-letter topic|reconcile connector throughput with source and sink counts|restrict connector creation to approved service identities|audit connector configuration and task state transitions"),
            module("producers_consumers", "Clients and Consumer Groups", "produce keyed events and verify partition assignment|commit offsets only after downstream processing succeeds|rebalance a consumer group without losing committed records|resume from an explicit offset with bounded replay|isolate consumer groups from unrelated topic data|handle duplicate delivery with an idempotent consumer|enforce client quotas under a burst workload|refresh a client identity after secret rotation|reconcile lag metrics with consumed and produced offsets|recover a client after a transient broker disconnect"),
            module("flink_sql", "Flink and Stream Processing", "submit a Flink statement with a validated source and sink|process late events within the configured watermark interval|checkpoint state and resume after a worker failure|cancel a streaming statement without partial duplicate output|apply a stateful window across a daylight-saving boundary|reject a statement with an unauthorized connector reference|reconcile output aggregates with a bounded source replay|scale parallelism while retaining state consistency|record statement status and checkpoint evidence|protect streaming results from malformed event payloads"),
            module("governance", "Stream Governance and Lineage", "trace a field from source topic through a connector to its sink|apply a data contract before an event reaches consumers|block an unauthorized schema or topic change|discover governed topics according to caller permissions|propagate a sensitive field classification to downstream assets|review a data access request with an auditable decision|reconcile lineage edges with connector and Flink definitions|redact protected sample payloads in the catalog|export governance metadata without exposing event values|audit policy changes with before and after state"),
            module("rbac", "RBAC, ACLs, and Audit", "enforce least-privilege role assignments at cluster and topic scope|deny a write after a producer identity is revoked|remove inherited access when a group membership changes|prevent a service account from inheriting human administrator rights|rotate an API key and verify the old key is rejected|redact credentials from client and audit logs|enforce resource ownership during cross-environment access|fail closed when policy evaluation is unavailable|export an access review with current role bindings|reconstruct a protected operation from audit records"),
            module("disaster_recovery", "Replication and Disaster Recovery", "link source and destination clusters with verified topic mappings|replicate offsets consistently during a controlled failover|prevent split-brain writes during a region transition|restore consumer progress from the replicated checkpoint|reconcile record counts after a bounded recovery replay|preserve schema compatibility across linked clusters|revoke an obsolete cluster link without deleting source data|measure recovery time against the declared service target|audit failover approval and completion evidence|resume replication after a transient network partition"),
            module("monitoring", "Monitoring and Cost", "alert when consumer lag crosses its configured duration threshold|correlate connector failures with cluster and topic metrics|reconcile billable usage with cluster runtime and throughput|detect a stalled producer using synthetic health events|preserve monitoring history after a cluster resize|notify the correct owner for a failed streaming workload|verify dashboards respect organization access boundaries|inspect quota rejections with actionable request details|compare estimated usage with a completed billing period|export monitoring evidence for a synthetic incident review"),
        ],
        "journeys": [
            ("Cluster provisioning and scoped access", "Environments|Clusters", "Create cluster|New cluster", ["Name", "Region"], "Create|Provision", "Cluster", "Overview|Settings"),
            ("Topic lifecycle and retention validation", "Topics", "Create topic|New topic", ["Topic name|Name"], "Create|Save", "Topic", "Configuration|Settings"),
            ("Schema registration and compatibility check", "Schemas|Schema Registry", "Register schema|New schema", ["Subject|Name", "Schema"], "Register|Save", "Schema", "Compatibility|Validate"),
            ("Source connector deployment and sync inspection", "Connectors", "Add connector|Create connector", ["Name"], "Create|Launch", "Connector", "Start|Run"),
            ("Producer-consumer flow and offset verification", "Consumer groups|Topics", "Create consumer group|New client", ["Name|Group ID"], "Create|Save", "Consumer group|Client", "Offsets|Messages"),
            ("Flink statement deployment and checkpoint review", "Flink|Stream processing", "New statement|Create statement", ["Name|Statement name", "SQL|Statement"], "Create|Run", "Statement", "Run|Submit"),
            ("Data contract approval and lineage inspection", "Governance|Catalog|Data contracts", "New contract|Create contract", ["Name"], "Create|Save", "Contract", "Lineage|View lineage"),
            ("Service-account role assignment and audit review", "Security|Access|Accounts", "Create service account|New account", ["Name"], "Create|Save", "Account", "Roles|Permissions"),
            ("Cluster link creation and recovery validation", "Cluster links|Disaster recovery", "Create cluster link|New link", ["Name", "Destination"], "Create|Save", "Link", "Replicate|Start"),
            ("Lag alert configuration and notification review", "Metrics|Alerts|Monitoring", "Create alert|New alert", ["Name"], "Create|Save", "Alert", "Test|Preview"),
        ],
    },
    {
        "root": "MongoDBAtlas", "key": "mongodb-atlas", "display": "MongoDB Atlas", "prefix": "MDBA", "accent": "emerald",
        "modules": [
            module("projects_clusters", "Projects and Clusters", "create a project within the intended organization boundary|provision a cluster in the selected region and tier|scale cluster resources while preserving read and write availability|restrict cluster network access to an approved private endpoint|rotate database credentials without interrupting authorized clients|prevent project deletion while protected resources remain|restore cluster configuration from a recorded backup|audit project membership and cluster setting changes|enforce environment-specific cluster naming and tags|verify a cluster cannot be reached from an unapproved network"),
            module("database_collections", "Databases and Collections", "create a collection with the expected validator and collation|insert and read a synthetic document through an authorized role|reject a document that violates the collection validator|preserve BSON types through a read and update cycle|rename a collection while dependent applications remain available|drop an empty disposable collection and retain unrelated data|handle duplicate unique keys with a deterministic error|paginate a large collection without skipping records|apply a TTL index at the configured retention boundary|audit collection and validator changes"),
            module("indexes_search", "Indexes, Search, and Vector", "create a compound index that supports the declared query shape|verify query planning uses the intended index|build an Atlas Search index while reads continue|rebuild a search index after a compatible mapping change|query vector embeddings with the configured similarity metric|filter vector results by tenant metadata before returning documents|reject a vector with a mismatched dimension|compare indexed and unindexed query results for equivalence|restrict index changes to an authorized database role|report index build failure with actionable diagnostics"),
            module("aggregation", "Aggregation and Query", "run a multi-stage aggregation over a synthetic fixture|preserve decimal precision through grouping and arithmetic|handle missing and null fields with the declared pipeline semantics|bound aggregation memory and execution time for high-volume input|parameterize user-controlled filters to prevent operator injection|reconcile aggregation output with a direct source calculation|sort equal keys deterministically with a stable secondary key|page aggregation results using a repeatable continuation strategy|explain query execution without exposing protected values|cancel a long-running query without corrupting collection state"),
            module("change_streams", "Change Streams and Triggers", "resume a change stream from a valid resume token|avoid duplicate side effects after a consumer reconnect|deliver insert update and delete events in expected order|handle an expired resume token with a bounded recovery path|run an Atlas trigger with its least-privilege service identity|retry a failed trigger without duplicating completed writes|preserve full-document lookup behavior for update events|filter change events by namespace and operation type|audit trigger configuration and execution status|recover a trigger after a temporary downstream outage"),
            module("backup_restore", "Backup and Restore", "create a point-in-time restore for a disposable cluster|restore a backup into an isolated target project|verify restored document counts and index definitions|reject a restore request with an unauthorized role|preserve encryption and network settings during restore|measure restore completion against the configured recovery objective|prevent overwrite of an existing target without explicit approval|reconcile backup retention at a configured boundary|audit restore request approval and completion|verify a restored application can read its synthetic fixture"),
            module("security_network", "Security and Networking", "enforce private connectivity for an approved application source|deny authentication after a database user is disabled|rotate a secret while old credentials fail after expiry|restrict access to a database using the assigned role only|redact connection strings from logs and diagnostic exports|enforce TLS for client connections and administrative APIs|verify IP access lists apply to every cluster node|fail closed when identity federation is unavailable|audit network and encryption setting changes|prevent cross-project access by guessing a resource identifier"),
            module("governance_audit", "Governance and Audit", "classify synthetic fields using configured data discovery rules|mask a sensitive field for a restricted application role|export audit events for a bounded time window|reconstruct a document change from audit records|restrict sample data previews to authorized organization members|propagate collection tags to catalog search results|record policy changes with actor and before-after state|prevent an unauthorized user from disabling auditing|retain audit evidence through a project role change|verify data classification never logs synthetic secret values"),
            module("app_services", "App Services and APIs", "authenticate an application request using the configured identity provider|enforce document-level rules for two synthetic tenants|invoke an HTTPS endpoint with validated request parameters|reject an invalid API key without revealing credential state|handle a transient function failure with an idempotent retry|publish an API schema change without breaking compatible clients|verify an application cannot read another tenant namespace|trace an API request through its function and database operation|revoke an application identity before its next protected write|record API errors with correlation identifiers and no secrets"),
            module("monitoring_performance", "Monitoring and Performance", "alert when synthetic connection saturation exceeds threshold|correlate slow queries with their query plan and index state|reconcile cluster metrics with a controlled load interval|detect replication lag during a synthetic write burst|verify autoscaling respects the configured minimum and maximum|preserve performance diagnostics after an incident is resolved|identify a skewed query without returning protected values|compare read latency before and after an index change|notify the service owner for a cluster health event|export a performance snapshot for a bounded synthetic test window"),
        ],
        "journeys": [
            ("Project and cluster provisioning", "Projects|Clusters", "Create project|New project", ["Name"], "Create|Save", "Project", "Create cluster|New cluster"),
            ("Database collection creation and validation", "Data Services|Database|Collections", "Create database|New collection", ["Database name|Name"], "Create|Save", "Database|Collection", "Add collection|Create collection"),
            ("Index build and query-plan verification", "Indexes|Search", "Create index|New index", ["Name|Index name"], "Create|Save", "Index", "Explain|Analyze"),
            ("Aggregation query execution and result reconciliation", "Data Explorer|Collections|Query", "New query|Create query", ["Name|Query name"], "Save|Run", "Query", "Run|Execute"),
            ("Change-stream trigger deployment and retry review", "Triggers|App Services", "Create trigger|New trigger", ["Name"], "Create|Save", "Trigger", "Enable|Run"),
            ("Backup restore request and restored-data verification", "Backup|Restore", "Restore|Create restore", ["Name|Target name"], "Restore|Create", "Restore", "Start|Confirm"),
            ("Network access rule and client connectivity", "Security|Network access", "Add IP address|New private endpoint", ["IP address|Name"], "Save|Add", "Network|Access", "Validate|Test connection"),
            ("Data classification and audit export", "Governance|Data Explorer|Audit", "Classify data|New policy", ["Name"], "Save|Create", "Policy|Classification", "Export audit|View audit"),
            ("Application service authentication and tenant isolation", "App Services|Applications", "Create app|New application", ["Name"], "Create|Save", "Application", "Rules|Permissions"),
            ("Performance alert and query diagnostics", "Monitoring|Alerts", "Create alert|New alert", ["Name"], "Create|Save", "Alert", "Test|Metrics"),
        ],
    },
    {
        "root": "Fivetran", "key": "fivetran", "display": "Fivetran", "prefix": "FVT", "accent": "violet",
        "modules": [
            module("connectors", "Connectors and Sources", "create a source connector using a synthetic read-only identity|validate source connectivity before saving connector settings|sync only the selected schemas and tables|pause and resume a connector without resetting its cursor|handle an expired source token without exposing its value|reconcile source records with the connector's successful sync|detect source schema drift using the configured policy|restrict connector ownership to the assigned team|audit connector configuration and state transitions|delete a disposable connector without changing the source system"),
            module("destinations", "Destinations and Targets", "configure a destination using an isolated test schema|verify destination connectivity using least-privilege grants|route connector outputs to the selected destination namespace|preserve existing destination data when a connector is paused|handle a destination timeout without partial table publication|rotate destination credentials without logging secret values|reconcile destination table counts after a sync|prevent one team's connector from writing to another schema|validate destination region against residency settings|audit destination configuration changes"),
            module("sync_cdc", "Syncs and CDC", "apply an initial snapshot before processing incremental changes|resume CDC from a valid source log position|handle an expired log position with a documented resnapshot|preserve delete events in the destination history|retry a transient sync error without duplicating rows|process out-of-order source updates by source transaction order|reconcile source and destination state after a bounded replay|apply a sync schedule across daylight-saving transitions|stop a sync when a required source table becomes unavailable|retain sync status and cursor evidence for troubleshooting"),
            module("schema_drift", "Schema Drift and Evolution", "add a nullable source column and propagate it safely|rename a source column through a controlled mapping migration|remove a source column without silently corrupting dependent models|handle a changed numeric precision at the destination|quarantine an unsupported source data type with an actionable reason|preserve column history under the configured change policy|notify owners when a schema change requires approval|reconcile destination schemas with source metadata|continue unrelated table syncs after one table schema error|audit schema decisions and connector acknowledgements"),
            module("transformations", "Transformations and dbt", "run a transformation after its source sync succeeds|select only models downstream of a changed source table|fail downstream publication when a required data test fails|promote a tested transformation to production with a pinned revision|prevent parallel jobs from writing to the same target schema|preserve lineage from destination columns to transformation models|retry a transient warehouse failure without repeating side effects|restrict production transformations to an approved branch|reconcile transformed totals with source sync output|record transformation run details with the source sync identifier"),
            module("orchestration", "Orchestration and Scheduling", "run dependent connectors in declared order|trigger a downstream workflow after a successful sync event|deduplicate a repeated orchestration webhook|cancel a queued workflow without starting new sync work|retry only the failed step after an earlier step succeeds|scope workflow variables to the current execution|schedule a workflow across a daylight-saving boundary|record action-level status for a partially failed workflow|prevent a user without ownership from changing a production schedule|notify the configured owner when a workflow exceeds its run window"),
            module("quality", "Data Quality and Alerts", "detect a missing expected source table before downstream use|alert when sync freshness exceeds its configured service objective|compare synthetic row counts with source and destination totals|surface a spike in rejected or malformed records|prevent duplicate alert delivery during an incident retry|route a connector failure to the owning team|verify quality checks use the intended destination schema|retain quality evidence for the completed sync revision|avoid exposing protected sample values in alert payloads|resolve an alert only after the underlying sync recovers"),
            module("access_security", "Access, Secrets, and Audit", "enforce role scope across connectors destinations and teams|deny connector edits after a user role is revoked|rotate a source secret and verify the old credential is rejected|redact secrets from setup errors sync logs and exports|prevent access to another tenant's connector by guessed identifier|audit role grants and connector ownership changes|require approval for production destination changes|fail closed when an identity provider is unavailable|export an access review with current team memberships|use a service identity with only required source and destination grants"),
            module("history_recovery", "History and Recovery", "inspect sync history for a bounded time interval|replay a failed sync from a stable source checkpoint|recover a connector after a transient source outage|verify a replay does not overwrite newer destination rows|restore connector configuration from an approved revision|compare pre-recovery and post-recovery row counts|retain a failure reason after a successful retry|prevent a resync from exceeding the declared volume guardrail|audit a manual resync request and its approver|resume scheduled processing after a maintenance window"),
            module("usage_billing", "Usage and Billing", "reconcile monthly usage with connector active time and volume|attribute destination activity to the correct workspace|alert before a synthetic usage threshold is exceeded|verify paused connectors stop accruing new active sync work|export a usage report without exposing credential metadata|compare estimated usage with a completed billing window|restrict billing administration to approved roles|retain usage history after a connector is archived|detect abnormal growth in a synthetic high-volume source|audit billing setting changes and report exports"),
        ],
        "journeys": [
            ("Source connector setup and connectivity test", "Connectors|Sources", "Add connector|New connector", ["Name", "Host|Server"], "Save|Continue", "Connector", "Test connection|Validate"),
            ("Destination setup and schema isolation", "Destinations", "Add destination|New destination", ["Name"], "Save|Create", "Destination", "Test connection|Validate"),
            ("Initial sync and CDC progress verification", "Connectors|Syncs", "Create connector|New connector", ["Name"], "Save|Create", "Connector", "Sync now|Run sync"),
            ("Schema change approval and downstream reconciliation", "Connectors|Schema changes", "Review changes|New connector", ["Name"], "Save|Approve", "Schema|Change", "Apply|Approve"),
            ("Transformation run and data test gate", "Transformations|dbt", "New transformation|Create job", ["Name", "Command|Selector"], "Save|Create", "Transformation|Job", "Run|Execute"),
            ("Orchestration workflow and retry inspection", "Orchestration|Workflows", "New workflow|Create workflow", ["Name"], "Create|Save", "Workflow", "Run|Execute"),
            ("Freshness alert configuration and recovery", "Alerts|Monitoring", "New alert|Create alert", ["Name"], "Create|Save", "Alert", "Test|Preview"),
            ("Team access assignment and secret rotation", "Settings|Users|Access", "Invite user|Create role", ["Email|Name"], "Invite|Create", "User|Role", "Permissions|Roles"),
            ("Failure replay and checkpoint reconciliation", "History|Connectors|Syncs", "Resync|Replay", ["Connector|Name"], "Run|Confirm", "Sync|Run", "Retry|Replay"),
            ("Usage report generation and billing review", "Usage|Billing", "Export report|New report", ["Name|Date range"], "Export|Generate", "Report|Usage", "Download|Export"),
        ],
    },
    {
        "root": "SupabasePlatform", "key": "supabase-platform", "display": "Supabase", "prefix": "SUPA", "accent": "emerald",
        "modules": [
            module("projects_database", "Projects and Postgres", "create a project in the selected region and isolated organization|apply a versioned migration to a disposable database|rollback a failed migration without losing prior committed data|preserve constraints and indexes after a compatible schema update|connect using a least-privilege database role|verify project pause and resume preserve database state|restore a backup into an isolated test project|reconcile table rows after an idempotent migration rerun|rotate database credentials and reject the prior password|audit project settings and database role changes"),
            module("auth_rls", "Auth and Row-Level Security", "sign up a synthetic user with the configured identity provider|verify email confirmation and session activation flow|enforce row-level policies between two synthetic tenants|deny writes when required claims are missing|refresh an expired session without exposing access tokens|revoke a user session before its next protected database request|prevent anonymous access to a private table|apply a role change to an active session according to policy|audit auth configuration and policy changes|validate redirect URLs against the allowed list"),
            module("realtime", "Realtime and Broadcast", "subscribe to authorized row changes for a synthetic tenant|exclude rows hidden by database RLS from realtime events|handle reconnect without delivering duplicate events|broadcast a message to the intended private channel only|expire channel authorization after session revocation|preserve event order within a single logical stream|recover a subscriber after a brief network outage|bound payload sizes and reject oversized events|record channel lifecycle and authorization failures|verify realtime changes correspond to committed database transactions"),
            module("storage", "Storage and Buckets", "create a private bucket with the configured upload policy|upload a synthetic object with a stable test key|deny cross-tenant object reads using storage policies|generate a signed URL with a bounded expiration|reject a file exceeding the configured size limit|replace an object without exposing a partial upload|delete an object while preserving unrelated bucket contents|verify content type and cache metadata after upload|recover a multipart upload after a transient interruption|audit bucket policy and object access changes"),
            module("edge_functions", "Edge Functions", "deploy a function with an explicit runtime and environment|invoke a function with a valid JWT and scoped claims|reject invalid request payloads with a stable error contract|redact secret values from function logs and exception traces|retry a transient downstream failure idempotently|enforce a bounded execution duration for a slow dependency|rotate a function secret without publishing its value|restrict function invocation by authorization policy|trace a function request to its downstream database writes|roll back to a prior function deployment after a failed release"),
            module("migrations_branching", "Migrations and Branching", "create a database branch from a pinned project snapshot|apply a migration to a preview branch without changing production|promote a tested branch using a reviewed migration plan|detect conflicting migrations created from the same base revision|discard an expired preview branch and release its resources|reconcile branch schema with the committed migration history|prevent a production secret from appearing in preview configuration|restore a branch after a failed schema migration|audit branch creation promotion and deletion|verify branch data is isolated from other test tenants"),
            module("api_keys_access", "API Keys and Access", "create a scoped API key for a synthetic test client|reject a revoked API key on the next protected request|rotate a service role key without logging its value|restrict organization membership to assigned projects|enforce least privilege for database and storage roles|prevent browser clients from receiving service-role credentials|audit access grants and key lifecycle operations|fail closed when an identity provider is unavailable|verify key labels identify the intended environment|export access review data without exposing key material"),
            module("backup_recovery", "Backups and Recovery", "create a point-in-time restore in an isolated project|verify restored schema constraints and synthetic row counts|recover from an accidental migration using a prior snapshot|measure restore duration against the configured objective|deny restore operations to an unapproved project role|preserve encryption and region settings through recovery|prevent restore overwrite without explicit confirmation|reconcile application reads after a restored database is promoted|audit restore request approval and completion|retain the original project while recovery validation runs"),
            module("observability", "Logs and Observability", "correlate an API request across gateway database and function logs|filter logs by a stable synthetic request identifier|redact access tokens and personal data from log output|alert when database connections exceed a configured threshold|inspect slow queries without exposing row values|verify log retention at the configured time boundary|preserve relevant diagnostics after a function retry|restrict log access to authorized project members|export a bounded incident bundle with correlation identifiers|reconcile database metrics with a synthetic workload interval"),
            module("integrations", "Integrations and Deployment", "connect a project to a Git repository with a scoped identity|deploy a migration after a successful continuous integration check|block deployment when required database tests fail|apply environment-specific secrets to the matching deployment|verify webhook signatures before processing deployment events|retry a failed integration webhook without duplicating a migration|promote a preview branch only after approval|audit integration and deployment configuration changes|reconcile deployed function revision with its source commit|revoke repository access without interrupting existing project data"),
        ],
        "journeys": [
            ("Project creation and database provisioning", "Projects", "New project|Create project", ["Name", "Database password"], "Create|Provision", "Project", "Database|Table editor"),
            ("Schema migration and table policy validation", "Database|SQL editor|Table editor", "New table|Create table|New query", ["Name|Query name"], "Create|Save|Run", "Table|Query", "Run|Execute"),
            ("Auth signup and row-level isolation", "Authentication|Users", "Add user|Invite user", ["Email"], "Create|Invite", "User", "Policies|Configure"),
            ("Realtime subscription and authorization", "Realtime", "Create channel|New channel", ["Name|Channel"], "Create|Save", "Channel", "Subscribe|Test"),
            ("Private bucket upload and signed URL access", "Storage|Buckets", "New bucket|Create bucket", ["Name"], "Create|Save", "Bucket", "Upload|Add file"),
            ("Edge function deployment and request verification", "Edge Functions|Functions", "Deploy function|New function", ["Name"], "Deploy|Create", "Function", "Invoke|Test"),
            ("Preview branch migration and promotion", "Branches|Database", "Create branch|New branch", ["Name"], "Create|Save", "Branch", "Migrations|Deploy"),
            ("API key lifecycle and least-privilege review", "Settings|API|Access", "Create key|New key", ["Name"], "Create|Save", "Key", "Permissions|Rotate"),
            ("Backup restore and synthetic data reconciliation", "Database|Backups", "Restore|Create restore", ["Name|Target project"], "Restore|Create", "Restore", "Start|Confirm"),
            ("Log correlation and incident export", "Logs|Observability", "Create alert|Export logs", ["Name|Query"], "Create|Export", "Alert|Logs", "Run|Preview"),
        ],
    },
    {
        "root": "Vercel", "key": "vercel", "display": "Vercel", "prefix": "VERC", "accent": "indigo",
        "modules": [
            module("projects_git", "Projects and Git", "import a project from an approved Git repository|map the selected production branch to its environment|disconnect repository access after identity revocation|rebuild a project from a pinned commit revision|prevent one team's project settings from affecting another team|audit Git integration and project ownership changes|recover a project after a failed repository sync|validate framework and build settings before deployment|limit project access to the assigned team|verify repository secrets do not appear in build logs"),
            module("deployments", "Deployments and Promotion", "create a preview deployment for a synthetic pull request|promote a verified preview revision to production|cancel a deployment before it receives production traffic|roll back a failed production release to the prior deployment|verify deployment source commit and build artifact match|prevent an unapproved branch from receiving a production alias|retry a transient build failure without duplicate aliases|compare environment configuration between preview and production|retain deployment logs and lifecycle events|audit production promotion approval and completion"),
            module("environment_secrets", "Environment Variables and Secrets", "scope an environment variable to preview only|rotate a production secret without displaying its value|ensure a build receives only variables for its target environment|reject a secret name that conflicts with a reserved system variable|verify secret changes create the expected deployment behavior|prevent secret values from appearing in logs or source maps|restrict secret editing to authorized project roles|remove an obsolete variable without changing preview configuration|audit secret create update and delete events|fail a deployment clearly when a required variable is missing"),
            module("domains", "Domains and Routing", "assign a verified domain to the intended production project|route a preview alias to its matching deployment|reject an unverified domain ownership claim|preserve TLS after a domain is moved between projects|apply redirects in the declared priority order|prevent a catch-all rewrite from shadowing protected routes|revoke an obsolete domain alias without deleting the project|verify DNS status before promoting a production domain|audit domain and routing rule changes|test locale and path routing at URL boundary conditions"),
            module("functions_crons", "Functions and Cron", "invoke a serverless function with a valid request contract|enforce function duration and memory limits for a synthetic workload|retry an idempotent function after a transient provider error|schedule a cron invocation at the configured timezone boundary|prevent duplicate cron side effects after a delayed retry|redact secrets from function logs and thrown errors|roll back a function runtime after a failed deployment|restrict function secrets to the owning project|correlate a function invocation with its deployment revision|cancel a long-running function within its configured timeout"),
            module("cache_isr", "Caching and Incremental Rendering", "invalidate a cache tag after a successful content update|serve a fresh page after a revalidation interval elapses|prevent user-specific content from entering a shared cache|verify stale-while-revalidate behavior during an origin delay|preserve cache correctness across a deployment promotion|bound cache duration to the configured maximum age|avoid duplicate regeneration for concurrent requests|revalidate a route using its declared webhook secret|compare cached and uncached synthetic page content|inspect cache status and regeneration timing in deployment logs"),
            module("ai_gateway", "AI SDK and AI Gateway", "route a synthetic model request through the configured gateway|select a fallback model after a simulated provider failure|stream a response while preserving incremental output order|enforce a request token budget before forwarding the prompt|redact API keys from request logs and usage metadata|attribute model usage and latency to the correct project|retry a rate-limited provider within the declared budget|switch model providers while preserving response contract|fail closed when a production model policy denies a request|verify gateway usage reporting matches synthetic request counts"),
            module("observability", "Observability and Logs", "correlate a failed request with its deployment and function logs|filter request traces by a unique synthetic correlation identifier|alert on a regression in response latency|preserve error diagnostics after a deployment rollback|restrict log access to authorized project members|redact cookies tokens and secret values from request traces|compare preview and production error rates for the same revision|export a bounded incident report with deployment metadata|identify a failed build from its source commit|verify runtime metrics reflect a controlled synthetic request burst"),
            module("security_firewall", "Security and Firewall", "block a synthetic request matching a configured firewall rule|allow a verified health check through the protected route|enforce rate limits by configured client identity|prevent a preview deployment from bypassing authentication|restrict deployment access by team and environment|verify security headers are present after production promotion|deny an untrusted origin from invoking a protected endpoint|audit firewall rule changes and matched request evidence|fail closed when bot or policy evaluation is unavailable|confirm secret data is not returned by an error page"),
            module("teams_billing", "Teams and Usage", "invite a synthetic team member with the least-privilege role|remove a user and revoke project access immediately|transfer project ownership without changing deployment history|attribute usage to the correct project and team|alert before a synthetic spend threshold is exceeded|restrict billing settings to the designated administrators|export usage data for a bounded billing period|reconcile function and AI gateway usage with project totals|audit team and billing role changes|prevent a suspended team member from creating a deployment"),
        ],
        "journeys": [
            ("Git project import and preview deployment", "Projects", "Add new|Import project|New project", ["Repository|Git URL"], "Import|Create", "Project", "Deploy|Create deployment"),
            ("Preview build validation and production promotion", "Deployments", "New deployment|Deploy", ["Branch|Commit"], "Deploy|Create", "Deployment", "Promote|Assign to production"),
            ("Environment variable scoping and redeploy", "Settings|Environment variables", "Add|New variable", ["Name", "Value"], "Save|Add", "Variable", "Redeploy|Deploy"),
            ("Domain verification and routing validation", "Domains", "Add domain|New domain", ["Domain"], "Add|Save", "Domain", "Verify|Configure"),
            ("Function deployment and cron invocation", "Functions|Cron jobs", "Create function|New function", ["Name"], "Create|Deploy", "Function", "Run|Test"),
            ("Cache revalidation and rendered page verification", "Caching|Deployments", "Create revalidation|New rule", ["Name|Path"], "Save|Create", "Cache|Rule", "Revalidate|Test"),
            ("AI Gateway provider routing and usage inspection", "AI Gateway|AI", "New route|Create gateway", ["Name"], "Create|Save", "Gateway|Route", "Test|Run request"),
            ("Incident trace review and diagnostic export", "Observability|Logs", "Create alert|New alert", ["Name"], "Create|Save", "Alert", "View logs|Export"),
            ("Firewall rule deployment and request verification", "Security|Firewall", "Add rule|New rule", ["Name"], "Create|Save", "Rule", "Test|Deploy"),
            ("Team role assignment and usage review", "Team|Settings|Usage", "Invite member|Add member", ["Email"], "Invite|Add", "Member", "Usage|Billing"),
        ],
    },
    {
        "root": "LangSmith", "key": "langsmith", "display": "LangChain and LangSmith", "prefix": "LANG", "accent": "violet",
        "modules": [
            module("projects_traces", "Projects and Traces", "create an isolated project for a synthetic application environment|record a trace with a stable run and parent identifier|reconstruct a nested tool call from a persisted trace|filter traces by project model and bounded time range|prevent users from another organization viewing private traces|retain trace ordering when child runs complete out of order|redact prompt content marked as sensitive before persistence|export a trace with its run metadata and source revision|compare trace counts with the synthetic request fixture|audit project settings and access changes"),
            module("prompts", "Prompt Management", "publish a prompt with a pinned version and owner|compare prompt revisions using a deterministic evaluation fixture|roll back a prompt alias to a prior approved version|resolve a prompt by immutable identifier after alias movement|restrict prompt publishing to authorized project roles|validate prompt input variables before model invocation|prevent untrusted retrieved text from overriding system instructions|record prompt lineage in each downstream run|export a prompt revision without exposing environment secrets|audit prompt approval and publication events"),
            module("datasets", "Datasets and Examples", "create a dataset with a declared input and output schema|ingest synthetic examples using stable example identifiers|deduplicate a repeated example import idempotently|preserve dataset revisions after an example correction|filter evaluation examples by metadata and split|restrict dataset samples to users with project access|export a dataset without hidden or restricted fields|compare dataset counts before and after a bounded update|validate examples with missing and nullable fields|record source lineage for imported examples"),
            module("evaluations", "Evaluations and Experiments", "run an evaluator against a pinned model and dataset revision|compare candidate and baseline results using a fixed seed|fail a quality gate when a metric misses its threshold|retain per-example evaluator output for failed cases|cancel a running experiment without publishing a partial result|retry a transient evaluator error without duplicate examples|compare prompt revisions over the same evaluation dataset|restrict evaluation artifacts to their project members|record model and evaluator version in experiment metadata|reproduce a completed experiment from its saved configuration"),
            module("agents_graphs", "Agents and Graphs", "execute a graph from its declared entry node to a terminal state|preserve typed state across conditional graph branches|resume an interrupted graph from its saved checkpoint|prevent two concurrent threads from sharing mutable agent state|route a tool call only through the approved tool registry|enforce an execution and token budget across graph nodes|handle a missing tool response with a bounded recovery path|record node input output and transition evidence|validate graph state schema before each protected action|stop an agent before an unapproved high-impact tool call"),
            module("tools_approvals", "Tools and Human Approval", "invoke an allowlisted tool with validated structured arguments|pause a graph at a configured human approval boundary|resume only after an authorized reviewer records a decision|deny a tool action when approval expires before execution|retry an idempotent tool after a transient dependency failure|prevent duplicate side effects after graph replay|redact credentials from tool arguments and execution traces|audit reviewer identity decision and tool result|isolate tools by project and environment policy|fail closed when the approval service is unavailable"),
            module("threads_streaming", "Threads and Streaming", "create a thread with isolated conversation state|resume a thread from a persistent checkpoint after reconnect|stream incremental model and tool events in their expected order|stop a stream after the client cancels the request|enforce thread ownership across two synthetic users|expire stale thread state according to retention settings|avoid duplicate messages after a client retry|preserve trace linkage between parent thread and child run|bound concurrent streams for a single synthetic account|audit thread lifecycle and retention actions"),
            module("models_routing", "Models and Routing", "route a request to the selected model provider and version|switch to an approved fallback after provider timeout|preserve response schema across two compatible providers|enforce per-model token and cost budgets|retry rate-limited requests within the configured backoff|prevent restricted model access for an unapproved environment|record provider latency and token usage per run|redact provider keys from errors and traces|fail fast when a model is unavailable rather than hanging|compare model outputs using a fixed synthetic evaluation set"),
            module("security_access", "Security and Access", "enforce organization and project boundaries for trace queries|revoke a user role and block the next protected write|rotate an API key and reject the expired credential|redact configured sensitive fields from prompts and traces|restrict dataset export to authorized reviewers|audit role assignments and API key lifecycle events|prevent an untrusted tool from accessing undeclared network resources|expire a session before a high-impact action|fail closed when authorization policy evaluation fails|verify public share links cannot expose private project traces"),
            module("deployment_monitoring", "Deployment and Monitoring", "deploy a graph revision to an isolated environment|promote a tested revision after an approval gate|roll back a failed deployment to the prior graph version|monitor run latency and failure rate for a bounded interval|alert on repeated tool failures without duplicating notifications|correlate a production run with its deployment commit|verify deployment secrets remain environment-scoped|retain run diagnostics after a successful retry|compare evaluation results before and after promotion|export an incident trace bundle with sensitive values redacted"),
        ],
        "journeys": [
            ("Project setup and first trace inspection", "Projects", "New project|Create project", ["Name"], "Create|Save", "Project", "Traces|Runs"),
            ("Prompt revision publish and rollback", "Prompts", "Create prompt|New prompt", ["Name|Prompt name"], "Create|Save", "Prompt", "Publish|Version"),
            ("Dataset import and schema validation", "Datasets", "Create dataset|New dataset", ["Name"], "Create|Save", "Dataset", "Examples|Add examples"),
            ("Evaluation run and quality gate review", "Evaluations|Experiments", "New evaluation|Run evaluation", ["Name|Dataset"], "Create|Run", "Evaluation|Experiment", "Run|Start"),
            ("Agent graph deployment and checkpoint resume", "Deployments|Agents|Playground", "New deployment|Create graph", ["Name"], "Create|Save", "Deployment|Graph", "Test|Run"),
            ("Tool allowlist and human approval workflow", "Settings|Tools|Approvals", "Add tool|New approval", ["Name"], "Create|Save", "Tool|Approval", "Approve|Review"),
            ("Thread creation, stream review, and resume", "Threads|Runs", "New thread|Create thread", ["Name"], "Create|Save", "Thread", "Resume|Continue"),
            ("Model route setup and provider fallback review", "Models|Settings", "Add model|New route", ["Name|Model"], "Save|Create", "Model|Route", "Test|Run"),
            ("Role revocation and private trace boundary", "Settings|Members|Access", "Invite member|Add member", ["Email"], "Invite|Add", "Member|Role", "Permissions|Roles"),
            ("Deployment health alert and incident trace export", "Monitoring|Alerts", "Create alert|New alert", ["Name"], "Create|Save", "Alert", "Test|Export"),
        ],
    },
    {
        "root": "Pinecone", "key": "pinecone", "display": "Pinecone", "prefix": "PINE", "accent": "teal",
        "modules": [
            module("projects_indexes", "Projects and Indexes", "create a project with organization-scoped membership|create a serverless index with the intended dimension and metric|provision a pod index with an approved region and capacity|reject an index configuration with an unsupported dimension|scale replicas while preserving query availability|prevent index deletion while protected workloads are active|audit index configuration and project membership changes|verify a test identity cannot inspect another project index|restore service after a transient index provisioning failure|compare deployed index settings with the approved configuration"),
            module("vectors_upsert", "Vector Upsert and Namespaces", "upsert vectors with unique identifiers into an isolated namespace|repeat an upsert with the same IDs and verify idempotent replacement|reject vectors with a dimension that differs from the index|preserve metadata values across an upsert and fetch cycle|upsert a bounded batch and report partial failures accurately|isolate tenant vectors in separate namespaces|delete selected vector IDs without affecting adjacent records|handle empty metadata and nullable fields consistently|retry a transient batch timeout without duplicating vector IDs|reconcile namespace counts with the synthetic input fixture"),
            module("query_filter", "Similarity Search and Filters", "query top-k neighbors using the configured similarity metric|apply metadata filters before returning tenant-visible matches|return deterministic scores for a fixed synthetic vector fixture|handle no-match filters with an empty result set|bound top-k values to the documented service limits|paginate through matches without skipping tied scores|verify query results exclude deleted vector IDs|preserve score ordering after an index refresh|reject malformed filter expressions with a clear validation error|compare dense and sparse results against expected synthetic neighbors"),
            module("hybrid_rerank", "Hybrid Search and Reranking", "combine dense and sparse signals with the configured weights|validate sparse indices and values before querying|rerank candidate results without dropping authorized matches|preserve deterministic tie-breaking across repeated rerank calls|apply tenant filters before reranking candidates|handle an empty sparse vector with the documented fallback|compare hybrid output with a fixed relevance fixture|enforce the configured candidate count and top-k bound|report a reranker outage without losing the original candidate set|audit reranking configuration and model revision"),
            module("metadata_tenants", "Metadata and Tenancy", "filter by nested metadata using the supported operators|update metadata without replacing the stored vector values|prevent one tenant from retrieving another tenant's namespace|reject unsupported metadata value types at ingestion|handle metadata schema evolution with old and new vectors|delete a metadata field using the explicit update contract|verify Unicode metadata values round-trip correctly|enforce tenant scoping for fetch query and delete operations|reconcile filtered results with the permitted synthetic ID set|audit changes to namespace and tenancy policy"),
            module("ingestion", "Ingestion and Integrations", "ingest chunked documents with stable source and chunk identifiers|resume a failed ingestion from its last completed checkpoint|deduplicate replayed chunks after a worker restart|route malformed documents to a rejected-record report|preserve source URI and content version in vector metadata|apply a bounded embedding batch size under high-volume input|retry embedding provider errors without duplicating writes|delete stale chunks when the source document revision changes|reconcile ingested chunk counts with the source manifest|restrict ingestion credentials to the target index and namespace"),
            module("backup_restore", "Backup and Restore", "create a collection from a stable synthetic index snapshot|restore a collection into an isolated target namespace|verify restored vector counts and metadata after recovery|reject restore operations without the required project role|prevent overwriting a populated target collection without approval|reconcile query results before and after a restore|recover a failed restore from its last verified checkpoint|retain the source collection while restore validation runs|audit collection create restore and delete operations|measure restore completion against a declared recovery target"),
            module("security_access", "Security and Access", "enforce organization and project role boundaries for index operations|revoke an API key and block its next request|rotate a service credential without exposing it in diagnostic output|restrict namespaces to the intended application identity|prevent cross-project index access by guessed identifiers|redact sensitive metadata from query traces|fail closed when policy evaluation is unavailable|audit key creation rotation and revocation|limit a credential to read-only query operations|verify private endpoint rules block unapproved sources"),
            module("scaling_resilience", "Scaling and Resilience", "maintain query correctness during replica scaling|recover index availability after a simulated transient failure|bound request retries to avoid a retry storm|preserve acknowledged upserts after a worker restart|handle a burst workload without dropping successful writes|verify timeout behavior for a slow synthetic query|reconcile record counts after recovery and replay|fail a request clearly when a namespace is unavailable|maintain latency within the declared synthetic load threshold|record request identifiers for resilience diagnostics"),
            module("usage_monitoring", "Usage and Monitoring", "reconcile read and write units with a synthetic request window|alert when index storage approaches a configured limit|attribute usage to the correct project and namespace|correlate a slow query with its filter and index metrics|preserve usage history after index configuration changes|restrict monitoring dashboards to authorized members|export a bounded usage report without vector values|compare estimated capacity with observed synthetic load|notify the index owner when an integration is stalled|audit monitoring alert and threshold changes"),
        ],
        "journeys": [
            ("Project and index provisioning", "Projects|Indexes", "Create project|New project", ["Name"], "Create|Save", "Project", "Create index|New index"),
            ("Namespace creation and vector upsert", "Indexes|Namespaces", "Create namespace|New namespace", ["Name"], "Create|Save", "Namespace", "Upsert|Import vectors"),
            ("Filtered similarity query and result inspection", "Indexes|Search|Query", "New query|Query vectors", ["Name|Query name"], "Save|Run", "Query", "Search|Run query"),
            ("Hybrid search configuration and reranking", "Search|Indexes", "New search|Create configuration", ["Name"], "Create|Save", "Search|Configuration", "Test|Preview"),
            ("Metadata policy and tenant isolation review", "Namespaces|Security|Metadata", "New policy|Create namespace", ["Name"], "Create|Save", "Policy|Namespace", "Permissions|Test"),
            ("Document ingestion and checkpoint recovery", "Integrations|Ingestion", "New integration|Import data", ["Name|Source"], "Create|Import", "Integration|Import", "Run|Start"),
            ("Snapshot restore and vector reconciliation", "Backups|Collections", "Create collection|Restore", ["Name"], "Create|Restore", "Collection|Restore", "Start|Confirm"),
            ("API credential rotation and access check", "Settings|API keys|Access", "Create API key|New key", ["Name"], "Create|Save", "Key", "Rotate|Permissions"),
            ("Replica scaling and resilience observation", "Indexes|Scaling", "Edit index|Scale", ["Replicas|Capacity"], "Save|Apply", "Index", "Scale|Update"),
            ("Usage alert configuration and report export", "Usage|Monitoring|Alerts", "Create alert|New alert", ["Name"], "Create|Save", "Alert", "Export|Test"),
        ],
    },
    {
        "root": "HuggingFaceHub", "key": "huggingfacehub", "display": "Hugging Face Hub", "prefix": "HFH", "accent": "amber",
        "modules": [
            module("repositories_commits", "Repositories and Commits", "create a model repository under the intended organization|create a dataset repository with an explicit visibility setting|upload a small synthetic artifact using a versioned commit|update repository metadata without rewriting file history|resolve a concurrent commit conflict without losing unrelated files|reject a commit from a revoked organization member|verify large-file upload resumes after a transient interruption|compare repository state with the expected commit tree|audit repository visibility and membership changes|delete a disposable repository while retaining unrelated assets"),
            module("models_cards", "Models and Model Cards", "publish a model card with required task and license metadata|validate model repository files against the declared architecture|update a model revision while preserving immutable prior commits|prevent a private model from appearing in public search results|gate model access and record an approved synthetic request|scan an uploaded model artifact using the configured security policy|resolve a model by immutable commit revision|verify model card links resolve to authorized assets|reject malformed metadata with actionable validation details|audit model card changes and gated access decisions"),
            module("datasets", "Datasets and Revisions", "publish a dataset with valid features and split metadata|load a bounded synthetic dataset revision by immutable commit|validate dataset rows against the declared feature schema|update dataset data without changing a pinned consumer revision|restrict a private dataset to approved organization members|handle a malformed data shard without corrupting other splits|reconcile row counts across train validation and test splits|verify dataset preview masks configured sensitive values|compare dataset revisions after a controlled correction|audit dataset visibility and license metadata changes"),
            module("spaces", "Spaces and Applications", "create a Space with the selected SDK and hardware tier|deploy an application revision from a pinned repository commit|restart a sleeping Space and verify its health endpoint|configure a Space secret without exposing it in build output|restrict a private Space to approved organization members|roll back a failed Space build to the prior working revision|verify hardware changes respect organization quota limits|reconcile Space runtime status with deployment logs|stop a disposable Space and release its assigned hardware|audit Space configuration and secret access changes"),
            module("inference_endpoints", "Inference Endpoints", "create an endpoint for an approved model revision|deploy an endpoint in the configured cloud region and instance type|invoke a synthetic request and validate the response schema|scale endpoint replicas under a controlled request burst|roll back to the previous model revision after a health failure|rotate inference credentials and reject the old token|enforce request authorization for private model assets|bound request duration and return a stable timeout error|verify autoscaling respects configured minimum and maximum capacity|audit endpoint deployment and scaling decisions"),
            module("gated_licenses", "Gated Models and Licenses", "request access to a gated model with required synthetic details|approve or reject a request using an authorized reviewer role|enforce license acceptance before artifact download|revoke a user's access and block the next gated download|prevent a public token from accessing private gated assets|retain approval history after the model card is updated|verify license metadata is visible before user acceptance|audit reviewer identity and gate decision timestamp|expire a stale request according to the configured policy|export access decisions without exposing applicant secrets"),
            module("organizations_tokens", "Organizations and Tokens", "invite a synthetic member with the intended organization role|remove a member and revoke repository access immediately|create a fine-grained token scoped to one test repository|reject a revoked or expired token on protected requests|rotate a service token without logging its value|prevent a member from escalating their own organization role|audit organization membership and token lifecycle changes|verify private asset access across two test organizations|restrict billing and settings administration to designated roles|export an access review with current member and role state"),
            module("inference_providers", "Inference Providers and Routing", "route a synthetic inference request to the selected provider|switch to an approved fallback after provider unavailability|preserve response schema across compatible provider choices|enforce provider-specific request limits and retry budgets|attribute request usage and latency to the correct model|redact provider credentials from errors and diagnostic logs|restrict provider access for a disallowed model license|handle an unsupported task with a stable validation error|compare provider response behavior using a fixed synthetic fixture|audit provider routing and configuration changes"),
            module("collections_eval", "Collections and Evaluation", "create a collection containing approved model and dataset revisions|pin collection entries to immutable commits|run an evaluation with a deterministic dataset revision|compare model scores against a declared acceptance threshold|retain per-example results for failed synthetic evaluations|restrict collection edits to authorized organization members|update a collection without changing existing pinned references|export evaluation metadata without private artifact contents|reproduce a completed evaluation from its recorded configuration|audit collection membership and evaluation run changes"),
            module("security_supply_chain", "Security and Supply Chain", "scan a repository artifact before making a revision available|block a malicious synthetic file from a public release|verify signed commit metadata for an approved organization repository|detect a secret in a synthetic repository commit and prevent exposure|enforce private repository visibility during search and download|revoke a compromised token and deny the next request|audit model and dataset access to protected assets|verify package and model provenance for a pinned revision|restrict Space build secrets to the authorized runtime|export a security review with artifact and commit identifiers"),
        ],
        "journeys": [
            ("Organization setup and repository creation", "Organizations|Repositories", "New model|Create repository", ["Repository name|Name"], "Create|Save", "Repository", "Settings|Files"),
            ("Model card publication and immutable revision review", "Models|Repositories", "New model|Create repository", ["Model name|Name"], "Create|Save", "Model", "Edit model card|Settings"),
            ("Dataset upload and split validation", "Datasets", "New dataset|Create repository", ["Dataset name|Name"], "Create|Save", "Dataset", "Upload files|Add files"),
            ("Space deployment and secret scoping", "Spaces", "Create new Space|New Space", ["Space name|Name"], "Create|Save", "Space", "Settings|Variables and secrets"),
            ("Inference endpoint deployment and health check", "Inference Endpoints|Endpoints", "Create endpoint|New endpoint", ["Name|Endpoint name"], "Create|Deploy", "Endpoint", "Test|Invoke"),
            ("Gated model request and license acceptance", "Models|Access requests", "Request access|New request", ["Reason|Name"], "Submit|Request", "Request", "Approve|Review"),
            ("Organization role assignment and token rotation", "Settings|Members|Access tokens", "Invite member|New token", ["Username|Name"], "Invite|Create", "Member|Token", "Roles|Permissions"),
            ("Provider routing and fallback verification", "Inference Providers|Settings", "Add provider|New route", ["Name|Model"], "Save|Create", "Provider|Route", "Test|Run"),
            ("Collection evaluation and acceptance review", "Collections|Evaluation", "New collection|Create evaluation", ["Name"], "Create|Save", "Collection|Evaluation", "Run|Evaluate"),
            ("Artifact security scan and repository audit", "Settings|Security|Repositories", "Create scan|New policy", ["Name"], "Create|Save", "Scan|Policy", "Run|Audit"),
        ],
    },
]


def rows_for(pack: dict, slug: str, label: str, tasks: list[str]) -> list[dict[str, str]]:
    rows = []
    for index in range(200):
        task = tasks[index % len(tasks)]
        variant, fixture = VARIANTS[(index // len(tasks)) % len(VARIANTS)]
        number = index + 1
        kind = "Security" if any(word in slug for word in ("security", "access", "governance", "rbac", "gated")) or variant == "least privilege" else (
            "Resilience" if variant in {"worker restart", "transient retry", "dependency outage", "partial cleanup failure"} else "Functional"
        )
        priority = "Critical" if kind == "Security" else "High" if index % 4 else "Medium"
        scenario = f"{label}: {task} ({variant})"
        rows.append({
            "product": pack["display"],
            "module": label,
            "test_case_id": f"{pack['prefix']}-{slug.upper()[:8]}-{number:05d}",
            "test_scenario": scenario,
            "test_case_name": f"{pack['display']}: {task} with {variant}",
            "test_type": kind,
            "priority": priority,
            "preconditions": f"Non-production tenant or isolated local fixture; synthetic records only; {fixture}",
            "test_steps": (
                f"1. Create a disposable, versioned synthetic fixture: {fixture} "
                f"2. Execute the platform workflow to {task}. "
                "3. Capture the committed result, resource version, or run status. "
                "4. Compare the result with the source fixture and the declared invariant. "
                "5. Repeat or recover the operation when applicable; verify access, audit evidence, and side effects."
            ),
            "expected_result": (
                f"The platform must correctly {task}; the {variant} condition follows the configured contract; "
                "valid state is preserved, invalid or unauthorized work is rejected or quarantined without silent loss, "
                "retries do not duplicate side effects, lineage and audit evidence remain available, and no production "
                "records or credentials are used."
            ),
            "automation_framework": "Playwright + platform UI/API",
            "tags": ",".join([pack["key"], "data-ai-platform", "synthetic-data", slug, variant.replace(" ", "-")]),
        })
    return rows


def write_pack(pack: dict) -> None:
    root = ROOT / pack["root"]
    manifest_modules = []
    total = 0
    for slug, label, tasks in pack["modules"]:
        rows = rows_for(pack, slug, label, tasks)
        prefix = f"{pack['key']}_{slug}_suite"
        folder = root / slug
        folder.mkdir(parents=True, exist_ok=True)
        csv_path = folder / f"{prefix}.csv"
        with csv_path.open("w", encoding="utf-8-sig", newline="") as stream:
            writer = csv.DictWriter(stream, fieldnames=FIELDS, lineterminator="\r\n")
            writer.writeheader()
            writer.writerows(rows)
        csv_path.with_suffix(".json").write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        variable = re.sub(r"\W+", "_", prefix.upper())
        csv_path.with_suffix(".ts").write_text(
            f"// Generated from {csv_path.name}; regenerate with scripts/generate_market_product_suites.py.\n"
            f"export const {variable} = {json.dumps(rows, ensure_ascii=False, indent=2)} as const;\n"
            f"export default {variable};\n",
            encoding="utf-8",
        )
        manifest_modules.append({"id": slug, "label": label, "folder": slug, "prefix": prefix, "count": len(rows)})
        total += len(rows)
    (root / "manifest.json").write_text(
        json.dumps({"product": pack["display"], "key": pack["key"], "count": total, "modules": manifest_modules}, indent=2) + "\n",
        encoding="utf-8",
    )


def suite_config_ts(pack: dict) -> str:
    journeys = [
        {"title": title, "section": section, "createAction": create, "fields": fields,
         "submitAction": submit, "createdText": created, "nextAction": next_action}
        for title, section, create, fields, submit, created, next_action in pack["journeys"]
    ]
    return (
        "// Product-specific accessible-name contract for this standalone E2E suite.\n"
        "// Update these patterns to match the labels exposed by your tenant version.\n"
        f"export const productName = {json.dumps(pack['display'])};\n"
        f"export const journeys = {json.dumps(journeys, ensure_ascii=False, indent=2)} as const;\n"
    )


def playwright_spec(pack: dict) -> str:
    return r'''import { randomUUID } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";
import { journeys, productName } from "../../suite.config";

const runId = randomUUID().replaceAll("-", "").slice(0, 8);
const safePrefix = process.env.TEST_DATA_PREFIX ?? "codex-e2e";
const timeout = Number(process.env.ACTION_TIMEOUT_MS ?? 15_000);
const resourceName = (index: number) => `${safePrefix}-${runId}-${index}`;

function pattern(value: string): RegExp {
  return new RegExp(value, "i");
}

async function openSection(page: Page, section: string) {
  const nav = page.getByRole("navigation").first();
  await expect(nav, "Application navigation should be available after authentication").toBeVisible();
  const link = nav.getByRole("link", { name: pattern(section) }).first();
  if (await link.count()) {
    await link.click();
  } else {
    const button = nav.getByRole("button", { name: pattern(section) }).first();
    await expect(button, `Navigation item matching /${section}/ should exist`).toBeVisible();
    await button.click();
  }
  await expect(page.getByRole("main")).toBeVisible();
}

async function clickAction(page: Page, action: string) {
  const name = pattern(action);
  const button = page.getByRole("button", { name }).first();
  if (await button.count()) {
    await expect(button, `Action matching /${action}/ should be enabled`).toBeEnabled({ timeout });
    await button.click();
    return;
  }
  const link = page.getByRole("link", { name }).first();
  await expect(link, `Action link matching /${action}/ should be visible`).toBeVisible({ timeout });
  await link.click();
}

async function performNextAction(page: Page, action: string) {
  if (/upload files|choose file|select files/i.test(action)) {
    const fileInput = page.locator('input[type="file"]').first();
    const fixture = {
      name: `synthetic-${runId}.txt`,
      mimeType: "text/plain",
      buffer: Buffer.from(`synthetic fixture ${runId}\\n`, "utf8"),
    };
    if (await fileInput.count()) {
      await fileInput.setInputFiles(fixture);
      return;
    }
    const chooserPromise = page.waitForEvent("filechooser", { timeout });
    await clickAction(page, action);
    await (await chooserPromise).setFiles(fixture);
    return;
  }
  await clickAction(page, action);
}

async function fillNamedField(page: Page, fieldPattern: string, value: string) {
  const field = page.getByLabel(pattern(fieldPattern)).first();
  await expect(field, `Form field matching /${fieldPattern}/ should be visible`).toBeVisible({ timeout });
  const tagName = await field.evaluate((element) => element.tagName.toLowerCase());
  if (tagName === "select") {
    const options = field.locator("option");
    const optionCount = await options.count();
    await field.selectOption({ index: optionCount > 1 ? 1 : 0 });
    return;
  }
  if ((await field.getAttribute("role")) === "combobox") {
    await field.click();
    await page.getByRole("option").first().click();
    return;
  }
  await field.fill(value);
}

function syntheticValue(fieldPattern: string, createdName: string, fieldIndex: number): string {
  const field = fieldPattern.toLowerCase();
  if (/email|username/.test(field)) return `qa+${runId}@example.test`;
  if (/url|uri|repository|git|path/.test(field)) return `https://example.test/${encodeURIComponent(createdName)}`;
  if (/domain/.test(field)) return `${createdName}.example.test`;
  if (/host|server/.test(field)) return "127.0.0.1";
  if (/password|secret/.test(field)) return `Synthetic-${runId}-Only!91a`;
  if (/query|sql|statement/.test(field)) return "select 1 as synthetic_value";
  if (/region/.test(field)) return "us-east-1";
  if (/port/.test(field)) return "443";
  if (/description|reason|comment/.test(field)) return `${productName} synthetic E2E fixture ${runId}`;
  return fieldIndex === 0 ? createdName : `${productName} synthetic fixture ${runId}`;
}

async function createAndExerciseJourney(page: Page, journey: (typeof journeys)[number], index: number) {
  const createdName = resourceName(index);
  await page.goto(process.env.APP_ENTRY_PATH ?? "/");
  await openSection(page, journey.section);
  await clickAction(page, journey.createAction);
  for (let fieldIndex = 0; fieldIndex < journey.fields.length; fieldIndex += 1) {
    const fieldPattern = journey.fields[fieldIndex];
    const value = syntheticValue(fieldPattern, createdName, fieldIndex);
    await fillNamedField(page, fieldPattern, value);
  }
  await clickAction(page, journey.submitAction);
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
  await expect(page.getByText(pattern(journey.createdText)).first()).toBeVisible({ timeout });

  // Open one follow-on view/action so the scenario verifies navigation from
  // creation into the product's operational workflow, not only form success.
  await performNextAction(page, journey.nextAction);
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
  if (/run|execute|test|validate|publish|deploy|upload|ingest|train|sync|refresh|evaluate|replicate|revalidate|submit|restore|import|export|approve|promote|scale|retry|resume|invoke|subscribe|query/i.test(journey.nextAction)) {
    const completed = page.getByRole("status")
      .or(page.getByRole("alert"))
      .or(page.getByText(/success|succeeded|completed|published|ready|healthy|active|approved|accepted|passed|connected|verified/i));
    await expect(completed.last(), `The /${journey.nextAction}/ action should report a successful result`).toBeVisible({ timeout });
  }
  await page.reload();
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
}

test.describe(`${productName} standalone end-to-end suite`, () => {
  test.beforeEach(async ({ page }) => {
    await page.setDefaultTimeout(timeout);
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await expect(page).not.toHaveURL(/\/login(?:\/|$)/i, { timeout });
  });

  for (const [index, journey] of journeys.entries()) {
    test(journey.title, async ({ page }) => {
      await createAndExerciseJourney(page, journey, index + 1);
    });
  }

  test("navigation keeps the authenticated session inside the configured tenant", async ({ page }) => {
    const baseOrigin = new URL(process.env.BASE_URL ?? "http://127.0.0.1:3000").origin;
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await expect(page.getByRole("main")).toBeVisible();
    for (const journey of journeys.slice(0, 4)) {
      await openSection(page, journey.section);
      expect(new URL(page.url()).origin).toBe(baseOrigin);
      await expect(page).not.toHaveURL(/\/login(?:\/|$)/i);
    }
  });

  test("required form fields reject an empty create request", async ({ page }) => {
    const journey = journeys[0];
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await openSection(page, journey.section);
    await clickAction(page, journey.createAction);
    const submit = page.getByRole("button", { name: pattern(journey.submitAction) }).first();
    await expect(submit, "The create form should expose its submit action").toBeVisible({ timeout });
    if (await submit.isEnabled()) {
      await submit.click();
      const requiredError = page.getByRole("alert").or(page.getByText(/required|cannot be empty|enter a name/i));
      await expect(requiredError.first()).toBeVisible({ timeout });
    } else {
      await expect(submit).toBeDisabled();
    }
  });

  test("unauthorized application routes fail closed when a restricted path is configured", async ({ page }) => {
    test.skip(!process.env.RESTRICTED_PATH, "Set RESTRICTED_PATH and use a least-privilege storage state to enable this check.");
    await page.goto(process.env.RESTRICTED_PATH!);
    await expect(page.getByText(/access denied|not authorized|permission required|forbidden/i)).toBeVisible({ timeout });
  });
});
'''


def write_automation_suite(pack: dict) -> None:
    target = ROOT / "MarketAutomationSuites" / pack["root"]
    spec_dir = target / "tests" / "e2e"
    spec_dir.mkdir(parents=True, exist_ok=True)
    (target / "suite.config.ts").write_text(suite_config_ts(pack), encoding="utf-8")
    (spec_dir / "product.spec.ts").write_text(playwright_spec(pack), encoding="utf-8")
    (target / "playwright.config.ts").write_text('''import "dotenv/config";
import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const authFile = process.env.STORAGE_STATE;
const storageState = authFile && existsSync(authFile) ? authFile : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  timeout: Number(process.env.TEST_TIMEOUT_MS ?? 60_000),
  expect: { timeout: Number(process.env.EXPECT_TIMEOUT_MS ?? 15_000) },
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    ...(storageState ? { storageState } : {}),
    actionTimeout: Number(process.env.ACTION_TIMEOUT_MS ?? 15_000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT_MS ?? 30_000),
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
''', encoding="utf-8")
    (target / "package.json").write_text(json.dumps({
        "name": f"{pack['key']}-standalone-e2e",
        "version": "1.0.0",
        "private": True,
        "type": "module",
        "scripts": {
            "test": "playwright test",
            "test:headed": "playwright test --headed",
            "test:debug": "playwright test --debug",
            "typecheck": "tsc --noEmit",
            "report": "playwright show-report playwright-report",
        },
        "engines": {"node": ">=20"},
        "devDependencies": {"@playwright/test": "^1.59.1", "dotenv": "^16.4.7", "typescript": "^5.8.3"},
    }, indent=2) + "\n", encoding="utf-8")
    (target / "tsconfig.json").write_text(json.dumps({
        "compilerOptions": {"target": "ES2022", "module": "ESNext", "moduleResolution": "Bundler", "strict": True, "types": ["node"]},
        "include": ["playwright.config.ts", "suite.config.ts", "tests/**/*.ts"],
    }, indent=2) + "\n", encoding="utf-8")
    (target / ".env.example").write_text("""# Point this suite at a dedicated, non-production tenant.
BASE_URL=https://your-test-tenant.example.test
APP_ENTRY_PATH=/
# Generate with: npx playwright codegen --save-storage=.auth/state.json %BASE_URL%
STORAGE_STATE=.auth/state.json
TEST_DATA_PREFIX=codex-e2e
TEST_TIMEOUT_MS=60000
EXPECT_TIMEOUT_MS=15000
ACTION_TIMEOUT_MS=15000
NAVIGATION_TIMEOUT_MS=30000
# Optional: configure a restricted URL and a least-privilege STORAGE_STATE.
RESTRICTED_PATH=
""", encoding="utf-8")
    (target / ".gitignore").write_text(""".env
.auth/
node_modules/
test-results/
playwright-report/
playwright/.cache/
""", encoding="utf-8")
    workflow_list = "\n".join(f"- {title}" for title, *_ in pack["journeys"])
    (target / "README.md").write_text(f"""# {pack['display']} standalone Playwright E2E suite

This directory is a self-contained browser automation project with 10 platform-specific end-to-end workflows, form validation, authenticated navigation, and an opt-in authorization boundary check. The companion app test-data pack contains 2,000 synthetic cases across 10 modules.

## Covered E2E workflows

{workflow_list}

## Run against a test tenant

Use a dedicated non-production tenant with disposable test resources and a user authorized to create the objects covered by this pack. Copy `.env.example` to `.env`, set `BASE_URL` and any tenant-specific paths, then install browser dependencies:

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm test
```

For authenticated applications, sign in once with a test account and save a Playwright storage state. Keep the generated file private; it contains an active session.

```sh
node -e "require('node:fs').mkdirSync('.auth', {{ recursive: true }})"
npx playwright codegen --save-storage=.auth/state.json https://your-test-tenant.example.test
```

Set `STORAGE_STATE=.auth/state.json` in `.env`. The state file and `.env` are git-ignored. Configure `RESTRICTED_PATH` and use a separate least-privilege storage state to enable the authorization test.

## Tenant-specific accessible labels

`suite.config.ts` contains the navigation names, create actions, form labels, submit actions, and follow-on actions used by the tests. Adjust these accessible-name patterns to match the target tenant's UI/version before running the suite. The tests use browser-visible semantic roles and labels, generate unique `TEST_DATA_PREFIX` resource names, and retain traces, screenshots, video, and HTML reports on failure.

These workflows create resources in the target tenant; run them only in an isolated test environment and clean up resources with the configured `codex-e2e-` prefix after review. No real data, patient data, model payload, or credentials are included in this repository.
""", encoding="utf-8")


def write_automation_archive(pack: dict) -> None:
    suite_dir = ROOT / "MarketAutomationSuites" / pack["root"]
    archive_dir = ROOT / "MarketAutomationSuites" / "archives"
    archive_dir.mkdir(parents=True, exist_ok=True)
    archive_path = archive_dir / f"{pack['key']}-playwright-e2e.zip"
    with ZipFile(archive_path, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in sorted(suite_dir.rglob("*")):
            relative = path.relative_to(suite_dir)
            if path.is_file() and not any(part in {"node_modules", ".auth", "test-results", "playwright-report", ".cache"} for part in relative.parts):
                archive.write(path, Path(pack["root"]) / relative)


def main() -> None:
    for pack in PACKS:
        write_pack(pack)
        write_automation_suite(pack)
        write_automation_archive(pack)
        print(f"{pack['display']}: generated 2,000 cases and standalone E2E project")
    index = """# Market-leading platform automation suites

This set extends the existing product catalog with data engineering, developer platform, and AI application products that are gaining adoption. Each platform pack has 2,000 structured synthetic cases across ten modules. Each matching Playwright project is independently installable and contains ten product-specific end-to-end workflows, input validation, session/navigation checks, and an opt-in authorization boundary check.

| Product | App pack | Standalone suite |
| --- | --- | --- |
"""
    for pack in PACKS:
        index += f"| {pack['display']} | [`{pack['root']}/manifest.json`](../{pack['root']}/manifest.json) | [`MarketAutomationSuites/{pack['root']}/README.md`](./{pack['root']}/README.md) |\n"
    index += """
## Why these products

- **Data platforms:** Microsoft Fabric, dbt, Confluent Cloud, MongoDB Atlas, and Fivetran extend the catalog across analytics, transformation, streaming, operational databases, and ingestion. Microsoft's 2025 earnings commentary described Fabric adoption as accelerating; dbt Labs' 2025 analytics engineering report documents the shift toward AI-enabled analytics workflows; Confluent's annual report describes cross-enterprise streaming use cases; MongoDB cites production AI adoption in its survey material; and Fivetran's enterprise report highlights data readiness for AI.
- **Developer and AI platforms:** Supabase, Vercel, LangChain/LangSmith, Pinecone, and Hugging Face Hub cover application backends, deployment and AI inference routing, agent observability, vector retrieval, and model/data distribution. Vercel reported more than 3 million AI SDK weekly downloads in 2025; Hugging Face reported over 2 million public models, 500,000 public datasets, and 1 million Spaces; G2 included Pinecone on its 2025 fastest-growing software list; and LangChain's agent engineering survey describes agent use moving into production.

Sources: [Microsoft FY25 Q2 earnings](https://www.microsoft.com/en-us/investor/events/fy-2025/earnings-fy-2025-q2), [dbt Labs State of Analytics Engineering 2025](https://www.getdbt.com/resources/state-of-analytics-engineering-2025), [Confluent 2025 annual report](https://www.sec.gov/Archives/edgar/data/1699838/000169983826000006/cflt-20251231.htm), [MongoDB AI-in-production survey](https://www.mongodb.com/resources/solutions/use-cases/retool-2024-state-of-ai-in-production), [Fivetran enterprise data report](https://www.fivetran.com/press/fivetran-report-finds-enterprises-racing-toward-ai-without-the-data-to-support-it), [Vercel AI SDK growth](https://vercel.com/blog/series-f), [Hugging Face Hub scale](https://huggingface.co/blog/huggingface-hub-v1), [G2 fastest-growing products](https://www.g2.com/best-software-companies/2025/fastest-growing), and [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering).

Run any suite independently by following its README. Each targets a non-production product tenant and requires tenant-specific accessible-name patterns in `suite.config.ts`. The app-facing CSV, JSON, and TypeScript cases are regenerated with `npm run generate:app-data`.
"""
    (ROOT / "MarketAutomationSuites" / "README.md").write_text(index, encoding="utf-8")


if __name__ == "__main__":
    main()
