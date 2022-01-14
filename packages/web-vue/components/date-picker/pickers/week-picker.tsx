import { defineComponent, PropType } from 'vue';
import { WeekPickerProps } from '../interface';
import Picker from '../picker.vue';

export default defineComponent({
  name: 'WeekPicker',
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
      default: 'gggg-wo',
    },
    /**
     * @zh 每周的第一天开始于周几，0 - 周日，1 - 周一。(默认0)
     * @en The first day of the week starts on the day of the week, 0-Sunday, 1-Monday. (Default 0)
     * @type number
     */
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      default: 0,
    },
  },
  setup(props: WeekPickerProps, { attrs, slots }) {
    return () => <Picker {...props} {...attrs} mode="week" v-slots={slots} />;
  },
});
