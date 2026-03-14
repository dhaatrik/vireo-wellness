from playwright.sync_api import sync_playwright

def test_dashboard_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.goto("http://localhost:3000/")

        print("Clicking Get Started")
        page.get_by_role("button", name="Get Started").click()

        print("Filling Name/Phone")
        page.get_by_placeholder("Rohit Kumar").fill("Test User")
        page.get_by_placeholder("0000000000").fill("5555555555")
        page.get_by_role("button", name="Continue").click()

        print("Selecting Diabetes Type")
        page.get_by_role("button", name="Type 1").click()
        page.get_by_role("button", name="Continue").click()

        print("Selecting target range")
        page.get_by_role("button", name="Continue").click()

        print("Selecting weight goal")
        page.get_by_role("button", name="Lose Weight").click()
        page.get_by_role("button", name="Finish Setup").click()

        # Step 5 is already dashboard
        print("Waiting for Dashboard")
        page.wait_for_selector("text=Overview", timeout=10000)

        print("Looking for Customize")
        try:
             page.get_by_role("button", name="Customize Dashboard").click()
        except Exception:
             try:
                 page.locator("button[aria-label='Customize dashboard']").click()
             except Exception as e:
                 print("Could not find customize button:", e)

        page.wait_for_timeout(1000)
        page.screenshot(path="verification.png")
        print("Screenshot saved to verification.png")

        browser.close()

if __name__ == "__main__":
    test_dashboard_modal()