<template>
  <div :class="cls">
    <div v-if="$slots.header && (!empty || showHeaderOnEmpty)" :class="`${prefixCls}-header`">
      <slot name="header" />
    </div>
    <spin v-if="loading" :class="`${prefixCls}-loading`" />
    <div v-else-if="empty" :class="`${prefixCls}-empty`">
      <slot name="empty">
        <component :is="SelectEmpty ? SelectEmpty : 'Empty'" />
      </slot>
    </div>
    <slot v-if="virtualList && !loading && !empty" name="virtual-list" />
    <Scrollbar
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
    </Scrollbar>
    <div v-if="$slots.footer && (!empty || showFooterOnEmpty)" :class="`${prefixCls}-footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { computed, defineComponent, toRefs, inject } from 'vue';

  import type { EmitType } from '../_utils/types';

  import { useComponentRef } from '../_hooks/use-component-ref';
  import { useScrollbar } from '../_hooks/use-scrollbar';
  import { getPrefixCls } from '../_utils/global-config';
  import { configProviderInjectionKey } from '../config-provider/context';
  import Empty from '../empty';
  import Scrollbar, { ScrollbarProps } from '../scrollbar';
  import Spin from '../spin';

  export default defineComponent({
    name: 'SelectDropdown',
    components: {
      Empty,
      Scrollbar,
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
      showHeaderOnEmpty: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      showFooterOnEmpty: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    emits: ['scroll', 'reachBottom'],
    setup(props, { emit, slots }) {
      const { scrollbar } = toRefs(props);
      const prefixCls = getPrefixCls('select-dropdown');
      const configCtx = inject(configProviderInjectionKey, undefined);
      const SelectEmpty = configCtx?.slots.empty?.({ component: 'select' })?.[0];

      const { componentRef: wrapperComRef, elementRef: wrapperRef } =
        useComponentRef('containerRef');
      const { scrollbarProps } = useScrollbar(scrollbar);

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
        SelectEmpty,
        cls,
        wrapperRef,
        wrapperComRef,
        handleScroll,
        scrollbarProps,
      };
    },
  });
</script>
