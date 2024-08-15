<template>
  <Trigger
    trigger="click"
    animation-name="slide-dynamic-origin"
    auto-fit-transform-origin
    :click-to-close="false"
    :position="position"
    :disabled="mergedDisabled || readonly"
    :popup-offset="4"
    :popup-visible="panelVisible"
    :prevent-focus="true"
    :unmount-on-close="unmountOnClose"
    :popup-container="popupContainer"
    v-bind="{ ...triggerProps }"
    @popupVisibleChange="onPanelVisibleChange"
  >
    <component
      :is="isRange ? 'DateRangeInput' : 'DateInput'"
      v-bind="{
        ...$attrs,
        ...inputProps,
      }"
      ref="refInput"
      :input-value="inputValue"
      :value="panelValue"
      :size="size"
      :focused="panelVisible"
      :format="computedFormat"
      :visible="panelVisible"
      :disabled="mergedDisabled"
      :error="error"
      :readonly="readonly"
      :editable="!readonly"
      :allow-clear="allowClear && !readonly"
      :placeholder="computedPlaceholder"
      @clear="onInputClear"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"> </slot>
      </template>
      <template #suffix-icon>
        <slot name="suffix-icon">
          <IconClockCircle />
        </slot>
      </template>
    </component>
    <template #content>
      <div :class="`${prefixCls}-container`" @click="onPanelClick">
        <component
          :is="isRange ? 'RangePanel' : 'Panel'"
          v-bind="panelProps"
          :value="panelValue"
          :visible="panelVisible"
          :format="computedFormat"
          :use12-hours="computedUse12Hours"
          :step="step"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          :hide-disabled-options="hideDisabledOptions"
          :hide-footer="disableConfirm"
          @select="onPanelSelect"
          @confirm="onPanelConfirm"
        >
          <template v-if="$slots.extra" #extra-footer>
            <slot name="extra" />
          </template>
        </component>
      </div>
    </template>
  </Trigger>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { Dayjs } from 'dayjs';
