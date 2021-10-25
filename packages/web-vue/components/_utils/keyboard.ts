import { isString } from './is';

export const CODE = {
  ENTER: 'Enter',
  ESC: 'Escape',
  BACKSPACE: 'Backspace',
  TAB: 'Tab',
  SPACE: 'Space',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

export interface CodeKey {
  /** Keyboard code or key */
  code: string;
  /** Ctrl / ⌃ */
  ctrl?: boolean;
  /** Shift key */
  shift?: boolean;
  /** Alt / ⌥ */
  alt?: boolean;
  /** meta ⌘ / ⊞ */
  meta?: boolean;
}

const stringifyCodeKey = (k: CodeKey) => {
  return JSON.stringify({
    code: k.code,
    ctrl: Boolean(k.ctrl),
    shift: Boolean(k.shift),
    alt: Boolean(k.alt),
    meta: Boolean(k.meta),
  });
};

export const getKeyDownHandler = (
  codeKeyMap: Map<CodeKey | string, (e: Event) => void>
) => {
  const map: Record<string, (e: Event) => void> = {};

  codeKeyMap.forEach((callback, codeKey) => {
    const _codeKey = isString(codeKey) ? { code: codeKey } : codeKey;
    map[stringifyCodeKey(_codeKey)] = callback;
  });

  return (event: KeyboardEvent): void => {
    const key = stringifyCodeKey({
      code: event.code || event.key,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      alt: event.altKey,
      meta: event.metaKey,
    });
    const callback = map[key];

    if (callback) {
      event.stopPropagation();
      callback(event);
    }
  };
};
