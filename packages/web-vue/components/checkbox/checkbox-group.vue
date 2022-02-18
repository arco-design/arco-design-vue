<template>
  <span :class="cls">
    <slot />
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  computed,
  defineComponent,
  nextTick,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { DIRECTIONS, Direction } from '../_utils/constant';
import { checkboxGroupKey } from './context';
import { EmitType } from '../_utils/types';
import { useFormItem } from '../_hooks/use-form-item';

export default defineComponent({
  name: 'CheckboxGroup',
  props: {
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: Array as PropType<Array<string | number | boolean>>,
      default: undefined,
    },
    /**
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: Array as PropType<Array<string | number | boolean>>,
      default: () => [],
    },
    /**
     * @zh 复选框的排列方向
     * @en Arrangement direction of checkboxes
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
      validator: (value: any) => DIRECTIONS.includes(value),
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<
        EmitType<(value: Array<string | number | boolean>, e: Event) => void>
      >,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {Array<string | number | boolean>} value
     */
    'change',
  ],
  setup(props, { emit }) {
    const { disabled } = toRefs(props);
    const prefixCls = getPrefixCls('checkbox-group');
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled,
    });

    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    const handleChange = (value: Array<string | number>, e: Event) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value, e);
      eventHandlers.value?.onChange?.(e);
    };

    provide(
      checkboxGroupKey,
      reactive({
        name: 'ArcoCheckboxGroup',
        computedValue,
        disabled: mergedDisabled,
        handleChange,
      })
    );

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-direction-${props.direction}`,
    ]);

    watch(
      () => props.modelValue,
      (curValue) => {
        if (curValue) {
          _value.value = [...curValue];
        }
      }
    );

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
