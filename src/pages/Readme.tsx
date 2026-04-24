import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, ExternalLink, Loader2 } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const README_URL = "/README.md";
const REPO_URL = "https://github.com/";

const Readme = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(README_URL, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setMarkdown(text);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SeoHead
        title="README · TestForge AI"
        description="In-app rendering of the repository README — kept in sync with the GitHub source on every build."
        canonical="/readme"
      />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <header className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1
                className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                README
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Rendered from <code className="text-xs font-mono">README.md</code> in the
                connected GitHub repository — updates ship with every build.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a href="/README.md" target="_blank" rel="noreferrer">
              View raw <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </header>

        <Card className="p-5 sm:p-8 bg-card border-border">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-12 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading README…
            </div>
          )}
          {error && (
            <div className="text-sm text-destructive py-6">
              Could not load README ({error}).
            </div>
          )}
          {!loading && !error && (
            <article className="prose prose-invert dark:prose-invert max-w-none prose-headings:font-[\'Cormorant_Garamond\'] prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted/40 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted/40 prose-pre:border prose-pre:border-border prose-img:rounded-md prose-hr:border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </article>
          )}
        </Card>
      </div>
    </>
  );
};

export default Readme;
