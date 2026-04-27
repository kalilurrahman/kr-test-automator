import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { platform, framework, language, testScopes, testCount, businessCase } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const outputGuidance = getOutputGuidance(framework, language);

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
- Business Case: ${businessCase}
${outputGuidance}

Generate a comprehensive, well-documented test suite with:
1. Page Object Model pattern where applicable
2. Data-driven test approaches
3. Proper assertions and error handling
4. Clear comments explaining test logic, except for model-based outputs where model metadata, module attributes and action-mode notes replace code comments
5. Mix of positive, negative, and edge case tests
6. Appropriate waits and synchronization`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a test automation script for: ${businessCase}` },
        ],
        stream: true,
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("generate-test-script error:", error);
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
