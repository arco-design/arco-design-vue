import { Dayjs } from 'dayjs';
import { computed, toRefs, watch } from 'vue';
import { getDayjsValue } from '../../_utils/date';
import { isArray, isUndefined } from '../../_utils/is';
import { TimeValue } from '../interface';
import useState from '../../_hooks/use-state';

export default function useTimeState(props: {
  modelValue: TimeValue | TimeValue[] | undefined;
  defaultValue: TimeValue | TimeValue[] | undefined;
  format: string;
  isRange: boolean;
}) {
  const { modelValue, defaultValue, format, isRange } = toRefs(props);

  function getLocalEmptyValue(): Dayjs[] | undefined {
    return isRange.value ? [] : undefined;
  }

  function normalizeValue(time: TimeValue | TimeValue[] | undefined) {
    if (isUndefined(time)) {
      return undefined;
    }

    if (isRange.value) {
      return isArray(time) ? time : [time, undefined];
    }

    return time;
  }

  // 转为 dayjs 的 modelValue
  const computedModelValue = computed(() => {
    const time = normalizeValue(modelValue.value);
    return getDayjsValue(time, format.value);
  });

  // 转为 dayjs 的 defaultValue
  const computedDefaultValue = computed(() => {
    const time = normalizeValue(defaultValue.value);
    return getDayjsValue(time, format.value);
  });

  const [localValue, setLocalValue] = useState<
    Dayjs | Array<Dayjs | undefined> | undefined
  >(
    !isUndefined(computedModelValue.value)
      ? computedModelValue.value
      : !isUndefined(computedDefaultValue.value)
      ? computedDefaultValue.value
      : getLocalEmptyValue()
  );

  watch(computedModelValue, () => {
    if (isUndefined(computedModelValue.value)) {
      setLocalValue(getLocalEmptyValue());
    }
  });

  // 混合的最终值：如果外部有传的话，就用外部的值，不然就使用内部维护的值
  const computedValue = computed(
    () => computedModelValue.value || localValue.value
  );

  // 用于操作过程中 panel 展示的值
  // 1. 跟随最终值变化
  // 2. 面板选择后手动更新
  // 3. 输入框输入格式正确后手动更新
  const [panelValue, setPanelValue] = useState<
    Dayjs | Array<Dayjs | undefined> | undefined
  >(computedValue.value);

  watch([computedValue], () => {
    setPanelValue(computedValue.value);
  });

  // 用于操作 input 的过程中 input 展示的值
  // 1. 最终值变化后置空
  // 2. 面板选择后置空
  // 3. 输入框变化后手动更新
  const [inputValue, setInputValue] = useState<
    string | Array<string | undefined> | undefined
  >();
  watch([panelValue], () => {
    setInputValue(undefined);
  });

  return {
    computedValue,
    panelValue,
    inputValue,
    setValue: setLocalValue,
    setPanelValue,
    setInputValue,
  };
}
