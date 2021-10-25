<template>
  <div :class="cls">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, onMounted } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { CardContext, cardInjectionKey } from './context';

export default defineComponent({
  name: 'CardGrid',
  props: {
    /**
     * @zh 是否可以悬浮
     * @en Whether to hover
     */
    hoverable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('card-grid');

    const context = inject<CardContext>(cardInjectionKey);

    onMounted(() => {
      if (context) {
        context.hasGrid = true;
      }
    });

    const cls = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-hoverable`]: props.hoverable,
        },
      ];
    });
    return {
      cls,
    };
  },
});
</script>
