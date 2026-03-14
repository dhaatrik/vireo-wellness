## 2024-05-24 - DoS vulnerability via missing maxLength on inputs
**Vulnerability:** Input fields in forms lacked the `maxLength` property, exposing the application to potential Denial of Service (DoS) attacks by allowing excessively long input strings.
**Learning:** Found in `screens/LoginScreen.tsx` and `components/settings/ProfileSection.tsx`. Input fields taking strings must always have a maximum length defined to prevent memory exhaustion and excessive processing on both client and server sides.
**Prevention:** Implement a standard practice of defining `maxLength` on all input fields taking strings during development and code review processes.

## 2024-05-24 - Missing Content Security Policy (CSP)
**Vulnerability:** The application lacked a Content Security Policy (CSP), leaving it more susceptible to Cross-Site Scripting (XSS) and data injection attacks if a vulnerability were to be introduced elsewhere in the codebase.
**Learning:** Modern web applications, especially single-page applications (SPAs) loading external resources (like esm.sh for imports, Google Fonts, and external images), should implement a CSP as a fundamental defense-in-depth measure.
**Prevention:** Always include a baseline CSP in the `index.html` file that restricts `default-src` to `'self'` and explicitly whitelists necessary external domains for scripts, styles, fonts, and images.
