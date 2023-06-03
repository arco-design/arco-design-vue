import { defineComponent, computed, toRefs, PropType, ref } from 'vue';
import { Dayjs, UnitType } from 'dayjs';
import Month, { getAllDaysByTime } from './month';
import Year from './year';
import Header from './header';
import {
  getDayjsValue,
  getNow,
  methods,
  pickDataAttributes,
} from '../_utils/date';
import { getPrefixCls } from '../_utils/global-config';
import { useI18n } from '../locale';

function getFormat(mode: 'day' | 'week' | 'month' | 'year', panel?: boolean) {
  return mode === 'month' || (mode === 'year' && !panel)
    ? 'YYYY-MM-DD'
    : 'YYYY-MM';
}

// const defaultProps: CalendarProps = {
//   dayStartOfWeek: 0,
//   panelWidth: 265,
//   defaultMode: 'month',
//   headerType: 'button',
//   modes: ['month', 'year'],
// };

export default defineComponent({
  name: 'Calendar',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: Date,
      default: undefined,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: Date,
    },
    /**
     * @zh 模式
     * @en Mode
     */
    mode: {
      type: String as PropType<'month' | 'year'>,
    },
    /**
     * @zh 默认模式
     * @en Default Mode
     */
    defaultMode: {
      type: String as PropType<'month' | 'year'>,
      default: 'month',
    },
    /**
     * @zh 显示的模式
     * @en Displayed mode
     */
    modes: {
      type: Array as PropType<('month' | 'year')[]>,
      default: () => ['month', 'year'],
    },
    allowSelect: {
      type: Boolean,
      default: true,
    },
    panel: {
      type: Boolean,
      default: false,
    },
    panelWidth: {
      type: Number,
    },
    panelTodayBtn: {
      type: Boolean,
      default: false,
    },
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      default: 0,
    },
    isWeek: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (date: Date) => true,
    /**
     * @zh 选择的日期改变时触发
     * @en Emitted when the button is clicked
     * @property {Date} date
     */
    'change': (date: Date) => true,
    /**
     * @zh 日期面板改变时触发
     * @en Emitted when the button is clicked
     * @property {Date} date
     */
    'panelChange': (date: Date) => true,
  },
  setup(props, { emit }) {
    const { dayStartOfWeek, isWeek } = toRefs(props);
    const prefixCls = getPrefixCls('calendar');
    const _mode = ref(props.defaultMode);
    const { t } = useI18n();
    const computedMode = computed(() => {
      if (props.mode) {
        return props.mode;
      }

      return _mode.value;
    });
    const format = getFormat(computedMode.value, props.panel);
    const _value = ref(getDayjsValue(props.defaultValue || Date.now(), format));
    const computedValue = computed(() => {
      if (props.modelValue) {
        return getDayjsValue(props.modelValue, format);
      }
      return _value.value;
    });

    const pageShowDate = ref(computedValue.value || getNow());

    // page data list
    const pageData = computed(() => {
      return getAllDaysByTime(pageShowDate.value, {
        dayStartOfWeek: dayStartOfWeek.value,
        isWeek: isWeek.value,
      });
    });

    function onChangePageDate(time: Dayjs) {
      pageShowDate.value = time;
      emit('panelChange', time.toDate());
    }

    // value / pageShowDate / pageData
    function move(time: Dayjs) {
      _value.value = time;
      emit('change', time.toDate());
      emit('update:modelValue', time.toDate());
      onChangePageDate(time);
    }

    function selectHandler(time: Dayjs, disabled = false) {
      if (!disabled) {
        move(time);
      }
    }

    let headerValueFormat = '';
    if (computedMode.value === 'month') {
      headerValueFormat = t('calendar.formatMonth');
    } else if (computedMode.value === 'year') {
      headerValueFormat = t('calendar.formatYear');
    }

    function changePageShowDate(type: 'prev' | 'next', unit: UnitType) {
      if (type === 'prev') {
        pageShowDate.value = methods.subtract(pageShowDate.value, 1, unit);
      }
      if (type === 'next') {
        pageShowDate.value = methods.add(pageShowDate.value, 1, unit);
      }
      emit('panelChange', pageShowDate.value.toDate());
    }

    function onChangeYear(year: number) {
      const newValue = methods.set(pageShowDate.value, 'year', year);
      pageShowDate.value = newValue;
      emit('panelChange', newValue.toDate());
    }

    function onChangeMonth(month: number) {
      const newValue = methods.set(pageShowDate.value, 'month', month - 1);
      pageShowDate.value = newValue;
      emit('panelChange', newValue.toDate());
    }

    function changeMode(mode: 'month' | 'year') {
      _mode.value = mode;
    }

    const cls = computed(() => [
      prefixCls,
      computedMode.value === 'month'
        ? `${prefixCls}-mode-month`
        : `${prefixCls}-mode-year`,
      {
        [`${prefixCls}-panel`]:
          props.panel &&
          (computedMode.value === 'month' || computedMode.value === 'year'),
      },
    ]);

    const baseStyle = props.panel ? { width: props.panelWidth } : {};

    // const baseHeaderProps = {
    //   prefixCls,
    //   changePageShowDate,
    //   headerValueFormat,
    //   mergedPageShowDate,
    //   innerMode,
    //   panelOperations,
    // };

    return () => (
      <div class={cls.value} style={baseStyle} {...pickDataAttributes(props)}>
        <Header
          move={move}
          headerValueFormat={headerValueFormat}
          modes={['month', 'year']}
          mode={computedMode.value}
          pageShowData={pageShowDate.value}
          dayStartOfWeek={props.dayStartOfWeek}
          isWeek={props.isWeek}
          onModeChange={changeMode}
          onYearChange={onChangeYear}
          onMonthChange={onChangeMonth}
          changePageShowDate={changePageShowDate}
        />
        {computedMode.value === 'month' && (
          <div class={`${prefixCls}-body`}>
            <Month
              key={pageShowDate.value.month()}
              pageData={pageData.value}
              value={computedValue.value}
              mode={computedMode.value}
              selectHandler={selectHandler}
              isWeek={props.isWeek}
              dayStartOfWeek={props.dayStartOfWeek}
              pageShowDate={pageShowDate.value}
            />
          </div>
        )}
        {computedMode.value === 'year' && (
          <div class={`${prefixCls}-body`}>
            <Year
              key={pageShowDate.value.year()}
              pageData={pageData.value}
              pageShowData={pageShowDate.value}
              mode={computedMode.value}
              isWeek={props.isWeek}
              value={computedValue.value}
              dayStartOfWeek={props.dayStartOfWeek}
              selectHandler={selectHandler}
            />
          </div>
        )}
        {props.panel && props.panelTodayBtn && (
          <div class={`${prefixCls}-footer-btn-wrapper`}>{t('today')}</div>
        )}
      </div>
    );
  },
});
