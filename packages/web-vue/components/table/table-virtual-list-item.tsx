import {
  cloneVNode,
  type ComponentPublicInstance,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import { getFirstComponent } from '../_utils/vue-utils';

export default defineComponent({
  name: 'TableVirtualListItem',
  props: {
    hasItemSize: {
      type: Function,
      required: true,
    },
    setItemSize: {
      type: Function,
      required: true,
    },
  },
  setup(props, { slots }) {
    const key = getCurrentInstance()?.vnode.key as string | number;
    const itemRef = ref<HTMLElement | ComponentPublicInstance>();

    const updateItemSize = () => {
      const element = (itemRef.value as { $el?: unknown } | undefined)?.$el ?? itemRef.value;
      const height =
        (element as HTMLElement | undefined)?.getBoundingClientRect?.().height ??
        (element as HTMLElement | undefined)?.offsetHeight;

      if (height) {
        props.setItemSize(key, height);
      }
    };

    onMounted(() => updateItemSize());
    onBeforeUnmount(() => updateItemSize());

    return () => {
      const child = getFirstComponent(slots.default?.());
      if (!child) {
        return null;
      }

      return cloneVNode(
        child,
        {
          ref: itemRef,
        },
        true,
      );
    };
  },
});
