import { useState } from "react";
import { getProductLogoUrl, getProductInitials } from "@/data/productLogos";

interface ProductLogoProps {
  productKey: string;
  label: string;
  /** Square size in px. Defaults to 40. */
  size?: number;
  className?: string;
}

/**
 * Renders the product's public brand logo from cdn.simpleicons.org with a
 * graceful initials-in-a-tile fallback for products that aren't listed there
 * (or when the network blocks the CDN).
 */
export function ProductLogo({ productKey, label, size = 40, className = "" }: ProductLogoProps) {
  const [errored, setErrored] = useState(false);
  const url = getProductLogoUrl(productKey);

  const dimension = { width: size, height: size };

  if (!url || errored) {
    return (
      <div
        aria-hidden
        className={`flex items-center justify-center rounded-md bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-bold shrink-0 ${className}`}
        style={dimension}
      >
        {getProductInitials(label)}
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
        onError={() => setErrored(true)}
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
}
