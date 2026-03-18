import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidWidgetConfigArray } from './validators';

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

describe('isValidWidgetConfigArray', () => {
  it('should return true for valid WidgetConfig array', () => {
    const validData = [
      { id: 'widget1', title: 'Widget 1', visible: true },
      { id: 'widget2', title: 'Widget 2', visible: false }
    ];
    expect(isValidWidgetConfigArray(validData)).toBe(true);
  });

  it('should return true for an empty array', () => {
    expect(isValidWidgetConfigArray([])).toBe(true);
  });

  it('should return false for non-array inputs', () => {
    expect(isValidWidgetConfigArray(null)).toBe(false);
    expect(isValidWidgetConfigArray(undefined)).toBe(false);
    expect(isValidWidgetConfigArray({})).toBe(false);
    expect(isValidWidgetConfigArray('not an array')).toBe(false);
    expect(isValidWidgetConfigArray(123)).toBe(false);
  });

  it('should return false if any element is not an object', () => {
    expect(isValidWidgetConfigArray([{ id: 'w1', title: 'T1', visible: true }, 'string'])).toBe(false);
    expect(isValidWidgetConfigArray([null])).toBe(false);
  });

  it('should return false if required properties are missing', () => {
    expect(isValidWidgetConfigArray([{ id: 'w1', title: 'T1' }])).toBe(false);
    expect(isValidWidgetConfigArray([{ id: 'w1', visible: true }])).toBe(false);
    expect(isValidWidgetConfigArray([{ title: 'T1', visible: true }])).toBe(false);
  });

  it('should return false if properties have incorrect types', () => {
    expect(isValidWidgetConfigArray([{ id: 1, title: 'T1', visible: true }])).toBe(false);
    expect(isValidWidgetConfigArray([{ id: 'w1', title: 2, visible: true }])).toBe(false);
    expect(isValidWidgetConfigArray([{ id: 'w1', title: 'T1', visible: 'true' }])).toBe(false);
  });

  it('should handle potentially malicious objects', () => {
    const malicious = [
      {
        id: 'w1',
        title: 'T1',
        visible: true,
        toString: () => { throw new Error('Malicious code execution!'); }
      }
    ];
    // In this case, our validator only checks properties, so it should be fine.
    // However, it's good to ensure it doesn't crash.
    expect(isValidWidgetConfigArray(malicious)).toBe(true);
  });
});
