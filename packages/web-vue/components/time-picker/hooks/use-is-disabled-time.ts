import { Dayjs } from 'dayjs';
import { isArray } from '../../_utils/is';
import { TimePickerProps } from '../interface';
import { isDisabledTime } from '../utils';

export default function useIsDisabledTime(props: {
  disabledHours: TimePickerProps['disabledHours'];
  disabledMinutes: TimePickerProps['disabledMinutes'];
  disabledSeconds: TimePickerProps['disabledSeconds'];
}) {
  const isDisabled = (value: Dayjs | undefined) => {
    return isDisabledTime(value, {
      disabledHours: props.disabledHours,
      disabledMinutes: props.disabledMinutes,
      disabledSeconds: props.disabledSeconds,
    });
  };

  return (value: Array<Dayjs | undefined> | Dayjs | undefined) => {
    return isArray(value)
      ? value.some((i) => isDisabled(i))
      : isDisabled(value);
  };
}
