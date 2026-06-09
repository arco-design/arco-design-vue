import type { Data } from './types';

export const omit = <T extends Data, K extends keyof T>(object: T, path: Array<K>): Omit<T, K> => {
  const result = { ...object } as Omit<T, K>;

  for (const item of path) {
    if (item in result) {
      delete (result as Record<string, any>)[item as string];
    }
  }

  return result;
};
