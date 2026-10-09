import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductLogo } from "@/components/ProductLogo";
import { PRODUCT_CATALOG } from "@/data/productCatalog";
import { PRODUCT_FAMILY_MAP } from "@/data/productFamilies";

const GROUPS = [
  { key: "featured", label: "Featured" },
  { key: "ai_developer_tools", label: "AI developer tools" },
  { key: "data_ai", label: "Data & AI" },
  { key: "erp_finance", label: "ERP & finance" },
  { key: "cloud_devops", label: "Cloud & DevOps" },
] as const;
const FEATURED_KEYS = ["sap", "salesforce", "claudecode", "codex", "databricks", "snowflakeai", "foundryai", "workday", "servicenow", "githubcopilot", "cursor", "microsoftfabric", "aws", "jira", "shopify", "n8n"];

export function HomeProductExplorer() {
  const [group, setGroup] = useState<string>("featured");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const products = PRODUCT_CATALOG.filter((product) => {
    const matchesGroup = normalizedQuery || (group === "featured" ? FEATURED_KEYS.includes(product.key) : PRODUCT_FAMILY_MAP[product.key] === group);
    return matchesGroup && (!normalizedQuery || `${product.label} ${product.key}`.toLowerCase().includes(normalizedQuery));
  }).sort((a, b) => group === "featured" && !normalizedQuery ? FEATURED_KEYS.indexOf(a.key) - FEATURED_KEYS.indexOf(b.key) : a.label.localeCompare(b.label));

  return (
    <section className="border-b border-border bg-card/25" aria-labelledby="product-explorer-title">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-primary">Enterprise libraries</p>
            <h2 id="product-explorer-title" className="text-3xl font-semibold sm:text-4xl">Your platform. Your next test.</h2>
          </div>
          <Button asChild variant="ghost" className="gap-2 text-primary"><Link to="/platforms">All {PRODUCT_CATALOG.length} products <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1" role="group" aria-label="Product families">
            {GROUPS.map((item) => <Button key={item.key} variant={group === item.key ? "secondary" : "ghost"} size="sm" aria-pressed={group === item.key} onClick={() => { setGroup(item.key); setQuery(""); }}>{item.label}</Button>)}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input aria-label="Find a product" placeholder="Find a product…" value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9 pr-10" />
            {query && <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10" aria-label="Clear product search" onClick={() => setQuery("")}><X className="h-4 w-4" /></Button>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 16).map((product) => (
            <Link key={product.key} to={product.route} className="group flex min-h-20 items-center gap-3 rounded-lg border border-border bg-card px-3 py-4 transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <ProductLogo productKey={product.key} label={product.label} size={40} />
              <span className="min-w-0 flex-1 text-sm font-medium leading-5">{product.label}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </Link>
          ))}
        </div>
        {products.length === 0 && <div className="py-10 text-center text-sm text-muted-foreground">No products match “{query}”. <Button variant="link" onClick={() => setQuery("")}>Clear search</Button></div>}
        {products.length > 16 && <p className="mt-4 text-sm text-muted-foreground">Showing 16 of {products.length} products · <Link className="text-primary hover:underline" to="/platforms">View the complete library</Link></p>}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm">
          <span className="text-muted-foreground"><strong className="font-semibold text-foreground">5,000 original AI-product cases</strong> · Claude Code, Codex, Databricks, Snowflake & Palantir</span>
          <Link to="/downloads" className="inline-flex items-center gap-2 text-primary hover:underline">Get the collection <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}