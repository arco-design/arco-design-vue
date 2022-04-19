import originDayjs, { Dayjs, OpUnitType, UnitType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import { isDayjs, isArray } from './is';
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
  endOf(time: Dayjs, unit: OpUnitType) {
    return time.endOf(unit);
  },
  set(time: Dayjs, unit: UnitType, value: number) {
    return time.set(unit, value);
  },
  isSameWeek(
    date1: Dayjs,
    date2: Dayjs,
    weekStart: number,
    localeName: string
  ) {
    return date1
      .locale({ ...dayjs.Ls[localeName.toLocaleLowerCase()], weekStart })
      .isSame(date2, 'week');
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
  const formatValue = (value: Date | string | number | undefined) => {
    if (!value) return undefined;

    if (typeof value === 'string') {
      return dayjs(value, format);
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
