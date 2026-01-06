import { Dayjs } from 'dayjs';
import { dayjs, methods } from '../../_utils/date';
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
  mode?: Mode
): boolean {
  if (typeof disabledDate !== 'function') {
    return false;
  }
  // Whether cellDate is disabled in range
  const getDisabledFromRange = (
    currentMode: 'date' | 'month' | 'year',
    start: number,
    end: number
  ) => {
    let current = start;
    while (current <= end) {
      let date: Dayjs;
      switch (currentMode) {
        case 'date': {
          date = methods.set(cellDate, 'date', current);
          if (!disabledDate(date.toDate())) {
            return false;
          }
          break;
        }
        case 'month': {
          date = methods.set(cellDate, 'month', current);
          if (!isDisabledDate(date, disabledDate, 'month')) {
            return false;
          }
          break;
        }
        case 'year': {
          date = methods.set(cellDate, 'year', current);
          if (!isDisabledDate(date, disabledDate, 'year')) {
            return false;
          }
          break;
        }
        default:
          break;
      }
      current += 1;
    }
    return true;
  };
  switch (mode) {
    case 'date':
    case 'week': {
      return disabledDate(cellDate.toDate());
    }
    case 'month': {
      const startDate = 1;
      const endDate = cellDate.endOf('month').get('date');
      return getDisabledFromRange('date', startDate, endDate);
    }
    case 'quarter': {
      const startMonth = Math.floor(cellDate.get('month') / 3) * 3;
      const endMonth = startMonth + 2;
      return getDisabledFromRange('month', startMonth, endMonth);
    }
    case 'year': {
      return getDisabledFromRange('month', 0, 11);
    }
    default:
      return false;
  }
}
