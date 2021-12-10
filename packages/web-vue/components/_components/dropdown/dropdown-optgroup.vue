<template>
  <li :class="`${prefixCls}-title`">
    <slot name="label">
      {{ label }}
    </slot>
  </li>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';

export default defineComponent({
  name: 'DropdownOptgroup',
  props: {
    /**
     * @zh 选项组的标题
     * @en Title of option group
     */
    label: {
      type: String,
    },
  },
  setup() {
    const prefixCls = getPrefixCls('dropdown-group');

    return {
      prefixCls,
    };
  },
});
</script>
