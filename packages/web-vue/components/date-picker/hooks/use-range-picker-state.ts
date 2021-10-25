import { Dayjs } from 'dayjs';
import { computed, toRefs, watch } from 'vue';
import { normalizeRangeValue } from '../utils';
import { getDayjsValue } from '../../_utils/date';
import { isUndefined } from '../../_utils/is';
import { CalendarValue } from '../interface';
import useState from '../../_hooks/use-state';

interface PickerStateProps {
  modelValue: (CalendarValue | undefined)[] | undefined;
  defaultValue: (CalendarValue | undefined)[] | undefined;
  format: string;
}

export default function useRangePickerState(props: PickerStateProps) {
  const { modelValue, defaultValue, format } = toRefs(props);

  const computedModelValue = computed(() => {
    return getDayjsValue(normalizeRangeValue(modelValue.value), format.value);
  });

  const computedDefaultValue = computed(() => {
    return getDayjsValue(normalizeRangeValue(defaultValue.value), format.value);
  });

  // Selected value maintained internally: dayjs
  const [localValue, setLocalValue] = useState<(Dayjs | undefined)[]>(
    !isUndefined(computedModelValue.value)
      ? computedModelValue.value
      : !isUndefined(computedDefaultValue.value)
      ? computedDefaultValue.value
      : []
  );

  watch(computedModelValue, () => {
    if (isUndefined(computedModelValue.value)) {
      setLocalValue([]);
    }
  });

  // 混合的最终值：如果外部有传的话，就用外部的值，不然就使用内部维护的值
  const mergeValue = computed(
    () => computedModelValue.value || localValue.value
  );

  return {
    value: mergeValue,
    setValue: setLocalValue,
  };
}
