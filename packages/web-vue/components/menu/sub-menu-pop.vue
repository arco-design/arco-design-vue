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
        <span :class="`${menuPrefixCls}-title`">
          <slot name="title">{{ title }}</slot>
        </span>
      </template>
      <template v-else>
        <slot name="title">{{ title }}</slot>
      </template>
      <!-- suffix -->
      <span :class="`${menuPrefixCls}-icon-suffix`">
        <slot v-if="needPopOnBottom" name="expand-icon-down" />
        <slot v-else name="expand-icon-right" />
      </span>
      <div
        v-if="isSelected && mode === 'horizontal'"
        :class="`${menuPrefixCls}-selected-label`"
      />
    </div>
    <!-- content -->
    <template #content>
      <Menu
        in-trigger
        :prefix-cls="`${triggerPrefixCls}-menu`"
        :selected-keys="selectedKeys"
        :theme="menuContext.theme"
        :trigger-props="menuContext.triggerProps"
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
import Trigger from '../trigger';
import { SubMenuPopProps } from './interface';
import Menu from './base-menu.vue';
import useMenu from './hooks/use-menu';
import useLevel from './hooks/use-level';
import { omit } from '../_utils/omit';
import { getPrefixCls } from '../_utils/global-config';
import MenuIndent from './indent.vue';
import useMenuContext from './hooks/use-menu-context';
import RenderFunction from '../_components/render-function';
import { isNumber } from '../_utils/is';

export default defineComponent({
  name: 'SubMenuPop',
  components: {
    Menu,
    Trigger,
    MenuIndent,
    RenderFunction,
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
        (selectable.value && selectedKeys.value.includes(key.value)) ||
        isChildrenSelected.value
    );
    const classNames = computed(() => [
      `${prefixCls.value}`,
      `${prefixCls.value}-header`,
      {
        [`${menuPrefixCls.value}-selected`]: isSelected.value,
      },
    ]);
    const needPopOnBottom = computed(
      () => mode.value === 'horizontal' && !menuContext.inTrigger
    );
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
      // @ts-ignore
      menuContext.triggerProps?.class,
    ]);
    const triggerProps = computed(() =>
      omit(menuContext.triggerProps || {}, ['class'])
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
