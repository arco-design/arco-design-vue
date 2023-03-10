import { defineComponent, computed, toRefs, inject, PropType } from 'vue';
import { Dayjs } from 'dayjs';
import { padStart } from '../_utils/pad';
import { dayjs } from '../_utils/date';
import Month from './month';
import useCellClassName from './hooks/useCellClassName';
import { getPrefixCls } from '../_utils/global-config';
import { useI18n } from '../locale';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((month, index) => {
  return {
    name: month,
    value: index,
  };
});

const monthGroup = Array(3);
for (let i = 0; i < 3; i++) {
  monthGroup[i] = MONTHS.slice(i * 4, 4 * (i + 1));
}

const monthGroupPanel = Array(4);
for (let i = 0; i < 4; i++) {
  monthGroupPanel[i] = MONTHS.slice(i * 3, 3 * (i + 1));
}
export default defineComponent({
  name: 'Year',
  props: {
    mode: {
      type: String as PropType<'month' | 'year'>,
      required: true,
    },
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
      required: true,
    },
    value: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    isWeek: {
      type: Boolean,
    },
    panel: {
      type: Boolean,
      default: false,
    },
    pageShowData: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    pageData: {
      type: Array,
    },
    selectHandler: {
      type: Function as PropType<(time: Dayjs, disabled: boolean) => void>,
      required: true,
    },
  },
  setup(props) {
    // const {
    //   mergedPageShowDate,
    //   panel,
    //   onMouseEnterCell,
    //   disabledDate,
    //   selectHandler,
    //   mode,
    // } = toRefs(props);
    const prefixCls = getPrefixCls('calendar');
    const getCellClassName = computed(() =>
      useCellClassName({
        prefixCls,
        mergedValue: props.value,
        panel: false,
        innerMode: props.mode,
        rangeValues: [],
        hoverRangeValues: [],
        isSameTime: (current: Dayjs, target: Dayjs) =>
          current.isSame(target, 'month'),
      })
    );
    const { t } = useI18n();
    const showYear = computed(() => props.pageShowData.year());

    const mg = props.panel ? monthGroupPanel : monthGroup;
    return () => (
      <div class={`${prefixCls}-year`}>
        {mg.map((row, rowIndex) => (
          <div class={`${prefixCls}-year-row`} key={rowIndex}>
            {row.map((col) => {
              const time = dayjs(
                `${showYear.value}-${padStart(col.value + 1, 2, '0')}-01`
              );
              // const disabled =
              //   typeof disabledDate === 'function' && disabledDate(time);
              const divProps = props.panel
                ? { onClick: () => props.selectHandler(time, false) }
                : {};

              return (
                <div
                  key={col.value}
                  class={getCellClassName.value({ ...col, time }, false)}
                >
                  {props.panel ? (
                    <div class={`${prefixCls}-date`} {...divProps}>
                      <div class={`${prefixCls}-date-value`}>
                        {t(`calendar.month.short.${col.name}`)}
                      </div>
                    </div>
                  ) : (
                    <div class={`${prefixCls}-month-with-days`}>
                      <div class={`${prefixCls}-month-title`}>
                        {t(`calendar.month.long.${col.name}`)}
                      </div>
                      <Month
                        pageShowDate={props.pageShowData}
                        pageData={props.pageData}
                        dayStartOfWeek={props.dayStartOfWeek}
                        selectHandler={props.selectHandler}
                        isWeek={props.isWeek}
                        cell
                        current={col.value}
                        value={props.value}
                        mode={props.mode}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  },
});
