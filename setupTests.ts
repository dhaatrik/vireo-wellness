import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock crypto.randomUUID for jsdom
if (!global.crypto.randomUUID) {
  global.crypto.randomUUID = () => (`12345678-1234-1234-1234-${Math.random().toString(36).substring(2, 14)}` as `${string}-${string}-${string}-${string}-${string}`);
}
