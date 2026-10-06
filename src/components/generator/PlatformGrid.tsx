import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { platforms } from "@/data/platforms";
import { getPlatform } from "@/data/platformManifests";
import { useGeneratorStore, type Platform } from "@/store/generatorStore";

const PlatformGrid = () => {
  const { platform, setPlatform } = useGeneratorStore();
  const selectedFromCatalog = platform && !platforms.some((item) => item.id === platform)
    ? getPlatform(platform)
    : undefined;

  return (
    <div className="space-y-2">
      {selectedFromCatalog && (
        <button
          type="button"
          onClick={() => setPlatform(null)}
          aria-label={`Selected platform ${selectedFromCatalog.label}. Clear selection`}
          className="flex w-full items-center justify-between gap-3 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-left text-xs text-foreground"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate"><span className="text-muted-foreground">Selected catalog product:</span> {selectedFromCatalog.label}</span>
          </span>
          <X className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
      {platforms.map((p) => {
        const isSelected = platform === p.id;
        return (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPlatform(isSelected ? null : p.id)}
            className={`relative flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-all ${
              isSelected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card hover:border-primary/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            {isSelected && (
              <div className="absolute top-1 right-1">
                <Check className="w-3 h-3 text-primary" />
              </div>
            )}
            <span className="text-lg">{p.icon}</span>
            <span className="font-medium">{p.name}</span>
          </motion.button>
        );
      })}
      </div>
    </div>
  );
};

export default PlatformGrid;
