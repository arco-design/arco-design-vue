<template>
  <Trigger
    v-if="!hideTrigger"
    trigger="click"
    :click-to-close="false"
    :popup-offset="4"
    v-bind="triggerProps"
    :position="position"
    :disabled="disabled"
    :prevent-focus="true"
    :popup-visible="panelVisible"
    :unmount-on-close="unmountOnClose"
    :popup-container="popupContainer"
    @popupVisibleChange="onPanelVisibleChange"
  >
    <slot>
      <DateInput
        v-bind="$attrs"
        ref="refInput"
        :size="size"
        :focused="panelVisible"
        :visible="panelVisible"
        :error="error"
        :disabled="disabled"
        :editable="inputEditable"
        :allow-clear="allowClear"
        :placeholder="computedPlaceholder"
        :input-value="inputValue"
        :value="needConfirm ? panelValue : selectedValue"
        :format="inputFormat"
        @clear="onInputClear"
        @change="onInputChange"
        @pressEnter="onInputPressEnter"
      >
        <template #suffix-icon>
          <slot name="suffix-icon">
            <IconCalendar />
          </slot>
        </template>
      </DateInput>
    </slot>
    <template #content>
      <PickerPanel v-bind="panelProps" @click="onPanelClick" />
    </template>
  </Trigger>
  <PickerPanel v-else v-bind="{ ...$attrs, ...panelProps }">
    <slot name="extra"></slot>
    <slot name="cell"></slot>
    <slot name="icon-prev-double"></slot>
    <slot name="icon-prev"></slot>
    <slot name="icon-next"></slot>
    <slot name="icon-next-double"></slot>
  </PickerPanel>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs';
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { dayjs, getNow, isValueChange, getDateValue } from '../_utils/date';
import { getPrefixCls } from '../_utils/global-config';
import useState from '../_hooks/use-state';
import {
  DisabledTimeProps,
  PickerProps,
  ShortcutType,
  FormatFunc,
} from './interface';
import usePickerState from './hooks/use-picker-state';
import DateInput from '../_components/picker/input.vue';
import Trigger from '../trigger';
import { getFormattedValue, isValidInputValue } from '../time-picker/utils';
import PickerPanel from './picker-panel.vue';
import pick from '../_utils/pick';
import useFormat from './hooks/use-format';
import { isFunction } from '../_utils/is';
import { TimePickerProps } from '../time-picker/interface';
import IconCalendar from '../icon/icon-calendar';
import useIsDisabledDate from './hooks/use-is-disabled-date';
import useMergeState from '../_hooks/use-merge-state';
import useProvideDatePickerTransform from './hooks/use-provide-datepicker-transform';
import useHeaderValue from './hooks/use-header-value';
import { omit } from '../_utils/omit';
import useTimePickerValue from './hooks/use-time-picker-value';
import { mergeValueWithTime } from './utils';
import { EmitType } from '../_utils/types';

/**
 * @displayName Common
 * @noBrackets
 */
