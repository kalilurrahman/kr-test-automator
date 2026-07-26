import { Check, Sparkles, ShieldCheck, RefreshCcw, Users, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Launch SKU ladder. Prices and Gumroad URLs are intentionally centralized here;
// swap CHECKOUT_BASE for the real store once products are created in Gumroad
// (each product must have "Generate a unique license key per sale" enabled).
const CHECKOUT_BASE = "https://keyarite.gumroad.com/l";

interface Tier {
  sku: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  checkoutSlug: string;
  highlight?: boolean;
  badge?: string;
}

const TIERS: Tier[] = [
  {
    sku: "pack-platform",
    name: "Platform Premium Pack",
    price: "$99–$149",
    cadence: "one-time per platform",
    blurb: "SAP flagship & Veeva GxP at $149; Salesforce, Workday, ServiceNow, Oracle at $99.",
    features: [
      "Curated test-case core with full steps, data & roles",
      "Runnable automation scripts (Playwright + Gherkin)",
      "Field-manual PDF: coverage map, E2E flows, data dictionary",
      "Environment setup + CI pipeline templates",
      "12 months of content updates included",
    ],
    checkoutSlug: "testforge-platform-pack",
  },
  {
    sku: "all-access",
    name: "All-Access Library",
    price: "$499",
    cadence: "one-time, individual",
    blurb: "Every premium pack — current and future — plus the E2E scenario vault.",
    features: [
      "All platform packs, all formats",
      "40k+ strict E2E scenario vault (XLSX/CSV/JSON)",
      "Generator Pro: higher AI generation limits",
      "First year of Release Radar updates included",
      "Priority feature requests",
    ],
    checkoutSlug: "testforge-all-access",
    highlight: true,
    badge: "Best value",
  },
  {
    sku: "team-5",
    name: "Team License",
    price: "$1,495",
    cadence: "one-time, 5 seats",
    blurb: "All-Access for your whole QA team; 20 seats with consultancy rights at $3,995.",
    features: [
      "Everything in All-Access × 5 seats",
      "One key, per-seat activations — easy onboarding",
      "Internal-use rights: import into your ALM/Jira/qTest",
      "Invoice / PO-friendly purchasing",
      "Priority email support",
    ],
    checkoutSlug: "testforge-team-5",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How does licensing work?",
    a: "Checkout issues you a license key. Sign in, paste the key on the Activate page, and your account is unlocked on up to 3 devices per seat. Keys are verified server-side against the store, so refunded keys stop working automatically.",
  },
  {
    q: "Is this a subscription?",
    a: "No — packs and All-Access are one-time purchases that include 12 months of updates. After that, your content keeps working forever; an optional renewal keeps the quarterly release updates flowing.",
  },
  {
    q: "What stays free?",
    a: "The platform explorers, scenario browser, and the AI generator's free tier remain free. Premium adds the depth: validated cases with full steps and data, runnable scripts, the E2E vault, and living updates.",
  },
  {
    q: "What if it's not for me?",
    a: "Every purchase has a 30-day no-questions refund guarantee, handled by the store. Refunds revoke the license key automatically.",
  },
];

const Pricing = () => (
  <div className="min-h-[calc(100vh-64px)]">
    <SeoHead
      title="Pricing · TestForge AI"
      description="Premium test-case libraries and runnable automation packs for SAP, Salesforce, Workday and 50+ enterprise platforms. One-time license, lifetime access."
      canonical="/pricing"
    />

    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
        <Sparkles className="w-3 h-3 mr-1" /> Premium Library
      </Badge>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Ship enterprise test coverage in days, not quarters
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Book-quality test-case libraries with runnable automation for the platforms
        your business runs on. One license, no per-run fees, updates with every
        vendor release cycle.
      </p>
    </section>

    <section className="max-w-7xl mx-auto px-4 pb-12 grid gap-6 md:grid-cols-3">
      {TIERS.map((tier) => (
        <Card
          key={tier.sku}
          className={`p-6 flex flex-col ${tier.highlight ? "border-primary shadow-lg shadow-primary/10 relative" : ""}`}
        >
          {tier.badge && (
            <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">{tier.badge}</Badge>
          )}
          <h2 className="text-lg font-semibold">{tier.name}</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="text-xs text-muted-foreground">{tier.cadence}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{tier.blurb}</p>
          <ul className="mt-4 space-y-2 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6 w-full" variant={tier.highlight ? "default" : "outline"}>
            <a href={`${CHECKOUT_BASE}/${tier.checkoutSlug}`} target="_blank" rel="noopener noreferrer">
              Buy {tier.name}
            </a>
          </Button>
        </Card>
      ))}
    </section>

    <section className="max-w-7xl mx-auto px-4 pb-12 grid gap-4 sm:grid-cols-3">
      {[
        { icon: ShieldCheck, title: "30-day guarantee", text: "Full refund, no questions — the store handles it." },
        { icon: RefreshCcw, title: "Living updates", text: "Packs track SAP, Salesforce & Workday release cycles for 12 months." },
        { icon: Users, title: "Team-ready", text: "Seat-based keys with internal redistribution rights." },
      ].map(({ icon: Icon, title, text }) => (
        <Card key={title} className="p-4 flex items-start gap-3">
          <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{text}</p>
          </div>
        </Card>
      ))}
    </section>

    <section className="max-w-3xl mx-auto px-4 pb-16">
      <h2 className="text-xl font-semibold mb-4 text-center">Frequently asked questions</h2>
      <div className="space-y-4">
        {FAQ.map(({ q, a }) => (
          <Card key={q} className="p-4">
            <p className="text-sm font-medium mb-1">{q}</p>
            <p className="text-sm text-muted-foreground">{a}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/activate"><KeyRound className="w-4 h-4" /> Already bought? Activate your key</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default Pricing;
