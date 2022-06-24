import { toRefs, computed } from 'vue';
import { getIndexByStartLoc } from '../utils/algorithm';
import {
  getScrollPercentage,
  getRangeIndex,
  getItemRelativeTop,
  getCompareItemRelativeTop,
} from '../utils';
import { InternalDataItem, VirtualItemKey, ScrollOptions } from '../interface';

export interface RelativeScroll {
  itemIndex: number;
  relativeTop: number;
}

export function useScrollTo(props: {
  isVirtual: boolean;
  isStaticItemHeight: boolean;
  data: InternalDataItem[];
  viewportRef: HTMLElement | undefined;
  rangeState: {
    itemIndex: number;
    itemOffsetPtg: number;
    startIndex: number;
    endIndex: number;
  };
  scrollTop: number;
  visibleCount: number;
  getItemHeightOrDefault: (key: VirtualItemKey) => number;
  getItemHeightOrDefaultByIndex: (index: number) => number;
}) {
  const {
    isVirtual,
    isStaticItemHeight,
    data,
    rangeState,
    viewportRef,
    scrollTop,
    visibleCount,
    getItemHeightOrDefault,
    getItemHeightOrDefaultByIndex,
  } = toRefs(props);

  const itemCount = computed(() => data.value.length);

  const getItemKeyByIndex = (index: number) => data.value[index]?.key;

  const fixScrollTo = (relativeScroll: RelativeScroll) => {
    if (!viewportRef.value) return null;

    const { itemIndex: compareItemIndex, relativeTop: compareItemRelativeTop } =
      relativeScroll;

    const { scrollHeight, clientHeight } = viewportRef.value;
    const originScrollTop = scrollTop.value;
    const maxScrollTop = scrollHeight - clientHeight;

    let bestSimilarity = Number.MAX_VALUE;
    let bestScrollTop = -1;
    let bestItemIndex = -1;
    let bestItemOffsetPtg = -1;
    let bestStartIndex = -1;
    let bestEndIndex = -1;
    let missSimilarity = 0;

    for (let i = 0; i < maxScrollTop; i++) {
      const scrollTop = getIndexByStartLoc(0, maxScrollTop, originScrollTop, i);
      const scrollPtg = getScrollPercentage({
        scrollTop,
        scrollHeight,
        clientHeight,
      });
      const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
        scrollPtg,
        itemCount.value,
        visibleCount.value
      );

      if (startIndex <= compareItemIndex && compareItemIndex <= endIndex) {
        const locatedItemRelativeTop = getItemRelativeTop({
          itemHeight: getItemHeightOrDefaultByIndex.value(itemIndex),
          itemOffsetPtg,
          clientHeight,
          scrollPtg,
        });

        const compareItemTop = getCompareItemRelativeTop({
          locatedItemRelativeTop,
          locatedItemIndex: itemIndex,
          compareItemIndex,
          startIndex,
          endIndex,
          getItemKeyByIndex,
          getItemHeightOrDefault: getItemHeightOrDefault.value,
        });

        const similarity = Math.abs(compareItemTop - compareItemRelativeTop);
        if (similarity < bestSimilarity) {
          bestSimilarity = similarity;
          bestScrollTop = scrollTop;
          bestItemIndex = itemIndex;
          bestItemOffsetPtg = itemOffsetPtg;
          bestStartIndex = startIndex;
          bestEndIndex = endIndex;

          missSimilarity = 0;
        } else {
          missSimilarity += 1;
        }
      }

      if (missSimilarity > 10) {
        break;
      }
    }

    return bestScrollTop === -1
      ? null
      : {
          scrollTop: bestScrollTop,
          itemIndex: bestItemIndex,
          itemOffsetPtg: bestItemOffsetPtg,
          startIndex: bestStartIndex,
          endIndex: bestEndIndex,
        };
  };

  const prepareScrollTo = (options: ScrollOptions) => {
    if (!viewportRef.value) return null;

    if (typeof options === 'number') {
      viewportRef.value.scrollTop = options;
      return null;
    }

    const index =
      'index' in options
        ? (options.index as number)
        : 'key' in options
        ? data.value.findIndex((item) => item.key === options.key)
        : 0;
    const item = data.value[index];

    if (!item) {
      return null;
    }

    let align = options.align || 'auto';
    const { clientHeight, scrollTop } = viewportRef.value;

    if (isVirtual.value && !isStaticItemHeight.value) {
      if (align === 'auto') {
        const { itemIndex, itemOffsetPtg } = rangeState.value;
        if (Math.abs(itemIndex - index) < visibleCount.value) {
          let itemTop = getItemRelativeTop({
            itemHeight: getItemHeightOrDefaultByIndex.value(index),
            itemOffsetPtg,
            clientHeight,
            scrollPtg: getScrollPercentage(viewportRef.value),
          });

          if (index < itemIndex) {
            for (let i = index; i < itemIndex; i++) {
              itemTop -= getItemHeightOrDefaultByIndex.value(i);
            }
          } else {
            for (let i = itemIndex; i < index; i++) {
              itemTop += getItemHeightOrDefaultByIndex.value(i);
            }
          }

          // 目标元素位于视野之内时，直接退出
          if (itemTop < 0 || itemTop > clientHeight) {
            align = itemTop < 0 ? 'top' : 'bottom';
          } else {
            return null;
          }
        } else {
          align = index < itemIndex ? 'top' : 'bottom';
        }
      }

      return {
        itemIndex: index,
        relativeTop:
          align === 'top'
            ? 0
            : clientHeight - getItemHeightOrDefaultByIndex.value(index),
        startIndex: Math.max(0, index - visibleCount.value),
        endIndex: Math.min(itemCount.value - 1, index + visibleCount.value),
      };
    }

    const indexItemHeight = getItemHeightOrDefaultByIndex.value(index);
    let itemTop = 0;
    for (let i = 0; i < index; i++) {
      itemTop += getItemHeightOrDefaultByIndex.value(i);
    }
    const itemBottom = itemTop + indexItemHeight;

    if (align === 'auto') {
      if (itemTop < scrollTop) {
        align = 'top';
      } else if (itemBottom > scrollTop + clientHeight) {
        align = 'bottom';
      }
    }

    if (align === 'top') {
      viewportRef.value.scrollTop = itemTop;
    } else if (align === 'bottom') {
      viewportRef.value.scrollTop = itemTop - (clientHeight - indexItemHeight);
    }

    return null;
  };

  return {
    fixScrollTo,
    prepareScrollTo,
  };
}
