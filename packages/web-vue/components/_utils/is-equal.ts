export const isEqual = (
  obj: Record<string, unknown> | undefined,
  other: Record<string, unknown> | undefined
) => {
  if (!obj || !other) {
    return false;
  }
  if (obj.length !== other.length) {
    return false;
  }
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const result = isEqualVariable(obj[key], other[key]);
    if (!result) return false;
  }
  return true;
};

export const isEqualArray = (
  arr: unknown[] | undefined,
  other: unknown[] | undefined
) => {
  if (!arr || !other) {
    return false;
  }
  const { length } = arr;
  if (length !== other.length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    const result = isEqualVariable(arr[i], other[i]);
    if (!result) return false;
  }
  return true;
};

const isEqualVariable = (a: unknown, b: unknown) => {
  const type = Object.prototype.toString.call(a);
  if (type !== Object.prototype.toString.call(b)) {
    return false;
  }
  if (type === '[object Object]') {
    return isEqual(a as Record<string, unknown>, b as Record<string, unknown>);
  }
  if (type === '[object Array]') {
    return isEqualArray(a as unknown[], b as unknown[]);
  }
  if (type === '[object Function]') {
    if (a === b) {
      return true;
    }
    // @ts-ignore
    return a.toString() === b.toString();
  }
  return a === b;
};
