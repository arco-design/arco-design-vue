import { reactive, toRefs, computed, ComputedRef } from 'vue';
import { Dayjs } from 'dayjs';
import { isArray } from '../../_utils/is';
import { TimePickerProps } from '../../time-picker/interface';
import useTimePickerValue from './use-time-picker-value';

interface RangeTimePickerValueProps {
  timePickerProps?: Partial<TimePickerProps>;
  selectedValue: Array<Dayjs | undefined> | undefined;
}
export default function useRangeTimePickerValue(
  props: RangeTimePickerValueProps
): [
  ComputedRef<Dayjs[]>,
  (val: Array<Dayjs | undefined> | undefined) => void,
  () => void
] {
  const { timePickerProps, selectedValue } = toRefs(props);

  const startValue = computed(() => selectedValue?.value?.[0]);
  const endValue = computed(() => selectedValue?.value?.[1]);

  const timePickerDefaultValue = computed(
    () => timePickerProps?.value?.defaultValue
  );

  const startTimePickerProps = computed(() =>
    isArray(timePickerDefaultValue.value)
      ? {
          ...timePickerProps?.value,
          defaultValue: timePickerDefaultValue.value[0],
        }
      : timePickerProps?.value
  );
  const endTimePickerProps = computed(() =>
    isArray(timePickerDefaultValue.value)
      ? {
          ...timePickerProps?.value,
          defaultValue: timePickerDefaultValue.value[1],
        }
      : timePickerProps?.value
  );

  const [startTimeValue, setStartTimeValue, resetStartTimeValue] =
    useTimePickerValue(
      reactive({
        timePickerProps: startTimePickerProps,
        selectedValue: startValue,
      })
    );

  const [endTimeValue, setEndTimeValue, resetEndTimeValue] = useTimePickerValue(
    reactive({
      timePickerProps: endTimePickerProps,
      selectedValue: endValue,
    })
  );

  const rangeTimePickerValue = computed(() => [
    startTimeValue.value,
    endTimeValue.value,
  ]);

  function setTimeValue(val: Array<Dayjs | undefined> | undefined) {
    if (!val) return;
    setStartTimeValue(val[0]);
    setEndTimeValue(val[1]);
  }

  function resetTimeValue() {
    resetStartTimeValue();
    resetEndTimeValue();
  }

  return [rangeTimePickerValue, setTimeValue, resetTimeValue];
}
