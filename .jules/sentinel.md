## 2024-05-24 - DoS vulnerability via missing maxLength on inputs
**Vulnerability:** Input fields in forms lacked the `maxLength` property, exposing the application to potential Denial of Service (DoS) attacks by allowing excessively long input strings.
**Learning:** Found in `screens/LoginScreen.tsx` and `components/settings/ProfileSection.tsx`. Input fields taking strings must always have a maximum length defined to prevent memory exhaustion and excessive processing on both client and server sides.
**Prevention:** Implement a standard practice of defining `maxLength` on all input fields taking strings during development and code review processes.

## 2025-05-15 - Insecure Development Server Binding
**Vulnerability:** The Vite development server was configured to bind to `0.0.0.0`, making it accessible from any device on the local network.
**Learning:** In `vite.config.ts`, setting `host: '0.0.0.0'` exposes the development environment to potential unauthorized access by users on the same network.
**Prevention:** In Vite configurations, always restrict the development server binding to `localhost` by omitting the `host` property or setting it explicitly to `localhost` to ensure the dev server is only accessible from the local machine.
