import { createVNode, defineComponent } from 'vue';

export default defineComponent({
  name: 'Thead',
  setup(_, { slots }) {
    return () => {
      return createVNode(slots.thead?.()[0] ?? 'thead', null, {
        default: slots.default,
      });
    };
  },
});
