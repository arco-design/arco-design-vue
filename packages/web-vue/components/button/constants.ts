export const BUTTON_TYPES = [
  'primary',
  'secondary',
  'outline',
  'dashed',
  'text',
] as const;
export type ButtonTypes = (typeof BUTTON_TYPES)[number];
export const BUTTON_HTML_TYPES = [
  'button',
  'submit',
  'reset',
  undefined,
] as const;
export type ButtonHtmlTypes = (typeof BUTTON_HTML_TYPES)[number];
