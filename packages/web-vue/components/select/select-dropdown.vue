<template>
  <div :class="cls">
    <spin v-if="loading" :class="`${prefixCls}-loading`" />
    <div v-else-if="empty" :class="`${prefixCls}-empty`">
      <slot name="empty">
        <empty />
      </slot>
    </div>
    <div v-if="$slots.header && !empty" :class="`${prefixCls}-header`">
      <slot name="header" />
    </div>
    <slot v-if="virtualList && !loading && !empty" name="virtual-list" />
    <component
      :is="displayScrollbar ? 'ScrollbarComponent' : 'div'"
      v-if="!virtualList"
      v-show="!loading && !empty"
      ref="wrapperComRef"
      :class="`${prefixCls}-list-wrapper`"
      v-bind="scrollbarProps"
      @scroll="handleScroll"
    >
      <ul :class="`${prefixCls}-list`">
        <slot />
      </ul>
    </component>
    <div v-if="$slots.footer && !empty" :class="`${prefixCls}-footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, toRefs } from 'vue';
import type { EmitType } from '../_utils/types';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';
import Scrollbar, { ScrollbarProps } from '../scrollbar';
import { useComponentRef } from '../_hooks/use-component-ref';
import { useScrollbar } from '../_hooks/use-scrollbar';

export default defineComponent({
  name: 'SelectDropdown',
  components: {
    ScrollbarComponent: Scrollbar,
    Empty,
    Spin,
  },
  props: {
    loading: Boolean,
    empty: Boolean,
    virtualList: Boolean,
    bottomOffset: {
      type: Number,
      default: 0,
    },
    scrollbar: {
      type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
    onScroll: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
    onReachBottom: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
  },
  emits: ['scroll', 'reachBottom'],
  setup(props, { emit, slots }) {
    const { scrollbar } = toRefs(props);
    const prefixCls = getPrefixCls('select-dropdown');
    const { componentRef: wrapperComRef, elementRef: wrapperRef } =
      useComponentRef('containerRef');
    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar);

    const handleScroll = (e: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target as HTMLElement;
      const bottom = scrollHeight - (scrollTop + offsetHeight);
      if (bottom <= props.bottomOffset) {
        emit('reachBottom', e);
      }
      emit('scroll', e);
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-has-header`]: Boolean(slots.header),
        [`${prefixCls}-has-footer`]: Boolean(slots.footer),
      },
    ]);

    return {
      prefixCls,
      cls,
      wrapperRef,
      wrapperComRef,
      handleScroll,
      displayScrollbar,
      scrollbarProps,
    };
  },
});
</script>
