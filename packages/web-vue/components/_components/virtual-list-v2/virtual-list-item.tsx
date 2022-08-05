import {
  cloneVNode,
  ComponentPublicInstance,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from 'vue';
import { getFirstComponent } from '../../_utils/vue-utils';

export default defineComponent({
  name: 'VirtualListItem',
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

    const setItemSize = () => {
      // @ts-ignore
      const ele = itemRef.value?.$el ?? (itemRef.value as HTMLElement);
      if (!props.hasItemSize(key) && ele?.offsetHeight) {
        props.setItemSize(key, ele.offsetHeight);
      }
    };

    onMounted(() => setItemSize());

    return () => {
      const child = getFirstComponent(slots.default?.());
      if (child) {
        return cloneVNode(
          child,
          {
            ref: itemRef,
          },
          true
        );
      }

      return null;
    };
  },
});
