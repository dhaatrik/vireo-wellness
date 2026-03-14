import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("Navigating to http://localhost:3000")
        await page.goto("http://localhost:3000")

        # Wait for the initial redirect to take effect
        await page.wait_for_timeout(2000)

        # Now force navigation to the settings screen
        print("Forcing navigation to #/settings")
        await page.evaluate("window.location.hash = '#/settings'")

        # Wait a bit for the settings screen to render
        await page.wait_for_timeout(2000)

        # Take a screenshot
        print("Taking screenshot of settings screen")
        await page.screenshot(path="/home/jules/verification/settings_final.png", full_page=True)

        await browser.close()
        print("Done")

if __name__ == "__main__":
    asyncio.run(run())
