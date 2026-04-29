import { expect } from 'vitest';

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
