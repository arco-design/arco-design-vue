import { computed, defineComponent, PropType, toRefs } from 'vue';
import Base from './base';

export default defineComponent({
  name: 'TypographyTitle',
  inheritAttrs: false,
  props: {
    /**
     * @zh 标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`
     * @en Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`
     */
    heading: {
      type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6>,
      default: 1,
    },
  },
  setup(props) {
    const { heading } = toRefs(props);
    const component = computed(
      () => `h${heading?.value}` as keyof HTMLElementTagNameMap
    );

    return {
      component,
    };
  },
  render() {
    const { component } = this;
    return (
      <Base {...this.$attrs} component={component} v-slots={this.$slots} />
    );
  },
});
