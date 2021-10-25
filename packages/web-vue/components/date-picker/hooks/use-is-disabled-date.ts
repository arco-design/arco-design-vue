import { computed, toRefs } from 'vue';
import { Dayjs } from 'dayjs';
import {
  DisabledDate,
  DisabledTime,
  RangeDisabledDate,
  RangeDisabledTime,
} from '../interface';

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
      if (isRange?.value)
        return (disabledDate.value as RangeDisabledDate)(current, type);
      return (disabledDate.value as DisabledDate)(current);
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

      const disabledTimeProps = isRange?.value
        ? (disabledTime.value as RangeDisabledTime)(current, type)
        : (disabledTime.value as DisabledTime)(current);

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
