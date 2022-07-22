import {
  cloneVNode,
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
    const itemRef = ref<HTMLElement>();

    const setItemSize = () => {
      if (!props.hasItemSize(key) && itemRef.value?.offsetHeight) {
        props.setItemSize(key, itemRef.value.offsetHeight);
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
