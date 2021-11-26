<template>
  <a-trigger trigger="hover" position="rt">
    <li :class="`${prefixCls}-option`">
      <slot />
    </li>
    <template #content>
      <div :class="[`${prefixCls}`, `${prefixCls}-submenu`]">
        <ul :class="`${prefixCls}-list`">
          <slot name="content" />
        </ul>
      </div>
    </template>
  </a-trigger>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import ATrigger from '../trigger';

export default defineComponent({
  name: 'Dsubmenu',
  components: {
    ATrigger,
  },
  setup() {
    const prefixCls = getPrefixCls('dropdown');

    return {
      prefixCls,
    };
  },
});
</script>
