import asyncio
from playwright.async_api import async_playwright

async def capture_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Serve the built files to take the screenshot
        await page.goto('http://localhost:8080/workday/index.html')
        await page.wait_for_timeout(2000) # Wait for page and dynamic content to load
        await page.screenshot(path='workday/assets/screenshots/landing.png')

        await page.goto('http://localhost:8080/workday/hcm/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='workday/assets/screenshots/hcm_subfolder.png')

        await browser.close()

asyncio.run(capture_screenshot())
