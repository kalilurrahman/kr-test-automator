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

### Home
![Home Dark](docs/assets/screenshots/home_dark.png)
![Home Light](docs/assets/screenshots/home_light.png)

### Dashboard
![Dashboard Dark](docs/assets/screenshots/dashboard_dark.png)
![Dashboard Light](docs/assets/screenshots/dashboard_light.png)

### About
![About Dark](docs/assets/screenshots/about_dark.png)
![About Light](docs/assets/screenshots/about_light.png)

### Feedback
![Feedback Dark](docs/assets/screenshots/feedback_dark.png)
![Feedback Light](docs/assets/screenshots/feedback_light.png)

### Templates
![Templates Dark](docs/assets/screenshots/templates_dark.png)
![Templates Light](docs/assets/screenshots/templates_light.png)

### History
![History Dark](docs/assets/screenshots/history_dark.png)
![History Light](docs/assets/screenshots/history_light.png)

### Collections
![Collections Dark](docs/assets/screenshots/collections_dark.png)
![Collections Light](docs/assets/screenshots/collections_light.png)

### Profile
![Profile Dark](docs/assets/screenshots/profile_dark.png)
![Profile Light](docs/assets/screenshots/profile_light.png)

### Compare
![Compare Dark](docs/assets/screenshots/compare_dark.png)
![Compare Light](docs/assets/screenshots/compare_light.png)

### Settings
![Settings Dark](docs/assets/screenshots/settings_dark.png)
![Settings Light](docs/assets/screenshots/settings_light.png)

### SAP
![SAP Dark](docs/assets/screenshots/sap_dark.png)
![SAP Light](docs/assets/screenshots/sap_light.png)

### SAP Phase II
![SAP Phase II Dark](docs/assets/screenshots/sap_phii_dark.png)
![SAP Phase II Light](docs/assets/screenshots/sap_phii_light.png)

### Salesforce
![Salesforce Dark](docs/assets/screenshots/salesforce_react_dark.png)
![Salesforce Light](docs/assets/screenshots/salesforce_react_light.png)

### Workday
![Workday Dark](docs/assets/screenshots/workday_dark.png)
![Workday Light](docs/assets/screenshots/workday_light.png)

### ServiceNow
![ServiceNow Dark](docs/assets/screenshots/servicenow_dark.png)
![ServiceNow Light](docs/assets/screenshots/servicenow_light.png)

### Veeva
![Veeva Dark](docs/assets/screenshots/veeva_dark.png)
![Veeva Light](docs/assets/screenshots/veeva_light.png)

### Dynamics 365
![Dynamics 365 Dark](docs/assets/screenshots/dynamics365_dark.png)
![Dynamics 365 Light](docs/assets/screenshots/dynamics365_light.png)

### Oracle Apps
![Oracle Apps Dark](docs/assets/screenshots/oracleapps_dark.png)
![Oracle Apps Light](docs/assets/screenshots/oracleapps_light.png)

---

*(Built by Global IT Executive & Builder Kalilur Rahman)*
