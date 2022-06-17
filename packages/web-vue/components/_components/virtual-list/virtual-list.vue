<template>
  <ResizeObserver @resize="handleResize">
    <component
      :is="component"
      v-bind="$attrs"
      ref="viewportRef"
      :style="{
        overflowY: 'auto',
        overflowAnchor: 'none',
        maxHeight: `${viewportHeight}px`,
      }"
      @scroll="handleScroll"
    >
      <Filler
        :height="isVirtual ? totalHeight : viewportHeight"
        :offset="isVirtual ? startOffset : undefined"
        :type="type"
        :outer-attrs="outerAttrs"
        :inner-attrs="innerAttrs"
      >
        <RenderFunction :render-func="renderChildren" />
      </Filler>
    </component>
  </ResizeObserver>
</template>

<script lang="tsx">
import {
  defineComponent,
  PropType,
  toRefs,
  reactive,
  nextTick,
  computed,
  ref,
  watch,
  Ref,
  onUnmounted,
} from 'vue';
import {
  ItemSlot,
  ScrollOptions,
  VirtualListProps,
  VirtualItemKey,
} from './interface';
import { isFunction, isString, isUndefined } from '../../_utils/is';
import { raf, caf } from '../../_utils/raf';
import usePickSlots from '../../_hooks/use-pick-slots';
import ResizeObserver from '../resize-observer';
import RenderFunction from '../render-function';
import Filler from './filler.vue';
import { useViewportHeight } from './hooks/use-viewport-height';
import { useItemHeight } from './hooks/use-item-height';
import { useRenderChildren } from './hooks/use-render-children';
import { useRangeState } from './hooks/use-range-state';
import { useScrollTo } from './hooks/use-scroll-to';
import {
  getScrollPercentage,
  getValidScrollTop,
  getItemAbsoluteTop,
} from './utils';

