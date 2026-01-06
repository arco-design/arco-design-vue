import { Dayjs } from 'dayjs';
import { isArray, isDayjs, isUndefined } from '../../_utils/is';
import { CalendarValue, DisabledDate, Mode } from '../interface';

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

export function isDisabledDate(
  cellDate: Dayjs,
  disabledDate?: DisabledDate,
  mode: Mode = 'date'
): boolean {
  if (typeof disabledDate !== 'function') return false;

  const checkDate = (date: Dayjs) => disabledDate(date.toDate());

  switch (mode) {
    case 'date':
    case 'week':
      return checkDate(cellDate);

    case 'month': {
      const days = cellDate.daysInMonth();
      for (let d = 1; d <= days; d++) {
        if (!checkDate(cellDate.date(d))) return false;
      }
      return true;
    }

    case 'quarter': {
      const startMonth = Math.floor(cellDate.month() / 3) * 3;
      for (let m = startMonth; m < startMonth + 3; m++) {
        const monthDate = cellDate.month(m);
        const days = monthDate.daysInMonth();
        for (let d = 1; d <= days; d++) {
          if (!checkDate(monthDate.date(d))) return false;
        }
      }
      return true;
    }

    case 'year': {
      for (let m = 0; m < 12; m++) {
        const monthDate = cellDate.month(m);
        const days = monthDate.daysInMonth();
        for (let d = 1; d <= days; d++) {
          if (!checkDate(monthDate.date(d))) return false;
        }
      }
      return true;
    }

    default:
      return false;
  }
}
