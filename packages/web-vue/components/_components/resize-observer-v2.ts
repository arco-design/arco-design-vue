import { defineComponent, onBeforeUnmount, watch } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { useFirstElement } from '../_hooks/use-first-element';

export default defineComponent({
  name: 'ResizeObserver',
  props: {
    watchOnUpdated: Boolean,
  },
  emits: [
    /**
     * resize 事件
     * @property {ResizeObserverEntry} entry 触发 resize 的 dom 元素
     */
    'resize',
  ],
  setup(props, { emit, slots }) {
    const { children, firstElement } = useFirstElement();
    let resizeObserver: ResizeObserver | null;

    const createResizeObserver = (target: HTMLElement) => {
      if (!target) return;
      resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        emit('resize', entry);
      });
      resizeObserver.observe(target);
    };

    const destroyResizeObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };

    watch(firstElement, (element) => {
      if (resizeObserver) destroyResizeObserver();
      if (element) {
        createResizeObserver(element);
      }
    });

    onBeforeUnmount(() => {
      if (resizeObserver) destroyResizeObserver();
    });

    return () => {
      children.value = slots.default?.();
      return children.value;
    };
  },
});
