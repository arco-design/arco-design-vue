<template>
  <div :class="classNames">
    <PanelShortcuts
      v-if="showShortcuts && shortcutsPosition === 'left'"
      v-bind="shortcutsProps"
    />
    <div :class="`${prefixCls}-range-panel-wrapper`">
      <!-- panel -->
      <div :class="`${prefixCls}-range`">
        <div :class="`${prefixCls}-range-wrapper`">
          <template v-if="startHeaderMode || endHeaderMode">
            <YearPanel
              v-if="startHeaderMode === 'year'"
              v-bind="startPanelProps"
            />
            <YearPanel v-if="endHeaderMode === 'year'" v-bind="endPanelProps" />
            <MonthPanel
              v-else-if="startHeaderMode === 'month'"
              v-bind="startPanelProps"
              :abbreviation="abbreviation"
            />
            <MonthPanel
              v-else-if="endHeaderMode === 'month'"
              v-bind="endPanelProps"
              :abbreviation="abbreviation"
            />
          </template>
          <template v-else>
            <!-- week -->
            <template v-if="mode === 'week'">
              <WeekPanel
                v-bind="startPanelProps"
                :day-start-of-week="dayStartOfWeek"
              />
              <WeekPanel
                v-bind="endPanelProps"
                :day-start-of-week="dayStartOfWeek"
              />
            </template>
            <!-- month -->
            <template v-else-if="mode === 'month'">
              <MonthPanel
                v-bind="startPanelProps"
                :abbreviation="abbreviation"
              />
              <MonthPanel v-bind="endPanelProps" :abbreviation="abbreviation" />
            </template>
            <!-- year -->
            <template v-else-if="mode === 'year'">
              <YearPanel v-bind="startPanelProps" />
              <YearPanel v-bind="endPanelProps" />
            </template>
            <!-- quarter -->
            <template v-else-if="mode === 'quarter'">
              <QuarterPanel v-bind="startPanelProps" />
              <QuarterPanel v-bind="endPanelProps" />
            </template>
            <!-- date -->
            <template v-else>
              <DatePanel
                v-model:currentView="currentDateView"
                v-bind="startPanelProps"
                is-range
                :value="value && value[0]"
                :footer-value="footerValue && footerValue[0]"
                :time-picker-value="timePickerValue && timePickerValue[0]"
                :day-start-of-week="dayStartOfWeek"
                :show-time="showTime"
                :time-picker-props="timePickerProps"
                :disabled-time="getDisabledTimeFunc(0)"
                :disabled="disabled[0]"
                @timePickerSelect="onStartTimePickerSelect"
              />
              <DatePanel
                v-model:currentView="currentDateView"
                v-bind="endPanelProps"
                is-range
                :value="value && value[1]"
                :footer-value="footerValue && footerValue[1]"
                :time-picker-value="timePickerValue && timePickerValue[1]"
                :day-start-of-week="dayStartOfWeek"
                :show-time="showTime"
                :time-picker-props="timePickerProps"
                :disabled-time="getDisabledTimeFunc(1)"
                :disabled="disabled[1]"
                @timePickerSelect="onEndTimePickerSelect"
              />
            </template>
          </template>
        </div>
      </div>
      <!-- footer -->
      <PanelFooter
        :prefix-cls="prefixCls"
        :show-today-btn="false"
        :show-confirm-btn="showConfirmBtn"
        :confirm-btn-disabled="confirmBtnDisabled"
        @confirmBtnClick="onConfirmBtnClick"
      >
        <template v-if="extra || $slots.extra" #extra>
          <slot v-if="$slots.extra" name="extra" />
          <RenderFunction v-else :render-func="extra" />
        </template>
        <template v-if="showShortcuts && shortcutsPosition === 'bottom'" #btn>
          <PanelShortcuts v-bind="shortcutsProps" />
        </template>
      </PanelFooter>
    </div>
    <PanelShortcuts
      v-if="showShortcuts && shortcutsPosition === 'right'"
      v-bind="shortcutsProps"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { Dayjs } from 'dayjs';
