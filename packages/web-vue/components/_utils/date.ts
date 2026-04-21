import originDayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { isDayjs, isArray, isQuarter } from './is';
import 'dayjs/locale/zh-cn';

const overwriteIsDayjs = (_: any, Dayjs: any, dayjs: any) => {
  // eslint-disable-next-line func-names
  dayjs = function (date: Dayjs, c: any) {
    if (isDayjs(date)) {
      return date.clone();
    }
    const cfg = typeof c === 'object' ? c : {};
    cfg.date = date;
    cfg.args = arguments; // eslint-disable-line prefer-rest-params
    return new Dayjs(cfg);
  };

  const proto = Dayjs.prototype;
  const old$Utils = proto.$utils;
  proto.$utils = () => {
    const newUtils = old$Utils();
    newUtils.i = isDayjs;
    return newUtils;
  };

  dayjs.isDayjs = isDayjs;
};

originDayjs.extend(overwriteIsDayjs);
originDayjs.extend(customParseFormat);
originDayjs.extend(isBetween);
originDayjs.extend(weekOfYear);
originDayjs.extend(AdvancedFormat);
originDayjs.extend(weekYear);
originDayjs.extend(QuarterOfYear);
originDayjs.extend(utc);
originDayjs.extend(timezone);

export const dayjs = originDayjs;

export const methods = {
  add(time: Dayjs, value: number, unit: UnitType) {
    return time.add(value, unit);
  },
  subtract(time: Dayjs, value: number, unit: UnitType) {
    return time.subtract(value, unit);
  },
  startOf(time: Dayjs, unit: OpUnitType) {
    return time.startOf(unit);
  },
  /**
   * Similar to `startOf`, returns start date of a week; used in week pickers
   * @param time Selected date
   * @param weekStart Start day of a week
   * @returns Start date of the week containing the selected date
   */
  startOfWeek(time: Dayjs, weekStart: number) {
    const currentDay = time.day();
    let startOfWeek = time.subtract(currentDay - weekStart, 'day');
    if (startOfWeek.isAfter(time)) {
      startOfWeek = startOfWeek.subtract(7, 'day');
    }
    return startOfWeek;
  },
  endOf(time: Dayjs, unit: OpUnitType) {
    return time.endOf(unit);
  },
  set(time: Dayjs, unit: UnitType, value: number) {
    return time.set(unit, value);
  },
  isSameWeek(date1: Dayjs, date2: Dayjs, weekStart: number) {
    // calculate week number of the given date considering the given start of week
    const getWeek = (date: Dayjs) => {
      const day = date.day();
      const diff = day - weekStart + (day < weekStart ? 7 : 0);
      return date.subtract(diff, 'day').week();
    };
    return getWeek(date1) === getWeek(date2);
  },
};

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5,
} as const;

const dtfCache: Record<string, Intl.DateTimeFormat> = {};

const getDateTimeFormat = (timeZone: string) => {
  const cacheKey = `${timeZone}`;
  let dtf = dtfCache[cacheKey];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    dtfCache[cacheKey] = dtf;
  }
  return dtf;
};

const makeFormatParts = (timestamp: number, timeZone: string) => {
  const date = new Date(timestamp);
  const dtf = getDateTimeFormat(timeZone);
  return dtf.formatToParts(date);
};

const timezoneOffset = (timestamp: number, timeZone: string) => {
  const formatResult = makeFormatParts(timestamp, timeZone);
  const filled: number[] = [];
  for (let i = 0; i < formatResult.length; i += 1) {
    const { type, value } = formatResult[i];
    const pos = typeToPos[type as keyof typeof typeToPos];

    if (typeof pos === 'number') {
      filled[pos] = parseInt(value, 10);
    }
  }
  const hour = filled[3];
  const fixedHour = hour === 24 ? 0 : hour;
  const utcTs = Date.UTC(
    filled[0],
    filled[1] - 1,
    filled[2],
    fixedHour,
    filled[4],
    filled[5],
    0
  );
  let asTs = +timestamp;
  const over = asTs % 1000;
  asTs -= over;
  return (utcTs - asTs) / (60 * 1000);
};

