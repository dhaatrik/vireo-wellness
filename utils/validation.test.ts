import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from './validation';

describe('formatPhoneNumber', () => {
  it('should allow a standard 10-digit number', () => {
    expect(formatPhoneNumber('1234567890')).toBe('1234567890');
  });

  it('should strip non-digit characters', () => {
    expect(formatPhoneNumber('123-456-7890')).toBe('1234567890');
    expect(formatPhoneNumber('(123) 456-7890')).toBe('1234567890');
    expect(formatPhoneNumber('123 456 7890')).toBe('1234567890');
    expect(formatPhoneNumber('abc123def456gh7890')).toBe('1234567890');
  });

  it('should truncate numbers exceeding 10 digits', () => {
    expect(formatPhoneNumber('1234567890123')).toBe('1234567890');
  });

  it('should handle an empty string', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('should handle strings with only non-digit characters', () => {
    expect(formatPhoneNumber('abc!@# ')).toBe('');
  });

  it('should handle partially entered numbers', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('123-4')).toBe('1234');
  });
});
