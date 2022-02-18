<template>
  <div :class="cls">
    <spin v-if="loading" :class="`${prefixCls}-loading`" />
    <div v-else-if="empty" :class="`${prefixCls}-empty`">
      <slot name="empty">
        <empty />
      </slot>
    </div>
    <slot v-if="virtualList && !loading && !empty" name="virtual-list" />
    <div
      v-if="!virtualList"
      v-show="!loading && !empty"
      ref="wrapperRef"
      :class="`${prefixCls}-list-wrapper`"
      @scroll="handleScroll"
    >
      <ul :class="`${prefixCls}-list`">
        <slot />
      </ul>
    </div>
    <div v-if="$slots.footer && !empty" :class="`${prefixCls}-footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import type { EmitType } from '../_utils/types';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import Spin from '../spin';

export default defineComponent({
  name: 'SelectDropdown',
  components: {
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
    onScroll: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
    onReachBottom: {
      type: [Function, Array] as PropType<EmitType<(ev: Event) => void>>,
    },
  },
  emits: ['scroll', 'reachBottom'],
  setup(props, { emit, slots }) {
    const prefixCls = getPrefixCls('select-dropdown');
    const wrapperRef = ref<HTMLElement>();

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
        [`${prefixCls}-has-footer`]: Boolean(slots.footer),
      },
    ]);

    return {
      prefixCls,
      cls,
      wrapperRef,
      handleScroll,
    };
  },
});
</script>
