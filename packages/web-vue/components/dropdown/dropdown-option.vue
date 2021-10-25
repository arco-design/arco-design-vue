<template>
  <li :class="`${prefixCls}-option`" @click="handleClick">
    <slot name="icon" />
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, VNode } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { dropdownKey } from './context';
import { getVNodeChildrenString } from '../_utils/vue-utils';

export default defineComponent({
  name: 'Doption',
  props: {
    value: {
      type: [String, Number],
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('dropdown');
    const dropdownCtx = inject(dropdownKey, undefined);

    const handleClick = () => {
      dropdownCtx?.onClickOption?.(
        props.value ?? getVNodeChildrenString(slots.default?.()?.[0] as VNode)
      );
    };

    return {
      prefixCls,
      handleClick,
    };
  },
});
</script>
