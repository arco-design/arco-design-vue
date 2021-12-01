const sizeStyles = [
  'border-width',
  'box-sizing',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-indent',
  'text-rendering',
  'text-transform',
  'white-space',
  'overflow-wrap',
  'width',
];

export const getSizeStyles = (styleDeclaration: CSSStyleDeclaration) => {
  const styles: Record<string, any> = {};
  sizeStyles.forEach((item) => {
    styles[item] = styleDeclaration.getPropertyValue(item);
  });
  return styles;
};
