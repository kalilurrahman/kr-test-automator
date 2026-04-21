import asyncio
from playwright.async_api import async_playwright
import os
import json

BASE_URL = "https://kr-test-automator.lovable.app"

REACT_ROUTES = [
    ("/", "home"),
    ("/dashboard", "dashboard"),
    ("/templates", "templates"),
    ("/history", "history"),
    ("/collections", "collections"),
    ("/profile", "profile"),
    ("/compare", "compare"),
    ("/settings", "settings"),
    ("/about", "about"),
    ("/feedback", "feedback"),
    ("/sap", "sap_react"),
    ("/salesforce", "salesforce_react")
]

STATIC_ROUTES = [
    ("/SAP/Ph-II/index.html", "sap_phii"),
    ("/Salesforce/index.html", "salesforce_static"),
    ("/workday/index.html", "workday"),
    ("/ServiceNow/index.html", "servicenow"),
    ("/Veeva/index.html", "veeva"),
    ("/Dynamics365/index.html", "dynamics365"),
    ("/OracleApps/index.html", "oracleapps"),
    ("/API/index.html", "api"),
    ("/iOS/index.html", "ios"),
    ("/Android/index.html", "android"),
    ("/AWS/index.html", "aws"),
    ("/GCP/index.html", "gcp"),
    ("/Azure/index.html", "azure"),
    ("/WebApps/index.html", "webapps"),
    ("/TopProducts/index.html", "topproducts")
]

os.makedirs('docs/assets/screenshots/auto', exist_ok=True)
os.makedirs('docs/assets/media', exist_ok=True)

async def set_theme(page, theme):
    # The application uses next-themes. We can toggle by modifying the class on the html tag.
    await page.evaluate(f"""() => {{
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add('{theme}');
        // Store in localStorage if needed for static sites
        localStorage.setItem('theme', '{theme}');
    }}""")
    await page.wait_for_timeout(500) # Give it a moment to apply

async def capture(page, name, url, viewport_name):
    print(f"Capturing {name} at {url} ({viewport_name})")
    await page.goto(url, wait_until='networkidle')
    await page.wait_for_timeout(2000) # wait for dynamic content

    for theme in ['dark', 'light']:
        await set_theme(page, theme)

        # Capture Top
        filename = f"docs/assets/screenshots/auto/{name}_{viewport_name}_{theme}_top.png"
        await page.screenshot(path=filename)

        # Scroll and Capture
        await page.evaluate("window.scrollBy(0, window.innerHeight)")
        await page.wait_for_timeout(500)
        filename_scroll = f"docs/assets/screenshots/auto/{name}_{viewport_name}_{theme}_scroll.png"
        await page.screenshot(path=filename_scroll)

        # Scroll back
        await page.evaluate("window.scrollTo(0, 0)")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop
        desktop_context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        desktop_page = await desktop_context.new_page()

        # Mobile
        mobile_context = await browser.new_context(viewport={'width': 375, 'height': 667}, is_mobile=True, has_touch=True)
        mobile_page = await mobile_context.new_page()

        for route, name in REACT_ROUTES + STATIC_ROUTES:
            url = BASE_URL + route
            try:
                await capture(desktop_page, name, url, "desktop")
                await capture(mobile_page, name, url, "mobile")
            except Exception as e:
                print(f"Failed to capture {url}: {e}")

        await browser.close()

asyncio.run(main())
