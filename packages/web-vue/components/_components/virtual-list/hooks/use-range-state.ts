import { reactive, computed, watch, Ref, nextTick } from 'vue';
import {
  getItemAbsoluteTop,
  getLocationItem,
  getRangeIndex,
  getScrollPercentage,
} from '../utils';

interface RangeState {
  itemIndex: number;
  itemOffsetPtg: number;
  startIndex: number;
  endIndex: number;
  startItemTop: number;
  status: 'MEASURE_START' | 'MEASURE_DONE' | 'NONE';
}

export function useRangeState(props: {
  viewportRef: Ref<HTMLElement | undefined>;
  visibleCount: Ref<number>;
  itemCount: Ref<number>;
  getItemHeightOrDefaultByIndex: (index: number) => number;
}) {
  const {
    viewportRef,
    visibleCount,
    itemCount,
    getItemHeightOrDefaultByIndex,
  } = props;

  const rangeState = reactive<RangeState>({
    itemIndex: 0,
    itemOffsetPtg: 0,
    startIndex: 0,
    endIndex: visibleCount.value,
    startItemTop: 0,
    status: 'NONE',
  });

  // 记录滚动列表的 paddingTop 用于校正滚动距离
  const scrollListPadding = computed(() => {
    if (viewportRef.value) {
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

  const updateRangeState = () => {
    if (!viewportRef.value) return;

    const { scrollTop, clientHeight, scrollHeight } = viewportRef.value;

    const scrollPtg = getScrollPercentage({
      scrollTop,
      clientHeight,
      scrollHeight,
    });

    const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
      scrollPtg,
      itemCount.value,
      visibleCount.value
    );

    rangeState.itemIndex = Math.min(itemCount.value - 1, itemIndex);
    rangeState.itemOffsetPtg = itemOffsetPtg;
    rangeState.startIndex = startIndex;
    rangeState.endIndex = endIndex;
    rangeState.status = 'MEASURE_START';
  };

  const updateLocationState = () => {
    if (!viewportRef.value) return;

    const { scrollTop, clientHeight, scrollHeight } = viewportRef.value;

    const scrollPtg = getScrollPercentage({
      scrollTop,
      clientHeight,
      scrollHeight,
    });

    const { index, offsetPtg } = getLocationItem(scrollPtg, itemCount.value);

    rangeState.itemIndex = index;
    rangeState.itemOffsetPtg = offsetPtg;
  };

  const updateStartItemTop = () => {
    if (!viewportRef.value) return;

    const { scrollTop, clientHeight, scrollHeight } = viewportRef.value;

    const scrollPtg = getScrollPercentage({
      scrollTop,
      clientHeight,
      scrollHeight,
    });

    let newStartItemTop = getItemAbsoluteTop({
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
      newStartItemTop -= getItemHeightOrDefaultByIndex(index);
    }

    rangeState.startItemTop = newStartItemTop;
    rangeState.status = 'MEASURE_DONE';
  };

  watch(rangeState, () => {
    if (rangeState.status === 'MEASURE_START') {
      nextTick(() => {
        updateStartItemTop();
      });
    }
  });

  return {
    rangeState,
    updateRangeState,
    updateLocationState,
  };
}
