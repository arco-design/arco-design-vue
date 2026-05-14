import { computed, onMounted, type Ref, ref } from 'vue';

export const useVirtualSize = ({
  dataKeys,
  fixedSize,
  estimatedSize,
  overscan,
  visibleCount,
}: {
  dataKeys: Ref<(string | number)[]>;
  fixedSize: Ref<boolean>;
  estimatedSize: Ref<number | undefined>;
  overscan: Ref<number>;
  visibleCount: Ref<number>;
}) => {
  const firstRangeAverageSize = ref(0);
  const sizeMap = new Map<string | number, number>();
  const fallbackEstimatedSize = computed(() => estimatedSize.value ?? 30);

  const total = computed(() => dataKeys.value.length);
  const start = ref(0);
  const range = computed(() => {
    return Math.max(visibleCount.value + overscan.value * 2, 1);
  });
  const end = computed(() => {
    const nextEnd = start.value + range.value;
    if (nextEnd > total.value) {
      return total.value;
    }
    return nextEnd;
  });
  const maxStart = computed(() => {
    const max = total.value - range.value;
    if (max < 0) {
      return 0;
    }
    return max;
  });

  const setStart = (index: number) => {
    if (index < 0) {
      start.value = 0;
    } else if (index > maxStart.value) {
      start.value = maxStart.value;
    } else {
      start.value = index;
    }
  };

  const isFixed = ref(fixedSize.value);
  const resolvedEstimatedSize = computed(() => {
    if (fallbackEstimatedSize.value !== 30) {
      return fallbackEstimatedSize.value;
    }

    return firstRangeAverageSize.value || fallbackEstimatedSize.value;
  });

  const setItemSize = (key: string | number, size: number) => {
    sizeMap.set(key, size);
  };

  const getItemSize = (index: number) => {
    if (isFixed.value) {
      return resolvedEstimatedSize.value;
    }

    const key = dataKeys.value[index];
    if (key === undefined) {
      return resolvedEstimatedSize.value;
    }

    return sizeMap.get(key) ?? resolvedEstimatedSize.value;
  };

  const hasItemSize = (key: string | number) => {
    return sizeMap.has(key);
  };

  onMounted(() => {
    const firstRangeTotalSize = Array.from(sizeMap.values()).reduce((sum, value) => sum + value, 0);
    if (firstRangeTotalSize > 0) {
      firstRangeAverageSize.value = firstRangeTotalSize / sizeMap.size;
    }
  });

  const getOffset = (startIndex: number, endIndex: number) => {
    let offset = 0;

    for (let index = startIndex; index < endIndex; index++) {
      offset += getItemSize(index);
    }

    return offset;
  };

  const getScrollOffset = (index: number) => {
    if (isFixed.value) {
      return resolvedEstimatedSize.value * index;
    }

    return getOffset(0, index);
  };

  const frontPadding = computed(() => {
    if (isFixed.value) {
      return resolvedEstimatedSize.value * start.value;
    }

    return getOffset(0, start.value);
  });

  const getStartByScroll = (scrollOffset: number) => {
    // Convert scrollTop to an absolute anchor index to avoid start-dependent oscillation.
    let offset = scrollOffset;
    let anchorIndex = 0;

    while (offset > 0 && anchorIndex < total.value) {
      offset -= getItemSize(anchorIndex);
      anchorIndex += 1;
    }

    const nextStart = anchorIndex - overscan.value;
    if (nextStart < 0) {
      return 0;
    }
    if (nextStart > maxStart.value) {
      return maxStart.value;
    }
    return nextStart;
  };

  const behindPadding = computed(() => {
    if (isFixed.value) {
      return resolvedEstimatedSize.value * (total.value - end.value);
    }

    return getOffset(end.value, total.value);
  });

  return {
    frontPadding,
    behindPadding,
    start,
    end,
    getStartByScroll,
    setItemSize,
    hasItemSize,
    setStart,
    getScrollOffset,
    getItemSize,
  };
};
