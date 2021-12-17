import { computed, ref, watch } from 'vue';
import { Enter } from '../_utils/keycode';

export const useInput = (props: any, { emit, isInputValue = false }) => {
  const propName = isInputValue ? 'inputValue' : 'modelValue';
  const eventName = isInputValue ? 'inputValueChange' : 'input';

  const inputRef = ref<HTMLInputElement>();

  const _value = ref(
    props[isInputValue ? 'defaultInputValue' : 'defaultValue']
  );
  const _focused = ref(false);

  const isComposition = ref(false);
  const compositionValue = ref('');

  let initialValue: string;

  const computedValue = computed<string>(() => props[propName] ?? _value.value);

  const updateValue = (value: string) => {
    _value.value = value;
    emit(`update:${propName}`, value);
  };

  const handleInput = (ev: Event) => {
    const { value } = ev.target as HTMLInputElement;

    if (!isComposition.value) {
      emit(eventName, value, ev);
      updateValue(value);
    }
  };

  const handleChange = (ev: Event) => {
    if (!isInputValue && computedValue.value !== initialValue) {
      initialValue = computedValue.value;
      emit('change', computedValue.value, ev);
    }
  };

  const handleComposition = (ev: CompositionEvent) => {
    const { value } = ev.target as HTMLInputElement;

    if (ev.type === 'compositionend') {
      isComposition.value = false;
      compositionValue.value = '';
      emit(eventName, value, ev);
      updateValue(value);
    } else {
      isComposition.value = true;
      compositionValue.value = computedValue.value + (ev.data ?? '');
    }
  };

  const handleFocus = (ev: FocusEvent) => {
    _focused.value = true;
    initialValue = computedValue.value;
    emit('focus', ev);
  };

  const handleBlur = (ev: FocusEvent) => {
    _focused.value = false;
    handleChange(ev);
    emit('blur', ev);
  };

  const handleKeyDown = (ev: KeyboardEvent) => {
    const keyCode = ev.key || ev.code;
    if (!isComposition.value && keyCode === Enter.key) {
      emit('pressEnter', ev);
      handleChange(ev);
    }
  };

  // used for input wrapper
  const handleMousedown = (ev: MouseEvent) => {
    if (inputRef.value && ev.target !== inputRef.value) {
      ev.preventDefault();
      inputRef.value.focus();
    }
  };

  watch(computedValue, (value) => {
    if (inputRef.value && value !== inputRef.value.value) {
      inputRef.value.value = value;
    }
  });

  return {
    inputRef,
    _value,
    _focused,
    isComposition,
    compositionValue,
    computedValue,
    handleInput,
    handleComposition,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleMousedown,
  };
};
