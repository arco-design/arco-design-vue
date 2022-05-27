import { computed, nextTick, Ref, ref, watch } from 'vue';
import { Enter } from '../_utils/keycode';
import { EmitFn } from '../_utils/types';
import { FormItemEventHandler } from '../form/interface';

export const useInput = ({
  defaultValue,
  modelValue,
  emit,
  eventName = 'input',
  updateEventName = 'update:modelValue',
  eventHandlers,
}: {
  defaultValue?: Ref<string>;
  modelValue?: Ref<string>;
  emit: EmitFn<any>;
  eventName?: string;
  updateEventName?: string;
  eventHandlers?: Ref<FormItemEventHandler>;
}) => {
  const inputRef = ref<HTMLInputElement>();

  const _value = ref(defaultValue?.value ?? '');
  const _focused = ref(false);

  const isComposition = ref(false);
  const compositionValue = ref('');

  let initialValue: string;

  const computedValue = computed(() => modelValue?.value ?? _value.value);

  const updateValue = (value: string, ev: Event) => {
    _value.value = value;
    emit(updateEventName, value);
    emit(eventName, value, ev);
  };

  const handleInput = (ev: Event) => {
    const { value } = ev.target as HTMLInputElement;

    if (!isComposition.value) {
      updateValue(value, ev);

      nextTick(() => {
        if (inputRef.value && computedValue.value !== inputRef.value.value) {
          inputRef.value.value = computedValue.value;
        }
      });
    }
  };

  const handleChange = (ev: Event) => {
    if (eventName === 'input' && computedValue.value !== initialValue) {
      initialValue = computedValue.value;
      emit('change', computedValue.value, ev);
    }
  };

  const handleComposition = (ev: CompositionEvent) => {
    const { value } = ev.target as HTMLInputElement;

    if (ev.type === 'compositionend') {
      isComposition.value = false;
      compositionValue.value = '';
      updateValue(value, ev);

      nextTick(() => {
        if (inputRef.value && computedValue.value !== inputRef.value.value) {
          inputRef.value.value = computedValue.value;
        }
      });
    } else {
      isComposition.value = true;
      compositionValue.value = computedValue.value + (ev.data ?? '');
    }
  };

  const handleFocus = (ev: FocusEvent) => {
    _focused.value = true;
    initialValue = computedValue.value;
    emit('focus', ev);
    eventHandlers?.value?.onFocus?.(ev);
  };

  const handleBlur = (ev: FocusEvent) => {
    _focused.value = false;
    emit('blur', ev);
    eventHandlers?.value?.onBlur?.(ev);
    handleChange(ev);
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
