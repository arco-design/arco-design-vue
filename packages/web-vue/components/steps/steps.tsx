import { computed, defineComponent, PropType, ref } from 'vue';
import { Direction, DIRECTIONS } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { getChildrenComponents } from '../_utils/vue-utils';
import { StepStatus, StepsType } from './interface';

export default defineComponent({
  name: 'Steps',
  props: {
    /**
     * @zh 步骤条的类型
     * @en The type of the steps
     * @values 'default', 'arrow', 'dot', 'navigation'
     */
    type: {
      type: String as PropType<StepsType>,
      default: 'default',
    },
    /**
     * @zh 步骤条的显示方向
     * @en The direction of the steps
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 标签描述文字放置的位置
     * @en The location where the label description is placed.
     * @values 'horizontal', 'vertical'
     */
    labelPlacement: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    /**
     * @zh 当前步骤数
     * @en Number of current step
     * @vModel
     */
    current: {
      type: Number,
      default: undefined,
    },
    /**
     * @zh 默认的步骤数（非受控状态）
     * @en The default number of step (uncontrolled state)
     */
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    /**
     * @zh 当前步骤的状态
     * @en The status of the current step
     * @values 'wait', 'process', 'finish', 'error'
     */
    status: {
      type: String as PropType<StepStatus>,
      default: 'process',
    },
    /**
     * @zh 是否使用无连接线样式
     * @en Whether to use the connectionless style
     */
    lineLess: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否使用小型步骤条
     * @en Whether to use a small step bar
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否可以点击切换
     * @en Whether you can click to switch
     */
    changeable: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:current',
    /**
     * @zh 步骤数发生改变时触发
     * @en Triggered when the number of steps changes
     * @property {number} step
     */
    'change',
  ],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('steps');
    const _current = ref(props.defaultCurrent);

    const computedCurrent = computed(() => props.current ?? _current.value);

    const direction = computed(() =>
      ['navigation', 'arrow'].includes(props.type)
        ? 'horizontal'
        : props.direction
    );

    const labelPlacement = computed(() => {
      if (props.type === 'dot') {
        return direction.value === 'vertical' ? 'horizontal' : 'vertical';
      }
      if (props.type === 'navigation') {
        return 'horizontal';
      }
      return props.labelPlacement;
    });

    const handleClick = (step: number, e: Event) => {
      _current.value = step;
      emit('update:current', step);
      emit('change', step, e);
    };

    const getStatus = (step: number, current: number): StepStatus => {
      if (step < current) {
        return 'finish';
      }
      if (step > current) {
        return 'wait';
      }
      return props.status;
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${direction.value}`,
      `${prefixCls}-label-${labelPlacement.value}`,
      `${prefixCls}-mode-${props.type}`,
      {
        [`${prefixCls}-changeable`]: props.changeable,
        [`${prefixCls}-size-small`]: props.small,
        [`${prefixCls}-line-less`]: props.lineLess,
      },
    ]);

    return () => {
      const children = getChildrenComponents(
        slots.default?.() ?? [],
        'Step',
        (vn, index) => {
          const step = index + 1;
          const status = getStatus(step, computedCurrent.value);
          return {
            step,
            current: computedCurrent.value,
            status: vn.props?.status ?? status,
            direction: direction.value,
            labelPlacement: labelPlacement.value,
            lineLess: props.lineLess,
            type: props.type,
            changeable: props.changeable,
            onClick: handleClick,
          };
        }
      );

      return <div class={cls.value}>{children}</div>;
    };
  },
});
