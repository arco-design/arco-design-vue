export const invertKeyValues = (obj: Record<string, string>) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {} as Record<string, string>);
};
