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

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import type { TabData } from './interface';
import { TabsContext, tabsInjectionKey } from './context';

export default defineComponent({
  name: 'TabsTab',
  components: {
    IconHover,
    IconClose,
  },
  props: {
    tab: {
      type: Object as PropType<TabData>,
      required: true,
    },
    active: Boolean,
    editable: Boolean,
  },
  emits: ['click', 'delete'],
  setup(props, { emit }) {
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
        tabsCtx.trigger === 'click'
          ? { onClick: handleClick }
          : { onMouseover: handleClick },
        { onKeydown: onKeyDown }
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

    return {
      prefixCls,
      cls,
      eventHandlers,
      handleDelete,
    };
  },
});
</script>
