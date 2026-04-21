// Theme palettes — swap accent + background tokens via [data-palette] on <html>
// Inspired by Financial Prompt Hub flexibility.

export type PaletteId = "kr-indigo" | "financial-slate" | "forest" | "sunset" | "mono";

export interface Palette {
  id: PaletteId;
  label: string;
  description: string;
  swatch: string; // CSS color string for the picker preview
}

export const PALETTES: Palette[] = [
  { id: "kr-indigo",      label: "KR Gold",         description: "Default — gold accent, deep navy",     swatch: "hsl(43 52% 54%)" },
  { id: "financial-slate", label: "Financial Slate", description: "Cool indigo + slate, finance feel",    swatch: "hsl(221 83% 60%)" },
  { id: "forest",         label: "Forest",          description: "Emerald accent, charcoal canvas",      swatch: "hsl(160 70% 45%)" },
  { id: "sunset",         label: "Sunset",          description: "Coral + amber over warm graphite",     swatch: "hsl(14 90% 60%)" },
  { id: "mono",           label: "Mono",            description: "Pure monochrome, white-on-black",      swatch: "hsl(0 0% 90%)" },
];

export const DEFAULT_PALETTE: PaletteId = "kr-indigo";
const STORAGE_KEY = "kr-palette";

export function getStoredPalette(): PaletteId {
  if (typeof window === "undefined") return DEFAULT_PALETTE;
  const v = window.localStorage.getItem(STORAGE_KEY) as PaletteId | null;
  return v && PALETTES.some((p) => p.id === v) ? v : DEFAULT_PALETTE;
}

export function applyPalette(id: PaletteId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-palette", id);
  window.localStorage.setItem(STORAGE_KEY, id);
}
