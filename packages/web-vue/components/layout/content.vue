<template>
  <main :class="classNames">
    <slot />
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'LayoutContent',
  setup() {
    const prefixCls = getPrefixCls('layout-content');
    const classNames = [prefixCls];

    return {
      classNames,
    };
  },
});
</script>
