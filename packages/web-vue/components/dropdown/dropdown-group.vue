<template>
  <li :class="prefixCls">
    <div :class="`${prefixCls}-title`">{{ title }}</div>
    <ul :class="`${prefixCls}-list`">
      <slot />
    </ul>
  </li>
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
  setup(props) {
    const prefixCls = getPrefixCls('dropdown-group');

    return {
      prefixCls,
    };
  },
});
</script>
