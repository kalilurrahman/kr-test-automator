import { randomUUID } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";
import { journeys, productName } from "../../suite.config";

const runId = randomUUID().replaceAll("-", "").slice(0, 8);
const safePrefix = process.env.TEST_DATA_PREFIX ?? "codex-e2e";
const timeout = Number(process.env.ACTION_TIMEOUT_MS ?? 15_000);
const resourceName = (index: number) => `${safePrefix}-${runId}-${index}`;

function pattern(value: string): RegExp {
  return new RegExp(value, "i");
}

async function openSection(page: Page, section: string) {
  const nav = page.getByRole("navigation").first();
  await expect(nav, "Application navigation should be available after authentication").toBeVisible();
  const link = nav.getByRole("link", { name: pattern(section) }).first();
  if (await link.count()) {
    await link.click();
  } else {
    const button = nav.getByRole("button", { name: pattern(section) }).first();
    await expect(button, `Navigation item matching /${section}/ should exist`).toBeVisible();
    await button.click();
  }
  await expect(page.getByRole("main")).toBeVisible();
}

async function clickAction(page: Page, action: string) {
  const name = pattern(action);
  const button = page.getByRole("button", { name }).first();
  if (await button.count()) {
    await expect(button, `Action matching /${action}/ should be enabled`).toBeEnabled({ timeout });
    await button.click();
    return;
  }
  const link = page.getByRole("link", { name }).first();
  await expect(link, `Action link matching /${action}/ should be visible`).toBeVisible({ timeout });
  await link.click();
}

async function performNextAction(page: Page, action: string) {
  if (/upload files|choose file|select files/i.test(action)) {
    const fileInput = page.locator('input[type="file"]').first();
    const fixture = {
      name: `synthetic-${runId}.txt`,
      mimeType: "text/plain",
      buffer: Buffer.from(`synthetic fixture ${runId}\\n`, "utf8"),
    };
    if (await fileInput.count()) {
      await fileInput.setInputFiles(fixture);
      return;
    }
    const chooserPromise = page.waitForEvent("filechooser", { timeout });
    await clickAction(page, action);
    await (await chooserPromise).setFiles(fixture);
    return;
  }
  await clickAction(page, action);
}

async function fillNamedField(page: Page, fieldPattern: string, value: string) {
  const field = page.getByLabel(pattern(fieldPattern)).first();
  await expect(field, `Form field matching /${fieldPattern}/ should be visible`).toBeVisible({ timeout });
  const tagName = await field.evaluate((element) => element.tagName.toLowerCase());
  if (tagName === "select") {
    const options = field.locator("option");
    const optionCount = await options.count();
    await field.selectOption({ index: optionCount > 1 ? 1 : 0 });
    return;
  }
  if ((await field.getAttribute("role")) === "combobox") {
    await field.click();
    await page.getByRole("option").first().click();
    return;
  }
  await field.fill(value);
}

function syntheticValue(fieldPattern: string, createdName: string, fieldIndex: number): string {
  const field = fieldPattern.toLowerCase();
  if (/email|username/.test(field)) return `qa+${runId}@example.test`;
  if (/url|uri|repository|git|path/.test(field)) return `https://example.test/${encodeURIComponent(createdName)}`;
  if (/domain/.test(field)) return `${createdName}.example.test`;
  if (/host|server/.test(field)) return "127.0.0.1";
  if (/password|secret/.test(field)) return `Synthetic-${runId}-Only!91a`;
  if (/query|sql|statement/.test(field)) return "select 1 as synthetic_value";
  if (/region/.test(field)) return "us-east-1";
  if (/port/.test(field)) return "443";
  if (/description|reason|comment/.test(field)) return `${productName} synthetic E2E fixture ${runId}`;
  return fieldIndex === 0 ? createdName : `${productName} synthetic fixture ${runId}`;
}

async function createAndExerciseJourney(page: Page, journey: (typeof journeys)[number], index: number) {
  const createdName = resourceName(index);
  await page.goto(process.env.APP_ENTRY_PATH ?? "/");
  await openSection(page, journey.section);
  await clickAction(page, journey.createAction);
  for (let fieldIndex = 0; fieldIndex < journey.fields.length; fieldIndex += 1) {
    const fieldPattern = journey.fields[fieldIndex];
    const value = syntheticValue(fieldPattern, createdName, fieldIndex);
    await fillNamedField(page, fieldPattern, value);
  }
  await clickAction(page, journey.submitAction);
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
  await expect(page.getByText(pattern(journey.createdText)).first()).toBeVisible({ timeout });

  // Open one follow-on view/action so the scenario verifies navigation from
  // creation into the product's operational workflow, not only form success.
  await performNextAction(page, journey.nextAction);
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
  if (/run|execute|test|validate|publish|deploy|upload|ingest|train|sync|refresh|evaluate|replicate|revalidate|submit|restore|import|export|approve|promote|scale|retry|resume|invoke|subscribe|query/i.test(journey.nextAction)) {
    const completed = page.getByRole("status")
      .or(page.getByRole("alert"))
      .or(page.getByText(/success|succeeded|completed|published|ready|healthy|active|approved|accepted|passed|connected|verified/i));
    await expect(completed.last(), `The /${journey.nextAction}/ action should report a successful result`).toBeVisible({ timeout });
  }
  await page.reload();
  await expect(page.getByRole("main")).toContainText(createdName, { timeout });
}

test.describe(`${productName} standalone end-to-end suite`, () => {
  test.beforeEach(async ({ page }) => {
    await page.setDefaultTimeout(timeout);
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await expect(page).not.toHaveURL(/\/login(?:\/|$)/i, { timeout });
  });

  for (const [index, journey] of journeys.entries()) {
    test(journey.title, async ({ page }) => {
      await createAndExerciseJourney(page, journey, index + 1);
    });
  }

  test("navigation keeps the authenticated session inside the configured tenant", async ({ page }) => {
    const baseOrigin = new URL(process.env.BASE_URL ?? "http://127.0.0.1:3000").origin;
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await expect(page.getByRole("main")).toBeVisible();
    for (const journey of journeys.slice(0, 4)) {
      await openSection(page, journey.section);
      expect(new URL(page.url()).origin).toBe(baseOrigin);
      await expect(page).not.toHaveURL(/\/login(?:\/|$)/i);
    }
  });

  test("required form fields reject an empty create request", async ({ page }) => {
    const journey = journeys[0];
    await page.goto(process.env.APP_ENTRY_PATH ?? "/");
    await openSection(page, journey.section);
    await clickAction(page, journey.createAction);
    const submit = page.getByRole("button", { name: pattern(journey.submitAction) }).first();
    await expect(submit, "The create form should expose its submit action").toBeVisible({ timeout });
    if (await submit.isEnabled()) {
      await submit.click();
      const requiredError = page.getByRole("alert").or(page.getByText(/required|cannot be empty|enter a name/i));
      await expect(requiredError.first()).toBeVisible({ timeout });
    } else {
      await expect(submit).toBeDisabled();
    }
  });

  test("unauthorized application routes fail closed when a restricted path is configured", async ({ page }) => {
    test.skip(!process.env.RESTRICTED_PATH, "Set RESTRICTED_PATH and use a least-privilege storage state to enable this check.");
    await page.goto(process.env.RESTRICTED_PATH!);
    await expect(page.getByText(/access denied|not authorized|permission required|forbidden/i)).toBeVisible({ timeout });
  });
});
