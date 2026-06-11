<template>
  <div :class="cls">
    <div
      :class="`${prefixCls}-arrow-${direction === 'vertical' ? 'top' : 'left'}`"
      @click="onPreviousClick"
    >
      <IconLeft v-if="direction === 'horizontal'" />
      <IconUp v-else />
    </div>
    <div
      :class="`${prefixCls}-arrow-${direction === 'vertical' ? 'bottom' : 'right'}`"
      @click="onNextClick"
    >
      <IconRight v-if="direction === 'horizontal'" />
      <IconDown v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import IconDown from '../icon/icon-down';
  import IconLeft from '../icon/icon-left';
  import IconRight from '../icon/icon-right';
  import IconUp from '../icon/icon-up';

  defineOptions({ name: 'Arrow' });

  const props = defineProps({
    direction: {
      type: String,
      default: 'horizontal',
    },
    showArrow: {
      type: String,
      default: 'always',
    },
  });

  const emit = defineEmits<{
    previousClick: [_ev: MouseEvent];
    nextClick: [_ev: MouseEvent];
  }>();

  const prefixCls = getPrefixCls('carousel');

  const onPreviousClick = (ev: MouseEvent) => {
    emit('previousClick', ev);
  };

  const onNextClick = (ev: MouseEvent) => {
    emit('nextClick', ev);
  };

  const cls = computed(() => [
    `${prefixCls}-arrow`,
    {
      [`${prefixCls}-arrow-hover`]: props.showArrow === 'hover',
    },
  ]);
</script>
