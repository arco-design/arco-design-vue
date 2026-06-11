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
          <div :key="colIndex" :class="[`${prefixCls}-cell`, `${prefixCls}-cell-week`]">
            <div :class="`${prefixCls}-date`">
              <div :class="`${prefixCls}-date-value`">{{ cell.label }}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            :key="colIndex"
            :class="getCellClassNameFn(cell)"
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

<script setup lang="ts">
  import { computed, PropType, reactive, toRefs } from 'vue';

  import { Dayjs } from 'dayjs';

  import type { Cell, DisabledDate, IsSameTime, Mode } from '../interface';

  import RenderFunction, { RenderFunc } from '../../_components/render-function';
  import { getDateValue } from '../../_utils/date';
  import useCellClassName from '../hooks/use-cell-class-name';
  import { isDisabledDate } from '../utils';

  defineOptions({ name: 'PanelBody' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{
    'cell-click': [_cellData: Cell];
    'cell-mouse-enter': [_cellData: Cell];
  }>();

  const { prefixCls, value, disabledDate, isSameTime, mode, rangeValues } = toRefs(props);

  const { getCellClassName } = useCellClassName(
    reactive({
      prefixCls,
      value,
      isSameTime,
      mode,
      rangeValues,
    }),
  );

  const isCellDisabled = (cellData: Cell) =>
    isDisabledDate(cellData.value, disabledDate?.value, mode?.value);

  const isWeek = computed(() => mode?.value === 'week');

  const getCellClassNameFn = (cellData: Cell) => {
    const disabled = isCellDisabled(cellData);
    return getCellClassName(cellData, disabled);
  };
  const onCellClick = (cellData: Cell) => {
    const disabled = isCellDisabled(cellData);
    if (disabled) return;
    emit('cell-click', cellData);
  };
  const onCellMouseEnter = (cellData: Cell) => {
    const disabled = isCellDisabled(cellData);
    if (disabled) return;
    emit('cell-mouse-enter', cellData);
  };
  const onCellMouseLeave = (cellData: Cell) => {
    const disabled = isCellDisabled(cellData);
    if (disabled) return;
    emit('cell-mouse-enter', cellData);
  };
</script>
