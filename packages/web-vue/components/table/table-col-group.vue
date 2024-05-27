<template>
  <colgroup>
    <col
      v-for="item of operations"
      :key="`arco-col-${item.name}`"
      :class="`arco-table-${item.name}-col`"
      :style="fixedWidth(item.width)"
    />
    <col
      v-for="item of dataColumns"
      :key="`arco-col-${item.dataIndex}`"
      :style="
        fixedWidth(
          (columnWidth && item.dataIndex && columnWidth[item.dataIndex]) ||
            item.width,
          item.minWidth
        )
      "
    />
  </colgroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TableColumnData, TableOperationColumn } from './interface';

export default defineComponent({
  name: 'ColGroup',
  props: {
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      required: true,
    },
    operations: {
      type: Array as PropType<TableOperationColumn[]>,
      required: true,
    },
    columnWidth: {
      type: Object as PropType<Record<string, number>>,
    },
  },
  setup() {
    const fixedWidth = (width?: number, minWidth?: number) => {
      if (width) {
        const min = Math.max(width, minWidth || 0);
        return {
          width: `${width}px`,
          minWidth: `${min}px`,
          maxWidth: `${width}px`,
        };
      }
      if (minWidth) {
        return { minWidth: `${minWidth}px` };
      }
      return undefined;
    };
    return {
      fixedWidth,
    };
  },
});
</script>
