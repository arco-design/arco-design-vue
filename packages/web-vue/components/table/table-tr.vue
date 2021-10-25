<template>
  <tr :class="cls">
    <slot />
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';

export default defineComponent({
  name: 'Tr',
  props: {
    isExpandRow: {
      type: Boolean,
    },
    isEmptyRow: {
      type: Boolean,
    },
    checked: {
      type: Boolean,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('table');

    const cls = computed(() => [
      `${prefixCls}-tr`,
      {
        [`${prefixCls}-tr-expand`]: props.isExpandRow,
        [`${prefixCls}-tr-empty`]: props.isEmptyRow,
        [`${prefixCls}-tr-checked`]: props.checked,
      },
    ]);

    return {
      prefixCls,
      cls,
    };
  },
});
</script>
