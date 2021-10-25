import { Dayjs } from 'dayjs';
import { computed, toRefs } from 'vue';
import { Cell, IsSameTime, Mode } from '../interface';
import { getNow, getSortedDayjsArray } from '../../_utils/date';
import { isDayjs } from '../../_utils/is';

interface CellClassNameProps {
  prefixCls: string;
  value?: Dayjs;
  rangeValues?: Array<Dayjs | undefined>;
  isSameTime: IsSameTime;
  mode?: Mode;
}

export default function useCellClassName(props: CellClassNameProps) {
  const { rangeValues } = toRefs(props);

  const sortedRangeValues = computed(() =>
    rangeValues?.value && rangeValues.value.every(isDayjs)
      ? getSortedDayjsArray(rangeValues.value)
      : rangeValues?.value
  );
  const rangeStart = computed(() => sortedRangeValues.value?.[0]);
  const rangeEnd = computed(() => sortedRangeValues.value?.[1]);

  return {
    getCellClassName: (cellData: Cell, disabled: boolean) => {
      const { value, isSameTime, mode, prefixCls } = props;

      const isInView = !cellData.isPrev && !cellData.isNext;

      const isSelected = value && isSameTime(cellData.value, value);

      let isToday = isSameTime(cellData.value, getNow());
      if (mode === 'week') {
        isToday = getNow().isSame(cellData.value, 'date');
      }

      const isRangeStart =
        isInView &&
        rangeStart.value &&
        isSameTime(cellData.value, rangeStart.value);

      const isRangeEnd =
        isInView &&
        rangeEnd.value &&
        isSameTime(cellData.value, rangeEnd.value);

      const isInRange =
        isInView &&
        rangeStart.value &&
        rangeEnd.value &&
        (isRangeStart ||
          isRangeEnd ||
          cellData.value.isBetween(
            rangeStart.value,
            rangeEnd.value,
            null,
            '[]'
          ));

      return [
        `${prefixCls}-cell`,
        {
          [`${prefixCls}-cell-in-view`]: isInView,
          [`${prefixCls}-cell-today`]: isToday,
          [`${prefixCls}-cell-selected`]: isSelected,
          [`${prefixCls}-cell-range-start`]: isRangeStart,
          [`${prefixCls}-cell-range-end`]: isRangeEnd,
          [`${prefixCls}-cell-in-range`]: isInRange,
          [`${prefixCls}-cell-disabled`]: disabled,
        },
        cellData.classNames,
      ];
    },
  };
}
