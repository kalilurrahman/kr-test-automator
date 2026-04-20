import { useEffect, useState } from "react";
import { Share, X, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "ios-a2hs-dismissed";

const IosInstallHint = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const ua = window.navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /^((?!chrome|crios|fxios|edgios).)*safari/i.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari exposes navigator.standalone
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isIos && isSafari && !isStandalone) {
      // Defer slightly so it doesn't fight with first paint
      const t = window.setTimeout(() => setShow(true), 1500);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 md:hidden" role="dialog" aria-label="Install app instructions">
      <Card className="p-4 bg-card border-primary/30 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-1">Install TestForge AI</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tap <Share className="inline w-3.5 h-3.5 mx-0.5 text-primary" /> in Safari, then{" "}
              <span className="inline-flex items-center gap-0.5 text-primary">
                <Plus className="w-3 h-3" />Add to Home Screen
              </span>
              .
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={dismiss}
            aria-label="Dismiss install hint"
            className="h-7 w-7 shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IosInstallHint;
