import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const platforms = [
  { value: "", label: "None (ask each time)" },
  { value: "sap", label: "SAP" },
  { value: "salesforce", label: "Salesforce" },
  { value: "veeva", label: "Veeva" },
  { value: "servicenow", label: "ServiceNow" },
  { value: "workday", label: "Workday" },
  { value: "oracle", label: "Oracle" },
  { value: "web", label: "Web" },
  { value: "api", label: "REST API" },
  { value: "mobile_ios", label: "iOS" },
  { value: "mobile_android", label: "Android" },
];

const frameworks = [
  { value: "playwright_ts", label: "Playwright (TS)" },
  { value: "playwright_js", label: "Playwright (JS)" },
  { value: "selenium_java", label: "Selenium (Java)" },
  { value: "selenium_python", label: "Selenium (Python)" },
  { value: "cypress_js", label: "Cypress (JS)" },
  { value: "robot_framework", label: "Robot Framework" },
  { value: "appium_java", label: "Appium (Java)" },
  { value: "rest_assured", label: "REST Assured" },
  { value: "karate", label: "Karate DSL" },
];

const Settings = () => {
  const { user } = useAuth();
  const [defaultPlatform, setDefaultPlatform] = useState("");
  const [defaultFramework, setDefaultFramework] = useState("playwright_ts");
  const [defaultTestCount, setDefaultTestCount] = useState(10);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await (supabase
        .from("profiles")
        .select("default_platform, default_framework, default_test_count") as any)
        .eq("id", user.id)
        .single();
      if (data) {
        setDefaultPlatform(data.default_platform || "");
        setDefaultFramework(data.default_framework || "playwright_ts");
        setDefaultTestCount(data.default_test_count || 10);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await (supabase
      .from("profiles")
      .update({
        default_platform: defaultPlatform || null,
        default_framework: defaultFramework,
        default_test_count: defaultTestCount,
        updated_at: new Date().toISOString(),
      } as any) as any)
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Failed to save settings");
    } else {
      toast.success("Settings saved");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-muted-foreground">Sign in to manage settings.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Settings
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Default Preferences</h2>
          <p className="text-sm text-muted-foreground -mt-4">
            These will be pre-filled when you start a new generation.
          </p>

          {/* Default Platform */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Default Platform</Label>
            <select
              value={defaultPlatform}
              onChange={(e) => setDefaultPlatform(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {platforms.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Default Framework */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Default Framework</Label>
            <select
              value={defaultFramework}
              onChange={(e) => setDefaultFramework(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {frameworks.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Default Test Count */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Default Test Count</Label>
            <Slider
              value={[defaultTestCount]}
              onValueChange={([v]) => setDefaultTestCount(v)}
              min={5}
              max={50}
              step={5}
              className="mb-1"
            />
            <span className="text-xs text-muted-foreground">
              Default: <span className="text-primary font-semibold">{defaultTestCount}</span> test cases
            </span>
          </div>

          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
