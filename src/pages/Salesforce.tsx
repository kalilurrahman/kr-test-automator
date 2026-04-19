import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cloud } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesforceOverview } from "@/components/salesforce/SalesforceOverview";
import { SalesforceModules } from "@/components/salesforce/SalesforceModules";
import { SalesforceRepository } from "@/components/salesforce/SalesforceRepository";
import {
  SALESFORCE_CLOUDS, TOTAL_SALESFORCE_CASES, type SalesforceCloudId,
} from "@/data/salesforceClouds";

type TabId = "overview" | "modules" | "repository";

const SalesforcePage = () => {
  const [params, setParams] = useSearchParams();
  const initialTab = (params.get("tab") as TabId) || "overview";
  const initialCloud = (params.get("cloud") as SalesforceCloudId) || "sales";

  const [tab, setTab] = useState<TabId>(initialTab);
  const [cloud, setCloud] = useState<SalesforceCloudId>(
    SALESFORCE_CLOUDS.some((c) => c.id === initialCloud) ? initialCloud : "sales"
  );

  useEffect(() => {
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    if (tab === "repository") next.set("cloud", cloud);
    else next.delete("cloud");
    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, cloud]);

  const openRepository = (cloudId: string) => {
    setCloud(cloudId as SalesforceCloudId);
    setTab("repository");
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Salesforce Test Repository
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {SALESFORCE_CLOUDS.length} clouds · {TOTAL_SALESFORCE_CASES.toLocaleString()} curated cases · grounding source for AI script generation.
            </p>
          </div>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
          <TabsList className="grid grid-cols-3 w-full sm:w-auto sm:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="repository">Repository</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <SalesforceOverview onOpenRepository={openRepository} />
          </TabsContent>
          <TabsContent value="modules" className="mt-4">
            <SalesforceModules onOpenRepository={openRepository} />
          </TabsContent>
          <TabsContent value="repository" className="mt-4">
            <SalesforceRepository selectedCloud={cloud} onSelectCloud={setCloud} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalesforcePage;
