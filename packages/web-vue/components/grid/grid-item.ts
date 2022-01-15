import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GridItem',
  props: {
    span: Number,
    offset: Number,
    suffix: Boolean,
  },
});
