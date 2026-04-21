// Hand-written, domain-specific overview copy for each PlatformDef.
// Rendered on every /p/<platform> overview page so no landing is "blank".
// Keep one focused paragraph per product — what the pack covers + where it's used.

export const PLATFORM_USE_CASES: Record<string, { useCases: string; modulesCopy: Record<string, string> }> = {
  veeva: {
    useCases:
      "Used by life-sciences QA teams to validate Vault workflows end-to-end: clinical study start-up, regulatory submissions, GxP quality events, medical inquiry handling, and commercial content distribution. Scenarios are written to mirror 21 CFR Part 11 audit trails, EDC/eTMF integrations and PromoMats approval routing.",
    modulesCopy: {
      clinical: "Study build, site activation, subject enrolment, EDC/eTMF reconciliation.",
      regulatory: "Submission planning, RIM, IDMP, eCTD lifecycle, health-authority correspondence.",
      quality: "Deviation/CAPA, change control, training assignments, supplier qualification.",
      medical: "MedComms inquiry routing, scientific response approval, conference content.",
      commercial: "PromoMats MLR approval, asset distribution, withdrawal/expiration cascades.",
    },
  },
  workday: {
    useCases:
      "Covers Workday HCM, Payroll, Recruiting, Finance, Reporting and Studio integrations. Designed for tenants going through annual enrolment, fiscal year-end, M&A inbound population loads, and Cloud Connect payroll migrations. Each pack exercises the business-process framework, security domains, and EIB/Studio integration paths.",
    modulesCopy: {
      hcm: "Hire/transfer/termination BPs, position management, org rollups.",
      payroll: "Pay calc, retros, off-cycle, payslip + GL posting.",
      recruiting: "Job req → offer → background check → onboarding chain.",
      finance: "Journals, supplier invoice, expenses, period close.",
      integrations: "EIBs, Studio, Cloud Connect — inbound + outbound.",
      reporting: "Calc-fields, advanced reports, prompts, BIRT.",
      e2e: "Hire-to-pay-to-promote, full lifecycle regression.",
    },
  },
  servicenow: {
    useCases:
      "Used to validate ServiceNow Now Platform upgrades, ATF coverage and store-app behaviour. Scenarios target ITSM incident/problem/change flows, ITOM CMDB discovery and event correlation, CSM case routing, and HRSD lifecycle events. Suitable for Washington/Yokohama upgrade smoke + regression cycles.",
    modulesCopy: {
      itsm: "Incident, problem, change, request — full lifecycle with SLAs.",
      itom: "CMDB classes, discovery patterns, event correlation, service maps.",
      csm: "Account/contact, case routing, escalations, customer portal.",
      hrsd: "HR cases, employee documents, lifecycle events, manager hub.",
    },
  },
  dynamics365: {
    useCases:
      "End-to-end Dataverse and Dynamics 365 testing across CE, F&O and the Power Platform fabric. Includes Sales lead-to-cash, Customer Service omnichannel routing, Finance period-close, Supply Chain MRP runs, Project Operations resource bookings, and M365 cross-app journeys.",
    modulesCopy: {
      sales: "Lead → opportunity → quote → order with B2B + retail variants.",
      customer_service: "Omnichannel routing, knowledge, SLA + entitlements.",
      finance: "AP, AR, GL, fixed assets, period close.",
      supply_chain: "Master planning, warehouse mobility, vendor collaboration.",
      project_ops: "Project quote, resource booking, time/expense, invoicing.",
      m365: "Outlook, Teams, SharePoint cross-app journeys.",
    },
  },
  oracle: {
    useCases:
      "Oracle Fusion Applications regression: P2P, O2C, R2R, H2R, supplier portal, and EPM close. Scenarios are aligned to quarterly Oracle release waves and exercise BIP, OTBI, ESS jobs and FBDI/ADFdi loads.",
    modulesCopy: {
      financials: "AP, AR, GL, fixed assets, intercompany, period close.",
      procurement: "Sourcing → contract → PO → receipt → invoice match.",
      scm: "Inventory, manufacturing, order management, planning.",
      hcm: "Core HR, Talent, Compensation, Absence, Payroll.",
      projects: "Project costing, billing, revenue, resource management.",
      epm: "FCCS, EPBCS, ARCS — close, plan, reconcile.",
    },
  },
  api: {
    useCases:
      "Protocol-agnostic API testing across REST, GraphQL, gRPC and Webhook patterns. Includes contract validation (OpenAPI/JSON-Schema), auth (OAuth2/JWT/mTLS), performance baselines and OWASP API Top-10 security checks.",
    modulesCopy: {
      rest: "CRUD, pagination, filtering, idempotency, status codes.",
      graphql: "Queries, mutations, subscriptions, depth + cost limits.",
      grpc: "Unary/streaming, deadlines, error codes, TLS.",
      webhook: "Signature verification, replay protection, retry semantics.",
      auth: "OAuth2 flows, JWT, mTLS, API keys, rate-limit headers.",
      contract: "OpenAPI/JSON-Schema validation, breaking-change detection.",
      performance: "Latency P50/P95/P99, throughput, error budgets.",
      security: "OWASP API Top-10 — injection, BOLA, mass assignment.",
    },
  },
  ios: {
    useCases:
      "Native iOS regression covering App Store readiness: onboarding, biometrics, Apple Pay, push notifications, offline persistence, deep links and accessibility (VoiceOver, Dynamic Type).",
    modulesCopy: {
      onboarding: "First-launch flows, permissions, deep links.",
      login: "Email/password, SSO, biometrics, 2FA.",
      profile: "Edit profile, image upload, account deletion.",
      payments: "Apple Pay, in-app purchases, refunds.",
      notifications: "APNs categories, rich notifications, settings.",
      offline: "Local persistence, sync conflicts, retry queues.",
      security: "Keychain, jailbreak detection, ATS, biometrics.",
      performance: "Cold start, scroll FPS, memory, battery.",
    },
  },
  android: {
    useCases:
      "Native Android regression for Play Store readiness across phones, tablets and foldables: onboarding, Google Pay, FCM push, offline-first patterns, deep-link routing and TalkBack accessibility.",
    modulesCopy: {
      onboarding: "Permissions, runtime grants, dynamic feature delivery.",
      login: "Email/password, Google SSO, biometrics, 2FA.",
      profile: "Profile edit, image upload, account deletion.",
      payments: "Google Pay, Play Billing, refunds.",
      notifications: "FCM channels, rich notifications, badging.",
      offline: "Room persistence, WorkManager sync, conflicts.",
      security: "Keystore, root detection, network security config.",
      performance: "Cold start, jank, ANRs, memory, battery.",
    },
  },
  aws: {
    useCases:
      "Cloud control-plane and security validation for AWS landing zones: IAM least-privilege, EC2/EKS workload health, S3 bucket exposure, Lambda cold-start budgets, RDS HA failover, and FinOps cost guardrails.",
    modulesCopy: {
      iam: "Policy least-privilege, role-chaining, MFA, key rotation.",
      ec2: "AMI hardening, ASG scale, patching, EBS encryption.",
      s3: "Block-public-access, KMS, lifecycle, replication.",
      lambda: "Cold start, concurrency, dead-letter queues, IAM.",
      eks: "Cluster upgrade, IRSA, network policies, scaling.",
      rds: "Backups, PITR, Multi-AZ failover, parameter groups.",
      security: "GuardDuty findings, SecurityHub, Config rules.",
      cost: "Budgets, anomaly detection, RI/SP coverage, tagging.",
    },
  },
  gcp: {
    useCases:
      "GCP control-plane validation across Compute, GKE, Cloud Run, BigQuery and Storage with security baselines mapped to CIS GCP and FinOps cost guardrails.",
    modulesCopy: {
      iam: "Least-privilege, custom roles, service-account hygiene.",
      compute: "Instance templates, MIGs, OS patching, sole-tenant.",
      storage: "Bucket IAM, retention, KMS-CMEK, lifecycle.",
      "cloud-run": "Cold start, concurrency, secrets, custom domains.",
      gke: "Autopilot vs Standard, Workload Identity, network policies.",
      bigquery: "Authorised views, column-level security, slot mgmt.",
      security: "SCC findings, VPC-SC, BeyondCorp, KMS rotation.",
      cost: "Billing exports, budgets, committed use discounts.",
    },
  },
  azure: {
    useCases:
      "Azure control-plane validation: AAD/Entra ID guardrails, VM/AKS workload health, SQL HA, Functions cold-start budgets, Storage account exposure, plus Cost Management and Defender for Cloud baselines.",
    modulesCopy: {
      iam: "Conditional Access, PIM, role assignments, MFA.",
      vm: "Image hardening, VMSS scale, patching, encryption.",
      storage: "Public access, private endpoints, immutability, lifecycle.",
      functions: "Cold start, scale, app settings, key rotation.",
      aks: "Cluster upgrade, AAD pod identity, network policies.",
      sql: "Azure SQL HA, geo-replication, TDE, auditing.",
      security: "Defender for Cloud, Sentinel, Key Vault, Policy.",
      cost: "Budgets, advisor, reservations, tag-based chargeback.",
    },
  },
  webapps: {
    useCases:
      "Generic web-app regression: auth + RBAC, form validation, checkout flows, UI cross-browser, WCAG accessibility, REST integration, Lighthouse performance and OWASP web Top-10 security checks.",
    modulesCopy: {
      ui: "Cross-browser, responsive breakpoints, dark mode.",
      auth: "Login, password reset, SSO, MFA, session timeout.",
      api: "REST integration, error handling, rate-limit UX.",
      forms: "Validation, async submit, autosave, CSRF.",
      checkout: "Cart → payment → order with PSD2 + 3DS.",
      accessibility: "WCAG 2.2 AA, keyboard, screen reader, contrast.",
      performance: "Core Web Vitals — LCP, INP, CLS budgets.",
      security: "OWASP Top-10 — XSS, CSRF, IDOR, SSRF.",
    },
  },
  topproducts: {
    useCases:
      "Cross-product launchers wrapping the highest-coverage packs from each enterprise SaaS — useful for portfolio dashboards and stakeholder demos that need one click into every catalogue.",
    modulesCopy: {
      sap: "Cross-product wrapper for SAP catalogue.",
      salesforce: "Cross-product wrapper for Salesforce catalogue.",
      servicenow: "Cross-product wrapper for ServiceNow catalogue.",
      workday: "Cross-product wrapper for Workday catalogue.",
      veeva: "Cross-product wrapper for Veeva catalogue.",
      d365: "Cross-product wrapper for Dynamics 365 catalogue.",
      oracle: "Cross-product wrapper for Oracle Apps catalogue.",
    },
  },
  asana: {
    useCases:
      "Work-management regression for distributed delivery teams: project intake, task assignment, dependency chains, timeline rebaselines, portfolio rollups, intake forms and rules-based automation. Suitable for organisations standardising on Asana for OKRs and cross-functional programmes.",
    modulesCopy: {
      projects: "Project templates, sections, custom fields, members.",
      tasks: "Assign, due dates, dependencies, subtasks, comments.",
      timeline: "Gantt rebaseline, critical path, drag-to-reschedule.",
      portfolios: "Roll-up status, RAG indicators, custom fields.",
      forms: "Intake forms, branching logic, attachments.",
      automation: "Rules engine triggers, conditions, actions.",
    },
  },
  cyberark: {
    useCases:
      "Privileged access management coverage: vault onboarding, session isolation and recording, just-in-time access, secret rotation policies, Conjur secrets-as-code for CI/CD, and eDiscovery export for audit. Designed for SOX, PCI and ISO 27001 control validation.",
    modulesCopy: {
      privileged_access: "PAM workflows, dual-control, JIT access, MFA.",
      vault: "Account onboarding, safe permissions, CPM cycles.",
      session_management: "PSM isolation, session recording, live monitoring.",
      rotation: "Password/secret rotation, plugin reliability, retries.",
      conjur: "Secrets-as-code, K8s/CI integrations, policy load.",
      ediscovery: "Audit export, search, legal-hold packaging.",
    },
  },
  docusign: {
    useCases:
      "eSignature regression across envelopes, templates, routing, signing experience and admin. CLM module covers contract lifecycle from request → negotiate → execute → renew. Includes 21 CFR Part 11 compatible signing flows and bulk-send scenarios.",
    modulesCopy: {
      envelopes: "Send, void, correct, resend, expiry & reminders.",
      templates: "Template fields, roles, conditional routing.",
      routing: "Sequential/parallel, signing groups, witness signers.",
      signing: "Web/mobile signing, SMS auth, KBA, drawn signature.",
      admin: "Users, groups, branding, retention, connect webhooks.",
      clm: "Request → negotiate → execute → renew, redlining, clauses.",
    },
  },
  googleworkspace: {
    useCases:
      "Workspace-wide validation: Gmail filters and delegation, Drive sharing and DLP, Docs/Sheets co-editing, Meet enterprise telephony, and Admin console org-unit policies. Covers data loss prevention, context-aware access and Vault retention.",
    modulesCopy: {
      gmail: "Filters, delegation, confidential mode, DLP rules.",
      drive: "Shared drives, sharing scopes, DLP, Vault retention.",
      docs: "Co-edit, comments, version history, smart chips.",
      sheets: "Apps Script, protected ranges, named functions.",
      meet: "Recording, dial-in, breakout rooms, captions.",
      admin: "OUs, context-aware access, mobile mgmt, audit log.",
    },
  },
  medallia: {
    useCases:
      "Experience management regression: journey orchestration across CX touchpoints, real-time analytics, alert routing for detractor feedback and case management workflows. Suitable for NPS, CES and CSAT programme validation across retail, banking and healthcare verticals.",
    modulesCopy: {
      journeys: "Touchpoint orchestration, sampling, journey analytics.",
      analytics: "Sentiment, text analytics, KPI dashboards.",
      alerts: "Detractor alerts, routing rules, escalations.",
      cases: "Case creation, assignment, closed-loop follow-up.",
    },
  },
  odoo: {
    useCases:
      "Open-source ERP regression for SMB and mid-market: P2P, O2C, MRP, inventory valuation, payroll calc, plus website/eCommerce flows. Tailored for Odoo Enterprise upgrades and migration from Community editions.",
    modulesCopy: {
      accounting: "AP, AR, journals, tax engine, bank reconciliation.",
      inventory: "Stock moves, lots/serials, putaway, reordering.",
      sales: "Quote → SO → delivery → invoice with variants.",
      purchase: "RFQ → PO → receipt → vendor bill matching.",
      manufacturing: "MRP, BOMs, work orders, quality checks.",
      hr: "Employees, contracts, leaves, payroll calculation.",
      website: "CMS pages, eCommerce checkout, payment providers.",
    },
  },
  procore: {
    useCases:
      "Construction management regression for general contractors: project setup, RFI/submittal turnaround SLAs, financial commitments and budgets, field-quality observations and safety incident reporting. Validates daily logs, drawings, and integrations with accounting systems.",
    modulesCopy: {
      projects: "Project setup, directory, drawings, daily logs.",
      rfis: "RFI lifecycle, ball-in-court, response SLAs.",
      submittals: "Submittal log, approval routing, distribution.",
      financials: "Budgets, commitments, change orders, billing.",
      quality: "Observations, punch lists, inspections, photos.",
      safety: "Incidents, near-misses, JHAs, toolbox talks.",
    },
  },
  ptcwindchill: {
    useCases:
      "PLM regression for manufacturing engineering: CAD data management with check-in/out, multi-level BOM mgmt, change requests/notices/orders (3CN), document control and configurable workflows. Covers Creo and SolidWorks integrations.",
    modulesCopy: {
      cad: "CAD check-in/out, family tables, derived parts.",
      plm: "Lifecycle states, baselines, effectivity, options.",
      bom: "Multi-level BOM, where-used, redlining, transforms.",
      change_mgmt: "Change request → notice → order, impact analysis.",
      documents: "Document templates, approval routing, references.",
      workflow: "Configurable workflows, role-based routing, escalation.",
    },
  },
  qad: {
    useCases:
      "Adaptive ERP regression for global manufacturers: discrete + process production, multi-site supply chain, financial consolidation, quality non-conformance, logistics warehouse moves and demand planning. Validates QAD release cycles and channel partner integrations.",
    modulesCopy: {
      manufacturing: "Work orders, repetitive, kanban, backflushing.",
      supply_chain: "Multi-site planning, transfers, distribution.",
      finance: "GL, AP, AR, fixed assets, multi-entity consolidation.",
      quality: "Non-conformance, CAPA, supplier quality, inspection.",
      logistics: "Warehouse moves, picking, shipping, transport.",
      planning: "Demand planning, MRP, MPS, capacity planning.",
    },
  },
  smartsheet: {
    useCases:
      "Collaborative work-management regression: dynamic sheets, intake forms, cross-sheet reports, dashboards, automation rules and resource-management capacity planning. Covers cell-history audit, conditional formatting and Bridge workflow integrations.",
    modulesCopy: {
      sheets: "Cell types, formulas, cross-sheet refs, conditional fmt.",
      forms: "Form intake, conditional logic, captcha, attachments.",
      reports: "Cross-sheet rollups, grouping, summary metrics.",
      dashboards: "Widgets, charts, web content, KPIs.",
      automation: "Workflow rules, approvals, notifications, escalation.",
      resource_management: "Capacity planning, allocations, time tracking.",
    },
  },
  zoho: {
    useCases:
      "Zoho One suite regression for SMB: CRM lead-to-cash, Books invoicing and bank reconciliation, Projects task management, Desk multichannel support, low-code Creator apps, and People HR self-service.",
    modulesCopy: {
      crm: "Leads, deals, blueprints, automation, forecasting.",
      books: "Invoices, banking, GST/VAT, expense claims.",
      projects: "Tasks, milestones, time logs, billing.",
      desk: "Tickets, SLAs, multi-channel, knowledge base.",
      creator: "Low-code forms, workflows, deluge scripting.",
      people: "Employee self-service, leave, attendance, performance.",
    },
  },
  zoom: {
    useCases:
      "Zoom platform regression: Meetings (in-meeting controls, breakout rooms, polls), Webinars (registration, Q&A), Phone (call queues, IVR), Rooms (kiosk mode, BYOD), Contact Center (omnichannel routing) and cloud recordings governance.",
    modulesCopy: {
      meetings: "Schedule, breakout rooms, polls, captioning.",
      webinars: "Registration, Q&A, practice session, simulive.",
      phone: "Call queues, IVR, voicemail, SMS, e911.",
      rooms: "Kiosk mode, scheduler, BYOD, calendar integration.",
      contact_center: "Omnichannel routing, IVR, dispositions, QM.",
      recordings: "Cloud storage, retention, transcripts, sharing.",
    },
  },
  zscaler: {
    useCases:
      "Zero-Trust Exchange regression: ZIA secure web/internet access with SSL inspection, ZPA private app access without VPN, inline DLP, sandbox detonation of unknown files, granular policy and log streaming to SIEM. Aligned to SSE Gartner-MQ controls.",
    modulesCopy: {
      internet_access: "ZIA SSL inspection, URL filtering, threat protection.",
      private_access: "ZPA app segments, browser access, posture profiles.",
      dlp: "Inline DLP, dictionaries, exact data match, OCR.",
      sandbox: "File detonation, MD5 reputation, quarantine.",
      policy: "Policy ordering, time-based, group-based, geofencing.",
      logs: "NSS feeds, SIEM streaming, log search, retention.",
    },
  },
};
