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
  for (const key in obj) {
    if (obj[key] !== other[key]) {
      return false;
    }
  }
  return true;
};
