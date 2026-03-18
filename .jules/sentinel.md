## 2024-05-24 - DoS vulnerability via missing maxLength on inputs
**Vulnerability:** Input fields in forms lacked the `maxLength` property, exposing the application to potential Denial of Service (DoS) attacks by allowing excessively long input strings.
**Learning:** Found in `screens/LoginScreen.tsx` and `components/settings/ProfileSection.tsx`. Input fields taking strings must always have a maximum length defined to prevent memory exhaustion and excessive processing on both client and server sides.
**Prevention:** Implement a standard practice of defining `maxLength` on all input fields taking strings during development and code review processes.

## 2025-05-15 - Insecure Development Server Binding
**Vulnerability:** The Vite development server was configured to bind to `0.0.0.0`, making it accessible from any device on the local network.
**Learning:** In `vite.config.ts`, setting `host: '0.0.0.0'` exposes the development environment to potential unauthorized access by users on the same network.
**Prevention:** In Vite configurations, always restrict the development server binding to `localhost` by omitting the `host` property or setting it explicitly to `localhost` to ensure the dev server is only accessible from the local machine.
## 2024-05-24 - Replaced insecure Math.random() with crypto.randomInt() in benchmark script
**Vulnerability:** The use of `Math.random()` to generate mock timestamps in `scripts/benchmarks/benchmark.cjs` is cryptographically insecure and predictable, creating a potential risk in scenarios demanding robust randomness.
**Learning:** `Math.random()` should never be used where secure randomness is required. The `crypto` module built into Node provides secure alternatives like `crypto.randomInt()`.
**Prevention:** Always default to using the `crypto` module (or `window.crypto` on the web) for tasks involving random number generation when security could be a concern, avoiding `Math.random()` completely for such use cases.
## 2024-05-25 - Avoid security theater with secure randoms in benchmark scripts
**Vulnerability:** Replacing `Math.random()` with `crypto.randomInt()` in benchmark scripts was attempted, incorrectly perceived as addressing weak randomness.
**Learning:** Benchmarks require fast synthetic data generation where unpredictability is completely irrelevant. Introducing cryptographically secure random number generators (CSPRNGs) like `crypto.randomInt()` slows down mock data creation, bloats execution time, and can skew performance metrics, creating active harm for zero security gain.
**Prevention:** Never apply security fixes like CSPRNGs to benchmark or non-security-critical mock data logic. Focus on actual application code where unpredictability is a genuine security requirement.

## 2026-03-17 - Unsafe JSON Parsing from Local Storage
**Vulnerability:** Parsing raw JSON from LocalStorage without verifying its schema in `DashboardScreen.tsx` could lead to application crashes or unexpected behavior if the stored data was malformed or maliciously altered.
**Learning:** Data from `localStorage` is untrusted and can be modified by users or other scripts (if there are other vulnerabilities like XSS). Always validate the schema of the parsed data before using it to update the application state.
**Prevention:** Implement type guards or use schema validation libraries (like Zod) to verify that data retrieved from `localStorage` matches the expected interface immediately after `JSON.parse`.