import {
  dayjs,
  getSortedDayjsArray,
  isValueChange,
  getDateValue,
} from '../_utils/date';
import { isArray, isUndefined } from '../_utils/is';
import { getPrefixCls } from '../_utils/global-config';
import Trigger, { TriggerProps } from '../trigger';
import DateInput from '../_components/picker/input.vue';
import DateRangeInput from '../_components/picker/input-range.vue';
import IconClockCircle from '../icon/icon-clock-circle';
import useState from '../_hooks/use-state';
import useTimeFormat from './hooks/use-time-format';
import useTimeState from './hooks/use-time-state';
import {
  getFormattedValue,
  isValidInputValue,
  isValidRangeValue,
} from './utils';
import Panel from './panel.vue';
import RangePanel from './range-panel';
import useIsDisabledTime from './hooks/use-is-disabled-time';
import useMergeState from '../_hooks/use-merge-state';
import { useI18n } from '../locale';
import { Size } from '../_utils/constant';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'TimePicker',
  components: {
    Trigger,
    DateInput,
    DateRangeInput,
    Panel,
    RangePanel,
    IconClockCircle,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 选择器类型
     * @en Selector type
     */
    type: {
      type: String as PropType<'time' | 'time-range'>,
      default: 'time',
    },
    /**
     * @zh 绑定值
     * @en Value
     * */
    modelValue: {
      type: [String, Number, Date, Array] as PropType<
        string | number | Date | Array<string | number | Date>
      >,
    },
    /**
     * @zh 默认值
     * @en Default value
     * */
    defaultValue: {
      type: [String, Number, Date, Array] as PropType<
        string | number | Date | Array<string | number | Date>
      >,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
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
     * @zh 是否为只读模式
     * @en Whether it is read-only mode
     * */
    readonly: {
      type: Boolean,
    },
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     * */
    error: {
      type: Boolean,
    },
    /**
     * @zh 展示日期的格式，参考[字符串解析格式](#字符串解析格式)
     * @en Display the format of the date, refer to [String Parsing Format](#String Parsing Format)
     * */
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    /**
     * @zh 提示文案
     * @en Prompt copy
     * */
    placeholder: {
      type: [String, Array] as PropType<string | string[]>,
    },
    /**
     * @zh 输入框尺寸
     * @en Input box size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     * */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for pop-up box
     * */
    popupContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    /**
     * @zh 12 小时制
     * @en 12 hour clock
     * */
    use12Hours: {
      type: Boolean,
    },
    /**
     * @zh 设置 时 / 分 / 秒 的选择间隔
     * @en Set the hour/minute/second selection interval
     * */
    step: {
      type: Object as PropType<{
        hour?: number;
        minute?: number;
        second?: number;
      }>,
    },
    /**
     * @zh 禁用的部分小时选项
     * @en Disabled partial hour options
     * */
    disabledHours: {
      type: Function as PropType<() => number[]>,
    },
    /**
     * @zh 禁用的部分分钟选项
     * @en Disabled some minutes options
     * */
    disabledMinutes: {
      type: Function as PropType<(selectedHour?: number) => number[]>,
    },
    /**
     * @zh 禁用的部分秒数选项
     * @en Disabled partial seconds option
     * */
    disabledSeconds: {
      type: Function as PropType<
        (selectedHour?: number, selectedMinute?: number) => number[]
      >,
    },
    /**
     * @zh 隐藏禁止选择的选项
     * @en Hide prohibited options
     * */
    hideDisabledOptions: {
      type: Boolean,
    },
    /**
     * @zh 禁用确认步骤，开启后直接点选时间不需要点击确认按钮
     * @en Disable the confirmation step, click the time directly after opening, without clicking the confirmation button
     * */
    disableConfirm: {
      type: Boolean,
    },
    /**
     * @zh 弹出的位置
     * @en Pop-up position
     * */
    position: {
      type: String as PropType<'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'>,
      default: 'bl',
    },
    /**
     * @zh 控制弹出框打开或者关闭
     * @en Control the pop-up box to open or close
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 弹出框默认打开或者关闭
     * @en The pop-up box is opened or closed by default
     * */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 可以传入 `Trigger` 组件的参数
     * @en You can pass in the parameters of the `Trigger` component
     * */
    triggerProps: {
      type: Object as PropType<TriggerProps>,
    },
    /**
     * @zh 是否在关闭后销毁 dom 结构
     * @en Whether to destroy the dom structure after closing
     * */
    unmountOnClose: {
      type: Boolean,
    },
  },
  emits: {
    /**
     * @zh 组件值发生改变
     * @en The component value changes
     * @param {string | Array<string | undefined> | undefined} timeString
     * @param {date | Array<date | undefined> | undefined} time
     */
    'change': (
      timeString: string | Array<string | undefined> | undefined,
      time: Date | Array<Date | undefined> | undefined
    ) => true,
    'update:modelValue': (
      timeString: string | Array<string | undefined> | undefined
    ) => true,
    /**
     * @zh 选择时间但未触发组件值变化
     * @en Select time but do not trigger component value change
     * @param {string | Array<string | undefined>} timeString
     * @param {Date | Array<Date | undefined>} time
     */
    'select': (
      timeString: string | Array<string | undefined>,
      time: Date | Array<Date | undefined>
    ) => true,
    /**
     * @zh 点击清除按钮
     * @en Click the clear button
     * */
    'clear': () => true,
    /**
     * @zh 弹出框展开和收起
     * @en Pop-up box expand and collapse
     * @param {boolean} visible
     */
    'popup-visible-change': (visible: boolean) => true,
    'update:popupVisible': (visible: boolean) => true,
  },
  /**
   * @zh 输入框前缀
   * @en Input box prefix
   * @slot prefix
   * @version 2.41.0
   */
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
  setup(props, { emit }) {
    const {
      type,
      format,
      use12Hours,
      modelValue,
      defaultValue,
      popupVisible,
      defaultPopupVisible,
      disabled,
      placeholder,
      disableConfirm,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    } = toRefs(props);

    const { mergedDisabled, eventHandlers } = useFormItem({ disabled });

    const isRange = computed(() => type.value === 'time-range');
    const prefixCls = getPrefixCls('timepicker');
    const refInput = ref();

    const { format: computedFormat, use12Hours: computedUse12Hours } =
      useTimeFormat(
        reactive({
          format,
          use12Hours,
        })
      );

    const {
      computedValue,
      panelValue,
      inputValue,
      setValue,
      setPanelValue,
      setInputValue,
    } = useTimeState(
      reactive({
        modelValue,
        defaultValue,
        isRange,
        format: computedFormat,
      })
    );

    // 选择面板是否可见
    const [panelVisible, setLocalVisible] = useMergeState(
      defaultPopupVisible.value,
      reactive({ value: popupVisible })
    );
    const setPanelVisible = (newVisible: boolean) => {
      if (newVisible !== panelVisible.value) {
        setLocalVisible(newVisible);
        emit('popup-visible-change', newVisible);
        emit('update:popupVisible', newVisible);
      }
    };
    const { t } = useI18n();

    // 当前焦点所在的 input
    const [focusedInputIndex, setFocusedInputIndex] = useState(0);

    // placeholder
    const computedPlaceholder = computed(() => {
      const _placeholder = placeholder?.value;
      // 单个
      if (!isRange.value) {
        return !isUndefined(_placeholder)
          ? _placeholder
          : t('datePicker.placeholder.time');
      }
      // 范围
      if (isUndefined(_placeholder)) {
        return t('datePicker.rangePlaceholder.time');
      }
      if (!isArray(_placeholder)) {
        return [_placeholder, _placeholder];
      }
      return _placeholder;
    });

    const isDisabledTime = useIsDisabledTime(
      reactive({
        disabledHours,
        disabledMinutes,
        disabledSeconds,
      })
    );

    function emitChange(value: Dayjs | Array<Dayjs | undefined> | undefined) {
      if (isValueChange(value, computedValue.value)) {
        const formattedValue = getFormattedValue(value, computedFormat.value);
        const dateValue = getDateValue(value);
        emit('update:modelValue', formattedValue);
        emit('change', formattedValue, dateValue);
        eventHandlers.value?.onChange?.();
      }
    }

    function confirm(
      value: Dayjs | Array<Dayjs | undefined> | undefined,
      showPanel: boolean
    ) {
      if (isDisabledTime(value)) return;

      let newValue = value;

      if (isArray(value)) {
        const now = dayjs();
        newValue = value.map((item) => {
          if (item) {
            item = item.year(now.year());
            item = item.month(now.month());
            item = item.date(now.date());
          }
          return item;
        });
        if (isValidRangeValue(newValue)) {
          newValue = getSortedDayjsArray(newValue as Dayjs[]);
        }
        if (newValue?.length === 0) {
          newValue = undefined;
        }
      }

      emitChange(newValue);
      setValue(newValue);

      if (showPanel !== panelVisible.value) {
        setPanelVisible(showPanel);
      }
    }

    function select(
      value: Dayjs | Array<Dayjs | undefined>,
      showPanel: boolean
    ) {
      setPanelValue(value);

      if (showPanel !== panelVisible.value) {
        setPanelVisible(showPanel);
      }
    }

    function focusInput(index?: number) {
      refInput.value && refInput.value.focus && refInput.value.focus(index);
    }

    function onPanelVisibleChange(newVisible: boolean) {
      if (mergedDisabled.value) return;
      setPanelVisible(newVisible);

      if (newVisible) {
        nextTick(() => {
          focusInput(focusedInputIndex.value);
        });
      }
    }

    function onPanelSelect(value: Dayjs | Array<Dayjs | undefined>) {
      // 先触发 select 事件
      const formattedValue = getFormattedValue(value, computedFormat.value);
      const dateValue = getDateValue(value);
      emit('select', formattedValue as any, dateValue);

      if (
        disableConfirm.value &&
        (!isRange.value || isValidRangeValue(value))
      ) {
        confirm(value, true);
      } else {
        select(value, true);
        setInputValue(undefined);
      }
    }

    function onPanelConfirm(value: Dayjs | Dayjs[]) {
      confirm(value, false);
    }

    function onInputPressEnter() {
      confirm(panelValue.value || computedValue.value, false);
    }

    function onRangeInputPressEnter() {
      if (isValidRangeValue(panelValue.value)) {
        confirm(panelValue.value, false);
      } else {
        const newFocusedInputIndex = (focusedInputIndex.value + 1) % 2;
        setFocusedInputIndex(newFocusedInputIndex);
        focusInput(newFocusedInputIndex);
      }
    }

    function onInputChange(e: any) {
      setPanelVisible(true);

      const targetValue = e.target.value;
      setInputValue(targetValue);

      if (!isValidInputValue(targetValue, computedFormat.value)) return;

      const newValue = dayjs(targetValue, computedFormat.value);

      if (isDisabledTime(newValue)) return;

      if (disableConfirm.value) {
        confirm(newValue, true);
      } else {
        select(newValue, true);
      }
    }

    function onRangeInputChange(e: any) {
      setPanelVisible(true);

      const targetValue = e.target.value;
      const newInputValue = isArray(inputValue.value)
        ? [...inputValue.value]
        : (isArray(panelValue.value) &&
            (getFormattedValue(panelValue.value, computedFormat.value) as Array<
              string | undefined
            >)) ||
          [];
      newInputValue[focusedInputIndex.value] = targetValue;

      setInputValue(newInputValue);

      if (!isValidInputValue(targetValue, computedFormat.value)) return;

      const targetValueDayjs = dayjs(targetValue, computedFormat.value);

      if (isDisabledTime(targetValueDayjs)) return;

      const newValue = isArray(panelValue.value) ? [...panelValue.value] : [];
      newValue[focusedInputIndex.value] = targetValueDayjs;

      if (disableConfirm.value && isValidRangeValue(newValue)) {
        confirm(newValue, true);
      } else {
        select(newValue, true);
      }
    }

    function onClear(e: Event) {
      e.stopPropagation();
      setPanelValue(undefined);
      confirm(undefined, isRange.value);
    }

    // 1. 每次打开关闭重新赋值 panelValue
    watch(panelVisible, (curVal, preVal) => {
      if (curVal !== preVal) {
        setPanelValue(computedValue.value);
      }
      if (!curVal) {
        setInputValue(undefined);
      }
    });

    const inputProps = computed(() => {
      if (isRange.value) {
        return {
          focusedIndex: focusedInputIndex.value,
          onFocusedIndexChange: (index: number) => {
            setFocusedInputIndex(index);
          },
          onChange: onRangeInputChange,
          onPressEnter: onRangeInputPressEnter,
        };
      }
      return {
        onChange: onInputChange,
        onPressEnter: onInputPressEnter,
      };
    });

    const panelProps = computed(() => {
      if (isRange.value) {
        return {
          displayIndex: focusedInputIndex.value,
          onDisplayIndexChange: (index: number) => {
            setFocusedInputIndex(index);
            focusInput(index);
          },
        };
      }
      return {};
    });

    return {
      refInput,
      isRange,
      prefixCls,
      panelVisible,
      focusedInputIndex,
      computedPlaceholder,
      panelValue,
      inputValue,
      computedFormat,
      computedUse12Hours,
      inputProps,
      panelProps,
      mergedDisabled,
      onPanelVisibleChange: onPanelVisibleChange as any,
      onInputClear: onClear,
      onPanelSelect,
      onPanelConfirm,
      onPanelClick: () => {
        focusInput(focusedInputIndex.value);
      },
    };
  },
});
</script>
