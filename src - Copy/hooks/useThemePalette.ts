import { useEffect, useState } from "react";
import { applyPalette, getStoredPalette, PaletteId } from "@/lib/themes";

export function useThemePalette() {
  const [palette, setPaletteState] = useState<PaletteId>(() => getStoredPalette());

  useEffect(() => {
    applyPalette(palette);
  }, [palette]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kr-palette" && e.newValue) {
        setPaletteState(e.newValue as PaletteId);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { palette, setPalette: setPaletteState };
}
