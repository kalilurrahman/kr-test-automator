import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, LayoutGrid, List as ListIcon, Package, Star } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductLogo } from "@/components/ProductLogo";
import {
  PRODUCT_CATALOG,
  ACCENT_CLASSES,
  TOTAL_PRODUCTS,
  TOTAL_MODULES,
  type ProductEntry,
} from "@/data/productCatalog";
import {
  PRODUCT_FAMILIES,
  groupProductsByFamily,
  familyForProduct,
  type FamilyKey,
} from "@/data/productFamilies";

/**
 * Pinned "Top Products" group — highest-impact enterprise platforms shown
 * first on the Products page. They still appear in their normal family
 * group below so nothing disappears from the regular taxonomy.
 *
 * M365 maps to Dynamics 365 because the Microsoft 365 productivity surface
 * is bundled inside the D365 catalogue (modules array contains "M365").
 */
const TOP_PRODUCT_KEYS = [
  "sap",
  "salesforce",
  "servicenow",
  "oracle",
  "dynamics365", // serves as the M365 / Microsoft 365 launcher
  "veeva",
] as const;

type SortKey = "name" | "modules" | "family";

const Platforms = () => {
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState<FamilyKey | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("family");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo<ProductEntry[]>(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCT_CATALOG.filter((p) => {
      if (familyFilter !== "all" && familyForProduct(p).key !== familyFilter) return false;
      if (!q) return true;
      return (
        p.label.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.modules.some((m) => m.toLowerCase().includes(q)) ||
        p.idPrefix.toLowerCase().includes(q)
      );
    });
    if (sortKey === "name") list = [...list].sort((a, b) => a.label.localeCompare(b.label));
    else if (sortKey === "modules") list = [...list].sort((a, b) => b.modules.length - a.modules.length);
    return list;
  }, [query, familyFilter, sortKey]);

  const grouped = useMemo(() => {
    if (sortKey !== "family") return null;
    return groupProductsByFamily(filtered);
  }, [filtered, sortKey]);

  return (
    <>
      <SeoHead
        title="Products & Platforms · TestForge AI"
        description={`Browse ${TOTAL_PRODUCTS} enterprise platforms across ${PRODUCT_FAMILIES.length} families — ERP, Healthcare, Telecom, Cloud, Government and Commerce.`}
        canonical="/platforms"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <header className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Products &amp; Platforms
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {TOTAL_PRODUCTS} platforms · {TOTAL_MODULES} modules · grouped into{" "}
              {PRODUCT_FAMILIES.length} families.
            </p>
          </div>
        </header>

        {/* Controls */}
        <Card className="p-3 sm:p-4 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, modules, ID prefix…"
                className="pl-9 bg-background"
                aria-label="Search platforms"
              />
            </div>
            <div className="md:col-span-3">
              <Select value={familyFilter} onValueChange={(v) => setFamilyFilter(v as FamilyKey | "all")}>
                <SelectTrigger aria-label="Filter by family">
                  <SelectValue placeholder="All families" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All families</SelectItem>
                  {PRODUCT_FAMILIES.map((f) => (
                    <SelectItem key={f.key} value={f.key}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                <SelectTrigger aria-label="Sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Group by family</SelectItem>
                  <SelectItem value="name">Sort A → Z</SelectItem>
                  <SelectItem value="modules">Most modules</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex gap-1.5 justify-end">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("grid")}
                className="gap-1.5"
                aria-pressed={view === "grid"}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
                className="gap-1.5"
                aria-pressed={view === "list"}
              >
                <ListIcon className="w-3.5 h-3.5" /> List
              </Button>
            </div>
          </div>
          <div className="text-[11px] text-muted-foreground mt-2 font-mono">
            Showing {filtered.length} of {TOTAL_PRODUCTS} products
          </div>
        </Card>

        {/* Family chips quick filter */}
        <div className="flex flex-wrap gap-1.5">
          <FamilyChip
            label="All"
            active={familyFilter === "all"}
            onClick={() => setFamilyFilter("all")}
            count={TOTAL_PRODUCTS}
          />
          {PRODUCT_FAMILIES.map((f) => {
            const count = PRODUCT_CATALOG.filter((p) => familyForProduct(p).key === f.key).length;
            if (count === 0) return null;
            return (
              <FamilyChip
                key={f.key}
                label={f.shortLabel}
                active={familyFilter === f.key}
                onClick={() => setFamilyFilter(f.key)}
                count={count}
              />
            );
          })}
        </div>

        {/* Output */}
        {grouped ? (
          <div className="space-y-8">
            {grouped.map((bucket) => (
              <section key={bucket.family.key}>
                <div className="flex items-baseline justify-between mb-3 gap-2 flex-wrap">
                  <h2
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {bucket.family.label}
                  </h2>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {bucket.products.length} platforms
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{bucket.family.blurb}</p>
                <Layout view={view} products={bucket.products} />
              </section>
            ))}
            {grouped.length === 0 && <EmptyState />}
          </div>
        ) : (
          <Layout view={view} products={filtered} />
        )}
      </div>
    </>
  );
};

const FamilyChip = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-xs px-3 py-1.5 rounded-full border transition-colors inline-flex items-center gap-1.5 ${
      active
        ? "bg-primary/15 border-primary/50 text-primary"
        : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
    }`}
  >
    {label}
    <span className="text-[10px] font-mono opacity-70">{count}</span>
  </button>
);

const Layout = ({ products, view }: { products: ProductEntry[]; view: "grid" | "list" }) => {
  if (products.length === 0) return <EmptyState />;
  if (view === "list") {
    return (
      <Card className="bg-card border-border overflow-hidden">
        <ul className="divide-y divide-border">
          {products.map((p) => (
            <li key={p.key}>
              <Link
                to={p.route}
                className="flex items-center gap-3 px-4 py-3 hover:bg-background/40 transition-colors"
              >
                <ProductLogo productKey={p.key} label={p.label} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-semibold text-foreground truncate"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {p.label}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {p.idPrefix}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono whitespace-nowrap">
                  {p.modules.length} mods
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {products.map((p) => (
        <Link key={p.key} to={p.route} className="block">
          <Card
            className={`p-4 sm:p-5 bg-card border-2 transition-all h-full flex flex-col ${ACCENT_CLASSES[p.accent]}`}
          >
            <div className="flex items-start gap-3 mb-2">
              <ProductLogo productKey={p.key} label={p.label} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-base sm:text-lg font-semibold text-foreground leading-tight truncate"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    title={p.label}
                  >
                    {p.label}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded shrink-0">
                    {p.modules.length} mods
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 flex-1 line-clamp-3">{p.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {p.modules.slice(0, 4).map((m) => (
                <span
                  key={m}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground"
                >
                  {m}
                </span>
              ))}
              {p.modules.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                  +{p.modules.length - 4}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-muted-foreground">{p.idPrefix}-*</span>
              <span className="text-primary inline-flex items-center gap-1">
                Open <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const EmptyState = () => (
  <Card className="p-8 text-center text-sm text-muted-foreground bg-card border-border">
    No platforms match your filters.
  </Card>
);

export default Platforms;
