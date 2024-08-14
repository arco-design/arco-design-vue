import type { PropType } from 'vue';
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  ref,
  computed,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { Size, Direction } from '../_utils/constant';
import { radioGroupKey, RadioType } from './context';
import {
  isFunction,
  isNull,
  isNumber,
  isString,
  isUndefined,
} from '../_utils/is';
import { useFormItem } from '../_hooks/use-form-item';
import { RadioOption } from './interface';
import Radio from './radio';
import { useSize } from '../_hooks/use-size';

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
    },
    /**
     * @zh 单选框组的尺寸
     * @en The size of the radio group
     * @values 'mini','small','medium','large'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 选项
     * @en Options
     * @version 2.27.0
     */
    options: {
      type: Array as PropType<Array<string | number | RadioOption>>,
    },
    /**
     * @zh 单选框组的方向
     * @en The direction of the radio group
     * @values 'horizontal', 'vertical'
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
    'update:modelValue': (value: string | number | boolean) => true,
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property { string | number | boolean } value
     */
    'change': (value: string | number | boolean, ev: Event) => true,
  },
  /**
   * @zh radio 文案内容
   * @en radio label content
   * @slot label
   * @binding {RadioOption} data
   * @version 2.27.0
   */
  /**
   * @zh 自定义单选框
   * @en Custom radio
   * @slot radio
   * @binding {boolean} checked
   * @binding {boolean} disabled
   * @version 2.27.0
   */
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('radio-group');
    const { size, type, disabled, modelValue } = toRefs(props);
    const {
      mergedDisabled,
      mergedSize: _mergedSize,
      eventHandlers,
    } = useFormItem({
      size,
      disabled,
    });
    const { mergedSize } = useSize(_mergedSize);

    const _value = ref(props.defaultValue);

    const computedValue = computed(() => props.modelValue ?? _value.value);

    const options = computed(() => {
      return (props.options ?? []).map((option) => {
        if (isString(option) || isNumber(option)) {
          return {
            label: option,
            value: option,
          } as RadioOption;
        }
        return option;
      });
    });

    const handleChange = (value: string | number | boolean, e: Event) => {
      _value.value = value;
      emit('update:modelValue', value);
      emit('change', value, e);
      eventHandlers.value?.onChange?.(e);
    };

    provide(
      radioGroupKey,
      reactive({
        name: 'ArcoRadioGroup',
        value: computedValue,
        size: mergedSize,
        type,
        disabled: mergedDisabled,
        slots,
        handleChange,
      })
    );

    watch(computedValue, (cur) => {
      if (_value.value !== cur) {
        _value.value = cur;
      }
    });

    watch(modelValue, (val) => {
      if (isUndefined(val) || isNull(val)) {
        _value.value = '';
      }
    });

    const cls = computed(() => [
      `${prefixCls}${props.type === 'button' ? '-button' : ''}`,
      `${prefixCls}-size-${mergedSize.value}`,
      `${prefixCls}-direction-${props.direction}`,
      {
        [`${prefixCls}-disabled`]: mergedDisabled.value,
      },
    ]);

    const renderOptions = () => {
      return options.value.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          modelValue={computedValue.value === option.value}
        >
          {slots.label
            ? slots.label({ data: option })
            : isFunction(option.label)
            ? option.label()
            : option.label}
        </Radio>
      ));
    };

    return () => (
      <span class={cls.value}>
        {options.value.length > 0 ? renderOptions() : slots.default?.()}
      </span>
    );
  },
});
