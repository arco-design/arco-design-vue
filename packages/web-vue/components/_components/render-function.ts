import { defineComponent, PropType, VNodeTypes } from 'vue';

export type RenderFunc = (props: Record<string, unknown>) => VNodeTypes;

export default defineComponent({
  name: 'RenderFunction',
  props: {
    renderFunc: {
      type: Function as PropType<RenderFunc>,
      required: true,
    },
  },
  render() {
    return this.renderFunc(this.$attrs);
  },
});
