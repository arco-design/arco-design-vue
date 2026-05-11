import type { PropType } from 'vue';
import { computed, defineComponent, provide, reactive, ref, toRefs, watch } from 'vue';

import { useFormItem } from '../_hooks/use-form-item';
import { Direction } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { isFunction, isNumber, isString, isArray } from '../_utils/is';
import Checkbox from './checkbox';
import { checkboxGroupKey } from './context';
import { CheckboxOption } from './interface';

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
     * @zh 支持最多选中的数量
     * @en Support the maximum number of selections
     * @version 2.36.0
     */
    max: {
      type: Number,
    },
    /**
     * @zh 选项
     * @en Options
     * @version 2.27.0
     */
    options: {
      type: Array as PropType<Array<string | number | CheckboxOption>>,
    },
    /**
     * @zh 复选框的排列方向
     * @en Arrangement direction of checkboxes
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (_value: (string | number | boolean)[]) => true,
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @param {(string | number | boolean)[]} value
     * @param {Event} ev
     */
    'change': (_value: (string | number | boolean)[], _ev: Event) => true,
  },
  /**
   * @zh checkbox 文案内容
   * @en checkbox label content
   * @slot label
   * @binding {CheckboxOption} data
   * @version 2.27.0
   */
  /**
   * @zh 自定义复选框
   * @en Custom checkbox
   * @slot checkbox
   * @binding {boolean} checked
   * @binding {boolean} disabled
   * @version 2.27.0
   */
  setup(props, { emit, slots }) {
    const { disabled } = toRefs(props);
    const prefixCls = getPrefixCls('checkbox-group');
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled,
    });

    const _value = ref(props.defaultValue);
    const computedValue = computed(() =>
      isArray(props.modelValue) ? props.modelValue : _value.value,
    );
    const isMaxed = computed(() =>
      props.max === undefined ? false : computedValue.value.length >= props.max,
    );

    const options = computed(() => {
      return (props.options ?? []).map((option) => {
        if (isString(option) || isNumber(option)) {
          return {
            label: option,
            value: option,
          } as CheckboxOption;
        }
        return option;
      });
    });

    const handleChange = (value: Array<string | number | boolean>, e: Event) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value, e);
      eventHandlers.value?.onChange?.(e);
    };

    provide(
      checkboxGroupKey,
      reactive({
        name: 'SDCheckboxGroup',
        computedValue,
        disabled: mergedDisabled,
        isMaxed,
        slots,
        handleChange,
      }),
    );

    const cls = computed(() => [prefixCls, `${prefixCls}-direction-${props.direction}`]);

    watch(
      () => props.modelValue,
      (curValue) => {
        if (isArray(curValue)) {
          _value.value = [...curValue];
        } else {
          _value.value = [];
        }
      },
    );

    const renderOptions = () => {
      return options.value.map((option) => {
        const checked = computedValue.value.includes(option.value);
        return (
          <Checkbox
            key={option.value}
            value={option.value}
            disabled={option.disabled || (!checked && isMaxed.value)}
            indeterminate={option.indeterminate}
            modelValue={checked}
          >
            {slots.label
              ? slots.label({ data: option })
              : isFunction(option.label)
                ? option.label()
                : option.label}
          </Checkbox>
        );
      });
    };

    return () => (
      <span class={cls.value}>
        {options.value.length > 0 ? renderOptions() : slots.default?.()}
      </span>
    );
  },
});
