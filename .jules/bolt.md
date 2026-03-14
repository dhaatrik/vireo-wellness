
## 2025-02-17 - Decouple Static Filtering from Dynamic State Mapping
**Learning:** Combining a static data filter (like search `includes()`) with a dynamic state-dependent `.map` (like appending an `isSelected` boolean) in the wrong order or within the same `useMemo` causes redundant recalculations. If you map the dynamic state over the *entire* dataset first, the expensive string-filtering operation must run again every time the dynamic state changes (e.g., when a user toggles an item).
**Action:** Always filter the static dataset *first* based on search terms. Then, in a separate `useMemo` dependent on the filtered list and the dynamic state, map over the smaller subset to apply the dynamic state changes.
