<template>
  <colgroup>
    <col
      v-for="item of operations"
      :key="`sd-col-${item.name}`"
      :class="`sd-table-${item.name}-col`"
      :style="fixedWidth(item.width)"
    />
    <col
      v-for="item of dataColumns"
      :key="`sd-col-${item.dataIndex}`"
      :style="
        fixedWidth(
          (columnWidth && item.dataIndex && columnWidth[item.dataIndex]) || item.width,
          item.minWidth,
        )
      "
    />
  </colgroup>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';

  import { TableColumnData, TableOperationColumn } from './interface';

  defineOptions({ name: 'ColGroup' });

  const props = defineProps({
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
  });

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
</script>
