import { useEffect, useState } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers } from "lucide-react";
import { getPlatform, getModule, type PlatformModule } from "@/data/platformManifests";
import { PlatformOverview } from "@/components/platform/PlatformOverview";
import { PlatformRepository } from "@/components/platform/PlatformRepository";
import SeoHead from "@/components/SeoHead";

type TabId = "overview" | "repository";

const PlatformPage = () => {
  const { platformId = "" } = useParams<{ platformId: string }>();
  const [params, setParams] = useSearchParams();
  const platform = getPlatform(platformId);

  const initialTab = (params.get("tab") as TabId) || "overview";
  const initialModule = params.get("module") || "";

  const [tab, setTab] = useState<TabId>(initialTab);
  const [selectedModule, setSelectedModule] = useState<PlatformModule | null>(() => {
    if (!platform) return null;
    return getModule(platform, initialModule) ?? platform.modules[0] ?? null;
  });

  useEffect(() => {
    if (!platform) return;
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    if (tab === "repository" && selectedModule) next.set("module", selectedModule.id);
    else next.delete("module");
    if (next.toString() !== params.toString()) setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, selectedModule?.id]);

  if (!platform) {
    return <Navigate to="/dashboard" replace />;
  }
  if (!selectedModule) {
    return <Navigate to="/dashboard" replace />;
  }

  const openModule = (mod: PlatformModule) => {
    setSelectedModule(mod);
    setTab("repository");
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <SeoHead
        title={`${platform.label} Test Repository · KR Test Automator`}
        description={platform.description}
      />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {platform.label} Test Repository
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {platform.modules.length} modules · live CSV preview · grounding source for AI script generation.
            </p>
          </div>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as TabId)}>
          <TabsList className="grid grid-cols-2 w-full sm:w-auto sm:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repository">Repository</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <PlatformOverview platform={platform} onOpenModule={openModule} />
          </TabsContent>
          <TabsContent value="repository" className="mt-4">
            <PlatformRepository
              platform={platform}
              selectedModule={selectedModule}
              onSelectModule={setSelectedModule}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlatformPage;
