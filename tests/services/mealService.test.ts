import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMeals, logMeal, getMealDetails } from '../../services/mealService';

describe('mealService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('getMeals', () => {
    it('should fetch meals for a specific date', async () => {
      const mockMeals = [{ id: '1', foodItem: { name: 'Apple' }, quantity: 1 }];
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockMeals,
      } as Response);

      const date = '2026-04-24';
      const result = await getMeals(date);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/meals?date=${date}`));
      expect(result).toEqual(mockMeals);
    });

    it('should throw an error if fetch fails', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      } as Response);

      await expect(getMeals('2026-04-24')).rejects.toThrow('Failed to fetch meals: Not Found');
    });
  });

  describe('logMeal', () => {
    it('should post a new meal entry', async () => {
      const newMeal = { foodItemId: '1', quantity: 2 };
      const mockResponse = { id: '123', ...newMeal };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await logMeal(newMeal);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/meals'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newMeal),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getMealDetails', () => {
    it('should fetch details for a specific meal id', async () => {
      const mockMeal = { id: '123', foodItem: { name: 'Apple' } };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockMeal,
      } as Response);

      const result = await getMealDetails('123');

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/meals/123'));
      expect(result).toEqual(mockMeal);
    });
  });
});
