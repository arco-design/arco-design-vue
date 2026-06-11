<template>
  <div :class="classNames">
    <div v-if="$slots.prefix" :class="`${prefixCls}-prefix`">
      <slot name="prefix" />
    </div>
    <div :class="getInputWrapClassName(0)">
      <input
        ref="refInput0"
        :disabled="disabled0"
        :placeholder="placeholder[0]"
        :value="displayValue0"
        v-bind="readonly ? { readonly: true } : {}"
        @input="onChange"
        @keydown.enter="onPressEnter"
        @keydown.tab="onPressTab"
        @click="() => changeFocusedInput(0)"
      />
    </div>
    <span :class="`${prefixCls}-separator`">
      <slot name="separator"> - </slot>
    </span>
    <div :class="getInputWrapClassName(1)">
      <input
        ref="refInput1"
        :disabled="disabled1"
        :placeholder="placeholder[1]"
        :value="displayValue1"
        v-bind="readonly ? { readonly: true } : {}"
        @input="onChange"
        @keydown.enter="onPressEnter"
        @keydown.tab="onPressTab"
        @click="() => changeFocusedInput(1)"
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
<script setup lang="ts">
  import { computed, PropType, ref, toRefs, useSlots } from 'vue';

  import { Dayjs } from 'dayjs';

  import { useFormItem } from '../../_hooks/use-form-item';
  import { useSize } from '../../_hooks/use-size';
  import { getPrefixCls } from '../../_utils/global-config';
  import { isArray, isDayjs, isFunction, isNumber, isUndefined } from '../../_utils/is';
  import IconClose from '../../icon/icon-close';
  import FeedbackIcon from '../feedback-icon.vue';
  import IconHover from '../icon-hover.vue';

  defineOptions({ name: 'DateInputRange' });

  const props = defineProps({
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
    value: {
      type: Array as PropType<(Dayjs | undefined)[]>,
      default: () => [],
    },
    format: {
      type: [String, Function] as PropType<string | ((value: Dayjs) => string)>,
      required: true,
    },
  });

  const emit = defineEmits<{
    'focused-index-change': [_index: number];
    'update:focusedIndex': [_index: number];
    'change': [_e: Event];
    'clear': [_e: Event];
    'press-enter': [];
  }>();

  const slots = useSlots();

  const { error, focused, disabled, size, value, format, focusedIndex, inputValue } = toRefs(props);
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

  function changeFocusedInput(index: number) {
    emit('focused-index-change', index);
    emit('update:focusedIndex', index);
  }

  function onChange(e: Event) {
    e.stopPropagation();
    emit('change', e);
  }

  function onPressEnter() {
    emit('press-enter');
  }

  function onPressTab(e: Event) {
    e.preventDefault();
  }

  function onClear(e: Event) {
    emit('clear', e);
  }

  function focus(index?: number) {
    const targetIndex = isNumber(index) ? index : focusedIndex!.value;
    const targetElement = targetIndex === 0 ? refInput0.value : refInput1.value;
    !isUndefined(targetIndex) &&
      !getDisabled(targetIndex) &&
      targetElement &&
      targetElement.focus &&
      targetElement.focus();
  }
  function blur() {
    const targetElement = focusedIndex!.value === 0 ? refInput0.value : refInput1.value;
    targetElement && targetElement.blur && targetElement.blur();
  }

  defineExpose({ focus, blur });
</script>
