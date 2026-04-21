import { ExternalLink, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const REPORT_PATH = "/downloads/SAP_Test_Repository_v3.html";

export function SapReports() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Interactive HTML report</h3>
            <p className="text-xs text-muted-foreground">
              Self-contained, offline-friendly view of all 841 cases with built-in search and filters.
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <a href={REPORT_PATH} target="_blank" rel="noopener noreferrer" className="gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> Open in new tab
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={REPORT_PATH} download className="gap-1">
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <iframe
          src={REPORT_PATH}
          title="SAP Test Repository v3 — full report"
          sandbox="allow-same-origin allow-scripts allow-popups"
          className="w-full bg-background"
          style={{ height: "calc(100vh - 280px)", minHeight: 600 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
