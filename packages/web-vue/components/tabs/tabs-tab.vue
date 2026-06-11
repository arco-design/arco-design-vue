<template>
  <div tabindex="0" :class="cls" v-bind="eventHandlers">
    <span :class="`${prefixCls}-title`">
      <slot />
    </span>
    <icon-hover
      v-if="editable && tab.closable"
      :class="`${prefixCls}-close-btn`"
      @click.stop="handleDelete"
    >
      <icon-close />
    </icon-hover>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, inject } from 'vue';

  import type { TabData } from './interface';

  import IconHover from '../_components/icon-hover.vue';
  import { getPrefixCls } from '../_utils/global-config';
  import IconClose from '../icon/icon-close';
  import { TabsContext, tabsInjectionKey } from './context';

  defineOptions({ name: 'TabsTab' });

  const props = defineProps({
    tab: {
      type: Object as PropType<TabData>,
      required: true,
    },
    active: Boolean,
    editable: Boolean,
  });

  const emit = defineEmits<{
    click: [_key: string | number, _e: Event];
    delete: [_key: string | number, _e: Event];
  }>();

  const prefixCls = getPrefixCls('tabs-tab');
  const tabsCtx = inject<Partial<TabsContext>>(tabsInjectionKey, {});
  const handleClick = (e: Event) => {
    if (!props.tab.disabled) {
      emit('click', props.tab.key, e);
    }
  };

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      handleClick(ev);
    }
  };

  const eventHandlers = computed(() => {
    return Object.assign(
      tabsCtx.trigger === 'click' ? { onClick: handleClick } : { onMouseover: handleClick },
      { onKeydown: onKeyDown },
    );
  });

  const handleDelete = (e: Event) => {
    if (!props.tab.disabled) {
      emit('delete', props.tab.key, e);
    }
  };

  const cls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-active`]: props.active,
      [`${prefixCls}-closable`]: props.editable && props.tab.closable,
      [`${prefixCls}-disabled`]: props.tab.disabled,
    },
  ]);
</script>
