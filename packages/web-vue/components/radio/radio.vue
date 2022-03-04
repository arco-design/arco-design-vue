<template>
  <label :class="cls">
    <input
      ref="inputRef"
      type="radio"
      :checked="computedChecked"
      :value="value"
      :class="`${prefixCls}-target`"
      :disabled="mergedDisabled"
      @click.stop
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <template v-if="mergedType === 'radio'">
      <slot name="radio" :checked="computedChecked" :disabled="mergedDisabled">
        <icon-hover
          :class="`${prefixCls}-icon-hover`"
          :disabled="mergedDisabled || computedChecked"
        >
          <span :class="`${prefixCls}-icon`" />
        </icon-hover>
      </slot>
      <span v-if="$slots.default" :class="`${prefixCls}-label`">
        <slot />
      </span>
    </template>
    <span v-else :class="`${prefixCls}-button-content`">
      <slot />
    </span>
  </label>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  ref,
  inject,
  watch,
  nextTick,
  toRef,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import type { RadioType } from './context';
import { RADIO_TYPES, radioGroupKey } from './context';
import { isUndefined } from '../_utils/is';
import { EmitType } from '../_utils/types';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'Radio',
  components: {
    IconHover,
  },
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: undefined,
    },
    /**
     * @zh 默认是否选中（非受控状态）
     * @en Whether checked by default (uncontrolled state)
     */
    defaultChecked: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 选项的 `value`
     * @en The `value` of the option
     */
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: true,
    },
    /**
     * @zh 单选的类型
     * @en Radio type
     * @values 'radio', 'button'
     */
    type: {
      type: String as PropType<RadioType>,
      default: 'radio',
      validator: (value: any) => RADIO_TYPES.includes(value),
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    // private
    uninjectGroupContext: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: string | number | boolean, e: Event) => void>
      >,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {string, number, boolean} value
     */
    'change',
  ],
  /**
   * @zh 自定义单选框
   * @en Custom radio
   * @slot radio
   * @version 2.18.0
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('radio');
    const radioGroupCtx = !props.uninjectGroupContext
      ? inject(radioGroupKey, undefined)
      : undefined;
    const { mergedDisabled: _mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });

    const inputRef = ref<HTMLInputElement | null>(null);
    const _checked = ref(props.defaultChecked);

    const isGroup = computed(() => radioGroupCtx?.name === 'ArcoRadioGroup');
    const mergedType = computed(() => radioGroupCtx?.type ?? props.type);
    const mergedDisabled = computed(
      () => radioGroupCtx?.disabled || _mergedDisabled.value
    );

    const computedChecked = computed(() => {
      if (isGroup.value) {
        return radioGroupCtx?.value === (props.value ?? true);
      }

      if (!isUndefined(props.modelValue)) {
        return props.modelValue === (props.value ?? true);
      }
      return _checked.value;
    });

    watch(computedChecked, (curValue, preValue) => {
      if (curValue !== preValue) {
        _checked.value = curValue;
        if (inputRef.value) {
          inputRef.value.checked = curValue;
        }
      }
    });

    // const handleClick = (ev: MouseEvent) => {
    //   if (!props.disabled && inputRef.value && ev.target !== inputRef.value) {
    //     ev.preventDefault();
    //     inputRef.value.click();
    //   }
    // };

    const handleFocus = (ev: FocusEvent) => {
      eventHandlers.value?.onFocus?.(ev);
    };

    const handleBlur = (ev: FocusEvent) => {
      eventHandlers.value?.onBlur?.(ev);
    };

    const handleChange = (e: Event) => {
      _checked.value = true;
      if (isGroup.value) {
        radioGroupCtx?.handleChange(props.value ?? true, e);
      } else {
        emit('update:modelValue', props.value ?? true);
        emit('change', props.value ?? true, e);
        eventHandlers.value?.onChange?.(e);
      }

      nextTick(() => {
        if (
          inputRef.value &&
          inputRef.value.checked !== computedChecked.value
        ) {
          inputRef.value.checked = computedChecked.value;
        }
      });
    };

    const cls = computed(() => [
      `${mergedType.value === 'button' ? `${prefixCls}-button` : prefixCls}`,
      {
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    return {
      prefixCls,
      cls,
      inputRef,
      mergedType,
      mergedDisabled,
      computedChecked,
      handleChange,
      handleFocus,
      handleBlur,
    };
  },
});
</script>
