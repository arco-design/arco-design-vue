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
      changeFocusedInput,
      onChange,
      onPressEnter,
      onPressTab,
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
