import originDayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
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

export function getNow() {
  return dayjs();
}

export function getSortedDayjsArray(values: Dayjs[]) {
  return [...values].sort((a, b) => a.valueOf() - b.valueOf());
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

export function getDayjsValue(time: DateValue, format: string): Dayjs;
export function getDayjsValue(
  time: DateValue | undefined,
  format: string
): Dayjs | undefined;
export function getDayjsValue(time: DateValue[], format: string): Dayjs[];
export function getDayjsValue(
  time: DateValue[] | undefined,
  format: string
): Dayjs[] | undefined;
export function getDayjsValue(
  time: (DateValue | undefined)[],
  format: string
): (Dayjs | undefined)[];
export function getDayjsValue(
  time: (DateValue | undefined)[] | undefined,
  format: string
): (Dayjs | undefined)[] | undefined;
export function getDayjsValue(
  time: DateValue | (DateValue | undefined)[] | undefined,
  format: string
): Dayjs | (Dayjs | undefined)[] | undefined;
export function getDayjsValue(
  time: DateValue | DateValue[] | (DateValue | undefined)[] | undefined,
  format: string
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

    if (typeof value === 'string') {
      if (isQuarter(format)) {
        return dayjs(parseQuarterToMonth(value), format.replace(/\[Q]Q/, 'MM'));
      }

      if (dayjs(value, format).isValid()) {
        return dayjs(value, format);
      }
    }

    return dayjs(value);
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
