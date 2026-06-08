import { afterEach, beforeEach, vi } from 'vitest';

import demoTest from '../../../scripts/demo-test';

const FIXED_DATE = new Date('2026-01-15T09:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(FIXED_DATE);
});

afterEach(() => {
  vi.useRealTimers();
});

demoTest('calendar', {
  attachTo: () => document.body,
  waitTicks: 2,
});
