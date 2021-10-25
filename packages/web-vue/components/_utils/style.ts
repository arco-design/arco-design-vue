const transformNames = [
  'transform',
  'WebkitTransform',
  'msTransform',
  'MozTransform',
  'OTransform',
];

export function fixedWidth(width: number): Record<string, unknown> {
  return {
    maxWidth: width,
    minWidth: width,
    width,
  };
}

export function setTransformStyle(value: string): Record<string, unknown> {
  const style: Record<string, unknown> = {};
  transformNames.forEach((name) => {
    style[name] = value;
  });
  return style;
}

export function getStyle(element: HTMLElement | null, prop: string | null) {
  if (!element || !prop) return null;
  let styleName = prop as keyof CSSStyleDeclaration;
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    if (document.defaultView) {
      const computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : '';
    }
  } catch (e) {
    return element.style[styleName];
  }
  return null;
}
