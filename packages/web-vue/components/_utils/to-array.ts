import { isArray } from './is';

export function toArray<T>(val: T | T[]): T[] {
  return isArray(val) ? val : [val];
}
