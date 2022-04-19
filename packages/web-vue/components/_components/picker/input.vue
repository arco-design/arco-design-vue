<template>
  <div :class="classNames">
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

export default defineComponent({
  name: 'DateInput',
  components: {
    IconHover,
    IconClose,
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
  emits: ['clear', 'press-enter', 'change'],
  setup(props, { emit }) {
    const { error, focused, disabled, size, value, format, inputValue } =
      toRefs(props);
    const {
      mergedSize: _mergedSize,
      mergedDisabled,
      mergedError,
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
      mergedDisabled,
      refInput,
      onPressEnter() {
        emit('press-enter');
      },
      onChange(e: Event) {
        emit('change', e);
      },
      onClear(e: Event) {
        emit('clear', e);
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
