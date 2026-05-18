<template>
  <a :href="disabled ? undefined : href" :class="cls" @click="handleClick">
    <span v-if="loading || showIcon" :class="`${prefixCls}-icon`">
      <icon-loading v-if="loading" />
      <Tooltip v-else-if="iconTooltip" :content="iconTooltip">
        <slot name="icon">
          <icon-link />
        </slot>
      </Tooltip>
      <slot v-else name="icon">
        <icon-link />
      </slot>
    </span>

    <PerformantEllipsis
      v-if="shouldRenderEllipsis"
      :class="`${prefixCls}-content`"
      :line-clamp="ellipsisLineClamp"
      :expand-trigger="ellipsisExpandTrigger"
      :tooltip="ellipsisTooltip"
    >
      <slot />
      <template v-if="$slots.tooltip" #tooltip>
        <slot name="tooltip" />
      </template>
    </PerformantEllipsis>
    <span v-else-if="hasDefaultSlot" :class="`${prefixCls}-content`">
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  import type { LinkProps } from './interface';

  import { getPrefixCls } from '../_utils/global-config';
  import { hasPropOrSlot } from '../_utils/use-prop-or-slot';
  import { PerformantEllipsis } from '../ellipsis';
  import IconLink from '../icon/icon-link';
  import IconLoading from '../icon/icon-loading';
  import Tooltip from '../tooltip';

  defineOptions({
    name: 'Link',
  });

  const emit = defineEmits<{
    /**
     * @zh 点击时触发
     * @en Emitted when the link is clicked
     * @property {MouseEvent} ev
     */
    click: [ev: MouseEvent];
  }>();

  const props = withDefaults(defineProps<LinkProps>(), {
    status: 'normal',
    icon: false,
    ellipsis: true,
    ellipsisLineClamp: undefined,
    ellipsisExpandTrigger: undefined,
    ellipsisTooltip: true,
    iconTooltip: undefined,
    loading: false,
    disabled: false,
  });

  const slots = useSlots();
  const prefixCls = getPrefixCls('link');
  const showIcon = hasPropOrSlot(props, slots, 'icon');
  const hasDefaultSlot = computed(() => Boolean(slots.default));
  const resolvedHoverable = computed(() => props.hoverable ?? hasDefaultSlot.value);
  const shouldRenderEllipsis = computed(() => props.ellipsis && hasDefaultSlot.value);

  const handleClick = (ev: MouseEvent) => {
    if (props.disabled || props.loading) {
      ev.preventDefault();
      return;
    }
    emit('click', ev);
  };

  const cls = computed(() => [
    prefixCls,
    `${prefixCls}-status-${props.status}`,
    {
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-loading`]: props.loading,
      [`${prefixCls}-hoverless`]: !resolvedHoverable.value,
      [`${prefixCls}-with-icon`]: props.loading || showIcon.value,
      [`${prefixCls}-icon-only`]: !hasDefaultSlot.value && (props.loading || showIcon.value),
    },
  ]);
</script>
