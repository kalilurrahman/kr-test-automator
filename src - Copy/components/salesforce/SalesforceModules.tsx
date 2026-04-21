import { ArrowRight, FileSpreadsheet, FileText, FileCode2 } from "lucide-react";
import { SALESFORCE_CLOUDS } from "@/data/salesforceClouds";

interface Props {
  onOpenRepository: (cloudId: string) => void;
}

export function SalesforceModules({ onOpenRepository }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {SALESFORCE_CLOUDS.map((c) => (
        <div
          key={c.id}
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`text-base font-semibold ${c.accent}`}>{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.description}</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground shrink-0">
              {c.cases.toLocaleString()}
            </span>
          </div>

          <div className="text-[11px] text-muted-foreground border-t border-border pt-3">
            <span className="uppercase tracking-wide">Focus · </span>
            <span className="text-foreground/80">{c.domainFocus}</span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-1">
              <a
                href={c.csv}
                download
                title="Download CSV"
                className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
              >
                <FileSpreadsheet className="w-4 h-4" />
              </a>
              <a
                href={c.html}
                target="_blank"
                rel="noopener noreferrer"
                title="Open HTML report"
                className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
              >
                <FileText className="w-4 h-4" />
              </a>
              <a
                href={c.ts}
                download
                title="Download TypeScript module"
                className="p-2 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
              >
                <FileCode2 className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => onOpenRepository(c.id)}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:gap-2 transition-all"
            >
              Open repository <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
