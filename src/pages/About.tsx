import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { PRODUCT_CATALOG, TOTAL_PRODUCTS, TOTAL_MODULES, BUNDLED_TEST_COUNT } from "@/data/productCatalog";
import { Sparkles, Layers, Package, FileCode2, Workflow } from "lucide-react";
import { ProductLogo } from "@/components/ProductLogo";

const About = () => {
  const totalCases = BUNDLED_TEST_COUNT;

  return (
    <>
      <SeoHead
        title="About · TestForge AI"
        description="What TestForge AI is, how it's organised, and how to use the dashboard, generator, repositories and ID lookup."
        canonical="/about"
      />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <header>
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            About TestForge AI
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            TestForge AI is an enterprise test-automation hub. It bundles 130,000+ curated test cases
            across {TOTAL_PRODUCTS} platforms and pairs them with an AI script generator that turns plain-English business cases
            into Selenium, Cypress, Playwright, REST-Assured, Karate, Postman or Robot Framework code.
            On top of the curated catalogue it ships <strong className="text-foreground">51,500 industry E2E scenarios</strong>{" "}
            (9.5k v3 library + 12k strict-validated set + 30k incremental B21–B50 batches) across fine-grained industry domains.
          </p>
        </header>

        {/* Stat row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat icon={Package} value={TOTAL_PRODUCTS} label="Platforms" />
          <Stat icon={Layers} value={TOTAL_MODULES} label="Modules" />
          <Stat icon={FileCode2} value={totalCases.toLocaleString()} label="Bundled cases" />
          <Stat icon={Workflow} value="51,500" label="Industry E2E" />
        </section>

        {/* How it's organised */}
        <section>
          <h2
            className="text-2xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            How it's organised
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Generator (/)</strong> — describe a business case and the AI streams a runnable script in your chosen framework.
            </p>
            <p>
              <strong className="text-foreground">Dashboard (/dashboard)</strong> — landing page with stats, quick links and the {TOTAL_PRODUCTS}-platform grid. Includes a <em>Find by ID</em> box that deep-links any test case (e.g. <code className="font-mono text-primary">SF-HC-00005</code>) into the generator with the prompt pre-filled.
            </p>
            <p>
              <strong className="text-foreground">Industries (/industries)</strong> — parent industry domains roll up split sub-domains and expose product lineage such as SAP S/4HANA → module/product plus industry lineage such as Finance → Revenue Management.
            </p>
            <p>
              <strong className="text-foreground">SAP & Salesforce SPA modules</strong> — interactive React pages with searchable tables, analytics charts and one-click "Send to generator".
            </p>
            <p>
              <strong className="text-foreground">Static product launchers</strong> — every other platform ships as bundled HTML repositories under <code className="font-mono">/Product/index.html</code>.
            </p>
            <p>
              <strong className="text-foreground">Templates / History / Collections / Compare</strong> — save, organise, re-run and diff your generated scripts.
            </p>
          </div>
        </section>

        {/* Platform breakdown */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2
              className="text-2xl font-semibold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Platform breakdown
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              {TOTAL_PRODUCTS} platforms · {TOTAL_MODULES} modules
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRODUCT_CATALOG.map((p) => (
              <Card key={p.key} className="p-4 bg-card border-border">
                <div className="flex items-start gap-3 mb-2">
                  <ProductLogo productKey={p.key} label={p.label} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-base font-semibold text-foreground leading-tight truncate"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        title={p.label}
                      >
                        {p.label}
                      </h3>
                      <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded shrink-0">
                        {p.idPrefix}-*
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.modules.map((m) => (
                    <span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                      {m}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section>
          <h2
            className="text-2xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            How to use it
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Open the <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link> to see every platform at a glance.</li>
            <li>Pick a platform card to browse the bundled cases — or paste a known ID into <em>Find by ID</em>.</li>
            <li>Inside SAP/Salesforce, click <em>Send to generator</em> on any case to pre-fill the AI prompt.</li>
            <li>Tweak the prompt, choose framework + language, and stream the script.</li>
            <li>Save it to <Link to="/history" className="text-primary hover:underline">History</Link>, group it in a <Link to="/collections" className="text-primary hover:underline">Collection</Link>, or share via a public link.</li>
          </ol>
        </section>

        {/* Use cases */}
        <section>
          <h2
            className="text-2xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Common use cases
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="p-3 rounded border border-border bg-card">QA leads accelerating regression-pack creation across packaged ERPs.</li>
            <li className="p-3 rounded border border-border bg-card">SRE/DevOps teams generating API, cloud and infra smoke tests.</li>
            <li className="p-3 rounded border border-border bg-card">Mobile teams scaffolding iOS/Android UI flows.</li>
            <li className="p-3 rounded border border-border bg-card">Consulting teams demoing test-coverage strategy across SAP, Salesforce, Workday, ServiceNow, Veeva and D365.</li>
          </ul>
        </section>

        {/* Acknowledgements */}
        <section>
          <h2
            className="text-2xl font-semibold text-foreground mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Thanks &amp; acknowledgements
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            TestForge AI exists because a small constellation of AI tools made it possible to build,
            iterate and ship at solo-builder velocity. Sincere thanks to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="p-3 rounded border border-border bg-card">
              <strong className="text-foreground">Anthropic Claude</strong> — primary code,
              prompt-design and reasoning partner powering both the in-app generator and
              much of the hand-written architecture.
            </li>
            <li className="p-3 rounded border border-border bg-card">
              <strong className="text-foreground">Perplexity</strong> — research,
              cross-referencing of platform/module taxonomies and on-the-fly fact checks.
            </li>
            <li className="p-3 rounded border border-border bg-card">
              <strong className="text-foreground">Google Jules</strong> — autonomous
              repository-level coding assistant used for batch refactors and PR-style edits.
            </li>
            <li className="p-3 rounded border border-border bg-card">
              <strong className="text-foreground">Google Gemini</strong> — secondary
              reasoning model and large-context summariser for the strict E2E batches.
            </li>
            <li className="p-3 rounded border border-border bg-card md:col-span-2">
              <strong className="text-foreground">Lovable</strong> — the build-and-deploy
              platform behind this site. Lovable orchestrates a Vite + React + TypeScript
              stack with shadcn/ui, Tailwind, React Router and Lovable Cloud (Supabase
              under the hood) for auth, database and edge functions; it pairs an AI
              code-edit workflow with a live preview, GitHub sync and one-click publishing.
              The streaming script generator on this site uses the Lovable AI Gateway
              with Anthropic Claude as the underlying model.
            </li>
          </ul>
        </section>

        <section className="pt-4 border-t border-border text-xs text-muted-foreground">
          Built by <a href="https://www.linkedin.com/in/kalilurrahman" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Kalilur Rahman</a> — a global IT executive's working tool, not a commercial product. Have feedback? Use the <Link to="/feedback" className="text-primary hover:underline">Feedback</Link> form.
        </section>
      </div>
    </>
  );
};

const Stat = ({ icon: Icon, value, label }: { icon: typeof Sparkles; value: string | number; label: string }) => (
  <Card className="p-4 bg-card border-border text-center">
    <Icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
    <div className="text-xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {value}
    </div>
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
  </Card>
);

export default About;
