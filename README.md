
# Vireo - Thrive Daily

Welcome to Vireo! This application is designed to help individuals manage their daily wellness. It allows users to track their glucose levels, log meals, and connect to (simulated) health devices. The application is presented exclusively in a dark theme for optimal viewing comfort.

## Table of Contents

1.  [Overview](#overview)
2.  [Key Features](#key-features)
3.  [Tech Stack (What's Under the Hood?)](#tech-stack-whats-under-the-hood)
4.  [Directory Structure](#directory-structure)
5.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Running the Application](#running-the-application)
6.  [Understanding the Code](#understanding-the-code)
    *   [Core Concepts](#core-concepts)
    *   [Key Files and Folders](#key-files-and-folders)
7.  [Future Enhancements](#future-enhancements)

## Overview

Vireo: Thrive Daily aims to empower users in their daily wellness journey. Users can:
*   **Monitor Blood Glucose:** Manually input readings or simulate connecting to glucose monitoring devices.
*   **Track Meals:** Log food items, view nutritional information (calories, carbs, fat, protein), and see daily summaries.
*   **Device Management:** Simulate connecting to various health devices and see their status.
*   **Dark Theme Interface:** The app uses a consistent and permanent dark theme.

This application is built as a single-page web application (SPA), meaning it loads once and then dynamically updates content, providing a smooth user experience similar to a native mobile app.

## Key Features

*   **User-Friendly Interface:** Clean, modern design focused on ease of use, presented in a permanent dark theme.
*   **Splash Screen:** Welcoming introduction to the app, featuring the `VireoVLeafLogoIcon` (a stylized V-shaped leaf) as a visual element, introducing "Vireo".
*   **Dashboard:** At-a-glance summary of key health metrics (e.g., "Eaten" stats, glucose, activity).
*   **Daily Meal Logging:**
    *   Categorize meals (Breakfast, Lunch, Dinner, Snack).
    *   Add food items from a predefined list.
    *   View detailed nutritional information for each food item.
    *   Date picker to view past meal logs (currently displays today's mock data for other dates).
*   **Food Database:** Search and select food items to add to meals.
*   **Device Connectivity (Simulated):**
    *   List available and connected devices.
    *   Simulate the process of connecting a new device (e.g., via Bluetooth).
    *   Display device status and (mock) charge levels.
*   **Settings:** Basic settings for unit preferences (e.g., glucose, weight). Theme selection is not available as the app is dark-only.
*   **Responsive Design:** Adapts to different screen sizes (optimized for mobile-like view).
*   **Offline Functionality:** Uses mock data, so core browsing works offline.
*   **No AI Features:** Previous AI-powered functionalities have been removed. The `VireoVLeafLogoIcon` on the splash screen is purely a graphical asset.

## Tech Stack (What's Under the Hood?)

This application is built using modern web technologies:

*   **React (v19.x):** A JavaScript library for building user interfaces.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework. It's configured with `darkMode: 'class'` and the `<html>` tag has `class="dark"` applied, enforcing the dark theme globally.
*   **React Router (v7.x):** For handling navigation within the single-page application.
*   **Recharts:** A composable charting library built on React components, used for displaying the blood sugar graph (styled for dark theme).
*   **ESM (ECMAScript Modules):** The application uses modern JavaScript modules, loaded via an import map in `index.html` from `esm.sh`.

## Directory Structure

Here's a simplified overview of how the project files are organized:

```
.
├── .gitignore              # Specifies intentionally untracked files that Git should ignore.
├── index.html              # The main HTML file (configured for permanent dark theme).
├── metadata.json           # Application metadata (name, description, permissions).
├── README.md               # This file!
├── App.tsx                 # The main application component, sets up routing.
├── index.tsx               # The entry point that renders the App component into the HTML.
├── types.ts                # TypeScript type definitions (data structures).
├── constants.ts            # Mock data and constant values used throughout the app.
├── components/             # Reusable UI building blocks (e.g., buttons, headers).
│   ├── Icons.tsx           # SVG icons used in the app (includes VireoVLeafLogoIcon).
│   ├── Header.tsx          # Screen header component.
│   ├── BottomNav.tsx       # Bottom navigation bar.
│   ├── BloodSugarChart.tsx # Component for rendering the blood sugar graph.
│   └── DatePicker.tsx      # Component for selecting dates.
├── contexts/               # For managing global state or shared data.
│   └── AppContext.tsx      # Manages meal data, device connections, etc.
└── screens/                # Components representing different "pages" or views of the app.
    ├── SplashScreen.tsx
    ├── DashboardScreen.tsx
    ├── DailyMealsScreen.tsx
    ├── AddMealScreen.tsx
    ├── MealDetailScreen.tsx
    ├── DevicesScreen.tsx
    ├── ConnectDeviceScreen.tsx
    └── SettingsScreen.tsx
```
The `services/geminiService.ts` file has been removed as its related feature (AI integration) is no longer part of the application.

## Getting Started

### Prerequisites

This application is designed to run directly in a modern web browser that supports ES Modules. No complex build steps are required to view it if you have the files.

### Running the Application

1.  **Download the Files:** Ensure you have all the project files (`index.html`, `index.tsx`, `App.tsx`, and all files in `components/`, `contexts/`, `screens/`).
2.  **Open `index.html`:** Open the `index.html` file in a modern web browser (like Chrome, Firefox, Edge, Safari).

The application, now "Vireo", should then load and run in dark theme. Because it uses ES Modules loaded from a CDN (`esm.sh`), an internet connection is required for the initial load of these modules.

## Understanding the Code

### Core Concepts

*   **Components (`components/`, `screens/`):** Self-contained, reusable pieces of UI.
*   **State Management (`useState`, `contexts/AppContext.tsx`):** `AppContext` manages shared application data.
*   **Props (Properties):** How components receive data.
*   **Navigation (`react-router-dom`):** `App.tsx` defines routes.
*   **Event Handling (e.g., `onClick`):** How components respond to user interactions.

### Key Files and Folders

*   **`index.html`:** The entry point. It includes Tailwind CSS configuration and the import map. The `<html>` tag has `class="dark"` applied to enforce the permanent dark theme.
*   **`index.tsx`:** Renders the main `<App />` component.
*   **`App.tsx`:** Top-level React component; sets up `AppContextProvider` and routes.
*   **`types.ts`:** TypeScript interfaces and enums.
*   **`constants.ts`:** Mock data and other constants.
*   **`screens/` directory:** Major views/pages.
*   **`components/` directory:** Reusable UI elements.
    *   **`Icons.tsx`**: Contains all SVG icon components, including the `VireoVLeafLogoIcon`.
*   **`contexts/AppContext.tsx`:** Manages shared application state like meal lists and device information.

## Future Enhancements

*   **Backend Integration:** Connect to a real database for Vireo.
*   **User Authentication:** Allow users to create accounts in Vireo.
*   **Barcode Scanning:** For quick food logging in Vireo.
*   **Real Device Integration:** Connect to actual health devices with Vireo.
*   **Comprehensive Charting:** More detailed charts and reports for Vireo users.
*   **Reminders & Notifications:** For medication, glucose checks, etc., within Vireo.

Thank you for exploring Vireo!
We hope this guide helps you understand the application and its codebase.
