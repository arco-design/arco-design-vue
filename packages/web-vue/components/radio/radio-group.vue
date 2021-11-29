<template>
  <span :class="cls">
    <slot />
  </span>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  nextTick,
  ref,
  computed,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { SIZES, DIRECTIONS, Size, Direction } from '../_utils/constant';
import { radioGroupKey, RADIO_TYPES, RadioType } from './context';
import { EmitType } from '../_utils/types';

export default defineComponent({
  name: 'RadioGroup',
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
     * @zh 默认值（非受控状态）
     * @en Default value (uncontrolled state)
     */
    defaultValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: '',
    },
    /**
     * @zh 单选框组的类型
     * @en Types of radio group
     * @values 'radio', 'button'
     */
    type: {
      type: String as PropType<RadioType>,
      default: 'radio',
      validator: (value: any) => RADIO_TYPES.includes(value),
    },
    /**
     * @zh 单选框组的尺寸
     * @en The size of the radio group
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size>,
      default: 'medium',
      validator: (value: any) => SIZES.includes(value),
    },
    /**
     * @zh 单选框组的方向
     * @en The direction of the radio group
     * @values 'horizontal', 'vertical'
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
        EmitType<(value: string | number | boolean, e: Event) => void>
      >,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {(string | number)} value
     */
    'change',
  ],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('radio-group');
    const { size, type, disabled, modelValue } = toRefs(props);

    const _value = ref(props.defaultValue);

    const computedValue = computed(() => {
      return props.modelValue ?? _value.value;
    });

    const handleChange = (value: string | number | boolean, e: Event) => {
      _value.value = value;
      emit('update:modelValue', value);
      nextTick(() => {
        emit('change', value, e);
      });
    };

    provide(
      radioGroupKey,
      reactive({
        name: 'ArcoRadioGroup',
        value: computedValue,
        size,
        type,
        disabled,
        handleChange,
      })
    );

    watch(computedValue, (cur) => {
      if (_value.value !== cur) {
        _value.value = cur;
      }
    });

    const cls = computed(() => [
      `${prefixCls}${props.type === 'button' ? '-button' : ''}`,
      `${prefixCls}-size-${props.size}`,
      `${prefixCls}-direction-${props.direction}`,
      {
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
