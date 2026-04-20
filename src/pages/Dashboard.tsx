import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ArrowRight, Sparkles, Package, Layers, FileCode2, BookMarked, History as HistoryIcon, FolderOpen, GitCompare, Info, MessageSquare } from "lucide-react";
import {
  PRODUCT_CATALOG,
  TOTAL_PRODUCTS,
  TOTAL_MODULES,
  BUNDLED_TEST_COUNT,
  ACCENT_CLASSES,
  resolveProductByTestId,
} from "@/data/productCatalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [idQuery, setIdQuery] = useState("");

  const handleIdLookup = (e: FormEvent) => {
    e.preventDefault();
    const product = resolveProductByTestId(idQuery);
    if (!product) {
      toast.error(`Unknown ID prefix in "${idQuery}". Try SF-HC-00005, SAP-001, WD-…`);
      return;
    }
    if (product.kind === "spa") {
      navigate(`/?platform=${product.key}&prefill=${encodeURIComponent(idQuery.trim())}`);
    } else {
      window.location.href = product.route;
    }
  };

  const stats = [
    { label: "Platforms", value: TOTAL_PRODUCTS, icon: Package },
    { label: "Modules", value: TOTAL_MODULES, icon: Layers },
    { label: "Bundled cases", value: BUNDLED_TEST_COUNT.toLocaleString(), icon: FileCode2 },
  ];

  const quickLinks = [
    { to: "/", label: "Generator", icon: Sparkles },
    { to: "/templates", label: "Templates", icon: BookMarked },
    { to: "/history", label: "History", icon: HistoryIcon },
    { to: "/collections", label: "Collections", icon: FolderOpen },
    { to: "/compare", label: "Compare", icon: GitCompare },
    { to: "/about", label: "About", icon: Info },
    { to: "/feedback", label: "Feedback", icon: MessageSquare },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard · TestForge AI Enterprise Test Hub</title>
        <meta name="description" content="Master dashboard for 15 enterprise test platforms — SAP, Salesforce, Workday, ServiceNow, Veeva, Dynamics 365, Oracle, AWS, GCP, Azure, iOS, Android and more." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero */}
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Enterprise Test Automation Hub
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            One launcher for every test pack — generate, browse, deep-link by ID, or jump straight into a platform repository.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s) => (
            <Card key={s.label} className="p-5 bg-card border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            </Card>
          ))}
        </section>

        {/* Find by ID */}
        <section className="mb-10">
          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Find by ID</h2>
            </div>
            <form onSubmit={handleIdLookup} className="flex gap-2 flex-col sm:flex-row">
              <Input
                value={idQuery}
                onChange={(e) => setIdQuery(e.target.value)}
                placeholder="e.g. SF-HC-00005, SAP-001, WD-PAY-042"
                className="flex-1 bg-background"
                aria-label="Test case ID lookup"
              />
              <Button type="submit" className="gap-2">
                Open <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Routes the ID into the generator (for SPA platforms) or opens the platform launcher.
            </p>
          </Card>
        </section>

        {/* Quick links */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Quick links</h2>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors"
              >
                <q.icon className="w-3.5 h-3.5" />
                {q.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section>
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">All platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_CATALOG.map((p) => {
              const cardContent = (
                <Card
                  className={`p-5 bg-card border-2 transition-all h-full flex flex-col ${ACCENT_CLASSES[p.accent]}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {p.label}
                    </h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded">
                      {p.modules.length} mods
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.modules.slice(0, 5).map((m) => (
                      <span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                        {m}
                      </span>
                    ))}
                    {p.modules.length > 5 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                        +{p.modules.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{p.idPrefix}-*</span>
                    <span className="text-primary inline-flex items-center gap-1">
                      Open <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              );

              return p.kind === "spa" ? (
                <Link key={p.key} to={p.route} className="block">{cardContent}</Link>
              ) : (
                <a key={p.key} href={p.route} className="block">{cardContent}</a>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
