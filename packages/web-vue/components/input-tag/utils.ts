import { isObject } from '../_utils/is';
import { TagData } from './interface';

export const getValueData = (value: Array<string | number | TagData>) => {
  const result: TagData[] = [];
  for (const item of value) {
    if (isObject(item)) {
      result.push(item);
    } else {
      result.push({
        value: item,
        label: String(item),
        closable: true,
      });
    }
  }
  return result;
};
