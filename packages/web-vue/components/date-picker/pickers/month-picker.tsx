import { defineComponent, PropType } from 'vue';
import Picker from '../picker.vue';

export default defineComponent({
  name: 'MonthPicker',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: [Object, String, Number] as PropType<Date | string | number>,
    },
    /**
     * @zh 默认值
     * @en Default value
     */
    defaultValue: {
      type: [Object, String, Number] as PropType<Date | string | number>,
    },
    /**
     * @zh 展示日期的格式，参考[字符串解析格式](#字符串解析格式)
     * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
     */
    format: {
      type: String,
      default: 'YYYY-MM',
    },
    /**
     * @zh 不可选取的月份(可以根据传递给回调方法的参数禁用月份)
     * @en Unselectable month(The month can be disabled based on the parameters passed to the callback method)
     */
    disabledDate: {
      type: Function as PropType<(current?: Date) => boolean>,
    },
  },
  setup(props, { attrs, slots }) {
    return () => <Picker {...props} {...attrs} mode="month" v-slots={slots} />;
  },
});
