import { useEffect, useState } from "react";
import {
  getProductFallbackGlyph,
  getProductInitials,
  getProductLogoUrls,
  type ProductFallbackGlyph,
} from "@/data/productLogos";
import {
  Activity,
  Building2,
  Code2,
  Factory,
  Film,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Leaf,
  Network,
  Package,
  Plane,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface ProductLogoProps {
  productKey: string;
  label: string;
  /** Square size in px. Defaults to 40. */
  size?: number;
  className?: string;
}

/**
 * Prefer a bundled brand mark, then the official product site's favicon. For
 * Validaira's industry packs, use a domain glyph rather than inventing a logo.
 */
export function ProductLogo({ productKey, label, size = 40, className = "" }: ProductLogoProps) {
  const [logoIndex, setLogoIndex] = useState(0);
  const urls = getProductLogoUrls(productKey);
  const url = urls[logoIndex];

  useEffect(() => setLogoIndex(0), [productKey]);

  const dimension = { width: size, height: size };

  if (!url) {
    const Glyph = glyphFor(getProductFallbackGlyph(productKey));
    return (
      <div
        aria-hidden
        className={`flex items-center justify-center rounded-md bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold shrink-0 ${className}`}
        style={dimension}
      >
        {Glyph ? <Glyph className="w-5 h-5" strokeWidth={1.8} /> : getProductInitials(label)}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-md bg-background/60 border border-border shrink-0 p-1 ${className}`}
      style={dimension}
    >
      <img
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
        width={size - 8}
        height={size - 8}
        onError={() => setLogoIndex((index) => index + 1)}
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
}

const GLYPHS: Record<ProductFallbackGlyph, LucideIcon> = {
  code: Code2,
  web: Globe2,
  top: Sparkles,
  pharma: FlaskConical,
  medical: Stethoscope,
  healthcare: HeartPulse,
  factory: Factory,
  defense: Shield,
  automation: Activity,
  cpg: ShoppingBag,
  energy: Zap,
  insurance: ShieldCheck,
  finance: Landmark,
  aerospace: Plane,
  logistics: Truck,
  automotive: Package,
  construction: Building2,
  travel: Hotel,
  agriculture: Leaf,
  telecom: Network,
  public: Landmark,
  education: GraduationCap,
  media: Film,
  realestate: Building2,
};

function glyphFor(glyph: ProductFallbackGlyph | null): LucideIcon | null {
  return glyph ? GLYPHS[glyph] : null;
}