export default defineComponent({
  name: 'VirtualList',
  components: {
    ResizeObserver,
    Filler,
    RenderFunction,
  },
  inheritAttrs: false,
  props: {
    /**
     * 可视区域高度
     */
    height: {
      type: [Number, String] as PropType<VirtualListProps['height']>,
      default: 200,
    },
    /**
     * 自动开启虚拟滚动的元素数量阈值，传入 null 表示禁止虚拟滚动
     */
    threshold: {
      type: [Number, Object] as PropType<VirtualListProps['threshold']>,
    },
    /**
     * 元素高度是否是固定的
     */
    isStaticItemHeight: {
      type: Boolean,
    },
    /**
     * 预估的元素高度
     */
    estimatedItemHeight: {
      type: Number,
    },
    /**
     * 数据源
     */
    data: {
      type: Array as PropType<VirtualListProps['data']>,
      default: () => [],
    },
    /**
     * 元素的 key，或者获取 key 的函数
     */
    itemKey: {
      type: [String, Function] as PropType<VirtualListProps['itemKey']>,
      default: 'key',
    },
    /**
     * 用于包裹的 HTML 标签
     * @type string
     */
    component: {
      type: String as PropType<VirtualListProps['component']>,
      default: 'div',
    },
    type: String,
    outerAttrs: Object,
    innerAttrs: Object,
  },
  emits: ['scroll', 'resize'],
  setup(props, { slots, emit }) {
    const {
      height,
      itemKey,
      data,
      estimatedItemHeight: propEstimatedItemHeight,
      isStaticItemHeight,
      threshold,
    } = toRefs(props);

    function getItemKey(item: any, index: number) {
      let result: VirtualItemKey | undefined;
      if (isString(itemKey.value)) {
        result = item[itemKey.value];
      } else if (isFunction(itemKey.value)) {
        result = itemKey.value(item);
      }
      return result ?? index;
    }

    // Convert data to internal format: {key, index, item}
    const internalData = computed(() =>
      (data.value || []).map((item, index) => ({
        key: getItemKey(item, index),
        index,
        item,
      }))
    );

    const viewportRef = ref<HTMLElement>();

    const { viewportHeight, setViewportHeight, needMeasureViewportHeight } =
      useViewportHeight(
        reactive({
          height,
        })
      );

    const {
      itemHeight,
      minItemHeight,
      totalHeight,
      setItemHeight,
      getItemHeight,
      getItemHeightOrDefault,
      getItemHeightOrDefaultByIndex,
    } = useItemHeight(
      reactive({
        estimatedItemHeight: propEstimatedItemHeight,
        data: internalData,
      })
    );

    const itemCount = computed(() => internalData.value.length);
    const visibleCount = computed(() =>
      Math.ceil(viewportHeight.value / minItemHeight.value)
    );

    const scrollTop = ref(0);
    const startOffset = ref(0);

    const { rangeState, updateRangeState } = useRangeState(
      reactive({
        viewportRef,
        itemCount,
        visibleCount,
      })
    );

    const visibleData = computed(() => {
      const start = rangeState.startIndex;
      const end = Math.min(rangeState.endIndex + 1, itemCount.value);
      return internalData.value.slice(start, end);
    });

    const isVirtual = computed(
      () =>
        threshold?.value !== null &&
        (threshold?.value === undefined ||
          itemCount.value >= threshold.value) &&
        totalHeight.value > viewportHeight.value
    );

    // 记录滚动列表的 paddingTop 用于校正滚动距离
    const scrollListPadding = computed(() => {
      if (!isUndefined(viewportRef.value)) {
        const viewport = viewportRef.value;
        const getPadding = (property: keyof CSSStyleDeclaration) =>
          +(window.getComputedStyle(viewport)[property] as string).replace(
            /\D/g,
            ''
          );
        return {
          top: getPadding('paddingTop'),
          bottom: getPadding('paddingBottom'),
        };
      }

      return { top: 0, bottom: 0 };
    });

    const itemRender = usePickSlots(slots, 'item') as Ref<ItemSlot>;
    const renderChildren = useRenderChildren(
      reactive({
        internalData,
        visibleData,
        itemRender,
      }),
      {
        onItemResize(el, key) {
          if (el && isUndefined(getItemHeight(key))) {
            if (isStaticItemHeight.value) {
              setItemHeight(key, itemHeight.value);
            } else {
              const height = el.offsetHeight;
              if (height) {
                setItemHeight(key, height);
              }
            }
          }
        },
      }
    );

    const updateScrollOffset = () => {
      if (!viewportRef.value || !isVirtual.value) return;

      const { scrollTop, clientHeight, scrollHeight } = viewportRef.value;

      const scrollPtg = getScrollPercentage({
        scrollTop,
        clientHeight,
        scrollHeight,
      });

      let newStartOffset = getItemAbsoluteTop({
        scrollPtg,
        clientHeight,
        scrollTop:
          scrollTop -
          (scrollListPadding.value.top + scrollListPadding.value.bottom) *
            scrollPtg,
        itemHeight: getItemHeightOrDefaultByIndex(rangeState.itemIndex),
        itemOffsetPtg: rangeState.itemOffsetPtg,
      });

      for (
        let index = rangeState.itemIndex - 1;
        index >= rangeState.startIndex;
        index--
      ) {
        newStartOffset -= getItemHeightOrDefaultByIndex(index);
      }

      startOffset.value = newStartOffset;
    };

    // scrollTo
    const rafIdRef = ref();
    onUnmounted(() => {
      rafIdRef.value && caf(rafIdRef.value);
    });

    const lockScrollRef = ref(false);
    const { fixScrollTo, prepareScrollTo } = useScrollTo(
      reactive({
        isVirtual,
        isStaticItemHeight,
        rangeState,
        data: internalData,
        viewportRef,
        scrollTop,
        visibleCount,
        getItemHeightOrDefault,
        getItemHeightOrDefaultByIndex,
      })
    );

    const handleResize = (entry: HTMLElement) => {
      handleWrapperResize(entry);
      emit('resize', entry);
    };

    const handleWrapperResize = (entry: HTMLElement) => {
      if (needMeasureViewportHeight.value) {
        setViewportHeight(entry.clientHeight);
      }
    };

    const handleScroll = (e: UIEvent) => {
      if (!viewportRef.value) return;

      const {
        scrollTop: rawScrollTop,
        clientHeight,
        scrollHeight,
      } = viewportRef.value;

      scrollTop.value = getValidScrollTop(
        rawScrollTop,
        scrollHeight - clientHeight
      );
      emit('scroll', e);
    };

    const scrollTo = (options: ScrollOptions) => {
      rafIdRef.value && caf(rafIdRef.value);
      rafIdRef.value = raf(() => {
        const prepareScrollResult = prepareScrollTo(options);
        if (prepareScrollResult) {
          rangeState.startIndex = prepareScrollResult.startIndex;
          rangeState.endIndex = prepareScrollResult.endIndex;
          nextTick(() => {
            if (!viewportRef.value) return;

            const fixScrollResult = fixScrollTo({
              itemIndex: prepareScrollResult.itemIndex,
              relativeTop: prepareScrollResult.relativeTop,
            });

            if (fixScrollResult) {
              lockScrollRef.value = true;
              viewportRef.value.scrollTop = fixScrollResult.scrollTop;
              rangeState.itemIndex = fixScrollResult.itemIndex;
              rangeState.itemOffsetPtg = fixScrollResult.itemOffsetPtg;
              rangeState.startIndex = fixScrollResult.startIndex;
              rangeState.endIndex = fixScrollResult.endIndex;
            }

            rafIdRef.value = raf(() => {
              lockScrollRef.value = false;
            });
          });
        }
      });
    };

    // Element size changes, viewport changes size changes, scroll position changes need to recalculate the start and end elements
    watch([itemHeight, visibleCount, scrollTop, data], () => {
      if (lockScrollRef.value) return;
      updateRangeState();
    });

    // 开始和结束元素变化后需要更新偏移
    watch(rangeState, () => {
      updateScrollOffset();
    });

    return {
      viewportRef,
      viewportHeight,
      totalHeight,
      startOffset,
      isVirtual,
      renderChildren,
      handleResize,
      handleScroll,
      scrollTo,
    };
  },
});
</script>
