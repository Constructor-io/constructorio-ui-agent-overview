import '@testing-library/jest-dom/vitest';
import failOnConsole from 'vitest-fail-on-console';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

failOnConsole();

// Embla Carousel requires browser APIs not available in jsdom
class ObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window.IntersectionObserver === 'undefined') {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: ObserverMock,
  });
}

if (typeof window.ResizeObserver === 'undefined') {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: ObserverMock,
  });
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
