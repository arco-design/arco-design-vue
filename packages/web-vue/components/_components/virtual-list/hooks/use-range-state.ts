import { toRefs, reactive } from 'vue';
import { getRangeIndex, getScrollPercentage } from '../utils';
import { throttleByRaf } from '../../../_utils/throttle-by-raf';

export function useRangeState(props: {
  viewportRef: HTMLElement | undefined;
  visibleCount: number;
  itemCount: number;
}) {
  const { viewportRef, visibleCount, itemCount } = toRefs(props);

  const rangeState = reactive({
    itemIndex: 0,
    itemOffsetPtg: 0,
    startIndex: 0,
    endIndex: visibleCount.value,
  });

  const updateRangeState = () => {
    if (!viewportRef.value) return;

    const {
      scrollTop: rawScrollTop,
      clientHeight,
      scrollHeight,
    } = viewportRef.value;

    const scrollPtg = getScrollPercentage({
      scrollTop: rawScrollTop,
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
  };

  return {
    rangeState,
    updateRangeState: throttleByRaf(updateRangeState),
  };
}
