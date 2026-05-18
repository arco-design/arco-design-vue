<template>
  <a :href="disabled ? undefined : href" :class="cls" @click="handleClick">
    <span v-if="loading || showIcon" :class="`${prefixCls}-icon`">
      <icon-loading v-if="loading" />
      <slot v-else name="icon">
        <icon-link />
      </slot>
    </span>
    <slot />
  </a>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  import type { Status } from '../_utils/constant';
  import type { LinkProps } from './interface';

  import { getPrefixCls } from '../_utils/global-config';
  import { hasPropOrSlot } from '../_utils/use-prop-or-slot';
  import IconLink from '../icon/icon-link';
  import IconLoading from '../icon/icon-loading';

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
    hoverable: true,
    icon: false,
    loading: false,
    disabled: false,
  });

  const slots = useSlots();
  const prefixCls = getPrefixCls('link');
  const showIcon = hasPropOrSlot(props, slots, 'icon');

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
      [`${prefixCls}-hoverless`]: !props.hoverable,
      [`${prefixCls}-with-icon`]: props.loading || showIcon.value,
    },
  ]);
</script>
