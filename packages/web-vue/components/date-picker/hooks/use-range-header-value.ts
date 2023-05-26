import { Dayjs } from 'dayjs';
import { computed, nextTick, reactive, toRefs, watch } from 'vue';
import pick from '../../_utils/pick';
import { getSortedDayjsArray, methods } from '../../_utils/date';
import { CalendarValue, Mode } from '../interface';
import usePanelSpan from './use-panel-span';
import useHeaderValue from './use-header-value';

interface RangeHeaderValueProps {
  mode: Mode;
  startHeaderMode?: Mode;
  endHeaderMode?: Mode;
  value: CalendarValue[] | undefined;
  defaultValue: CalendarValue[] | undefined;
  selectedValue: (Dayjs | undefined)[];
  format: string;
  onChange?: (newVal: Dayjs[]) => void;
}

export default function useRangeHeaderValue(props: RangeHeaderValueProps) {
  const {
    startHeaderMode,
    endHeaderMode,
    mode,
    value,
    defaultValue,
    selectedValue,
    format,
    onChange,
  } = toRefs(props);

  const isDateOrWeek = computed(() => ['date', 'week'].includes(mode.value));

  const unit = computed(() => (isDateOrWeek.value ? 'M' : 'y'));

  const isSame = (current: Dayjs, target: Dayjs) =>
    current.isSame(target, unit.value);

  const { span, superSpan } = usePanelSpan(
    reactive({
      mode,
    })
  );

  const startValue = computed(() => value.value?.[0]);
  const endValue = computed(() => value.value?.[1]);

  const startDefaultValue = computed(() => defaultValue.value?.[0]);
  const endDefaultValue = computed(() => defaultValue.value?.[1]);

  const emitChange = (newVal: Dayjs[]) => {
    onChange?.value && onChange.value(newVal);
  };
  const {
    headerValue: startHeaderValue,
    setHeaderValue: setStartHeaderValue,
    headerOperations: startHeaderOperations,
    getDefaultLocalValue: getDefaultStartHeaderValue,
  } = useHeaderValue(
    reactive({
      mode: startHeaderMode?.value || mode,
      value: startValue,
      defaultValue: startDefaultValue,
      selectedValue: undefined,
      format,
      onChange: (newVal: Dayjs) => {
        emitChange([newVal, endHeaderValue.value]);
      },
    })
  );

  const {
    headerValue: endHeaderValue,
    setHeaderValue: setEndHeaderValue,
    headerOperations: endHeaderOperations,
    getDefaultLocalValue: getDefaultEndHeaderValue,
  } = useHeaderValue(
    reactive({
      mode: endHeaderMode?.value || mode,
      value: endValue,
      defaultValue: endDefaultValue,
      selectedValue: undefined,
      format,
      onChange: (newVal: Dayjs) => {
        emitChange([startHeaderValue.value, newVal]);
      },
    })
  );

  const setHeaderValue = (newVal: Dayjs[]) => {
    const isSameStartValue = isSame(startHeaderValue.value, newVal[0]);
    const isSameEndValue = isSame(endHeaderValue.value, newVal[1]);

    setStartHeaderValue(newVal[0], false);
    setEndHeaderValue(newVal[1], false);

    if (!isSameStartValue || !isSameEndValue) {
      onChange?.value && onChange?.value(newVal);
    }
  };

  function getFixedValue(values: Dayjs[]) {
    // eslint-disable-next-line prefer-const
    let [header0, header1] = getSortedDayjsArray(values);

    const nextHeader = methods.add(header0, span.value, 'M');

    if (header1.isBefore(nextHeader, unit.value)) {
      header1 = nextHeader;
    }

    return [header0, header1];
  }

  function getFormSelectedValue() {
    let selected0 = selectedValue.value?.[0];
    let selected1 = selectedValue.value?.[1];

    if (selected0 && selected1) {
      [selected0, selected1] = getSortedDayjsArray([selected0, selected1]);
    }

    return [selected0, selected1];
  }

  // 1. 目前为此，在非受控情况下，start 和 end 的值是一样的，所以需要 fix 一下
  // 2. 附加 selectedValue 处理
  const [selected0, selected1] = getFormSelectedValue();
  const [header0, header1] = getFixedValue([
    selected0 || startHeaderValue.value,
    selected1 || endHeaderValue.value,
  ]);
  setStartHeaderValue(header0, false);
  setEndHeaderValue(header1, false);

  const resetHeaderValue = () => {
    const defaultStartHeaderValue = getDefaultStartHeaderValue();
    const defaultEndHeaderValue = getDefaultEndHeaderValue();

    // Because selectedValue is used, it may not be updated in time, so add nextTick
    nextTick(() => {
      const [selected0, selected1] = getFormSelectedValue();
      const [header0, header1] = getFixedValue([
        selected0 || defaultStartHeaderValue,
        selected1 || defaultEndHeaderValue,
      ]);
      setHeaderValue([header0, header1]);
    });
  };

  /** ************* 以下为操作 ****************** */

  const canShortenMonth = computed(() =>
    methods
      .add(startHeaderValue.value, span.value, 'M')
      .isBefore(endHeaderValue.value, unit.value)
  );

  const canShortenYear = computed(() =>
    methods
      .add(startHeaderValue.value, superSpan.value, 'M')
      .isBefore(endHeaderValue.value, unit.value)
  );

  const computedStartHeaderOperations = computed(() => {
    const operations = ['onSuperPrev'];
    if (isDateOrWeek.value) operations.push('onPrev');
    if (canShortenMonth.value && isDateOrWeek) operations.push('onNext');
    if (canShortenYear.value) operations.push('onSuperNext');
    return pick(startHeaderOperations.value as any, operations);
  });

  const computedEndHeaderOperations = computed(() => {
    const operations = ['onSuperNext'];
    if (isDateOrWeek.value) operations.push('onNext');
    if (canShortenMonth.value && isDateOrWeek.value) operations.push('onPrev');
    if (canShortenYear.value) operations.push('onSuperPrev');
    return pick(endHeaderOperations.value as any, operations);
  });

  return {
    startHeaderValue,
    endHeaderValue,
    startHeaderOperations: computedStartHeaderOperations,
    endHeaderOperations: computedEndHeaderOperations,
    setHeaderValue,
    resetHeaderValue,
  };
}
