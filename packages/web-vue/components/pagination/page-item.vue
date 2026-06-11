<template>
  <li :class="cls" :style="mergedStyle" @click="handleClick">
    <slot :page="pageNumber">
      {{ pageNumber }}
    </slot>
  </li>
</template>

<script setup lang="ts">
  import type { PropType, CSSProperties } from 'vue';
  import { computed } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({ name: 'Pager' });

  const props = defineProps({
    pageNumber: {
      type: Number,
    },
    current: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
    activeStyle: {
      type: Object as PropType<CSSProperties>,
    },
  });

  const emit = defineEmits<{ click: [_pageNumber: number, _e: MouseEvent] }>();

  const prefixCls = getPrefixCls('pagination-item');
  const isActive = computed(() => props.current === props.pageNumber);

  const handleClick = (e: MouseEvent) => {
    if (!props.disabled) {
      emit('click', props.pageNumber!, e);
    }
  };

  const cls = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-active`]: isActive.value,
    },
  ]);

  const mergedStyle = computed(() => {
    return isActive.value ? props.activeStyle : props.style;
  });
</script>
