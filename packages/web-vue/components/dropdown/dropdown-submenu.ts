import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dsubmenu',
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
     * @version 2.10.0
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click'
     * @version 2.10.0
     */
    trigger: {
      type: String,
      default: 'click',
    },
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'rt','lt'
     * @version 2.10.0
     */
    position: {
      type: String,
      default: 'rt',
    },
  },
  /**
   * @zh 子菜单内容
   * @en Submenu content
   * @slot content
   */
  /**
   * @zh 页脚
   * @en Footer
   * @slot footer
   * @version 2.10.0
   */
  setup() {},
});
