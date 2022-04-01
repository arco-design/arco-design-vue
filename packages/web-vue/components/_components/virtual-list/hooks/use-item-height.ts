import { computed, ref, watch, toRefs } from 'vue';
import { InternalDataItem, Key } from '../interface';

// 默认的元素高度
const DEFAULT_ITEM_HEIGHT = 32;

export function useItemHeight(props: {
  estimatedItemHeight?: number;
  data: InternalDataItem[];
}) {
  const { estimatedItemHeight: propEstimatedItemHeight, data } = toRefs(props);
  const itemHeightCacheMap = ref<{
    [key: string]: number;
  }>({});
  const estimatedItemHeight = ref(propEstimatedItemHeight?.value);

  // 利用第一批显示的元素计算预估高度：取平均值
  const itemLength = computed(
    () => Object.keys(itemHeightCacheMap.value).length
  );
  watch(itemLength, () => {
    if (itemLength.value && !estimatedItemHeight.value) {
      estimatedItemHeight.value =
        Object.entries(itemHeightCacheMap.value).reduce(
          (sum, [, height]) => sum + height,
          0
        ) / itemLength.value;
    }
  });

  const itemHeight = computed(
    () => estimatedItemHeight.value || DEFAULT_ITEM_HEIGHT
  );

  const minItemHeight = computed(() =>
    Math.min(...Object.values(itemHeightCacheMap.value), itemHeight.value)
  );

  const totalHeight = computed(() =>
    data.value.reduce((sum, { key }) => sum + getItemHeightOrDefault(key), 0)
  );

  function setItemHeight(key: Key, height: number) {
    itemHeightCacheMap.value[key] = height;
  }

  function getItemHeight(key: Key) {
    return itemHeightCacheMap.value[key];
  }

  function getItemHeightOrDefault(key: Key) {
    return itemHeightCacheMap.value[key] || itemHeight.value;
  }

  function getItemHeightByIndex(index: number) {
    const { key } = data.value[index];
    return itemHeightCacheMap.value[key];
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
