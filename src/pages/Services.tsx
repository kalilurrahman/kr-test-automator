import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Cpu,
  Code2,
  TestTube2,
  Zap,
  Shield,
  Smartphone,
  Server,
  Workflow,
  ArrowRight,
} from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AUTOMATION_SCRIPT_OPTIONS } from "@/data/industryMeta";

interface ServiceEntry {
  key: string;
  label: string;
  blurb: string;
  family: ServiceFamilyKey;
  language: string;
  /** What the engine actually targets when the user generates */
  surface: "Web" | "Mobile" | "API" | "Desktop" | "Cross-platform";
  /** Optional override route — defaults to /?platform=auto */
  route?: string;
}

type ServiceFamilyKey =
  | "ui_e2e"
  | "api_perf"
  | "mobile"
  | "model_based"
  | "legacy_record"
  | "security_devops";

interface ServiceFamily {
  key: ServiceFamilyKey;
  label: string;
  blurb: string;
  icon: typeof Cpu;
}

const SERVICE_FAMILIES: ServiceFamily[] = [
  { key: "ui_e2e", label: "UI / End-to-End", blurb: "Browser-driven E2E suites for web apps and SaaS portals.", icon: Code2 },
  { key: "api_perf", label: "API & Performance", blurb: "Contract, integration and performance suites for REST/GraphQL.", icon: Zap },
  { key: "mobile", label: "Mobile", blurb: "Cross-platform iOS / Android automation.", icon: Smartphone },
  { key: "model_based", label: "Model-Based", blurb: "Tricentis-style model-based and codeless automation.", icon: Workflow },
  { key: "legacy_record", label: "Legacy / Record-Replay", blurb: "Long-standing record-replay tools for legacy estates.", icon: Server },
  { key: "security_devops", label: "Security & DevOps", blurb: "Security gates, smoke pipelines and CI integration.", icon: Shield },
];

/**
 * Curated services catalogue — derived from AUTOMATION_SCRIPT_OPTIONS but
 * grouped into families so users can navigate by capability rather than tool.
 */
const SERVICE_FAMILY_MAP: Record<string, ServiceFamilyKey> = {
  tricentis_tosca: "model_based",
  playwright_ts: "ui_e2e",
  playwright_py: "ui_e2e",
  cypress_js: "ui_e2e",
  selenium_java: "ui_e2e",
  selenium_py: "ui_e2e",
  selenium_cs: "ui_e2e",
  robot_framework: "ui_e2e",
  katalon: "ui_e2e",
  uft_one: "legacy_record",
  postman_newman: "api_perf",
  appium: "mobile",
};

const SURFACE_MAP: Record<string, ServiceEntry["surface"]> = {
  postman_newman: "API",
  appium: "Mobile",
  uft_one: "Desktop",
  tricentis_tosca: "Cross-platform",
};

const SERVICES: ServiceEntry[] = AUTOMATION_SCRIPT_OPTIONS.map((opt) => ({
  key: opt.value,
  label: opt.label,
  blurb: blurbFor(opt.value),
  family: SERVICE_FAMILY_MAP[opt.value] ?? "ui_e2e",
  language: opt.language,
  surface: SURFACE_MAP[opt.value] ?? "Web",
}));

function blurbFor(key: string): string {
  switch (key) {
    case "tricentis_tosca": return "Model-based, codeless test design with Tosca scan and risk-based execution.";
    case "playwright_ts": return "Modern, fast browser automation with Microsoft Playwright in TypeScript.";
    case "playwright_py": return "Same Playwright engine in Python — great for data-driven and BDD pipelines.";
    case "cypress_js": return "Developer-first E2E framework with time-travel debugging and great DX.";
    case "selenium_java": return "WebDriver standard with mature Java ecosystem and enterprise integrations.";
    case "selenium_py": return "Python WebDriver — popular for quick scripting and lab automation.";
    case "selenium_cs": return "Selenium for the .NET stack — works well alongside SpecFlow.";
    case "robot_framework": return "Keyword-driven automation, ideal for non-developer testers and BDD.";
    case "katalon": return "All-in-one Studio with codeless authoring backed by Selenium / Appium.";
    case "uft_one": return "OpenText UFT One — record-replay automation for legacy desktop / SAP / Java.";
    case "postman_newman": return "Headless Postman runs in CI for REST / GraphQL contract testing.";
    case "appium": return "Cross-platform mobile automation for iOS and Android via WebDriver.";
    default: return "Automation service ready to plug into the generator.";
  }
}

