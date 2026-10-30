import { Dayjs } from 'dayjs';
import { isArray } from '../../_utils/is';
import { getNow } from '../../_utils/date';

export type CalendarCellMode = 'day' | 'week' | 'month' | 'year';

export interface CellDateObj {
  time: Dayjs;
  isPrev?: boolean;
  isNext?: boolean;
}

export interface UseCellClassNameOptions {
  prefixCls: string;
  mergedValue?: Dayjs;
  rangeValues?: Dayjs[];
  hoverRangeValues?: Dayjs[];
  panel: boolean;
  isSameTime: (current: Dayjs, target: Dayjs) => boolean;
  innerMode?: CalendarCellMode;
}

function getDateValue(date?: Dayjs[], index?: number): Dayjs | undefined {
  if (!date || index === undefined) {
    return undefined;
  }
  if (isArray(date)) {
    return date[index];
  }
  return undefined;
}

export default function useClassName({
  prefixCls,
  mergedValue,
  rangeValues,
  hoverRangeValues,
  panel,
  isSameTime,
  innerMode,
}: UseCellClassNameOptions) {
  function isInRange(current: Dayjs, startDate?: Dayjs, endDate?: Dayjs) {
    if (!startDate || !endDate) {
      return false;
    }
    return (
      isSameTime(current, startDate) ||
      isSameTime(current, endDate) ||
      current.isBetween(startDate, endDate, null, '[]')
    );
  }

  return function getCellClassName(
    cellDateObj: CellDateObj,
    disabled?: boolean
  ) {
    const rangeStart = getDateValue(rangeValues, 0);
    const rangeEnd = getDateValue(rangeValues, 1);

    const hoverRangeStart = getDateValue(hoverRangeValues, 0);
    const hoverRangeEnd = getDateValue(hoverRangeValues, 1);

    const isInView = !cellDateObj.isPrev && !cellDateObj.isNext;

    const rangeAvailable = isInView && panel;

    const isRangeStart = Boolean(
      rangeAvailable && rangeStart && isSameTime(cellDateObj.time, rangeStart)
    );
    const isRangeEnd = Boolean(
      rangeAvailable && rangeEnd && isSameTime(cellDateObj.time, rangeEnd)
    );

    const nearRangeStart = Boolean(
      hoverRangeStart && rangeStart && hoverRangeStart.isBefore(rangeStart)
    );
    const nearRangeEnd = Boolean(
      rangeEnd && hoverRangeEnd && hoverRangeEnd.isAfter(rangeEnd)
    );

    const isHoverNearRange =
      (nearRangeStart && isRangeStart) || (nearRangeEnd && isRangeEnd);

    let isToday = isSameTime(cellDateObj.time, getNow());

    if (!panel && innerMode === 'year') {
      isToday = getNow().isSame(cellDateObj.time, 'date');
    }

    return [
      `${prefixCls}-cell`,
      {
        [`${prefixCls}-cell-in-view`]: isInView,
        [`${prefixCls}-cell-today`]: isToday,
        [`${prefixCls}-cell-selected`]: Boolean(
          mergedValue && isSameTime(cellDateObj.time, mergedValue)
        ),
        [`${prefixCls}-cell-range-start`]: isRangeStart,
        [`${prefixCls}-cell-range-end`]: isRangeEnd,
        [`${prefixCls}-cell-in-range`]: Boolean(
          rangeAvailable && isInRange(cellDateObj.time, rangeStart, rangeEnd)
        ),
        [`${prefixCls}-cell-in-range-near-hover`]: isHoverNearRange,
        [`${prefixCls}-cell-hover-range-start`]: Boolean(
          rangeAvailable &&
            hoverRangeStart &&
            isSameTime(cellDateObj.time, hoverRangeStart)
        ),
        [`${prefixCls}-cell-hover-range-end`]: Boolean(
          rangeAvailable &&
            hoverRangeEnd &&
            isSameTime(cellDateObj.time, hoverRangeEnd)
        ),
        [`${prefixCls}-cell-hover-in-range`]: Boolean(
          rangeAvailable &&
            isInRange(cellDateObj.time, hoverRangeStart, hoverRangeEnd)
        ),
        [`${prefixCls}-cell-disabled`]: disabled,
      },
    ];
  };
}
