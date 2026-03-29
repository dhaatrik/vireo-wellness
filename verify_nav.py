import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to the dashboard
    page.goto("http://localhost:3000/#/dashboard")
    page.wait_for_timeout(1000)

    # We need to test focus state. We'll use page.evaluate to add the focus classes
    # to one of the BottomNav links (e.g., Insights) to simulate the focus-visible state
    # as described in the memory for testing focus visibility.
    page.evaluate('''() => {
        const links = document.querySelectorAll('nav a');
        for (const link of links) {
            if (link.textContent.includes('Insights')) {
                link.classList.add('focus-visible:ring-2', 'focus-visible:ring-emerald-500', 'focus-visible:outline-none', 'focus-visible:ring-offset-2', 'focus-visible:ring-offset-slate-900', 'outline-none', 'ring-2', 'ring-emerald-500', 'ring-offset-2', 'ring-offset-slate-900');
            }
        }
    }''')

    page.wait_for_timeout(1000)

    # Take screenshot at the key moment
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()

        # Bypass onboarding
        page.goto("http://localhost:3000/")
        page.evaluate('''() => {
            window.localStorage.setItem('hasCompletedOnboarding', 'true');
            window.localStorage.setItem('isLoggedIn', 'true');
            window.localStorage.setItem('userProfile', JSON.stringify({'name':'Rohit Kumar','phone':'0000000000','countryCode':'US'}));
        }''')

        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
