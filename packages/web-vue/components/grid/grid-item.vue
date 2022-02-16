<template>
  <div ref="domRef" :class="classNames" :style="style">
    <slot :overflow="overflow" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  ref,
  inject,
  watchEffect,
  computed,
} from 'vue';
import { useIndex } from '../_hooks/use-index';
import { getPrefixCls } from '../_utils/global-config';
import {
  GridContextInjectionKey,
  GridDataCollectorInjectionKey,
} from './context';
import { resolveItemData } from './utils';

/**
 * @version 2.15.0
 */
export default defineComponent({
  name: 'GridItem',
  props: {
    /**
     * @zh 跨越的格数
     * @en Number of grids spanned
     */
    span: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 左侧的间隔格数
     * @en Number of grids on the left
     */
    offset: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否是后缀元素
     * @en Is it a suffix element
     */
    suffix: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const domRef = ref<HTMLDivElement>();
    const { index } = useIndex(domRef);
    const gridContext = inject(GridContextInjectionKey, {
      overflow: false,
      displayIndexList: [],
      cols: 24,
      colGap: 0,
    });
    const gridDataCollector = inject(GridDataCollectorInjectionKey);
    const visible = computed(() =>
      gridContext?.displayIndexList?.includes(index.value)
    );
    const itemData = computed(() => resolveItemData(gridContext.cols, props));
    const prefixCls = getPrefixCls('grid-item');
    const classNames = computed(() => [prefixCls]);
    const offsetStyle = computed(() => {
      const { offset, span } = itemData.value;
      const { colGap } = gridContext;
      if (offset > 0) {
        const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`;
        return {
          'margin-left': `calc((${oneSpan} * ${offset}) + ${
            colGap * offset
          }px)`,
        };
      }
      return {};
    });
    const columnStart = computed(() => {
      const { suffix, span } = itemData.value;
      const { cols } = gridContext;
      if (suffix) {
        return `${cols - span + 1}`;
      }
      return `span ${span}`;
    });
    const style = computed(() => {
      const { span } = itemData.value;
      return [
        {
          'grid-column': `${columnStart.value} / span ${span}`,
        },
        offsetStyle.value,
        !visible.value || span === 0 ? { display: 'none' } : {},
      ];
    });

    watchEffect(() => {
      if (index.value !== -1) {
        gridDataCollector?.collectItemData(index.value, itemData.value);
      }
    });

    onUnmounted(() => {
      if (index.value !== -1) {
        gridDataCollector?.removeItemData(index.value);
      }
    });

    return {
      classNames,
      style,
      domRef,
      overflow: computed(() => gridContext.overflow),
    };
  },
});
</script>
