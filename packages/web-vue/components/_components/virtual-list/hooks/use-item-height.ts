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

  const totalHeight = computed(() =>
    data.value.reduce((sum, { key }) => sum + getItemHeightOrDefault(key), 0)
  );

  function setItemHeight(key: VirtualItemKey, height: number) {
    itemHeightCacheMap.value.set(key, height);
  }

  function getItemHeight(key: VirtualItemKey) {
    return itemHeightCacheMap.value.get(key);
  }

  function getItemHeightOrDefault(key: VirtualItemKey) {
    return itemHeightCacheMap.value.get(key) || itemHeight.value;
  }

  function getItemHeightByIndex(
    index: number,
    customData?: InternalDataItem[]
  ) {
    const item = (data.value || customData)[index];
    return item ? itemHeightCacheMap.value.get(item.key) : undefined;
  }

  function getItemHeightOrDefaultByIndex(
    index: number,
    customData?: InternalDataItem[]
  ) {
    return getItemHeightByIndex(index, customData) || itemHeight.value;
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
    getTotalHeight: (customData: InternalDataItem[]) => {
      return customData.reduce(
        (sum, item) => sum + getItemHeightOrDefault(item.key),
        0
      );
    },
  };
}
