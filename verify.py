from playwright.sync_api import sync_playwright
import time

def verify_ux_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Bypass onboarding properly
        page.goto("http://localhost:3000/")
        page.evaluate("window.localStorage.setItem('hasCompletedOnboarding', 'true')")
        page.evaluate("window.localStorage.setItem('isLoggedIn', 'true')")
        page.evaluate("window.localStorage.setItem('userProfile', JSON.stringify({'name':'Rohit Kumar','phone':'0000000000','countryCode':'US'}))")
        page.reload()

        time.sleep(1)
        page.goto("http://localhost:3000/#/dashboard")

        # Wait a moment for rendering
        time.sleep(2)

        # Take a screenshot of the main dashboard, which includes the Water and Chart widgets
        page.screenshot(path="/app/dashboard_widgets.png")

        # Open the Customize Dashboard Modal
        settings_button = page.locator("button[aria-label='Customize Dashboard']")
        if settings_button.count() > 0:
            settings_button.click()
            time.sleep(1)
            page.screenshot(path="/app/customize_modal.png")

        browser.close()

if __name__ == "__main__":
    verify_ux_changes()