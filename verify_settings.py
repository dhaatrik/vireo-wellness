from playwright.sync_api import sync_playwright, expect
import time

def verify_settings(page):
    page.goto("http://localhost:3000/#/")
    time.sleep(2)

    # Check if we are on splash screen
    get_started = page.get_by_role("button", name="Get Started")
    if get_started.is_visible():
        print("On splash screen. Click Get Started.")
        get_started.click()

        # Now on login
        page.locator("input#name").fill("Test User")
        page.locator("input#phone").fill("1234567890")
        page.get_by_role("button", name="Continue").click()

        # onboarding step 1
        page.get_by_text("Type 1").click()
        page.get_by_role("button", name="Continue").click()

        # step 2
        page.get_by_role("button", name="Continue").click()

        # step 3
        page.get_by_text("Maintain Weight").click()
        page.get_by_role("button", name="Finish Setup").click()

    print("Navigating to settings...")
    page.goto("http://localhost:3000/#/settings")
    time.sleep(2)

    # The sign out button should be visible
    sign_out_button = page.get_by_role("button", name="Sign Out")
    expect(sign_out_button).to_be_visible()

    print("Clicking Sign Out...")
    sign_out_button.click()
    time.sleep(1)

    # We should be back at the splash screen
    expect(page.get_by_text("Thrive Daily")).to_be_visible()

    # Take a screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_settings(page)
        finally:
            browser.close()