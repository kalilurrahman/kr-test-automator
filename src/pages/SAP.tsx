import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SapOverview } from "@/components/sap/SapOverview";
import { SapTestCases } from "@/components/sap/SapTestCases";
import { SapReports } from "@/components/sap/SapReports";

type TabId = "overview" | "cases" | "reports";

const SAPPage = () => {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("tab") as TabId) || "overview";
  const [tab, setTab] = useState<TabId>(initial);

  useEffect(() => {
    if (params.get("tab") !== tab) {
      const next = new URLSearchParams(params);
      next.set("tab", tab);
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              SAP Test Repository
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              841 curated test cases across 33 modules · grounding source for AI script generation.
            </p>
          </div>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
          <TabsList className="grid grid-cols-3 w-full sm:w-auto sm:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cases">Test Cases</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <SapOverview />
          </TabsContent>
          <TabsContent value="cases" className="mt-4">
            <SapTestCases />
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <SapReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SAPPage;
