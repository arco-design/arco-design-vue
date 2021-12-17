import { computed, defineComponent, PropType, ref } from 'vue';
import NP from 'number-precision';
import IconStarFill from '../icon/icon-star-fill';
import IconFaceMehFill from '../icon/icon-face-meh-fill';
import IconFaceSmileFill from '../icon/icon-face-smile-fill';
import IconFaceFrownFill from '../icon/icon-face-frown-fill';
import { getPrefixCls } from '../_utils/global-config';
import { EmitType } from '../_utils/types';

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
    // for JSX
    onChange: {
      type: [Function, Array] as PropType<EmitType<(index: number) => void>>,
    },
    onHoverChange: {
      type: [Function, Array] as PropType<EmitType<(index: number) => void>>,
    },
  },
  emits: [
    'update:modelValue',
    /**
     * @zh 值改变时触发
     * @en Trigger when the value changes
     * @property {number} value
     */
    'change',
    /**
     * @zh 鼠标移动到数值上时触发
     * @en Triggered when the mouse moves over the value
     * @property {number} value
     */
    'hoverChange',
  ],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('rate');
    const _value = ref(props.defaultValue);

    const animation = ref(false);

    const hoverIndex = ref(0);

    const computedValue = computed(() => props.modelValue ?? _value.value);

    const disabled = computed(() => props.disabled || props.readonly);

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
      } else if (props.allowClear) {
        _value.value = 0;
        emit('update:modelValue', 0);
        emit('change', 0);
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

    const renderCharacter = (index: number) => {
      const fixedValue = props.allowHalf
        ? NP.times(NP.round(NP.divide(computedValue.value, 0.5), 0), 0.5)
        : Math.round(computedValue.value);

      const displayIndex = hoverIndex.value || fixedValue;
      const displayCharacter = props.grading
        ? renderGradingCharacter(index, displayIndex)
        : slots.character?.(index) ?? <IconStarFill />;

      const leftProps = disabled.value
        ? {}
        : {
            onMouseenter: () => handleMouseEnter(index, true),
            onClick: () => handleClick(index, true),
          };
      const rightProps = disabled.value
        ? {}
        : {
            onMouseenter: () => handleMouseEnter(index, false),
            onClick: () => handleClick(index, false),
          };

      const style = animation.value
        ? { animationDelay: `${50 * index}ms` }
        : {};

      const cls = [
        `${prefixCls}-character`,
        {
          [`${prefixCls}-character-half`]:
            props.allowHalf && index + 0.5 === displayIndex,
          [`${prefixCls}-character-full`]: index + 1 <= displayIndex,
          [`${prefixCls}-character-scale`]:
            animation.value && index + 1 < computedValue.value,
        },
      ];

      return (
        <div
          class={cls}
          style={style}
          onAnimationend={() => handleAnimationEnd(index)}
        >
          <div class={`${prefixCls}-character-left`} {...leftProps}>
            {displayCharacter}
          </div>
          <div class={`${prefixCls}-character-right`} {...rightProps}>
            {displayCharacter}
          </div>
        </div>
      );
    };

    const indexArray = computed(() => [
      ...Array(props.grading ? 5 : props.count),
    ]);

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-disabled`]: props.disabled,
      },
    ]);

    return () => (
      <div class={cls.value} onMouseleave={resetHoverIndex}>
        {indexArray.value.map((_, index) => renderCharacter(index))}
      </div>
    );
  },
});
