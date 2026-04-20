// Font preset engine — swaps three CSS variables (--font-display, --font-body,
// --font-mono) and a base font-size scale on <html data-font="…">. Applied in
// index.css via @layer base. Persists to localStorage so the choice survives
// reload and syncs across tabs.

export type FontPresetId =
  | "kr-default"
  | "sans-modern"
  | "serif-editorial"
  | "humanist"
  | "compact-mono"
  | "reading";

export interface FontPreset {
  id: FontPresetId;
  label: string;
  description: string;
  /** Sample headline rendered in the picker so users see the face */
  sample: string;
  display: string;
  body: string;
  mono: string;
  /** Base size for body text in px — clamp()-friendly (12-18px range) */
  basePx: number;
  /** Google Fonts URL chunk to inject if not already loaded */
  googleFonts?: string;
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "kr-default",
    label: "KR Editorial",
    description: "Default — Cormorant Garamond + DM Sans",
    sample: "Aa",
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 14,
  },
  {
    id: "sans-modern",
    label: "Modern Sans",
    description: "Inter everywhere — clean SaaS feel",
    sample: "Aa",
    display: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 14,
    googleFonts: "Inter:wght@400;500;600;700",
  },
  {
    id: "serif-editorial",
    label: "Serif Long-form",
    description: "Playfair + Source Sans — magazine vibe",
    sample: "Aa",
    display: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 15,
    googleFonts: "Playfair+Display:wght@500;700&family=Source+Sans+3:wght@400;500;600",
  },
  {
    id: "humanist",
    label: "Humanist",
    description: "Lora + Nunito — warm and friendly",
    sample: "Aa",
    display: "'Lora', Georgia, serif",
    body: "'Nunito', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 14,
    googleFonts: "Lora:wght@500;600;700&family=Nunito:wght@400;500;600;700",
  },
  {
    id: "compact-mono",
    label: "Hacker Mono",
    description: "JetBrains Mono everywhere — terminal mode",
    sample: "{ }",
    display: "'JetBrains Mono', Menlo, monospace",
    body: "'JetBrains Mono', Menlo, monospace",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 13,
  },
  {
    id: "reading",
    label: "Reading XL",
    description: "Larger sizes for accessibility",
    sample: "Aa",
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', Menlo, monospace",
    basePx: 16,
  },
];

export const DEFAULT_FONT_PRESET: FontPresetId = "kr-default";
const STORAGE_KEY = "kr-font-preset";
const LINK_ID = "kr-font-preset-link";

export function getStoredFontPreset(): FontPresetId {
  if (typeof window === "undefined") return DEFAULT_FONT_PRESET;
  const v = window.localStorage.getItem(STORAGE_KEY) as FontPresetId | null;
  return v && FONT_PRESETS.some((p) => p.id === v) ? v : DEFAULT_FONT_PRESET;
}

export function applyFontPreset(id: FontPresetId) {
  if (typeof document === "undefined") return;
  const preset = FONT_PRESETS.find((p) => p.id === id) ?? FONT_PRESETS[0];

  // Lazy-load Google Font if needed (one shared <link>).
  if (preset.googleFonts) {
    let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;
    const href = `https://fonts.googleapis.com/css2?family=${preset.googleFonts}&display=swap`;
    if (!link) {
      link = document.createElement("link");
      link.id = LINK_ID;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }

  const root = document.documentElement;
  root.setAttribute("data-font", id);
  root.style.setProperty("--font-display", preset.display);
  root.style.setProperty("--font-body", preset.body);
  root.style.setProperty("--font-mono", preset.mono);
  // clamp prevents overflow on small viewports while honouring user choice.
  root.style.setProperty(
    "--font-base-size",
    `clamp(12px, ${preset.basePx * 0.0625}rem + 0.1vw, ${preset.basePx + 2}px)`,
  );
  window.localStorage.setItem(STORAGE_KEY, id);
}
