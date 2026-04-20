import { useEffect, useState } from "react";
import {
  applyFontPreset,
  getStoredFontPreset,
  type FontPresetId,
} from "@/lib/fonts";

/**
 * React binding for the font-preset engine. Mirrors useThemePalette so the
 * header can host both pickers side by side.
 */
export function useFontPreset() {
  const [preset, setPresetState] = useState<FontPresetId>(() =>
    getStoredFontPreset(),
  );

  useEffect(() => {
    applyFontPreset(preset);
  }, [preset]);

  // Sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "kr-font-preset" && e.newValue) {
        setPresetState(e.newValue as FontPresetId);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { preset, setPreset: setPresetState };
}
