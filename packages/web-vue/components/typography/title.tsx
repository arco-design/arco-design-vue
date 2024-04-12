import { computed, defineComponent, PropType, toRefs } from 'vue';
import Base from './base';
import useListeners from '../_hooks/use-listeners';

export default defineComponent({
  name: 'TypographyTitle',
  extends: Base,
  props: {
    /**
     * @zh 标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`
     * @en Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`
     */
    heading: {
      type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
      default: 1,
    },
    component: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      required: false,
    },
  },
  setup(props, { attrs, slots }) {
    const { heading } = toRefs(props);
    const component = computed(
      () => `h${heading?.value}` as keyof HTMLElementTagNameMap
    );

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
