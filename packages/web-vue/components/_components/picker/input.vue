<template>
  <div :class="classNames">
    <div v-if="$slots.prefix" :class="`${prefixCls}-prefix`">
      <slot name="prefix" />
    </div>
    <div :class="`${prefixCls}-input`">
      <input
        ref="refInput"
        v-bind="nativeInputProps"
        :disabled="mergedDisabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :class="`${prefixCls}-start-time`"
        :value="displayValue"
        @keydown.enter="onPressEnter"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div :class="`${prefixCls}-suffix`">
      <IconHover
        v-if="allowClear && !mergedDisabled && displayValue"
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
import { isDayjs, isFunction } from '../../_utils/is';
import IconClose from '../../icon/icon-close';
import IconHover from '../icon-hover.vue';
import { useFormItem } from '../../_hooks/use-form-item';
import { useSize } from '../../_hooks/use-size';
import FeedbackIcon from '../feedback-icon.vue';

export default defineComponent({
  name: 'DateInput',
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
    disabled: {
      type: Boolean,
    },
    readonly: {
      type: Boolean,
    },
    error: {
      type: Boolean,
    },
    allowClear: {
      type: Boolean,
    },
    placeholder: {
      type: String,
    },
    inputProps: {
      type: Object as PropType<Record<string, any>>,
    },
    inputValue: {
      type: String,
    },
    value: {
      type: Object as PropType<Dayjs>,
    },
    format: {
      type: [String, Function] as PropType<string | ((value: Dayjs) => string)>,
      required: true,
    },
  },
  emits: ['clear', 'press-enter', 'change', 'blur'],
  setup(props, { emit, slots }) {
    const {
      error,
      focused,
      disabled,
      size,
      value,
      format,
      inputValue,
      inputProps,
    } = toRefs(props);
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      mergedError,
      feedback,
    } = useFormItem({ size, disabled, error });
    const { mergedSize } = useSize(_mergedSize);

    const prefixCls = getPrefixCls('picker');

    const classNames = computed(() => [
      prefixCls,
      `${prefixCls}-size-${mergedSize.value}`,
      {
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
        [`${prefixCls}-error`]: mergedError.value,
        [`${prefixCls}-has-prefix`]: slots.prefix,
      },
    ]);
    const displayValue = computed(() => {
      if (inputValue?.value) return inputValue?.value;
      if (value?.value && isDayjs(value.value)) {
        return isFunction(format.value)
          ? format.value(value.value)
          : value.value.format(format.value);
      }
      return undefined;
    });
    const nativeInputProps = computed(() => {
      const props = {
        ...(inputProps?.value || {}),
      };
      delete props.onInput;
      delete props.onChange;
      delete props.onKeydown;
      delete props.onKeyDown;
      delete props.onFocus;
      delete props.onBlur;
      return props;
    });

    const refInput = ref<HTMLInputElement>();
    const callInputPropsEvent = (name: string, ...args: unknown[]) => {
      const callback = inputProps?.value?.[name];
      if (isFunction(callback)) {
        callback(...args);
      }
    };

    return {
      feedback,
      prefixCls,
      classNames,
      displayValue,
      nativeInputProps,
      mergedDisabled,
      refInput,
      onPressEnter(e: KeyboardEvent) {
        callInputPropsEvent('onKeydown', e);
        callInputPropsEvent('onKeyDown', e);
        emit('press-enter');
      },
      onChange(e: Event) {
        callInputPropsEvent('onInput', e);
        callInputPropsEvent('onChange', e);
        emit('change', e);
      },
      onClear(e: Event) {
        emit('clear', e);
      },
      onFocus(e: Event) {
        callInputPropsEvent('onFocus', e);
      },
      onBlur(e: Event) {
        callInputPropsEvent('onBlur', e);
        emit('blur', e);
      },
    };
  },
  methods: {
    focus() {
      this.refInput && this.refInput.focus && this.refInput.focus();
    },
    blur() {
      this.refInput && this.refInput.blur && this.refInput.blur();
    },
  },
});
</script>
