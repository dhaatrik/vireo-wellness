## 2025-05-15 - Nested Reduce Optimization in DailyMealsScreen

**Learning:** Nested `reduce` calls on hierarchical data (groups -> entries) can lead to O(N*M) callback overhead and redundant passes. Combining these into a single `for...of` loop inside `useMemo` significantly reduces CPU time and prevents re-calculation on unrelated state changes.

**Action:** Prefer single-pass loops within `useMemo` for calculating multiple derived statistics from nested data structures in React components.
