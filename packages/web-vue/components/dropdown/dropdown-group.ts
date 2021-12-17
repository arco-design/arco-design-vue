import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dgroup',
  props: {
    /**
     * @zh 分组标题
     * @en Group title
     */
    title: String,
  },
  /**
   * @zh 分组标题
   * @en Group title
   * @slot title
   * @version 2.10.0
   */
  setup() {},
});