export default defineComponent({
  name: 'Picker',
  components: {
    DateInput,
    Trigger,
    PickerPanel,
    IconCalendar,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 国际化配置，用于覆盖locale中的 `datePicker` 字段
     * @en Internationalization configuration, used to cover the locale file in the `datePicker` field
     */
    locale: {
      type: Object as PropType<Record<string, any>>,
    },
    /**
     * @zh 没有触发元素，只显示选择面板
     * @en There is no trigger element, only the selection panel is displayed
     * */
    hideTrigger: {
      type: Boolean,
    },
    /**
     * @zh 是否允许清除
     * @en Whether to allow clear
     * */
    allowClear: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否为只读
     * @en Whether it is read-only
     * */
    readonly: {
      type: Boolean,
    },
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     */
    error: {
      type: Boolean,
    },
    /**
     * @zh 日期选择器的尺寸
     * @en The size of the date picker
     * */
    size: {
      type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
      default: 'medium',
    },
    /**
     * @zh 预设时间范围快捷选择
     * @en Quick selection of preset time range
     */
    shortcuts: {
      type: Array as PropType<ShortcutType[]>,
      default: () => [],
    },
    /**
     * @zh 预设范围在面板上的位置，默认放在下方，侧边一般用于大量预设时间的场景
     * @en The position of the preset range on the panel, which is placed at the bottom by default, and the side is generally used for scenes with a large number of preset times
     * */
    shortcutsPosition: {
      type: String as PropType<'left' | 'bottom' | 'right'>,
      default: 'bottom',
    },
    /**
     * @zh 弹出的框的位置
     * @en The position of the pop-up box
     */
    position: {
      type: String as PropType<'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'>,
      default: 'bl',
    },
    /**
     * @zh 控制弹出框的打开或者关闭状态
     * @en Control the open or closed state of the pop-up box
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认弹出框是打开或者关闭
     * @en The default pop-up box is open or closed
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 可以传入 `Trigger` 组件的参数
     * @en You can pass in the parameters of the `Trigger` component
     */
    triggerProps: {
      type: Object as PropType<Record<string, unknown>>,
    },
    /**
     * @zh 是否在隐藏的时候销毁DOM结构
     * @en Whether to destroy the DOM structure when hiding
     */
    unmountOnClose: {
      type: Boolean,
    },
    /**
     * @zh 提示文案
     * @en Prompt copy
     */
    placeholder: {
      type: String,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
    },
    /**
     * @zh 不可选取的日期
     * @en Unselectable date
     */
    disabledDate: {
      type: Function as PropType<(current?: Date) => boolean>,
    },
    /**
     * @zh 不可选取的时间
     * @en Unselectable time
     */
    disabledTime: {
      type: Function as PropType<(current: Date) => DisabledTimeProps>,
    },
    /**
     * @zh 面板显示的日期
     * @en Date displayed on the panel
     * @vModel
     */
    pickerValue: {
      type: [Date, String, Number],
    },
    /**
     * @zh 面板默认显示的日期
     * @en The date displayed on the panel by default
     */
    defaultPickerValue: {
      type: [Date, String, Number],
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for pop-up box
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
    mode: {
      type: String as PropType<'date' | 'year' | 'quarter' | 'month' | 'week'>,
      default: 'date',
    },
    format: {
      type: [String, Function] as PropType<string | FormatFunc>,
    },
    showTime: {
      type: Boolean,
    },
    timePickerProps: {
      type: Object as PropType<Partial<TimePickerProps>>,
    },
    showNowBtn: {
      type: Boolean,
      defaut: true,
    },
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      default: 0,
    },
    modelValue: {
      type: [Date, String, Number],
    },
    defaultValue: {
      type: [Date, String, Number],
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(dateString: string, date: Date) => void>
      >,
    },
    onSelect: {
      type: [Function, Array] as PropType<
        EmitType<(dateString: string, date: Date) => void>
      >,
    },
    onPopupVisibleChange: {
      type: [Function, Array] as PropType<
        EmitType<(popupVisible: boolean) => void>
      >,
    },
    onOk: {
      type: [Function, Array] as PropType<
        EmitType<(dateString: string, date: Date) => void>
      >,
    },
    onClear: { type: [Function, Array] as PropType<EmitType<() => void>> },
    onSelectShortcut: {
      type: [Function, Array] as PropType<
        EmitType<(shortcut: ShortcutType) => void>
      >,
    },
    onPickerValueChange: {
      type: [Function, Array] as PropType<
        EmitType<(dateString: string, date: Date) => void>
      >,
    },
  },
  emits: [
    /**
     * @zh 组件值发生改变
     * @en The component value changes
     * @param {string} dateString
     * @param {Date} date
     */
    'change',
    'update:modelValue',
    /**
     * @zh 选中日期发生改变但组件值未改变
     * @en The selected date has changed but the component value has not changed
     * @param {string} dateString
     * @param {Date} date
     */
    'select',
    /**
     * @zh 打开或关闭弹出框
     * @en Open or close the pop-up box
     * @param {boolean} visible
     */
    'popup-visible-change',
    'update:popupVisible',
    /**
     * @zh 点击确认按钮
     * @en Click the confirm button
     * @param {string} dateString
     * @param {Date} date
     */
    'ok',
    /**
     * @zh 点击清除按钮
     * @en Click the clear button
     */
    'clear',
    /**
     * @zh 点击快捷选项
     * @en Click on the shortcut option
     * @param {ShortcutType} shortcut
     */
    'select-shortcut',
    /**
     * @zh 面板日期改变
     * @en Panel date change
     * @param {string} dateString
     * @param {Date} date
     */
    'picker-value-change',
    'update:pickerValue',
  ],
  /**
   * @zh 输入框后缀图标
   * @en Input box suffix icon
   * @slot suffix-icon
   */
  /**
   * @zh 额外的页脚
   * @en Extra footer
   * @slot extra
   */
  /**
   * @zh 自定义日期单元格的内容
   * @en Customize the contents of the date cell
   * @slot cell
   * @binding {Dayjs} date
   */
  /**
   * @zh 单箭头往前翻页图标
   * @en Single arrow page forward icon
   * @slot icon-prev
   */
  /**
   * @zh 单箭头往后翻页图标
   * @en Single arrow page backward icon
   * @slot icon-next
   */
  /**
   * @zh 双箭头往前翻页图标
   * @en Double arrow page forward icon
   * @slot icon-prev-double
   */
  /**
   * @zh 双箭头往后翻页图标
   * @en Double arrow page backward icon
   * @slot icon-next-double
   */
  setup(props: PickerProps, { emit, slots }) {
    const {
      mode,
      modelValue,
      defaultValue,
      format,
      placeholder,
      popupVisible,
      defaultPopupVisible,
      disabled,
      showTime,
      timePickerProps,
      disabledDate,
      disabledTime,
      readonly,
      locale,
      pickerValue,
      defaultPickerValue,
    } = toRefs(props);

    const datePickerT = useProvideDatePickerTransform(
      reactive({
        locale,
      })
    );

    const prefixCls = getPrefixCls('picker');

    const refInput = ref();

    const computedPlaceholder = computed(
      () =>
        placeholder?.value ||
        {
          date: datePickerT('datePicker.placeholder.date'),
          month: datePickerT('datePicker.placeholder.month'),
          year: datePickerT('datePicker.placeholder.year'),
          week: datePickerT('datePicker.placeholder.week'),
          quarter: datePickerT('datePicker.placeholder.quarter'),
        }[mode.value] ||
        datePickerT('datePicker.placeholder.date')
    );

    const computedFormat = useFormat(reactive({ format, mode, showTime }));
    const inputFormat = computed(() =>
      format && isFunction(format.value)
        ? (value: Dayjs) => (format.value as FormatFunc)?.(getDateValue(value))
        : computedFormat.value
    );

    const isDisabledDate = useIsDisabledDate(
      reactive({
        mode,
        disabledDate,
        disabledTime,
        showTime,
      })
    );

    const needConfirm = computed(() => showTime.value);
    const confirmBtnDisabled = computed(
      () =>
        needConfirm.value &&
        (!panelValue.value || isDisabledDate(panelValue.value))
    );

    // 确认选中的值
    const { value: selectedValue, setValue: setSelectedValue } = usePickerState(
      reactive({ modelValue, defaultValue, format: computedFormat })
    );

    // 操作过程中的选中值
    const [processValue, setProcessValue] = useState<Dayjs | undefined>();

    // panel 展示用的值
    const panelValue = computed(
      () => processValue.value || selectedValue.value
    );

    // input 操作使用的值
    const [inputValue, setInputValue] = useState<string | undefined>();

    // 选择面板是否可见
    const [panelVisible, setLocalPanelVisible] = useMergeState(
      defaultPopupVisible.value,
      reactive({ value: popupVisible })
    );
    const setPanelVisible = (newVisible: boolean) => {
      if (panelVisible.value !== newVisible) {
        setLocalPanelVisible(newVisible);
        emit('popup-visible-change', newVisible);
        emit('update:popupVisible', newVisible);
      }
    };

    // 生成当前面板内容
    const [headerValue, , headerOperations, resetHeaderValue] = useHeaderValue(
      reactive({
        mode,
        value: pickerValue,
        defaultValue: defaultPickerValue,
        selectedValue: panelValue,
        format: computedFormat,
        onChange: (newVal: Dayjs) => {
          const dateValue = getDateValue(newVal);
          emit('picker-value-change', dateValue);
          emit('update:pickerValue', dateValue);
        },
      })
    );

    const [timePickerValue, , resetTimePickerValue] = useTimePickerValue(
      reactive({
        timePickerProps,
        selectedValue: panelValue,
      })
    );

    const inputEditable = computed(
      () => !readonly.value && !isFunction(inputFormat.value)
    );

    watch(panelVisible, (newVisible) => {
      setProcessValue(undefined);

      // open
      if (newVisible) {
        resetHeaderValue();
        resetTimePickerValue();
      }

      // close
      if (!newVisible) {
        setInputValue(undefined);
      }
    });

    function emitChange(value: Dayjs | undefined, emitOk?: boolean) {
      const formattedValue = getFormattedValue(value, computedFormat.value);
      const dateValue = getDateValue(value);
      if (isValueChange(value, selectedValue.value)) {
        emit('update:modelValue', formattedValue);
        emit('change', formattedValue, dateValue);
      }

      if (emitOk) {
        emit('ok', formattedValue, dateValue);
      }
    }

    function confirm(
      value: Dayjs | undefined,
      showPanel: boolean,
      emitOk?: boolean
    ) {
      if (isDisabledDate(value)) {
        return;
      }

      emitChange(value, emitOk);
      setSelectedValue(value);
      setProcessValue(undefined);
      setInputValue(undefined);
      setPanelVisible(showPanel);
    }

    function select(value: Dayjs | undefined, emitSelect?: boolean) {
      setProcessValue(value);
      setInputValue(undefined);

      if (emitSelect) {
        const formattedValue = getFormattedValue(value, computedFormat.value);
        const dateValue = getDateValue(value);
        emit('select', dateValue, formattedValue);
      }
    }

    function focusInput(index?: number) {
      refInput.value && refInput.value.focus && refInput.value.focus(index);
    }

    function onPanelVisibleChange(visible: boolean) {
      if (disabled.value) return;
      setPanelVisible(visible);
    }

    function onInputClear() {
      confirm(undefined, true);
      emit('clear');
    }

    function onInputChange(e: any) {
      setPanelVisible(true);

      const targetValue = e.target.value;
      setInputValue(targetValue);

      if (!isValidInputValue(targetValue, computedFormat.value)) return;

      const newValue = dayjs(targetValue, computedFormat.value);

      if (isDisabledDate(newValue)) return;

      if (needConfirm.value) {
        select(newValue);
      } else {
        confirm(newValue, true);
      }
    }

    function onInputPressEnter() {
      confirm(panelValue.value, false);
    }

    function onPanelSelect(value: Dayjs) {
      if (needConfirm.value) {
        select(value, true);
      } else {
        confirm(value, false);
      }
    }

    function onPanelCellClick(value: Dayjs) {
      const newValue = mergeValueWithTime(
        getNow(),
        value,
        timePickerValue.value
      );
      onPanelSelect(newValue);
    }

    function onTimePickerSelect(time: Dayjs) {
      const newValue = mergeValueWithTime(getNow(), panelValue.value, time);
      onPanelSelect(newValue);
    }

    function onPanelConfirm() {
      confirm(panelValue.value, false, true);
    }

    function onPanelClick() {
      focusInput();
    }

    function onPanelShortcutMouseEnter(value: Dayjs) {
      select(value);
    }

    function onPanelShortcutMouseLeave() {
      select(selectedValue.value);
    }

    function onPanelShortcutClick(value: Dayjs, shortcut: ShortcutType) {
      emit('select-shortcut', shortcut);
      confirm(value, false);
    }

    const computedTimePickerProps = computed(() => ({
      format: computedFormat.value,
      ...omit(timePickerProps?.value || {}, ['defaultValue']),
      visible: panelVisible.value,
    }));

    const panelProps = computed(() => ({
      ...pick(props as Record<keyof PickerProps, any>, [
        'mode',
        'shortcuts',
        'shortcutsPosition',
        'dayStartOfWeek',
        'disabledDate',
        'disabledTime',
        'showTime',
        'hideTrigger',
        'showNowBtn',
      ]),
      prefixCls,
      format: computedFormat.value,
      value: panelValue.value,
      visible: panelVisible.value,
      showConfirmBtn: needConfirm.value,
      confirmBtnDisabled: confirmBtnDisabled.value,
      timePickerProps: computedTimePickerProps.value,
      extra: slots.extra,
      dateRender: slots.cell,
      headerValue,
      headerIcons: {
        prev: slots['icon-prev'],
        prevDouble: slots['icon-prev-double'],
        next: slots['icon-next'],
        nextDouble: slots['icon-next-double'],
      },
      headerOperations: headerOperations.value,
      timePickerValue: timePickerValue.value,
      onCellClick: onPanelCellClick,
      onTimePickerSelect,
      onConfirm: onPanelConfirm,
      onShortcutClick: onPanelShortcutClick,
      onShortcutMouseEnter: onPanelShortcutMouseEnter,
      onShortcutMouseLeave: onPanelShortcutMouseLeave,
      onTodayBtnClick: onPanelSelect,
    }));

    return {
      prefixCls,
      refInput,
      panelProps,
      panelValue,
      inputValue,
      selectedValue,
      inputFormat,
      computedFormat,
      computedPlaceholder,
      panelVisible,
      inputEditable,
      needConfirm,
      onPanelVisibleChange,
      onInputClear,
      onInputChange,
      onInputPressEnter,
      onPanelClick,
    };
  },
});
</script>
