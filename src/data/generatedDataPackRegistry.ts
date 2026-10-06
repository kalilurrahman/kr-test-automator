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
    "idPrefix": "SNOW",
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
  },
  {
    "id": "microsoftfabric",
    "label": "Microsoft Fabric",
    "shortLabel": "Microsoft Fabric",
    "description": "2,000 test cases across 10 Microsoft Fabric modules.",
    "publicBase": "/MicrosoftFabric",
    "idPrefix": "FAB",
    "accent": "blue",
    "modules": [
      {
        "id": "workspaces",
        "label": "Workspaces and Roles",
        "folder": "workspaces",
        "prefix": "microsoftfabric_workspaces_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "onelake",
        "label": "OneLake and Shortcuts",
        "folder": "onelake",
        "prefix": "microsoftfabric_onelake_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "data_factory",
        "label": "Data Factory Pipelines",
        "folder": "data_factory",
        "prefix": "microsoftfabric_data_factory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "lakehouse",
        "label": "Lakehouse and Spark",
        "folder": "lakehouse",
        "prefix": "microsoftfabric_lakehouse_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "warehouse",
        "label": "Warehouse and SQL",
        "folder": "warehouse",
        "prefix": "microsoftfabric_warehouse_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "power_bi",
        "label": "Power BI Semantic Models",
        "folder": "power_bi",
        "prefix": "microsoftfabric_power_bi_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "real_time",
        "label": "Real-Time Intelligence",
        "folder": "real_time",
        "prefix": "microsoftfabric_real_time_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "data_science",
        "label": "Data Science and ML",
        "folder": "data_science",
        "prefix": "microsoftfabric_data_science_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "governance",
        "label": "Governance and Lineage",
        "folder": "governance",
        "prefix": "microsoftfabric_governance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "capacity",
        "label": "Capacity and Operations",
        "folder": "capacity",
        "prefix": "microsoftfabric_capacity_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/microsoftfabric-playwright-e2e.zip"
  },
  {
    "id": "dbt",
    "label": "dbt",
    "shortLabel": "dbt",
    "description": "2,000 test cases across 10 dbt modules.",
    "publicBase": "/dbt",
    "idPrefix": "DBT",
    "accent": "amber",
    "modules": [
      {
        "id": "projects_git",
        "label": "Projects and Git",
        "folder": "projects_git",
        "prefix": "dbt_projects_git_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "models",
        "label": "Models and SQL",
        "folder": "models",
        "prefix": "dbt_models_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tests_contracts",
        "label": "Tests and Contracts",
        "folder": "tests_contracts",
        "prefix": "dbt_tests_contracts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "snapshots",
        "label": "Snapshots and History",
        "folder": "snapshots",
        "prefix": "dbt_snapshots_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "docs_lineage",
        "label": "Documentation and Lineage",
        "folder": "docs_lineage",
        "prefix": "dbt_docs_lineage_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "jobs_environments",
        "label": "Jobs and Environments",
        "folder": "jobs_environments",
        "prefix": "dbt_jobs_environments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ci",
        "label": "CI and Pull Request Checks",
        "folder": "ci",
        "prefix": "dbt_ci_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "metrics",
        "label": "Metrics and Semantic Layer",
        "folder": "metrics",
        "prefix": "dbt_metrics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_audit",
        "label": "Access and Audit",
        "folder": "access_audit",
        "prefix": "dbt_access_audit_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "adapters_packages",
        "label": "Adapters and Packages",
        "folder": "adapters_packages",
        "prefix": "dbt_adapters_packages_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/dbt-playwright-e2e.zip"
  },
  {
    "id": "confluentcloud",
    "label": "Confluent Cloud",
    "shortLabel": "Confluent Cloud",
    "description": "2,000 test cases across 10 Confluent Cloud modules.",
    "publicBase": "/Confluent",
    "idPrefix": "CFLT",
    "accent": "cyan",
    "modules": [
      {
        "id": "clusters",
        "label": "Clusters and Networking",
        "folder": "clusters",
        "prefix": "confluentcloud_clusters_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "topics",
        "label": "Topics and Partitions",
        "folder": "topics",
        "prefix": "confluentcloud_topics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schemas",
        "label": "Schema Registry",
        "folder": "schemas",
        "prefix": "confluentcloud_schemas_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "connectors",
        "label": "Connectors and Integrations",
        "folder": "connectors",
        "prefix": "confluentcloud_connectors_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "producers_consumers",
        "label": "Clients and Consumer Groups",
        "folder": "producers_consumers",
        "prefix": "confluentcloud_producers_consumers_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "flink_sql",
        "label": "Flink and Stream Processing",
        "folder": "flink_sql",
        "prefix": "confluentcloud_flink_sql_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "governance",
        "label": "Stream Governance and Lineage",
        "folder": "governance",
        "prefix": "confluentcloud_governance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "rbac",
        "label": "RBAC, ACLs, and Audit",
        "folder": "rbac",
        "prefix": "confluentcloud_rbac_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "disaster_recovery",
        "label": "Replication and Disaster Recovery",
        "folder": "disaster_recovery",
        "prefix": "confluentcloud_disaster_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "monitoring",
        "label": "Monitoring and Cost",
        "folder": "monitoring",
        "prefix": "confluentcloud_monitoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/confluentcloud-playwright-e2e.zip"
  },
  {
    "id": "mongodb-atlas",
    "label": "MongoDB Atlas",
    "shortLabel": "MongoDB Atlas",
    "description": "2,000 test cases across 10 MongoDB Atlas modules.",
    "publicBase": "/MongoDBAtlas",
    "idPrefix": "MDBA",
    "accent": "emerald",
    "modules": [
      {
        "id": "projects_clusters",
        "label": "Projects and Clusters",
        "folder": "projects_clusters",
        "prefix": "mongodb-atlas_projects_clusters_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "database_collections",
        "label": "Databases and Collections",
        "folder": "database_collections",
        "prefix": "mongodb-atlas_database_collections_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "indexes_search",
        "label": "Indexes, Search, and Vector",
        "folder": "indexes_search",
        "prefix": "mongodb-atlas_indexes_search_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "aggregation",
        "label": "Aggregation and Query",
        "folder": "aggregation",
        "prefix": "mongodb-atlas_aggregation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "change_streams",
        "label": "Change Streams and Triggers",
        "folder": "change_streams",
        "prefix": "mongodb-atlas_change_streams_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "backup_restore",
        "label": "Backup and Restore",
        "folder": "backup_restore",
        "prefix": "mongodb-atlas_backup_restore_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_network",
        "label": "Security and Networking",
        "folder": "security_network",
        "prefix": "mongodb-atlas_security_network_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "governance_audit",
        "label": "Governance and Audit",
        "folder": "governance_audit",
        "prefix": "mongodb-atlas_governance_audit_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "app_services",
        "label": "App Services and APIs",
        "folder": "app_services",
        "prefix": "mongodb-atlas_app_services_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "monitoring_performance",
        "label": "Monitoring and Performance",
        "folder": "monitoring_performance",
        "prefix": "mongodb-atlas_monitoring_performance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/mongodb-atlas-playwright-e2e.zip"
  },
  {
    "id": "fivetran",
    "label": "Fivetran",
    "shortLabel": "Fivetran",
    "description": "2,000 test cases across 10 Fivetran modules.",
    "publicBase": "/Fivetran",
    "idPrefix": "FVT",
    "accent": "violet",
    "modules": [
      {
        "id": "connectors",
        "label": "Connectors and Sources",
        "folder": "connectors",
        "prefix": "fivetran_connectors_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "destinations",
        "label": "Destinations and Targets",
        "folder": "destinations",
        "prefix": "fivetran_destinations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sync_cdc",
        "label": "Syncs and CDC",
        "folder": "sync_cdc",
        "prefix": "fivetran_sync_cdc_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schema_drift",
        "label": "Schema Drift and Evolution",
        "folder": "schema_drift",
        "prefix": "fivetran_schema_drift_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "transformations",
        "label": "Transformations and dbt",
        "folder": "transformations",
        "prefix": "fivetran_transformations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "orchestration",
        "label": "Orchestration and Scheduling",
        "folder": "orchestration",
        "prefix": "fivetran_orchestration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality",
        "label": "Data Quality and Alerts",
        "folder": "quality",
        "prefix": "fivetran_quality_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_security",
        "label": "Access, Secrets, and Audit",
        "folder": "access_security",
        "prefix": "fivetran_access_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "history_recovery",
        "label": "History and Recovery",
        "folder": "history_recovery",
        "prefix": "fivetran_history_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "usage_billing",
        "label": "Usage and Billing",
        "folder": "usage_billing",
        "prefix": "fivetran_usage_billing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/fivetran-playwright-e2e.zip"
  },
  {
    "id": "supabase-platform",
    "label": "Supabase",
    "shortLabel": "Supabase",
    "description": "2,000 test cases across 10 Supabase modules.",
    "publicBase": "/SupabasePlatform",
    "idPrefix": "SUPA",
    "accent": "emerald",
    "modules": [
      {
        "id": "projects_database",
        "label": "Projects and Postgres",
        "folder": "projects_database",
        "prefix": "supabase-platform_projects_database_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "auth_rls",
        "label": "Auth and Row-Level Security",
        "folder": "auth_rls",
        "prefix": "supabase-platform_auth_rls_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "realtime",
        "label": "Realtime and Broadcast",
        "folder": "realtime",
        "prefix": "supabase-platform_realtime_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "storage",
        "label": "Storage and Buckets",
        "folder": "storage",
        "prefix": "supabase-platform_storage_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "edge_functions",
        "label": "Edge Functions",
        "folder": "edge_functions",
        "prefix": "supabase-platform_edge_functions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "migrations_branching",
        "label": "Migrations and Branching",
        "folder": "migrations_branching",
        "prefix": "supabase-platform_migrations_branching_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api_keys_access",
        "label": "API Keys and Access",
        "folder": "api_keys_access",
        "prefix": "supabase-platform_api_keys_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "backup_recovery",
        "label": "Backups and Recovery",
        "folder": "backup_recovery",
        "prefix": "supabase-platform_backup_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "observability",
        "label": "Logs and Observability",
        "folder": "observability",
        "prefix": "supabase-platform_observability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integrations",
        "label": "Integrations and Deployment",
        "folder": "integrations",
        "prefix": "supabase-platform_integrations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/supabase-platform-playwright-e2e.zip"
  },
  {
    "id": "vercel",
    "label": "Vercel",
    "shortLabel": "Vercel",
    "description": "2,000 test cases across 10 Vercel modules.",
    "publicBase": "/Vercel",
    "idPrefix": "VERC",
    "accent": "indigo",
    "modules": [
      {
        "id": "projects_git",
        "label": "Projects and Git",
        "folder": "projects_git",
        "prefix": "vercel_projects_git_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deployments",
        "label": "Deployments and Promotion",
        "folder": "deployments",
        "prefix": "vercel_deployments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "environment_secrets",
        "label": "Environment Variables and Secrets",
        "folder": "environment_secrets",
        "prefix": "vercel_environment_secrets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "domains",
        "label": "Domains and Routing",
        "folder": "domains",
        "prefix": "vercel_domains_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "functions_crons",
        "label": "Functions and Cron",
        "folder": "functions_crons",
        "prefix": "vercel_functions_crons_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "cache_isr",
        "label": "Caching and Incremental Rendering",
        "folder": "cache_isr",
        "prefix": "vercel_cache_isr_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ai_gateway",
        "label": "AI SDK and AI Gateway",
        "folder": "ai_gateway",
        "prefix": "vercel_ai_gateway_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "observability",
        "label": "Observability and Logs",
        "folder": "observability",
        "prefix": "vercel_observability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_firewall",
        "label": "Security and Firewall",
        "folder": "security_firewall",
        "prefix": "vercel_security_firewall_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "teams_billing",
        "label": "Teams and Usage",
        "folder": "teams_billing",
        "prefix": "vercel_teams_billing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/vercel-playwright-e2e.zip"
  },
  {
    "id": "langsmith",
    "label": "LangChain and LangSmith",
    "shortLabel": "LangChain and LangSmith",
    "description": "2,000 test cases across 10 LangChain and LangSmith modules.",
    "publicBase": "/LangSmith",
    "idPrefix": "LANG",
    "accent": "violet",
    "modules": [
      {
        "id": "projects_traces",
        "label": "Projects and Traces",
        "folder": "projects_traces",
        "prefix": "langsmith_projects_traces_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "prompts",
        "label": "Prompt Management",
        "folder": "prompts",
        "prefix": "langsmith_prompts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "datasets",
        "label": "Datasets and Examples",
        "folder": "datasets",
        "prefix": "langsmith_datasets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "evaluations",
        "label": "Evaluations and Experiments",
        "folder": "evaluations",
        "prefix": "langsmith_evaluations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "agents_graphs",
        "label": "Agents and Graphs",
        "folder": "agents_graphs",
        "prefix": "langsmith_agents_graphs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tools_approvals",
        "label": "Tools and Human Approval",
        "folder": "tools_approvals",
        "prefix": "langsmith_tools_approvals_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "threads_streaming",
        "label": "Threads and Streaming",
        "folder": "threads_streaming",
        "prefix": "langsmith_threads_streaming_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "models_routing",
        "label": "Models and Routing",
        "folder": "models_routing",
        "prefix": "langsmith_models_routing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_access",
        "label": "Security and Access",
        "folder": "security_access",
        "prefix": "langsmith_security_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deployment_monitoring",
        "label": "Deployment and Monitoring",
        "folder": "deployment_monitoring",
        "prefix": "langsmith_deployment_monitoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/langsmith-playwright-e2e.zip"
  },
  {
    "id": "pinecone",
    "label": "Pinecone",
    "shortLabel": "Pinecone",
    "description": "2,000 test cases across 10 Pinecone modules.",
    "publicBase": "/Pinecone",
    "idPrefix": "PINE",
    "accent": "teal",
    "modules": [
      {
        "id": "projects_indexes",
        "label": "Projects and Indexes",
        "folder": "projects_indexes",
        "prefix": "pinecone_projects_indexes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "vectors_upsert",
        "label": "Vector Upsert and Namespaces",
        "folder": "vectors_upsert",
        "prefix": "pinecone_vectors_upsert_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "query_filter",
        "label": "Similarity Search and Filters",
        "folder": "query_filter",
        "prefix": "pinecone_query_filter_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "hybrid_rerank",
        "label": "Hybrid Search and Reranking",
        "folder": "hybrid_rerank",
        "prefix": "pinecone_hybrid_rerank_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "metadata_tenants",
        "label": "Metadata and Tenancy",
        "folder": "metadata_tenants",
        "prefix": "pinecone_metadata_tenants_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ingestion",
        "label": "Ingestion and Integrations",
        "folder": "ingestion",
        "prefix": "pinecone_ingestion_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "backup_restore",
        "label": "Backup and Restore",
        "folder": "backup_restore",
        "prefix": "pinecone_backup_restore_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_access",
        "label": "Security and Access",
        "folder": "security_access",
        "prefix": "pinecone_security_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "scaling_resilience",
        "label": "Scaling and Resilience",
        "folder": "scaling_resilience",
        "prefix": "pinecone_scaling_resilience_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "usage_monitoring",
        "label": "Usage and Monitoring",
        "folder": "usage_monitoring",
        "prefix": "pinecone_usage_monitoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/pinecone-playwright-e2e.zip"
  },
  {
    "id": "huggingfacehub",
    "label": "Hugging Face Hub",
    "shortLabel": "Hugging Face Hub",
    "description": "2,000 test cases across 10 Hugging Face Hub modules.",
    "publicBase": "/HuggingFaceHub",
    "idPrefix": "HFH",
    "accent": "amber",
    "modules": [
      {
        "id": "repositories_commits",
        "label": "Repositories and Commits",
        "folder": "repositories_commits",
        "prefix": "huggingfacehub_repositories_commits_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "models_cards",
        "label": "Models and Model Cards",
        "folder": "models_cards",
        "prefix": "huggingfacehub_models_cards_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "datasets",
        "label": "Datasets and Revisions",
        "folder": "datasets",
        "prefix": "huggingfacehub_datasets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "spaces",
        "label": "Spaces and Applications",
        "folder": "spaces",
        "prefix": "huggingfacehub_spaces_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inference_endpoints",
        "label": "Inference Endpoints",
        "folder": "inference_endpoints",
        "prefix": "huggingfacehub_inference_endpoints_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "gated_licenses",
        "label": "Gated Models and Licenses",
        "folder": "gated_licenses",
        "prefix": "huggingfacehub_gated_licenses_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "organizations_tokens",
        "label": "Organizations and Tokens",
        "folder": "organizations_tokens",
        "prefix": "huggingfacehub_organizations_tokens_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inference_providers",
        "label": "Inference Providers and Routing",
        "folder": "inference_providers",
        "prefix": "huggingfacehub_inference_providers_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "collections_eval",
        "label": "Collections and Evaluation",
        "folder": "collections_eval",
        "prefix": "huggingfacehub_collections_eval_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_supply_chain",
        "label": "Security and Supply Chain",
        "folder": "security_supply_chain",
        "prefix": "huggingfacehub_security_supply_chain_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/huggingfacehub-playwright-e2e.zip"
  },
  {
    "id": "airbyte",
    "label": "Airbyte",
    "shortLabel": "Airbyte",
    "description": "2,000 test cases across 10 Airbyte modules.",
    "publicBase": "/Airbyte",
    "idPrefix": "ABY",
    "accent": "cyan",
    "modules": [
      {
        "id": "connections",
        "label": "Connections and Syncs",
        "folder": "connections",
        "prefix": "airbyte_connections_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sources",
        "label": "Sources and Discovery",
        "folder": "sources",
        "prefix": "airbyte_sources_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "destinations",
        "label": "Destinations and Writes",
        "folder": "destinations",
        "prefix": "airbyte_destinations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "streams",
        "label": "Streams and Schema",
        "folder": "streams",
        "prefix": "airbyte_streams_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "jobs",
        "label": "Jobs and Logs",
        "folder": "jobs",
        "prefix": "airbyte_jobs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "scheduling",
        "label": "Schedules and Concurrency",
        "folder": "scheduling",
        "prefix": "airbyte_scheduling_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "connector_builder",
        "label": "Connector Builder",
        "folder": "connector_builder",
        "prefix": "airbyte_connector_builder_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "state_recovery",
        "label": "State and Recovery",
        "folder": "state_recovery",
        "prefix": "airbyte_state_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "workspace_access",
        "label": "Workspace Access and Secrets",
        "folder": "workspace_access",
        "prefix": "airbyte_workspace_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api_observability",
        "label": "API and Observability",
        "folder": "api_observability",
        "prefix": "airbyte_api_observability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/airbyte-playwright-e2e.zip"
  },
  {
    "id": "apacheairflow",
    "label": "Apache Airflow",
    "shortLabel": "Apache Airflow",
    "description": "2,000 test cases across 10 Apache Airflow modules.",
    "publicBase": "/ApacheAirflow",
    "idPrefix": "AFL",
    "accent": "blue",
    "modules": [
      {
        "id": "dags",
        "label": "DAG Authoring and Parsing",
        "folder": "dags",
        "prefix": "apacheairflow_dags_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "scheduling",
        "label": "Scheduling and Timetables",
        "folder": "scheduling",
        "prefix": "apacheairflow_scheduling_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tasks",
        "label": "Tasks and Operators",
        "folder": "tasks",
        "prefix": "apacheairflow_tasks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "retries",
        "label": "Retries and Idempotence",
        "folder": "retries",
        "prefix": "apacheairflow_retries_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "backfills",
        "label": "Backfills and Data Intervals",
        "folder": "backfills",
        "prefix": "apacheairflow_backfills_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "assets",
        "label": "Data-Aware Scheduling",
        "folder": "assets",
        "prefix": "apacheairflow_assets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "connections_secrets",
        "label": "Connections and Secrets",
        "folder": "connections_secrets",
        "prefix": "apacheairflow_connections_secrets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "pools_concurrency",
        "label": "Pools and Concurrency",
        "folder": "pools_concurrency",
        "prefix": "apacheairflow_pools_concurrency_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "webserver_rbac",
        "label": "Web UI and RBAC",
        "folder": "webserver_rbac",
        "prefix": "apacheairflow_webserver_rbac_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "monitoring_deploy",
        "label": "Monitoring and Deployment",
        "folder": "monitoring_deploy",
        "prefix": "apacheairflow_monitoring_deploy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/apacheairflow-playwright-e2e.zip"
  },
  {
    "id": "prefect",
    "label": "Prefect",
    "shortLabel": "Prefect",
    "description": "2,000 test cases across 10 Prefect modules.",
    "publicBase": "/Prefect",
    "idPrefix": "PFT",
    "accent": "violet",
    "modules": [
      {
        "id": "flows_tasks",
        "label": "Flows and Tasks",
        "folder": "flows_tasks",
        "prefix": "prefect_flows_tasks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "states_retries",
        "label": "States and Retries",
        "folder": "states_retries",
        "prefix": "prefect_states_retries_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deployments",
        "label": "Deployments and Versions",
        "folder": "deployments",
        "prefix": "prefect_deployments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schedules_events",
        "label": "Schedules and Events",
        "folder": "schedules_events",
        "prefix": "prefect_schedules_events_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "work_pools",
        "label": "Work Pools and Workers",
        "folder": "work_pools",
        "prefix": "prefect_work_pools_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "blocks_secrets",
        "label": "Blocks and Secrets",
        "folder": "blocks_secrets",
        "prefix": "prefect_blocks_secrets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "concurrency_cache",
        "label": "Concurrency and Caching",
        "folder": "concurrency_cache",
        "prefix": "prefect_concurrency_cache_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "artifacts_logs",
        "label": "Artifacts and Observability",
        "folder": "artifacts_logs",
        "prefix": "prefect_artifacts_logs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integrations",
        "label": "Integrations and Task Runners",
        "folder": "integrations",
        "prefix": "prefect_integrations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_api",
        "label": "Access and API",
        "folder": "access_api",
        "prefix": "prefect_access_api_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/prefect-playwright-e2e.zip"
  },
  {
    "id": "dagster",
    "label": "Dagster",
    "shortLabel": "Dagster",
    "description": "2,000 test cases across 10 Dagster modules.",
    "publicBase": "/Dagster",
    "idPrefix": "DGS",
    "accent": "teal",
    "modules": [
      {
        "id": "assets",
        "label": "Software-Defined Assets",
        "folder": "assets",
        "prefix": "dagster_assets_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "checks",
        "label": "Asset Checks and Quality",
        "folder": "checks",
        "prefix": "dagster_checks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "jobs_ops",
        "label": "Jobs and Ops",
        "folder": "jobs_ops",
        "prefix": "dagster_jobs_ops_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "schedules_sensors",
        "label": "Schedules and Sensors",
        "folder": "schedules_sensors",
        "prefix": "dagster_schedules_sensors_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "partitions_backfills",
        "label": "Partitions and Backfills",
        "folder": "partitions_backfills",
        "prefix": "dagster_partitions_backfills_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "resources_config",
        "label": "Resources and Run Config",
        "folder": "resources_config",
        "prefix": "dagster_resources_config_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "io_managers",
        "label": "Integrations and I/O Managers",
        "folder": "io_managers",
        "prefix": "dagster_io_managers_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "code_locations",
        "label": "Code Locations and Deployments",
        "folder": "code_locations",
        "prefix": "dagster_code_locations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "runs_observability",
        "label": "Runs and Observability",
        "folder": "runs_observability",
        "prefix": "dagster_runs_observability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "permissions_api",
        "label": "Permissions and API",
        "folder": "permissions_api",
        "prefix": "dagster_permissions_api_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/dagster-playwright-e2e.zip"
  },
  {
    "id": "n8n",
    "label": "n8n",
    "shortLabel": "n8n",
    "description": "2,000 test cases across 10 n8n modules.",
    "publicBase": "/N8n",
    "idPrefix": "N8N",
    "accent": "amber",
    "modules": [
      {
        "id": "workflows",
        "label": "Workflows and Nodes",
        "folder": "workflows",
        "prefix": "n8n_workflows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "triggers_webhooks",
        "label": "Triggers and Webhooks",
        "folder": "triggers_webhooks",
        "prefix": "n8n_triggers_webhooks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "credentials",
        "label": "Credentials and Connections",
        "folder": "credentials",
        "prefix": "n8n_credentials_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "executions",
        "label": "Executions and Retries",
        "folder": "executions",
        "prefix": "n8n_executions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "error_flows",
        "label": "Error Handling and Recovery",
        "folder": "error_flows",
        "prefix": "n8n_error_flows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "queues_scaling",
        "label": "Queues and Scaling",
        "folder": "queues_scaling",
        "prefix": "n8n_queues_scaling_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "environments",
        "label": "Projects and Environments",
        "folder": "environments",
        "prefix": "n8n_environments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sharing_access",
        "label": "Sharing and Access",
        "folder": "sharing_access",
        "prefix": "n8n_sharing_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integrations",
        "label": "Integrations and Data Mapping",
        "folder": "integrations",
        "prefix": "n8n_integrations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "audit_api",
        "label": "Audit and API",
        "folder": "audit_api",
        "prefix": "n8n_audit_api_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/n8n-playwright-e2e.zip"
  },
  {
    "id": "crewai",
    "label": "CrewAI",
    "shortLabel": "CrewAI",
    "description": "2,000 test cases across 10 CrewAI modules.",
    "publicBase": "/CrewAI",
    "idPrefix": "CRW",
    "accent": "amber",
    "modules": [
      {
        "id": "agents_tasks",
        "label": "Agents and Tasks",
        "folder": "agents_tasks",
        "prefix": "crewai_agents_tasks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "crews_flows",
        "label": "Crews and Flows",
        "folder": "crews_flows",
        "prefix": "crewai_crews_flows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tools",
        "label": "Tools and Integrations",
        "folder": "tools",
        "prefix": "crewai_tools_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "memory",
        "label": "Memory and State",
        "folder": "memory",
        "prefix": "crewai_memory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "knowledge",
        "label": "Knowledge and Retrieval",
        "folder": "knowledge",
        "prefix": "crewai_knowledge_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "guardrails",
        "label": "Guardrails and Validation",
        "folder": "guardrails",
        "prefix": "crewai_guardrails_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "human_approval",
        "label": "Human Approval and Control",
        "folder": "human_approval",
        "prefix": "crewai_human_approval_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "deployment",
        "label": "Deployment and Runtime",
        "folder": "deployment",
        "prefix": "crewai_deployment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tracing_eval",
        "label": "Tracing and Evaluation",
        "folder": "tracing_eval",
        "prefix": "crewai_tracing_eval_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "enterprise_security",
        "label": "Enterprise Security and API",
        "folder": "enterprise_security",
        "prefix": "crewai_enterprise_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/crewai-playwright-e2e.zip"
  },
  {
    "id": "shopify",
    "label": "Shopify",
    "shortLabel": "Shopify",
    "description": "2,000 test cases across 10 Shopify modules.",
    "publicBase": "/Shopify",
    "idPrefix": "SHP",
    "accent": "emerald",
    "modules": [
      {
        "id": "catalog",
        "label": "Products and Catalog",
        "folder": "catalog",
        "prefix": "shopify_catalog_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inventory",
        "label": "Inventory and Locations",
        "folder": "inventory",
        "prefix": "shopify_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "checkout",
        "label": "Cart and Checkout",
        "folder": "checkout",
        "prefix": "shopify_checkout_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "orders",
        "label": "Orders and Refunds",
        "folder": "orders",
        "prefix": "shopify_orders_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payments",
        "label": "Payments and Payouts",
        "folder": "payments",
        "prefix": "shopify_payments_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "shipping",
        "label": "Shipping and Fulfillment",
        "folder": "shipping",
        "prefix": "shopify_shipping_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "discounts",
        "label": "Discounts and Promotions",
        "folder": "discounts",
        "prefix": "shopify_discounts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "customers",
        "label": "Customers and Accounts",
        "folder": "customers",
        "prefix": "shopify_customers_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "apps_webhooks",
        "label": "Apps and Webhooks",
        "folder": "apps_webhooks",
        "prefix": "shopify_apps_webhooks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "markets_analytics",
        "label": "Markets, Tax and Analytics",
        "folder": "markets_analytics",
        "prefix": "shopify_markets_analytics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/shopify-playwright-e2e.zip"
  },
  {
    "id": "stripe",
    "label": "Stripe",
    "shortLabel": "Stripe",
    "description": "2,000 test cases across 10 Stripe modules.",
    "publicBase": "/Stripe",
    "idPrefix": "STR",
    "accent": "indigo",
    "modules": [
      {
        "id": "customers_checkout",
        "label": "Customers and Checkout",
        "folder": "customers_checkout",
        "prefix": "stripe_customers_checkout_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payment_intents",
        "label": "Payment Intents and Methods",
        "folder": "payment_intents",
        "prefix": "stripe_payment_intents_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "subscriptions",
        "label": "Subscriptions and Billing",
        "folder": "subscriptions",
        "prefix": "stripe_subscriptions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "refunds_disputes",
        "label": "Refunds and Disputes",
        "folder": "refunds_disputes",
        "prefix": "stripe_refunds_disputes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "connect",
        "label": "Connect Accounts and Transfers",
        "folder": "connect",
        "prefix": "stripe_connect_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "webhooks",
        "label": "Webhooks and Events",
        "folder": "webhooks",
        "prefix": "stripe_webhooks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "invoices",
        "label": "Invoices and Revenue",
        "folder": "invoices",
        "prefix": "stripe_invoices_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tax",
        "label": "Tax Calculation and Reporting",
        "folder": "tax",
        "prefix": "stripe_tax_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "radar_risk",
        "label": "Radar and Risk Controls",
        "folder": "radar_risk",
        "prefix": "stripe_radar_risk_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "api_security",
        "label": "API Keys, Access and Reporting",
        "folder": "api_security",
        "prefix": "stripe_api_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "automationSuiteUrl": "/market-automation-suites/stripe-playwright-e2e.zip"
  },
  {
    "id": "phamagxp",
    "label": "Pharma GxP",
    "shortLabel": "Pharma GxP",
    "description": "GxP product lifecycle, batch genealogy, deviations, validation evidence, laboratory, release, and safety workflows.",
    "publicBase": "/PharmaGxP",
    "idPrefix": "PHGX",
    "accent": "violet",
    "modules": [
      {
        "id": "product_lifecycle",
        "label": "Product and Change Control",
        "folder": "product_lifecycle",
        "prefix": "phamagxp_product_lifecycle_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "gmp_batch",
        "label": "GMP Batch and Manufacturing",
        "folder": "gmp_batch",
        "prefix": "phamagxp_gmp_batch_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_deviations",
        "label": "Quality and Deviations",
        "folder": "quality_deviations",
        "prefix": "phamagxp_quality_deviations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "change_control",
        "label": "Change Control and Approvals",
        "folder": "change_control",
        "prefix": "phamagxp_change_control_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "validation",
        "label": "Validation Evidence and Traceability",
        "folder": "validation",
        "prefix": "phamagxp_validation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "documents_training",
        "label": "Documents and Training",
        "folder": "documents_training",
        "prefix": "phamagxp_documents_training_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "materials_traceability",
        "label": "Materials and Genealogy",
        "folder": "materials_traceability",
        "prefix": "phamagxp_materials_traceability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "lab_results",
        "label": "Laboratory and Stability",
        "folder": "lab_results",
        "prefix": "phamagxp_lab_results_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "release_disposition",
        "label": "Batch Release and Disposition",
        "folder": "release_disposition",
        "prefix": "phamagxp_release_disposition_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "safety_regulatory",
        "label": "Safety and Regulatory Operations",
        "folder": "safety_regulatory",
        "prefix": "phamagxp_safety_regulatory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "pharma-life-sciences",
    "automationSuiteUrl": "/market-automation-suites/phamagxp-playwright-e2e.zip"
  },
  {
    "id": "medtech",
    "label": "MedTech Device Lifecycle",
    "shortLabel": "MedTech Device Lifecycle",
    "description": "Device design controls, risk traceability, verification, complaints, field actions, manufacturing history, and supplier quality.",
    "publicBase": "/MedTech",
    "idPrefix": "MDTX",
    "accent": "rose",
    "modules": [
      {
        "id": "design_controls",
        "label": "Design Controls",
        "folder": "design_controls",
        "prefix": "medtech_design_controls_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "risk_management",
        "label": "Risk and Usability",
        "folder": "risk_management",
        "prefix": "medtech_risk_management_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "device_configuration",
        "label": "Device Configuration and BOM",
        "folder": "device_configuration",
        "prefix": "medtech_device_configuration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "verification_validation",
        "label": "Verification and Validation Evidence",
        "folder": "verification_validation",
        "prefix": "medtech_verification_validation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "complaints",
        "label": "Complaints and Service",
        "folder": "complaints",
        "prefix": "medtech_complaints_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "field_actions",
        "label": "Field Actions and Recall Readiness",
        "folder": "field_actions",
        "prefix": "medtech_field_actions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "supplier_quality",
        "label": "Supplier Quality",
        "folder": "supplier_quality",
        "prefix": "medtech_supplier_quality_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "manufacturing_dhr",
        "label": "Manufacturing and Device History",
        "folder": "manufacturing_dhr",
        "prefix": "medtech_manufacturing_dhr_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "service_calibration",
        "label": "Service and Calibration",
        "folder": "service_calibration",
        "prefix": "medtech_service_calibration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_audit",
        "label": "Access, Records and Audit",
        "folder": "access_audit",
        "prefix": "medtech_access_audit_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "medical-devices",
    "automationSuiteUrl": "/market-automation-suites/medtech-playwright-e2e.zip"
  },
  {
    "id": "healthcare-operations",
    "label": "Healthcare Operations",
    "shortLabel": "Healthcare Operations",
    "description": "Synthetic patient access, EHR interfaces, scheduling, claims, care coordination, laboratory exchange, consent, and resilience.",
    "publicBase": "/HealthcareOps",
    "idPrefix": "HCOP",
    "accent": "rose",
    "modules": [
      {
        "id": "patient_access",
        "label": "Patient Access and Registration",
        "folder": "patient_access",
        "prefix": "healthcare-operations_patient_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "scheduling_referrals",
        "label": "Scheduling and Referrals",
        "folder": "scheduling_referrals",
        "prefix": "healthcare-operations_scheduling_referrals_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ehr_workflows",
        "label": "EHR Workflow Integration",
        "folder": "ehr_workflows",
        "prefix": "healthcare-operations_ehr_workflows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "claims_revenue",
        "label": "Claims and Revenue Cycle",
        "folder": "claims_revenue",
        "prefix": "healthcare-operations_claims_revenue_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "care_coordination",
        "label": "Care Coordination and Discharge",
        "folder": "care_coordination",
        "prefix": "healthcare-operations_care_coordination_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "medication_workflows",
        "label": "Medication Workflow Interfaces",
        "folder": "medication_workflows",
        "prefix": "healthcare-operations_medication_workflows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "lab_imaging",
        "label": "Laboratory and Imaging Interfaces",
        "folder": "lab_imaging",
        "prefix": "healthcare-operations_lab_imaging_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "identity_access",
        "label": "Identity, Consent and Access",
        "folder": "identity_access",
        "prefix": "healthcare-operations_identity_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "public_health",
        "label": "Population and Public Health",
        "folder": "public_health",
        "prefix": "healthcare-operations_public_health_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "operations_observability",
        "label": "Operations and Resilience",
        "folder": "operations_observability",
        "prefix": "healthcare-operations_operations_observability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "healthcare",
    "automationSuiteUrl": "/market-automation-suites/healthcare-operations-playwright-e2e.zip"
  },
  {
    "id": "manufacturing-mes",
    "label": "Manufacturing MES",
    "shortLabel": "Manufacturing MES",
    "description": "Production dispatch, shop-floor execution, inspection, OEE, material traceability, maintenance, and ERP/MES integration.",
    "publicBase": "/ManufacturingMES",
    "idPrefix": "MFGX",
    "accent": "amber",
    "modules": [
      {
        "id": "production_orders",
        "label": "Production Orders and Dispatch",
        "folder": "production_orders",
        "prefix": "manufacturing-mes_production_orders_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "routing_bom",
        "label": "Routing and Bill of Materials",
        "folder": "routing_bom",
        "prefix": "manufacturing-mes_routing_bom_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "shop_floor",
        "label": "Shop Floor Execution",
        "folder": "shop_floor",
        "prefix": "manufacturing-mes_shop_floor_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_inspection",
        "label": "Quality and Inspection",
        "folder": "quality_inspection",
        "prefix": "manufacturing-mes_quality_inspection_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "oee_equipment",
        "label": "OEE and Equipment",
        "folder": "oee_equipment",
        "prefix": "manufacturing-mes_oee_equipment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "traceability_genealogy",
        "label": "Serialization and Genealogy",
        "folder": "traceability_genealogy",
        "prefix": "manufacturing-mes_traceability_genealogy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "warehouse_materials",
        "label": "Warehouse and Material Flow",
        "folder": "warehouse_materials",
        "prefix": "manufacturing-mes_warehouse_materials_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "maintenance",
        "label": "Maintenance and Work Orders",
        "folder": "maintenance",
        "prefix": "manufacturing-mes_maintenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "planning_scheduling",
        "label": "Planning and Scheduling",
        "folder": "planning_scheduling",
        "prefix": "manufacturing-mes_planning_scheduling_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "integration_analytics",
        "label": "Integration and Operations Analytics",
        "folder": "integration_analytics",
        "prefix": "manufacturing-mes_integration_analytics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "manufacturing",
    "automationSuiteUrl": "/market-automation-suites/manufacturing-mes-playwright-e2e.zip"
  },
  {
    "id": "defense-systems",
    "label": "Defense Program Systems",
    "shortLabel": "Defense Program Systems",
    "description": "Unclassified synthetic configuration, requirements traceability, supplier provenance, maintenance readiness, and audit workflows.",
    "publicBase": "/DefenseSystems",
    "idPrefix": "DFNS",
    "accent": "indigo",
    "modules": [
      {
        "id": "configuration_baselines",
        "label": "Configuration Baselines",
        "folder": "configuration_baselines",
        "prefix": "defense-systems_configuration_baselines_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "requirements_traceability",
        "label": "Requirements and Traceability",
        "folder": "requirements_traceability",
        "prefix": "defense-systems_requirements_traceability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "supplier_provenance",
        "label": "Supplier and Provenance",
        "folder": "supplier_provenance",
        "prefix": "defense-systems_supplier_provenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "program_schedule",
        "label": "Program Schedule and Milestones",
        "folder": "program_schedule",
        "prefix": "defense-systems_program_schedule_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "technical_data",
        "label": "Technical Data and Records",
        "folder": "technical_data",
        "prefix": "defense-systems_technical_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_nonconformance",
        "label": "Quality and Nonconformance",
        "folder": "quality_nonconformance",
        "prefix": "defense-systems_quality_nonconformance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "maintenance_readiness",
        "label": "Maintenance Readiness",
        "folder": "maintenance_readiness",
        "prefix": "defense-systems_maintenance_readiness_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "access_control",
        "label": "Access and Information Handling",
        "folder": "access_control",
        "prefix": "defense-systems_access_control_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "audit_evidence",
        "label": "Audit and Evidence",
        "folder": "audit_evidence",
        "prefix": "defense-systems_audit_evidence_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "continuity_recovery",
        "label": "Continuity and Recovery",
        "folder": "continuity_recovery",
        "prefix": "defense-systems_continuity_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "defense",
    "automationSuiteUrl": "/market-automation-suites/defense-systems-playwright-e2e.zip"
  },
  {
    "id": "industrial-automation",
    "label": "Industrial Automation and OT",
    "shortLabel": "Industrial Automation and OT",
    "description": "Digital-twin asset inventory, virtual PLC/HMI, alarms, historian events, simulated interlocks, and recovery workflows.",
    "publicBase": "/IndustrialAutomation",
    "idPrefix": "IOTA",
    "accent": "teal",
    "modules": [
      {
        "id": "asset_inventory",
        "label": "OT Asset Inventory",
        "folder": "asset_inventory",
        "prefix": "industrial-automation_asset_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "network_zones",
        "label": "Zones and Conduits",
        "folder": "network_zones",
        "prefix": "industrial-automation_network_zones_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "plc_hmi_simulation",
        "label": "PLC and HMI Digital Twin",
        "folder": "plc_hmi_simulation",
        "prefix": "industrial-automation_plc_hmi_simulation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "alarms_events",
        "label": "Alarms and Event Handling",
        "folder": "alarms_events",
        "prefix": "industrial-automation_alarms_events_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "historian_telemetry",
        "label": "Historian and Telemetry",
        "folder": "historian_telemetry",
        "prefix": "industrial-automation_historian_telemetry_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "change_deployment",
        "label": "Logic Change and Deployment",
        "folder": "change_deployment",
        "prefix": "industrial-automation_change_deployment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "safety_interlocks",
        "label": "Safety Interlocks and Fail-Safe Tests",
        "folder": "safety_interlocks",
        "prefix": "industrial-automation_safety_interlocks_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "identity_remote_access",
        "label": "Identity and Remote Access",
        "folder": "identity_remote_access",
        "prefix": "industrial-automation_identity_remote_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "backup_recovery",
        "label": "Backup and Recovery",
        "folder": "backup_recovery",
        "prefix": "industrial-automation_backup_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_monitoring",
        "label": "Security Monitoring and Response",
        "folder": "security_monitoring",
        "prefix": "industrial-automation_security_monitoring_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "industrial-automation",
    "automationSuiteUrl": "/market-automation-suites/industrial-automation-playwright-e2e.zip"
  },
  {
    "id": "cpg-operations",
    "label": "CPG and Consumer Goods",
    "shortLabel": "CPG and Consumer Goods",
    "description": "Product and packaging data, demand, trade promotions, retail execution, lot traceability, quality, and fulfillment.",
    "publicBase": "/CPGOperations",
    "idPrefix": "CPGX",
    "accent": "amber",
    "modules": [
      {
        "id": "product_master",
        "label": "Product and Packaging Master",
        "folder": "product_master",
        "prefix": "cpg-operations_product_master_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "demand_forecasting",
        "label": "Demand Planning and Forecasts",
        "folder": "demand_forecasting",
        "prefix": "cpg-operations_demand_forecasting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "trade_promotion",
        "label": "Trade Promotion and Rebates",
        "folder": "trade_promotion",
        "prefix": "cpg-operations_trade_promotion_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "retail_execution",
        "label": "Retail Execution",
        "folder": "retail_execution",
        "prefix": "cpg-operations_retail_execution_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "order_fulfillment",
        "label": "Orders and Fulfillment",
        "folder": "order_fulfillment",
        "prefix": "cpg-operations_order_fulfillment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inventory_lots",
        "label": "Inventory, Shelf Life and Lot Traceability",
        "folder": "inventory_lots",
        "prefix": "cpg-operations_inventory_lots_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_food_safety",
        "label": "Quality and Food Safety",
        "folder": "quality_food_safety",
        "prefix": "cpg-operations_quality_food_safety_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "labeling_claims",
        "label": "Labeling and Product Claims",
        "folder": "labeling_claims",
        "prefix": "cpg-operations_labeling_claims_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "supplier_sourcing",
        "label": "Supplier Sourcing and Procurement",
        "folder": "supplier_sourcing",
        "prefix": "cpg-operations_supplier_sourcing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "analytics_retail_data",
        "label": "Retail Data and Commercial Analytics",
        "folder": "analytics_retail_data",
        "prefix": "cpg-operations_analytics_retail_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "cpg",
    "automationSuiteUrl": "/market-automation-suites/cpg-operations-playwright-e2e.zip"
  },
  {
    "id": "energy-utilities",
    "label": "Energy and Utilities Operations",
    "shortLabel": "Energy and Utilities Operations",
    "description": "Synthetic metering, outage management, field work, asset maintenance, billing, distributed resources, and settlement.",
    "publicBase": "/EnergyUtilities",
    "idPrefix": "ENU",
    "accent": "amber",
    "modules": [
      {
        "id": "customer_metering",
        "label": "Customer and Metering",
        "folder": "customer_metering",
        "prefix": "energy-utilities_customer_metering_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "grid_operations",
        "label": "Grid Operations and Events",
        "folder": "grid_operations",
        "prefix": "energy-utilities_grid_operations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "outage_management",
        "label": "Outage Management",
        "folder": "outage_management",
        "prefix": "energy-utilities_outage_management_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "workforce_field_service",
        "label": "Workforce and Field Service",
        "folder": "workforce_field_service",
        "prefix": "energy-utilities_workforce_field_service_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "asset_maintenance",
        "label": "Asset Maintenance and Reliability",
        "folder": "asset_maintenance",
        "prefix": "energy-utilities_asset_maintenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "billing_settlement",
        "label": "Billing and Settlement",
        "folder": "billing_settlement",
        "prefix": "energy-utilities_billing_settlement_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "distributed_energy",
        "label": "Distributed Energy Resources",
        "folder": "distributed_energy",
        "prefix": "energy-utilities_distributed_energy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "market_transactions",
        "label": "Market Transactions and Settlement",
        "folder": "market_transactions",
        "prefix": "energy-utilities_market_transactions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "regulatory_reporting",
        "label": "Regulatory and Sustainability Reporting",
        "folder": "regulatory_reporting",
        "prefix": "energy-utilities_regulatory_reporting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "resilience_cyber",
        "label": "Resilience and Operational Security",
        "folder": "resilience_cyber",
        "prefix": "energy-utilities_resilience_cyber_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "energy-utilities",
    "automationSuiteUrl": "/market-automation-suites/energy-utilities-playwright-e2e.zip"
  },
  {
    "id": "insurance-suite",
    "label": "Insurance Operations",
    "shortLabel": "Insurance Operations",
    "description": "Policy administration, underwriting, claims, adjudication, payments, broker channels, reinsurance, and mock screening.",
    "publicBase": "/InsuranceSuite",
    "idPrefix": "INSX",
    "accent": "cyan",
    "modules": [
      {
        "id": "policy_admin",
        "label": "Policy Administration",
        "folder": "policy_admin",
        "prefix": "insurance-suite_policy_admin_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "underwriting",
        "label": "Underwriting and Risk",
        "folder": "underwriting",
        "prefix": "insurance-suite_underwriting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "claims_intake",
        "label": "Claims Intake and FNOL",
        "folder": "claims_intake",
        "prefix": "insurance-suite_claims_intake_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "adjudication",
        "label": "Claims Adjudication",
        "folder": "adjudication",
        "prefix": "insurance-suite_adjudication_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payments_recovery",
        "label": "Payments and Subrogation",
        "folder": "payments_recovery",
        "prefix": "insurance-suite_payments_recovery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "billing_collections",
        "label": "Premium Billing and Collections",
        "folder": "billing_collections",
        "prefix": "insurance-suite_billing_collections_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "customer_broker",
        "label": "Customer and Broker Channels",
        "folder": "customer_broker",
        "prefix": "insurance-suite_customer_broker_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "reinsurance",
        "label": "Reinsurance and Exposure",
        "folder": "reinsurance",
        "prefix": "insurance-suite_reinsurance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "fraud_compliance",
        "label": "Fraud, KYC and Compliance",
        "folder": "fraud_compliance",
        "prefix": "insurance-suite_fraud_compliance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "analytics_access",
        "label": "Analytics, Access and Audit",
        "folder": "analytics_access",
        "prefix": "insurance-suite_analytics_access_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "insurance",
    "automationSuiteUrl": "/market-automation-suites/insurance-suite-playwright-e2e.zip"
  },
  {
    "id": "financial-services",
    "label": "Financial Services Core",
    "shortLabel": "Financial Services Core",
    "description": "Synthetic account lifecycle, payments, ledger, lending, treasury, risk limits, AML/KYC mocks, and reporting.",
    "publicBase": "/FinancialServices",
    "idPrefix": "FINS",
    "accent": "indigo",
    "modules": [
      {
        "id": "customer_accounts",
        "label": "Customer and Account Lifecycle",
        "folder": "customer_accounts",
        "prefix": "financial-services_customer_accounts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payments_transfers",
        "label": "Payments and Transfers",
        "folder": "payments_transfers",
        "prefix": "financial-services_payments_transfers_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "ledger_reconciliation",
        "label": "Ledger and Reconciliation",
        "folder": "ledger_reconciliation",
        "prefix": "financial-services_ledger_reconciliation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "lending_credit",
        "label": "Lending and Credit",
        "folder": "lending_credit",
        "prefix": "financial-services_lending_credit_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "treasury_liquidity",
        "label": "Treasury and Liquidity",
        "folder": "treasury_liquidity",
        "prefix": "financial-services_treasury_liquidity_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "risk_limits",
        "label": "Risk and Limits",
        "folder": "risk_limits",
        "prefix": "financial-services_risk_limits_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "aml_kyc",
        "label": "AML and KYC Case Workflows",
        "folder": "aml_kyc",
        "prefix": "financial-services_aml_kyc_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "digital_channels",
        "label": "Digital Channels and Authentication",
        "folder": "digital_channels",
        "prefix": "financial-services_digital_channels_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "regulatory_reporting",
        "label": "Regulatory Reporting and Controls",
        "folder": "regulatory_reporting",
        "prefix": "financial-services_regulatory_reporting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_resilience",
        "label": "Security, Resilience and Audit",
        "folder": "security_resilience",
        "prefix": "financial-services_security_resilience_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "financial-services",
    "automationSuiteUrl": "/market-automation-suites/financial-services-playwright-e2e.zip"
  },
  {
    "id": "aerospace",
    "label": "Aerospace and MRO",
    "shortLabel": "Aerospace and MRO",
    "description": "Configuration baselines, engineering changes, MRO planning, controlled records, parts traceability, and offline simulation.",
    "publicBase": "/Aerospace",
    "idPrefix": "AERO",
    "accent": "blue",
    "modules": [
      {
        "id": "configuration_management",
        "label": "Configuration Management",
        "folder": "configuration_management",
        "prefix": "aerospace_configuration_management_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "engineering_change",
        "label": "Engineering Changes",
        "folder": "engineering_change",
        "prefix": "aerospace_engineering_change_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "mro_planning",
        "label": "MRO Planning and Work Packages",
        "folder": "mro_planning",
        "prefix": "aerospace_mro_planning_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "airworthiness_records",
        "label": "Airworthiness and Records",
        "folder": "airworthiness_records",
        "prefix": "aerospace_airworthiness_records_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "parts_supply",
        "label": "Parts and Supply Chain",
        "folder": "parts_supply",
        "prefix": "aerospace_parts_supply_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_safety",
        "label": "Quality and Safety Events",
        "folder": "quality_safety",
        "prefix": "aerospace_quality_safety_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "manufacturing_assembly",
        "label": "Manufacturing and Assembly",
        "folder": "manufacturing_assembly",
        "prefix": "aerospace_manufacturing_assembly_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "flight_test_simulation",
        "label": "Flight Test Data Simulation",
        "folder": "flight_test_simulation",
        "prefix": "aerospace_flight_test_simulation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "fleet_reliability",
        "label": "Fleet Reliability and Service Bulletins",
        "folder": "fleet_reliability",
        "prefix": "aerospace_fleet_reliability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_traceability",
        "label": "Access and Audit Traceability",
        "folder": "security_traceability",
        "prefix": "aerospace_security_traceability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "aerospace",
    "automationSuiteUrl": "/market-automation-suites/aerospace-playwright-e2e.zip"
  },
  {
    "id": "logistics-supply-chain",
    "label": "Logistics and Supply Chain",
    "shortLabel": "Logistics and Supply Chain",
    "description": "Transport planning, warehouse execution, carrier EDI, inventory visibility, tracking, returns, and supply planning.",
    "publicBase": "/LogisticsSupplyChain",
    "idPrefix": "LSCX",
    "accent": "amber",
    "modules": [
      {
        "id": "orders_transport",
        "label": "Transport Orders and Planning",
        "folder": "orders_transport",
        "prefix": "logistics-supply-chain_orders_transport_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "warehouse_execution",
        "label": "Warehouse Execution",
        "folder": "warehouse_execution",
        "prefix": "logistics-supply-chain_warehouse_execution_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "carrier_integration",
        "label": "Carrier and EDI Integration",
        "folder": "carrier_integration",
        "prefix": "logistics-supply-chain_carrier_integration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inventory_visibility",
        "label": "Inventory Visibility",
        "folder": "inventory_visibility",
        "prefix": "logistics-supply-chain_inventory_visibility_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "shipment_tracking",
        "label": "Shipment Tracking and Exceptions",
        "folder": "shipment_tracking",
        "prefix": "logistics-supply-chain_shipment_tracking_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "customs_trade",
        "label": "Customs and Trade Documents",
        "folder": "customs_trade",
        "prefix": "logistics-supply-chain_customs_trade_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "returns_reverse",
        "label": "Returns and Reverse Logistics",
        "folder": "returns_reverse",
        "prefix": "logistics-supply-chain_returns_reverse_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "supplier_collaboration",
        "label": "Supplier Collaboration",
        "folder": "supplier_collaboration",
        "prefix": "logistics-supply-chain_supplier_collaboration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "demand_sop",
        "label": "Demand and Supply Planning",
        "folder": "demand_sop",
        "prefix": "logistics-supply-chain_demand_sop_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "resilience_analytics",
        "label": "Resilience and Network Analytics",
        "folder": "resilience_analytics",
        "prefix": "logistics-supply-chain_resilience_analytics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "logistics-supply-chain",
    "automationSuiteUrl": "/market-automation-suites/logistics-supply-chain-playwright-e2e.zip"
  },
  {
    "id": "automotive-mobility",
    "label": "Automotive & Mobility",
    "shortLabel": "Automotive & Mobility",
    "description": "Vehicle programs, software update simulation, dealer operations, fleet mobility, charging, supplier traceability, and service workflows.",
    "publicBase": "/AutomotiveMobility",
    "idPrefix": "AUTOX",
    "accent": "rose",
    "modules": [
      {
        "id": "vehicle_programs",
        "label": "Vehicle Programs and Configuration",
        "folder": "vehicle_programs",
        "prefix": "automotive-mobility_vehicle_programs_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "engineering_changes",
        "label": "Engineering Change and Requirements",
        "folder": "engineering_changes",
        "prefix": "automotive-mobility_engineering_changes_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "software_update_simulation",
        "label": "Vehicle Software Update Simulation",
        "folder": "software_update_simulation",
        "prefix": "automotive-mobility_software_update_simulation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "dealer_retail",
        "label": "Dealer and Retail Operations",
        "folder": "dealer_retail",
        "prefix": "automotive-mobility_dealer_retail_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "vehicle_ordering",
        "label": "Vehicle Ordering and Fulfillment",
        "folder": "vehicle_ordering",
        "prefix": "automotive-mobility_vehicle_ordering_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "fleet_mobility",
        "label": "Fleet and Mobility Services",
        "folder": "fleet_mobility",
        "prefix": "automotive-mobility_fleet_mobility_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "charging_energy",
        "label": "Charging and Energy Services",
        "folder": "charging_energy",
        "prefix": "automotive-mobility_charging_energy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "supplier_quality",
        "label": "Supplier Quality and Parts Traceability",
        "folder": "supplier_quality",
        "prefix": "automotive-mobility_supplier_quality_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "service_warranty",
        "label": "Service and Warranty Operations",
        "folder": "service_warranty",
        "prefix": "automotive-mobility_service_warranty_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "connected_vehicle_security",
        "label": "Connected Vehicle Security and Audit",
        "folder": "connected_vehicle_security",
        "prefix": "automotive-mobility_connected_vehicle_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "automotive",
    "automationSuiteUrl": "/market-automation-suites/automotive-mobility-playwright-e2e.zip"
  },
  {
    "id": "construction-aec",
    "label": "Construction & AEC",
    "shortLabel": "Construction & AEC",
    "description": "BIM coordination, design reviews, project controls, site execution, quality inspections, submittals, and handover.",
    "publicBase": "/ConstructionAEC",
    "idPrefix": "AECX",
    "accent": "amber",
    "modules": [
      {
        "id": "bim_information",
        "label": "BIM and Information Management",
        "folder": "bim_information",
        "prefix": "construction-aec_bim_information_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "design_reviews",
        "label": "Design Review and Coordination",
        "folder": "design_reviews",
        "prefix": "construction-aec_design_reviews_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "project_controls",
        "label": "Project Controls and Scheduling",
        "folder": "project_controls",
        "prefix": "construction-aec_project_controls_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "cost_contracts",
        "label": "Cost and Contract Administration",
        "folder": "cost_contracts",
        "prefix": "construction-aec_cost_contracts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "field_execution",
        "label": "Field Execution and Daily Reports",
        "folder": "field_execution",
        "prefix": "construction-aec_field_execution_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "quality_inspections",
        "label": "Quality Inspections and Defects",
        "folder": "quality_inspections",
        "prefix": "construction-aec_quality_inspections_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "safety_environment",
        "label": "Safety and Environmental Records",
        "folder": "safety_environment",
        "prefix": "construction-aec_safety_environment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "materials_logistics",
        "label": "Materials and Site Logistics",
        "folder": "materials_logistics",
        "prefix": "construction-aec_materials_logistics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "submittals_rfis",
        "label": "Submittals and RFIs",
        "folder": "submittals_rfis",
        "prefix": "construction-aec_submittals_rfis_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "handover_facilities",
        "label": "Commissioning and Handover",
        "folder": "handover_facilities",
        "prefix": "construction-aec_handover_facilities_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "construction",
    "automationSuiteUrl": "/market-automation-suites/construction-aec-playwright-e2e.zip"
  },
  {
    "id": "travel-hospitality",
    "label": "Travel & Hospitality",
    "shortLabel": "Travel & Hospitality",
    "description": "Availability, reservations, pricing, guest services, payment mocks, loyalty, channel distribution, and disruption recovery.",
    "publicBase": "/TravelHospitality",
    "idPrefix": "TRVX",
    "accent": "cyan",
    "modules": [
      {
        "id": "availability_inventory",
        "label": "Availability and Inventory",
        "folder": "availability_inventory",
        "prefix": "travel-hospitality_availability_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "reservations",
        "label": "Reservations and Itineraries",
        "folder": "reservations",
        "prefix": "travel-hospitality_reservations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "pricing_promotions",
        "label": "Pricing and Promotions",
        "folder": "pricing_promotions",
        "prefix": "travel-hospitality_pricing_promotions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "guest_traveler_profiles",
        "label": "Guest and Traveler Profiles",
        "folder": "guest_traveler_profiles",
        "prefix": "travel-hospitality_guest_traveler_profiles_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "checkin_guest_services",
        "label": "Check-in and Guest Services",
        "folder": "checkin_guest_services",
        "prefix": "travel-hospitality_checkin_guest_services_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payments_refunds",
        "label": "Payment and Refund Mocks",
        "folder": "payments_refunds",
        "prefix": "travel-hospitality_payments_refunds_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "loyalty_membership",
        "label": "Loyalty and Membership",
        "folder": "loyalty_membership",
        "prefix": "travel-hospitality_loyalty_membership_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "distribution_channels",
        "label": "Distribution and Channel Integration",
        "folder": "distribution_channels",
        "prefix": "travel-hospitality_distribution_channels_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "cancellations_disruptions",
        "label": "Cancellations and Disruption Handling",
        "folder": "cancellations_disruptions",
        "prefix": "travel-hospitality_cancellations_disruptions_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "analytics_privacy",
        "label": "Analytics, Privacy and Access",
        "folder": "analytics_privacy",
        "prefix": "travel-hospitality_analytics_privacy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "travel-hospitality",
    "automationSuiteUrl": "/market-automation-suites/travel-hospitality-playwright-e2e.zip"
  },
  {
    "id": "agriculture-agritech",
    "label": "Agriculture & Agritech",
    "shortLabel": "Agriculture & Agritech",
    "description": "Farm and field planning, simulated sensors, equipment maintenance, input inventory, harvest traceability, and reporting.",
    "publicBase": "/AgricultureAgriTech",
    "idPrefix": "AGRX",
    "accent": "lime",
    "modules": [
      {
        "id": "field_farm_registry",
        "label": "Farm and Field Registry",
        "folder": "field_farm_registry",
        "prefix": "agriculture-agritech_field_farm_registry_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "crop_season_planning",
        "label": "Crop and Season Planning",
        "folder": "crop_season_planning",
        "prefix": "agriculture-agritech_crop_season_planning_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "equipment_maintenance",
        "label": "Equipment and Maintenance",
        "folder": "equipment_maintenance",
        "prefix": "agriculture-agritech_equipment_maintenance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "iot_sensor_data",
        "label": "IoT and Sensor Data Simulation",
        "folder": "iot_sensor_data",
        "prefix": "agriculture-agritech_iot_sensor_data_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "irrigation_water",
        "label": "Irrigation and Water Workflows",
        "folder": "irrigation_water",
        "prefix": "agriculture-agritech_irrigation_water_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "input_inventory",
        "label": "Seed, Fertilizer and Input Inventory",
        "folder": "input_inventory",
        "prefix": "agriculture-agritech_input_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "harvest_postharvest",
        "label": "Harvest and Post-harvest Operations",
        "folder": "harvest_postharvest",
        "prefix": "agriculture-agritech_harvest_postharvest_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "traceability_market",
        "label": "Traceability and Market Linkage",
        "folder": "traceability_market",
        "prefix": "agriculture-agritech_traceability_market_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "sustainability_reporting",
        "label": "Sustainability and Reporting",
        "folder": "sustainability_reporting",
        "prefix": "agriculture-agritech_sustainability_reporting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "farm_security_integrations",
        "label": "Access, Integrations and Resilience",
        "folder": "farm_security_integrations",
        "prefix": "agriculture-agritech_farm_security_integrations_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "agriculture",
    "automationSuiteUrl": "/market-automation-suites/agriculture-agritech-playwright-e2e.zip"
  },
  {
    "id": "telecom-network-ops",
    "label": "Telecom Network Operations",
    "shortLabel": "Telecom Network Operations",
    "description": "Service orchestration, simulated network inventory, usage rating, assurance, partner interfaces, change, and resilience.",
    "publicBase": "/TelecomNetworkOps",
    "idPrefix": "TELX",
    "accent": "blue",
    "modules": [
      {
        "id": "service_catalog",
        "label": "Service Catalog and Order Capture",
        "folder": "service_catalog",
        "prefix": "telecom-network-ops_service_catalog_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "network_inventory",
        "label": "Network Inventory and Topology",
        "folder": "network_inventory",
        "prefix": "telecom-network-ops_network_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "provisioning_orchestration",
        "label": "Provisioning Orchestration Simulation",
        "folder": "provisioning_orchestration",
        "prefix": "telecom-network-ops_provisioning_orchestration_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "subscriber_care",
        "label": "Subscriber Care and Case Management",
        "folder": "subscriber_care",
        "prefix": "telecom-network-ops_subscriber_care_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "usage_rating_billing",
        "label": "Usage, Rating and Billing",
        "folder": "usage_rating_billing",
        "prefix": "telecom-network-ops_usage_rating_billing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "assurance_incidents",
        "label": "Network Assurance and Incident Workflow",
        "folder": "assurance_incidents",
        "prefix": "telecom-network-ops_assurance_incidents_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "partner_interconnect",
        "label": "Partner and Interconnect Interfaces",
        "folder": "partner_interconnect",
        "prefix": "telecom-network-ops_partner_interconnect_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "network_change",
        "label": "Network Change and Maintenance Windows",
        "folder": "network_change",
        "prefix": "telecom-network-ops_network_change_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "identity_security",
        "label": "Identity, Security and Privacy",
        "folder": "identity_security",
        "prefix": "telecom-network-ops_identity_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "resilience_analytics",
        "label": "Resilience and Operations Analytics",
        "folder": "resilience_analytics",
        "prefix": "telecom-network-ops_resilience_analytics_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "telecom-network",
    "automationSuiteUrl": "/market-automation-suites/telecom-network-ops-playwright-e2e.zip"
  },
  {
    "id": "public-services",
    "label": "Public Services",
    "shortLabel": "Public Services",
    "description": "Accessible digital services, synthetic case intake, eligibility workflow, records, payment mocks, appeals, and inter-agency exchange.",
    "publicBase": "/PublicServices",
    "idPrefix": "PUBL",
    "accent": "indigo",
    "modules": [
      {
        "id": "service_catalog_accessibility",
        "label": "Digital Service Catalog and Accessibility",
        "folder": "service_catalog_accessibility",
        "prefix": "public-services_service_catalog_accessibility_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "case_intake",
        "label": "Case Intake and Triage",
        "folder": "case_intake",
        "prefix": "public-services_case_intake_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "eligibility_benefits",
        "label": "Eligibility and Benefits Workflow",
        "folder": "eligibility_benefits",
        "prefix": "public-services_eligibility_benefits_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "identity_consent",
        "label": "Identity, Consent and Delegation",
        "folder": "identity_consent",
        "prefix": "public-services_identity_consent_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "appointments_queues",
        "label": "Appointments and Queue Management",
        "folder": "appointments_queues",
        "prefix": "public-services_appointments_queues_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "documents_records",
        "label": "Documents and Records Management",
        "folder": "documents_records",
        "prefix": "public-services_documents_records_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "payments_reconciliation",
        "label": "Government Payment Mocks and Reconciliation",
        "folder": "payments_reconciliation",
        "prefix": "public-services_payments_reconciliation_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "interagency_exchange",
        "label": "Inter-agency Exchange",
        "folder": "interagency_exchange",
        "prefix": "public-services_interagency_exchange_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "appeals_communications",
        "label": "Appeals and Case Communications",
        "folder": "appeals_communications",
        "prefix": "public-services_appeals_communications_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "transparency_security",
        "label": "Transparency, Security and Audit",
        "folder": "transparency_security",
        "prefix": "public-services_transparency_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "public-sector",
    "automationSuiteUrl": "/market-automation-suites/public-services-playwright-e2e.zip"
  },
  {
    "id": "education-research",
    "label": "Education & Research Systems",
    "shortLabel": "Education & Research Systems",
    "description": "Admissions, learner records, accessible learning, assessments, grants, lab assets, reproducible data, and publication workflows.",
    "publicBase": "/EducationResearch",
    "idPrefix": "EDUX",
    "accent": "violet",
    "modules": [
      {
        "id": "admissions_enrollment",
        "label": "Admissions and Enrollment",
        "folder": "admissions_enrollment",
        "prefix": "education-research_admissions_enrollment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "learner_information",
        "label": "Learner Information and Records",
        "folder": "learner_information",
        "prefix": "education-research_learner_information_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "learning_delivery",
        "label": "Learning Delivery and Accessibility",
        "folder": "learning_delivery",
        "prefix": "education-research_learning_delivery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "assessment_credentials",
        "label": "Assessment and Credentials",
        "folder": "assessment_credentials",
        "prefix": "education-research_assessment_credentials_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "research_projects",
        "label": "Research Project Administration",
        "folder": "research_projects",
        "prefix": "education-research_research_projects_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "grants_funding",
        "label": "Grants and Funding",
        "folder": "grants_funding",
        "prefix": "education-research_grants_funding_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "lab_inventory",
        "label": "Laboratory and Research Assets",
        "folder": "lab_inventory",
        "prefix": "education-research_lab_inventory_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "research_data_lineage",
        "label": "Research Data and Reproducibility",
        "folder": "research_data_lineage",
        "prefix": "education-research_research_data_lineage_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "publication_review",
        "label": "Publication and Collaboration",
        "folder": "publication_review",
        "prefix": "education-research_publication_review_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "privacy_security_interoperability",
        "label": "Privacy, Security and Interoperability",
        "folder": "privacy_security_interoperability",
        "prefix": "education-research_privacy_security_interoperability_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "education-research",
    "automationSuiteUrl": "/market-automation-suites/education-research-playwright-e2e.zip"
  },
  {
    "id": "media-entertainment",
    "label": "Media & Entertainment",
    "shortLabel": "Media & Entertainment",
    "description": "Content ingest, editorial, rights, production, media delivery, publishing, subscriptions, accessibility, and analytics.",
    "publicBase": "/MediaEntertainment",
    "idPrefix": "MEDX",
    "accent": "violet",
    "modules": [
      {
        "id": "content_ingest",
        "label": "Content Ingest and Metadata",
        "folder": "content_ingest",
        "prefix": "media-entertainment_content_ingest_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "editorial_workflow",
        "label": "Editorial Planning and Review",
        "folder": "editorial_workflow",
        "prefix": "media-entertainment_editorial_workflow_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "rights_licensing",
        "label": "Rights and Licensing",
        "folder": "rights_licensing",
        "prefix": "media-entertainment_rights_licensing_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "production_workflows",
        "label": "Production and Post-production",
        "folder": "production_workflows",
        "prefix": "media-entertainment_production_workflows_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "media_processing_delivery",
        "label": "Media Processing and Delivery",
        "folder": "media_processing_delivery",
        "prefix": "media-entertainment_media_processing_delivery_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "publishing_channels",
        "label": "Publishing and Channel Operations",
        "folder": "publishing_channels",
        "prefix": "media-entertainment_publishing_channels_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "subscriptions_monetization",
        "label": "Subscriptions and Monetization Mocks",
        "folder": "subscriptions_monetization",
        "prefix": "media-entertainment_subscriptions_monetization_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "audience_community",
        "label": "Audience and Community Operations",
        "folder": "audience_community",
        "prefix": "media-entertainment_audience_community_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "accessibility_localization",
        "label": "Accessibility and Localization",
        "folder": "accessibility_localization",
        "prefix": "media-entertainment_accessibility_localization_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "analytics_security",
        "label": "Analytics, Security and Resilience",
        "folder": "analytics_security",
        "prefix": "media-entertainment_analytics_security_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "media-content",
    "automationSuiteUrl": "/market-automation-suites/media-entertainment-playwright-e2e.zip"
  },
  {
    "id": "real-estate-facilities",
    "label": "Real Estate & Facilities",
    "shortLabel": "Real Estate & Facilities",
    "description": "Property portfolios, leasing, facilities work orders, inspections, occupancy, utilities, vendors, and capital projects.",
    "publicBase": "/RealEstateFacilities",
    "idPrefix": "REFX",
    "accent": "teal",
    "modules": [
      {
        "id": "property_portfolio",
        "label": "Property Portfolio and Asset Register",
        "folder": "property_portfolio",
        "prefix": "real-estate-facilities_property_portfolio_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "leasing_tenants",
        "label": "Leasing and Tenant Operations",
        "folder": "leasing_tenants",
        "prefix": "real-estate-facilities_leasing_tenants_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "work_orders_facilities",
        "label": "Facilities and Work Order Management",
        "folder": "work_orders_facilities",
        "prefix": "real-estate-facilities_work_orders_facilities_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "inspections_compliance",
        "label": "Inspections and Compliance Records",
        "folder": "inspections_compliance",
        "prefix": "real-estate-facilities_inspections_compliance_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "space_occupancy",
        "label": "Space and Occupancy Planning",
        "folder": "space_occupancy",
        "prefix": "real-estate-facilities_space_occupancy_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "utilities_environment",
        "label": "Utilities and Environmental Monitoring",
        "folder": "utilities_environment",
        "prefix": "real-estate-facilities_utilities_environment_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "vendor_contracts",
        "label": "Vendor and Contract Management",
        "folder": "vendor_contracts",
        "prefix": "real-estate-facilities_vendor_contracts_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "capital_projects",
        "label": "Capital Projects and Renovations",
        "folder": "capital_projects",
        "prefix": "real-estate-facilities_capital_projects_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "tenant_portal_communications",
        "label": "Tenant Portal and Communications",
        "folder": "tenant_portal_communications",
        "prefix": "real-estate-facilities_tenant_portal_communications_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      },
      {
        "id": "security_resilience_reporting",
        "label": "Security, Resilience and Portfolio Reporting",
        "folder": "security_resilience_reporting",
        "prefix": "real-estate-facilities_security_resilience_reporting_suite",
        "formats": [
          "csv",
          "json",
          "ts"
        ]
      }
    ],
    "industryDomain": "real-estate",
    "automationSuiteUrl": "/market-automation-suites/real-estate-facilities-playwright-e2e.zip"
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
    "idPrefix": "SNOW",
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
  },
  {
    "key": "microsoftfabric",
    "label": "Microsoft Fabric",
    "shortLabel": "Microsoft Fabric",
    "description": "2,000 test cases across 10 Microsoft Fabric modules.",
    "route": "/p/microsoftfabric",
    "kind": "spa",
    "modules": [
      "Workspaces and Roles",
      "OneLake and Shortcuts",
      "Data Factory Pipelines",
      "Lakehouse and Spark",
      "Warehouse and SQL",
      "Power BI Semantic Models",
      "Real-Time Intelligence",
      "Data Science and ML",
      "Governance and Lineage",
      "Capacity and Operations"
    ],
    "idPrefix": "FAB",
    "accent": "blue"
  },
  {
    "key": "dbt",
    "label": "dbt",
    "shortLabel": "dbt",
    "description": "2,000 test cases across 10 dbt modules.",
    "route": "/p/dbt",
    "kind": "spa",
    "modules": [
      "Projects and Git",
      "Models and SQL",
      "Tests and Contracts",
      "Snapshots and History",
      "Documentation and Lineage",
      "Jobs and Environments",
      "CI and Pull Request Checks",
      "Metrics and Semantic Layer",
      "Access and Audit",
      "Adapters and Packages"
    ],
    "idPrefix": "DBT",
    "accent": "amber"
  },
  {
    "key": "confluentcloud",
    "label": "Confluent Cloud",
    "shortLabel": "Confluent Cloud",
    "description": "2,000 test cases across 10 Confluent Cloud modules.",
    "route": "/p/confluentcloud",
    "kind": "spa",
    "modules": [
      "Clusters and Networking",
      "Topics and Partitions",
      "Schema Registry",
      "Connectors and Integrations",
      "Clients and Consumer Groups",
      "Flink and Stream Processing",
      "Stream Governance and Lineage",
      "RBAC, ACLs, and Audit",
      "Replication and Disaster Recovery",
      "Monitoring and Cost"
    ],
    "idPrefix": "CFLT",
    "accent": "cyan"
  },
  {
    "key": "mongodb-atlas",
    "label": "MongoDB Atlas",
    "shortLabel": "MongoDB Atlas",
    "description": "2,000 test cases across 10 MongoDB Atlas modules.",
    "route": "/p/mongodb-atlas",
    "kind": "spa",
    "modules": [
      "Projects and Clusters",
      "Databases and Collections",
      "Indexes, Search, and Vector",
      "Aggregation and Query",
      "Change Streams and Triggers",
      "Backup and Restore",
      "Security and Networking",
      "Governance and Audit",
      "App Services and APIs",
      "Monitoring and Performance"
    ],
    "idPrefix": "MDBA",
    "accent": "emerald"
  },
  {
    "key": "fivetran",
    "label": "Fivetran",
    "shortLabel": "Fivetran",
    "description": "2,000 test cases across 10 Fivetran modules.",
    "route": "/p/fivetran",
    "kind": "spa",
    "modules": [
      "Connectors and Sources",
      "Destinations and Targets",
      "Syncs and CDC",
      "Schema Drift and Evolution",
      "Transformations and dbt",
      "Orchestration and Scheduling",
      "Data Quality and Alerts",
      "Access, Secrets, and Audit",
      "History and Recovery",
      "Usage and Billing"
    ],
    "idPrefix": "FVT",
    "accent": "violet"
  },
  {
    "key": "supabase-platform",
    "label": "Supabase",
    "shortLabel": "Supabase",
    "description": "2,000 test cases across 10 Supabase modules.",
    "route": "/p/supabase-platform",
    "kind": "spa",
    "modules": [
      "Projects and Postgres",
      "Auth and Row-Level Security",
      "Realtime and Broadcast",
      "Storage and Buckets",
      "Edge Functions",
      "Migrations and Branching",
      "API Keys and Access",
      "Backups and Recovery",
      "Logs and Observability",
      "Integrations and Deployment"
    ],
    "idPrefix": "SUPA",
    "accent": "emerald"
  },
  {
    "key": "vercel",
    "label": "Vercel",
    "shortLabel": "Vercel",
    "description": "2,000 test cases across 10 Vercel modules.",
    "route": "/p/vercel",
    "kind": "spa",
    "modules": [
      "Projects and Git",
      "Deployments and Promotion",
      "Environment Variables and Secrets",
      "Domains and Routing",
      "Functions and Cron",
      "Caching and Incremental Rendering",
      "AI SDK and AI Gateway",
      "Observability and Logs",
      "Security and Firewall",
      "Teams and Usage"
    ],
    "idPrefix": "VERC",
    "accent": "indigo"
  },
  {
    "key": "langsmith",
    "label": "LangChain and LangSmith",
    "shortLabel": "LangChain and LangSmith",
    "description": "2,000 test cases across 10 LangChain and LangSmith modules.",
    "route": "/p/langsmith",
    "kind": "spa",
    "modules": [
      "Projects and Traces",
      "Prompt Management",
      "Datasets and Examples",
      "Evaluations and Experiments",
      "Agents and Graphs",
      "Tools and Human Approval",
      "Threads and Streaming",
      "Models and Routing",
      "Security and Access",
      "Deployment and Monitoring"
    ],
    "idPrefix": "LANG",
    "accent": "violet"
  },
  {
    "key": "pinecone",
    "label": "Pinecone",
    "shortLabel": "Pinecone",
    "description": "2,000 test cases across 10 Pinecone modules.",
    "route": "/p/pinecone",
    "kind": "spa",
    "modules": [
      "Projects and Indexes",
      "Vector Upsert and Namespaces",
      "Similarity Search and Filters",
      "Hybrid Search and Reranking",
      "Metadata and Tenancy",
      "Ingestion and Integrations",
      "Backup and Restore",
      "Security and Access",
      "Scaling and Resilience",
      "Usage and Monitoring"
    ],
    "idPrefix": "PINE",
    "accent": "teal"
  },
  {
    "key": "huggingfacehub",
    "label": "Hugging Face Hub",
    "shortLabel": "Hugging Face Hub",
    "description": "2,000 test cases across 10 Hugging Face Hub modules.",
    "route": "/p/huggingfacehub",
    "kind": "spa",
    "modules": [
      "Repositories and Commits",
      "Models and Model Cards",
      "Datasets and Revisions",
      "Spaces and Applications",
      "Inference Endpoints",
      "Gated Models and Licenses",
      "Organizations and Tokens",
      "Inference Providers and Routing",
      "Collections and Evaluation",
      "Security and Supply Chain"
    ],
    "idPrefix": "HFH",
    "accent": "amber"
  },
  {
    "key": "airbyte",
    "label": "Airbyte",
    "shortLabel": "Airbyte",
    "description": "2,000 test cases across 10 Airbyte modules.",
    "route": "/p/airbyte",
    "kind": "spa",
    "modules": [
      "Connections and Syncs",
      "Sources and Discovery",
      "Destinations and Writes",
      "Streams and Schema",
      "Jobs and Logs",
      "Schedules and Concurrency",
      "Connector Builder",
      "State and Recovery",
      "Workspace Access and Secrets",
      "API and Observability"
    ],
    "idPrefix": "ABY",
    "accent": "cyan"
  },
  {
    "key": "apacheairflow",
    "label": "Apache Airflow",
    "shortLabel": "Apache Airflow",
    "description": "2,000 test cases across 10 Apache Airflow modules.",
    "route": "/p/apacheairflow",
    "kind": "spa",
    "modules": [
      "DAG Authoring and Parsing",
      "Scheduling and Timetables",
      "Tasks and Operators",
      "Retries and Idempotence",
      "Backfills and Data Intervals",
      "Data-Aware Scheduling",
      "Connections and Secrets",
      "Pools and Concurrency",
      "Web UI and RBAC",
      "Monitoring and Deployment"
    ],
    "idPrefix": "AFL",
    "accent": "blue"
  },
  {
    "key": "prefect",
    "label": "Prefect",
    "shortLabel": "Prefect",
    "description": "2,000 test cases across 10 Prefect modules.",
    "route": "/p/prefect",
    "kind": "spa",
    "modules": [
      "Flows and Tasks",
      "States and Retries",
      "Deployments and Versions",
      "Schedules and Events",
      "Work Pools and Workers",
      "Blocks and Secrets",
      "Concurrency and Caching",
      "Artifacts and Observability",
      "Integrations and Task Runners",
      "Access and API"
    ],
    "idPrefix": "PFT",
    "accent": "violet"
  },
  {
    "key": "dagster",
    "label": "Dagster",
    "shortLabel": "Dagster",
    "description": "2,000 test cases across 10 Dagster modules.",
    "route": "/p/dagster",
    "kind": "spa",
    "modules": [
      "Software-Defined Assets",
      "Asset Checks and Quality",
      "Jobs and Ops",
      "Schedules and Sensors",
      "Partitions and Backfills",
      "Resources and Run Config",
      "Integrations and I/O Managers",
      "Code Locations and Deployments",
      "Runs and Observability",
      "Permissions and API"
    ],
    "idPrefix": "DGS",
    "accent": "teal"
  },
  {
    "key": "n8n",
    "label": "n8n",
    "shortLabel": "n8n",
    "description": "2,000 test cases across 10 n8n modules.",
    "route": "/p/n8n",
    "kind": "spa",
    "modules": [
      "Workflows and Nodes",
      "Triggers and Webhooks",
      "Credentials and Connections",
      "Executions and Retries",
      "Error Handling and Recovery",
      "Queues and Scaling",
      "Projects and Environments",
      "Sharing and Access",
      "Integrations and Data Mapping",
      "Audit and API"
    ],
    "idPrefix": "N8N",
    "accent": "amber"
  },
  {
    "key": "crewai",
    "label": "CrewAI",
    "shortLabel": "CrewAI",
    "description": "2,000 test cases across 10 CrewAI modules.",
    "route": "/p/crewai",
    "kind": "spa",
    "modules": [
      "Agents and Tasks",
      "Crews and Flows",
      "Tools and Integrations",
      "Memory and State",
      "Knowledge and Retrieval",
      "Guardrails and Validation",
      "Human Approval and Control",
      "Deployment and Runtime",
      "Tracing and Evaluation",
      "Enterprise Security and API"
    ],
    "idPrefix": "CRW",
    "accent": "amber"
  },
  {
    "key": "shopify",
    "label": "Shopify",
    "shortLabel": "Shopify",
    "description": "2,000 test cases across 10 Shopify modules.",
    "route": "/p/shopify",
    "kind": "spa",
    "modules": [
      "Products and Catalog",
      "Inventory and Locations",
      "Cart and Checkout",
      "Orders and Refunds",
      "Payments and Payouts",
      "Shipping and Fulfillment",
      "Discounts and Promotions",
      "Customers and Accounts",
      "Apps and Webhooks",
      "Markets, Tax and Analytics"
    ],
    "idPrefix": "SHP",
    "accent": "emerald"
  },
  {
    "key": "stripe",
    "label": "Stripe",
    "shortLabel": "Stripe",
    "description": "2,000 test cases across 10 Stripe modules.",
    "route": "/p/stripe",
    "kind": "spa",
    "modules": [
      "Customers and Checkout",
      "Payment Intents and Methods",
      "Subscriptions and Billing",
      "Refunds and Disputes",
      "Connect Accounts and Transfers",
      "Webhooks and Events",
      "Invoices and Revenue",
      "Tax Calculation and Reporting",
      "Radar and Risk Controls",
      "API Keys, Access and Reporting"
    ],
    "idPrefix": "STR",
    "accent": "indigo"
  },
  {
    "key": "phamagxp",
    "label": "Pharma GxP",
    "shortLabel": "Pharma GxP",
    "description": "GxP product lifecycle, batch genealogy, deviations, validation evidence, laboratory, release, and safety workflows.",
    "route": "/p/phamagxp",
    "kind": "spa",
    "modules": [
      "Product and Change Control",
      "GMP Batch and Manufacturing",
      "Quality and Deviations",
      "Change Control and Approvals",
      "Validation Evidence and Traceability",
      "Documents and Training",
      "Materials and Genealogy",
      "Laboratory and Stability",
      "Batch Release and Disposition",
      "Safety and Regulatory Operations"
    ],
    "idPrefix": "PHGX",
    "accent": "violet",
    "industryDomain": "pharma-life-sciences"
  },
  {
    "key": "medtech",
    "label": "MedTech Device Lifecycle",
    "shortLabel": "MedTech Device Lifecycle",
    "description": "Device design controls, risk traceability, verification, complaints, field actions, manufacturing history, and supplier quality.",
    "route": "/p/medtech",
    "kind": "spa",
    "modules": [
      "Design Controls",
      "Risk and Usability",
      "Device Configuration and BOM",
      "Verification and Validation Evidence",
      "Complaints and Service",
      "Field Actions and Recall Readiness",
      "Supplier Quality",
      "Manufacturing and Device History",
      "Service and Calibration",
      "Access, Records and Audit"
    ],
    "idPrefix": "MDTX",
    "accent": "rose",
    "industryDomain": "medical-devices"
  },
  {
    "key": "healthcare-operations",
    "label": "Healthcare Operations",
    "shortLabel": "Healthcare Operations",
    "description": "Synthetic patient access, EHR interfaces, scheduling, claims, care coordination, laboratory exchange, consent, and resilience.",
    "route": "/p/healthcare-operations",
    "kind": "spa",
    "modules": [
      "Patient Access and Registration",
      "Scheduling and Referrals",
      "EHR Workflow Integration",
      "Claims and Revenue Cycle",
      "Care Coordination and Discharge",
      "Medication Workflow Interfaces",
      "Laboratory and Imaging Interfaces",
      "Identity, Consent and Access",
      "Population and Public Health",
      "Operations and Resilience"
    ],
    "idPrefix": "HCOP",
    "accent": "rose",
    "industryDomain": "healthcare"
  },
  {
    "key": "manufacturing-mes",
    "label": "Manufacturing MES",
    "shortLabel": "Manufacturing MES",
    "description": "Production dispatch, shop-floor execution, inspection, OEE, material traceability, maintenance, and ERP/MES integration.",
    "route": "/p/manufacturing-mes",
    "kind": "spa",
    "modules": [
      "Production Orders and Dispatch",
      "Routing and Bill of Materials",
      "Shop Floor Execution",
      "Quality and Inspection",
      "OEE and Equipment",
      "Serialization and Genealogy",
      "Warehouse and Material Flow",
      "Maintenance and Work Orders",
      "Planning and Scheduling",
      "Integration and Operations Analytics"
    ],
    "idPrefix": "MFGX",
    "accent": "amber",
    "industryDomain": "manufacturing"
  },
  {
    "key": "defense-systems",
    "label": "Defense Program Systems",
    "shortLabel": "Defense Program Systems",
    "description": "Unclassified synthetic configuration, requirements traceability, supplier provenance, maintenance readiness, and audit workflows.",
    "route": "/p/defense-systems",
    "kind": "spa",
    "modules": [
      "Configuration Baselines",
      "Requirements and Traceability",
      "Supplier and Provenance",
      "Program Schedule and Milestones",
      "Technical Data and Records",
      "Quality and Nonconformance",
      "Maintenance Readiness",
      "Access and Information Handling",
      "Audit and Evidence",
      "Continuity and Recovery"
    ],
    "idPrefix": "DFNS",
    "accent": "indigo",
    "industryDomain": "defense"
  },
  {
    "key": "industrial-automation",
    "label": "Industrial Automation and OT",
    "shortLabel": "Industrial Automation and OT",
    "description": "Digital-twin asset inventory, virtual PLC/HMI, alarms, historian events, simulated interlocks, and recovery workflows.",
    "route": "/p/industrial-automation",
    "kind": "spa",
    "modules": [
      "OT Asset Inventory",
      "Zones and Conduits",
      "PLC and HMI Digital Twin",
      "Alarms and Event Handling",
      "Historian and Telemetry",
      "Logic Change and Deployment",
      "Safety Interlocks and Fail-Safe Tests",
      "Identity and Remote Access",
      "Backup and Recovery",
      "Security Monitoring and Response"
    ],
    "idPrefix": "IOTA",
    "accent": "teal",
    "industryDomain": "industrial-automation"
  },
  {
    "key": "cpg-operations",
    "label": "CPG and Consumer Goods",
    "shortLabel": "CPG and Consumer Goods",
    "description": "Product and packaging data, demand, trade promotions, retail execution, lot traceability, quality, and fulfillment.",
    "route": "/p/cpg-operations",
    "kind": "spa",
    "modules": [
      "Product and Packaging Master",
      "Demand Planning and Forecasts",
      "Trade Promotion and Rebates",
      "Retail Execution",
      "Orders and Fulfillment",
      "Inventory, Shelf Life and Lot Traceability",
      "Quality and Food Safety",
      "Labeling and Product Claims",
      "Supplier Sourcing and Procurement",
      "Retail Data and Commercial Analytics"
    ],
    "idPrefix": "CPGX",
    "accent": "amber",
    "industryDomain": "cpg"
  },
  {
    "key": "energy-utilities",
    "label": "Energy and Utilities Operations",
    "shortLabel": "Energy and Utilities Operations",
    "description": "Synthetic metering, outage management, field work, asset maintenance, billing, distributed resources, and settlement.",
    "route": "/p/energy-utilities",
    "kind": "spa",
    "modules": [
      "Customer and Metering",
      "Grid Operations and Events",
      "Outage Management",
      "Workforce and Field Service",
      "Asset Maintenance and Reliability",
      "Billing and Settlement",
      "Distributed Energy Resources",
      "Market Transactions and Settlement",
      "Regulatory and Sustainability Reporting",
      "Resilience and Operational Security"
    ],
    "idPrefix": "ENU",
    "accent": "amber",
    "industryDomain": "energy-utilities"
  },
  {
    "key": "insurance-suite",
    "label": "Insurance Operations",
    "shortLabel": "Insurance Operations",
    "description": "Policy administration, underwriting, claims, adjudication, payments, broker channels, reinsurance, and mock screening.",
    "route": "/p/insurance-suite",
    "kind": "spa",
    "modules": [
      "Policy Administration",
      "Underwriting and Risk",
      "Claims Intake and FNOL",
      "Claims Adjudication",
      "Payments and Subrogation",
      "Premium Billing and Collections",
      "Customer and Broker Channels",
      "Reinsurance and Exposure",
      "Fraud, KYC and Compliance",
      "Analytics, Access and Audit"
    ],
    "idPrefix": "INSX",
    "accent": "cyan",
    "industryDomain": "insurance"
  },
  {
    "key": "financial-services",
    "label": "Financial Services Core",
    "shortLabel": "Financial Services Core",
    "description": "Synthetic account lifecycle, payments, ledger, lending, treasury, risk limits, AML/KYC mocks, and reporting.",
    "route": "/p/financial-services",
    "kind": "spa",
    "modules": [
      "Customer and Account Lifecycle",
      "Payments and Transfers",
      "Ledger and Reconciliation",
      "Lending and Credit",
      "Treasury and Liquidity",
      "Risk and Limits",
      "AML and KYC Case Workflows",
      "Digital Channels and Authentication",
      "Regulatory Reporting and Controls",
      "Security, Resilience and Audit"
    ],
    "idPrefix": "FINS",
    "accent": "indigo",
    "industryDomain": "financial-services"
  },
  {
    "key": "aerospace",
    "label": "Aerospace and MRO",
    "shortLabel": "Aerospace and MRO",
    "description": "Configuration baselines, engineering changes, MRO planning, controlled records, parts traceability, and offline simulation.",
    "route": "/p/aerospace",
    "kind": "spa",
    "modules": [
      "Configuration Management",
      "Engineering Changes",
      "MRO Planning and Work Packages",
      "Airworthiness and Records",
      "Parts and Supply Chain",
      "Quality and Safety Events",
      "Manufacturing and Assembly",
      "Flight Test Data Simulation",
      "Fleet Reliability and Service Bulletins",
      "Access and Audit Traceability"
    ],
    "idPrefix": "AERO",
    "accent": "blue",
    "industryDomain": "aerospace"
  },
  {
    "key": "logistics-supply-chain",
    "label": "Logistics and Supply Chain",
    "shortLabel": "Logistics and Supply Chain",
    "description": "Transport planning, warehouse execution, carrier EDI, inventory visibility, tracking, returns, and supply planning.",
    "route": "/p/logistics-supply-chain",
    "kind": "spa",
    "modules": [
      "Transport Orders and Planning",
      "Warehouse Execution",
      "Carrier and EDI Integration",
      "Inventory Visibility",
      "Shipment Tracking and Exceptions",
      "Customs and Trade Documents",
      "Returns and Reverse Logistics",
      "Supplier Collaboration",
      "Demand and Supply Planning",
      "Resilience and Network Analytics"
    ],
    "idPrefix": "LSCX",
    "accent": "amber",
    "industryDomain": "logistics-supply-chain"
  },
  {
    "key": "automotive-mobility",
    "label": "Automotive & Mobility",
    "shortLabel": "Automotive & Mobility",
    "description": "Vehicle programs, software update simulation, dealer operations, fleet mobility, charging, supplier traceability, and service workflows.",
    "route": "/p/automotive-mobility",
    "kind": "spa",
    "modules": [
      "Vehicle Programs and Configuration",
      "Engineering Change and Requirements",
      "Vehicle Software Update Simulation",
      "Dealer and Retail Operations",
      "Vehicle Ordering and Fulfillment",
      "Fleet and Mobility Services",
      "Charging and Energy Services",
      "Supplier Quality and Parts Traceability",
      "Service and Warranty Operations",
      "Connected Vehicle Security and Audit"
    ],
    "idPrefix": "AUTOX",
    "accent": "rose",
    "industryDomain": "automotive"
  },
  {
    "key": "construction-aec",
    "label": "Construction & AEC",
    "shortLabel": "Construction & AEC",
    "description": "BIM coordination, design reviews, project controls, site execution, quality inspections, submittals, and handover.",
    "route": "/p/construction-aec",
    "kind": "spa",
    "modules": [
      "BIM and Information Management",
      "Design Review and Coordination",
      "Project Controls and Scheduling",
      "Cost and Contract Administration",
      "Field Execution and Daily Reports",
      "Quality Inspections and Defects",
      "Safety and Environmental Records",
      "Materials and Site Logistics",
      "Submittals and RFIs",
      "Commissioning and Handover"
    ],
    "idPrefix": "AECX",
    "accent": "amber",
    "industryDomain": "construction"
  },
  {
    "key": "travel-hospitality",
    "label": "Travel & Hospitality",
    "shortLabel": "Travel & Hospitality",
    "description": "Availability, reservations, pricing, guest services, payment mocks, loyalty, channel distribution, and disruption recovery.",
    "route": "/p/travel-hospitality",
    "kind": "spa",
    "modules": [
      "Availability and Inventory",
      "Reservations and Itineraries",
      "Pricing and Promotions",
      "Guest and Traveler Profiles",
      "Check-in and Guest Services",
      "Payment and Refund Mocks",
      "Loyalty and Membership",
      "Distribution and Channel Integration",
      "Cancellations and Disruption Handling",
      "Analytics, Privacy and Access"
    ],
    "idPrefix": "TRVX",
    "accent": "cyan",
    "industryDomain": "travel-hospitality"
  },
  {
    "key": "agriculture-agritech",
    "label": "Agriculture & Agritech",
    "shortLabel": "Agriculture & Agritech",
    "description": "Farm and field planning, simulated sensors, equipment maintenance, input inventory, harvest traceability, and reporting.",
    "route": "/p/agriculture-agritech",
    "kind": "spa",
    "modules": [
      "Farm and Field Registry",
      "Crop and Season Planning",
      "Equipment and Maintenance",
      "IoT and Sensor Data Simulation",
      "Irrigation and Water Workflows",
      "Seed, Fertilizer and Input Inventory",
      "Harvest and Post-harvest Operations",
      "Traceability and Market Linkage",
      "Sustainability and Reporting",
      "Access, Integrations and Resilience"
    ],
    "idPrefix": "AGRX",
    "accent": "lime",
    "industryDomain": "agriculture"
  },
  {
    "key": "telecom-network-ops",
    "label": "Telecom Network Operations",
    "shortLabel": "Telecom Network Operations",
    "description": "Service orchestration, simulated network inventory, usage rating, assurance, partner interfaces, change, and resilience.",
    "route": "/p/telecom-network-ops",
    "kind": "spa",
    "modules": [
      "Service Catalog and Order Capture",
      "Network Inventory and Topology",
      "Provisioning Orchestration Simulation",
      "Subscriber Care and Case Management",
      "Usage, Rating and Billing",
      "Network Assurance and Incident Workflow",
      "Partner and Interconnect Interfaces",
      "Network Change and Maintenance Windows",
      "Identity, Security and Privacy",
      "Resilience and Operations Analytics"
    ],
    "idPrefix": "TELX",
    "accent": "blue",
    "industryDomain": "telecom-network"
  },
  {
    "key": "public-services",
    "label": "Public Services",
    "shortLabel": "Public Services",
    "description": "Accessible digital services, synthetic case intake, eligibility workflow, records, payment mocks, appeals, and inter-agency exchange.",
    "route": "/p/public-services",
    "kind": "spa",
    "modules": [
      "Digital Service Catalog and Accessibility",
      "Case Intake and Triage",
      "Eligibility and Benefits Workflow",
      "Identity, Consent and Delegation",
      "Appointments and Queue Management",
      "Documents and Records Management",
      "Government Payment Mocks and Reconciliation",
      "Inter-agency Exchange",
      "Appeals and Case Communications",
      "Transparency, Security and Audit"
    ],
    "idPrefix": "PUBL",
    "accent": "indigo",
    "industryDomain": "public-sector"
  },
  {
    "key": "education-research",
    "label": "Education & Research Systems",
    "shortLabel": "Education & Research Systems",
    "description": "Admissions, learner records, accessible learning, assessments, grants, lab assets, reproducible data, and publication workflows.",
    "route": "/p/education-research",
    "kind": "spa",
    "modules": [
      "Admissions and Enrollment",
      "Learner Information and Records",
      "Learning Delivery and Accessibility",
      "Assessment and Credentials",
      "Research Project Administration",
      "Grants and Funding",
      "Laboratory and Research Assets",
      "Research Data and Reproducibility",
      "Publication and Collaboration",
      "Privacy, Security and Interoperability"
    ],
    "idPrefix": "EDUX",
    "accent": "violet",
    "industryDomain": "education-research"
  },
  {
    "key": "media-entertainment",
    "label": "Media & Entertainment",
    "shortLabel": "Media & Entertainment",
    "description": "Content ingest, editorial, rights, production, media delivery, publishing, subscriptions, accessibility, and analytics.",
    "route": "/p/media-entertainment",
    "kind": "spa",
    "modules": [
      "Content Ingest and Metadata",
      "Editorial Planning and Review",
      "Rights and Licensing",
      "Production and Post-production",
      "Media Processing and Delivery",
      "Publishing and Channel Operations",
      "Subscriptions and Monetization Mocks",
      "Audience and Community Operations",
      "Accessibility and Localization",
      "Analytics, Security and Resilience"
    ],
    "idPrefix": "MEDX",
    "accent": "violet",
    "industryDomain": "media-content"
  },
  {
    "key": "real-estate-facilities",
    "label": "Real Estate & Facilities",
    "shortLabel": "Real Estate & Facilities",
    "description": "Property portfolios, leasing, facilities work orders, inspections, occupancy, utilities, vendors, and capital projects.",
    "route": "/p/real-estate-facilities",
    "kind": "spa",
    "modules": [
      "Property Portfolio and Asset Register",
      "Leasing and Tenant Operations",
      "Facilities and Work Order Management",
      "Inspections and Compliance Records",
      "Space and Occupancy Planning",
      "Utilities and Environmental Monitoring",
      "Vendor and Contract Management",
      "Capital Projects and Renovations",
      "Tenant Portal and Communications",
      "Security, Resilience and Portfolio Reporting"
    ],
    "idPrefix": "REFX",
    "accent": "teal",
    "industryDomain": "real-estate"
  }
];
