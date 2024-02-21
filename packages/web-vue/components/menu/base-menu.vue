<template>
  <div :class="classNames" v-bind="$attrs" :style="computedStyle">
    <div :class="`${computedPrefixCls}-inner`">
      <slot />
    </div>
    <div
      v-if="computedHasCollapseButton"
      :class="`${computedPrefixCls}-collapse-button`"
      @click="onCollapseBtnClick"
    >
      <slot name="collapse-icon" :collapsed="computedCollapsed">
        <IconMenuUnfold v-if="computedCollapsed" />
        <IconMenuFold v-else />
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  provide,
  reactive,
  toRefs,
  StyleValue,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconMenuFold from '../icon/icon-menu-fold';
import IconMenuUnfold from '../icon/icon-menu-unfold';
import useMergeState from '../_hooks/use-merge-state';
import { provideLevel } from './hooks/use-level';
import { MenuInjectionKey } from './context';
import usePickSlots from '../_hooks/use-pick-slots';
import { omit } from '../_utils/omit';
import useMenuDataCollector from './hooks/use-menu-data-collector';
import useMenuOpenState from './hooks/use-menu-open-state';
import { useResponsive } from '../_hooks/use-responsive';
import { isNumber, isObject } from '../_utils/is';
import { TriggerProps } from '../trigger';

/**
 * @displayName Menu
 */
