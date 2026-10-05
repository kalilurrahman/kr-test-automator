import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  Database,
  Download,
  FileCode2,
  Fingerprint,
  FolderHeart,
  Layers3,
  LibraryBig,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATALOG, TOTAL_MODULES, TOTAL_PRODUCTS } from "@/data/productCatalog";
import { getGlobalStats } from "@/lib/globalStats";

const featuredProducts = ["sap", "salesforce", "dataiku", "databricks", "apacheiceberg", "medidata", "iqvia", "snowflake"]
  .map((key) => PRODUCT_CATALOG.find((product) => product.key === key))
  .filter((product): product is (typeof PRODUCT_CATALOG)[number] => Boolean(product));

const features = [
  {
    icon: Database,
    title: "Explore real platform coverage",
    body: "Browse enterprise scenarios by product, module, industry, and workflow. Search the library or open a case straight into the generator.",
    href: "/platforms",
    link: "Explore platform libraries",
  },
  {
    icon: FileCode2,
    title: "Generate runnable test scripts",
    body: "Turn plain-language requirements and existing cases into framework-ready automation, with the context and steps kept together.",
    href: "/content-automation",
    link: "Open Content Automation",
  },
  {
    icon: FolderHeart,
    title: "Keep useful work close",
    body: "Save generated scripts, collect reusable tests, revisit history, compare outputs, and download work when it is ready to share.",
    href: "/templates",
    link: "Browse templates",
  },
];

const workflow = [
  { number: "01", title: "Find your starting point", body: "Choose a platform, industry scenario, or reusable template.", icon: Search },
  { number: "02", title: "Shape the test", body: "Set framework, language, test scope, and the workflow details that matter.", icon: Workflow },
  { number: "03", title: "Generate and keep moving", body: "Review the script, save it, share it, or download it for your team.", icon: Braces },
];

