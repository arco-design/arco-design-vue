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
    onUpdate: (keys: Record<string, number>) => {
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

export const BOUNDARY_POSITIONS = ['start', 'end', 'center', 'nearest'] as const;
export type BoundaryPosition = (typeof BOUNDARY_POSITIONS)[number];
