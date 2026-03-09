import { describe, it, expect } from 'vitest';
import { isSameDay } from './DailyMedicationsScreen';

describe('isSameDay', () => {
    it('should return true for the exact same date object', () => {
        const date = new Date(2024, 4, 15, 12, 0, 0); // May 15, 2024 12:00:00 local time
        expect(isSameDay(date, date)).toBe(true);
    });

    it('should return true for two different date objects representing the exact same time', () => {
        const date1 = new Date(2024, 4, 15, 12, 0, 0);
        const date2 = new Date(2024, 4, 15, 12, 0, 0);
        expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return true for dates on the same day but different times', () => {
        const date1 = new Date(2024, 4, 15, 8, 0, 0);
        const date2 = new Date(2024, 4, 15, 23, 59, 59);
        expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days in the same month and year', () => {
        const date1 = new Date(2024, 4, 15, 12, 0, 0);
        const date2 = new Date(2024, 4, 16, 12, 0, 0);
        expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for the same day in different months of the same year', () => {
        const date1 = new Date(2024, 4, 15, 12, 0, 0);
        const date2 = new Date(2024, 5, 15, 12, 0, 0); // June 15, 2024
        expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for the same day and month in different years', () => {
        const date1 = new Date(2024, 4, 15, 12, 0, 0);
        const date2 = new Date(2025, 4, 15, 12, 0, 0);
        expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should handle leap years correctly', () => {
        const leapYearDate1 = new Date(2024, 1, 29, 10, 0, 0); // Feb 29, 2024
        const leapYearDate2 = new Date(2024, 1, 29, 20, 0, 0);
        expect(isSameDay(leapYearDate1, leapYearDate2)).toBe(true);

        const nonLeapYearDate = new Date(2023, 1, 28, 10, 0, 0); // Feb 28, 2023
        expect(isSameDay(leapYearDate1, nonLeapYearDate)).toBe(false);
    });
});
