import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Server-enforced daily quotas (the client-side "20/day" was display only).
// Env-overridable so launch can tighten the free tier without a code change.
const LIMITS = {
  anon: Number(Deno.env.get("GEN_LIMIT_ANON") ?? 5),
  free: Number(Deno.env.get("GEN_LIMIT_FREE") ?? 20),
  pro: Number(Deno.env.get("GEN_LIMIT_PRO") ?? 100),
};

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Identify the caller and enforce the tier quota. Returns `deny` when the
// request must be refused, otherwise `release` — a callback that frees the
// consumed ledger slot, to be invoked when the generation FAILS downstream so
// gateway outages don't eat the user's daily quota. Fails open on unexpected
// DB errors: availability of the free tool beats strict metering, and every
// failure is logged for follow-up.
interface QuotaResult {
  deny?: Response;
  release?: () => Promise<void>;
}

async function enforceQuota(
  req: Request,
  meta: { platform?: string; framework?: string },
): Promise<QuotaResult> {
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  if (!serviceKey || !supabaseUrl) return {}; // metering not configured

  try {
    const admin = createClient(supabaseUrl, serviceKey);

    // The client sends either the anon key (legacy/anonymous) or the signed-in
    // user's JWT. Only a real user JWT resolves to a user.
    let userId: string | null = null;
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    if (token) {
      const { data } = await admin.auth.getUser(token);
      userId = data?.user?.id ?? null;
    }

    let tier: "anon" | "free" | "pro" = userId ? "free" : "anon";
    if (userId) {
      const nowIso = new Date().toISOString();
      const { data: ents } = await admin
        .from("entitlements")
        .select("entitlement")
        .eq("user_id", userId)
        .in("entitlement", ["generator:pro", "all-access"])
        .is("revoked_at", null)
        .or(`expires_at.is.null,expires_at.gt.${nowIso}`);
      if (ents && ents.length > 0) tier = "pro";
    }

    const salt = Deno.env.get("USAGE_SALT") ?? supabaseUrl;
    // Rightmost x-forwarded-for entry: Supabase's proxy appends the real client
    // IP after any client-supplied entries, so the rightmost one is trustworthy.
    const xff = (req.headers.get("x-forwarded-for") ?? "unknown").split(",");
    const ip = xff[xff.length - 1].trim();
    const ipHash = await sha256Hex(`${salt}:${ip}`);

    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const usageCount = async () => {
      let q = admin
        .from("generation_usage")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString());
      q = userId ? q.eq("user_id", userId) : q.eq("ip_hash", ipHash).is("user_id", null);
      const { count, error } = await q;
      if (error) throw error; // table missing / misconfig -> outer fail-open
      return count ?? 0;
    };

    const limit = LIMITS[tier];
    const deny = (used: number) =>
      new Response(
        JSON.stringify({
          error: userId
            ? `Daily generation limit reached (${limit}/day on your plan). Upgrade for higher limits.`
            : `Daily limit reached for anonymous use (${limit}/day). Sign in for more generations.`,
          code: "quota_exceeded",
          used,
          limit,
          tier,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );

    // Fast path: already at the limit — deny without writing anything.
    const before = await usageCount();
    if (before >= limit) return { deny: deny(before) };

    // Client-supplied strings are sanitized so a crafted value (e.g. a NUL
    // byte Postgres rejects) can't force the insert to fail and dodge metering.
    const clean = (v: unknown) =>
      typeof v === "string" ? v.replace(/[^\x20-\x7E]/g, "").slice(0, 64) || null : null;

    const { data: inserted, error: insertError } = await admin
      .from("generation_usage")
      .insert({
        user_id: userId,
        ip_hash: userId ? null : ipHash,
        tier,
        platform: clean(meta.platform),
        framework: clean(meta.framework),
      })
      .select("id")
      .single();
    if (insertError || !inserted) {
      // The count above worked, so this isn't "metering not deployed" — the
      // ledger is broken while looking configured. Fail closed: an unrecorded
      // generation is exactly the unmetered spend this function exists to stop.
      console.error("generation_usage insert failed (failing closed):", insertError);
      return {
        deny: new Response(
          JSON.stringify({ error: "Usage metering unavailable. Please try again shortly.", code: "metering_error" }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        ),
      };
    }

    const release = async () => {
      try {
        await admin.from("generation_usage").delete().eq("id", inserted.id);
      } catch (e) {
        console.error("failed to release quota slot:", e);
      }
    };

    // Recount including our own row: closes the check-then-insert race — a
    // concurrent burst all inserts first, then only the first `limit` rows of
    // the day (by id — deterministic on both sides of the race) are winners;
    // losers free their slot and deny, so the race can neither exceed the
    // limit nor burn the caller's legitimate remaining quota.
    const after = await usageCount();
    if (after > limit) {
      let winnersQ = admin
        .from("generation_usage")
        .select("id")
        .gte("created_at", todayStart.toISOString())
        .order("id", { ascending: true })
        .limit(limit);
      winnersQ = userId
        ? winnersQ.eq("user_id", userId)
        : winnersQ.eq("ip_hash", ipHash).is("user_id", null);
      const { data: winners } = await winnersQ;
      const won = (winners ?? []).some((w) => w.id === inserted.id);
      if (!won) {
        await release();
        return { deny: deny(after - 1) };
      }
    }
    return { release };
  } catch (error) {
    console.error("quota enforcement error (failing open):", error);
    return {};
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let releaseQuota: (() => Promise<void>) | undefined;
  try {
    const { platform, framework, language, testScopes, testCount, businessCase } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const quota = await enforceQuota(req, { platform, framework });
    if (quota.deny) return quota.deny;
    releaseQuota = quota.release;

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
      // The generation failed downstream — free the caller's quota slot so a
      // gateway outage doesn't consume their daily allowance.
      await releaseQuota?.();
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
    await releaseQuota?.();
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
