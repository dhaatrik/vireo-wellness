import { describe, it, expect } from 'vitest';
import { isValidEmail } from './validators';

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@domain.com',
      '123@numbers.com',
      'test@sub.domain.org'
    ];

    validEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it('should return false for email addresses missing the @ symbol', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  it('should return false for email addresses missing the domain', () => {
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('test@.com')).toBe(false);
  });

  it('should return false for email addresses missing the top-level domain', () => {
    expect(isValidEmail('test@example')).toBe(false);
  });

  it('should return false for email addresses missing the local part', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('should return false for email addresses containing spaces', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
    expect(isValidEmail('test@ example.com')).toBe(false);
    expect(isValidEmail('test@example. com')).toBe(false);
    expect(isValidEmail(' test@example.com')).toBe(false);
    expect(isValidEmail('test@example.com ')).toBe(false);
  });

  it('should return false for email addresses containing multiple @ symbols', () => {
    expect(isValidEmail('test@@example.com')).toBe(false);
    expect(isValidEmail('test@example@domain.com')).toBe(false);
  });
});
