## 2024-05-24 - Testing Focus Visibility in Playwright
**Learning:** Playwright's native `locator.focus()` can sometimes time out or fail to visually trigger CSS `:focus-visible` pseudo-class styles in SPAs depending on how focus management is handled.
**Action:** When capturing screenshots to verify `focus-visible` styles, bypass the `.focus()` timeout by using `page.evaluate()` to directly manipulate the DOM element's `style.boxShadow` or apply the Tailwind classes to accurately simulate and capture the visual state.

## 2026-03-29 - Labeling Interactive Forms in Edit Modes
**Learning:** In screens with "view" vs "edit" toggles (like the Profile settings), standard structural inputs often replace static text dynamically. It's critical to ensure the label dynamically pairs with the input, e.g. using `id` and `htmlFor`, because context is easily lost by screen readers when elements hot-swap.
**Action:** Always provide explicit `id` attributes that link to labels natively, or provide clear `aria-label` attributes to the newly generated `input` or `select` elements when structural labels aren't an option.
## 2024-06-12 - Labeling Grouped Inputs
**Learning:** When multiple inputs (like a country code `<select>` and a phone number `<input>`) share a single visual `<label>`, screen readers may only associate the label with the input specified in the `htmlFor` attribute. The other input, such as the country code dropdown, will often be announced simply as "combo box" without context.
**Action:** Always provide an explicit `aria-label` (e.g., `aria-label="Country Code"`) to inputs within a visual group that do not have a direct, unique structural `<label>` linked via `id`.

## 2024-05-25 - Interactive List Elements Keyboard Support
**Learning:** When creating interactive list items (like food items in AddMealScreen) that rely on `onClick` handlers attached to structural elements like `div` instead of semantic `<button>`s, keyboard users (using Tab and Enter/Space) are unable to focus or activate them. This breaks the navigation flow and renders features completely inaccessible to keyboard and screen reader users.
**Action:** Whenever a non-semantic element is made interactive via `onClick`, always ensure it is paired with `role="button"`, `tabIndex={0}`, an `onKeyDown` handler to capture 'Enter' and ' ' (Space) keys, and explicit `focus-visible` styling to provide a clear visual indicator for keyboard navigation.
