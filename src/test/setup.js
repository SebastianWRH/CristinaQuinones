import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.clear();
});

globalThis.ResizeObserver =
  globalThis.ResizeObserver ??
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

window.matchMedia =
  window.matchMedia ??
  (() => ({
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    matches: false,
  }));

window.scrollTo = vi.fn();

Element.prototype.scrollIntoView = vi.fn();
