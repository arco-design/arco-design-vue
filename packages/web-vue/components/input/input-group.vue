<template>
  <div :class="prefixCls">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'InputGroup',
  setup() {
    const prefixCls = getPrefixCls('input-group');

    return {
      prefixCls,
    };
  },
});
</script>
