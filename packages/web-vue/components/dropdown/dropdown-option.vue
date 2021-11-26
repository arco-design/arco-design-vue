<template>
  <li :class="cls" @click="handleClick">
    <slot name="icon" />
    <slot />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject, VNode } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { dropdownKey } from './context';
import { getVNodeChildrenString } from '../_utils/vue-utils';

export default defineComponent({
  name: 'Doption',
  props: {
    /**
     * @zh 选项值
     * @en Value
     */
    value: {
      type: [String, Number],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('dropdown');
    const dropdownCtx = inject(dropdownKey, undefined);

    const handleClick = () => {
      if (!props.disabled) {
        dropdownCtx?.onClickOption?.(
          props.value ?? getVNodeChildrenString(slots.default?.()?.[0] as VNode)
        );
      }
    };

    const cls = computed(() => [
      `${prefixCls}-option`,
      {
        [`${prefixCls}-option-disabled`]: props.disabled,
      },
    ]);

    return {
      prefixCls,
      cls,
      handleClick,
    };
  },
});
</script>
