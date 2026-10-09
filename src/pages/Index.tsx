import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronRight,
  CirclePlay,
  Database,
  Download,
  FileCode2,
  FolderHeart,
  Layers3,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import brandHero from "@/assets/validaira-brand-hero.jpg";
import { HomeProductExplorer } from "@/components/home-product-explorer";
import { CatalogueSnapshot } from "@/components/catalogue-snapshot";
import { TOTAL_MODULES, TOTAL_PRODUCTS } from "@/data/productCatalog";
import { getGlobalStats, type GlobalStats } from "@/lib/globalStats";

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
  const [stats, setStats] = useState<GlobalStats | null>(null);
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
      if (active) setStats(result);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const caseCount = stats?.uniqueIds.toLocaleString() ?? "—";

  return (
    <>
      <SeoHead
        title="Validaira — AI-native quality engineering for confident releases"
        description="Explore enterprise test libraries, generate automation, evaluate AI applications, diagnose failures, and maintain regression coverage with Validaira."
        canonical="/"
      />
      <div className="min-w-0 overflow-hidden">
        <section className="brand-hero relative isolate overflow-hidden border-b border-border">
          <img src={brandHero} alt="Gold Validaira V with mint validation mark in a precision laboratory" width={1920} height={1088} fetchPriority="high" className="brand-hero-image absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="brand-hero-scrim pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-7xl px-4 py-9 sm:py-12 lg:py-14">
            <div className="max-w-xl">
              <p className="brand-hero-accent mb-4 flex items-center gap-2 text-xs font-semibold uppercase"><Sparkles className="h-4 w-4" />AI-native quality engineering</p>
              <h1 className="text-6xl font-semibold leading-none sm:text-7xl">Validaira</h1>
              <p className="mt-4 max-w-md text-2xl leading-snug sm:text-3xl">Confident releases start with better tests.</p>
              <p className="brand-hero-copy mt-5 max-w-md text-sm leading-6 sm:text-base">Explore enterprise scenarios, generate framework-ready automation, and keep your quality engineering work connected.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="brand-hero-primary h-12 gap-2 px-5 text-sm font-semibold"><Link to="/content-automation">Generate a test script <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="brand-hero-secondary h-12 gap-2 px-5 text-sm"><Link to="/platforms">Explore test libraries <ChevronRight className="h-4 w-4" /></Link></Button>
              </div>
              <div className="brand-hero-copy mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                {["Platform-aware", "Framework-ready", "Reusable"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check className="brand-hero-accent h-3.5 w-3.5" />{item}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10" aria-label="Validaira at a glance">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Layers3} value={TOTAL_PRODUCTS.toLocaleString()} label="platforms and products" />
            <StatCard icon={Database} value={caseCount} label="indexed test cases" />
            <StatCard icon={Workflow} value={TOTAL_MODULES.toLocaleString()} label="product modules" />
            <StatCard icon={Braces} value="5,000" label="original AI-product cases" />
          </div>
          {stats?.totalCases && stats.totalCases !== stats.uniqueIds ? (
            <p className="mt-2 text-right text-[11px] text-muted-foreground">{stats.totalCases.toLocaleString()} total records · duplicates excluded from indexed count</p>
          ) : null}
        </section>

        <HomeProductExplorer />
        <CatalogueSnapshot stats={stats} />

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
              <Link key={feature.title} to={feature.href} className="group rounded-lg border border-border bg-card/75 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl ">
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

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:pb-20">
          <div className="border-t border-border py-8 sm:py-10">
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
  <div className="flex min-w-0 items-center gap-3 border-l-2 border-primary/40 py-2 pl-3 sm:pl-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
    <span className="min-w-0"><strong className="block truncate text-xl font-semibold text-foreground">{value}</strong><small className="block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</small></span>
  </div>
);

export default Index;
