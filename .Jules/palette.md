## 2024-03-19 - Explicit Button Types

**Learning:** Buttons in HTML default to `type="submit"`. In a component-based architecture like React, when buttons are used generically (e.g. for navigating, mapping items, opening modals) but are later wrapped in a `<form>` component (or rendered inside one), they can unintentionally trigger full-page reloads or unwanted form submissions.
**Action:** Always explicitly define `type="button"` for action buttons that are strictly meant for JavaScript/React interaction rather than form submission, improving resilience against unexpected behaviors.
