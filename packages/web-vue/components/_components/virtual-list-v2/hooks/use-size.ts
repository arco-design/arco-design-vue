import { computed, onMounted, Ref, ref } from 'vue';

export const useSize = ({
  dataKeys,
  contentRef,
  fixedSize,
  estimatedSize,
  buffer,
}: {
  dataKeys: Ref<(string | number)[]>;
  contentRef: Ref<HTMLElement | undefined>;
  fixedSize: Ref<boolean>;
  estimatedSize: Ref<number | undefined>;
  buffer: Ref<number>;
}) => {
  const firstRangeAverageSize = ref(0);
  const sizeMap = new Map<string | number, number>();

  const total = computed(() => dataKeys.value.length);
  const start = ref(0);
  const end = computed(() => {
    const _end = start.value + buffer.value * 3;
    if (_end > total.value) return total.value;
    return _end;
  });
  const maxStart = computed(() => {
    const max = total.value - buffer.value * 3;
    if (max < 0) return 0;
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
  const _estimatedSize = computed(() => {
    if (estimatedSize.value !== 30) {
      return estimatedSize.value;
    }
    return firstRangeAverageSize.value || estimatedSize.value;
  });

  const setItemSize = (key: string | number, size: number) => {
    sizeMap.set(key, size);
  };

  const getItemSize = (index: number) => {
    if (isFixed.value) {
      return _estimatedSize.value;
    }

    const _key = dataKeys.value[index];
    return sizeMap.get(_key) ?? _estimatedSize.value;
  };

  const hasItemSize = (key: string | number) => {
    return sizeMap.has(key);
  };

  onMounted(() => {
    const firstRangeTotalSize = Array.from(sizeMap.values()).reduce(
      (pre, value) => pre + value,
      0
    );
    if (firstRangeTotalSize > 0) {
      firstRangeAverageSize.value = firstRangeTotalSize / sizeMap.size;
    }
  });

  const getScrollOffset = (index: number) => {
    if (isFixed.value) {
      return _estimatedSize.value * index;
    }
    return getOffset(0, index);
  };

  const getOffset = (start: number, end: number) => {
    let offset = 0;

    for (let i = start; i < end; i++) {
      offset += getItemSize(i);
    }

    return offset;
  };

  const frontPadding = computed(() => {
    if (isFixed.value) {
      return _estimatedSize.value * start.value;
    }
    return getOffset(0, start.value);
  });

  const getOffsetIndex = (scrollOffset: number) => {
    const isForward = scrollOffset >= frontPadding.value;
    let offset = Math.abs(scrollOffset - frontPadding.value);
    const _start = isForward ? start.value : start.value - 1;
    let offsetIndex = 0;
    while (offset > 0) {
      offset -= getItemSize(_start + offsetIndex);
      isForward ? offsetIndex++ : offsetIndex--;
    }
    return offsetIndex;
  };

  const getStartByScroll = (scrollOffset: number) => {
    const offsetIndex = getOffsetIndex(scrollOffset);
    const _start = start.value + offsetIndex - buffer.value;
    if (_start < 0) return 0;
    if (_start > maxStart.value) return maxStart.value;
    return _start;
  };

  const behindPadding = computed(() => {
    if (isFixed.value) {
      return _estimatedSize.value * (total.value - end.value);
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
