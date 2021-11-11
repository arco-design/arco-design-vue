<template>
  <div :class="classNames">
    <div :class="`${prefixCls}-input`">
      <input
        ref="refInput"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="`${prefixCls}-start-time`"
        :value="displayValue"
        v-bind="readonly ? { readonly: true } : {}"
        @keydown.enter="onPressEnter"
        @input="onChange"
      />
    </div>
    <div :class="`${prefixCls}-suffix`">
      <IconHover
        v-if="allowClear && !disabled && displayValue"
        :prefix="prefixCls"
        :class="`${prefixCls}-clear-icon`"
        @click="onClear"
      >
        <IconClose />
      </IconHover>
      <span :class="`${prefixCls}-suffix-icon`">
        <slot name="suffix-icon" />
      </span>
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

export default defineComponent({
  name: 'DateInput',
  components: {
    IconHover,
    IconClose,
  },
  props: {
    size: {
      type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
      required: true,
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
  },
  emits: ['clear', 'pressEnter', 'change'],
  setup(props, { emit }) {
    const { error, focused, disabled, size, value, format, inputValue } =
      toRefs(props);

    const prefixCls = getPrefixCls('picker');

    const classNames = computed(() => [
      prefixCls,
      `${prefixCls}-size-${size.value}`,
      {
        [`${prefixCls}-focused`]: focused.value,
        [`${prefixCls}-disabled`]: disabled.value,
        [`${prefixCls}-error`]: error.value,
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

    return {
      prefixCls,
      classNames,
      displayValue,
      refInput,
      onPressEnter() {
        emit('pressEnter');
      },
      onChange(e: Event) {
        emit('change', e);
      },
      onClear() {
        emit('clear');
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
