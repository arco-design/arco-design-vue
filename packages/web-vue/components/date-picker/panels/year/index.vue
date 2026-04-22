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
      />
      <PanelBody
        mode="year"
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
import { getPrefixCls } from '../../../_utils/global-config';
import { methods } from '../../../_utils/date';
import type {
  Cell,
  DisabledDate,
  HeaderIcons,
  HeaderOperations,
  IsSameTime,
} from '../../interface';
import { newArray } from '../../utils';
import PanelHeader from '../header.vue';
import PanelBody from '../body.vue';
import { RenderFunc } from '../../../_components/render-function';

const ROW_COUNT = 4;
const COL_COUNT = 3;
const CELL_COUNT = ROW_COUNT * COL_COUNT;
const SPAN = 10;
const MIN_YEAR = 0;

export default defineComponent({
  name: 'YearPanel',
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
  },
  emits: ['select', 'cell-mouse-enter'],
  setup(props, { emit }) {
    const { headerValue } = toRefs(props);
    const prefixCls = computed(() => getPrefixCls('panel-year'));
    const pickerPrefixCls = getPrefixCls('picker');

    const rows = computed(() => {
      const currentYear = Math.max(headerValue.value.year(), MIN_YEAR);
      const baseYear = Math.floor(currentYear / SPAN) * SPAN;
      const startYear = Math.max(baseYear - 1, MIN_YEAR);
      const baseValue = headerValue.value.set('month', 0).set('date', 1);

      const flatData = newArray<Cell>(CELL_COUNT).map((_, index) => {
        const year = startYear + index;
        return {
          label: year,
          value: methods.set(baseValue, 'year', year),
          isPrev: year < baseYear,
          isNext: year > baseYear + SPAN - 1,
        };
      });

      const rows = newArray(ROW_COUNT).map((_, index) =>
        flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT)
      );

      return rows;
    });

    const headerTitle = computed(() => {
      const currentYear = Math.max(headerValue.value.year(), MIN_YEAR);
      const baseYear = Math.floor(currentYear / SPAN) * SPAN;
      return `${baseYear}-${baseYear + SPAN - 1}`;
    });

    const isSameTime: IsSameTime = (current, target) =>
      current.isSame(target, 'year');

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
