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
import { useScrollTo, RelativeScroll } from './hooks/use-scroll-to';
import {
  getScrollPercentage,
  getValidScrollTop,
  getItemRelativeTop,
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
    const { rangeState, updateRangeState, updateLocationState } = useRangeState(
      {
        viewportRef,
        itemCount,
        visibleCount,
        getItemHeightOrDefaultByIndex,
      }
    );

    const isVirtual = computed(
      () =>
        threshold?.value !== null &&
        (threshold?.value === undefined ||
          itemCount.value >= threshold.value) &&
        totalHeight.value > viewportHeight.value
    );

    const visibleData = computed(() => {
      if (!isVirtual.value) {
        return internalData.value;
      }
      const start = rangeState.startIndex;
      const end = Math.min(rangeState.endIndex + 1, itemCount.value);
      return internalData.value.slice(start, end);
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
          if (
            el &&
            rangeState.status === 'MEASURE_START' &&
            isUndefined(getItemHeight(key))
          ) {
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

    const virtualScrollHandler = (e: UIEvent | null, force = false) => {
      if (!viewportRef.value) return;

      const {
        scrollTop: rawScrollTop,
        clientHeight,
        scrollHeight,
      } = viewportRef.value;

      const newScrollTop = getValidScrollTop(
        rawScrollTop,
        scrollHeight - clientHeight
      );

      if (!force && (newScrollTop === scrollTop.value || lockScrollRef.value)) {
        return;
      }

      scrollTop.value = newScrollTop;
      updateRangeState();
      emit('scroll', e);
    };

    const rawScrollHandler = (e: UIEvent) => {
      if (!viewportRef.value) return;

      const {
        scrollTop: rawScrollTop,
        clientHeight,
        scrollHeight,
      } = viewportRef.value;

      const newScrollTop = getValidScrollTop(
        rawScrollTop,
        scrollHeight - clientHeight
      );

      scrollTop.value = newScrollTop;
      updateLocationState();
      emit('scroll', e);
    };

    const handleScroll = (e: any) => {
      // console.log('scroll', e.target.scrollTop, e.target.scrollHeight);
      if (isVirtual.value) {
        virtualScrollHandler(e);
      } else {
        rawScrollHandler(e);
      }
    };

    const scrollTo = (options: ScrollOptions) => {
      rafIdRef.value && caf(rafIdRef.value);
      rafIdRef.value = raf(() => {
        const prepareScrollResult = prepareScrollTo(options);
        if (prepareScrollResult) {
          const { itemIndex, align, clientHeight } = prepareScrollResult;
          rangeState.startIndex = prepareScrollResult.startIndex;
          rangeState.endIndex = prepareScrollResult.endIndex;
          nextTick(() => {
            const indexItemHeight = getItemHeightOrDefaultByIndex(itemIndex);
            const itemRelativeTop =
              align === 'top' ? 0 : clientHeight - indexItemHeight;
            innerScrollTo({
              itemIndex,
              relativeTop: itemRelativeTop,
            });
          });
        }
      });
    };

    const innerScrollTo = (options: RelativeScroll) => {
      if (!viewportRef.value) return;

      const fixScrollResult = fixScrollTo(options);

      if (fixScrollResult) {
        lockScrollRef.value = true;
        viewportRef.value.scrollTop = fixScrollResult.scrollTop;
        rangeState.itemIndex = fixScrollResult.itemIndex;
        rangeState.itemOffsetPtg = fixScrollResult.itemOffsetPtg;
        rangeState.startIndex = fixScrollResult.startIndex;
        rangeState.endIndex = fixScrollResult.endIndex;
        rangeState.status = 'MEASURE_START';
      }

      rafIdRef.value = raf(() => {
        lockScrollRef.value = false;
      });
    };

    watch([visibleCount], () => {
      virtualScrollHandler(null, true);
    });

    watch([isVirtual], (_, [oldIsVirtual]) => {
      if (isVirtual.value !== oldIsVirtual) {
        nextTick(() => {
          if (!viewportRef.value) return;
          const { clientHeight } = viewportRef.value;
          const locatedItemRelativeTop = getItemRelativeTop({
            itemHeight: getItemHeightOrDefaultByIndex(rangeState.itemIndex),
            itemOffsetPtg: rangeState.itemOffsetPtg,
            scrollPtg: getScrollPercentage({
              scrollTop: scrollTop.value,
              scrollHeight: totalHeight.value,
              clientHeight,
            }),
            clientHeight,
          });
          if (!isVirtual.value) {
            let rawScrollTop = locatedItemRelativeTop;
            for (let i = 0; i < rangeState.itemIndex; i++) {
              rawScrollTop -= getItemHeightOrDefaultByIndex(i);
            }
            viewportRef.value.scrollTop = -rawScrollTop;
          } else {
            innerScrollTo({
              itemIndex: rangeState.itemIndex,
              relativeTop: locatedItemRelativeTop,
            });
          }
        });
      }
    });

    return {
      viewportRef,
      viewportHeight,
      totalHeight,
      startOffset: computed(() =>
        rangeState.status === 'MEASURE_DONE' ? rangeState.startItemTop : 0
      ),
      isVirtual,
      renderChildren,
      handleResize,
      handleScroll,
      scrollTo,
    };
  },
});
</script>