const Index = () => {
  const [stats, setStats] = useState<{ cases: number; unique: number } | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Keep older shared links and repository deep links working after the generator moved.
  useEffect(() => {
    const hasGeneratorIntent = ["platform", "prefill", "industry", "script", "service"].some((key) => searchParams.has(key));
    if (hasGeneratorIntent) {
      const query = searchParams.toString();
      navigate(`/content-automation${query ? `?${query}` : ""}`, { replace: true });
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    let active = true;
    getGlobalStats().then((result) => {
      if (active) setStats({ cases: result.totalCases, unique: result.uniqueIds });
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const caseCount = stats?.unique.toLocaleString() ?? "200K+";

  return (
    <>
      <SeoHead
        title="TestForge AI · Enterprise test automation, ready to move"
        description="Explore enterprise test libraries, generate automation scripts, and keep reusable QA work moving across platforms, teams, and frameworks."
        canonical="/"
      />
      <div className="min-w-0 overflow-hidden">
        <section className="relative isolate border-b border-border">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_16%_0%,hsl(var(--primary)/0.16),transparent_40%),radial-gradient(ellipse_at_85%_65%,hsl(190_75%_32%/0.14),transparent_38%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-24">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise QA, connected end to end
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Turn complex workflows into <span className="text-primary">testable</span> progress.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Find the right scenario, shape it into an automated test, and carry the result into your team’s workflow—all in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 gap-2 px-5 text-sm font-semibold shadow-[0_8px_32px_-12px_hsl(var(--primary)/0.55)]">
                  <Link to="/content-automation">
                    Open Content Automation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 gap-2 border-border bg-background/40 px-5 text-sm">
                  <Link to="/platforms">
                    Explore test libraries <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                {["Platform-aware scenarios", "Framework-ready scripts", "Searchable and reusable"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <HeroWorkspace caseCount={caseCount} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10" aria-label="TestForge at a glance">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Layers3} value={TOTAL_PRODUCTS.toLocaleString()} label="platforms and products" />
            <StatCard icon={Database} value={caseCount} label="indexed test cases" />
            <StatCard icon={Workflow} value={TOTAL_MODULES.toLocaleString()} label="product modules" />
            <StatCard icon={Fingerprint} value="One flow" label="discover → generate → reuse" />
          </div>
          {stats?.cases && stats.cases !== stats.unique ? (
            <p className="mt-2 text-right text-[11px] text-muted-foreground">{stats.cases.toLocaleString()} total records · duplicates excluded from indexed count</p>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">A complete QA workspace</p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Everything around the test, in one flow.</h2>
            </div>
            <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              See the full dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.href} className="group rounded-2xl border border-border bg-card/75 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-black/10">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="min-h-[4.5rem] text-sm leading-6 text-muted-foreground">{feature.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {feature.link}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card/35">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">From idea to implementation</p>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">A shorter path from requirement to repeatable test.</h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">Keep the scenario, automation target, and reusable output connected as work moves from QA planning into delivery.</p>
                <Button asChild variant="outline" className="mt-6 gap-2">
                  <Link to="/content-automation">Start a new test <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {workflow.map((step) => (
                  <div key={step.number} className="relative rounded-xl border border-border bg-background/70 p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-xs text-primary">{step.number}</span>
                      <step.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-xs leading-5 text-muted-foreground">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Broad by design</p>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Built around the systems your teams already run.</h2>
            </div>
            <Link to="/platforms" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">Browse all {TOTAL_PRODUCTS} products <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {featuredProducts.map((product) => (
              <Link key={product.key} to={product.route} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
                <span className="h-2 w-2 rounded-full bg-primary" />{product.label}<ChevronRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
            <Link to="/platforms" className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary">
              + {Math.max(0, TOTAL_PRODUCTS - featuredProducts.length)} more <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-card to-card p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><CirclePlay className="h-4 w-4" />Ready when you are</div>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Make the next test easier to ship.</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Start with a requirement, a template, or a case from the library. Your automation workspace is one click away.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-56">
                <Button asChild size="lg" className="gap-2"><Link to="/content-automation">Open Content Automation <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild variant="ghost" className="gap-2 text-muted-foreground"><Link to="/downloads"><Download className="h-4 w-4" />Browse downloads</Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const StatCard = ({ icon: Icon, value, label }: { icon: typeof Database; value: string; label: string }) => (
  <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card/65 p-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
    <span className="min-w-0"><strong className="block truncate text-xl font-semibold text-foreground">{value}</strong><small className="block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</small></span>
  </div>
);

const HeroWorkspace = ({ caseCount }: { caseCount: string }) => (
  <div className="relative mx-auto min-w-0 w-full max-w-[620px] lg:ml-auto">
    <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-cyan-500/10 to-transparent blur-2xl" />
    <div className="relative rounded-2xl border border-white/10 bg-[#080d15]/95 p-3 shadow-[0_30px_100px_-35px_rgba(0,0,0,0.9)] sm:p-4">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-2 pb-3">
        <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary"><Sparkles className="h-4 w-4" /></span><div><div className="text-xs font-semibold text-white">TestForge Studio</div><div className="text-[10px] text-slate-400">Automation workspace</div></div></div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />Ready to generate</span>
      </div>
      <div className="grid gap-3 p-2 pt-4 sm:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Platform</div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 text-xs text-white"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/15 text-[10px] font-bold text-cyan-300">DB</span>Databricks<ChevronRight className="ml-auto h-3 w-3 rotate-90 text-slate-500" /></div>
            <div className="mt-2.5 flex flex-wrap gap-1.5"><span className="rounded bg-primary/10 px-2 py-1 text-[9px] text-primary">Data quality</span><span className="rounded bg-white/5 px-2 py-1 text-[9px] text-slate-400">Governance</span></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400"><span>Test scenario</span><span className="text-primary">●</span></div>
            <p className="text-[11px] leading-5 text-slate-200">Validate a governed Delta pipeline after schema evolution and confirm quality checks block invalid records.</p>
            <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-500"><ShieldCheck className="h-3 w-3 text-emerald-400" />Regression · Data validation</div>
          </div>
          <div className="grid grid-cols-2 gap-2"><MiniMetric icon={LibraryBig} value={caseCount} label="cases indexed" /><MiniMetric icon={Clock3} value="One flow" label="saved to history" /></div>
        </div>
        <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0b111c]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5"><div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-400/80" /><span className="h-2 w-2 rounded-full bg-amber-300/80" /><span className="h-2 w-2 rounded-full bg-emerald-400/80" /></div><span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-slate-400">Playwright · TypeScript</span></div>
          <div className="space-y-1 p-3 font-mono text-[9px] leading-5 sm:p-4 sm:text-[10px]">
            <CodeLine n="1"><span className="text-violet-300">test</span><span className="text-slate-300">(</span><span className="text-emerald-300">'rejects invalid schema'</span><span className="text-slate-300">, </span><span className="text-amber-200">async</span><span className="text-slate-300"> (&#123; page &#125;) =&gt; &#123;</span></CodeLine>
            <CodeLine n="2"><span className="text-slate-500">  // Open the governed pipeline</span></CodeLine>
            <CodeLine n="3"><span className="text-sky-300">  await</span><span className="text-slate-300"> page.</span><span className="text-blue-200">goto</span><span className="text-slate-300">(</span><span className="text-emerald-300">'/pipelines/orders'</span><span className="text-slate-300">);</span></CodeLine>
            <CodeLine n="4"><span className="text-sky-300">  await</span><span className="text-slate-300"> page.</span><span className="text-blue-200">getByRole</span><span className="text-slate-300">(</span><span className="text-emerald-300">'button'</span><span className="text-slate-300">, &#123; name: </span><span className="text-emerald-300">'Run checks'</span><span className="text-slate-300"> &#125;).</span><span className="text-blue-200">click</span><span className="text-slate-300">();</span></CodeLine>
            <CodeLine n="5"><span className="text-sky-300">  await</span><span className="text-slate-300"> expect(page.</span><span className="text-blue-200">getByText</span><span className="text-slate-300">(</span><span className="text-emerald-300">'Schema check passed'</span><span className="text-slate-300">)).</span><span className="text-blue-200">toBeVisible</span><span className="text-slate-300">();</span></CodeLine>
            <CodeLine n="6"><span className="text-slate-300">&#125;);</span></CodeLine>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-3 py-2.5 text-[9px]"><span className="flex items-center gap-1.5 text-emerald-300"><Check className="h-3 w-3" />Script preview ready</span><span className="text-slate-500">Review · Save · Export</span></div>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-white/10 px-2 pt-3 text-[9px] text-slate-500"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-primary" />Context stays attached to the test</span><span className="inline-flex items-center gap-1.5"><Download className="h-3 w-3" />Shareable output</span></div>
    </div>
    <div className="absolute -left-4 top-[20%] hidden rounded-xl border border-white/10 bg-[#101a25]/95 px-3 py-2 shadow-xl sm:block lg:-left-10"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300"><Check className="h-3.5 w-3.5" /></span><div><div className="text-[10px] font-medium text-white">Scenario matched</div><div className="text-[9px] text-slate-400">Platform + module context</div></div></div></div>
    <div className="absolute -right-3 bottom-[13%] hidden rounded-xl border border-white/10 bg-[#101a25]/95 px-3 py-2 shadow-xl sm:block lg:-right-8"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-3.5 w-3.5" /></span><div><div className="text-[10px] font-medium text-white">Ready for your framework</div><div className="text-[9px] text-slate-400">Generate · Save · Reuse</div></div></div></div>
  </div>
);

const CodeLine = ({ n, children }: { n: string; children: ReactNode }) => <div className="flex gap-3 whitespace-nowrap"><span className="w-3 select-none text-right text-slate-600">{n}</span><code>{children}</code></div>;

const MiniMetric = ({ icon: Icon, value, label }: { icon: typeof Database; value: string; label: string }) => <div className="rounded-lg border border-white/10 bg-white/[0.035] p-2.5"><Icon className="mb-1 h-3.5 w-3.5 text-primary" /><div className="text-xs font-semibold text-white">{value}</div><div className="text-[9px] text-slate-500">{label}</div></div>;

export default Index;
