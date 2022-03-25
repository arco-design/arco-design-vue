<template>
  <span v-if="level > 1" :class="`${prefixCls}-indent-list`">
    <span
      v-for="index in level - 1"
      :key="index"
      :class="`${prefixCls}-indent`"
      :style="`width: ${levelIndent}px`"
    />
  </span>
</template>
<script>
import { defineComponent, toRef } from 'vue';
import useMenuContext from './hooks/use-menu-context';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'MenuIndent',
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const prefixCls = getPrefixCls('menu');
    const menuContext = useMenuContext();

    return {
      prefixCls,
      levelIndent: toRef(menuContext, 'levelIndent'),
    };
  },
});
</script>
