<template>
  <slot />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  onUpdated,
  ref,
} from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { getFirstElement } from '../_utils/vue-utils';

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
  setup(props, { emit }) {
    const instance = getCurrentInstance();
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

    const element = ref<HTMLElement>();

    onMounted(() => {
      if (instance?.subTree) {
        const _element = getFirstElement(instance.subTree);
        if (_element) {
          element.value = _element;
          createResizeObserver(_element);
        }
      }
    });

    onUpdated(() => {
      if (props.watchOnUpdated && instance?.subTree) {
        const _element = getFirstElement(instance.subTree);
        if (_element !== element.value) {
          if (resizeObserver) destroyResizeObserver();
          if (_element) {
            element.value = _element;
            createResizeObserver(_element);
          }
        }
      }
    });

    onBeforeUnmount(() => {
      destroyResizeObserver();
    });
  },
});
</script>
