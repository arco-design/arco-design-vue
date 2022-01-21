<template>
  <div :class="cls">
    <div v-if="isEmpty" :class="`${prefixCls}-empty`">
      <slot name="empty">
        <empty />
      </slot>
    </div>
    <div
      ref="wrapperRef"
      :class="`${prefixCls}-list-wrapper`"
      @scroll="handleScroll"
    >
      <ul :class="`${prefixCls}-list`">
        <slot />
      </ul>
    </div>
    <div v-if="$slots.footer && !isEmpty" :class="`${prefixCls}-footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Empty from '../empty';
import { EmitType } from '../_utils/types';

export default defineComponent({
  name: 'DropdownPanel',
  components: {
    Empty,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isEmpty: {
      type: Boolean,
      default: false,
    },
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
    const prefixCls = getPrefixCls('dropdown');
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
