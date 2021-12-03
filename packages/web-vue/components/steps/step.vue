<template>
  <div :class="cls" @click="handleClick">
    <div v-if="showTail" :class="`${prefixCls}-tail`" />
    <div v-if="type !== 'arrow'" :class="`${prefixCls}-node`">
      <slot name="node" :step="step" :status="status">
        <div v-if="type !== 'dot'" :class="iconCls">
          <slot name="icon" :step="step" :status="status">
            <icon-check v-if="status === 'finish'" />
            <icon-close v-else-if="status === 'error'" />
            <template v-else>{{ step }}</template>
          </slot>
        </div>
      </slot>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-title`">
        <slot>{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        :class="`${prefixCls}-description`"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconCheck from '../icon/icon-check';
import IconClose from '../icon/icon-close';
import { StepStatus, StepsType } from './interface';
import { Direction } from '../_utils/constant';

export default defineComponent({
  name: 'Step',
  components: {
    IconCheck,
    IconClose,
  },
  props: {
    /**
     * @zh 步骤的标题
     * @en Title of the step
     */
    title: String,
    /**
     * @zh 步骤的描述信息
     * @en Description of the step
     */
    description: String,
    /**
     * @zh 步骤的状态
     * @en Status of the step
     * @values 'wait', 'process', 'finish', 'error'
     */
    status: {
      type: String as PropType<StepStatus>,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    // private
    step: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
    type: {
      type: String as PropType<StepsType>,
      default: 'default',
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    labelPlacement: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    lineLess: {
      type: Boolean,
      default: false,
    },
    changeable: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
    },
  },
  /**
   * @zh 节点
   * @en Node
   * @slot node
   * @binding {number} step
   * @binding {string} status
   */
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   * @binding {number} step
   * @binding {string} status
   */
  /**
   * @zh 描述内容
   * @en Description
   * @slot description
   */
  setup(props) {
    const prefixCls = getPrefixCls('steps-item');
    const iconCls = getPrefixCls('steps-icon');

    const showTail = computed(
      () =>
        !props.lineLess &&
        (props.labelPlacement === 'vertical' || props.direction === 'vertical')
    );

    const handleClick = (e: Event) => {
      if (props.changeable) {
        props.onClick?.(props.step, e);
      }
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${props.status}`,
      {
        [`${prefixCls}-active`]: props.step === props.current,
        // [`${prefixCls}-next-error`]: nextStepError,
        [`${prefixCls}-disabled`]: props.disabled,
        // [`${prefixCls}-custom`]: !!icon,
      },
    ]);

    return {
      prefixCls,
      iconCls,
      cls,
      showTail,
      handleClick,
    };
  },
});
</script>
