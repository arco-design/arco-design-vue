<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'ButtonGroup',
  setup() {
    const prefixCls = getPrefixCls('btn-group');

    return {
      prefixCls,
    };
  },
});
</script>
