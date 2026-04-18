<template>
  <div :class="classNames">
    <div v-if="$slots.prefix" :class="`${prefixCls}-prefix`">
      <slot name="prefix" />
    </div>
    <div :class="getInputWrapClassName(0)">
      <input
        ref="refInput0"
        v-bind="nativeInputProps0"
        :disabled="disabled0"
        :readonly="readonly"
        :placeholder="placeholder[0]"
        :value="displayValue0"
        @input="onChange"
        @keydown.enter="onPressEnter"
        @keydown.tab="onPressTab"
        @click="(e) => changeFocusedInput(0, e)"
        @focus="(e) => onFocus(e, 0)"
        @blur="(e) => onBlur(e, 0)"
      />
    </div>
    <span :class="`${prefixCls}-separator`">
      <slot name="separator"> - </slot>
    </span>
    <div :class="getInputWrapClassName(1)">
      <input
        ref="refInput1"
        v-bind="nativeInputProps1"
        :disabled="disabled1"
        :readonly="readonly"
        :placeholder="placeholder[1]"
        :value="displayValue1"
        @input="onChange"
        @keydown.enter="onPressEnter"
        @keydown.tab="onPressTab"
        @click="(e) => changeFocusedInput(1, e)"
        @focus="(e) => onFocus(e, 1)"
        @blur="(e) => onBlur(e, 1)"
      />
    </div>
    <div :class="`${prefixCls}-suffix`">
      <IconHover
        v-if="allowClear && !mergedDisabled && value.length === 2"
        :prefix="prefixCls"
        :class="`${prefixCls}-clear-icon`"
        @click="onClear"
      >
        <IconClose />
      </IconHover>
      <span :class="`${prefixCls}-suffix-icon`">
        <slot name="suffix-icon" />
      </span>
      <FeedbackIcon v-if="feedback" :type="feedback" />
    </div>
  </div>
</template>
<script lang="ts">
import { Dayjs } from 'dayjs';
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import FeedbackIcon from '../feedback-icon.vue';
import {
  isArray,
  isDayjs,
  isFunction,
  isNumber,
  isUndefined,
} from '../../_utils/is';
import IconClose from '../../icon/icon-close';
import IconHover from '../icon-hover.vue';
import { useFormItem } from '../../_hooks/use-form-item';
import { useSize } from '../../_hooks/use-size';

