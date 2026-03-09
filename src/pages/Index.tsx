import InputPanel from "@/components/generator/InputPanel";
import OutputPanel from "@/components/generator/OutputPanel";
import Dashboard from "@/components/Dashboard";
import { useGeneratorStore } from "@/store/generatorStore";
import { templates } from "@/data/templates";
import { streamGeneration } from "@/lib/generateScript";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useNotificationStore } from "@/store/notificationStore";

const Index = () => {
  const store = useGeneratorStore();
  const { user } = useAuth();

  const canGenerate = !!store.platform && store.businessCase.trim().length > 10 && !store.isGenerating;

  const handleGenerate = async () => {
    if (!store.platform || store.businessCase.trim().length < 10) return;
    store.setIsGenerating(true);
    store.setResult(null);
    store.setProgress(0);
    store.setProgressStep(0);

    await streamGeneration({
      params: {
        platform: store.platform,
        framework: store.framework,
        language: store.language,
        testScopes: store.testScopes,
        testCount: store.testCount,
        businessCase: store.businessCase,
      },
      onProgress: (step) => {
        store.setProgressStep(step);
        store.setProgress(Math.min(100, (step + 1) * 17));
      },
      onDelta: () => {
        // Streaming in progress
      },
      onDone: async (result) => {
        store.setProgress(100);
        store.setIsGenerating(false);
        store.setResult(result);

        // Notify if user navigated away
        if (document.hidden) {
          useNotificationStore.getState().addNotification(
            "Script Ready",
            `"${result.title}" has been generated successfully.`
          );
        }

        // Auto-save if user is logged in
        if (user) {
          try {
            await supabase.from("generations").insert({
              user_id: user.id,
              title: result.title,
              platform: store.platform!,
              framework: store.framework,
              language: store.language,
              test_scopes: store.testScopes,
              test_count: store.testCount,
              business_case: store.businessCase,
              script: result.script,
              test_cases: result.test_cases as any,
              prerequisites: result.prerequisites,
              coverage_notes: result.coverage_notes,
              known_limitations: result.known_limitations,
            });
            toast.success("Script saved to history");
          } catch {
            // Silently fail save
          }
        }
      },
      onError: (error) => {
        store.setIsGenerating(false);
        toast.error(error);
      },
    });
  };

  const handleSurpriseMe = () => {
    const featured = templates.filter((t) => t.is_featured);
    const pick = featured[Math.floor(Math.random() * featured.length)] || templates[0];
    store.setPlatform(pick.platform as any);
    store.setBusinessCase(pick.business_case_text);
    if (pick.suggested_framework) store.setFramework(pick.suggested_framework);
  };

  useKeyboardShortcuts({ onGenerate: handleGenerate, canGenerate });

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Dashboard />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel — 2/5 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <InputPanel onGenerate={handleGenerate} onSurpriseMe={handleSurpriseMe} />
            </div>
          </div>
          {/* Output Panel — 3/5 */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-5 min-h-[500px]">
              <OutputPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
