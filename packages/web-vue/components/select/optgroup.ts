import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Optgroup',
  props: {
    /**
     * @zh 选项组的标题
     * @en Title of option group
     */
    label: {
      type: String,
    },
  },
  /**
   * @zh 选项组的标题
   * @en Title of option group
   * @slot label
   * @version 2.10.0
   */
  setup() {},
});
