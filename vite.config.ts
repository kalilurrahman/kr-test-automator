import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";

/**
 * Runs scripts/build_precomputed_stats.mjs before each build so the Dashboard
 * loads its global stats from a tiny static JSON instead of fetching ~140 CSVs
 * at runtime. Failures are non-fatal — the runtime falls back to live scans.
 */
function precomputeStatsPlugin(): Plugin {
  return {
    name: "precompute-stats",
    apply: "build",
    buildStart() {
      const r = spawnSync("node", ["scripts/build_precomputed_stats.mjs"], {
        stdio: "inherit",
        cwd: __dirname,
      });
      if (r.status !== 0) {
        this.warn("Precompute stats script failed — runtime falls back to live CSV scan.");
      }
    },
  };
}

/**
 * Keeps `public/README.md` in sync with the repo-root README so the in-app
 * /readme page always renders the latest copy. Runs in both dev (on server
 * start) and build (on bundle start) so changes show up immediately.
 */
function syncReadmePlugin(): Plugin {
  const sync = () => {
    const src = path.resolve(__dirname, "README.md");
    const dest = path.resolve(__dirname, "public/README.md");
    if (existsSync(src)) {
      try { copyFileSync(src, dest); } catch (_e) { /* non-fatal */ }
    }
  };
  return {
    name: "sync-readme",
    configResolved: sync,
    buildStart: sync,
  };
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    precomputeStatsPlugin(),
    syncReadmePlugin(),
    react(),
    mode === "development" && componentTagger(),
    viteStaticCopy({
      targets: [
        { src: 'MarketAutomationSuites/archives/*.zip', dest: 'market-automation-suites' },
        { src: 'Kiro/*', dest: 'Kiro' },
        { src: 'GitLabDuo/*', dest: 'GitLabDuo' },
        { src: 'JetBrainsJunie/*', dest: 'JetBrainsJunie' },
        { src: 'ReplitAgent/*', dest: 'ReplitAgent' },
        { src: 'Devin/*', dest: 'Devin' },
        { src: 'Cline/*', dest: 'Cline' },
        { src: 'OpenHands/*', dest: 'OpenHands' },
        { src: 'FactoryDroid/*', dest: 'FactoryDroid' },
        { src: 'RooCode/*', dest: 'RooCode' },
        { src: 'SourcegraphAmp/*', dest: 'SourcegraphAmp' },
        { src: 'Salesforce/*', dest: 'Salesforce' },
        { src: 'ClaudeCode/*', dest: 'ClaudeCode' },
        { src: 'Codex/*', dest: 'Codex' },
        { src: 'GeminiAntigravity/*', dest: 'GeminiAntigravity' },
        { src: 'GitHubCopilot/*', dest: 'GitHubCopilot' },
        { src: 'Cursor/*', dest: 'Cursor' },
        { src: 'Windsurf/*', dest: 'Windsurf' },
        { src: 'Dataiku/*', dest: 'Dataiku' },
        { src: 'ApacheIceberg/*', dest: 'ApacheIceberg' },
        { src: 'Medidata/*', dest: 'Medidata' },
        { src: 'IQVIA/*', dest: 'IQVIA' },
        { src: 'Databricks/*', dest: 'Databricks' },
        { src: 'SnowflakeAI/*', dest: 'SnowflakeAI' },
        { src: 'PalantirFoundryAI/*', dest: 'PalantirFoundryAI' },
        { src: 'MicrosoftFabric/*', dest: 'MicrosoftFabric' },
        { src: 'dbt/*', dest: 'dbt' },
        { src: 'Confluent/*', dest: 'Confluent' },
        { src: 'MongoDBAtlas/*', dest: 'MongoDBAtlas' },
        { src: 'Fivetran/*', dest: 'Fivetran' },
        { src: 'SupabasePlatform/*', dest: 'SupabasePlatform' },
        { src: 'Vercel/*', dest: 'Vercel' },
        { src: 'LangSmith/*', dest: 'LangSmith' },
        { src: 'Pinecone/*', dest: 'Pinecone' },
        { src: 'HuggingFaceHub/*', dest: 'HuggingFaceHub' },
        { src: 'Airbyte/*', dest: 'Airbyte' },
        { src: 'ApacheAirflow/*', dest: 'ApacheAirflow' },
        { src: 'Prefect/*', dest: 'Prefect' },
        { src: 'Dagster/*', dest: 'Dagster' },
        { src: 'N8n/*', dest: 'N8n' },
        { src: 'CrewAI/*', dest: 'CrewAI' },
        { src: 'Shopify/*', dest: 'Shopify' },
        { src: 'Stripe/*', dest: 'Stripe' },
        { src: 'PharmaGxP/*', dest: 'PharmaGxP' },
        { src: 'MedTech/*', dest: 'MedTech' },
        { src: 'HealthcareOps/*', dest: 'HealthcareOps' },
        { src: 'ManufacturingMES/*', dest: 'ManufacturingMES' },
        { src: 'DefenseSystems/*', dest: 'DefenseSystems' },
        { src: 'IndustrialAutomation/*', dest: 'IndustrialAutomation' },
        { src: 'CPGOperations/*', dest: 'CPGOperations' },
        { src: 'EnergyUtilities/*', dest: 'EnergyUtilities' },
        { src: 'InsuranceSuite/*', dest: 'InsuranceSuite' },
        { src: 'FinancialServices/*', dest: 'FinancialServices' },
        { src: 'Aerospace/*', dest: 'Aerospace' },
        { src: 'LogisticsSupplyChain/*', dest: 'LogisticsSupplyChain' },
        { src: 'AutomotiveMobility/*', dest: 'AutomotiveMobility' },
        { src: 'ConstructionAEC/*', dest: 'ConstructionAEC' },
        { src: 'TravelHospitality/*', dest: 'TravelHospitality' },
        { src: 'AgricultureAgriTech/*', dest: 'AgricultureAgriTech' },
        { src: 'TelecomNetworkOps/*', dest: 'TelecomNetworkOps' },
        { src: 'PublicServices/*', dest: 'PublicServices' },
        { src: 'EducationResearch/*', dest: 'EducationResearch' },
        { src: 'MediaEntertainment/*', dest: 'MediaEntertainment' },
        { src: 'RealEstateFacilities/*', dest: 'RealEstateFacilities' },
        { src: 'workday/*', dest: 'workday' },
        { src: 'ServiceNow/*', dest: 'ServiceNow' },
        { src: 'Veeva/*', dest: 'Veeva' },
        { src: 'Dynamics365/*', dest: 'Dynamics365' },
        { src: 'OracleApps/*', dest: 'OracleApps' },
        { src: 'SAP/Ph-II/*', dest: 'SAP/Ph-II' },
        { src: 'API/*', dest: 'API' },
        { src: 'iOS/*', dest: 'iOS' },
        { src: 'Android/*', dest: 'Android' },
        { src: 'AWS/*', dest: 'AWS' },
        { src: 'GCP/*', dest: 'GCP' },
        { src: 'Azure/*', dest: 'Azure' },
        { src: 'WebApps/*', dest: 'WebApps' },
        { src: 'TopProducts/*', dest: 'TopProducts' },
        { src: 'Asana/*', dest: 'Asana' },
        { src: 'CyberArk/*', dest: 'CyberArk' },
        { src: 'DocuSign/*', dest: 'DocuSign' },
        { src: 'GoogleWorkspace/*', dest: 'GoogleWorkspace' },
        { src: 'Medallia/*', dest: 'Medallia' },
        { src: 'Odoo/*', dest: 'Odoo' },
        { src: 'Procore/*', dest: 'Procore' },
        { src: 'PTCWindchill/*', dest: 'PTCWindchill' },
        { src: 'QAD/*', dest: 'QAD' },
        { src: 'Smartsheet/*', dest: 'Smartsheet' },
        { src: 'Zoho/*', dest: 'Zoho' },
        { src: 'Zoom/*', dest: 'Zoom' },
        { src: 'Zscaler/*', dest: 'Zscaler' },
        { src: '3DEXPERIENCE/*', dest: '3DEXPERIENCE' },
        { src: 'AdobeExperienceCloud/*', dest: 'AdobeExperienceCloud' },
        { src: 'ADPWorkforceNow/*', dest: 'ADPWorkforceNow' },
        { src: 'Anaplan/*', dest: 'Anaplan' },
        { src: 'AutomationAnywhere/*', dest: 'AutomationAnywhere' },
        { src: 'BlackLine/*', dest: 'BlackLine' },
        { src: 'Boomi/*', dest: 'Boomi' },
        { src: 'Coupa/*', dest: 'Coupa' },
        { src: 'CrowdStrike/*', dest: 'CrowdStrike' },
        { src: 'Datadog/*', dest: 'Datadog' },
        { src: 'Epicor/*', dest: 'Epicor' },
        { src: 'HubSpot/*', dest: 'HubSpot' },
        { src: 'IBMMaximo/*', dest: 'IBMMaximo' },
        { src: 'InforCloudSuite/*', dest: 'InforCloudSuite' },
        { src: 'Jira/*', dest: 'Jira' },
        { src: 'MuleSoft/*', dest: 'MuleSoft' },
        { src: 'NetSuite/*', dest: 'NetSuite' },
        { src: 'Okta/*', dest: 'Okta' },
        { src: 'PalantirFoundry/*', dest: 'PalantirFoundry' },
        { src: 'QlikSense/*', dest: 'QlikSense' },
        { src: 'Qualtrics/*', dest: 'Qualtrics' },
        { src: 'RHEL/*', dest: 'RHEL' },
        { src: 'SageIntacct/*', dest: 'SageIntacct' },
        { src: 'Snowflake/*', dest: 'Snowflake' },
        { src: 'Splunk/*', dest: 'Splunk' },
        { src: 'Strata/*', dest: 'Strata' },
        { src: 'Tableau/*', dest: 'Tableau' },
        { src: 'Teamcenter/*', dest: 'Teamcenter' },
        { src: 'UiPath/*', dest: 'UiPath' },
        { src: 'UKGPro/*', dest: 'UKGPro' },
        { src: 'vSphere/*', dest: 'vSphere' },
        { src: 'Zendesk/*', dest: 'Zendesk' },
      ]
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        id: "/",
        name: "Validaira - AI-native quality engineering",
        short_name: "Validaira",
        description: "AI-native quality engineering for confident releases",
        lang: "en",
        categories: ["productivity", "developer", "business"],
        theme_color: "#c9a227",
        background_color: "#0a0c10",
        display: "standalone",
        display_override: ["standalone", "minimal-ui"],
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["index.html", "assets/*.css", "*.{ico,png,svg,webmanifest}", "icons/*.{png,svg}"],
        // Keep the install payload lean; lazy JS/data is cached on demand below.
        maximumFileSizeToCacheInBytes: 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "app-assets-cache",
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 14,
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".json") || url.pathname.endsWith(".csv"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "data-snapshots-cache",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["recharts"],
          markdown: ["react-markdown", "remark-gfm"],
          cloud: ["@supabase/supabase-js"],
        },
      },
    },
  },
}));
