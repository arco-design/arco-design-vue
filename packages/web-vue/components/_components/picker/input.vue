<template>
  <div :class="classNames">
    <div v-if="$slots.prefix" :class="`${prefixCls}-prefix`">
      <slot name="prefix" />
    </div>
    <div :class="`${prefixCls}-input`">
      <input
        ref="refInput"
        :disabled="mergedDisabled"
        :placeholder="placeholder"
        :class="`${prefixCls}-start-time`"
        :value="displayValue"
        v-bind="readonly ? { readonly: true } : {}"
        @keydown.enter="onPressEnter"
        @input="onChange"
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

<script setup lang="ts">
  import { computed, PropType, ref, toRefs, useSlots } from 'vue';

  import { Dayjs } from 'dayjs';

  import { useFormItem } from '../../_hooks/use-form-item';
  import { useSize } from '../../_hooks/use-size';
  import { getPrefixCls } from '../../_utils/global-config';
  import { isDayjs, isFunction } from '../../_utils/is';
  import IconClose from '../../icon/icon-close';
  import FeedbackIcon from '../feedback-icon.vue';
  import IconHover from '../icon-hover.vue';

  defineOptions({ name: 'DateInput' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{
    'clear': [_e: Event];
    'press-enter': [];
    'change': [_e: Event];
    'blur': [_e: Event];
  }>();

  const slots = useSlots();

  const { error, focused, disabled, size, value, format, inputValue } = toRefs(props);
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

  const refInput = ref<HTMLInputElement>();

  function onPressEnter() {
    emit('press-enter');
  }
  function onChange(e: Event) {
    emit('change', e);
  }
  function onClear(e: Event) {
    emit('clear', e);
  }
  function onBlur(e: Event) {
    emit('blur', e);
  }

  function focus() {
    refInput.value && refInput.value.focus && refInput.value.focus();
  }
  function blur() {
    refInput.value && refInput.value.blur && refInput.value.blur();
  }

  defineExpose({ focus, blur });
</script>
