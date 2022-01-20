import { computed, toRefs } from 'vue';
import { Dayjs } from 'dayjs';
import {
  DisabledDate,
  DisabledTime,
  RangeDisabledDate,
  RangeDisabledTime,
} from '../interface';
import { getDateValue } from '../../_utils/date';

interface IsDisabledProps {
  mode?: string;
  showTime?: boolean;
  disabledDate?: DisabledDate | RangeDisabledDate;
  disabledTime?: DisabledTime | RangeDisabledTime;
  isRange?: boolean;
}

export default function useIsDisabledDate(props: IsDisabledProps) {
  const { mode, showTime, disabledDate, disabledTime, isRange } = toRefs(props);
  const needCheckTime = computed(
    () => mode?.value === 'date' && showTime?.value
  );
  const isDisabledDate = computed(() => {
    return (current: Dayjs, type: 'start' | 'end') => {
      if (!disabledDate?.value) return false;

      const dateValue = getDateValue(current);

      if (isRange?.value)
        return (disabledDate.value as RangeDisabledDate)(dateValue, type);
      return (disabledDate.value as DisabledDate)(dateValue);
    };
  });

  const isDisabledItem = (num: number, getDisabledList?: () => number[]) => {
    const list = getDisabledList?.() || [];
    return list.includes(num);
  };

  const isDisabledTime = computed(() => {
    return (current: Dayjs, type: 'start' | 'end') => {
      if (!needCheckTime.value) return false;
      if (!disabledTime?.value) return false;

      const dateValue = getDateValue(current);

      const disabledTimeProps = isRange?.value
        ? (disabledTime.value as RangeDisabledTime)(dateValue, type)
        : (disabledTime.value as DisabledTime)(dateValue);

      return (
        isDisabledItem(current.hour(), disabledTimeProps.disabledHours) ||
        isDisabledItem(current.minute(), disabledTimeProps.disabledMinutes) ||
        isDisabledItem(current.second(), disabledTimeProps.disabledSeconds)
      );
    };
  });

  return function isDisabled(value: Dayjs | undefined, type?: 'start' | 'end') {
    return (
      value &&
      (isDisabledDate.value(value, type || 'start') ||
        isDisabledTime.value(value, type || 'start'))
    );
  };
}
