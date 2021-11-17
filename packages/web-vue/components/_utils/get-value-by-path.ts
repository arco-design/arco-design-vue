import { Data } from './types';
import { isNull, isUndefined } from './is';

export const getValueByPath = <T = any>(
  obj: Data | undefined,
  path: string | undefined
): T | undefined => {
  if (!obj || !path) {
    return undefined;
  }

  const keyArray = path.split('.');
  if (!obj || keyArray.length === 0) {
    return undefined;
  }

  let temp = obj;
  let result: T | undefined;

  for (let i = 0; i < keyArray.length; i++) {
    if (isUndefined(temp[keyArray[i]]) || isNull(temp[keyArray[i]])) {
      return undefined;
    }
    if (i === keyArray.length - 1) {
      result = temp[keyArray[i]];
    } else {
      temp = temp[keyArray[i]];
    }
  }

  return result;
};
