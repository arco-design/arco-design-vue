import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue';
import NP from 'number-precision';
import IconStarFill from '../icon/icon-star-fill';
import IconFaceMehFill from '../icon/icon-face-meh-fill';
import IconFaceSmileFill from '../icon/icon-face-smile-fill';
import IconFaceFrownFill from '../icon/icon-face-frown-fill';
import { getPrefixCls } from '../_utils/global-config';
import { useFormItem } from '../_hooks/use-form-item';
import { isNull, isObject, isString, isUndefined } from '../_utils/is';

export default defineComponent({
  name: 'Rate',
  props: {
    /**
     * @zh 评分的总数
     * @en Total number of rate
     */
    count: {
      type: Number,
      default: 5,
    },
    /**
     * @zh 绑定值
     * @en Value
     * @vModel
     */
    modelValue: {
      type: Number,
      default: undefined,
    },
    /**
     * @zh 默认值
     * @en Default Value
     */
    defaultValue: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 是否允许半选
     * @en Whether to allow half selection
     */
    allowHalf: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否允许清除
     * @en Whether to allow clear
     */
    allowClear: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启笑脸分级
     * @en Whether to enable smile grading
     */
    grading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为只读状态
     * @en Whether it is readonly
     */
    readonly: {
      type: Boolean,
      default: false,
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
     * @zh 颜色
     * @en Color
     * @version 2.18.0
     */
    color: {
      type: [String, Object] as PropType<string | Record<string, string>>,
    },
  },
  emits: {
    'update:modelValue': (value: number) => true,
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {number} value
     */
    'change': (value: number) => true,
    /**
     * @zh 鼠标移动到数值上时触发
     * @en Triggered when the mouse moves over the value
     * @property {number} value
     */
    'hoverChange': (value: number) => true,
  },
  /**
   * @zh 符号
   * @en Character
   * @slot character
   * @binding {number} index
   */
  setup(props, { emit, slots }) {
    const { modelValue } = toRefs(props);
    const prefixCls = getPrefixCls('rate');
    const { mergedDisabled: _mergedDisabled, eventHandlers } = useFormItem({
      disabled: toRef(props, 'disabled'),
    });
    const _value = ref(props.defaultValue);

    const animation = ref(false);

    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = 0;
      }
    });

    const hoverIndex = ref(0);

    const computedValue = computed(() => props.modelValue ?? _value.value);

    const displayIndex = computed(() => {
      const fixedValue = props.allowHalf
        ? NP.times(NP.round(NP.divide(computedValue.value, 0.5), 0), 0.5)
        : Math.round(computedValue.value);

      return hoverIndex.value || fixedValue;
    });

    const mergedDisabled = computed(
      () => _mergedDisabled.value || props.readonly
    );

    const indexArray = computed<undefined[]>(() => [
      ...Array(props.grading ? 5 : props.count),
    ]);

    const customColor = computed(() => {
      if (isString(props.color)) {
        return indexArray.value.map(() => props.color as string);
      }
      if (isObject(props.color)) {
        const sortedKeys = Object.keys(props.color)
          .map((key) => Number(key))
          .sort((a, b) => b - a);
        let threshold = sortedKeys.pop() ?? indexArray.value.length;
        return indexArray.value.map((_, index) => {
          if (index + 1 > threshold) {
            threshold = sortedKeys.pop() ?? threshold;
          }
          return (props.color as Record<string, string>)[String(threshold)];
        });
      }
      return undefined;
    });

    const resetHoverIndex = () => {
      if (hoverIndex.value) {
        hoverIndex.value = 0;
        emit('hoverChange', 0);
      }
    };

    const handleMouseEnter = (index: number, isHalf: boolean) => {
      const newHoverIndex = isHalf && props.allowHalf ? index + 0.5 : index + 1;
      if (newHoverIndex !== hoverIndex.value) {
        hoverIndex.value = newHoverIndex;
        emit('hoverChange', newHoverIndex);
      }
    };

    const handleClick = (index: number, isHalf: boolean) => {
      const newValue = isHalf && props.allowHalf ? index + 0.5 : index + 1;
      animation.value = true;
      if (newValue !== computedValue.value) {
        _value.value = newValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
        eventHandlers.value?.onChange?.();
      } else if (props.allowClear) {
        _value.value = 0;
        emit('update:modelValue', 0);
        emit('change', 0);
        eventHandlers.value?.onChange?.();
      }
    };

    const handleAnimationEnd = (index: number) => {
      if (animation.value && index + 1 >= computedValue.value - 1) {
        animation.value = false;
      }
    };

    const renderGradingCharacter = (index: number, displayIndex: number) => {
      if (index > displayIndex) {
        return <IconFaceMehFill />;
      }

      if (displayIndex <= 2) {
        return <IconFaceFrownFill />;
      }
      if (displayIndex <= 3) {
        return <IconFaceMehFill />;
      }
      return <IconFaceSmileFill />;
    };

    const getAriaProps = (index: number, isHalf = false) => {
      return {
        'role': 'radio',
        'aria-checked': index + (isHalf ? 0.5 : 1) <= computedValue.value,
        'aria-setsize': indexArray.value.length,
        'aria-posinset': index + (isHalf ? 0.5 : 1),
      };
    };

    const renderElement = (index: number) => {
      if (props.grading) {
        return renderGradingCharacter(index, displayIndex.value);
      }
      if (slots.character) {
        return slots.character({ index });
      }
      return <IconStarFill />;
    };

    // TODO: need to perf
    const renderCharacter = (index: number) => {
      const leftProps = mergedDisabled.value
        ? {}
        : {
            onMouseenter: () => handleMouseEnter(index, true),
            onClick: () => handleClick(index, true),
          };
      const rightProps = mergedDisabled.value
        ? {}
        : {
            onMouseenter: () => handleMouseEnter(index, false),
            onClick: () => handleClick(index, false),
          };

      const style = animation.value
        ? { animationDelay: `${50 * index}ms` }
        : undefined;

      const parseDisplayIndex = Math.ceil(displayIndex.value) - 1;

      const leftStyle =
        customColor.value &&
        props.allowHalf &&
        index + 0.5 === displayIndex.value
          ? { color: customColor.value[parseDisplayIndex] }
          : undefined;
      const rightStyle =
        customColor.value && index + 1 <= displayIndex.value
          ? { color: customColor.value[parseDisplayIndex] }
          : undefined;

      const cls = [
        `${prefixCls}-character`,
        {
          [`${prefixCls}-character-half`]:
            props.allowHalf && index + 0.5 === displayIndex.value,
          [`${prefixCls}-character-full`]: index + 1 <= displayIndex.value,
          [`${prefixCls}-character-scale`]:
            animation.value && index + 1 < computedValue.value,
        },
      ];

      return (
        <div
          class={cls}
          style={style}
          {...(!props.allowHalf ? getAriaProps(index) : undefined)}
          onAnimationend={() => handleAnimationEnd(index)}
        >
          <div
            class={`${prefixCls}-character-left`}
            style={leftStyle}
            {...leftProps}
            {...(props.allowHalf ? getAriaProps(index, true) : undefined)}
          >
            {renderElement(index)}
          </div>
          <div
            class={`${prefixCls}-character-right`}
            style={rightStyle}
            {...rightProps}
            {...(props.allowHalf ? getAriaProps(index) : undefined)}
          >
            {renderElement(index)}
          </div>
        </div>
      );
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-disabled`]: _mergedDisabled.value,
      },
    ]);

    return () => (
      <div class={cls.value} onMouseleave={resetHoverIndex}>
        {indexArray.value.map((_, index) => renderCharacter(index))}
      </div>
    );
  },
});
