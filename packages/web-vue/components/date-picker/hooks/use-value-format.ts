import { Dayjs } from 'dayjs';
import { toRefs } from 'vue';
import { toLocal } from '../../_utils/date';
import { CalendarValue, ValueFormat } from '../interface';

export function getReturnValue(
  date: Dayjs,
  format: ValueFormat,
  utcOffset?: number,
  timezone?: string
) {
  const localDate = toLocal(date, utcOffset, timezone);

  if (format === 'timestamp') {
    return localDate.toDate().getTime();
  }
  if (format === 'Date') {
    return localDate.toDate();
  }
  return localDate.format(format);
}

export function useReturnValue(props: {
  format: ValueFormat;
  utcOffset?: number;
  timezone?: string;
}) {
  const { format, utcOffset, timezone } = toRefs(props);

  return (date: Dayjs) =>
    getReturnValue(date, format.value, utcOffset?.value, timezone?.value);
}

export function getReturnRangeValue(
  dates: Dayjs[],
  format: ValueFormat,
  utcOffset?: number,
  timezone?: string
): CalendarValue[];
export function getReturnRangeValue(
  dates: (Dayjs | undefined)[],
  format: ValueFormat,
  utcOffset?: number,
  timezone?: string
): (CalendarValue | undefined)[];
export function getReturnRangeValue(
  dates: (Dayjs | undefined)[],
  format: ValueFormat,
  utcOffset?: number,
  timezone?: string
) {
  return dates.map((date) =>
    date ? getReturnValue(date, format, utcOffset, timezone) : undefined
  );
}
