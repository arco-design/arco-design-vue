<template>
  <span :class="cls" @click="handleClick">
    <input
      ref="checkboxRef"
      type="checkbox"
      :checked="computedChecked"
      :value="value"
      :class="`${prefixCls}-target`"
      :disabled="mergedDisabled"
      @click.stop
      @change="handleChange"
    />
    <icon-hover
      :class="`${prefixCls}-icon-hover`"
      :disabled="mergedDisabled || computedChecked"
    >
      <div :class="`${prefixCls}-icon`">
        <icon-check v-if="computedChecked" :class="`${prefixCls}-icon-check`" />
      </div>
    </icon-hover>
    <span v-if="$slots.default" :class="`${prefixCls}-label`">
      <slot />
    </span>
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconCheck from './icon-check';
import { isArray } from '../_utils/is';
import { checkboxGroupKey } from './context';
import { EmitType } from '../_utils/types';

export default defineComponent({
  name: 'Checkbox',
  components: {
    IconCheck,
    IconHover,
  },
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: [Boolean, Array] as PropType<
        boolean | Array<string | number | boolean>
      >,
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
      type: [String, Number] as PropType<string | number>,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为半选状态
     * @en Whether it is half-selected
     */
    indeterminate: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: boolean | Array<string | number | boolean>) => void>
      >,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {boolean | Array<string | number | boolean>} value
     */
    'change',
  ],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('checkbox');
    const checkboxRef = ref<HTMLInputElement>();
    const checkboxGroupCtx = inject(checkboxGroupKey, undefined);
    const isGroup = checkboxGroupCtx?.name === 'ArcoCheckboxGroup';

    const mergedDisabled = computed(
      () => checkboxGroupCtx?.disabled || props.disabled
    );

    const _checked = ref(props.defaultChecked);
    const computedValue = computed(() =>
      isGroup
        ? checkboxGroupCtx?.computedValue
        : props.modelValue ?? _checked.value
    );
    const computedChecked = computed<boolean>(() => {
      return isArray(computedValue.value)
        ? computedValue.value.includes(props.value ?? true)
        : computedValue.value;
    });

    const handleChange = (e: Event) => {
      const { checked } = e.target as HTMLInputElement;

      let newValue: boolean | Array<string | number | boolean> = checked;
      if (isArray(computedValue.value)) {
        const set = new Set(computedValue.value);
        if (checked) {
          set.add(props.value ?? true);
        } else {
          set.delete(props.value ?? true);
        }
        newValue = Array.from(set);
      }

      _checked.value = checked;
      if (isGroup && isArray(newValue)) {
        checkboxGroupCtx?.handleChange(newValue, e);
      } else {
        emit('update:modelValue', newValue);
        emit('change', newValue, e);
      }

      nextTick(() => {
        if (
          checkboxRef.value &&
          checkboxRef.value.checked !== computedChecked.value
        ) {
          checkboxRef.value.checked = computedChecked.value;
        }
      });
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-checked`]: computedChecked.value,
        [`${prefixCls}-indeterminate`]: props.indeterminate,
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    const handleClick = (e: MouseEvent) => {
      if (checkboxRef.value && e.target !== checkboxRef.value) {
        checkboxRef.value.click();
      }
    };

    watch(computedValue, (value) => {
      let checked;
      if (isArray(value)) {
        checked = value.includes(props.value ?? true);
      } else {
        checked = value;
      }
      if (_checked.value !== checked) {
        _checked.value = checked;
      }
      if (checkboxRef.value && checkboxRef.value.checked !== checked) {
        checkboxRef.value.checked = checked;
      }
    });

    return {
      prefixCls,
      cls,
      checkboxRef,
      mergedDisabled,
      computedValue,
      computedChecked,
      handleClick,
      handleChange,
    };
  },
});
</script>
