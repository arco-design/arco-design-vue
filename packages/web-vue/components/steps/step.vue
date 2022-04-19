<template>
  <div ref="itemRef" :class="cls" @click="handleClick">
    <div v-if="showTail" :class="`${prefixCls}-tail`" />
    <div v-if="type !== 'arrow'" :class="`${prefixCls}-node`">
      <slot name="node" :step="stepNumber" :status="computedStatus">
        <div v-if="type !== 'dot'" :class="iconCls">
          <slot name="icon" :step="stepNumber" :status="computedStatus">
            <icon-check v-if="computedStatus === 'finish'" />
            <icon-close v-else-if="computedStatus === 'error'" />
            <template v-else>{{ stepNumber }}</template>
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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconCheck from '../icon/icon-check';
import IconClose from '../icon/icon-close';
import { StepStatus, StepsType } from './interface';
import { Direction } from '../_utils/constant';
import { stepsInjectionKey } from './context';
import { useIndex } from '../_hooks/use-index';

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
    const instance = getCurrentInstance();
    const iconCls = getPrefixCls('steps-icon');

    const stepsCtx = inject(stepsInjectionKey, undefined);

    const type = computed(() => stepsCtx?.type ?? 'default');

    const itemRef = ref<HTMLElement>();
    const { computedIndex } = useIndex({
      itemRef,
      selector: `.${prefixCls}`,
      parentClassName: stepsCtx?.parentCls,
    });
    const stepNumber = computed(() => computedIndex.value + 1);

    const computedStatus = computed(
      () => props.status ?? stepsCtx?.getStatus(stepNumber.value) ?? 'process'
    );

    const nextStepError = computed(
      () => stepsCtx?.errorSteps.includes(stepNumber.value + 1) ?? false
    );

    if (instance) {
      stepsCtx?.addItem(
        instance.uid,
        reactive({
          step: stepNumber,
          status: computedStatus,
        })
      );
    }

    onBeforeUnmount(() => {
      if (instance) {
        stepsCtx?.removeItem(instance.uid);
      }
    });

    const showTail = computed(
      () =>
        !stepsCtx?.lineLess &&
        (stepsCtx?.labelPlacement === 'vertical' ||
          stepsCtx?.direction === 'vertical')
    );

    const handleClick = (ev: Event) => {
      if (!props.disabled) {
        stepsCtx?.onClick(stepNumber.value, ev);
      }
    };

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-${computedStatus.value}`,
      {
        [`${prefixCls}-active`]: stepNumber.value === stepsCtx?.current,
        [`${prefixCls}-next-error`]: nextStepError.value,
        [`${prefixCls}-disabled`]: props.disabled,
        // [`${prefixCls}-custom`]: !!icon,
      },
    ]);

    return {
      prefixCls,
      iconCls,
      cls,
      itemRef,
      showTail,
      stepNumber,
      computedStatus,
      type,
      handleClick,
    };
  },
});
</script>
