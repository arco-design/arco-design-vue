import { Data } from './types';
import { isObject } from './is';

export const getValueByPath = <T = any>(
  obj: Data | undefined,
  path: string | undefined
): T | undefined => {
  if (!obj || !path) {
    return undefined;
  }

  const keys = path.split('.');
  if (keys.length === 0) {
    return undefined;
  }

  let temp = obj;

  for (let i = 0; i < keys.length; i++) {
    if (!isObject(temp) || !keys[i]) {
      return undefined;
    }
    if (i !== keys.length - 1) {
      temp = temp[keys[i]];
    } else {
      return temp[keys[i]] as T;
    }
  }

  return undefined;
};

export const setValueByPath = (
  obj: Data | undefined,
  path: string | undefined,
  value: any
) => {
  if (!obj || !path) {
    return;
  }

  const keys = path.split('.');
  if (keys.length === 0) {
    return;
  }

  let temp = obj;

  for (let i = 0; i < keys.length; i++) {
    if (!isObject(temp) || !keys[i]) {
      return;
    }
    if (i !== keys.length - 1) {
      temp = temp[keys[i]];
    } else {
      temp[keys[i]] = value;
    }
  }
};
