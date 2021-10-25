type StringConvertFuncType = (string: string) => string;

const cacheStringFunction = (
  fn: StringConvertFuncType
): StringConvertFuncType => {
  const cache = Object.create(null);
  return (string: string) => {
    const hit = cache[string];
    return hit || (cache[string] = fn(string));
  };
};

export const toKebabCase = cacheStringFunction((string: string): string => {
  return string.replace(/\B([A-Z])/g, '-$1').toLowerCase();
});

export const toPascalCase = cacheStringFunction((string: string): string => {
  return string
    .replace(/^./, (match) => match.toLocaleUpperCase())
    .replace(/-(.)/g, (match, p1: string) => {
      return p1.toLocaleUpperCase();
    });
});

export const toCamelCase = cacheStringFunction((string: string): string => {
  return string
    .replace(/^./, (match) => match.toLocaleLowerCase())
    .replace(/-(\w)/g, (_match, p1) => {
      return p1 ? p1.toUpperCase() : '';
    });
});
