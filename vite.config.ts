import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
    react(),
    mode === "development" && componentTagger(),
    viteStaticCopy({
      targets: [
        { src: 'Salesforce/*', dest: 'Salesforce' },
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
        name: "TestForge AI - Enterprise Test Automation",
        short_name: "TestForge AI",
        description: "AI-powered test automation script generator for enterprise platforms",
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
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        // 5 MiB — main bundle ships the SAP test repo (841 cases) and Recharts.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
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
}));
