import {computed, toRefs} from "vue";
import {Dayjs} from "dayjs";
import {DisabledDate, DisabledTime, RangeDisabledDate, RangeDisabledTime} from "../interface";
import {getDateValue} from "../../_utils/date";

interface IsDisabledProps {
  disabledMonth?: DisabledTime | RangeDisabledTime;
  mode?: string;
  isRange?: boolean;
}

export default function useIsDisabledMonth(props: IsDisabledProps) {
  const { disabledMonth, isRange, mode } = toRefs(props);
  const isDisabledMonth = computed(() => {
    return (current: Dayjs, type: 'start' | 'end') => {
      if (!disabledMonth?.value) return false;

      const dateValue = getDateValue(current);

      if (isRange?.value)
        return (disabledMonth.value as RangeDisabledDate)(dateValue, type);

      return (disabledMonth.value as DisabledDate)(dateValue);
    };
  });
  return function isDisabled(value: Dayjs | undefined, type?: 'start' | 'end') {
    return (
      value && isDisabledMonth.value(value, type || 'start')
    );
  };
}
