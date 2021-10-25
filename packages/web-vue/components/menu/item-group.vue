<template>
  <div :class="classNames">
    <div :class="`${prefixCls}-group-title`">
      <MenuIndent :level="level" />
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useMenuContext from './hooks/use-menu-context';
import useLevel, { provideLevel } from './hooks/use-level';
import MenuIndent from './indent.vue';

export default defineComponent({
  name: 'MenuItemGroup',
  components: {
    MenuIndent,
  },
  props: {
    /**
     * @zh 菜单组的标题
     * @en The title of the menu group
     */
    title: {
      type: String,
    },
  },
  /**
   * @zh 标题
   * @en Title
   * @slot title
   */
  setup() {
    const { level } = useLevel();
    const nextLevel = computed(() =>
      level.value === 1 ? level.value + 1 : level.value
    );
    provideLevel(nextLevel);

    const menuContext = useMenuContext();
    const prefixCls = computed(() => menuContext.prefixCls);
    const classNames = computed(() => [`${prefixCls.value}-group`]);

    return {
      prefixCls,
      classNames,
      level,
    };
  },
});
</script>
