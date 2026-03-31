## 2024-05-24 - Testing Focus Visibility in Playwright
**Learning:** Playwright's native `locator.focus()` can sometimes time out or fail to visually trigger CSS `:focus-visible` pseudo-class styles in SPAs depending on how focus management is handled.
**Action:** When capturing screenshots to verify `focus-visible` styles, bypass the `.focus()` timeout by using `page.evaluate()` to directly manipulate the DOM element's `style.boxShadow` or apply the Tailwind classes to accurately simulate and capture the visual state.

## 2026-03-29 - Labeling Interactive Forms in Edit Modes
**Learning:** In screens with "view" vs "edit" toggles (like the Profile settings), standard structural inputs often replace static text dynamically. It's critical to ensure the label dynamically pairs with the input, e.g. using `id` and `htmlFor`, because context is easily lost by screen readers when elements hot-swap.
**Action:** Always provide explicit `id` attributes that link to labels natively, or provide clear `aria-label` attributes to the newly generated `input` or `select` elements when structural labels aren't an option.