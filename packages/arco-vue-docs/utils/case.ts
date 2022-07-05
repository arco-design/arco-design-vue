export function underscored(str: string) {
  return str
    .replace(/([a-z\d])([A-Z]+)/g, '$1-$2')
    .replace(/[-\s]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(str: string) {
  return str
    .replace(/^./, (match) => match.toLocaleUpperCase())
    .replace(/-(.)/g, (_, p1) => {
      return p1.toLocaleUpperCase();
    });
}
