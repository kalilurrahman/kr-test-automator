import "dotenv/config";
import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const authFile = process.env.STORAGE_STATE;
const storageState = authFile && existsSync(authFile) ? authFile : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  timeout: Number(process.env.TEST_TIMEOUT_MS ?? 60_000),
  expect: { timeout: Number(process.env.EXPECT_TIMEOUT_MS ?? 15_000) },
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    ...(storageState ? { storageState } : {}),
    actionTimeout: Number(process.env.ACTION_TIMEOUT_MS ?? 15_000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT_MS ?? 30_000),
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
