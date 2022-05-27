export const isEqualObject = (
  obj: Record<string, unknown> | undefined,
  other: Record<string, unknown> | undefined
) => {
  if (!obj || !other) {
    return false;
  }
  if (obj.length !== other.length) {
    return false;
  }
  for (const key of Object.keys(obj)) {
    const result = isEqual(obj[key], other[key]);
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
    const result = isEqual(arr[i], other[i]);
    if (!result) return false;
  }
  return true;
};

export const isEqual = (a: unknown, b: unknown) => {
  const type = Object.prototype.toString.call(a);
  if (type !== Object.prototype.toString.call(b)) {
    return false;
  }
  if (type === '[object Object]') {
    return isEqualObject(
      a as Record<string, unknown>,
      b as Record<string, unknown>
    );
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
