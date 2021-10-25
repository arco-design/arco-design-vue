// @ts-ignore
import BTween from 'b-tween';
import { isFunction, isString } from '../_utils/is';

export function findNode(
  dom: HTMLElement | Document,
  selector: string
): Element | null {
  // handle id start with number
  // eg. id #123
  const s =
    isString(selector) && selector[0] === '#'
      ? `[id='${selector.replace('#', '')}']`
      : selector;
  try {
    return dom.querySelector(s);
  } catch (e) {
    return null;
  }
}

export function slide(el: HTMLElement, top: number, cb: () => void): void {
  const tween = new BTween({
    from: {
      scrollTop: el.scrollTop,
    },
    to: {
      scrollTop: top,
    },
    easing: 'quartOut',
    duration: 300,
    onUpdate: (keys: any) => {
      el.scrollTop = keys.scrollTop;
    },
    onFinish: () => {
      if (isFunction(cb)) {
        cb();
      }
    },
  });
  tween.start();
}
