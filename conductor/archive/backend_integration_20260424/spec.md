# Specification: Implement backend integration for meal logging

## Overview
Currently, the Vireo Wellness application relies on a frontend SPA monolith architecture with mock data for meal logging. This track will replace the mocked meal data access with a real backend integration layer.

## Objectives
- Create a dedicated API service layer for `meals`.
- Implement API methods for fetching daily meals, logging new meals, and retrieving meal details.
- Update React components and state management to consume the API rather than mock data.
- Ensure the app maintains its offline/graceful degradation capabilities.

## Architecture
- **API Client:** Use standard `fetch` API configured with base URL.
- **Service Layer:** `src/services/mealService.ts`.
- **State Management:** Update `AppContext` to fetch data asynchronously.

## Error Handling
- The UI should display toast notifications or inline error states when a meal fails to log.
- Network requests should gracefully timeout.