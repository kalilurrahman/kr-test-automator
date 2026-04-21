import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Lightweight SEO head updater — no provider needed.
 * Sets <title>, meta description and (optionally) canonical link.
 */
const SeoHead = ({ title, description, canonical }: SeoHeadProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);

    let canonicalEl: HTMLLinkElement | null = null;
    if (canonical) {
      canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical]);

  return null;
};

export default SeoHead;
