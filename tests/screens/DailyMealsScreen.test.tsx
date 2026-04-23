import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DailyMealsScreen from '../../screens/DailyMealsScreen';
import { AppContextProvider } from '../../contexts/AppContext';
import { vi } from 'vitest';
import * as mealService from '../../services/mealService';
import { MealType } from '../../types';

vi.mock('../../services/mealService', () => ({
  getMeals: vi.fn(),
  logMeal: vi.fn(),
  getMealDetails: vi.fn(),
}));

describe('DailyMealsScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render daily meals fetched from service', async () => {
    const mockMeals = [
      {
        mealType: MealType.BREAKFAST,
        entries: [
          {
            id: '1',
            foodItem: { name: 'Oatmeal', calories: 200 },
            quantity: 1,
            loggedAt: new Date().toISOString(),
          },
        ],
        totalCalories: 200,
      },
    ];
    vi.mocked(mealService.getMeals).mockResolvedValue(mockMeals);

    render(
      <MemoryRouter>
        <AppContextProvider>
          <DailyMealsScreen />
        </AppContextProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Oatmeal')).toBeDefined();
    });
    expect(screen.getAllByText('200 kcal').length).toBeGreaterThan(0);
  });
});
