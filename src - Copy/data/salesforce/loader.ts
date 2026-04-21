// Lazy loaders for each Salesforce cloud's bundled test cases.
// Each dataset is its own dynamic chunk so the initial bundle stays small,
// but once a cloud is opened it's served from JS — no network CSV fetch.

import type { SalesforceCloudId, SalesforceTestRow } from "@/data/salesforceClouds";

type Loader = () => Promise<{ default: SalesforceTestRow[] } | { [k: string]: SalesforceTestRow[] }>;

const LOADERS: Record<SalesforceCloudId, () => Promise<SalesforceTestRow[]>> = {
  sales: () => import("@/data/salesforce/sales").then((m) => m.SALES_CASES),
  marketing: () => import("@/data/salesforce/marketing").then((m) => m.MARKETING_CASES),
  service_cloud: () => import("@/data/salesforce/service").then((m) => m.SERVICE_CASES),
  health: () => import("@/data/salesforce/health").then((m) => m.HEALTH_CASES),
  financial: () => import("@/data/salesforce/financial").then((m) => m.FINANCIAL_CASES),
  financial_variantB: () =>
    import("@/data/salesforce/financialVariantB").then((m) => m.FINANCIAL_VARIANT_B_CASES),
  financial_superpack: () =>
    import("@/data/salesforce/financialSuperpack").then((m) => m.FINANCIAL_SUPERPACK_CASES),
};

const cache: Partial<Record<SalesforceCloudId, SalesforceTestRow[]>> = {};

export async function loadSalesforceCases(id: SalesforceCloudId): Promise<SalesforceTestRow[]> {
  if (cache[id]) return cache[id]!;
  const data = await LOADERS[id]();
  cache[id] = data;
  return data;
}
