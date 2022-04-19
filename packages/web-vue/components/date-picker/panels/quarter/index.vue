<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-inner`">
      <PanelHeader
        v-bind="{
          ...headerOperations,
          icons: headerIcons,
        }"
        :prefix-cls="pickerPrefixCls"
        :title="headerTitle"
        mode="quarter"
        :value="headerValue"
        :on-label-click="onHeaderLabelClick"
      />
      <PanelBody
        mode="quarter"
        :prefix-cls="pickerPrefixCls"
        :rows="rows"
        :value="value"
        :range-values="rangeValues"
        :disabled-date="disabledDate"
        :is-same-time="isSameTime"
        :date-render="dateRender"
        @cellClick="onCellClick"
        @cellMouseEnter="onCellMouseEnter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import { Dayjs } from 'dayjs';
import { padStart } from '../../../_utils/pad';
import { getPrefixCls } from '../../../_utils/global-config';
import { dayjs } from '../../../_utils/date';
import type {
  Cell,
  DisabledDate,
  HeaderIcons,
  HeaderOperations,
  IsSameTime,
} from '../../interface';
import PanelHeader, { HeaderLabelClickFunc } from '../header.vue';
import PanelBody from '../body.vue';
import { RenderFunc } from '../../../_components/render-function';

export default defineComponent({
  name: 'QuarterPanel',
  components: {
    PanelHeader,
    PanelBody,
  },
  props: {
    headerValue: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    headerOperations: {
      type: Object as PropType<HeaderOperations>,
      default: () => ({}),
    },
    headerIcons: {
      type: Object as PropType<HeaderIcons>,
      default: () => ({}),
    },
    value: {
      type: Object as PropType<Dayjs>,
    },
    disabledDate: {
      type: Function as PropType<DisabledDate>,
    },
    rangeValues: {
      type: Array as PropType<Array<Dayjs | undefined>>,
    },
    dateRender: {
      type: Function as PropType<RenderFunc>,
    },
    onHeaderLabelClick: {
      type: Function as PropType<HeaderLabelClickFunc>,
    },
  },
  emits: ['select', 'cell-mouse-enter'],
  setup(props, { emit }) {
    const { headerValue } = toRefs(props);
    const prefixCls = computed(() => getPrefixCls('panel-quarter'));
    const pickerPrefixCls = getPrefixCls('picker');

    const headerTitle = computed(() => headerValue.value.format('YYYY'));

    const rows = computed<Cell[][]>(() => {
      const year = headerValue.value.year();
      return [
        [1, 2, 3, 4].map((q) => ({
          label: `Q${q}`,
          value: dayjs(`${year}-${padStart((q - 1) * 3 + 1, 2, '0')}-01`),
        })),
      ];
    });

    const isSameTime: IsSameTime = (current, target) =>
      current.isSame(target, 'month') ||
      (current.isSame(target, 'year') &&
        Math.floor(current.month() / 3) === Math.floor(target.month() / 3));

    function onCellClick(cellData: Cell) {
      emit('select', cellData.value);
    }

    function onCellMouseEnter(cellData: Cell) {
      emit('cell-mouse-enter', cellData.value);
    }

    return {
      prefixCls,
      pickerPrefixCls,
      headerTitle,
      rows,
      isSameTime,
      onCellClick,
      onCellMouseEnter,
    };
  },
});
</script>
