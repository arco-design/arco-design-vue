<template>
  <div :class="cls" @click="handleClick">
    <span :class="`${prefixCls}-title`">
      <slot name="title" />
    </span>
    <span
      v-if="editable && tab.closable"
      :class="`${prefixCls}-close-btn`"
      @click.stop="handleDelete"
    >
      <icon-hover>
        <icon-close />
      </icon-hover>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import IconClose from '../icon/icon-close';
import { TabData } from './interface';
import { isBoolean } from '../_utils/is';

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
    isActive: {
      type: Boolean,
      default: false,
    },
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
        [`${prefixCls}-active`]: props.isActive,
        [`${prefixCls}-closable`]: props.tab.closable,
        [`${prefixCls}-disabled`]: props.tab.disabled,
      },
    ]);

    const showCloseBtn = computed(() => {
      if (isBoolean(props.tab.closable)) {
        return props.tab.closable;
      }
      return props.editable;
    });

    return {
      prefixCls,
      cls,
      showCloseBtn,
      handleClick,
      handleDelete,
    };
  },
});
</script>
