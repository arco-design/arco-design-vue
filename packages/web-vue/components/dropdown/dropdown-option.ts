import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Doption',
  props: {
    /**
     * @zh 选项值
     * @en Value
     */
    value: {
      type: [String, Number],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
