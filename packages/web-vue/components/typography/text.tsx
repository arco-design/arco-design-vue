import { computed, defineComponent, PropType, toRefs } from 'vue';
import { BaseProps } from './interface';
import Base from './base';
import useListeners from '../_hooks/use-listeners';

export default defineComponent({
  name: 'TypographyText',
  extends: Base,
  props: {
    ellipsis: {
      type: [Boolean, Object] as PropType<BaseProps['ellipsis']>,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    const { ellipsis } = toRefs(props);
    const component = computed(() => (ellipsis?.value ? 'div' : 'span'));

    const { listeners } = useListeners();

    return () => (
      <Base
        {...props}
        {...attrs}
        {...listeners.value}
        component={component.value}
        v-slots={slots}
      />
    );
  },
});
