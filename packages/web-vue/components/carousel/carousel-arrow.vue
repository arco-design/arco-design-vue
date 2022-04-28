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
      :class="`${prefixCls}-arrow-${
        direction === 'vertical' ? 'bottom' : 'right'
      }`"
      @click="onNextClick"
    >
      <IconRight v-if="direction === 'horizontal'" />
      <IconDown v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconUp from '../icon/icon-up';
import IconDown from '../icon/icon-down';
import IconLeft from '../icon/icon-left';
import IconRight from '../icon/icon-right';

export default defineComponent({
  name: 'Arrow',
  components: {
    IconUp,
    IconDown,
    IconLeft,
    IconRight,
  },
  props: {
    direction: {
      type: String,
      default: 'horizontal',
    },
    showArrow: {
      type: String,
      default: 'always',
    },
  },
  emits: ['previousClick', 'nextClick'],
  setup(props, { emit }) {
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

    return {
      prefixCls,
      cls,
      onPreviousClick,
      onNextClick,
    };
  },
});
</script>
