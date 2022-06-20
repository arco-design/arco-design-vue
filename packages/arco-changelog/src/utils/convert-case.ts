export const toKebabCase = (string: string): string => {
  return string.replace(/[A-Z]+/g, (match, offset) => {
    return `${offset > 0 ? '-' : ''}${match.toLocaleLowerCase()}`;
  });
};

export const toPascalCase = (string: string): string => {
  return string
    .replace(/^./, (match) => match.toLocaleUpperCase())
    .replace(/-(.)/g, (match, p1: string) => {
      return p1.toLocaleUpperCase();
    });
};
