import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DashboardScreen from './DashboardScreen';
import { AppContextProvider } from '../contexts/AppContext';

// Mock recharts to avoid rendering issues in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  LineChart: ({ children }: any) => <div>{children}</div>,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
}));

// Mock ResizeObserver which is needed by recharts/motion but not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('DashboardScreen', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Mock console.error to suppress expected errors and verify them
    console.error = vi.fn();
  });

  afterEach(() => {
    // Restore original console.error
    console.error = originalConsoleError;
    // Clear localStorage
    localStorage.clear();
    // Clear all mocks
    vi.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <MemoryRouter>
        <AppContextProvider>
          <DashboardScreen />
        </AppContextProvider>
      </MemoryRouter>
    );
  };

  it('should handle invalid JSON in localStorage gracefully', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('dashboardWidgets', 'invalid json string');

    // Render the component
    renderDashboard();

    // Verify console.error was called with the expected message and an error object
    expect(console.error).toHaveBeenCalledWith(
      'Failed to parse dashboard widgets from local storage:',
      expect.any(Error)
    );
  });
});
