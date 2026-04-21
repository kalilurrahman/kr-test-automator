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

        await page.goto('http://localhost:8080/ServiceNow/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='ServiceNow/assets/screenshots/landing.png')

        await page.goto('http://localhost:8080/Veeva/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='Veeva/assets/screenshots/landing.png')

        await page.goto('http://localhost:8080/Dynamics365/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='Dynamics365/assets/screenshots/landing.png')

        await page.goto('http://localhost:8080/OracleApps/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='OracleApps/assets/screenshots/landing.png')

        await page.goto('http://localhost:8080/SAP/Ph-II/index.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='SAP/assets/screenshots/phii_subfolder.png')

        await browser.close()

asyncio.run(capture_screenshot())