type SortKey = "name" | "family" | "language";

const Services = () => {
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState<ServiceFamilyKey | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("family");

  const filtered = useMemo<ServiceEntry[]>(() => {
    const q = query.trim().toLowerCase();
    let list = SERVICES.filter((s) => {
      if (familyFilter !== "all" && s.family !== familyFilter) return false;
      if (!q) return true;
      return (
        s.label.toLowerCase().includes(q) ||
        s.blurb.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q) ||
        s.surface.toLowerCase().includes(q)
      );
    });
    if (sortKey === "name") list = [...list].sort((a, b) => a.label.localeCompare(b.label));
    else if (sortKey === "language") list = [...list].sort((a, b) => a.language.localeCompare(b.language));
    return list;
  }, [query, familyFilter, sortKey]);

  const grouped = useMemo(() => {
    if (sortKey !== "family") return null;
    return SERVICE_FAMILIES.map((family) => ({
      family,
      services: filtered.filter((s) => s.family === family.key),
    })).filter((b) => b.services.length > 0);
  }, [filtered, sortKey]);

  return (
    <>
      <SeoHead
        title="Services · TestForge AI"
        description="Twelve automation services grouped by capability — UI E2E, API & performance, mobile, model-based, legacy record-replay and security/DevOps."
        canonical="/services"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Services
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {SERVICES.length} automation services across {SERVICE_FAMILIES.length} families.
              Pick a service to seed the generator with the right framework hint.
            </p>
          </div>
        </header>

        {/* Controls */}
        <Card className="p-3 sm:p-4 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service, language or surface…"
                className="pl-9 bg-background"
                aria-label="Search services"
              />
            </div>
            <div className="md:col-span-3">
              <Select
                value={familyFilter}
                onValueChange={(v) => setFamilyFilter(v as ServiceFamilyKey | "all")}
              >
                <SelectTrigger aria-label="Filter by family">
                  <SelectValue placeholder="All families" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All families</SelectItem>
                  {SERVICE_FAMILIES.map((f) => (
                    <SelectItem key={f.key} value={f.key}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                <SelectTrigger aria-label="Sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Group by family</SelectItem>
                  <SelectItem value="name">Sort A → Z</SelectItem>
                  <SelectItem value="language">Sort by language</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-2 font-mono">
            Showing {filtered.length} of {SERVICES.length} services
          </div>
        </Card>

        {grouped ? (
          <div className="space-y-8">
            {grouped.map((bucket) => {
              const Icon = bucket.family.icon;
              return (
                <section key={bucket.family.key}>
                  <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                    <h2
                      className="text-lg font-semibold text-foreground inline-flex items-center gap-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {bucket.family.label}
                    </h2>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {bucket.services.length} services
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{bucket.family.blurb}</p>
                  <ServiceGrid services={bucket.services} />
                </section>
              );
            })}
          </div>
        ) : (
          <ServiceGrid services={filtered} />
        )}
      </div>
    </>
  );
};

const ServiceGrid = ({ services }: { services: ServiceEntry[] }) => {
  if (services.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground bg-card border-border">
        No services match your filters.
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {services.map((s) => (
        <Card key={s.key} className="p-4 bg-card border-border flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {s.label}
            </h3>
            <Badge variant="outline" className="text-[10px] font-mono">
              {s.surface}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground flex-1">{s.blurb}</p>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-muted-foreground uppercase">{s.language}</span>
            <Button asChild variant="ghost" size="sm" className="gap-1.5 text-primary">
              <Link to={`/?service=${encodeURIComponent(s.key)}`}>
                Use service <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Services;
