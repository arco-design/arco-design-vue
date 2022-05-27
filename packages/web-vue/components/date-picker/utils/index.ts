import { Dayjs } from 'dayjs';
import { dayjs } from '../../_utils/date';
import { isArray, isDayjs, isUndefined } from '../../_utils/is';
import { CalendarValue } from '../interface';

export function newArray<T>(length: number) {
  return [...Array<T>(length)];
}

export function normalizeRangeValue(
  value: (CalendarValue | undefined)[] | CalendarValue | undefined
) {
  if (isUndefined(value)) {
    return undefined;
  }
  return isArray(value) ? value : [value, undefined];
}

export function isCompleteRangeValue(
  value: Array<Dayjs | undefined> | undefined
): value is [Dayjs, Dayjs] {
  return !!value && isDayjs(value[0]) && isDayjs(value[1]);
}

export function isValidRangeValue(
  value: Array<Dayjs | undefined> | undefined
): value is undefined | [] | [Dayjs, Dayjs] {
  return (
    isUndefined(value) || value.length === 0 || isCompleteRangeValue(value)
  );
}

export function mergeValueWithTime(
  defaultValue: Dayjs,
  dateValue?: Dayjs,
  timeValue?: Dayjs
) {
  const dateVal = dateValue || defaultValue;
  const timeVal = timeValue || defaultValue;
  return timeVal
    .set('year', dateVal.year())
    .set('month', dateVal.month())
    .set('date', dateVal.date());
}
