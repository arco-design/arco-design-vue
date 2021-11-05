export const toKebabCase = (string: string): string => {
  return string.replace(/\B([A-Z])/g, '-$1').toLowerCase();
};

export const toPascalCase = (string: string): string => {
  return string
    .replace(/^./, (match) => match.toUpperCase())
    .replace(/-(\w)/g, (_, p1: string) => {
      return p1?.toUpperCase() ?? '';
    });
};

export const toCamelCase = (string: string): string => {
  return string
    .replace(/^./, (match) => match.toLowerCase())
    .replace(/-(\w)/g, (_, p1: string) => {
      return p1?.toUpperCase() ?? '';
    });
};
