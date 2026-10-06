import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INDUSTRY_GUIDANCE: Record<string, { label: string; guidance: string }> = {
  "pharma-life-sciences": { label: "Pharma & Life Sciences", guidance: "Cover controlled product records, clinical and safety workflows, batch genealogy, quality events, document controls, independent review, effective dates, and traceable evidence. Use synthetic non-identifying records; do not claim GxP validation or regulatory compliance." },
  "medical-devices": { label: "MedTech & Medical Devices", guidance: "Cover design inputs and outputs, configuration control, risk traceability, verification evidence, complaints, field actions, device history, and supplier quality. Use synthetic records and simulators only; do not control live devices or claim device safety or certification." },
  healthcare: { label: "Healthcare Operations", guidance: "Cover synthetic patient access, appointments, EHR interfaces, claims, care coordination, consent, access reviews, idempotent messaging, and recovery. Never use real PHI or drive clinical decisions; do not claim HIPAA compliance or clinical safety." },
  manufacturing: { label: "Manufacturing & MES", guidance: "Cover production orders, routings and BOM revisions, shop-floor execution, quality holds, OEE, material genealogy, warehouse movement, maintenance, planning, and ERP/MES reconciliation. Use synthetic orders and equipment events in non-production systems." },
  defense: { label: "Defense Programs", guidance: "Limit scenarios to unclassified synthetic administrative workflows such as configuration baselines, requirements, suppliers, schedules, maintenance, access review, and audit. Exclude operational plans, mission targeting, weapons instructions, and controlled technical data." },
  "industrial-automation": { label: "Industrial Automation & OT", guidance: "Cover simulated asset inventory, zones, PLC/HMI digital twins, alarms, historian data, virtual logic changes, interlocks, lab access, and recovery. Use digital twins or isolated simulators only; never send write commands to live PLC, SCADA, robot, safety, or production systems." },
  cpg: { label: "CPG & Consumer Goods", guidance: "Cover product and packaging master data, demand plans, trade promotions, retail execution, order fulfillment, lot traceability, quality holds, labeling, suppliers, and retail analytics. Use synthetic consumers, stores, and lots only." },
  "energy-utilities": { label: "Energy & Utilities", guidance: "Cover synthetic metering, grid event workflows, outage tracking, field work, asset maintenance, billing, simulated distributed resources, settlement, reporting, and resilience. Keep integrations mocked and never dispatch commands to live utility control systems." },
  insurance: { label: "Insurance", guidance: "Cover synthetic policy terms, underwriting referrals, claims, adjudication, payments, billing, broker access, reinsurance, mock screening, and audit. Do not issue real payments or use real personal, financial, or claims data." },
  "financial-services": { label: "Financial Services", guidance: "Cover synthetic account lifecycle, idempotent payments, balanced ledger entries, lending, treasury, risk limits, mock AML/KYC, authentication, and reporting. Use mock providers only; do not initiate real transactions or claim regulatory certification." },
  aerospace: { label: "Aerospace & MRO", guidance: "Cover synthetic configuration baselines, engineering changes, MRO work packages, controlled records, serialized parts, quality events, assembly, offline test simulation, fleet reliability, and traceability. Exclude operational flight and controlled technical data; do not claim airworthiness certification." },
  "logistics-supply-chain": { label: "Logistics & Supply Chain", guidance: "Cover transport planning, warehouse execution, carrier messages, inventory visibility, shipment milestones, simulated trade documents, returns, supplier collaboration, demand planning, and reconciliation. Use synthetic addresses and mocked partner endpoints." },
  "retail-commerce": { label: "Retail & Commerce", guidance: "Cover synthetic catalog, pricing, inventory, orders, checkout, returns, promotions, fulfillment, partner events, access, and analytics. Use test accounts and payment simulators only." },
  "telecom-network": { label: "Telecom & Networks", guidance: "Cover service orders, network inventory, provisioning, usage events, billing, outage management, partner interfaces, access, and recovery with synthetic subscribers and simulated network resources." },
  "public-sector": { label: "Government & Public Sector", guidance: "Cover synthetic case intake, identity and access, approvals, records retention, accessibility, payment mocks, inter-agency exchange, and audit. Do not use real citizen data or production government endpoints." },
  "education-research": { label: "Education & Research", guidance: "Cover synthetic learner, grant, research, lab, and publication records; include accessibility, role boundaries, approval, reproducibility, and data lineage. Do not use real student or research-subject records." },
  cybersecurity: { label: "Cybersecurity", guidance: "Cover defensive policy, identity, detection, incident intake, evidence, recovery, and audit using owned lab fixtures. Keep activity non-destructive and limited to synthetic assets; exclude real credential theft or production exploitation." },
  "cloud-platform": { label: "Cloud & Data Platforms", guidance: "Cover workspace boundaries, least privilege, deployment, data lineage, schema evolution, orchestration, observability, retries, and recovery with synthetic datasets and isolated test resources." },
  "media-content": { label: "Media & Content", guidance: "Cover synthetic content lifecycle, metadata, rights and approvals, media delivery, subscriptions, accessibility, partner interfaces, and analytics with non-copyrighted test assets." },
  "other-industries": { label: "Other / Cross-industry", guidance: "Use synthetic fixtures and non-production services. Include workflow validation, role boundaries, audit history, idempotent retries, error handling, and recovery appropriate to the described business process. Avoid unsupported regulatory or certification claims." },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, framework, language, testScopes, testCount, businessCase, targetScriptLines, industryContext } = await req.json();
    const requestedLineTarget = Number(targetScriptLines);
    const longForm = Number.isFinite(requestedLineTarget) && requestedLineTarget >= 2000;
    const lineTarget = longForm ? Math.min(4000, Math.floor(requestedLineTarget)) : 0;
    const domain = INDUSTRY_GUIDANCE[String(industryContext ?? "").toLowerCase()];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const outputGuidance = getOutputGuidance(framework, language);
    const longFormGuidance = longForm ? `
LONG-FORM SCRIPT REQUIREMENTS:
- Minimum target: ${lineTarget} meaningful source lines in the script field. Generate the complete script, not a summary or a short representative sample.
- Organize the suite into runnable modules or clearly separated sections: configuration, typed fixtures, setup and teardown, reusable page objects or clients, data builders, assertions, and the requested test cases.
- Cover positive, negative, boundary, authorization, retry/recovery, concurrency, and cleanup paths where they apply to the business case.
- Keep every helper and test implementation complete and internally consistent. Include imports, types, executable setup, assertions, and cleanup; do not use ellipses, TODOs, placeholder functions, repeated filler, or blank/comment-only padding to reach the target.
- Preserve the requested framework and language. For model-based and VBScript output, provide complete runnable-equivalent model modules or UFT functions rather than switching languages.
- Ensure the full JSON response remains valid and the script can be saved as a standalone source file.` : "";

    const systemPrompt = `You are TestForge AI, an expert test automation engineer. Generate production-ready test automation scripts.

OUTPUT FORMAT (JSON):
{
  "title": "Descriptive title for the test suite",
  "script": "The complete executable test script code",
  "language": "${language}",
  "test_cases": [
    {"id": "TC-001", "name": "Test name", "type": "positive|negative|boundary", "priority": "P1|P2|P3", "description": "Brief description"}
  ],
  "prerequisites": ["Setup step 1", "Setup step 2"],
  "coverage_notes": "What's covered and what's not",
  "known_limitations": ["Limitation 1", "Limitation 2"],
  "recommended_next_steps": ["Enhancement 1", "Enhancement 2"]
}

REQUIREMENTS:
- Platform: ${platform}
- Framework: ${framework}
- Language: ${language}
- Test Scopes: ${testScopes.join(", ")}
- Target Test Count: ${testCount}
- Industry Context: ${domain?.label ?? "General purpose"}
- Domain-Specific Guidance: ${domain?.guidance ?? "Use synthetic data and non-production services where appropriate. Include role boundaries, audit history, idempotent retries, clear errors, and recovery paths without making unsupported compliance claims."}
- Business Case: ${businessCase}
${outputGuidance}
${longFormGuidance}

Generate a comprehensive, well-documented test suite with:
1. Page Object Model pattern where applicable
2. Data-driven test approaches
3. Proper assertions and error handling
4. Clear comments explaining test logic, except for model-based outputs where model metadata, module attributes and action-mode notes replace code comments
5. Mix of positive, negative, and edge case tests
6. Appropriate waits and synchronization`;
    const completePrompt = `${systemPrompt}\n7. Return complete implementations for the requested test count. There is no 50-line limit. Never truncate functions, omit assertions, or replace required tests with ellipses. Clearly list environment-specific setup and limitations; do not claim the output has been executed or certified.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: completePrompt },
          { role: "user", content: `Generate a test automation script for: ${businessCase}` },
        ],
        stream: true,
        ...(longForm ? { max_tokens: 65536 } : {}),
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

const getOutputGuidance = (framework: string, language: string): string => {
  const normalizedFramework = String(framework).toLowerCase();
  const normalizedLanguage = String(language).toLowerCase();

  if (normalizedFramework === "tricentis_tosca" || normalizedLanguage === "model-based") {
    return `
