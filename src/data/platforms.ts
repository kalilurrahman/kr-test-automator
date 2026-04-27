import type { Platform } from "@/store/generatorStore";

export const platforms: { id: Platform; name: string; icon: string; color: string }[] = [
  { id: "sap", name: "SAP", icon: "🏢", color: "var(--clr-sap)" },
  { id: "salesforce", name: "Salesforce", icon: "☁️", color: "var(--clr-salesforce)" },
  { id: "veeva", name: "Veeva", icon: "💊", color: "var(--clr-veeva)" },
  { id: "servicenow", name: "ServiceNow", icon: "🔧", color: "var(--clr-servicenow)" },
  { id: "workday", name: "Workday", icon: "👥", color: "var(--clr-workday)" },
  { id: "oracle", name: "Oracle", icon: "🔴", color: "var(--clr-oracle)" },
  { id: "m365", name: "M365", icon: "📊", color: "var(--clr-m365)" },
  { id: "web", name: "Web/Custom", icon: "🌐", color: "var(--clr-web)" },
  { id: "api", name: "REST API", icon: "⚡", color: "var(--clr-api)" },
  { id: "mobile_ios", name: "iOS", icon: "📱", color: "var(--clr-mobile)" },
  { id: "mobile_android", name: "Android", icon: "🤖", color: "var(--clr-mobile)" },
];

export const frameworkGroups = [
  {
    label: "UI Testing",
    options: [
      { value: "playwright_ts", label: "Playwright (TypeScript)", lang: "typescript" },
      { value: "playwright_python", label: "Playwright (Python)", lang: "python" },
      { value: "selenium_python", label: "Selenium WebDriver (Python)", lang: "python" },
      { value: "selenium_java", label: "Selenium WebDriver (Java/TestNG)", lang: "java" },
      { value: "selenium_js", label: "Selenium WebDriver (JavaScript)", lang: "javascript" },
      { value: "selenium_csharp", label: "Selenium WebDriver (C#/NUnit)", lang: "csharp" },
      { value: "cypress_js", label: "Cypress (JavaScript)", lang: "javascript" },
      { value: "cypress_ts", label: "Cypress (TypeScript)", lang: "typescript" },
      { value: "webdriverio", label: "WebdriverIO (JavaScript)", lang: "javascript" },
      { value: "puppeteer", label: "Puppeteer (JavaScript)", lang: "javascript" },
    ],
  },
  {
    label: "Mobile Testing",
    options: [
      { value: "appium_python", label: "Appium (Python)", lang: "python" },
      { value: "appium_java", label: "Appium (Java)", lang: "java" },
      { value: "xcuitest", label: "XCUITest (Swift)", lang: "swift" },
      { value: "espresso", label: "Espresso (Kotlin)", lang: "kotlin" },
    ],
  },
  {
    label: "API Testing",
    options: [
      { value: "rest_assured", label: "REST Assured (Java)", lang: "java" },
      { value: "karate", label: "Karate DSL (Gherkin)", lang: "gherkin" },
      { value: "pytest_requests", label: "Pytest + Requests (Python)", lang: "python" },
      { value: "supertest", label: "SuperTest (JavaScript)", lang: "javascript" },
      { value: "k6", label: "k6 (JavaScript) — Performance", lang: "javascript" },
      { value: "gatling", label: "Gatling (Scala) — Performance", lang: "scala" },
      { value: "jmeter", label: "JMeter (XML) — Performance", lang: "xml" },
    ],
  },
  {
    label: "BDD",
    options: [
      { value: "cucumber_selenium", label: "Cucumber + Selenium (Java)", lang: "java" },
      { value: "cucumber_playwright", label: "Cucumber + Playwright (TS)", lang: "typescript" },
      { value: "robot_framework", label: "Robot Framework (Python)", lang: "robot" },
      { value: "behave", label: "Behave (Python)", lang: "python" },
    ],
  },
  {
    label: "Specialised",
    options: [
      { value: "tricentis_tosca", label: "Tricentis Tosca (Model-based)", lang: "model-based" },
      { value: "uft_one", label: "UFT One (VBScript)", lang: "vbscript" },
      { value: "katalon", label: "Katalon Studio (Groovy)", lang: "groovy" },
      { value: "postman_newman", label: "Postman / Newman (CLI)", lang: "json" },
      { value: "pact", label: "Pact (Consumer-Driven Contract)", lang: "javascript" },
    ],
  },
];

export const testScopeOptions: { id: string; label: string }[] = [
  { id: "ui_functional", label: "UI Functional" },
  { id: "regression", label: "Regression" },
  { id: "smoke", label: "Smoke/Sanity" },
  { id: "e2e", label: "E2E" },
  { id: "api", label: "API" },
  { id: "performance", label: "Performance" },
  { id: "security", label: "Security" },
  { id: "accessibility", label: "Accessibility" },
  { id: "data_driven", label: "Data-driven" },
  { id: "bdd", label: "BDD/Gherkin" },
];

export const progressSteps = [
  "Analysing business case",
  "Designing test architecture",
  "Writing Page Object Models",
  "Generating test cases...",
  "Adding assertions and validations",
  "Writing setup and teardown",
];