export default defineComponent({
  name: 'BaseMenu',
  components: {
    IconMenuFold,
    IconMenuUnfold,
  },
  inheritAttrs: false,
  props: {
    style: {
      type: Object as PropType<StyleValue>,
    },
    /**
     * @zh 菜单的主题
     * @en Menu theme
     */
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light',
    },
    /**
     * @zh 菜单的模式
     * @en The mode of menu
     */
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'pop' | 'popButton'>,
      default: 'vertical',
    },
    /**
     * @zh 层级之间的缩进量
     * @en Indentation between levels
     */
    levelIndent: {
      type: Number,
    },
    /**
     * @zh 默认展开所有多级菜单
     * @en Expand all multi-level menus by default
     */
    autoOpen: {
      type: Boolean,
    },
    /**
     * @zh 是否折叠菜单
     * @en Whether to collapse the menu
     * @vModel
     */
    collapsed: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认是否折叠菜单
     * @en Whether to collapse the menu by default
     */
    defaultCollapsed: {
      type: Boolean,
    },
    /**
     * @zh 折叠菜单宽度
     * @en Collapse menu width
     */
    collapsedWidth: {
      type: Number,
    },
    /**
     * @zh 开启手风琴效果
     * @en Turn on the accordion effect
     */
    accordion: {
      type: Boolean,
    },
    /**
     * @zh 是否自动滚动选中项目到可见区域
     * @en Whether to automatically scroll the selected item to the visible area
     */
    autoScrollIntoView: {
      type: Boolean,
    },
    /**
     * @zh 是否内置折叠按钮
     * @en Whether built-in folding button
     */
    showCollapseButton: {
      type: Boolean,
    },
    /**
     * @zh 选中的菜单项 key 数组
     * @en The selected menu item key array
     * @vModel
     */
    selectedKeys: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 默认选中的菜单项 key 数组
     * @en The key array of the menu items selected by default
     */
    defaultSelectedKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 展开的子菜单 key 数组
     * @en Expanded submenu key array
     * @vModel
     */
    openKeys: {
      type: Array as PropType<string[]>,
    },
    /**
     * @zh 默认展开的子菜单 key 数组
     * @en The default expanded submenu key array
     */
    defaultOpenKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @zh 滚动到可见区域的配置项，接收所有[scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)的参数
     * @en Scroll to the configuration items in the visible area and receive all the parameters of [scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)
     */
    scrollConfig: {
      type: Object as PropType<{ [key: string]: any }>,
    },
    /**
     * @zh 弹出模式下可接受所有 `Trigger` 的 `Props`
     * @en Accept all `Props` of `Trigger` in pop-up mode
     */
    triggerProps: {
      type: Object as PropType<TriggerProps>,
    },
    /**
     * @zh 弹出模式下可接受所有 `ToolTip` 的 `Props`
     * @en Accept all `Props` of `ToolTip` in pop-up mode
     */
    tooltipProps: {
      type: Object,
    },
    /**
     * @zh 默认展开选中的菜单
     * @en Expand the selected menus by default
     * @version 2.8.0
     */
    autoOpenSelected: {
      type: Boolean,
    },
    /**
     * @zh 响应式的断点, 详见[响应式栅格](/vue/component/grid)
     * @en Responsive breakpoints, see [Responsive Grid](/vue/component/grid) for details
     * @version 2.18.0
     */
    breakpoint: {
      type: String as PropType<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'>,
    },
    /**
     * @zh 弹出框的最大高度
     * @en The maximum height of popover
     * @version 2.23.0
     */
    popupMaxHeight: {
      type: [Boolean, Number] as PropType<boolean | number>,
      default: true,
    },
    // internal
    prefixCls: {
      type: String,
    },
    inTrigger: {
      type: Boolean,
    },
    siderCollapsed: {
      type: Boolean,
    },
    isRoot: {
      type: Boolean,
    },
  },
  emits: [
    'update:collapsed',
    'update:selectedKeys',
    'update:openKeys',
    /**
     * @zh 折叠状态改变时触发
     * @en Triggered when the collapsed state changes
     * @param {boolean} collapsed
     * @param {'clickTrigger'|'responsive'} type
     */
    'collapse',
    /**
     * @zh 点击菜单项时触发
     * @en Triggered when the menu item is clicked
     * @param {string} key
     */
    'menu-item-click',
    /**
     * @zh 点击子菜单时触发
     * @en Triggered when the submenu is clicked
     * @param {string} key
     * @param {string[]} openKeys
     */
    'sub-menu-click',
  ],
  /**
   * @zh 折叠图标
   * @en Collapse icon
   * @slot collapse-icon
   * @binding {boolean} collapsed
   */
  /**
   * @zh 向下展开的图标
   * @en Icon expand down
   * @slot expand-icon-down
   */
  /**
   * @zh 向右展开的图标
   * @en Icon expand right
   * @slot expand-icon-right
   */
  setup(props, { emit, slots }) {
    const {
      style,
      mode,
      theme,
      levelIndent,
      accordion,
      showCollapseButton,
      scrollConfig,
      autoScrollIntoView,
      collapsedWidth,
      autoOpen,
      collapsed: propCollapsed,
      defaultCollapsed,
      selectedKeys: propSelectedKeys,
      defaultSelectedKeys,
      openKeys: propOpenKeys,
      defaultOpenKeys,
      triggerProps,
      tooltipProps,
      autoOpenSelected,
      breakpoint,
      popupMaxHeight,
      // internal
      prefixCls,
      inTrigger,
      siderCollapsed,
      isRoot,
    } = toRefs(props);

    const { subMenuKeys, menuData } = useMenuDataCollector({
      type: isRoot.value ? 'menu' : 'popupMenu',
    });

    const [selectedKeys, setSelectedKeys] = useMergeState(
      defaultSelectedKeys.value,
      reactive({
        value: propSelectedKeys,
      })
    );

    const { openKeys, setOpenKeys, open } = useMenuOpenState(
      reactive({
        modelValue: propOpenKeys,
        defaultValue: defaultOpenKeys,
        autoOpen,
        autoOpenSelected,
        selectedKeys,
        subMenuKeys,
        menuData,
        accordion,
      })
    );

    const [collapsed, setCollapsed] = useMergeState(
      defaultCollapsed.value,
      reactive({
        value: propCollapsed,
      })
    );
    const computedCollapsed = computed(
      () =>
        siderCollapsed.value || collapsed.value || mode.value === 'popButton'
    );
    const computedHasCollapseButton = computed(
      () =>
        ['horizontal', 'popButton'].indexOf(mode.value) < 0 &&
        !inTrigger.value &&
        showCollapseButton.value
    );
    const changeCollapsed = (
      newVal: boolean,
      type: 'clickTrigger' | 'responsive'
    ) => {
      if (newVal === collapsed.value) return;
      setCollapsed(newVal);
      emit('update:collapsed', newVal);
      emit('collapse', newVal, type);
    };
    const onCollapseBtnClick = () => {
      changeCollapsed(!collapsed.value, 'clickTrigger');
    };
    useResponsive(breakpoint, (checked) => {
      changeCollapsed(!checked, 'responsive');
    });

    const computedPrefixCls = computed(
      () => prefixCls?.value || getPrefixCls('menu')
    );
    const classNames = computed(() => [
      computedPrefixCls.value,
      `${computedPrefixCls.value}-${theme?.value}`,
      {
        [`${computedPrefixCls.value}-horizontal`]: mode.value === 'horizontal',
        [`${computedPrefixCls.value}-vertical`]: mode.value !== 'horizontal',
        [`${computedPrefixCls.value}-collapsed`]: computedCollapsed.value,
        [`${computedPrefixCls.value}-pop`]:
          mode.value === 'pop' || computedCollapsed.value,
        [`${computedPrefixCls.value}-pop-button`]: mode.value === 'popButton',
      },
    ]);
    const computedStyle = computed(() => {
      const pxCollapsedWidth = isNumber(collapsedWidth.value)
        ? `${collapsedWidth.value}px`
        : undefined;

      const objectStyle = isObject(style.value)
        ? (style.value as CSSProperties)
        : undefined;

      const width = computedCollapsed.value
        ? pxCollapsedWidth
        : objectStyle?.width;

      return [
        objectStyle ? omit(objectStyle, ['width']) : style.value,
        { width },
      ];
    });

    const expandIconDown = usePickSlots(slots, 'expand-icon-down');
    const expandIconRight = usePickSlots(slots, 'expand-icon-right');

    // provide MenuContext
    const menuContext = reactive({
      theme,
      mode,
      levelIndent,
      autoScrollIntoView,
      selectedKeys,
      openKeys,
      prefixCls: computedPrefixCls,
      scrollConfig,
      inTrigger,
      collapsed: computedCollapsed,
      triggerProps,
      tooltipProps,
      popupMaxHeight,
      expandIconDown,
      expandIconRight,
      onMenuItemClick: (key: string) => {
        setSelectedKeys([key]);
        emit('update:selectedKeys', [key]);
        emit('menu-item-click', key);
      },
      onSubMenuClick: (key: string, level: number) => {
        const newOpenKeys = open(key, level);
        setOpenKeys(newOpenKeys);
        emit('update:openKeys', newOpenKeys);
        emit('sub-menu-click', key, newOpenKeys);
      },
    });
    provide(MenuInjectionKey, menuContext);

    // provide LevelContext
    provideLevel(1);

    return {
      computedPrefixCls,
      classNames,
      computedStyle,
      computedCollapsed,
      computedHasCollapseButton,
      onCollapseBtnClick,
    };
  },
});
</script>
