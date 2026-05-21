<template>
  <div :class="classNames">
    <div
      :class="[
        `${prefixCls}-header`,
        {
          [`${menuPrefixCls}-selected`]: isSelected,
          [`${menuPrefixCls}-has-icon`]: $slots.icon,
          [`${menuPrefixCls}-ellipsis-enabled`]: menuContext.ellipsis,
        },
      ]"
      @click="onHeaderClick"
    >
      <MenuIndent :level="level" />
      <template v-if="$slots.icon">
        <span :class="`${menuPrefixCls}-icon`">
          <slot name="icon"></slot>
        </span>
        <span
          v-if="menuContext.ellipsis"
          :class="[
            `${menuPrefixCls}-item-inner`,
            `${menuPrefixCls}-title`,
            `${menuPrefixCls}-ellipsis-wrapper`,
          ]"
        >
          <Ellipsis :class="`${menuPrefixCls}-ellipsis`" v-bind="menuContext.ellipsisProps">
            <slot name="title">{{ title }}</slot>
          </Ellipsis>
        </span>
        <span v-else :class="`${menuPrefixCls}-title`">
          <slot name="title">{{ title }}</slot>
        </span>
      </template>
      <template v-else>
        <span
          v-if="menuContext.ellipsis"
          :class="[`${menuPrefixCls}-item-inner`, `${menuPrefixCls}-ellipsis-wrapper`]"
        >
          <Ellipsis :class="`${menuPrefixCls}-ellipsis`" v-bind="menuContext.ellipsisProps">
            <slot name="title">{{ title }}</slot>
          </Ellipsis>
        </span>
        <slot v-else name="title">{{ title }}</slot>
      </template>
      <span
        :class="[
          `${menuPrefixCls}-icon-suffix`,
          {
            [`is-open`]: isOpen,
          },
        ]"
      >
        <slot name="expand-icon-down" />
      </span>
    </div>
    <ExpandTransition>
      <div v-show="isOpen" :class="`${prefixCls}-content`">
        <slot />
      </div>
    </ExpandTransition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import ExpandTransition from '../_components/transition/expand-transition.vue';
  import Ellipsis from '../ellipsis';
  import useLevel from './hooks/use-level';
  import useMenu from './hooks/use-menu';
  import useMenuContext from './hooks/use-menu-context';
  import MenuIndent from './indent.vue';

  export default defineComponent({
    name: 'SubMenuInline',
    components: {
      MenuIndent,
      ExpandTransition,
      Ellipsis,
    },
    props: {
      title: {
        type: String,
      },
      isChildrenSelected: {
        type: Boolean,
      },
    },
    setup(props) {
      const { key } = useMenu();
      const { level } = useLevel({
        provideNextLevel: true,
      });
      const menuContext = useMenuContext();
      const menuPrefixCls = computed(() => menuContext.prefixCls);
      const prefixCls = computed(() => `${menuPrefixCls.value}-inline`);
      const classNames = computed(() => [prefixCls.value]);
      const isSelected = computed(() => props.isChildrenSelected);
      const isOpen = computed(() => (menuContext.openKeys || []).indexOf(key.value) > -1);

      return {
        prefixCls,
        menuPrefixCls,
        menuContext,
        classNames,
        level,
        isSelected,
        isOpen,
        onHeaderClick: () => {
          menuContext.onSubMenuClick && menuContext.onSubMenuClick(key.value, level.value);
        },
      };
    },
  });
</script>
