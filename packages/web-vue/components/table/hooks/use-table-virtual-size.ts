import { computed, onMounted, type Ref, ref } from 'vue';

export const useTableVirtualSize = ({
  dataKeys,
  fixedSize,
  estimatedSize,
  buffer,
}: {
  dataKeys: Ref<(string | number)[]>;
  fixedSize: Ref<boolean>;
  estimatedSize: Ref<number | undefined>;
  buffer: Ref<number>;
}) => {
  const firstRangeAverageSize = ref(0);
  const sizeMap = new Map<string | number, number>();
  const fallbackEstimatedSize = computed(() => estimatedSize.value ?? 30);

  const total = computed(() => dataKeys.value.length);
  const start = ref(0);
  const end = computed(() => {
    const nextEnd = start.value + buffer.value * 3;
    if (nextEnd > total.value) {
      return total.value;
    }
    return nextEnd;
  });
  const maxStart = computed(() => {
    const max = total.value - buffer.value * 3;
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

  const getOffsetIndex = (scrollOffset: number) => {
    const isForward = scrollOffset >= frontPadding.value;
    let offset = Math.abs(scrollOffset - frontPadding.value);
    const baseStart = isForward ? start.value : start.value - 1;
    let offsetIndex = 0;

    while (offset > 0) {
      offset -= getItemSize(baseStart + offsetIndex);
      if (isForward) {
        offsetIndex += 1;
      } else {
        offsetIndex -= 1;
      }
    }

    return offsetIndex;
  };

  const getStartByScroll = (scrollOffset: number) => {
    const offsetIndex = getOffsetIndex(scrollOffset);
    const nextStart = start.value + offsetIndex - buffer.value;
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
  };
};
