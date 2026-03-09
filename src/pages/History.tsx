import { useState } from "react";
import { Search, Star } from "lucide-react";

// Mock history data for now (will be replaced with DB)
const mockHistory = [
  { id: "1", title: "SF Lead Lifecycle — 20 tests", platform: "salesforce", framework: "Playwright", created_at: "2h ago", is_starred: true },
  { id: "2", title: "SAP PO Approval — 15 tests", platform: "sap", framework: "Selenium", created_at: "Yesterday", is_starred: false },
  { id: "3", title: "Veeva Vault Doc State — 12 tests", platform: "veeva", framework: "REST API", created_at: "Mar 5", is_starred: true },
  { id: "4", title: "REST API CRUD Suite — 25 tests", platform: "api", framework: "REST Assured", created_at: "Mar 3", is_starred: false },
  { id: "5", title: "E-commerce Checkout — 18 tests", platform: "web", framework: "Cypress", created_at: "Feb 28", is_starred: false },
];

const platformLabels: Record<string, string> = {
  sap: "SAP", salesforce: "Salesforce", veeva: "Veeva", servicenow: "ServiceNow",
  workday: "Workday", oracle: "Oracle", web: "Web", api: "REST API",
};

const History = () => {
  const [search, setSearch] = useState("");
  const [starredOnly, setStarredOnly] = useState(false);

  const filtered = mockHistory.filter((h) => {
    if (search && !h.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (starredOnly && !h.is_starred) return false;
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          My Generated Scripts
        </h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scripts..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setStarredOnly(!starredOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
              starredOnly ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className="w-3.5 h-3.5" fill={starredOnly ? "currentColor" : "none"} />
            Starred
          </button>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-8">★</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Platform</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">Framework</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Generated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-b border-border last:border-0 hover:bg-accent/50 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    {h.is_starred ? (
                      <Star className="w-4 h-4 text-primary" fill="currentColor" />
                    ) : (
                      <Star className="w-4 h-4 text-muted-foreground/30" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">{h.title}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded bg-accent text-xs text-muted-foreground">
                      {platformLabels[h.platform] || h.platform}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{h.framework}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground text-xs">{h.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No scripts found. Generate your first test script!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
