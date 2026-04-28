import { defineComponent, computed, PropType, ref } from 'vue';
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
     * @zh 默认展示的面板日期
     * @en Default page date
     */
    defaultPageShowDate: {
      type: Date,
    },
    /**
     * @zh 展示的面板日期（受控）
     * @en Page date
     */
    pageShowDate: {
      type: Date,
    },
    /**
     * @zh 模式
     * @en Mode
     */
    mode: {
      type: String as PropType<'day' | 'week' | 'month' | 'year'>,
    },
    /**
     * @zh 默认模式
     * @en Default Mode
     */
    defaultMode: {
      type: String as PropType<'day' | 'week' | 'month' | 'year'>,
      default: 'month',
    },
    /**
     * @zh 显示的模式
     * @en Displayed mode
     */
    modes: {
      type: Array as PropType<('day' | 'week' | 'month' | 'year')[]>,
      default: () => ['month', 'year'],
    },
    /**
     * @zh 卡片模式下配置操作按钮
     * @en Operation buttons configuration in card mode
     */
    panelOperations: {
      type: Array as PropType<
        Array<'left' | 'double-left' | 'right' | 'double-right'>
      >,
    },
    /**
     * @zh 头部类型
     * @en Header type
     */
    headerType: {
      type: String as PropType<'button' | 'select'>,
      default: 'button',
    },
    /**
     * @zh 是否允许选中和切换日期
     * @en Whether to allow the selection and switching of the date
     */
    allowSelect: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否放在容器中进行展示
     * @en Whether to be displayed in a container
     */
    panel: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 卡片模式的宽度
     * @en The width of the calendar in card mode
     */
    panelWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 265,
    },
    /**
     * @zh 是否显示跳转到今天的按钮
     * @en Whether to display the button to jump to today
     */
    panelTodayBtn: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 每周的第一天开始于周几，0 - 周日，1 - 周一
     * @en The first day of the week starts on the day of the week, 0-Sunday, 1-Monday
     */
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      default: 0,
    },
    /**
     * @zh 周选择
     * @en Select Week date
     */
    isWeek: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 不可选取的时间
     * @en Function that specifies the dates that cannot be selected
     */
    disabledDate: {
      type: Function as PropType<(current: Dayjs) => boolean>,
    },
    /**
     * @zh 定制日期显示，会完全覆盖日期单元格
     * @en Customize the date display, which will completely cover the date cell
     */
    dateRender: {
      type: Function as PropType<(currentDate: Dayjs) => any>,
    },
    /**
     * @zh 定制日期单元格，内容会被添加到单元格内
     * @en Customize the date cell, the content will be added to the cell
     */
    dateInnerContent: {
      type: Function as PropType<(currentDate: Dayjs) => any>,
    },
    /**
     * @zh 定制月份显示，会完全覆盖月份单元格
     * @en Customize the month display, which will completely cover the month cell
     */
    monthRender: {
      type: Function as PropType<(currentDate: Dayjs) => any>,
    },
    /**
     * @zh 自定义头部渲染
     * @en Custom header renderer
     */
    headerRender: {
      type: Function as PropType<
        (props: {
          value?: Dayjs;
          pageShowDate?: Dayjs;
          mode?: string;
          onChange: (date: Dayjs) => void;
          onChangePageDate: (date: Dayjs) => void;
          onChangeMode: (mode: 'day' | 'week' | 'month' | 'year') => void;
        }) => any
      >,
    },
  },
  emits: {
    'update:modelValue': (date: Date) => true,
    /**
     * @zh 选择的日期改变时触发
     * @en Emitted when the date changes
     * @property {Date} date
     */
    'change': (date: Date) => true,
    /**
     * @zh 日期面板改变时触发
     * @en Emitted when the page date changes
     * @property {Date} date
     */
    'panelChange': (date: Date) => true,
  },
  /**
   * @zh 自定义单元格内容
   * @en Custom cell content
   * @slot default
   * @binding {number} year
   * @binding {number} month
   * @binding {number} date
   * @version 2.53.0
   */
  /**
   * @zh 自定义头部内容
   * @en Custom header content
   * @slot header
   * @binding {number} year
   * @binding {number} month
   * @version 2.53.0
   */
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('calendar');
    const { t } = useI18n();

    const _mode = ref(props.defaultMode);
    const computedMode = computed(() => props.mode || _mode.value);
    const isWeekMode = computed(
      () => computedMode.value === 'week' || props.isWeek
    );

    const format = computed(() => getFormat(computedMode.value, props.panel));
    const _value = ref(
      getDayjsValue(props.defaultValue || Date.now(), format.value)
    );
    const computedValue = computed(() =>
      props.modelValue
        ? getDayjsValue(props.modelValue, format.value)
        : _value.value
    );

    const _pageShowDate = ref(
      getDayjsValue(props.defaultPageShowDate, format.value) ||
        computedValue.value ||
        getNow()
    );
    const computedPageShowDate = computed(() =>
      props.pageShowDate
        ? getDayjsValue(props.pageShowDate, format.value)
        : _pageShowDate.value
    );

    const pageData = computed(() =>
      getAllDaysByTime(computedPageShowDate.value, {
        dayStartOfWeek: props.dayStartOfWeek,
        isWeek: isWeekMode.value,
      })
    );

    function onChangePageDate(time: Dayjs) {
      _pageShowDate.value = time;
      emit('panelChange', time.toDate());
    }

    function move(time: Dayjs) {
      _value.value = time;
      emit('change', time.toDate());
      emit('update:modelValue', time.toDate());
      onChangePageDate(time);
    }

    function selectHandler(time: Dayjs, disabled = false) {
      if (!disabled && props.allowSelect) {
        move(time);
      }
    }

    const headerValueFormat = computed(() =>
      computedMode.value === 'month'
        ? t('calendar.formatMonth')
        : t('calendar.formatYear')
    );

    function changePageShowDate(type: 'prev' | 'next', unit: UnitType) {
      if (type === 'prev') {
        _pageShowDate.value = methods.subtract(
          computedPageShowDate.value,
          1,
          unit
        );
      }
      if (type === 'next') {
        _pageShowDate.value = methods.add(computedPageShowDate.value, 1, unit);
      }
      emit('panelChange', _pageShowDate.value.toDate());
    }

    function onChangeYear(year: number) {
      const newValue = methods.set(computedPageShowDate.value, 'year', year);
      _pageShowDate.value = newValue;
      emit('panelChange', newValue.toDate());
    }

    function onChangeMonth(month: number) {
      const newValue = methods.set(
        computedPageShowDate.value,
        'month',
        month - 1
      );
      _pageShowDate.value = newValue;
      emit('panelChange', newValue.toDate());
    }

    function changeMode(mode: 'day' | 'week' | 'month' | 'year') {
      _mode.value = mode;
    }

    const cls = computed(() => [
      prefixCls,
      computedMode.value === 'year'
        ? `${prefixCls}-mode-year`
        : `${prefixCls}-mode-month`,
      {
        [`${prefixCls}-panel`]: !!props.panel,
      },
    ]);

    const baseStyle = computed(() =>
      props.panel ? { width: props.panelWidth } : {}
    );

    return () => (
      <div
        class={cls.value}
        style={baseStyle.value}
        {...pickDataAttributes(props)}
      >
        {props.headerRender ? (
          props.headerRender({
            value: computedValue.value,
            pageShowDate: computedPageShowDate.value,
            mode: computedMode.value,
            onChange: move,
            onChangePageDate,
            onChangeMode: changeMode,
          })
        ) : (
          <Header
            move={move}
            headerValueFormat={headerValueFormat.value}
            modes={props.modes}
            mode={computedMode.value}
            pageShowData={computedPageShowDate.value}
            dayStartOfWeek={props.dayStartOfWeek}
            isWeek={isWeekMode.value}
            panel={props.panel}
            headerType={props.headerType}
            panelOperations={props.panelOperations}
            onModeChange={changeMode}
            onYearChange={onChangeYear}
            onMonthChange={onChangeMonth}
            changePageShowDate={changePageShowDate}
            v-slots={{ default: slots.header }}
          />
        )}

        {(computedMode.value === 'month' ||
          computedMode.value === 'day' ||
          computedMode.value === 'week') && (
          <div class={`${prefixCls}-body`}>
            <Month
              key={computedPageShowDate.value.month()}
              pageData={pageData.value}
              value={computedValue.value}
              mode={computedMode.value}
              selectHandler={selectHandler}
              isWeek={isWeekMode.value}
              dayStartOfWeek={props.dayStartOfWeek}
              pageShowDate={computedPageShowDate.value}
              panel={props.panel}
              disabledDate={props.disabledDate}
              dateRender={props.dateRender}
              dateInnerContent={props.dateInnerContent}
              v-slots={{ default: slots.default }}
            />
          </div>
        )}

        {computedMode.value === 'year' && (
          <div class={`${prefixCls}-body`}>
            <Year
              key={computedPageShowDate.value.year()}
              pageData={pageData.value}
              pageShowData={computedPageShowDate.value}
              mode={computedMode.value}
              isWeek={isWeekMode.value}
              value={computedValue.value}
              dayStartOfWeek={props.dayStartOfWeek}
              selectHandler={selectHandler}
              panel={props.panel}
              disabledDate={props.disabledDate}
              monthRender={props.monthRender}
            />
          </div>
        )}

        {props.panel && props.panelTodayBtn && (
          <div
            class={`${prefixCls}-footer-btn-wrapper`}
            onClick={() => move(getNow())}
          >
            {t('today')}
          </div>
        )}
      </div>
    );
  },
});
