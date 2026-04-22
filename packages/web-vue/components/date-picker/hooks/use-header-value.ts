import { Dayjs } from 'dayjs';
import { computed, reactive, ComputedRef, toRefs, watch, ref } from 'vue';
import { getDayjsValue, getNow, methods } from '../../_utils/date';
import { Mode, HeaderOperations, CalendarValue } from '../interface';
import usePanelSpan from './use-panel-span';

interface HeaderValueProps {
  mode?: Mode;
  value?: CalendarValue;
  defaultValue?: CalendarValue;
  selectedValue?: Dayjs;
  format: string;
  utcOffset?: number;
  timezone?: string;
  onChange?: (newVal: Dayjs) => void;
}

export default function useHeaderValue(props: HeaderValueProps): {
  headerValue: ComputedRef<Dayjs>;
  setHeaderValue: (val: Dayjs | undefined, emitChange?: boolean) => void;
  headerOperations: ComputedRef<HeaderOperations>;
  resetHeaderValue: (emitChange?: boolean) => void;
  getDefaultLocalValue: () => Dayjs;
} {
  const {
    mode,
    value,
    defaultValue,
    selectedValue,
    format,
    utcOffset,
    timezone,
    onChange,
  } = toRefs(props);

  const computedMode = computed(() => mode?.value || 'date');
  const MIN_YEAR = 0;

  const { span, superSpan } = usePanelSpan(
    reactive({
      mode: computedMode,
    })
  );

  const isSame = (current: Dayjs, target: Dayjs) => {
    const unit =
      computedMode.value === 'date' || computedMode.value === 'week'
        ? 'M'
        : 'y';
    return current.isSame(target, unit);
  };

  const computedValue = computed(() =>
    getDayjsValue(value?.value, format.value, utcOffset?.value, timezone?.value)
  );

  const computedDefaultValue = computed(() =>
    getDayjsValue(
      defaultValue?.value,
      format.value,
      utcOffset?.value,
      timezone?.value
    )
  );

  const localValue = ref(
    computedDefaultValue.value || getNow(utcOffset?.value, timezone?.value)
  );
  const headerValue = computed(() => computedValue.value || localValue.value);

  const setLocalValue = (newVal: Dayjs | undefined) => {
    if (!newVal) return;
    localValue.value = newVal;
  };

  const setHeaderValue = (newVal: Dayjs | undefined, emitChange = true) => {
    if (!newVal) return;
    if (emitChange && !isSame(headerValue.value, newVal)) {
      onChange?.value?.(newVal);
    }
    setLocalValue(newVal);
  };

  // Additional processing of selectedValue
  if (selectedValue?.value) {
    setLocalValue(selectedValue.value);
  }
  watch(
    () => selectedValue?.value,
    (newVal) => {
      setHeaderValue(newVal);
    }
  );

  function getDefaultLocalValue() {
    return (
      selectedValue?.value ||
      computedDefaultValue.value ||
      getNow(utcOffset?.value, timezone?.value)
    );
  }
  function resetHeaderValue(emitChange = true) {
    const defaultLocalValue = getDefaultLocalValue();
    if (emitChange) {
      setHeaderValue(defaultLocalValue);
    } else {
      setLocalValue(defaultLocalValue);
    }
  }

  const showSingleBtn = computed(() => span.value !== superSpan.value);

  const canMovePrev = (months: number) =>
    methods.subtract(headerValue.value, months, 'M').year() >= MIN_YEAR;

  const headerOperations = computed(() => {
    const onSuperPrev = canMovePrev(superSpan.value)
      ? () => {
          setHeaderValue(
            methods.subtract(headerValue.value, superSpan.value, 'M')
          );
        }
      : undefined;

    const onPrev =
      showSingleBtn.value && canMovePrev(span.value)
        ? () => {
            setHeaderValue(
              methods.subtract(headerValue.value, span.value, 'M')
            );
          }
        : undefined;

    return {
      onSuperPrev,
      onPrev,
      onNext: showSingleBtn.value
        ? () => {
            setHeaderValue(methods.add(headerValue.value, span.value, 'M'));
          }
        : undefined,
      onSuperNext: () => {
        setHeaderValue(methods.add(headerValue.value, superSpan.value, 'M'));
      },
    };
  });

  return {
    headerValue,
    setHeaderValue,
    headerOperations,
    resetHeaderValue,
    getDefaultLocalValue,
  };
}
