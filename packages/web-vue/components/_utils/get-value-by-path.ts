import { isArray, isObject, isUndefined } from './is';
import { Data } from './types';

export const getValueByPath = <T = Data>(
  obj: Data | undefined,
  path: string | undefined,
): T | undefined => {
  if (!obj || !path) {
    return undefined;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1');
  const keys = path.split('.');
  if (keys.length === 0) {
    return undefined;
  }

  let temp = obj;

  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) {
      return undefined;
    }
    if (i !== keys.length - 1) {
      temp = temp[keys[i]] as Data;
    } else {
      return temp[keys[i]] as T;
    }
  }

  return undefined;
};

export const setValueByPath = (
  obj: Data | undefined,
  path: string | undefined,
  value: Data[keyof Data],
  { addPath }: { addPath?: boolean } = {},
) => {
  if (!obj || !path) {
    return;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1');
  const keys = path.split('.');
  if (keys.length === 0) {
    return;
  }

  let temp = obj;

  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) {
      return;
    }
    if (i !== keys.length - 1) {
      if (addPath && isUndefined(temp[keys[i]])) {
        temp[keys[i]] = {};
      }
      temp = temp[keys[i]] as Data;
    } else {
      temp[keys[i]] = value;
    }
  }
};
