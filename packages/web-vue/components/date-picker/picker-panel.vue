<template>
  <div :class="classNames">
    <PanelShortcuts v-if="showShortcutsInLeft" v-bind="shortcutsProps" />
    <div :class="`${prefixCls}-panel-wrapper`">
      <template v-if="headerMode">
        <YearPanel
          v-if="headerMode === 'year'"
          :header-value="headerPanelHeaderValue"
          :header-icons="headerIcons"
          :header-operations="headerPanelHeaderOperations"
          @select="onHeaderPanelSelect"
        />
        <MonthPanel
          v-else-if="headerMode === 'month'"
          :header-value="headerPanelHeaderValue"
          :header-icons="headerIcons"
          :header-operations="headerPanelHeaderOperations"
          :abbreviation="abbreviation"
          @select="onHeaderPanelSelect"
          @header-label-click="onMonthHeaderLabelClick"
        />
      </template>
      <template v-else>
        <WeekPanel
          v-if="mode === 'week'"
          v-bind="commonPanelProps"
          :day-start-of-week="dayStartOfWeek"
        />
        <MonthPanel
          v-else-if="mode === 'month'"
          :abbreviation="abbreviation"
          v-bind="commonPanelProps"
        />
        <YearPanel v-else-if="mode === 'year'" v-bind="commonPanelProps" />
        <QuarterPanel
          v-else-if="mode === 'quarter'"
          v-bind="commonPanelProps"
        />
        <DatePanel
          v-else
          v-bind="commonPanelProps"
          mode="date"
          :show-time="showTime"
          :time-picker-props="timePickerProps"
          :day-start-of-week="dayStartOfWeek"
          :footer-value="footerValue"
          :time-picker-value="timePickerValue"
          :disabled-time="disabledTime"
          @timePickerSelect="onTimePickerSelect"
        />
        <PanelFooter
          :prefix-cls="prefixCls"
          :show-today-btn="
            showNowBtn && !(showConfirmBtn || showShortcutsInBottom)
          "
          :show-confirm-btn="showConfirmBtn"
          :confirm-btn-disabled="confirmBtnDisabled"
          @todayBtnClick="onTodayBtnClick"
          @confirmBtnClick="onConfirmBtnClick"
        >
          <template v-if="extra" #extra>
            <RenderFunction v-if="extra" :render-func="extra" />
          </template>
          <template v-if="showShortcutsInBottom" #btn>
            <PanelShortcuts v-bind="shortcutsProps" />
          </template>
        </PanelFooter>
      </template>
    </div>
    <PanelShortcuts v-if="showShortcutsInRight" v-bind="shortcutsProps" />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { Dayjs } from 'dayjs';
import { isFunction } from '../_utils/is';
import { getDayjsValue, getNow } from '../_utils/date';
import {
  CalendarValue,
  DisabledDate,
  DisabledTime,
  HeaderIcons,
  HeaderOperations,
  ShortcutType,
  WeekStart,
} from './interface';
import PanelShortcuts from './panels/shortcuts.vue';
import DatePanel from './panels/date/index.vue';
import WeekPanel from './panels/week/index.vue';
import MonthPanel from './panels/month/index.vue';
import YearPanel from './panels/year/index.vue';
import QuarterPanel from './panels/quarter/index.vue';
import PanelFooter from './panels/footer.vue';
import { TimePickerProps } from '../time-picker/interface';
import RenderFunction, { RenderFunc } from '../_components/render-function';
import useHeaderValue from './hooks/use-header-value';