SPECIAL OUTPUT REQUIREMENTS FOR MODEL-BASED AUTOMATION:
- Do not return Selenium, Playwright, Cypress or generic code.
- The script field must contain a Tricentis Tosca-style model-based automation specification in readable YAML.
- Include sections for business_process, test_case_design, modules, xmodules, test_steps, action_modes, test_data, recovery_scenarios, risk_coverage and execution_notes.
- Model UI/API controls as reusable modules with technical identifiers, steering parameters, input/verify/wait action modes and data bindings.
- Keep it import-ready as a model specification and aligned to the requested E2E flow.`;
  }

  if (normalizedFramework === "uft_one" || normalizedLanguage === "vbscript") {
    return `
SPECIAL OUTPUT REQUIREMENTS FOR UFT ONE / VBSCRIPT:
- The script field must contain executable VBScript-style UFT One automation, not JavaScript or pseudocode.
- Use UFT object repository style references where applicable, e.g. Browser(...).Page(...).WebEdit(...).Set and WebButton(...).Click.
- Include Option Explicit, reusable Sub/Function blocks, synchronization, checkpoint assertions, reporter events and data-table driven test iteration.
- Use VBScript syntax only: Dim, Set, If...Then...Else, For...Next, On Error handling and Reporter.ReportEvent.
- Keep comments concise and compatible with UFT One.`;
  }

  return "";
};
