import { computed, ref, watch, toRefs } from 'vue';
import { InternalDataItem, VirtualItemKey } from '../interface';

// 默认的元素高度
const DEFAULT_ITEM_HEIGHT = 32;

export function useItemHeight(props: {
  estimatedItemHeight?: number;
  data: InternalDataItem[];
}) {
  const { estimatedItemHeight: propEstimatedItemHeight, data } = toRefs(props);
  const itemHeightCacheMap = ref<Map<VirtualItemKey, number>>(new Map());
  const estimatedItemHeight = ref(propEstimatedItemHeight?.value);

  // 利用第一批显示的元素计算预估高度：取平均值
  const itemLength = computed(() => itemHeightCacheMap.value.size);
  watch(itemLength, () => {
    if (itemLength.value && !estimatedItemHeight.value) {
      estimatedItemHeight.value =
        [...itemHeightCacheMap.value.entries()].reduce(
          (sum, [, height]) => sum + height,
          0
        ) / itemLength.value;
    }
  });

  const itemHeight = computed(
    () => estimatedItemHeight.value || DEFAULT_ITEM_HEIGHT
  );

  // 只计算一次最小高度，避免抖动
  const minItemHeight = computed(() =>
    Math.min(itemHeight.value, DEFAULT_ITEM_HEIGHT)
  );

  // 总高度只需要一个范围，无需准确值
  const totalHeight = computed(() => itemHeight.value * data.value.length);

  function setItemHeight(key: VirtualItemKey, height: number) {
    itemHeightCacheMap.value.set(key, height);
  }

  function getItemHeight(key: VirtualItemKey) {
    return itemHeightCacheMap.value.get(key);
  }

  function getItemHeightOrDefault(key: VirtualItemKey) {
    return itemHeightCacheMap.value.get(key) || itemHeight.value;
  }

  function getItemHeightByIndex(index: number) {
    const { key } = data.value[index];
    return itemHeightCacheMap.value.get(key);
  }

  function getItemHeightOrDefaultByIndex(index: number) {
    return getItemHeightByIndex(index) || itemHeight.value;
  }

  return {
    itemHeight,
    minItemHeight,
    estimatedItemHeight,
    totalHeight,
    setItemHeight,
    getItemHeight,
    getItemHeightOrDefault,
    getItemHeightByIndex,
    getItemHeightOrDefaultByIndex,
  };
}
