<template>
  <component
    :is="componentTag"
    v-if="!activated"
    v-bind="$attrs"
    :class="rootCls"
    :style="rootStyle"
    @mouseenter="handleMouseenter"
    @focus="handleFocus"
    @click="handleClick"
  >
    <slot v-if="isLineClamp" />
    <span v-else :class="`${prefixCls}-content`">
      <slot />
    </span>
  </component>

  <Ellipsis
    v-else
    ref="ellipsisRef"
    v-bind="$attrs"
    :line-clamp="lineClamp"
    :expand-trigger="expandTrigger"
    :tooltip="tooltip"
  >
    <slot />
    <template v-if="$slots.tooltip" #tooltip>
      <slot name="tooltip" />
    </template>
  </Ellipsis>
</template>

<script setup lang="ts">
  import type { ComponentPublicInstance, CSSProperties, PropType } from 'vue';
  import { computed, nextTick, ref } from 'vue';

  import type { EllipsisTooltipProps } from './interface';

  import { getPrefixCls } from '../_utils/global-config';
  import Ellipsis from './ellipsis.vue';

  defineOptions({ name: 'PerformantEllipsis', inheritAttrs: false });

  const props = defineProps({
    /**
     * @zh 最大显示行数。不传时为单行省略。
     * @en Maximum number of displayed lines. Single-line ellipsis is used by default.
     */
    lineClamp: {
      type: [Number, String] as PropType<number | string>,
      default: undefined,
    },
    /**
     * @zh 展开的触发方式
     * @en Trigger mode for expansion
     * @values 'click'
     */
    expandTrigger: {
      type: String as PropType<'click'>,
      default: undefined,
    },
    /**
     * @zh 省略时是否展示提示。可传入 Tooltip 属性。
     * @en Whether to show a tooltip when ellipsis is active. Tooltip props are supported.
     */
    tooltip: {
      type: [Boolean, Object] as PropType<boolean | EllipsisTooltipProps>,
      default: true,
    },
  });

  /**
   * @zh 默认内容
   * @en Default content
   * @slot default
   */
  /**
   * @zh 自定义提示内容
   * @en Custom tooltip content
   * @slot tooltip
   */
  const prefixCls = getPrefixCls('ellipsis');
  const activated = ref(false);
  const ellipsisRef = ref<ComponentPublicInstance | null>(null);

  const isLineClamp = computed(() => props.lineClamp !== undefined);
  const componentTag = computed(() => (isLineClamp.value ? 'div' : 'span'));

  const rootCls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}--single-line`]: !isLineClamp.value,
      [`${prefixCls}--line-clamp`]: isLineClamp.value,
      [`${prefixCls}--expandable`]: props.expandTrigger === 'click',
    },
  ]);

  const rootStyle = computed<CSSProperties>(() => {
    if (isLineClamp.value) {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        whiteSpace: 'normal',
        WebkitLineClamp: String(props.lineClamp),
        WebkitBoxOrient: 'vertical',
      };
    }

    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  });

  const getActivatedTriggerElement = () => {
    const ellipsisInstance = ellipsisRef.value as
      | (ComponentPublicInstance & { triggerRef?: HTMLElement })
      | null;

    return ellipsisInstance?.triggerRef ?? (ellipsisInstance?.$el as HTMLElement | undefined);
  };

  const replayInteraction = (type?: 'hover' | 'focus' | 'click') => {
    const triggerElement = getActivatedTriggerElement();
    if (!triggerElement || !type) {
      return;
    }

    if (type === 'hover') {
      triggerElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));
      triggerElement.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
      return;
    }

    if (type === 'focus') {
      triggerElement.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      return;
    }

    triggerElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  };

  const activate = async (interactionType?: 'hover' | 'focus' | 'click') => {
    if (activated.value) {
      return;
    }

    activated.value = true;
    await nextTick();

    replayInteraction(interactionType);
  };

  const handleMouseenter = () => {
    void activate('hover');
  };

  const handleFocus = () => {
    void activate('focus');
  };

  const handleClick = () => {
    void activate(props.expandTrigger === 'click' ? 'click' : undefined);
  };
</script>
