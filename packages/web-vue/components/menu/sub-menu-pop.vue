<template>
  <Trigger
    trigger="hover"
    :class="triggerClassNames"
    :position="needPopOnBottom ? 'bl' : 'rt'"
    show-arrow
    animation-class="fade-in"
    :mouse-enter-delay="50"
    :mouse-leave-delay="50"
    :popup-offset="4"
    :auto-fit-popup-min-width="true"
    :duration="100"
    v-bind="triggerProps"
    :unmount-on-close="false"
    :popup-visible="popVisible"
    @popupVisibleChange="onVisibleChange"
  >
    <div
      :class="[
        classNames,
        {
          [`${menuPrefixCls}-has-icon`]: $slots.icon,
          [`${menuPrefixCls}-ellipsis-enabled`]: menuContext.ellipsis,
        },
      ]"
      aria-haspopup="true"
      v-bind="$attrs"
      @click="onClick"
    >
      <!-- header -->
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
      <!-- suffix -->
      <span :class="`${menuPrefixCls}-icon-suffix`">
        <slot v-if="needPopOnBottom" name="expand-icon-down" />
        <slot v-else name="expand-icon-right" />
      </span>
      <div v-if="isSelected && mode === 'horizontal'" :class="`${menuPrefixCls}-selected-label`" />
    </div>
    <!-- content -->
    <template #content>
      <Menu
        in-trigger
        :prefix-cls="`${triggerPrefixCls}-menu`"
        :selected-keys="selectedKeys"
        :theme="menuContext.theme"
        :trigger-props="menuContext.triggerProps"
        :ellipsis="menuContext.ellipsis"
        :ellipsis-props="menuContext.ellipsisProps"
        :style="popupMenuStyles"
        @menuItemClick="onMenuItemClick"
      >
        <slot />
        <template v-if="menuContext.expandIconDown" #expand-icon-down>
          <RenderFunction :render-func="menuContext.expandIconDown" />
        </template>
        <template v-if="menuContext.expandIconRight" #expand-icon-right>
          <RenderFunction :render-func="menuContext.expandIconRight" />
        </template>
      </Menu>
    </template>
  </Trigger>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, toRefs } from 'vue';

  import RenderFunction from '../_components/render-function';
  import { getPrefixCls } from '../_utils/global-config';
  import { isNumber } from '../_utils/is';
  import { omit } from '../_utils/omit';
  import Ellipsis from '../ellipsis';
  import Trigger from '../trigger';
  import Menu from './base-menu.vue';
  import useLevel from './hooks/use-level';
  import useMenu from './hooks/use-menu';
  import useMenuContext from './hooks/use-menu-context';
  import MenuIndent from './indent.vue';

  export default defineComponent({
    name: 'SubMenuPop',
    components: {
      Menu,
      Trigger,
      MenuIndent,
      RenderFunction,
      Ellipsis,
    },
    inheritAttrs: false,
    props: {
      title: {
        type: String,
      },
      selectable: {
        type: Boolean,
      },
      isChildrenSelected: {
        type: Boolean,
      },
      popupMaxHeight: {
        type: [Boolean, Number],
        default: undefined,
      },
    },
    setup(props) {
      const { key } = useMenu();
      const { level } = useLevel();
      const { selectable, isChildrenSelected, popupMaxHeight } = toRefs(props);
      const menuContext = useMenuContext();
      const { onSubMenuClick, onMenuItemClick } = menuContext;

      const menuPrefixCls = computed(() => menuContext.prefixCls);
      const mode = computed(() => menuContext.mode);
      const selectedKeys = computed(() => menuContext.selectedKeys || []);

      const prefixCls = computed(() => `${menuPrefixCls.value}-pop`);
      const isSelected = computed(
        () =>
          (selectable.value && selectedKeys.value.includes(key.value)) || isChildrenSelected.value,
      );
      const classNames = computed(() => [
        `${prefixCls.value}`,
        `${prefixCls.value}-header`,
        {
          [`${menuPrefixCls.value}-selected`]: isSelected.value,
        },
      ]);
      const needPopOnBottom = computed(() => mode.value === 'horizontal' && !menuContext.inTrigger);
      const popVisible = ref(false);
      const setPopVisible = (val: boolean) => {
        popVisible.value = val;
      };
      const triggerPrefixCls = getPrefixCls('trigger');
      const triggerClassNames = computed(() => [
        `${prefixCls.value}-trigger`,
        {
          [`${prefixCls.value}-trigger-dark`]: menuContext.theme === 'dark',
        },
        (menuContext.triggerProps as Record<string, unknown> | undefined)?.class,
      ]);
      const triggerProps = computed(() =>
        omit((menuContext.triggerProps || {}) as Record<string, unknown>, ['class']),
      );

      return {
        menuPrefixCls,
        mode,
        level,
        classNames,
        isSelected,
        selectedKeys,
        needPopOnBottom,
        popVisible,
        triggerPrefixCls,
        triggerClassNames,
        triggerProps,
        menuContext,
        popupMenuStyles: computed(() => {
          const maxHeight = popupMaxHeight.value ?? menuContext.popupMaxHeight;
          if (isNumber(maxHeight)) return { maxHeight: `${maxHeight}px` };
          return maxHeight ? {} : { maxHeight: 'unset' };
        }),
        onClick: () => {
          onSubMenuClick && onSubMenuClick(key.value, level.value);
          selectable.value && onMenuItemClick && onMenuItemClick(key.value);
        },
        onMenuItemClick: (key: string) => {
          onMenuItemClick && onMenuItemClick(key);
          setPopVisible(false);
        },
        onVisibleChange: (visible: boolean) => {
          setPopVisible(visible);
        },
      };
    },
  });
</script>
