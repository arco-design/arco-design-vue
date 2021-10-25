<template>
  <div :class="`${prefixCls}-body`">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      :class="[
        `${prefixCls}-row`,
        {
          [`${prefixCls}-row-week`]: isWeek,
        },
      ]"
    >
      <template v-for="(cell, colIndex) in row">
        <!-- 一年中的第几周，只在 week 模式下显示 -->
        <template v-if="isWeek && colIndex === 0">
          <div
            :key="colIndex"
            :class="[`${prefixCls}-cell`, `${prefixCls}-cell-week`]"
          >
            <div :class="`${prefixCls}-date`">
              <div :class="`${prefixCls}-date-value`">{{ cell.label }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            :key="colIndex"
            :class="getCellClassName(cell)"
            @mouseenter="
              () => {
                onCellMouseEnter(cell);
              }
            "
            @mouseleave="
              () => {
                onCellMouseLeave(cell);
              }
            "
            @click="
              () => {
                onCellClick(cell);
              }
            "
          >
            <RenderFunction
              v-if="dateRender"
              :render-func="dateRender"
              :date="getDateValue(cell.value)"
            />
            <div v-else :class="`${prefixCls}-date`">
              <div :class="`${prefixCls}-date-value`">
                {{ cell.label }}
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs';
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue';
import type { Cell, DisabledDate, IsSameTime, Mode } from '../interface';
import { isFunction } from '../../_utils/is';
import useCellClassName from '../hooks/use-cell-class-name';
import RenderFunction, { RenderFunc } from '../../_components/render-function';
import { getDateValue } from '../../_utils/date';

export default defineComponent({
  name: 'PanelBody',
  components: {
    RenderFunction,
  },
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    rows: {
      type: Array as PropType<Cell[][]>,
      default: () => [],
    },
    value: {
      type: Object as PropType<Dayjs>,
    },
    disabledDate: {
      type: Function as PropType<DisabledDate>,
    },
    isSameTime: {
      type: Function as PropType<IsSameTime>,
      required: true,
    },
    mode: {
      type: String as PropType<Mode>,
    },
    rangeValues: {
      type: Array as PropType<Array<Dayjs | undefined>>,
    },
    dateRender: {
      type: Function as PropType<RenderFunc>,
    },
  },
  emits: ['cell-click', 'cell-mouse-enter'],
  setup(props, { emit }) {
    const { prefixCls, value, disabledDate, isSameTime, mode, rangeValues } =
      toRefs(props);

    const { getCellClassName } = useCellClassName(
      reactive({
        prefixCls,
        value,
        isSameTime,
        mode,
        rangeValues,
      })
    );

    const isCellDisabled = (cellData: Cell) =>
      !!(
        isFunction(disabledDate?.value) &&
        disabledDate?.value(getDateValue(cellData.value))
      );

    return {
      isWeek: computed(() => mode?.value === 'week'),
      getCellClassName: (cellData: Cell) => {
        const disabled = isCellDisabled(cellData);
        return getCellClassName(cellData, disabled);
      },
      onCellClick: (cellData: Cell) => {
        const disabled = isCellDisabled(cellData);
        if (disabled) return;
        emit('cell-click', cellData);
      },
      onCellMouseEnter: (cellData: Cell) => {
        const disabled = isCellDisabled(cellData);
        if (disabled) return;
        emit('cell-mouse-enter', cellData);
      },
      onCellMouseLeave: (cellData: Cell) => {
        const disabled = isCellDisabled(cellData);
        if (disabled) return;
        emit('cell-mouse-enter', cellData);
      },
      getDateValue,
    };
  },
});
</script>
