import { defineComponent, computed, PropType } from 'vue';
import { Dayjs } from 'dayjs';
import Select from '../select';
import Button from '../button';
import Radio from '../radio';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';
import IconDoubleLeft from '../icon/icon-double-left';
import IconDoubleRight from '../icon/icon-double-right';
import { getNow } from '../_utils/date';
import { isArray } from '../_utils/is';
import { getPrefixCls } from '../_utils/global-config';
import { useI18n } from '../locale';

export default defineComponent({
  name: 'Header',
  props: {
    mode: {
      type: String as PropType<'day' | 'week' | 'month' | 'year'>,
    },
    dayStartOfWeek: {
      type: Number as PropType<0 | 1>,
    },
    isWeek: {
      type: Boolean,
    },
    panel: {
      type: Boolean,
    },
    panelOperations: {
      type: Array as PropType<
        Array<'left' | 'double-left' | 'right' | 'double-right'>
      >,
    },
    modes: {
      type: Array as PropType<('day' | 'week' | 'month' | 'year')[]>,
    },
    headerType: {
      type: String,
    },
    pageShowData: {
      type: Object as PropType<Dayjs>,
      required: true,
    },
    move: {
      type: Function,
      required: true,
    },
    onYearChange: {
      type: Function,
      required: true,
    },
    onMonthChange: {
      type: Function,
      required: true,
    },
    changePageShowDate: {
      type: Function,
      required: true,
    },
    onModeChange: {
      type: Function as PropType<(value: any, ev: Event) => void>,
      required: true,
    },
    headerValueFormat: {
      type: String,
      required: true,
    },
  },
  emits: ['yearChange', 'monthChange'],
  setup(props, { slots }) {
    // const {
    //   changePageShowDate,
    //   headerValueFormat,
    //   mergedPageShowDate,
    //   move,
    //   mode,
    //   changeMode,
    //   onChangeYear,
    //   onChangeMonth,
    // } = toRefs(props);
    // const getKeyboardEvents = useKeyboardEvent();
    const prefixCls = getPrefixCls('calendar');
    const { t } = useI18n();
    const modesOptions = isArray(props.modes)
      ? props.modes.map((m) => ({
          label: t(`datePicker.view.${m}`),
          value: m,
        }))
      : [];

    const isSelectHeaderType = props.headerType === 'select';
    const isPanel = computed(() => !!props.panel);

    const pageShowDateYear = computed(() => props.pageShowData.year());
    const pageShowDateMonth = computed(() => props.pageShowData.month() + 1);
    const optionsYear = computed(() => {
      const options = [pageShowDateYear.value];
      for (let i = 1; i <= 10; i++) {
        options.unshift(pageShowDateYear.value - i);
      }
      for (let i = 1; i < 10; i++) {
        options.push(pageShowDateYear.value + i);
      }
      return options;
    });
    const optionsMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const isOperationAvailable = (
      operation: 'left' | 'double-left' | 'right' | 'double-right'
    ) => {
      return isArray(props.panelOperations)
        ? props.panelOperations.includes(operation)
        : true;
    };

    const showDoubleLeft = computed(() => isOperationAvailable('double-left'));
    const showLeft = computed(
      () => isOperationAvailable('left') && props.mode !== 'year'
    );
    const showRight = computed(
      () => isOperationAvailable('right') && props.mode !== 'year'
    );
    const showDoubleRight = computed(() =>
      isOperationAvailable('double-right')
    );

    return () => (
      <div class={`${prefixCls}-header`}>
        <div class={`${prefixCls}-header-left`}>
          {isPanel.value ? (
            <>
              <div
                class={[
                  `${prefixCls}-header-icon`,
                  {
                    [`${prefixCls}-header-icon-hidden`]: !showDoubleLeft.value,
                  },
                ]}
                role="button"
                tabindex={0}
                onClick={() =>
                  showDoubleLeft.value &&
                  props.changePageShowDate('prev', 'year')
                }
              >
                {showDoubleLeft.value && <IconDoubleLeft />}
              </div>
              <div
                class={[
                  `${prefixCls}-header-icon`,
                  {
                    [`${prefixCls}-header-icon-hidden`]: !showLeft.value,
                  },
                ]}
                role="button"
                tabindex={0}
                onClick={() =>
                  showLeft.value && props.changePageShowDate('prev', 'month')
                }
              >
                {showLeft.value && <IconLeft />}
              </div>
              <div class={`${prefixCls}-header-value`}>
                {slots.default
                  ? slots.default({
                      year: pageShowDateYear,
                      month: pageShowDateMonth,
                    })
                  : props.pageShowData.format(props.headerValueFormat)}
              </div>
              <div
                class={[
                  `${prefixCls}-header-icon`,
                  {
                    [`${prefixCls}-header-icon-hidden`]: !showRight.value,
                  },
                ]}
                role="button"
                tabindex={0}
                onClick={() =>
                  showRight.value && props.changePageShowDate('next', 'month')
                }
              >
                {showRight.value && <IconRight />}
              </div>
              <div
                class={[
                  `${prefixCls}-header-icon`,
                  {
                    [`${prefixCls}-header-icon-hidden`]: !showDoubleRight.value,
                  },
                ]}
                role="button"
                tabindex={0}
                onClick={() =>
                  showDoubleRight.value &&
                  props.changePageShowDate('next', 'year')
                }
              >
                {showDoubleRight.value && <IconDoubleRight />}
              </div>
            </>
          ) : isSelectHeaderType ? (
            <>
              <Select
                size="small"
                class={`${prefixCls}-header-value-year`}
                modelValue={pageShowDateYear.value}
                options={optionsYear.value}
                onChange={props.onYearChange}
                popupContainer={`${prefixCls}-header`}
              />
              {props.mode === 'month' && (
                <Select
                  size="small"
                  class={`${prefixCls}-header-value-month`}
                  modelValue={pageShowDateMonth.value}
                  options={optionsMonth}
                  onChange={props.onMonthChange}
                  popupContainer={`${prefixCls}-header`}
                />
              )}
            </>
          ) : (
            <>
              <div
                class={`${prefixCls}-header-icon`}
                role="button"
                tabindex={0}
                onClick={() => props.changePageShowDate('prev', props.mode)}
              >
                <IconLeft />
              </div>
              <div class={`${prefixCls}-header-value`}>
                {slots.default
                  ? slots.default({
                      year: pageShowDateYear,
                      month: pageShowDateMonth,
                    })
                  : props.pageShowData.format(props.headerValueFormat)}
              </div>
              <div
                role="button"
                tabindex={0}
                class={`${prefixCls}-header-icon`}
                onClick={() => props.changePageShowDate('next', props.mode)}
              >
                <IconRight />
              </div>
            </>
          )}
          {!isPanel.value && (
            <Button size="small" onClick={() => props.move(getNow())}>
              {t(`datePicker.today`)}
            </Button>
          )}
        </div>
        {!isPanel.value && (
          <div class={`${prefixCls}-header-right`}>
            <Radio.Group
              size="small"
              type="button"
              options={modesOptions}
              onChange={props.onModeChange}
              modelValue={props.mode}
            />
          </div>
        )}
      </div>
    );
  },
});
