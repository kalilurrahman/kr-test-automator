import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { platforms } from "@/data/platforms";
import { useGeneratorStore, type Platform } from "@/store/generatorStore";

const PlatformGrid = () => {
  const { platform, setPlatform } = useGeneratorStore();

  return (
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
  );
};

export default PlatformGrid;
