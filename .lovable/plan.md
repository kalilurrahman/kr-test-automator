

# TestForge AI — Implementation Plan

## Phase 1: Design System & Layout Shell
- Set up the KR brand color palette, typography (Cormorant Garamond, DM Sans, JetBrains Mono), and CSS variables in `index.css`
- Build `<KRHeader />` with KR monogram, "TestForge AI" center branding, and nav links (Generate, Templates, History)
- Build `<KRFooter />` matching kalilurrahman.lovable.app with brand column, apps column, and links column
- Set up routing: `/` (Generator), `/templates`, `/history`, `/history/:id`

## Phase 2: Generator Page — Input Panel
- Platform selection grid (SAP, Salesforce, Veeva, ServiceNow, Workday, Oracle, M365, Web, REST API, Mobile iOS/Android) with colored border tiles and selected state
- Framework dropdown with grouped options (UI Testing, Mobile, API, BDD, Specialised)
- Test scope multi-select checkboxes (UI Functional, Regression, Smoke, E2E, API, Performance, Security, Accessibility, Data-driven, BDD)
- Test count slider (10–50)
- Business case textarea with placeholder examples
- "Load Template" and "Surprise Me" buttons
- Gold gradient "Generate Script" button
- Collapsible Advanced Options section (platform config, code style, AI settings)

## Phase 3: Generator Page — Output Panel
- Empty state with quick-start example buttons (Salesforce Lead, SAP PO, Veeva Vault, REST API CRUD)
- Generating state with animated 6-step progress indicator and progress bar
- Result state with title bar, action buttons (Copy, Download, Save, Star)
- Four tabs: Code (syntax-highlighted with react-syntax-highlighter/vscDarkPlus), Test Cases (table), Coverage (notes), Setup Guide (prerequisites + commands)
- Download produces correct file extension per language (.ts, .py, .java, etc.)
- 2-column desktop layout (40/60), stacked on mobile with sticky Generate FAB

## Phase 4: Lovable Cloud + AI Edge Function
- Enable Lovable Cloud for backend
- Create `generate-test-script` edge function that calls the Lovable AI Gateway with the detailed test automation system prompt
- Streaming response (SSE) piped back to the client for real-time code display
- Map streamed token chunks to the 6 progress steps for realistic progress animation
- Parse the structured JSON response (title, script, test_cases, prerequisites, coverage_notes, known_limitations)

## Phase 5: Template Library
- Seed all 50 templates as hardcoded data (SAP ×8, Salesforce ×10, Veeva ×6, ServiceNow ×5, Workday ×4, Oracle ×3, Web/API ×8, Mobile ×3, Performance ×3) with full business case text for each
- Template library page with filter bar (Industry, Platform, Framework, Complexity) and search
- Template cards with platform badge, description, tags, complexity, use count
- "Use Template" fills the Generator form and navigates to `/`

## Phase 6: Database & History
- Set up Supabase tables: `generations`, `templates`, `collections` with the specified schema
- RLS policies: users can read/write their own generations and collections
- History page with search, platform/framework filters, starred filter
- Clicking a history row shows the full output view
- Save and Star functionality (prompts sign-in for anonymous users)
- Supabase Auth integration (email/password) — optional for basic generation

## Phase 7: PWA & Polish
- Configure vite-plugin-pwa with manifest, icons, and workbox caching
- PWA install button in header (beforeinstallprompt for Chrome/Android)
- iOS install banner toast detection
- Generate SVG-based app icons at all required sizes (72–512px) with the code chevron design
- Framer Motion animations: tile selection bounce, output slide-in, progress step fade, template card stagger, generate button shimmer
- Mobile responsiveness: horizontal scroll platform tiles, sticky generate FAB, stacked layout

