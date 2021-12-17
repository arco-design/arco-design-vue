// @ts-ignore
import BTween from 'b-tween';
import { isFunction } from '../_utils/is';

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