export default defineComponent({
  name: 'DateInputRange',
  components: {
    IconHover,
    IconClose,
    FeedbackIcon,
  },
  props: {
    size: {
      type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
    },
    focused: {
      type: Boolean,
    },
    focusedIndex: {
      type: Number,
    },
    error: {
      type: Boolean,
    },
    disabled: {
      type: [Boolean, Array] as PropType<boolean | boolean[]>,
      default: false,
    },
    readonly: {
      type: Boolean,
    },
    allowClear: {
      type: Boolean,
    },
    placeholder: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    inputValue: {
      type: Array as PropType<string[]>,
    },
    inputProps: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    value: {
      type: Array as PropType<(Dayjs | undefined)[]>,
      default: () => [],
    },
    format: {
      type: [String, Function] as PropType<string | ((value: Dayjs) => string)>,
      required: true,
    },
  },
  emits: [
    'focused-index-change',
    'update:focusedIndex',
    'change',
    'clear',
    'press-enter',
  ],
  setup(props, { emit, slots }) {
    const {
      error,
      focused,
      disabled,
      size,
      value,
      format,
      focusedIndex,
      inputValue,
      inputProps,
    } = toRefs(props);
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      mergedError,
      feedback,
    } = useFormItem({ size, error });
    const { mergedSize } = useSize(_mergedSize);

    const refInput0 = ref<HTMLInputElement>();
    const refInput1 = ref<HTMLInputElement>();

    const getDisabled = (index: number): boolean => {
      if (mergedDisabled.value) {
        return mergedDisabled.value;
      }
      return isArray(disabled.value) ? disabled.value[index] : disabled.value;
    };
    const disabled0 = computed(() => getDisabled(0));
    const disabled1 = computed(() => getDisabled(1));

    const prefixCls = getPrefixCls('picker');

    const classNames = computed(() => [
      prefixCls,
      `${prefixCls}-range`,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-disabled`]: disabled0.value && disabled1.value,
        [`${prefixCls}-error`]: mergedError.value,
        [`${prefixCls}-has-prefix`]: slots.prefix,
      },
    ]);

    function getInputWrapClassName(index: number) {
      return [
        `${prefixCls}-input`,
        {
          [`${prefixCls}-input-active`]: index === focusedIndex?.value,
        },
      ];
    }

    function getDisplayValue(index: number) {
      if (inputValue?.value) {
        return inputValue?.value?.[index];
      }
      const targetValue = value?.value?.[index];
      if (targetValue && isDayjs(targetValue)) {
        return isFunction(format.value)
          ? format.value(targetValue)
          : targetValue.format(format.value);
      }
      return undefined;
    }

    const displayValue0 = computed(() => getDisplayValue(0));
    const displayValue1 = computed(() => getDisplayValue(1));
    const getNativeInputProps = (index: 0 | 1) => {
      const props = {
        ...((inputProps?.value?.[index] as Record<string, any>) || {}),
      };
      delete props.onInput;
      delete props.onChange;
      delete props.onKeydown;
      delete props.onKeyDown;
      delete props.onClick;
      delete props.onFocus;
      delete props.onBlur;
      return props;
    };
    const nativeInputProps0 = computed(() => getNativeInputProps(0));
    const nativeInputProps1 = computed(() => getNativeInputProps(1));

    const callInputPropsEvent = (
      index: number,
      name: string,
      ...args: unknown[]
    ) => {
      const callback = inputProps?.value?.[index]?.[name];
      if (isFunction(callback)) {
        callback(...args);
      }
    };

    function changeFocusedInput(index: number, e?: Event) {
      emit('focused-index-change', index);
      emit('update:focusedIndex', index);
      if (e) {
        callInputPropsEvent(index, 'onClick', e);
      }
    }

    function onChange(e: Event) {
      e.stopPropagation();
      if (focusedIndex?.value === 0 || focusedIndex?.value === 1) {
        callInputPropsEvent(focusedIndex.value, 'onInput', e);
        callInputPropsEvent(focusedIndex.value, 'onChange', e);
      }
      emit('change', e);
    }

    function onPressEnter(e: KeyboardEvent) {
      if (focusedIndex?.value === 0 || focusedIndex?.value === 1) {
        callInputPropsEvent(focusedIndex.value, 'onKeydown', e);
        callInputPropsEvent(focusedIndex.value, 'onKeyDown', e);
      }
      emit('press-enter');
    }

    function onPressTab(e: KeyboardEvent) {
      if (focusedIndex?.value === 0 || focusedIndex?.value === 1) {
        callInputPropsEvent(focusedIndex.value, 'onKeydown', e);
        callInputPropsEvent(focusedIndex.value, 'onKeyDown', e);
      }
      e.preventDefault();
    }

    function onFocus(e: Event, index: number) {
      emit('focused-index-change', index);
      emit('update:focusedIndex', index);
      callInputPropsEvent(index, 'onFocus', e);
    }

    function onBlur(e: Event, index: number) {
      callInputPropsEvent(index, 'onBlur', e);
    }

    function onClear(e: Event) {
      emit('clear', e);
    }

    return {
      prefixCls,
      classNames,
      refInput0,
      refInput1,
      disabled0,
      disabled1,
      mergedDisabled,
      getDisabled,
      getInputWrapClassName,
      displayValue0,
      displayValue1,
      nativeInputProps0,
      nativeInputProps1,
      changeFocusedInput,
      onChange,
      onPressEnter,
      onPressTab,
      onFocus,
      onBlur,
      onClear,
      feedback,
    };
  },
  methods: {
    focus(index?: number) {
      const targetIndex = isNumber(index) ? index : this.focusedIndex;
      const targetElement = targetIndex === 0 ? this.refInput0 : this.refInput1;
      !isUndefined(targetIndex) &&
        !this.getDisabled(targetIndex) &&
        targetElement &&
        targetElement.focus &&
        targetElement.focus();
    },
    blur() {
      const targetElement =
        this.focusedIndex === 0 ? this.refInput0 : this.refInput1;
      targetElement && targetElement.blur && targetElement.blur();
    },
  },
});
</script>
