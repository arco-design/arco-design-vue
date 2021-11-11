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
  ref,
  toRefs,
  watchEffect,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconMenuFold from '../icon/icon-menu-fold';
import IconMenuUnfold from '../icon/icon-menu-unfold';
import useMergeState from '../_hooks/use-merge-state';
import useIsMounted from '../_hooks/use-is-mounted';
import { provideLevel } from './hooks/use-level';
import { MenuContext, MenuInjectionKey } from './context';
import { MenuProps } from './interface';
import usePickSlots from '../_hooks/use-pick-slots';
import { omit } from '../_utils/omit';

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
      type: Object as PropType<CSSProperties>,
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
      type: Object,
    },
    /**
     * @zh 弹出模式下可接受所有 `ToolTip` 的 `Props`
     * @en Accept all `Props` of `ToolTip` in pop-up mode
     */
    tooltipProps: {
      type: Object,
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
  },
  emits: [
    'update:collapsed',
    'update:selectedKeys',
    'update:openKeys',
    /**
     * @zh 折叠状态改变时触发
     * @en Triggered when the collapsed state changes
     * @param {boolean} collapsed
     */
    'collapse',
    /**
     * @zh 点击菜单项时触发
     * @en Triggered when the menu item is clicked
     * @param {string} key
     */
    'menuItemClick',
    /**
     * @zh 点击子菜单时触发
     * @en Triggered when the submenu is clicked
     * @param {string} key
     * @param {string[]} openKeys
     */
    'subMenuClick',
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
  setup(props: MenuProps, { emit, slots }) {
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
      prefixCls,
      triggerProps,
      tooltipProps,
      // internal
      inTrigger,
      siderCollapsed,
    } = toRefs(props);

    const isMounted = useIsMounted();

    const [selectedKeys, setSelectedKeys] = useMergeState(
      defaultSelectedKeys.value,
      reactive({
        value: propSelectedKeys,
      })
    );

    const [openKeys, setOpenKeys] = useMergeState(
      defaultOpenKeys.value,
      reactive({
        value: propOpenKeys,
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
    const onCollapseBtnClick = () => {
      const nextCollapsed = !collapsed.value;
      setCollapsed(nextCollapsed);
      emit('update:collapsed', nextCollapsed);
      emit('collapse', nextCollapsed);
    };

    const computedPrefixCls = computed(
      () => prefixCls?.value || getPrefixCls('menu')
    );
    const classNames = computed(() => [
      computedPrefixCls.value,
      `${computedPrefixCls.value}-${theme.value}`,
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
      const pxCollapsedWidth =
        collapsedWidth &&
        collapsedWidth.value !== undefined &&
        `${collapsedWidth.value}px`;

      const width = computedCollapsed.value
        ? pxCollapsedWidth
        : style?.value?.width;

      const widthStyle = width ? { width } : {};

      return {
        ...omit(style?.value || {}, ['width']),
        ...widthStyle,
      };
    });

    // Used for autoOpen to set openKeys
    const subMenuKeys = ref<string[]>([]);
    let prevSubMenuKeys: string[] = [];
    let shadowOpenKeys: string[] = [];
    watchEffect(() => {
      shadowOpenKeys = [...openKeys.value];
    });

    // 初次渲染以及子菜单变化时需要响应 autoOpen
    watchEffect(
      () => {
        if (!isMounted.value) return;

        let validOpenKeys = shadowOpenKeys.filter(
          (i) => subMenuKeys.value.indexOf(i) > -1
        );
        if (autoOpen.value) {
          const keysAdded = subMenuKeys.value.filter(
            (i) => prevSubMenuKeys.indexOf(i) < 0
          );
          validOpenKeys = (shadowOpenKeys || []).concat(keysAdded);
        }
        prevSubMenuKeys = subMenuKeys.value.slice();
        setOpenKeys(
          accordion.value ? validOpenKeys.slice(0, 1) : validOpenKeys
        );
      },
      {
        flush: 'post',
      }
    );

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
      expandIconDown,
      expandIconRight,
      onMenuItemClick: (key: string) => {
        setSelectedKeys([key]);
        emit('update:selectedKeys', [key]);
        emit('menuItemClick', key);
      },
      onSubMenuClick: (key: string, level: number) => {
        let newOpenKeys: string[] = [];
        if (openKeys.value && openKeys.value.indexOf(key) > -1) {
          if (accordion.value && level === 1) {
            newOpenKeys = [];
          } else {
            newOpenKeys = openKeys.value.filter((i) => i !== key) || [];
          }
        } else if (accordion.value && level === 1) {
          newOpenKeys = [key];
        } else {
          newOpenKeys = openKeys.value.concat([key]) || [];
        }
        setOpenKeys(newOpenKeys);
        emit('update:openKeys', newOpenKeys);
        emit('subMenuClick', key, newOpenKeys);
      },
      collectSubMenuKey: (key: string) => {
        subMenuKeys.value.push(key);
      },
      removeSubMenuKey: (key: string) => {
        subMenuKeys.value = subMenuKeys.value.filter((i) => i !== key);
      },
    });
    provide<MenuContext>(MenuInjectionKey, menuContext);

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
