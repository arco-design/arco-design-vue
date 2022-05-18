<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { Direction } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import { StepData, StepStatus, StepsType } from './interface';
import { stepsInjectionKey } from './context';

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
  emits: {
    'update:current': (step: number) => true,
    /**
     * @zh 步骤数发生改变时触发
     * @en Triggered when the number of steps changes
     * @param {number} step
     * @param {Event} ev
     */
    'change': (step: number, ev: Event) => true,
  },
  setup(props, { emit, slots }) {
    const { type, lineLess } = toRefs(props);
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

    const getStatus = (step: number): StepStatus => {
      if (step < computedCurrent.value) {
        return 'finish';
      }
      if (step > computedCurrent.value) {
        return 'wait';
      }
      return props.status;
    };

    const handleClick = (step: number, e: Event) => {
      if (props.changeable) {
        _current.value = step;
        emit('update:current', step);
        emit('change', step, e);
      }
    };

    const stepMap = reactive(new Map<number, StepData>());
    const errorSteps = computed(() =>
      Array.from(stepMap.values())
        .filter((item) => item.status === 'error')
        .map((item) => item.step)
    );

    const addItem = (step: number, data: StepData) => {
      stepMap.set(step, data);
    };

    const removeItem = (step: number) => {
      stepMap.delete(step);
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${direction.value}`,
      `${prefixCls}-label-${labelPlacement.value}`,
      `${prefixCls}-mode-${type.value}`,
      {
        [`${prefixCls}-changeable`]: props.changeable,
        [`${prefixCls}-size-small`]: props.small && props.type !== 'dot',
        [`${prefixCls}-line-less`]: lineLess.value,
      },
    ]);

    provide(
      stepsInjectionKey,
      reactive({
        type,
        direction,
        labelPlacement,
        lineLess,
        current: computedCurrent,
        errorSteps,
        getStatus,
        addItem,
        removeItem,
        onClick: handleClick,
        parentCls: prefixCls,
      })
    );

    return {
      cls,
    };
  },
});
</script>