export default defineComponent({
  name: 'DatePikerPanel',
  components: {
    DatePanel,
    PanelShortcuts,
    PanelFooter,
    WeekPanel,
    MonthPanel,
    YearPanel,
    QuarterPanel,
    RenderFunction,
  },
  props: {
    mode: {
      type: String,
    },
    headerMode: {
      type: String as PropType<'year' | 'month'>,
    },
    prefixCls: {
      type: String,
      required: true,
    },
    value: {
      type: Object as PropType<Dayjs>,
    },
    headerValue: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    timePickerValue: {
      type: Object as PropType<Dayjs>,
    },
    showTime: {
      type: Boolean,
    },
    showConfirmBtn: {
      type: Boolean,
    },
    shortcuts: {
      type: Array as PropType<ShortcutType[]>,
      default: () => [],
    },
    shortcutsPosition: {
      type: String as PropType<'left' | 'bottom' | 'right'>,
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
      type: Function as PropType<DisabledDate>,
    },
    disabledTime: {
      type: Function as PropType<DisabledTime>,
    },
    timePickerProps: {
      type: Object as PropType<Partial<TimePickerProps>>,
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
    confirmBtnDisabled: {
      type: Boolean,
    },
    showNowBtn: {
      type: Boolean,
    },
    headerIcons: {
      type: Object as PropType<HeaderIcons>,
      default: () => ({}),
    },
    headerOperations: {
      type: Object as PropType<HeaderOperations>,
    },
    abbreviation: {
      type: Boolean,
    },
  },
  emits: [
    'cell-click',
    'time-picker-select',
    'shortcut-click',
    'shortcut-mouse-enter',
    'shortcut-mouse-leave',
    'confirm',
    'today-btn-click',
    'header-label-click',
    'header-select',
    'month-header-click',
  ],
  setup(props, { emit }) {
    const {
      prefixCls,
      shortcuts,
      shortcutsPosition,
      format,
      value,
      disabledDate,
      hideTrigger,
      showNowBtn,
      dateRender,
      showConfirmBtn,
      headerValue,
      headerIcons,
      headerOperations,
      headerMode,
    } = toRefs(props);

    const hasShortcuts = computed(() =>
      Boolean(shortcuts.value && shortcuts.value.length)
    );

    const showShortcutsNowBtn = computed(
      () => showNowBtn.value && showConfirmBtn.value && !hasShortcuts.value
    );

    const showShortcuts = computed(
      () => showShortcutsNowBtn.value || hasShortcuts.value
    );

    const showShortcutsInLeft = computed(
      () => showShortcuts.value && shortcutsPosition.value === 'left'
    );

    const showShortcutsInRight = computed(
      () => showShortcuts.value && shortcutsPosition.value === 'right'
    );

    const showShortcutsInBottom = computed(
      () => showShortcuts.value && shortcutsPosition.value === 'bottom'
    );

    const classNames = computed(() => [
      `${prefixCls.value}-container`,
      {
        [`${prefixCls.value}-container-panel-only`]: hideTrigger.value,
        [`${prefixCls.value}-container-shortcuts-placement-left`]:
          showShortcutsInLeft.value,
        [`${prefixCls.value}-container-shortcuts-placement-right`]:
          showShortcutsInRight.value,
      },
    ]);

    const footerValue = computed(() => value?.value || getNow());

    const {
      headerValue: headerPanelHeaderValue,
      setHeaderValue: setHeaderPanelHeaderValue,
      headerOperations: headerPanelHeaderOperations,
    } = useHeaderValue(
      reactive({
        mode: headerMode,
        format,
      })
    );

    watch(headerValue, (val) => {
      setHeaderPanelHeaderValue(val);
    });

    function getShortcutValue(shortcut: ShortcutType) {
      const { value } = shortcut;
      return getDayjsValue(
        (isFunction(value) ? value() : value) as CalendarValue,
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

    function onPanelSelect(date: Dayjs) {
      emit('cell-click', date);
    }
    function onTimePickerSelect(time: Dayjs) {
      emit('time-picker-select', time);
    }

    function onTodayBtnClick() {
      emit('today-btn-click', getNow());
    }

    function onConfirmBtnClick() {
      emit('confirm');
    }

    function onPanelHeaderLabelClick(type: 'year' | 'month') {
      emit('header-label-click', type);
    }

    function onHeaderPanelSelect(date: Dayjs) {
      emit('header-select', date);
    }

    function onMonthHeaderLabelClick() {
      emit('month-header-click');
    }

    const shortcutsProps = reactive({
      prefixCls,
      shortcuts,
      showNowBtn: showShortcutsNowBtn,
      onItemClick: onShortcutClick,
      onItemMouseEnter: onShortcutMouseEnter,
      onItemMouseLeave: onShortcutMouseLeave,
      onNowClick: onTodayBtnClick,
    });

    const commonPanelProps = reactive({
      value,
      headerValue,
      headerIcons,
      headerOperations,
      disabledDate,
      dateRender,
      onSelect: onPanelSelect,
      onHeaderLabelClick: onPanelHeaderLabelClick,
    });

    return {
      classNames,
      showShortcutsInLeft,
      showShortcutsInRight,
      showShortcutsInBottom,
      shortcutsProps,
      commonPanelProps,
      footerValue,
      onTodayBtnClick,
      onConfirmBtnClick,
      onTimePickerSelect,
      onHeaderPanelSelect,
      headerPanelHeaderValue,
      headerPanelHeaderOperations,
      onMonthHeaderLabelClick,
    };
  },
});
</script>
