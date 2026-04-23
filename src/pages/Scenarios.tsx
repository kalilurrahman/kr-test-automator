import { lazy, Suspense } from "react";
import { Loader2, TestTube2 } from "lucide-react";
import SeoHead from "@/components/SeoHead";

const GlobalCaseBrowser = lazy(() =>
  import("@/components/GlobalCaseBrowser").then((m) => ({ default: m.GlobalCaseBrowser })),
);

const Scenarios = () => (
  <>
    <SeoHead
      title="Generated Scenarios · TestForge AI"
      description="Search every generated test scenario across all platforms — SAP, Salesforce, Workday, Veeva, ServiceNow and more."
      canonical="/scenarios"
    />
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <header className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <TestTube2 className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h1
            className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Generated Scenarios
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search every test case across every product. Click a hit to open its detail view.
          </p>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing search…
          </div>
        }
      >
        <GlobalCaseBrowser />
      </Suspense>
    </div>
  </>
);

export default Scenarios;