const fixTimezoneOffset = (
  localTs: number,
  offsetGuess: number,
  tz: string
) => {
  let utcGuess = localTs - offsetGuess * 60 * 1000;
  const offset2 = timezoneOffset(utcGuess, tz);

  if (offsetGuess === offset2) {
    return [utcGuess, offsetGuess] as const;
  }

  utcGuess -= (offset2 - offsetGuess) * 60 * 1000;
  const offset3 = timezoneOffset(utcGuess, tz);

  if (offset2 === offset3) {
    return [utcGuess, offset2] as const;
  }

  return [
    localTs - Math.min(offset2, offset3) * 60 * 1000,
    Math.max(offset2, offset3),
  ] as const;
};

export function timezoneToOffset(inputTs: number, timeZone: string) {
  const initialOffset = timezoneOffset(inputTs, timeZone);
  return fixTimezoneOffset(inputTs, initialOffset, timeZone)[1];
}

export function toTimezone(
  time: Dayjs,
  utcOffset?: number,
  timeZone?: string,
  local?: boolean
) {
  if (!time || (utcOffset === undefined && !timeZone)) {
    return time;
  }

  const localOffset = -time.toDate().getTimezoneOffset();
  const uOffset =
    utcOffset === undefined
      ? !timeZone
        ? localOffset
        : timezoneToOffset(time.valueOf(), timeZone)
      : utcOffset;

  const zoneOffset = Math.abs(uOffset) <= 16 ? uOffset * 60 : uOffset;
  const diffOffset = local
    ? localOffset - zoneOffset
    : zoneOffset - localOffset;

  const fixedOffset = timeZone
    ? timezoneToOffset(dayjs(time).valueOf() + diffOffset * 60 * 1000, timeZone)
    : uOffset;

  const realDiffOffset = diffOffset - (uOffset - fixedOffset);
  const diff = local || utcOffset !== undefined ? diffOffset : realDiffOffset;

  return dayjs(dayjs(time).valueOf() + diff * 60 * 1000);
}

export function toLocal(time: Dayjs, utcOffset?: number, timeZone?: string) {
  return toTimezone(time, utcOffset, timeZone, true);
}

export function getNow(utcOffset?: number, timeZone?: string) {
  return utcOffset === undefined && !timeZone
    ? dayjs()
    : toTimezone(dayjs(), utcOffset, timeZone);
}

export function getSortedDayjsArray(values: Dayjs[], fixedTime = false) {
  const sortedValues = [...values].sort((a, b) => a.valueOf() - b.valueOf());

  if (fixedTime && values.length === 2 && values[0] && values[1]) {
    sortedValues[0] = sortedValues[0]
      .set('hour', values[0].get('hour'))
      .set('minute', values[0].get('minute'))
      .set('second', values[0].get('second'));
    sortedValues[1] = sortedValues[1]
      .set('hour', values[1].get('hour'))
      .set('minute', values[1].get('minute'))
      .set('second', values[1].get('second'));
  }

  return sortedValues;
}

export function isValueChange(
  prevValue: Dayjs | (Dayjs | undefined)[] | undefined,
  currentValue: Dayjs | (Dayjs | undefined)[] | undefined
) {
  const isDifference = (
    value1: Dayjs | undefined,
    value2: Dayjs | undefined
  ) => {
    if (value1 === undefined && value2 === undefined) {
      return false;
    }

    if ((value1 && !value2) || (!value1 && value2)) {
      return true;
    }

    return value1?.valueOf() !== value2?.valueOf();
  };

  if (currentValue === undefined && prevValue === undefined) {
    return false;
  }

  if (isArray(currentValue) && isArray(prevValue)) {
    return (
      isDifference(currentValue[0], prevValue[0]) ||
      isDifference(currentValue[1], prevValue[1])
    );
  }

  if (!isArray(currentValue) && !isArray(prevValue)) {
    return isDifference(currentValue, prevValue);
  }

  return true;
}

type DateValue = Date | string | number;

