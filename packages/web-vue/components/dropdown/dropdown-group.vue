<template>
  <li :class="`${prefixCls}-title`">
    <slot name="title">
      {{ title }}
    </slot>
  </li>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'Dgroup',
  props: {
    /**
     * @zh 分组标题
     * @en Group title
     */
    title: String,
  },
  /**
   * @zh 分组标题
   * @en Group title
   * @slot title
   * @version 2.10.0
   */
  setup() {
    const prefixCls = getPrefixCls('dropdown-group');

    return {
      prefixCls,
    };
  },
});
</script>
