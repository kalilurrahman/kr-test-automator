# TestForge AI

![Showcase GIF](docs/assets/media/showcase.gif)

[View Showcase Video](docs/assets/media/showcase.mp4)

**TestForge AI** is an innovative platform tailored for creating, exploring, and saving automated test scripts across various platforms and frameworks. Powered by Generative AI, TestForge provides developers, QA engineers, and IT executives an intuitive interface to rapidly draft test cases for different test scopes.

**Live Application:** [TestForge AI](https://kr-test-automator.lovable.app/)

---

## 🌟 Key Features

### 1. **Script Generation Engine**
The home page lets you configure and generate test scripts seamlessly. Simply select your **Platform**, choose your target **Framework & Language**, and determine the **Test Scope**. The AI engine handles the rest.

<img src="docs/assets/home.png" alt="Home Page" width="800">

#### Supported Configurations
- **Platforms:** SAP, Salesforce, Veeva, ServiceNow, Workday, Oracle, Microsoft 365, Web/Custom, REST API, iOS, Android.
- **Frameworks + Languages:** Playwright (TypeScript), Cypress (JavaScript), Selenium (Java/Python), REST Assured, and more.
- **Test Scopes:** UI Functional, Regression, Smoke/Sanity, E2E, API, Performance, Security, Accessibility, Data-driven.

#### Interactive Selection
Selecting a platform or altering scope actively updates the generation context. See an example below where "SAP" and "Playwright (TypeScript)" are selected:

<img src="docs/assets/home_interaction.png" alt="Home Interaction" width="800">

### 2. **Template Library**
Don't want to start from scratch? The `/templates` page offers a rich library of pre-built scenarios categorized by Industry, Platform, and Complexity.

<img src="docs/assets/templates.png" alt="Templates Page" width="800">

When you find a scenario that fits your needs (e.g., SAP Purchase Order Creation & Approval), you can effortlessly pull it into your workflow.

<img src="docs/assets/template_interaction.png" alt="Template Interaction" width="800">

### 3. **Script History**
Keep track of all your previously generated tests on the `/history` page. You can easily view details like Platform, Framework, and when it was generated. Star your favorites for quick access!

<img src="docs/assets/history.png" alt="History Page" width="800">

### 4. **Salesforce Integration**
The `/Salesforce` route features an integrated, static HTML-based portal providing direct access to the Salesforce repository. This includes distinct modules mapped closely to specific clouds, ensuring robust E2E validation scenarios.

<img src="Salesforce/assets/screenshots/landing.png" alt="Salesforce Landing" width="800">

You can drill down into specific sub-clouds such as Sales to instantly view records imported directly from the CSV test data.

<img src="Salesforce/assets/screenshots/sales_subfolder.png" alt="Salesforce Data View" width="800">

### 5. **Deprecated Library Route**
The legacy `/library` route has been deprecated. If you attempt to access it, you will receive a 404 Error page. All former library functionality is now consolidated under `/templates` and `/history`.

<img src="docs/assets/library.png" alt="Library 404 Error" width="800">

*(For more details, see the [Library Readme](library/README.md))*

---

## 🛠️ Technology Stack

This project is built using modern web development practices:

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn-ui
- **State Management:** Zustand, React Query
- **Routing:** React Router
- **Database / Auth:** Supabase

## 🚀 How to Run Locally

If you want to run or edit this project locally, ensure you have [Node.js & npm](https://github.com/nvm-sh/nvm#installing-and-updating) installed.

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## 🤝 Contribution

You can edit files directly via GitHub, use GitHub Codespaces, or utilize your preferred IDE locally. Commit your changes and push to your branch to see them updated.

---

## 📸 Comprehensive Screenshots Gallery

### React Application Pages

### Home
**Desktop**
![Home Desktop Dark](docs/assets/screenshots/auto/home_desktop_dark_top.png)
![Home Desktop Light](docs/assets/screenshots/auto/home_desktop_light_top.png)

**Mobile**
![Home Mobile Dark](docs/assets/screenshots/auto/home_mobile_dark_top.png)
![Home Mobile Light](docs/assets/screenshots/auto/home_mobile_light_top.png)

**Scrolled Desktop**
![Home Scrolled Desktop Dark](docs/assets/screenshots/auto/home_desktop_dark_scroll.png)
![Home Scrolled Desktop Light](docs/assets/screenshots/auto/home_desktop_light_scroll.png)

**Scrolled Mobile**
![Home Scrolled Mobile Dark](docs/assets/screenshots/auto/home_mobile_dark_scroll.png)
![Home Scrolled Mobile Light](docs/assets/screenshots/auto/home_mobile_light_scroll.png)

### Dashboard
**Desktop**
![Dashboard Desktop Dark](docs/assets/screenshots/auto/dashboard_desktop_dark_top.png)
![Dashboard Desktop Light](docs/assets/screenshots/auto/dashboard_desktop_light_top.png)

**Mobile**
![Dashboard Mobile Dark](docs/assets/screenshots/auto/dashboard_mobile_dark_top.png)
![Dashboard Mobile Light](docs/assets/screenshots/auto/dashboard_mobile_light_top.png)

**Scrolled Desktop**
![Dashboard Scrolled Desktop Dark](docs/assets/screenshots/auto/dashboard_desktop_dark_scroll.png)
![Dashboard Scrolled Desktop Light](docs/assets/screenshots/auto/dashboard_desktop_light_scroll.png)

**Scrolled Mobile**
![Dashboard Scrolled Mobile Dark](docs/assets/screenshots/auto/dashboard_mobile_dark_scroll.png)
![Dashboard Scrolled Mobile Light](docs/assets/screenshots/auto/dashboard_mobile_light_scroll.png)

### About
**Desktop**
![About Desktop Dark](docs/assets/screenshots/auto/about_desktop_dark_top.png)
![About Desktop Light](docs/assets/screenshots/auto/about_desktop_light_top.png)

**Mobile**
![About Mobile Dark](docs/assets/screenshots/auto/about_mobile_dark_top.png)
![About Mobile Light](docs/assets/screenshots/auto/about_mobile_light_top.png)

**Scrolled Desktop**
![About Scrolled Desktop Dark](docs/assets/screenshots/auto/about_desktop_dark_scroll.png)
![About Scrolled Desktop Light](docs/assets/screenshots/auto/about_desktop_light_scroll.png)

**Scrolled Mobile**
![About Scrolled Mobile Dark](docs/assets/screenshots/auto/about_mobile_dark_scroll.png)
![About Scrolled Mobile Light](docs/assets/screenshots/auto/about_mobile_light_scroll.png)

### Feedback
**Desktop**
![Feedback Desktop Dark](docs/assets/screenshots/auto/feedback_desktop_dark_top.png)
![Feedback Desktop Light](docs/assets/screenshots/auto/feedback_desktop_light_top.png)

**Mobile**
![Feedback Mobile Dark](docs/assets/screenshots/auto/feedback_mobile_dark_top.png)
![Feedback Mobile Light](docs/assets/screenshots/auto/feedback_mobile_light_top.png)

**Scrolled Desktop**
![Feedback Scrolled Desktop Dark](docs/assets/screenshots/auto/feedback_desktop_dark_scroll.png)
![Feedback Scrolled Desktop Light](docs/assets/screenshots/auto/feedback_desktop_light_scroll.png)

**Scrolled Mobile**
![Feedback Scrolled Mobile Dark](docs/assets/screenshots/auto/feedback_mobile_dark_scroll.png)
![Feedback Scrolled Mobile Light](docs/assets/screenshots/auto/feedback_mobile_light_scroll.png)

### Templates
**Desktop**
![Templates Desktop Dark](docs/assets/screenshots/auto/templates_desktop_dark_top.png)
![Templates Desktop Light](docs/assets/screenshots/auto/templates_desktop_light_top.png)

**Mobile**
![Templates Mobile Dark](docs/assets/screenshots/auto/templates_mobile_dark_top.png)
![Templates Mobile Light](docs/assets/screenshots/auto/templates_mobile_light_top.png)

**Scrolled Desktop**
![Templates Scrolled Desktop Dark](docs/assets/screenshots/auto/templates_desktop_dark_scroll.png)
![Templates Scrolled Desktop Light](docs/assets/screenshots/auto/templates_desktop_light_scroll.png)

**Scrolled Mobile**
![Templates Scrolled Mobile Dark](docs/assets/screenshots/auto/templates_mobile_dark_scroll.png)
![Templates Scrolled Mobile Light](docs/assets/screenshots/auto/templates_mobile_light_scroll.png)

### History
**Desktop**
![History Desktop Dark](docs/assets/screenshots/auto/history_desktop_dark_top.png)
![History Desktop Light](docs/assets/screenshots/auto/history_desktop_light_top.png)

**Mobile**
![History Mobile Dark](docs/assets/screenshots/auto/history_mobile_dark_top.png)
![History Mobile Light](docs/assets/screenshots/auto/history_mobile_light_top.png)

**Scrolled Desktop**
![History Scrolled Desktop Dark](docs/assets/screenshots/auto/history_desktop_dark_scroll.png)
![History Scrolled Desktop Light](docs/assets/screenshots/auto/history_desktop_light_scroll.png)

**Scrolled Mobile**
![History Scrolled Mobile Dark](docs/assets/screenshots/auto/history_mobile_dark_scroll.png)
![History Scrolled Mobile Light](docs/assets/screenshots/auto/history_mobile_light_scroll.png)

### Collections
**Desktop**
![Collections Desktop Dark](docs/assets/screenshots/auto/collections_desktop_dark_top.png)
![Collections Desktop Light](docs/assets/screenshots/auto/collections_desktop_light_top.png)

**Mobile**
![Collections Mobile Dark](docs/assets/screenshots/auto/collections_mobile_dark_top.png)
![Collections Mobile Light](docs/assets/screenshots/auto/collections_mobile_light_top.png)

**Scrolled Desktop**
![Collections Scrolled Desktop Dark](docs/assets/screenshots/auto/collections_desktop_dark_scroll.png)
![Collections Scrolled Desktop Light](docs/assets/screenshots/auto/collections_desktop_light_scroll.png)

**Scrolled Mobile**
![Collections Scrolled Mobile Dark](docs/assets/screenshots/auto/collections_mobile_dark_scroll.png)
![Collections Scrolled Mobile Light](docs/assets/screenshots/auto/collections_mobile_light_scroll.png)

### Profile
**Desktop**
![Profile Desktop Dark](docs/assets/screenshots/auto/profile_desktop_dark_top.png)
![Profile Desktop Light](docs/assets/screenshots/auto/profile_desktop_light_top.png)

**Mobile**
![Profile Mobile Dark](docs/assets/screenshots/auto/profile_mobile_dark_top.png)
![Profile Mobile Light](docs/assets/screenshots/auto/profile_mobile_light_top.png)

**Scrolled Desktop**
![Profile Scrolled Desktop Dark](docs/assets/screenshots/auto/profile_desktop_dark_scroll.png)
![Profile Scrolled Desktop Light](docs/assets/screenshots/auto/profile_desktop_light_scroll.png)

**Scrolled Mobile**
![Profile Scrolled Mobile Dark](docs/assets/screenshots/auto/profile_mobile_dark_scroll.png)
![Profile Scrolled Mobile Light](docs/assets/screenshots/auto/profile_mobile_light_scroll.png)

### Compare
**Desktop**
![Compare Desktop Dark](docs/assets/screenshots/auto/compare_desktop_dark_top.png)
![Compare Desktop Light](docs/assets/screenshots/auto/compare_desktop_light_top.png)

**Mobile**
![Compare Mobile Dark](docs/assets/screenshots/auto/compare_mobile_dark_top.png)
![Compare Mobile Light](docs/assets/screenshots/auto/compare_mobile_light_top.png)

**Scrolled Desktop**
![Compare Scrolled Desktop Dark](docs/assets/screenshots/auto/compare_desktop_dark_scroll.png)
![Compare Scrolled Desktop Light](docs/assets/screenshots/auto/compare_desktop_light_scroll.png)

**Scrolled Mobile**
![Compare Scrolled Mobile Dark](docs/assets/screenshots/auto/compare_mobile_dark_scroll.png)
![Compare Scrolled Mobile Light](docs/assets/screenshots/auto/compare_mobile_light_scroll.png)

### Settings
**Desktop**
![Settings Desktop Dark](docs/assets/screenshots/auto/settings_desktop_dark_top.png)
![Settings Desktop Light](docs/assets/screenshots/auto/settings_desktop_light_top.png)

**Mobile**
![Settings Mobile Dark](docs/assets/screenshots/auto/settings_mobile_dark_top.png)
![Settings Mobile Light](docs/assets/screenshots/auto/settings_mobile_light_top.png)

**Scrolled Desktop**
![Settings Scrolled Desktop Dark](docs/assets/screenshots/auto/settings_desktop_dark_scroll.png)
![Settings Scrolled Desktop Light](docs/assets/screenshots/auto/settings_desktop_light_scroll.png)

**Scrolled Mobile**
![Settings Scrolled Mobile Dark](docs/assets/screenshots/auto/settings_mobile_dark_scroll.png)
![Settings Scrolled Mobile Light](docs/assets/screenshots/auto/settings_mobile_light_scroll.png)

### SAP
**Desktop**
![SAP Desktop Dark](docs/assets/screenshots/auto/sap_react_desktop_dark_top.png)
![SAP Desktop Light](docs/assets/screenshots/auto/sap_react_desktop_light_top.png)

**Mobile**
![SAP Mobile Dark](docs/assets/screenshots/auto/sap_react_mobile_dark_top.png)
![SAP Mobile Light](docs/assets/screenshots/auto/sap_react_mobile_light_top.png)

**Scrolled Desktop**
![SAP Scrolled Desktop Dark](docs/assets/screenshots/auto/sap_react_desktop_dark_scroll.png)
![SAP Scrolled Desktop Light](docs/assets/screenshots/auto/sap_react_desktop_light_scroll.png)

**Scrolled Mobile**
![SAP Scrolled Mobile Dark](docs/assets/screenshots/auto/sap_react_mobile_dark_scroll.png)
![SAP Scrolled Mobile Light](docs/assets/screenshots/auto/sap_react_mobile_light_scroll.png)

### Salesforce
**Desktop**
![Salesforce Desktop Dark](docs/assets/screenshots/auto/salesforce_react_desktop_dark_top.png)
![Salesforce Desktop Light](docs/assets/screenshots/auto/salesforce_react_desktop_light_top.png)

**Mobile**
![Salesforce Mobile Dark](docs/assets/screenshots/auto/salesforce_react_mobile_dark_top.png)
![Salesforce Mobile Light](docs/assets/screenshots/auto/salesforce_react_mobile_light_top.png)

**Scrolled Desktop**
![Salesforce Scrolled Desktop Dark](docs/assets/screenshots/auto/salesforce_react_desktop_dark_scroll.png)
![Salesforce Scrolled Desktop Light](docs/assets/screenshots/auto/salesforce_react_desktop_light_scroll.png)

**Scrolled Mobile**
![Salesforce Scrolled Mobile Dark](docs/assets/screenshots/auto/salesforce_react_mobile_dark_scroll.png)
![Salesforce Scrolled Mobile Light](docs/assets/screenshots/auto/salesforce_react_mobile_light_scroll.png)

### Static HTML Portals

### SAP Phase II
**Desktop**
![SAP Phase II Desktop Dark](docs/assets/screenshots/auto/sap_phii_desktop_dark_top.png)
![SAP Phase II Desktop Light](docs/assets/screenshots/auto/sap_phii_desktop_light_top.png)

**Mobile**
![SAP Phase II Mobile Dark](docs/assets/screenshots/auto/sap_phii_mobile_dark_top.png)
![SAP Phase II Mobile Light](docs/assets/screenshots/auto/sap_phii_mobile_light_top.png)

**Scrolled Desktop**
![SAP Phase II Scrolled Desktop Dark](docs/assets/screenshots/auto/sap_phii_desktop_dark_scroll.png)
![SAP Phase II Scrolled Desktop Light](docs/assets/screenshots/auto/sap_phii_desktop_light_scroll.png)

**Scrolled Mobile**
![SAP Phase II Scrolled Mobile Dark](docs/assets/screenshots/auto/sap_phii_mobile_dark_scroll.png)
![SAP Phase II Scrolled Mobile Light](docs/assets/screenshots/auto/sap_phii_mobile_light_scroll.png)

### Salesforce
**Desktop**
![Salesforce Desktop Dark](docs/assets/screenshots/auto/salesforce_static_desktop_dark_top.png)
![Salesforce Desktop Light](docs/assets/screenshots/auto/salesforce_static_desktop_light_top.png)

**Mobile**
![Salesforce Mobile Dark](docs/assets/screenshots/auto/salesforce_static_mobile_dark_top.png)
![Salesforce Mobile Light](docs/assets/screenshots/auto/salesforce_static_mobile_light_top.png)

**Scrolled Desktop**
![Salesforce Scrolled Desktop Dark](docs/assets/screenshots/auto/salesforce_static_desktop_dark_scroll.png)
![Salesforce Scrolled Desktop Light](docs/assets/screenshots/auto/salesforce_static_desktop_light_scroll.png)

**Scrolled Mobile**
![Salesforce Scrolled Mobile Dark](docs/assets/screenshots/auto/salesforce_static_mobile_dark_scroll.png)
![Salesforce Scrolled Mobile Light](docs/assets/screenshots/auto/salesforce_static_mobile_light_scroll.png)

### Workday
**Desktop**
![Workday Desktop Dark](docs/assets/screenshots/auto/workday_desktop_dark_top.png)
![Workday Desktop Light](docs/assets/screenshots/auto/workday_desktop_light_top.png)

**Mobile**
![Workday Mobile Dark](docs/assets/screenshots/auto/workday_mobile_dark_top.png)
![Workday Mobile Light](docs/assets/screenshots/auto/workday_mobile_light_top.png)

**Scrolled Desktop**
![Workday Scrolled Desktop Dark](docs/assets/screenshots/auto/workday_desktop_dark_scroll.png)
![Workday Scrolled Desktop Light](docs/assets/screenshots/auto/workday_desktop_light_scroll.png)

**Scrolled Mobile**
![Workday Scrolled Mobile Dark](docs/assets/screenshots/auto/workday_mobile_dark_scroll.png)
![Workday Scrolled Mobile Light](docs/assets/screenshots/auto/workday_mobile_light_scroll.png)

### ServiceNow
**Desktop**
![ServiceNow Desktop Dark](docs/assets/screenshots/auto/servicenow_desktop_dark_top.png)
![ServiceNow Desktop Light](docs/assets/screenshots/auto/servicenow_desktop_light_top.png)

**Mobile**
![ServiceNow Mobile Dark](docs/assets/screenshots/auto/servicenow_mobile_dark_top.png)
![ServiceNow Mobile Light](docs/assets/screenshots/auto/servicenow_mobile_light_top.png)

**Scrolled Desktop**
![ServiceNow Scrolled Desktop Dark](docs/assets/screenshots/auto/servicenow_desktop_dark_scroll.png)
![ServiceNow Scrolled Desktop Light](docs/assets/screenshots/auto/servicenow_desktop_light_scroll.png)

**Scrolled Mobile**
![ServiceNow Scrolled Mobile Dark](docs/assets/screenshots/auto/servicenow_mobile_dark_scroll.png)
![ServiceNow Scrolled Mobile Light](docs/assets/screenshots/auto/servicenow_mobile_light_scroll.png)

### Veeva
**Desktop**
![Veeva Desktop Dark](docs/assets/screenshots/auto/veeva_desktop_dark_top.png)
![Veeva Desktop Light](docs/assets/screenshots/auto/veeva_desktop_light_top.png)

**Mobile**
![Veeva Mobile Dark](docs/assets/screenshots/auto/veeva_mobile_dark_top.png)
![Veeva Mobile Light](docs/assets/screenshots/auto/veeva_mobile_light_top.png)

**Scrolled Desktop**
![Veeva Scrolled Desktop Dark](docs/assets/screenshots/auto/veeva_desktop_dark_scroll.png)
![Veeva Scrolled Desktop Light](docs/assets/screenshots/auto/veeva_desktop_light_scroll.png)

**Scrolled Mobile**
![Veeva Scrolled Mobile Dark](docs/assets/screenshots/auto/veeva_mobile_dark_scroll.png)
![Veeva Scrolled Mobile Light](docs/assets/screenshots/auto/veeva_mobile_light_scroll.png)

### Dynamics 365
**Desktop**
![Dynamics 365 Desktop Dark](docs/assets/screenshots/auto/dynamics365_desktop_dark_top.png)
![Dynamics 365 Desktop Light](docs/assets/screenshots/auto/dynamics365_desktop_light_top.png)

**Mobile**
![Dynamics 365 Mobile Dark](docs/assets/screenshots/auto/dynamics365_mobile_dark_top.png)
![Dynamics 365 Mobile Light](docs/assets/screenshots/auto/dynamics365_mobile_light_top.png)

**Scrolled Desktop**
![Dynamics 365 Scrolled Desktop Dark](docs/assets/screenshots/auto/dynamics365_desktop_dark_scroll.png)
![Dynamics 365 Scrolled Desktop Light](docs/assets/screenshots/auto/dynamics365_desktop_light_scroll.png)

**Scrolled Mobile**
![Dynamics 365 Scrolled Mobile Dark](docs/assets/screenshots/auto/dynamics365_mobile_dark_scroll.png)
![Dynamics 365 Scrolled Mobile Light](docs/assets/screenshots/auto/dynamics365_mobile_light_scroll.png)

### Oracle Apps
**Desktop**
![Oracle Apps Desktop Dark](docs/assets/screenshots/auto/oracleapps_desktop_dark_top.png)
![Oracle Apps Desktop Light](docs/assets/screenshots/auto/oracleapps_desktop_light_top.png)

**Mobile**
![Oracle Apps Mobile Dark](docs/assets/screenshots/auto/oracleapps_mobile_dark_top.png)
![Oracle Apps Mobile Light](docs/assets/screenshots/auto/oracleapps_mobile_light_top.png)

**Scrolled Desktop**
![Oracle Apps Scrolled Desktop Dark](docs/assets/screenshots/auto/oracleapps_desktop_dark_scroll.png)
![Oracle Apps Scrolled Desktop Light](docs/assets/screenshots/auto/oracleapps_desktop_light_scroll.png)

**Scrolled Mobile**
![Oracle Apps Scrolled Mobile Dark](docs/assets/screenshots/auto/oracleapps_mobile_dark_scroll.png)
![Oracle Apps Scrolled Mobile Light](docs/assets/screenshots/auto/oracleapps_mobile_light_scroll.png)

### API
**Desktop**
![API Desktop Dark](docs/assets/screenshots/auto/api_desktop_dark_top.png)
![API Desktop Light](docs/assets/screenshots/auto/api_desktop_light_top.png)

**Mobile**
![API Mobile Dark](docs/assets/screenshots/auto/api_mobile_dark_top.png)
![API Mobile Light](docs/assets/screenshots/auto/api_mobile_light_top.png)

**Scrolled Desktop**
![API Scrolled Desktop Dark](docs/assets/screenshots/auto/api_desktop_dark_scroll.png)
![API Scrolled Desktop Light](docs/assets/screenshots/auto/api_desktop_light_scroll.png)

**Scrolled Mobile**
![API Scrolled Mobile Dark](docs/assets/screenshots/auto/api_mobile_dark_scroll.png)
![API Scrolled Mobile Light](docs/assets/screenshots/auto/api_mobile_light_scroll.png)

### iOS
**Desktop**
![iOS Desktop Dark](docs/assets/screenshots/auto/ios_desktop_dark_top.png)
![iOS Desktop Light](docs/assets/screenshots/auto/ios_desktop_light_top.png)

**Mobile**
![iOS Mobile Dark](docs/assets/screenshots/auto/ios_mobile_dark_top.png)
![iOS Mobile Light](docs/assets/screenshots/auto/ios_mobile_light_top.png)

**Scrolled Desktop**
![iOS Scrolled Desktop Dark](docs/assets/screenshots/auto/ios_desktop_dark_scroll.png)
![iOS Scrolled Desktop Light](docs/assets/screenshots/auto/ios_desktop_light_scroll.png)

**Scrolled Mobile**
![iOS Scrolled Mobile Dark](docs/assets/screenshots/auto/ios_mobile_dark_scroll.png)
![iOS Scrolled Mobile Light](docs/assets/screenshots/auto/ios_mobile_light_scroll.png)

### Android
**Desktop**
![Android Desktop Dark](docs/assets/screenshots/auto/android_desktop_dark_top.png)
![Android Desktop Light](docs/assets/screenshots/auto/android_desktop_light_top.png)

**Mobile**
![Android Mobile Dark](docs/assets/screenshots/auto/android_mobile_dark_top.png)
![Android Mobile Light](docs/assets/screenshots/auto/android_mobile_light_top.png)

**Scrolled Desktop**
![Android Scrolled Desktop Dark](docs/assets/screenshots/auto/android_desktop_dark_scroll.png)
![Android Scrolled Desktop Light](docs/assets/screenshots/auto/android_desktop_light_scroll.png)

**Scrolled Mobile**
![Android Scrolled Mobile Dark](docs/assets/screenshots/auto/android_mobile_dark_scroll.png)
![Android Scrolled Mobile Light](docs/assets/screenshots/auto/android_mobile_light_scroll.png)

### AWS
**Desktop**
![AWS Desktop Dark](docs/assets/screenshots/auto/aws_desktop_dark_top.png)
![AWS Desktop Light](docs/assets/screenshots/auto/aws_desktop_light_top.png)

**Mobile**
![AWS Mobile Dark](docs/assets/screenshots/auto/aws_mobile_dark_top.png)
![AWS Mobile Light](docs/assets/screenshots/auto/aws_mobile_light_top.png)

**Scrolled Desktop**
![AWS Scrolled Desktop Dark](docs/assets/screenshots/auto/aws_desktop_dark_scroll.png)
![AWS Scrolled Desktop Light](docs/assets/screenshots/auto/aws_desktop_light_scroll.png)

**Scrolled Mobile**
![AWS Scrolled Mobile Dark](docs/assets/screenshots/auto/aws_mobile_dark_scroll.png)
![AWS Scrolled Mobile Light](docs/assets/screenshots/auto/aws_mobile_light_scroll.png)

### GCP
**Desktop**
![GCP Desktop Dark](docs/assets/screenshots/auto/gcp_desktop_dark_top.png)
![GCP Desktop Light](docs/assets/screenshots/auto/gcp_desktop_light_top.png)

**Mobile**
![GCP Mobile Dark](docs/assets/screenshots/auto/gcp_mobile_dark_top.png)
![GCP Mobile Light](docs/assets/screenshots/auto/gcp_mobile_light_top.png)

**Scrolled Desktop**
![GCP Scrolled Desktop Dark](docs/assets/screenshots/auto/gcp_desktop_dark_scroll.png)
![GCP Scrolled Desktop Light](docs/assets/screenshots/auto/gcp_desktop_light_scroll.png)

**Scrolled Mobile**
![GCP Scrolled Mobile Dark](docs/assets/screenshots/auto/gcp_mobile_dark_scroll.png)
![GCP Scrolled Mobile Light](docs/assets/screenshots/auto/gcp_mobile_light_scroll.png)

### Azure
**Desktop**
![Azure Desktop Dark](docs/assets/screenshots/auto/azure_desktop_dark_top.png)
![Azure Desktop Light](docs/assets/screenshots/auto/azure_desktop_light_top.png)

**Mobile**
![Azure Mobile Dark](docs/assets/screenshots/auto/azure_mobile_dark_top.png)
![Azure Mobile Light](docs/assets/screenshots/auto/azure_mobile_light_top.png)

**Scrolled Desktop**
![Azure Scrolled Desktop Dark](docs/assets/screenshots/auto/azure_desktop_dark_scroll.png)
![Azure Scrolled Desktop Light](docs/assets/screenshots/auto/azure_desktop_light_scroll.png)

**Scrolled Mobile**
![Azure Scrolled Mobile Dark](docs/assets/screenshots/auto/azure_mobile_dark_scroll.png)
![Azure Scrolled Mobile Light](docs/assets/screenshots/auto/azure_mobile_light_scroll.png)

### WebApps
**Desktop**
![WebApps Desktop Dark](docs/assets/screenshots/auto/webapps_desktop_dark_top.png)
![WebApps Desktop Light](docs/assets/screenshots/auto/webapps_desktop_light_top.png)

**Mobile**
![WebApps Mobile Dark](docs/assets/screenshots/auto/webapps_mobile_dark_top.png)
![WebApps Mobile Light](docs/assets/screenshots/auto/webapps_mobile_light_top.png)

**Scrolled Desktop**
![WebApps Scrolled Desktop Dark](docs/assets/screenshots/auto/webapps_desktop_dark_scroll.png)
![WebApps Scrolled Desktop Light](docs/assets/screenshots/auto/webapps_desktop_light_scroll.png)

**Scrolled Mobile**
![WebApps Scrolled Mobile Dark](docs/assets/screenshots/auto/webapps_mobile_dark_scroll.png)
![WebApps Scrolled Mobile Light](docs/assets/screenshots/auto/webapps_mobile_light_scroll.png)

### TopProducts
**Desktop**
![TopProducts Desktop Dark](docs/assets/screenshots/auto/topproducts_desktop_dark_top.png)
![TopProducts Desktop Light](docs/assets/screenshots/auto/topproducts_desktop_light_top.png)

**Mobile**
![TopProducts Mobile Dark](docs/assets/screenshots/auto/topproducts_mobile_dark_top.png)
![TopProducts Mobile Light](docs/assets/screenshots/auto/topproducts_mobile_light_top.png)

**Scrolled Desktop**
![TopProducts Scrolled Desktop Dark](docs/assets/screenshots/auto/topproducts_desktop_dark_scroll.png)
![TopProducts Scrolled Desktop Light](docs/assets/screenshots/auto/topproducts_desktop_light_scroll.png)

**Scrolled Mobile**
![TopProducts Scrolled Mobile Dark](docs/assets/screenshots/auto/topproducts_mobile_dark_scroll.png)
![TopProducts Scrolled Mobile Light](docs/assets/screenshots/auto/topproducts_mobile_light_scroll.png)

## 🌐 Enterprise Test Hub — Global Index, Deep Links & Dedup

The `/dashboard` route is now backed by a **global in-memory index** that pulls every test case from every product (SAP curated + 12 SAP module CSVs, all 7 Salesforce clouds, plus the 13 CSV-driven platforms — Veeva, Workday, ServiceNow, Dynamics 365, Oracle Apps, API, iOS, Android, AWS, GCP, Azure, WebApps, TopProducts).

### Unique test IDs

Every row carries a **stable, human-readable ID** (e.g. `SF-HC-00005`, `SAP-FI-001`, `WD-PAY-042`). The global index dedupes by ID using this priority order:

1. SAP curated (hand-written)
2. SAP module CSVs
3. Salesforce cloud CSVs
4. Other platform CSVs (first seen wins)

The dashboard reports the **number of duplicate IDs skipped** and the **count of unique IDs** so you can see at a glance how clean the catalogue is.

### Deep-linking by ID

Any test case is reachable at `/t/<id>`:

- `https://kr-test-automator.lovable.app/t/SF-HC-00005`
- `https://kr-test-automator.lovable.app/t/SAP-FI-001`
- `https://kr-test-automator.lovable.app/t/WD-PAY-042`

The detail page renders the case (preconditions, steps, expected result, metadata) and offers two CTAs:

- **Send to generator** — pre-fills the AI script generator with that case
- **View in product repo** — jumps to the owning platform page with the right module + tab pre-selected

### Search & filter

The dashboard now ships a **global search** that scans every product's catalogue. You can filter by product, by priority, and free-text search across IDs, scenarios, modules and test types. Each result row deep-links to `/t/<id>`.

### Per-platform overviews

Each platform page (`/sap`, `/salesforce`, `/p/<platform>`) shows the same SAP-style stats: total cases, modules loaded, high-priority count, automation %, coverage score, plus priority pie + top-modules bar — all powered by the same parser.

---

*(Built by Global IT Executive & Builder Kalilur Rahman)*

