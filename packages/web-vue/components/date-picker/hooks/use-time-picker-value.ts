import { reactive, toRefs, Ref, ref, watch, computed } from 'vue';
import { Dayjs } from 'dayjs';
import useTimeFormat from '../../time-picker/hooks/use-time-format';
import { getDayjsValue, getNow } from '../../_utils/date';
import { TimePickerProps, TimeValue } from '../../time-picker/interface';

interface TimePickerValueProps {
  timePickerProps: Partial<TimePickerProps> | undefined;
  selectedValue: Dayjs | undefined;
}
export default function useTimePickerValue(
  props: TimePickerValueProps
): [Ref<Dayjs>, (val: Dayjs | undefined) => void, () => void] {
  const { timePickerProps, selectedValue } = toRefs(props);

  const timePickerPropsFormat = computed(() => timePickerProps?.value?.format);
  const timePickerPropsUse12Hours = computed(
    () => !!timePickerProps?.value?.use12Hours
  );

  const { format } = useTimeFormat(
    reactive({
      format: timePickerPropsFormat,
      use12Hours: timePickerPropsUse12Hours,
    })
  );

  const defaultTimePickerValue = computed(() =>
    getDayjsValue(
      timePickerProps?.value?.defaultValue as TimeValue | undefined,
      format.value
    )
  );

  const getDefaultValue = () =>
    selectedValue?.value || defaultTimePickerValue.value || getNow();

  const timePickerValue = ref(getDefaultValue());

  function setTimePickerValue(val: Dayjs | undefined) {
    if (val) {
      timePickerValue.value = val;
    }
  }

  function resetTimePickerValue() {
    timePickerValue.value = getDefaultValue();
  }

  watch(selectedValue, (newVal) => {
    setTimePickerValue(newVal);
  });

  return [timePickerValue, setTimePickerValue, resetTimePickerValue];
}
