import { defineComponent, toRefs, PropType, computed } from 'vue';
import { Dayjs } from 'dayjs';
import { dayjs, methods } from '../_utils/date';
import { padStart } from '../_utils/pad';
import Week from './week';
import useCellClassName from './hooks/useCellClassName';
import { getPrefixCls } from '../_utils/global-config';

const allDaysInOnePage = 6 * 7;

const getReturn = (time: Dayjs) => {
  return {
    year: time.year(),
    month: time.month() + 1,
    date: time.date(),
    day: time.day(),
    time,
  };
};

const getTimeObj = (time: Dayjs) => {
  return {
    start: getReturn(methods.startOf(time, 'month')),
    end: getReturn(methods.endOf(time, 'month')),
    days: time.daysInMonth(),
  };
};

export function getAllDaysByTime(
  time: Dayjs,
  { dayStartOfWeek = 0, isWeek }: { dayStartOfWeek: 0 | 1; isWeek: boolean }
) {
  const current = getTimeObj(time);

  const flatRows = Array(allDaysInOnePage)
    .fill(null)
    .map(() => ({}));
  // current.start.day is 0 for Sunday
  const startIndex =
    dayStartOfWeek === 0 ? current.start.day : (current.start.day || 7) - 1;
  flatRows[startIndex] = {
    ...current.start,
    isCurrent: true,
  };
  // pre
  for (let i = 0; i < startIndex; i++) {
    flatRows[startIndex - i - 1] = {
      ...getReturn(methods.subtract(current.start.time, i + 1, 'day')),
      isPrev: true,
    };
  }
  // next
  for (let i = 0; i < allDaysInOnePage - startIndex - 1; i++) {
    flatRows[startIndex + i + 1] = {
      ...getReturn(methods.add(current.start.time, i + 1, 'day')),
      isCurrent: i < current.days,
      isNext: i >= current.days - 1,
    };
  }
  const rows = Array(6)
    .fill(null)
    .map(() => []);
  for (let i = 0; i < 6; i++) {
    rows[i] = flatRows.slice(i * 7, 7 * (i + 1));
    if (isWeek) {
      const weekTime = rows[i][0].time;
      const weekRows = [...rows[i]];
      rows[i].unshift({
        weekRows,
        weekOfYear: weekTime.week(),
      });
    }
  }
  return rows;
}

export default defineComponent({
  name: 'Month',
  props: {
    cell: {
      type: Boolean,
    },
    pageData: {
      type: Array,
    },
    current: {
      type: Number as PropType<number>,
    },
    value: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    selectHandler: {
      type: Function as PropType<(time: Dayjs, disabled: boolean) => void>,
      required: true,
    },
    mode: {
      type: String as PropType<'day' | 'week' | 'month' | 'year'>,
    },
    pageShowDate: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    panel: {
      type: Boolean,
    },
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      required: true,
    },
    isWeek: {
      type: Boolean,
      required: true,
    },
    // dateInnerContent:{
    //   type:Function,
    //   required:true
    // }
  },
  setup(props, { slots }) {
    const { pageData } = toRefs(props);
    const prefixCls = getPrefixCls('calendar');
    const pageShowDateYear = props.pageShowDate.year();
    const getCellClassName = computed(() =>
      useCellClassName({
        prefixCls,
        mergedValue: props.value,
        panel: false,
        innerMode: props.mode,
        rangeValues: [],
        hoverRangeValues: [],
        isSameTime: (current: Dayjs, target: Dayjs) =>
          current.isSame(target, 'day'),
      })
    );

    function renderDays(row: any[]) {
      return row.map((col, index) => {
        if (col.time) {
          // const disabled =
          //   typeof props.disabledDate === 'function' &&
          //   props.disabledDate(col.time);
          const onClickHandler = () => props.selectHandler(col.time, false);
          const tdProps = props.isWeek ? { onClick: onClickHandler } : {};
          const tdDivProps = !props.isWeek ? { onClick: onClickHandler } : {};

          return (
            <div
              key={index}
              class={getCellClassName.value(col, false)}
              {...tdProps}
            >
              {slots.default ? (
                slots.default?.({
                  year: col.year,
                  month: col.month,
                  date: col.date,
                })
              ) : (
                <div class={`${prefixCls}-date`} {...tdDivProps}>
                  <div class={`${prefixCls}-date-value`}>
                    {props.panel ? (
                      col.date
                    ) : (
                      <div class={`${prefixCls}-date-circle`}>{col.date}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }
        if ('weekOfYear' in col) {
          const rowYear = props.value.year();
          const rowMonth = props.value.month() + 1;
          const rowWeek = props.value.week();
          const selectedWeek =
            props.value &&
            col.weekRows.find(
              (r) => r.year === rowYear && r.month === rowMonth
            ) &&
            rowWeek === col.weekOfYear;
          return (
            <div
              key={index}
              class={[
                `${prefixCls}-cell`,
                `${prefixCls}-cell-week`,
                {
                  [`${prefixCls}-cell-selected-week`]: selectedWeek,
                  [`${prefixCls}-cell-in-range`]: selectedWeek,
                },
              ]}
            >
              <div class={`${prefixCls}-date`}>
                <div class={`${prefixCls}-date-value`}>{col.weekOfYear}</div>
              </div>
            </div>
          );
        }
        return null;
      });
    }

    let pd = pageData.value;
    if (typeof props.current === 'number') {
      pd = getAllDaysByTime(
        dayjs(`${pageShowDateYear}-${padStart(props.current + 1, 2, '0')}-01`),
        {
          dayStartOfWeek: props.dayStartOfWeek,
          isWeek: props.isWeek,
        }
      );
    }

    return () => (
      <div
        class={props.cell ? `${prefixCls}-month-cell` : `${prefixCls}-month`}
      >
        <Week
          value={props.value}
          selectHandler={props.selectHandler}
          dayStartOfWeek={props.dayStartOfWeek}
          isWeek={props.isWeek}
          panel={props.panel}
          mode={props.mode}
          pageShowData={props.pageShowDate}
          pageData={props.pageData}
        />
        <div class={`${prefixCls}-month-cell-body`}>
          {pd?.map((row, index) => (
            <div
              key={index}
              class={[
                `${prefixCls}-month-row`,
                {
                  [`${prefixCls}-row-week`]: props.isWeek,
                },
              ]}
            >
              {renderDays(row)}
            </div>
          ))}
        </div>
      </div>
    );
  },
});
