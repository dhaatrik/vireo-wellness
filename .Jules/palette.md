## 2024-03-19 - Explicit Button Types

**Learning:** Buttons in HTML default to `type="submit"`. In a component-based architecture like React, when buttons are used generically (e.g. for navigating, mapping items, opening modals) but are later wrapped in a `<form>` component (or rendered inside one), they can unintentionally trigger full-page reloads or unwanted form submissions.
**Action:** Always explicitly define `type="button"` for action buttons that are strictly meant for JavaScript/React interaction rather than form submission, improving resilience against unexpected behaviors.

## 2024-05-20 - Focus Styles for Hidden Interactive Elements

**Learning:** Interactive elements (like a delete button in a list item) that are visually hidden behind `opacity-0` and only become visible on hover (`group-hover:opacity-100`) are invisible to keyboard users who tab to them.
**Action:** Always include explicit focus styles (e.g., `focus:opacity-100 focus-visible:ring-2 focus-visible:ring-emerald-500`) on such hidden buttons to ensure they become visible and clearly indicated when receiving keyboard focus.

## 2025-03-08 - Focus Styles for Interactive Elements

**Learning:** When building custom interactive elements like icon-only buttons or interactive cards (e.g., list reordering, toggle visibility, custom stat cards), the default browser focus ring is often suppressed or not visible enough, especially on dark backgrounds.
**Action:** Always include explicit `focus-visible` styling (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`) to ensure clear visual tracking for keyboard navigation.
