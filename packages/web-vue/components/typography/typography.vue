<template>
  <article :class="classNames"><slot /></article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'Typography',
  setup() {
    const prefixCls = getPrefixCls('typography');

    return {
      classNames: [prefixCls],
    };
  },
});
</script>
