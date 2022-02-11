export const SIZES = ['mini', 'small', 'medium', 'large'] as const;
export type Size = typeof SIZES[number];
export const BORDER_SHAPES = ['square', 'round', 'circle'] as const;
export type BorderShape = typeof BORDER_SHAPES[number];
export const STATUSES = ['normal', 'success', 'warning', 'danger'] as const;
export type Status = typeof STATUSES[number];
export const MESSAGE_TYPES = ['info', 'success', 'warning', 'error'] as const;
export type MessageType = typeof MESSAGE_TYPES[number];
export const TRIGGER_POSITIONS = [
  'top',
  'tl',
  'tr',
  'bottom',
  'bl',
  'br',
  'left',
  'lt',
  'lb',
  'right',
  'rt',
  'rb',
] as const;
export type TriggerPosition = typeof TRIGGER_POSITIONS[number];
export const TRIGGER_EVENTS = [
  'hover',
  'click',
  'focus',
  'contextMenu',
] as const;
export type TriggerEvent = typeof TRIGGER_EVENTS[number];
export const DIRECTIONS = ['horizontal', 'vertical'] as const;
export type Direction = typeof DIRECTIONS[number];
export const INPUT_EVENTS = [
  // focus events
  'onFocus',
  'onFocusin',
  'onFocusout',
  'onBlur',
  // form events
  'onChange',
  'onBeforeinput',
  'onInput',
  'onReset',
  'onSubmit',
  'onInvalid',
  // keyboard events
  'onKeydown',
  'onKeypress',
  'onKeyup',
  // clipboard events
  'onCopy',
  'onCut',
  'onPaste',
  // composition events
  'onCompositionstart',
  'onCompositionupdate',
  'onCompositionend',
  // selection events
  'onSelect',
  // attrs
  'autocomplete',
  'autofocus',
  'maxlength',
  'minlength',
  'name',
  'pattern',
  'readonly',
  'required',
];
export const TEXT_ALIGNS = ['left', 'center', 'right'] as const;
export type TextAlign = typeof TEXT_ALIGNS[number];
