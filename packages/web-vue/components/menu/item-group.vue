<template>
  <div :class="classNames">
    <div
      :class="[
        `${prefixCls}-group-title`,
        { [`${prefixCls}-ellipsis-enabled`]: menuContext.ellipsis },
      ]"
    >
      <MenuIndent :level="level" />
      <span
        v-if="menuContext.ellipsis"
        :class="[`${prefixCls}-item-inner`, `${prefixCls}-ellipsis-wrapper`]"
      >
        <Ellipsis :class="`${prefixCls}-ellipsis`" v-bind="menuContext.ellipsisProps">
          <slot name="title">{{ title }}</slot>
        </Ellipsis>
      </span>
      <slot v-else name="title">{{ title }}</slot>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import Ellipsis from '../ellipsis';
  import useLevel, { provideLevel } from './hooks/use-level';
  import useMenuContext from './hooks/use-menu-context';
  import MenuIndent from './indent.vue';

  defineOptions({ name: 'MenuItemGroup' });

  const props = defineProps({
    /**
     * @zh 菜单组的标题
     * @en The title of the menu group
     */
    title: {
      type: String,
    },
  });
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */

  const { level } = useLevel();
  const nextLevel = computed(() => (level.value === 1 ? level.value + 1 : level.value));
  provideLevel(nextLevel);

  const menuContext = useMenuContext();
  const prefixCls = computed(() => menuContext.prefixCls);
  const classNames = computed(() => [`${prefixCls.value}-group`]);
</script>