import { isArray, isFunction } from '../_utils/is';
import { getDayjsValue } from '../_utils/date';
import pick from '../_utils/pick';
import type {
  ShortcutType,
  RangePickerProps,
  Mode,
  RangeDisabledTime,
  RangeDisabledDate,
  CalendarValue,
  WeekStart,
  StartHeaderProps,
} from './interface';
import PanelShortcuts from './panels/shortcuts.vue';
import PanelFooter from './panels/footer.vue';
import DatePanel from './panels/date/index.vue';
import WeekPanel from './panels/week/index.vue';
import MonthPanel from './panels/month/index.vue';
import YearPanel from './panels/year/index.vue';
import QuarterPanel from './panels/quarter/index.vue';
import RenderFunction, { RenderFunc } from '../_components/render-function';
import { normalizeRangeValue } from './utils';

export default defineComponent({
  name: 'DateRangePikerPanel',
  components: {
    PanelShortcuts,
    PanelFooter,
    RenderFunction,
    DatePanel,
    WeekPanel,
    MonthPanel,
    YearPanel,
    QuarterPanel,
  },
  props: {
    mode: {
      type: String as PropType<Mode>,
      default: 'date',
    },
    value: {
      type: Array as PropType<Array<Dayjs | undefined>>,
      default: () => [],
    },
    footerValue: {
      type: Array as PropType<Array<Dayjs | undefined>>,
    },
    timePickerValue: {
      type: Array as PropType<Dayjs[]>,
    },
    showTime: {
      type: Boolean,
    },
    showConfirmBtn: {
      type: Boolean,
    },
    prefixCls: {
      type: String,
      required: true,
    },
    shortcuts: {
      type: Array as PropType<ShortcutType[]>,
      default: () => [],
    },
    shortcutsPosition: {
      type: String as PropType<RangePickerProps['shortcutsPosition']>,
      default: 'bottom',
    },
    format: {
      type: String,
      required: true,
    },
    dayStartOfWeek: {
      type: Number as PropType<WeekStart>,
      default: 0,
    },
    disabledDate: {
      type: Function as PropType<RangeDisabledDate>,
    },
    disabledTime: {
      type: Function as PropType<RangeDisabledTime>,
    },
    timePickerProps: {
      type: Object as PropType<RangePickerProps['timePickerProps']>,
    },
    extra: {
      type: Function as PropType<RenderFunc>,
    },
    dateRender: {
      type: Function as PropType<RenderFunc>,
    },
    hideTrigger: {
      type: Boolean,
    },
    startHeaderProps: {
      type: Object as PropType<StartHeaderProps>,
      default: () => ({}),
    },
    endHeaderProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    confirmBtnDisabled: {
      type: Boolean,
    },
    disabled: {
      type: Array as PropType<boolean[]>,
      default: () => [false, false],
    },
    visible: {
      type: Boolean,
    },
    startHeaderMode: {
      type: String as PropType<'year' | 'month'>,
    },
    endHeaderMode: {
      type: String as PropType<'year' | 'month'>,
    },
    abbreviation: {
      type: Boolean,
    },
  },
  emits: [
    'cell-click',
    'cell-mouse-enter',
    'time-picker-select',
    'shortcut-click',
    'shortcut-mouse-enter',
    'shortcut-mouse-leave',
    'confirm',
    'start-header-label-click',
    'end-header-label-click',
    'start-header-select',
    'end-header-select',
  ],
  setup(props, { emit }) {
    const {
      prefixCls,
      shortcuts,
      shortcutsPosition,
      format,
      hideTrigger,
      value,
      disabledDate,
      disabledTime,
      startHeaderProps,
      endHeaderProps,
      dateRender,
      visible,
      startHeaderMode,
      endHeaderMode,
    } = toRefs(props);

    const showShortcuts = computed(
      () => isArray(shortcuts.value) && shortcuts.value.length
    );

    const classNames = computed(() => [
      `${prefixCls.value}-range-container`,
      {
        [`${prefixCls.value}-range-container-panel-only`]: hideTrigger.value,
        [`${prefixCls.value}-range-container-shortcuts-placement-left`]:
          showShortcuts.value && shortcutsPosition.value === 'left',
        [`${prefixCls.value}-range-container-shortcuts-placement-right`]:
          showShortcuts.value && shortcutsPosition.value === 'right',
      },
    ]);

    const currentDateView = ref('date');

    watch(visible, (newVal, oldVal) => {
      if (newVal && !oldVal) {
        currentDateView.value = 'date';
      }
    });

    function getShortcutValue(shortcut: ShortcutType) {
      return getDayjsValue(
        normalizeRangeValue(
          isFunction(shortcut.value) ? shortcut.value() : shortcut.value
        ) as CalendarValue[],
        shortcut.format || format.value
      );
    }

    function onShortcutClick(shortcut: ShortcutType) {
      emit('shortcut-click', getShortcutValue(shortcut), shortcut);
    }
    function onShortcutMouseEnter(shortcut: ShortcutType) {
      emit('shortcut-mouse-enter', getShortcutValue(shortcut));
    }
    function onShortcutMouseLeave(shortcut: ShortcutType) {
      emit('shortcut-mouse-leave', getShortcutValue(shortcut));
    }

    function onPanelCellClick(date: Dayjs) {
      emit('cell-click', date);
    }

    function onPanelCellMouseEnter(date: Dayjs) {
      emit('cell-mouse-enter', date);
    }

    function onConfirmBtnClick() {
      emit('confirm');
    }

    function onStartTimePickerSelect(time: Dayjs) {
      emit('time-picker-select', time, 'start');
    }

    function onEndTimePickerSelect(time: Dayjs) {
      emit('time-picker-select', time, 'end');
    }

    function onStartPanelHeaderLabelClick(type: 'year' | 'month') {
      emit('start-header-label-click', type);
    }

    function onEndPanelHeaderLabelClick(type: 'year' | 'month') {
      emit('end-header-label-click', type);
    }

    function onStartHeaderPanelSelect(date: Dayjs) {
      emit('start-header-select', date);
    }

    function onEndHeaderPanelSelect(date: Dayjs) {
      emit('end-header-select', date);
    }

    function getDisabledDateFunc(index: 0 | 1) {
      return isFunction(disabledDate?.value)
        ? (current: Date) =>
            disabledDate?.value?.(current, index === 0 ? 'start' : 'end') ||
            false
        : undefined;
    }

    function getDisabledTimeFunc(index: 0 | 1) {
      return isFunction(disabledTime?.value)
        ? (current: Date) =>
            disabledTime?.value?.(current, index === 0 ? 'start' : 'end') ||
            false
        : undefined;
    }

    function getDateRenderFunc(index: 0 | 1) {
      return isFunction(dateRender?.value)
        ? (props: any) => {
            const mergeProps = {
              ...props,
              type: index === 0 ? 'start' : 'end',
            };
            return dateRender?.value?.(mergeProps);
          }
        : undefined;
    }

    const shortcutsProps = reactive({
      prefixCls,
      shortcuts,
      onItemClick: onShortcutClick,
      onItemMouseEnter: onShortcutMouseEnter,
      onItemMouseLeave: onShortcutMouseLeave,
    });

    const startPanelProps = computed(() => ({
      ...startHeaderProps.value,
      rangeValues: value.value,
      disabledDate: getDisabledDateFunc(0),
      dateRender: getDateRenderFunc(0),
      onSelect: startHeaderMode.value
        ? onStartHeaderPanelSelect
        : onPanelCellClick,
      onCellMouseEnter: onPanelCellMouseEnter,
      onHeaderLabelClick: onStartPanelHeaderLabelClick,
    }));

    const endPanelProps = computed(() => ({
      ...endHeaderProps.value,
      rangeValues: value.value,
      disabledDate: getDisabledDateFunc(1),
      dateRender: getDateRenderFunc(1),
      onSelect: endHeaderMode.value ? onEndHeaderPanelSelect : onPanelCellClick,
      onCellMouseEnter: onPanelCellMouseEnter,
      onHeaderLabelClick: onEndPanelHeaderLabelClick,
    }));

    return {
      pick,
      classNames,
      showShortcuts,
      shortcutsProps,
      startPanelProps,
      endPanelProps,
      getDisabledTimeFunc,
      onConfirmBtnClick,
      currentDateView,
      onStartTimePickerSelect,
      onEndTimePickerSelect,
      onStartHeaderPanelSelect,
      onEndHeaderPanelSelect,
    };
  },
});
</script>
