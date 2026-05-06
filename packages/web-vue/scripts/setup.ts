import 'vitest-canvas-mock';
import { expect, vi } from 'vitest';

Object.defineProperty(document, 'execCommand', {
  configurable: true,
  value: vi.fn(() => true),
});
Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

expect.addSnapshotSerializer({
  test: (val) => typeof val === 'string',
  print: (val, serialize) => {
    if (typeof val !== 'string') return serialize(val);
    return val
      .replace(/\sdata-v-[\w-]+(="[^"]*")?/g, '')
      .replace(/\sdata-test="[^"]*"/g, '')
      .replace(/\sclass=""/g, '');
  },
});
