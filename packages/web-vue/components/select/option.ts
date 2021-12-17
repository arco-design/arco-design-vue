import { defineComponent, PropType } from 'vue';
import { TagProps } from '../tag';

export default defineComponent({
  name: 'Option',
  props: {
    /**
     * @zh 选项值（如不填，会从内容中获取）
     * @en Option value (if not filled, it will be obtained from the content)
     */
    value: [String, Number],
    /**
     * @zh 选项标签（如不填，会从内容中获取）
     * @en Option label (if not filled, it will be obtained from the content)
     */
    label: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: Boolean,
    /**
     * @zh 展示的标签属性
     * @en Displayed tag attributes
     * @version 2.8.0
     */
    tagProps: {
      type: Object as PropType<TagProps>,
    },
    /**
     * @zh 额外数据
     * @en Extra data
     * @version 2.10.0
     */
    extra: {
      type: Object,
    },
  },
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   * @version 2.10.0
   */
  /**
   * @zh 后缀
   * @en Suffix
   * @slot suffix
   * @version 2.10.0
   */
  setup() {},
});
