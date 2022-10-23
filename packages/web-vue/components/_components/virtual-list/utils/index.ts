import { VirtualItemKey } from '../interface';

/**
 * 获取有效的scrollTop值
 * Safari的缓动效果会获得负值的scrollTop
 */
export function getValidScrollTop(scrollTop: number, scrollRange: number) {
  return scrollTop < 0 ? 0 : scrollTop > scrollRange ? scrollRange : scrollTop;
}

/**
 * 获取滚动比例
 * 视口已滚动距离 / 总可滚动距离
 */
export function getScrollPercentage({
  scrollTop,
  scrollHeight,
  clientHeight,
}: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}) {
  const scrollLength = scrollHeight - clientHeight;
  return scrollLength
    ? getValidScrollTop(scrollTop, scrollLength) / scrollLength
    : 0;
}

/**
 * 根据滚动条当前的滚动百分比，计算出基准元素（滚动位置对应的元素）
 * 在基准元素的上方和下方渲染可见区域的其他元素
 */
export function getLocationItem(scrollPtg: number, itemCount: number) {
  const itemIndex = Math.floor(scrollPtg * itemCount);
  const itemTopPtg = itemIndex / itemCount;
  // The ratio of the top edge of the datum element beyond the scroll position
  const offsetPtg = (scrollPtg - itemTopPtg) / (1 / itemCount);

  return {
    index: itemIndex,
    // scrollPtg >= itemTopPtg, the calculation result is the offset of the scroll distance that the element should add to its height
    offsetPtg: Number.isNaN(offsetPtg) ? 0 : offsetPtg,
  };
}

/**
 * 计算需要渲染的元素的开始下标、结束下标和用于定位的元素下标
 */
export function getRangeIndex(
  scrollPtg: number,
  itemCount: number,
  visibleCount: number
) {
  const { index, offsetPtg } = getLocationItem(scrollPtg, itemCount);

  const beforeCount = Math.ceil(scrollPtg * visibleCount);
  const afterCount = Math.ceil((1 - scrollPtg) * visibleCount);

  return {
    itemIndex: index,
    itemOffsetPtg: offsetPtg,
    startIndex: Math.max(0, index - beforeCount),
    endIndex: Math.min(itemCount - 1, index + afterCount),
  };
}

interface ItemTopConfig {
  itemHeight: number;
  itemOffsetPtg: number;
  scrollTop: number;
  scrollPtg: number;
  clientHeight: number;
}

/**
 * 计算元素相对于视口顶部的偏移量
 */
export function getItemRelativeTop({
  itemHeight,
  itemOffsetPtg,
  scrollPtg,
  clientHeight,
}: Omit<ItemTopConfig, 'scrollTop'>) {
  if (scrollPtg === 1) return clientHeight - itemHeight;
  return clientHeight * scrollPtg - itemHeight * itemOffsetPtg;
}

/**
 * 计算元素相对于整个滚动区域顶部的偏移量
 */
export function getItemAbsoluteTop({ scrollTop, ...rest }: ItemTopConfig) {
  return scrollTop + getItemRelativeTop(rest);
}

interface CompareItemConfig {
  locatedItemRelativeTop: number;
  locatedItemIndex: number;
  compareItemIndex: number;
  getItemKeyByIndex: (index: number) => VirtualItemKey;
  startIndex: number;
  endIndex: number;
  getItemHeightOrDefault: (key: VirtualItemKey) => number;
}

/**
 * 计算某一指定下标的元素相对于视口顶部的偏移量
 */
export function getCompareItemRelativeTop({
  locatedItemRelativeTop,
  locatedItemIndex,
  compareItemIndex,
  startIndex,
  endIndex,
  getItemKeyByIndex,
  getItemHeightOrDefault,
}: CompareItemConfig) {
  let compareItemTop = locatedItemRelativeTop;
  const compareItemKey = getItemKeyByIndex(compareItemIndex);

  if (compareItemIndex <= locatedItemIndex) {
    for (let index = locatedItemIndex; index >= startIndex; index -= 1) {
      const key = getItemKeyByIndex(index);
      if (key === compareItemKey) {
        break;
      }

      const prevItemKey = getItemKeyByIndex(index - 1);
      compareItemTop -= getItemHeightOrDefault(prevItemKey);
    }
  } else {
    for (let index = locatedItemIndex; index <= endIndex; index += 1) {
      const key = getItemKeyByIndex(index);
      if (key === compareItemKey) {
        break;
      }

      compareItemTop += getItemHeightOrDefault(key);
    }
  }

  return compareItemTop;
}
