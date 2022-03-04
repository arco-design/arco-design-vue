<template>
  <div :class="cls" @click="handleClick">
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
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import type { TabData } from './interface';

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

    const handleClick = (e: Event) => {
      if (!props.tab.disabled) {
        emit('click', props.tab.key, e);
      }
    };

    const handleDelete = (e: Event) => {
      if (!props.tab.disabled) {
        emit('delete', props.tab.key, e);
      }
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.active,
        [`${prefixCls}-closable`]: props.tab.closable,
        [`${prefixCls}-disabled`]: props.tab.disabled,
      },
    ]);

    return {
      prefixCls,
      cls,
      handleClick,
      handleDelete,
    };
  },
});
</script>
