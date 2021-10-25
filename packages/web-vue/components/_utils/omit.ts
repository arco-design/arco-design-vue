import type { Data } from './types';

export const omit = <T extends Data, K extends keyof any>(
  object: T,
  path: Array<K>
): Omit<T, K> => {
  const result = { ...object };

  for (const item of path) {
    // @ts-ignore
    if (item in result) {
      // @ts-ignore
      delete result[item];
    }
  }

  return result;
};
