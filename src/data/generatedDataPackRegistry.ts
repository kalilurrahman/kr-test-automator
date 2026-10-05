/* Generated from suite manifests by scripts/generate_app_data_pack_registry.py. */
import type { PlatformDef } from "@/data/platformManifests";
import type { ProductEntry } from "@/data/productCatalog";

export const GENERATED_DATA_PACK_PLATFORMS: PlatformDef[] = [
  {
    "id": "claudecode",
    "label": "Claude Code",
    "shortLabel": "Claude Code",
    "description": "1,000 test cases across 8 Claude Code modules.",
    "publicBase": "/ClaudeCode",
    "idPrefix": "CC",
    "accent": "rose",
    "modules": [
      {
        "id": "test_planning",
        "label": "Repository Context",
        "folder": "test_planning",
        "prefix": "claudecode_test_planning_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "playwright_authoring",
        "label": "Code Changes",
        "folder": "playwright_authoring",
        "prefix": "claudecode_playwright_authoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tdd",
        "label": "Test Authoring",
        "folder": "tdd",
        "prefix": "claudecode_tdd_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "test_maintenance",
        "label": "Debugging",
        "folder": "test_maintenance",
        "prefix": "claudecode_test_maintenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api_testing",
        "label": "Refactoring",
        "folder": "api_testing",
        "prefix": "claudecode_api_testing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "code_review",
        "label": "Code Review",
        "folder": "code_review",
        "prefix": "claudecode_code_review_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ci_quality_gate",
        "label": "Security",
        "folder": "ci_quality_gate",
        "prefix": "claudecode_ci_quality_gate_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "mcp_integration",
        "label": "Tool Use and Permissions",
        "folder": "mcp_integration",
        "prefix": "claudecode_mcp_integration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "codex",
    "label": "OpenAI Codex",
    "shortLabel": "OpenAI Codex",
    "description": "1,000 test cases across 8 OpenAI Codex modules.",
    "publicBase": "/Codex",
    "idPrefix": "COD",
    "accent": "indigo",
    "modules": [
      {
        "id": "repository_context",
        "label": "Repository Context",
        "folder": "repository_context",
        "prefix": "codex_repository_context_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api_testing",
        "label": "Code Changes",
        "folder": "api_testing",
        "prefix": "codex_api_testing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "unit_test_generation",
        "label": "Unit Test Generation",
        "folder": "unit_test_generation",
        "prefix": "codex_unit_test_generation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refactoring",
        "label": "Refactoring",
        "folder": "refactoring",
        "prefix": "codex_refactoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "code_review",
        "label": "Code Review",
        "folder": "code_review",
        "prefix": "codex_code_review_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "secure_coding",
        "label": "Secure Coding",
        "folder": "secure_coding",
        "prefix": "codex_secure_coding_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "performance",
        "label": "Debugging",
        "folder": "performance",
        "prefix": "codex_performance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ci_quality_gate",
        "label": "CI and Delivery",
        "folder": "ci_quality_gate",
        "prefix": "codex_ci_quality_gate_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "geminiantigravity",
    "label": "Gemini Antigravity",
    "shortLabel": "Gemini Antigravity",
    "description": "1,000 test cases across 8 Gemini Antigravity modules.",
    "publicBase": "/GeminiAntigravity",
    "idPrefix": "GANT",
    "accent": "blue",
    "modules": [
      {
        "id": "workspace_context",
        "label": "Workspace Context",
        "folder": "workspace_context",
        "prefix": "geminiantigravity_workspace_context_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agentic_implementation",
        "label": "Agentic Implementation",
        "folder": "agentic_implementation",
        "prefix": "geminiantigravity_agentic_implementation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "test_generation",
        "label": "Test Generation",
        "folder": "test_generation",
        "prefix": "geminiantigravity_test_generation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "debugging_workflow",
        "label": "Debugging Workflow",
        "folder": "debugging_workflow",
        "prefix": "geminiantigravity_debugging_workflow_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refactoring",
        "label": "Refactoring",
        "folder": "refactoring",
        "prefix": "geminiantigravity_refactoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "terminal_tool_safety",
        "label": "Terminal and Tool Safety",
        "folder": "terminal_tool_safety",
        "prefix": "geminiantigravity_terminal_tool_safety_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "secure_operations",
        "label": "Secure Operations",
        "folder": "secure_operations",
        "prefix": "geminiantigravity_secure_operations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "review_handoff",
        "label": "Review Artifacts and Handoff",
        "folder": "review_handoff",
        "prefix": "geminiantigravity_review_handoff_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "githubcopilot",
    "label": "GitHub Copilot",
    "shortLabel": "GitHub Copilot",
    "description": "1,000 test cases across 8 GitHub Copilot modules.",
    "publicBase": "/GitHubCopilot",
    "idPrefix": "GHC",
    "accent": "cyan",
    "modules": [
      {
        "id": "repository_context",
        "label": "Repository Context",
        "folder": "repository_context",
        "prefix": "githubcopilot_repository_context_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agentic_changes",
        "label": "Agentic Code Changes",
        "folder": "agentic_changes",
        "prefix": "githubcopilot_agentic_changes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "test_generation",
        "label": "Test Generation",
        "folder": "test_generation",
        "prefix": "githubcopilot_test_generation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "debugging",
        "label": "Debugging",
        "folder": "debugging",
        "prefix": "githubcopilot_debugging_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refactoring",
        "label": "Refactoring",
        "folder": "refactoring",
        "prefix": "githubcopilot_refactoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "code_review",
        "label": "Code Review",
        "folder": "code_review",
        "prefix": "githubcopilot_code_review_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security",
        "label": "Security",
        "folder": "security",
        "prefix": "githubcopilot_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "pull_request_delivery",
        "label": "Pull Request Delivery",
        "folder": "pull_request_delivery",
        "prefix": "githubcopilot_pull_request_delivery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "cursor",
    "label": "Cursor",
    "shortLabel": "Cursor",
    "description": "1,000 test cases across 8 Cursor modules.",
    "publicBase": "/Cursor",
    "idPrefix": "CUR",
    "accent": "violet",
    "modules": [
      {
        "id": "codebase_context",
        "label": "Codebase Context",
        "folder": "codebase_context",
        "prefix": "cursor_codebase_context_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agentic_editing",
        "label": "Agentic Editing",
        "folder": "agentic_editing",
        "prefix": "cursor_agentic_editing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "test_authoring",
        "label": "Test Authoring",
        "folder": "test_authoring",
        "prefix": "cursor_test_authoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "debugging",
        "label": "Debugging",
        "folder": "debugging",
        "prefix": "cursor_debugging_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refactoring",
        "label": "Refactoring",
        "folder": "refactoring",
        "prefix": "cursor_refactoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "diff_review",
        "label": "Diff Review",
        "folder": "diff_review",
        "prefix": "cursor_diff_review_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security",
        "label": "Security",
        "folder": "security",
        "prefix": "cursor_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "terminal_approval",
        "label": "Terminal and Approval Safety",
        "folder": "terminal_approval",
        "prefix": "cursor_terminal_approval_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "windsurf",
    "label": "Windsurf",
    "shortLabel": "Windsurf",
    "description": "1,000 test cases across 8 Windsurf modules.",
    "publicBase": "/Windsurf",
    "idPrefix": "WIN",
    "accent": "teal",
    "modules": [
      {
        "id": "codebase_context",
        "label": "Codebase Context",
        "folder": "codebase_context",
        "prefix": "windsurf_codebase_context_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agentic_implementation",
        "label": "Agentic Implementation",
        "folder": "agentic_implementation",
        "prefix": "windsurf_agentic_implementation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "test_generation",
        "label": "Test Generation",
        "folder": "test_generation",
        "prefix": "windsurf_test_generation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "debugging",
        "label": "Debugging",
        "folder": "debugging",
        "prefix": "windsurf_debugging_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refactoring",
        "label": "Refactoring",
        "folder": "refactoring",
        "prefix": "windsurf_refactoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "workflow_tool_safety",
        "label": "Workflow and Tool Safety",
        "folder": "workflow_tool_safety",
        "prefix": "windsurf_workflow_tool_safety_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "secure_coding",
        "label": "Secure Coding",
        "folder": "secure_coding",
        "prefix": "windsurf_secure_coding_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "change_handoff",
        "label": "Change Review and Handoff",
        "folder": "change_handoff",
        "prefix": "windsurf_change_handoff_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "dataiku",
    "label": "Dataiku",
    "shortLabel": "Dataiku",
    "description": "2,200 test cases across 11 Dataiku modules.",
    "publicBase": "/Dataiku",
    "idPrefix": "DIKU",
    "accent": "amber",
    "modules": [
      {
        "id": "flow",
        "label": "Flow and Lineage",
        "folder": "flow",
        "prefix": "dataiku_dataiku_flow_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "visual_recipes",
        "label": "Visual Recipes",
        "folder": "visual_recipes",
        "prefix": "dataiku_visual_recipes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "datasets",
        "label": "Datasets and Connections",
        "folder": "datasets",
        "prefix": "dataiku_datasets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "code_environments",
        "label": "Code Environments",
        "folder": "code_environments",
        "prefix": "dataiku_code_environments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "scenarios",
        "label": "Automation Scenarios",
        "folder": "scenarios",
        "prefix": "dataiku_scenarios_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "mlops",
        "label": "Machine Learning and MLOps",
        "folder": "mlops",
        "prefix": "dataiku_mlops_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "llm_mesh",
        "label": "LLM Mesh and Prompt Workflows",
        "folder": "llm_mesh",
        "prefix": "dataiku_llm_mesh_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agents",
        "label": "Agents and Managed Tools",
        "folder": "agents",
        "prefix": "dataiku_agents_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "governance",
        "label": "Governance and Data Quality",
        "folder": "governance",
        "prefix": "dataiku_governance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deployment",
        "label": "Bundles and Deployment",
        "folder": "deployment",
        "prefix": "dataiku_deployment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api",
        "label": "API and Automation",
        "folder": "api",
        "prefix": "dataiku_api_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "apacheiceberg",
    "label": "Apache Iceberg",
    "shortLabel": "Apache Iceberg",
    "description": "2,000 test cases across 10 Apache Iceberg modules.",
    "publicBase": "/ApacheIceberg",
    "idPrefix": "ICE",
    "accent": "cyan",
    "modules": [
      {
        "id": "table_metadata",
        "label": "Table Metadata and Commits",
        "folder": "table_metadata",
        "prefix": "apacheiceberg_metadata_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schema_evolution",
        "label": "Schema Evolution",
        "folder": "schema_evolution",
        "prefix": "apacheiceberg_schema_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "partition_evolution",
        "label": "Partition Evolution and Hidden Partitioning",
        "folder": "partition_evolution",
        "prefix": "apacheiceberg_partitioning_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "snapshots",
        "label": "Snapshots and Time Travel",
        "folder": "snapshots",
        "prefix": "apacheiceberg_snapshots_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "concurrency",
        "label": "Transactions and Concurrency",
        "folder": "concurrency",
        "prefix": "apacheiceberg_concurrency_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "maintenance",
        "label": "Compaction and Table Maintenance",
        "folder": "maintenance",
        "prefix": "apacheiceberg_maintenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "catalogs",
        "label": "Catalogs and Namespace Operations",
        "folder": "catalogs",
        "prefix": "apacheiceberg_catalogs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deletes",
        "label": "Deletes and Row-Level Changes",
        "folder": "deletes",
        "prefix": "apacheiceberg_deletes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security",
        "label": "Security and Governance",
        "folder": "security",
        "prefix": "apacheiceberg_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "engines",
        "label": "Engine and Format Interoperability",
        "folder": "engines",
        "prefix": "apacheiceberg_engines_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "medidata",
    "label": "Medidata",
    "shortLabel": "Medidata",
    "description": "2,200 test cases across 11 Medidata modules.",
    "publicBase": "/Medidata",
    "idPrefix": "MDT",
    "accent": "rose",
    "modules": [
      {
        "id": "edc",
        "label": "Rave EDC",
        "folder": "edc",
        "prefix": "medidata_edc_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ecoa",
        "label": "Rave eCOA and ePRO",
        "folder": "ecoa",
        "prefix": "medidata_ecoa_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "econsent",
        "label": "Rave eConsent",
        "folder": "econsent",
        "prefix": "medidata_econsent_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "rtsm",
        "label": "Rave RTSM",
        "folder": "rtsm",
        "prefix": "medidata_rtsm_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ctms",
        "label": "Rave CTMS",
        "folder": "ctms",
        "prefix": "medidata_ctms_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "etmf",
        "label": "Rave eTMF",
        "folder": "etmf",
        "prefix": "medidata_etmf_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "rbqm",
        "label": "Risk-Based Quality Management",
        "folder": "rbqm",
        "prefix": "medidata_rbqm_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "safety_coding",
        "label": "Safety and Medical Coding",
        "folder": "safety_coding",
        "prefix": "medidata_safety_coding_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "imaging",
        "label": "Rave Imaging and External Data",
        "folder": "imaging",
        "prefix": "medidata_imaging_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integrations",
        "label": "Clinical Integrations",
        "folder": "integrations",
        "prefix": "medidata_integrations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "audit_compliance",
        "label": "Audit and Compliance",
        "folder": "audit_compliance",
        "prefix": "medidata_audit_compliance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "iqvia",
    "label": "IQVIA",
    "shortLabel": "IQVIA",
    "description": "2,200 test cases across 11 IQVIA modules.",
    "publicBase": "/IQVIA",
    "idPrefix": "IQV",
    "accent": "emerald",
    "modules": [
      {
        "id": "clinical_data",
        "label": "Clinical Data Management",
        "folder": "clinical_data",
        "prefix": "iqvia_clinical_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ctms",
        "label": "Clinical Trial Management",
        "folder": "ctms",
        "prefix": "iqvia_ctms_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "safety",
        "label": "Safety and Pharmacovigilance",
        "folder": "safety",
        "prefix": "iqvia_safety_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "etmf",
        "label": "Trial Master File",
        "folder": "etmf",
        "prefix": "iqvia_etmf_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "regulatory",
        "label": "Regulatory Information Management",
        "folder": "regulatory",
        "prefix": "iqvia_regulatory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "real_world_data",
        "label": "Real-World Data and Evidence",
        "folder": "real_world_data",
        "prefix": "iqvia_real_world_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "commercial_data",
        "label": "Commercial Data and Analytics",
        "folder": "commercial_data",
        "prefix": "iqvia_commercial_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "patient_engagement",
        "label": "Patient Engagement",
        "folder": "patient_engagement",
        "prefix": "iqvia_patient_engagement_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "analytics",
        "label": "Clinical Analytics",
        "folder": "analytics",
        "prefix": "iqvia_analytics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integration",
        "label": "Data Integration and Interoperability",
        "folder": "integration",
        "prefix": "iqvia_integration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "identity_compliance",
        "label": "Identity, Privacy, and Compliance",
        "folder": "identity_compliance",
        "prefix": "iqvia_identity_compliance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "databricks",
    "label": "Databricks",
    "shortLabel": "Databricks",
    "description": "3,000 test cases across 8 Databricks modules.",
    "publicBase": "/Databricks",
    "idPrefix": "DBX",
    "accent": "amber",
    "modules": [
      {
        "id": "delta_lake",
        "label": "Delta Lake",
        "folder": "delta_lake",
        "prefix": "databricks_delta_lake_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "jobs",
        "label": "Jobs",
        "folder": "jobs",
        "prefix": "databricks_jobs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "notebooks",
        "label": "Notebooks",
        "folder": "notebooks",
        "prefix": "databricks_notebooks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "mlflow",
        "label": "MLflow",
        "folder": "mlflow",
        "prefix": "databricks_mlflow_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "model_evaluation",
        "label": "Model Evaluation",
        "folder": "model_evaluation",
        "prefix": "databricks_model_evaluation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "unity_catalog",
        "label": "Unity Catalog",
        "folder": "unity_catalog",
        "prefix": "databricks_unity_catalog_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "streaming",
        "label": "Streaming",
        "folder": "streaming",
        "prefix": "databricks_streaming_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sql_warehouse",
        "label": "SQL Warehouse",
        "folder": "sql_warehouse",
        "prefix": "databricks_sql_warehouse_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "snowflakeai",
    "label": "Snowflake AI",
    "shortLabel": "Snowflake AI",
    "description": "3,000 test cases across 8 Snowflake AI modules.",
    "publicBase": "/SnowflakeAI",
    "idPrefix": "SF",
    "accent": "blue",
    "modules": [
      {
        "id": "data_quality",
        "label": "Data Quality",
        "folder": "data_quality",
        "prefix": "snowflake_data_quality_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "elt_pipeline",
        "label": "ELT Pipeline",
        "folder": "elt_pipeline",
        "prefix": "snowflake_elt_pipeline_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schema_governance",
        "label": "Schema Governance",
        "folder": "schema_governance",
        "prefix": "snowflake_schema_governance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "rbac_and_masking",
        "label": "RBAC and Masking",
        "folder": "rbac_and_masking",
        "prefix": "snowflake_rbac_and_masking_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "performance",
        "label": "Performance",
        "folder": "performance",
        "prefix": "snowflake_performance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "streams_and_tasks",
        "label": "Streams and Tasks",
        "folder": "streams_and_tasks",
        "prefix": "snowflake_streams_and_tasks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "data_sharing",
        "label": "Data Sharing",
        "folder": "data_sharing",
        "prefix": "snowflake_data_sharing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "snowpark",
        "label": "Snowpark",
        "folder": "snowpark",
        "prefix": "snowflake_snowpark_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  },
  {
    "id": "foundryai",
    "label": "Palantir Foundry AI",
    "shortLabel": "Palantir Foundry AI",
    "description": "3,000 test cases across 8 Palantir Foundry AI modules.",
    "publicBase": "/PalantirFoundryAI",
    "idPrefix": "PF",
    "accent": "violet",
    "modules": [
      {
        "id": "aip_logic",
        "label": "AIP Logic",
        "folder": "aip_logic",
        "prefix": "palantirfoundry_aip_logic_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "workflow",
        "label": "Workflow",
        "folder": "workflow",
        "prefix": "palantirfoundry_workflow_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ontology",
        "label": "Ontology",
        "folder": "ontology",
        "prefix": "palantirfoundry_ontology_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "transforms",
        "label": "Transforms",
        "folder": "transforms",
        "prefix": "palantirfoundry_transforms_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "data_lineage",
        "label": "Data Lineage",
        "folder": "data_lineage",
        "prefix": "palantirfoundry_data_lineage_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_control",
        "label": "Access Control",
        "folder": "access_control",
        "prefix": "palantirfoundry_access_control_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sdk_ci",
        "label": "SDK CI",
        "folder": "sdk_ci",
        "prefix": "palantirfoundry_sdk_ci_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "object_explorer",
        "label": "Object Explorer",
        "folder": "object_explorer",
        "prefix": "palantirfoundry_object_explorer_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ]
  }
];

export const GENERATED_DATA_PACK_PRODUCTS: ProductEntry[] = [
  {
    "key": "claudecode",
    "label": "Claude Code",
    "shortLabel": "Claude Code",
    "description": "1,000 test cases across 8 Claude Code modules.",
    "route": "/p/claudecode",
    "kind": "spa",
    "modules": [
      "Repository Context",
      "Code Changes",
      "Test Authoring",
      "Debugging",
      "Refactoring",
      "Code Review",
      "Security",
      "Tool Use and Permissions"
    ],
    "idPrefix": "CC",
    "accent": "rose"
  },
  {
    "key": "codex",
    "label": "OpenAI Codex",
    "shortLabel": "OpenAI Codex",
    "description": "1,000 test cases across 8 OpenAI Codex modules.",
    "route": "/p/codex",
    "kind": "spa",
    "modules": [
      "Repository Context",
      "Code Changes",
      "Unit Test Generation",
      "Refactoring",
      "Code Review",
      "Secure Coding",
      "Debugging",
      "CI and Delivery"
    ],
    "idPrefix": "COD",
    "accent": "indigo"
  },
  {
    "key": "geminiantigravity",
    "label": "Gemini Antigravity",
    "shortLabel": "Gemini Antigravity",
    "description": "1,000 test cases across 8 Gemini Antigravity modules.",
    "route": "/p/geminiantigravity",
    "kind": "spa",
    "modules": [
      "Workspace Context",
      "Agentic Implementation",
      "Test Generation",
      "Debugging Workflow",
      "Refactoring",
      "Terminal and Tool Safety",
      "Secure Operations",
      "Review Artifacts and Handoff"
    ],
    "idPrefix": "GANT",
    "accent": "blue"
  },
  {
    "key": "githubcopilot",
    "label": "GitHub Copilot",
    "shortLabel": "GitHub Copilot",
    "description": "1,000 test cases across 8 GitHub Copilot modules.",
    "route": "/p/githubcopilot",
    "kind": "spa",
    "modules": [
      "Repository Context",
      "Agentic Code Changes",
      "Test Generation",
      "Debugging",
      "Refactoring",
      "Code Review",
      "Security",
      "Pull Request Delivery"
    ],
    "idPrefix": "GHC",
    "accent": "cyan"
  },
  {
    "key": "cursor",
    "label": "Cursor",
    "shortLabel": "Cursor",
    "description": "1,000 test cases across 8 Cursor modules.",
    "route": "/p/cursor",
    "kind": "spa",
    "modules": [
      "Codebase Context",
      "Agentic Editing",
      "Test Authoring",
      "Debugging",
      "Refactoring",
      "Diff Review",
      "Security",
      "Terminal and Approval Safety"
    ],
    "idPrefix": "CUR",
    "accent": "violet"
  },
  {
    "key": "windsurf",
    "label": "Windsurf",
    "shortLabel": "Windsurf",
    "description": "1,000 test cases across 8 Windsurf modules.",
    "route": "/p/windsurf",
    "kind": "spa",
    "modules": [
      "Codebase Context",
      "Agentic Implementation",
      "Test Generation",
      "Debugging",
      "Refactoring",
      "Workflow and Tool Safety",
      "Secure Coding",
      "Change Review and Handoff"
    ],
    "idPrefix": "WIN",
    "accent": "teal"
  },
  {
    "key": "dataiku",
    "label": "Dataiku",
    "shortLabel": "Dataiku",
    "description": "2,200 test cases across 11 Dataiku modules.",
    "route": "/p/dataiku",
    "kind": "spa",
    "modules": [
      "Flow and Lineage",
      "Visual Recipes",
      "Datasets and Connections",
      "Code Environments",
      "Automation Scenarios",
      "Machine Learning and MLOps",
      "LLM Mesh and Prompt Workflows",
      "Agents and Managed Tools",
      "Governance and Data Quality",
      "Bundles and Deployment",
      "API and Automation"
    ],
    "idPrefix": "DIKU",
    "accent": "amber"
  },
  {
    "key": "apacheiceberg",
    "label": "Apache Iceberg",
    "shortLabel": "Apache Iceberg",
    "description": "2,000 test cases across 10 Apache Iceberg modules.",
    "route": "/p/apacheiceberg",
    "kind": "spa",
    "modules": [
      "Table Metadata and Commits",
      "Schema Evolution",
      "Partition Evolution and Hidden Partitioning",
      "Snapshots and Time Travel",
      "Transactions and Concurrency",
      "Compaction and Table Maintenance",
      "Catalogs and Namespace Operations",
      "Deletes and Row-Level Changes",
      "Security and Governance",
      "Engine and Format Interoperability"
    ],
    "idPrefix": "ICE",
    "accent": "cyan"
  },
  {
    "key": "medidata",
    "label": "Medidata",
    "shortLabel": "Medidata",
    "description": "2,200 test cases across 11 Medidata modules.",
    "route": "/p/medidata",
    "kind": "spa",
    "modules": [
      "Rave EDC",
      "Rave eCOA and ePRO",
      "Rave eConsent",
      "Rave RTSM",
      "Rave CTMS",
      "Rave eTMF",
      "Risk-Based Quality Management",
      "Safety and Medical Coding",
      "Rave Imaging and External Data",
      "Clinical Integrations",
      "Audit and Compliance"
    ],
    "idPrefix": "MDT",
    "accent": "rose"
  },
  {
    "key": "iqvia",
    "label": "IQVIA",
    "shortLabel": "IQVIA",
    "description": "2,200 test cases across 11 IQVIA modules.",
    "route": "/p/iqvia",
    "kind": "spa",
    "modules": [
      "Clinical Data Management",
      "Clinical Trial Management",
      "Safety and Pharmacovigilance",
      "Trial Master File",
      "Regulatory Information Management",
      "Real-World Data and Evidence",
      "Commercial Data and Analytics",
      "Patient Engagement",
      "Clinical Analytics",
      "Data Integration and Interoperability",
      "Identity, Privacy, and Compliance"
    ],
    "idPrefix": "IQV",
    "accent": "emerald"
  },
  {
    "key": "databricks",
    "label": "Databricks",
    "shortLabel": "Databricks",
    "description": "3,000 test cases across 8 Databricks modules.",
    "route": "/p/databricks",
    "kind": "spa",
    "modules": [
      "Delta Lake",
      "Jobs",
      "Notebooks",
      "MLflow",
      "Model Evaluation",
      "Unity Catalog",
      "Streaming",
      "SQL Warehouse"
    ],
    "idPrefix": "DBX",
    "accent": "amber"
  },
  {
    "key": "snowflakeai",
    "label": "Snowflake AI",
    "shortLabel": "Snowflake AI",
    "description": "3,000 test cases across 8 Snowflake AI modules.",
    "route": "/p/snowflakeai",
    "kind": "spa",
    "modules": [
      "Data Quality",
      "ELT Pipeline",
      "Schema Governance",
      "RBAC and Masking",
      "Performance",
      "Streams and Tasks",
      "Data Sharing",
      "Snowpark"
    ],
    "idPrefix": "SF",
    "accent": "blue"
  },
  {
    "key": "foundryai",
    "label": "Palantir Foundry AI",
    "shortLabel": "Palantir Foundry AI",
    "description": "3,000 test cases across 8 Palantir Foundry AI modules.",
    "route": "/p/foundryai",
    "kind": "spa",
    "modules": [
      "AIP Logic",
      "Workflow",
      "Ontology",
      "Transforms",
      "Data Lineage",
      "Access Control",
      "SDK CI",
      "Object Explorer"
    ],
    "idPrefix": "PF",
    "accent": "violet"
  }
];
