import { Ref } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { isFunction } from '../_utils/is';

export const useResizeObserver = ({
  elementRef,
  onResize,
}: {
  elementRef: Ref<HTMLElement | undefined>;
  onResize: () => void;
}) => {
  let resizeObserver: ResizeObserver | null;

  const createResizeObserver = () => {
    if (!elementRef.value) return;
    resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      isFunction(onResize) && onResize(entry);
    });
    resizeObserver.observe(elementRef.value);
  };

  const destroyResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  };

  return {
    createResizeObserver,
    destroyResizeObserver,
  };
};
