import { isObject } from '../_utils/is';
import { TagData } from './interface';

export const getValueData = (value: Array<string | number | TagData>) =>
  value.map((item) => {
    if (isObject(item)) return item;
    return {
      value: item,
      label: String(item),
      closable: true,
    };
  });
