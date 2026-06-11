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
<script setup lang="ts">
  import { toRef } from 'vue';

  import { getPrefixCls } from '../_utils/global-config';
  import useMenuContext from './hooks/use-menu-context';

  defineOptions({ name: 'MenuIndent' });

  const props = defineProps({
    level: {
      type: Number,
      default: 1,
    },
  });

  const prefixCls = getPrefixCls('menu');
  const menuContext = useMenuContext();

  const levelIndent = toRef(menuContext, 'levelIndent');
</script>
