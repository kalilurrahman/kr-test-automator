import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react";
import type { PlatformDef, PlatformModule } from "@/data/platformManifests";

interface Props {
  platform: PlatformDef;
  onOpenModule: (mod: PlatformModule) => void;
}

export function PlatformOverview({ platform, onOpenModule }: Props) {
  return (
    <div className="space-y-4">
      <Card className="p-5 bg-card border-border">
        <h2 className="text-lg font-semibold text-foreground mb-1">About this platform</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{platform.modules.length}</strong> modules</span>
          <span>ID prefix: <code className="font-mono text-primary">{platform.idPrefix}-</code></span>
          <span>Static folder: <code className="font-mono">{platform.publicBase}</code></span>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platform.modules.map((mod) => (
          <Card
            key={mod.id}
            className="p-4 bg-card border-border hover:border-primary/40 transition-colors cursor-pointer group"
            onClick={() => onOpenModule(mod)}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{mod.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{mod.prefix}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full h-8 text-xs justify-center"
              onClick={(e) => { e.stopPropagation(); onOpenModule(mod); }}
            >
              Open repository
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
