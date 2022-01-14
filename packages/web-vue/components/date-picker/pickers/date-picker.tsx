import { defineComponent, PropType } from 'vue';
import { TimePickerProps } from '../../time-picker/interface';
import { DisabledTimeProps, DatePickerProps } from '../interface';
import Picker from '../picker.vue';

export default defineComponent({
  name: 'DatePicker',
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
      type: [String, Function] as PropType<
        string | ((current: Date) => string)
      >,
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
    /**
     * @zh 是否增加时间选择
     * @en Whether to increase time selection
     * */
    showTime: {
      type: Boolean,
    },
    /**
     * @zh 时间显示的参数，参考 [TimePickerProps](/vue/component/time-picker)
     * @en Time display parameters, refer to [TimePickerProps](/vue/component/time-picker)
     * */
    timepickerProps: {
      type: Object as PropType<Partial<TimePickerProps>>,
    },
    /**
     * @zh 不可选取的时间
     * @en Unselectable time
     * */
    disabledTime: {
      type: Function as PropType<(current: Date) => DisabledTimeProps>,
    },
    /**
     * @zh 是否显示 `showTime` 时，选择当前时间的按钮
     * @en Whether to display `showTime`, select the button of the current time
     * */
    showNowBtn: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: DatePickerProps, { attrs, slots }) {
    return () => <Picker {...props} {...attrs} mode="date" v-slots={slots} />;
  },
});