export function getDayjsValue(
  time: DateValue,
  format: string,
  utcOffset?: number,
  timeZone?: string
): Dayjs;
export function getDayjsValue(
  time: DateValue | undefined,
  format: string,
  utcOffset?: number,
  timeZone?: string
): Dayjs | undefined;
export function getDayjsValue(
  time: DateValue[],
  format: string,
  utcOffset?: number,
  timeZone?: string
): Dayjs[];
export function getDayjsValue(
  time: DateValue[] | undefined,
  format: string,
  utcOffset?: number,
  timeZone?: string
): Dayjs[] | undefined;
export function getDayjsValue(
  time: (DateValue | undefined)[],
  format: string,
  utcOffset?: number,
  timeZone?: string
): (Dayjs | undefined)[];
export function getDayjsValue(
  time: (DateValue | undefined)[] | undefined,
  format: string,
  utcOffset?: number,
  timeZone?: string
): (Dayjs | undefined)[] | undefined;
export function getDayjsValue(
  time: DateValue | (DateValue | undefined)[] | undefined,
  format: string,
  utcOffset?: number,
  timeZone?: string
): Dayjs | (Dayjs | undefined)[] | undefined;
export function getDayjsValue(
  time: DateValue | DateValue[] | (DateValue | undefined)[] | undefined,
  format: string,
  utcOffset?: number,
  timeZone?: string
) {
  const parseQuarterToMonth = (value: string) => {
    const reg = /(Q1)|(Q2)|(Q3)|(Q4)/;
    const quarter = {
      Q1: '01',
      Q2: '04',
      Q3: '07',
      Q4: '10',
    };
    const [q] = reg.exec(value) as ('Q1' | 'Q2' | 'Q3' | 'Q4')[];
    return value.replace(reg, quarter[q]);
  };

  const formatValue = (value: Date | string | number | undefined) => {
    if (!value) return undefined;

    let parsedValue: Dayjs;

    if (typeof value === 'string') {
      if (isQuarter(format)) {
        parsedValue = dayjs(
          parseQuarterToMonth(value),
          format.replace(/\[Q]Q/, 'MM')
        );
      } else if (dayjs(value, format).isValid()) {
        parsedValue = dayjs(value, format);
      } else {
        parsedValue = dayjs(value);
      }
    } else {
      parsedValue = dayjs(value);
    }

    if (utcOffset !== undefined || timeZone) {
      return toTimezone(parsedValue, utcOffset, timeZone);
    }

    return parsedValue;
  };

  if (isArray(time)) {
    return time.map(formatValue);
  }
  return formatValue(time);
}

export function getDateValue(value: Dayjs): Date;
export function getDateValue(value: Dayjs | undefined): Date | undefined;
export function getDateValue(value: Dayjs[]): Date[];
export function getDateValue(
  value: (Dayjs | undefined)[]
): (Date | undefined)[];
export function getDateValue(
  value: (Dayjs | undefined)[] | undefined
): (Date | undefined)[] | undefined;
export function getDateValue(
  value: Dayjs | (Dayjs | undefined)[]
): Date | (Date | undefined)[];
export function getDateValue(
  value: Dayjs | (Dayjs | undefined)[] | undefined
): Date | (Date | undefined)[] | undefined;
export function getDateValue(
  value: Dayjs | Dayjs[] | (Dayjs | undefined)[] | undefined
) {
  const formatValue = (t: Dayjs | undefined) => (t ? t.toDate() : undefined);

  if (isArray(value)) {
    return value.map(formatValue);
  }

  return formatValue(value);
}

export function initializeDateLocale(localeName: string, weekStart: number) {
  dayjs.locale({ ...dayjs.Ls[localeName.toLocaleLowerCase()], weekStart });
}

export function pickDataAttributes<
  T extends Record<string, any>,
  K extends keyof T
>(obj: T): { [key in K]: any } {
  const clone = {} as { [key in K]: any };

  obj &&
    Object.keys(obj).forEach((key) => {
      const k = String(key);
      if (k.indexOf('data-') === 0) {
        clone[k] = obj[k];
      }
      if (k.indexOf('aria-') === 0) {
        clone[k] = obj[k];
      }
    });

  return clone;
}
