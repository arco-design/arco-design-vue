import { config } from '@vue/test-utils';
import type { AppConfig } from 'vue';

import { afterEach, vi } from 'vitest';

import SDVue from './components';
import SDVueIcon from './components/icon';

const mockCanvasContext = {
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  drawImage: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn((text) => ({ width: text.length * 8 })),
  getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
  putImageData: vi.fn(),
  globalAlpha: 1,
  font: '',
  fillStyle: '',
  textAlign: 'left',
  textBaseline: 'alphabetic',
};

config.global.plugins = [SDVue, SDVueIcon];

const globalProperties =
  config.global.config?.globalProperties ?? ({} as AppConfig['globalProperties']);
Object.assign(globalProperties, {
  $sd: {
    classPrefix: 'sd',
  },
});

config.global.config = {
  ...config.global.config,
  globalProperties,
};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
}));

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: vi.fn(() => mockCanvasContext),
});

Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
  configurable: true,
  value: vi.fn(() => 'data:image/png;base64,mock'),
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
  vi.clearAllTimers();
});
