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
import { CheckboxOption } from './interface';
import Checkbox from './checkbox.vue';
import { isFunction, isNumber, isString } from '../_utils/is';

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
     * @zh 以配置形式设置子元素
     * @en Default value (uncontrolled state)
     */
    options: {
      type: Array as PropType<Array<string | number | CheckboxOption>>,
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
  /**
   * @zh checkbox 文案内容
   * @en checkbox label content
   * @slot label
   */
  setup(props, { emit, slots }) {
    const { disabled } = toRefs(props);
    const prefixCls = getPrefixCls('checkbox-group');
    const { mergedDisabled, eventHandlers } = useFormItem({
      disabled,
    });

    const _value = ref(props.defaultValue);
    const computedValue = computed(() => props.modelValue ?? _value.value);

    const options = computed(() => {
      return props.options.map((option) => {
        if (isString(option) || isNumber(option)) {
          return {
            label: option,
            value: option,
          } as CheckboxOption;
        }
        return option;
      });
    });

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

    return () => {
      let children = null;
      if (options.value && options.value.length > 0) {
        children = options.value.map((option, index) => (
          <Checkbox
            key={option.value.toString() ?? index}
            disabled={option.disabled}
            indeterminate={option.indeterminate}
            value={option.value}
            modelValue={computedValue.value.indexOf(option.value) !== -1}
            onChange={option?.onChange}
          >
            {slots.label
              ? slots.label(option)
              : isFunction(option.label)
              ? option.label()
              : option.label}
          </Checkbox>
        ));
      }
      return <span class={cls.value}>{children || slots.default?.()}</span>;
    };
  },
});
