const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("Starting server...");
  const { spawn } = require('child_process');

  const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });

  // Wait a few seconds for the server to start
  await new Promise(r => setTimeout(r, 5000));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const captureScreenshot = async (urlPath, destPath) => {
    try {
      console.log(`Navigating to ${urlPath}...`);
      await page.goto(`http://localhost:8080${urlPath}`);
      await page.waitForTimeout(2000);

      const dir = path.dirname(destPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      console.log(`Saving screenshot to ${destPath}...`);
      await page.screenshot({ path: destPath, fullPage: true });
    } catch (e) {
      console.error(`Error capturing ${urlPath}:`, e);
    }
  };

  await captureScreenshot('/workday/index.html', 'workday/assets/screenshots/landing.png');
  await captureScreenshot('/ServiceNow/index.html', 'ServiceNow/assets/screenshots/landing.png');
  await captureScreenshot('/Veeva/index.html', 'Veeva/assets/screenshots/landing.png');

  await browser.close();
  server.kill();
  console.log("Done.");
  process.exit(0);
})();
