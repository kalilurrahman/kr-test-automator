import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { templates, type Template } from "@/data/templates";
import { platforms } from "@/data/platforms";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGeneratorStore, type Platform } from "@/store/generatorStore";

const complexityColors: Record<string, string> = {
  basic: "bg-green-500/15 text-green-400",
  intermediate: "bg-blue-500/15 text-blue-400",
  advanced: "bg-orange-500/15 text-orange-400",
  comprehensive: "bg-purple-500/15 text-purple-400",
};

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android", m365: "M365",
};

const industries = ["All", "erp", "crm", "pharma", "itsm", "hr", "retail", "bfsi"];
const complexities = ["All", "basic", "intermediate", "advanced", "comprehensive"];

const Templates = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [complexity, setComplexity] = useState("All");
  const navigate = useNavigate();
  const store = useGeneratorStore();

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (industry !== "All" && t.industry !== industry) return false;
      if (platform !== "All" && t.platform !== platform) return false;
      if (complexity !== "All" && t.complexity !== complexity) return false;
      return true;
    });
  }, [search, industry, platform, complexity]);

  const useTemplate = (t: Template) => {
    store.setPlatform(t.platform as Platform);
    store.setBusinessCase(t.business_case_text);
    if (t.suggested_framework) store.setFramework(t.suggested_framework);
    if (t.suggested_language) store.setLanguage(t.suggested_language);
    if (t.test_scope.length) {
      // Reset and set scopes
      t.test_scope.forEach((s) => {
        if (!store.testScopes.includes(s as any)) store.toggleScope(s as any);
      });
    }
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Template Library
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {[
            { label: "Industry", value: industry, set: setIndustry, options: industries },
            { label: "Platform", value: platform, set: setPlatform, options: ["All", ...Object.keys(platformLabels)] },
            { label: "Complexity", value: complexity, set: setComplexity, options: complexities },
          ].map((f) => (
            <select
              key={f.label}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {f.label}: {o === "All" ? "All" : o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {filtered.map((t) => (
            <motion.div
              key={t.id}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {platformLabels[t.platform] || t.platform}
                </span>
                <span className="text-xs text-muted-foreground">· {t.industry.toUpperCase()}</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {t.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{t.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${complexityColors[t.complexity] || "bg-muted text-muted-foreground"}`}>
                  {t.complexity}
                </span>
                {t.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-accent text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Used {t.use_count} times</span>
                <button
                  onClick={() => useTemplate(t)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Use Template <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No templates match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
