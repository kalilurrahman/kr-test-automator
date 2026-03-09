import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Star, FolderOpen, Sparkles, LayoutTemplate, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentScript {
  id: string;
  title: string;
  platform: string;
  framework: string;
  created_at: string;
}

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
  mobile_ios: "iOS", mobile_android: "Android",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, starred: 0, collections: 0 });
  const [recent, setRecent] = useState<RecentScript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [totalRes, starredRes, colRes, recentRes] = await Promise.all([
        supabase.from("generations").select("*", { count: "exact", head: true }),
        supabase.from("generations").select("*", { count: "exact", head: true }).eq("is_starred", true),
        supabase.from("collections").select("*", { count: "exact", head: true }),
        supabase.from("generations").select("id, title, platform, framework, created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        total: totalRes.count || 0,
        starred: starredRes.count || 0,
        collections: colRes.count || 0,
      });
      setRecent((recentRes.data as RecentScript[]) || []);
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) return null;

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="mb-6">
      {/* Welcome + Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}
        </h2>
        <div className="flex gap-2">
          <Link
            to="/templates"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <LayoutTemplate className="w-3.5 h-3.5" /> Browse Templates
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <Skeleton className="w-5 h-5 mb-2 rounded" />
              <Skeleton className="w-10 h-7 mb-1 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          ))
        ) : (
          [
            { icon: FileText, label: "Total Scripts", value: stats.total, color: "text-primary" },
            { icon: Star, label: "Starred", value: stats.starred, color: "text-primary" },
            { icon: FolderOpen, label: "Collections", value: stats.collections, color: "text-primary" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <Icon className={`w-5 h-5 mb-2 ${color}`} />
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))
        )}
      </div>

      {/* Recent Scripts */}
      {loading ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <Skeleton className="w-32 h-5 mb-3 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="flex-1 h-4 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          ))}
        </div>
      ) : recent.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" /> Recent Scripts
            </h3>
            <Link to="/history" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {recent.map((s) => (
              <Link
                key={s.id}
                to="/history"
                className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-accent/50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {s.title}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-accent text-[10px] text-muted-foreground shrink-0">
                    {platformLabels[s.platform] || s.platform}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">{formatDate(s.created_at)}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
