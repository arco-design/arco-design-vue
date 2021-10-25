import { computed, defineComponent, PropType, toRefs } from 'vue';
import { BaseProps } from './interface';
import Base from './base';

export default defineComponent({
  name: 'TypographyText',
  inheritAttrs: false,
  props: {
    ellipsis: {
      type: [Boolean, Object] as PropType<BaseProps['ellipsis']>,
      default: false,
    },
  },
  setup(props) {
    const { ellipsis } = toRefs(props);
    const component = computed(() => (ellipsis?.value ? 'div' : 'span'));

    return {
      component,
    };
  },
  render() {
    const { ellipsis, component } = this;

    return (
      <Base
        {...this.$attrs}
        ellipsis={ellipsis}
        component={component}
        v-slots={this.$slots}
      />
    );
  },
});
