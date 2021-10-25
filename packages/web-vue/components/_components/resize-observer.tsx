import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { findDomNode } from '../_utils/dom';

export default defineComponent({
  name: 'ResizeObserver',
  emits: [
    /**
     * resize 事件
     * @property {ResizeObserverEntry} entry 触发 resize 的 dom 元素
     */
    'resize',
  ],
  setup(props, { emit, slots }) {
    let resizeObserver: ResizeObserver | null;

    const findElement = (instance: ComponentInternalInstance): HTMLElement => {
      return findDomNode(instance.vnode);
    };

    const findOldElement = (
      instance: ComponentInternalInstance
    ): HTMLElement => {
      return findDomNode(instance.subTree);
    };

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

    onMounted(() => {
      const instance = getCurrentInstance();
      if (instance) {
        const element = findElement(instance);
        createResizeObserver(element);
      }
    });

    onUpdated(() => {
      const instance = getCurrentInstance();
      if (instance) {
        const element = findElement(instance);
        const oldElement = findOldElement(instance);
        if (element !== oldElement) {
          if (resizeObserver) destroyResizeObserver();
          createResizeObserver(element);
        }
      } else {
        destroyResizeObserver();
      }
    });

    onUnmounted(() => {
      destroyResizeObserver();
    });

    return () => {
      const children = slots.default && slots.default();
      return children && children.length ? children[0] : null;
    };
  },
});
