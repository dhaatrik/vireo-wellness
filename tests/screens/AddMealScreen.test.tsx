import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddMealScreen from '../../screens/AddMealScreen';
import { AppContextProvider } from '../../contexts/AppContext';
import { vi } from 'vitest';
import * as mealService from '../../services/mealService';

vi.mock('../../services/mealService', () => ({
  getMeals: vi.fn(),
  logMeal: vi.fn(),
  getMealDetails: vi.fn(),
}));

// Mock useLocation to provide state
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
      state: { targetMealType: 'Breakfast', selectedDate: new Date().toISOString() },
    }),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
  };
});

describe('AddMealScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(mealService.getMeals).mockResolvedValue([]);
  });

  it('should call logMeal when items are selected and added', async () => {
    const { useNavigate } = await import('react-router-dom');
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AppContextProvider>
          <AddMealScreen />
        </AppContextProvider>
      </MemoryRouter>
    );

    // Find a food item and select it
    // MOCK_FOOD_ITEMS[0] is 'Spaghetti Carbonara'
    const selectionButton = await screen.findByLabelText('Select Spaghetti Carbonara');
    fireEvent.click(selectionButton);

    // Click 'Add Selected'
    const addButton = screen.getByText('Add Selected');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mealService.logMeal).toHaveBeenCalled();
    });
    expect(mockNavigate).toHaveBeenCalledWith('/daily-meals', expect.anything());
  });
});
