<template>
  <div :class="classNames" :style="style">
    <slot />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  toRefs,
  provide,
  reactive,
  watchEffect,
  PropType,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  GridContextInjectionKey,
  GridDataCollectorInjectionKey,
} from './context';
import { useResponsiveState } from './hook/use-responsive-state';
import { GridItemData, GridProps, ResponsiveValue } from './interface';
import { setItemVisible } from './utils';

/**
 * @version 2.15.0
 * @zh 响应式配置从 `2.18.0` 开始支持，具体配置 [ResponsiveValue](#responsivevalue)
 * @en Responsive configuration has been supported since `2.18.0`, the specific configuration [ResponsiveValue](#responsivevalue)
 */
export default defineComponent({
  name: 'Grid',
  props: {
    /**
     * @zh 每一行展示的列数
     * @en Number of columns displayed in each row
     */
    cols: {
      type: [Number, Object] as PropType<number | ResponsiveValue>,
      default: 24,
    },
    /**
     * @zh 行与行之间的间距
     * @en The space in row-to-row
     */
    rowGap: {
      type: [Number, Object] as PropType<number | ResponsiveValue>,
      default: 0,
    },
    /**
     * @zh 列与列之间的间距
     * @en The space in column-to-column
     */
    colGap: {
      type: [Number, Object] as PropType<number | ResponsiveValue>,
      default: 0,
    },
    /**
     * @zh 是否折叠
     * @en Whether to collapsed
     */
    collapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 折叠时显示的行数
     * @en Number of rows displayed when collapsed
     */
    collapsedRows: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const {
      cols: propCols,
      rowGap: propRowGap,
      colGap: propColGap,
      collapsedRows,
      collapsed,
    } = toRefs(props);
    const cols = useResponsiveState(propCols, 24);
    const colGap = useResponsiveState(propColGap, 0);
    const rowGap = useResponsiveState(propRowGap, 0);
    const prefixCls = getPrefixCls('grid');
    const classNames = computed(() => [prefixCls]);
    const style = computed(() => [
      {
        'gap': `${rowGap.value}px ${colGap.value}px`,
        'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`,
      },
    ]);
    const itemDataMap = reactive<Map<number, GridItemData>>(new Map());
    const itemDataList = computed(() => {
      const list: GridItemData[] = [];
      for (const [index, itemData] of itemDataMap.entries()) {
        list[index] = itemData;
      }
      return list;
    });
    const gridContext = reactive<{
      overflow: boolean;
      displayIndexList: number[];
      cols: number;
      colGap: number;
    }>({
      overflow: false,
      displayIndexList: [],
      cols: cols.value,
      colGap: colGap.value,
    });

    watchEffect(() => {
      gridContext.cols = cols.value;
      gridContext.colGap = colGap.value;
    });
    watchEffect(() => {
      const displayInfo = setItemVisible({
        cols: cols.value,
        collapsed: collapsed.value,
        collapsedRows: collapsedRows.value,
        itemDataList: itemDataList.value,
      });
      gridContext.overflow = displayInfo.overflow;
      gridContext.displayIndexList = displayInfo.displayIndexList;
    });

    provide(GridContextInjectionKey, gridContext);
    provide(GridDataCollectorInjectionKey, {
      collectItemData(index, itemData) {
        itemDataMap.set(index, itemData);
      },
      removeItemData(index) {
        itemDataMap.delete(index);
      },
    });

    return {
      classNames,
      style,
    };
  },
});
</script>
