<template>
  <component
    :is="componentTag"
    :class="classNames"
    :style="siderStyles"
    v-bind="resizeDirectionsProps"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="showMask"
      :class="`${prefixCls}-mask`"
      :style="maskStyles"
      @click="handleMaskClick"
    />
    <div v-if="$slots.image" :class="`${prefixCls}-image`">
      <slot name="image" />
    </div>
    <div v-if="$slots.prepend" :class="`${prefixCls}-prepend`">
      <slot name="prepend" />
    </div>
    <div :class="`${prefixCls}-children`">
      <slot />
    </div>
    <div v-if="$slots.append" :class="`${prefixCls}-append`">
      <slot name="append" />
    </div>
    <div
      v-if="showTrigger"
      :class="triggerClassNames"
      :style="triggerStyles"
      @click="toggleTrigger"
    >
      <slot name="trigger" :collapsed="localCollapsed">
        <div v-if="!reverseArrow">
          <IconLeft v-if="!localCollapsed" />
          <IconRight v-else />
        </div>
        <div v-else>
          <IconLeft v-if="localCollapsed" />
          <IconRight v-else />
        </div>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
  import {
    computed,
    inject,
    onMounted,
    onUnmounted,
    PropType,
    provide,
    reactive,
    Ref,
    toRefs,
    watch,
  } from 'vue';

  import useMergeState from '../_hooks/use-merge-state';
  import usePopupManager from '../_hooks/use-popup-manager';
  import { useResponsive } from '../_hooks/use-responsive';
  import { off, on } from '../_utils/dom';
  import { getPrefixCls } from '../_utils/global-config';
  import { isNumber } from '../_utils/is';
  import { KEYBOARD_KEY } from '../_utils/keyboard';
  import IconLeft from '../icon/icon-left';
  import IconRight from '../icon/icon-right';
  import ResizeBox from '../resize-box';
  import { LayoutSiderInjectionKey, SiderInjectionKey } from './context';
  import { SIDER_LOCATIONS } from './utils';

  const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
      i += 1;
      return `${prefix}${i}`;
    };
  })();

  defineOptions({ name: 'LayoutSider' });

  const props = defineProps({
    /**
     * @zh 主题颜色
     * @en Theme
     */
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light',
    },
    /**
     * @zh 抽屉是否可见
     * @en Whether navigation drawer is visible
     */
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认是否显示抽屉
     * @en Whether navigation drawer is visible by default
     */
    defaultVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 当前收起状态
     * @en Current collapsed state
     */
    collapsed: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认的收起状态
     * @en The default collapsed state
     */
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否可收起
     * @en Whether is collapsible
     */
    collapsible: {
      type: Boolean,
    },
    /**
     * @zh 是否启用 rail 模式
     * @en Whether to enable rail mode
     */
    rail: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 默认是否启用 rail 模式
     * @en Whether to enable rail mode by default
     */
    defaultRail: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh rail 模式下的宽度
     * @en Width in rail mode
     */
    railWidth: {
      type: [Number, String],
      default: 56,
    },
    /**
     * @zh 是否在 hover 时临时展开 rail
     * @en Whether to expand rail on hover
     */
    expandOnHover: {
      type: Boolean,
    },
    /**
     * @zh 是否禁用响应式宽度监听
     * @en Whether to disable resize watcher
     */
    disableResizeWatcher: {
      type: Boolean,
    },
    /**
     * @zh 是否禁用路由切换时自动关闭临时抽屉
     * @en Whether to disable route watcher
     */
    disableRouteWatcher: {
      type: Boolean,
    },
    /**
     * @zh 宽度
     * @en Width
     */
    width: {
      type: [Number, String],
      default: 200,
    },
    /**
     * @zh 顶部或底部抽屉的高度
     * @en Height of top or bottom drawer
     */
    height: {
      type: [Number, String],
      default: undefined,
    },
    /**
     * @zh 收缩宽度
     * @en Collapsed width
     */
    collapsedWidth: {
      type: Number,
      default: 48,
    },
    /**
     * @zh 是否为临时抽屉模式
     * @en Whether to use temporary drawer mode
     */
    temporary: {
      type: Boolean,
    },
    /**
     * @zh 是否始终显示抽屉
     * @en Whether to always keep the drawer active
     */
    permanent: {
      type: Boolean,
    },
    /**
     * @zh 临时抽屉模式下点击遮罩后是否保持显示
     * @en Whether temporary drawer should stay open after scrim click
     */
    persistent: {
      type: Boolean,
    },
    /**
     * @zh 是否显示遮罩层
     * @en Whether to show the temporary drawer mask
     */
    mask: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 点击遮罩层是否可以关闭抽屉
     * @en Whether the drawer can be closed by clicking the mask
     */
    maskClosable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否支持通过 ESC 键关闭临时抽屉
     * @en Whether temporary drawer can be closed with ESC
     */
    escToClose: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 抽屉停靠位置
     * @en Navigation drawer location
     */
    location: {
      type: String as PropType<(typeof SIDER_LOCATIONS)[number]>,
      default: 'start',
      validator: (value: string) =>
        SIDER_LOCATIONS.includes(value as (typeof SIDER_LOCATIONS)[number]),
    },
    /**
     * @zh 是否启用浮动模式
     * @en Whether to enable floating mode
     */
    floating: {
      type: Boolean,
    },
    /**
     * @zh 是否启用粘性定位
     * @en Whether to enable sticky mode
     */
    sticky: {
      type: Boolean,
    },
    /**
     * @zh 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用
     * @en Flip and fold the direction of the hint arrow, which can be used when Sider is on the right
     */
    reverseArrow: {
      type: Boolean,
    },
    /**
     * @zh 触发响应式布局的断点, 详见[响应式栅格](/vue/component/grid)
     * @en Trigger breakpoints for responsive layout, see [Responsive Grid](/vue/component/grid) for details
     */
    breakpoint: {
      type: String as PropType<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'>,
    },
    /**
     * @zh 可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。详情请看 [ResizeBox](/vue/component/resize-box)。
     * @en Can replace the native `aside` tag with ResizeBox. This is the `directions` parameter of ResizeBox. For details, please see [ResizeBox](/vue/component/resize-box)
     */
    resizeDirections: {
      type: Array as PropType<Array<'left' | 'right' | 'top' | 'bottom'>>,
      default: undefined,
    },
    /**
     * @zh 隐藏底部折叠触发器
     * @en Whether to hide the bottom fold trigger
     */
    hideTrigger: {
      type: Boolean,
    },
  });

  const emit = defineEmits<{
    'update:modelValue': [_value: boolean];
    'update:rail': [_value: boolean];
    'collapse': [_collapsed: boolean, _type: 'clickTrigger' | 'responsive'];
    'update:collapsed': [_collapsed: boolean];
    'breakpoint': [_collapsed: boolean];
  }>();

  /**
   * @zh 自定义底部折叠触发器
   * @en Custom bottom folding trigger
   * @slot trigger
   * @binding {boolean} collapsed
   */

  const {
    theme,
    modelValue,
    defaultVisible,
    collapsed,
    defaultCollapsed,
    collapsible,
    rail,
    defaultRail,
    expandOnHover,
    disableResizeWatcher,
    disableRouteWatcher,
    hideTrigger,
    breakpoint,
    height,
    collapsedWidth,
    mask,
    maskClosable,
    escToClose,
    location,
    floating,
    permanent,
    persistent,
    sticky,
    temporary,
    resizeDirections,
  } = toRefs(props);

  const prefixCls = getPrefixCls('layout-sider');
  const [localCollapsed, setLocalCollapsed] = useMergeState(
    defaultCollapsed.value,
    reactive({ value: collapsed }),
  );
  const [drawerVisible, setDrawerVisible] = useMergeState(
    defaultVisible.value,
    reactive({ value: modelValue }),
  );
  const [railCollapsed, setRailCollapsed] = useMergeState(
    defaultRail.value,
    reactive({ value: rail }),
  );

  const physicalLocation = computed(() => {
    if (location.value === 'start') {
      return 'left';
    }

    if (location.value === 'end') {
      return 'right';
    }

    return location.value;
  });
  const isHorizontal = computed(() => ['left', 'right'].includes(physicalLocation.value));
  const isTemporary = computed(() => !permanent.value && !!temporary.value);
  const isDrawerActive = computed(() => !!permanent.value || drawerVisible.value);
  const temporaryVisible = computed(() => isTemporary.value && isDrawerActive.value);
  const railModeEnabled = computed(() => (rail?.value ?? defaultRail.value) || railCollapsed.value);
  const { zIndex } = usePopupManager('dialog', {
    visible: temporaryVisible,
  });

  const componentTag = computed(() =>
    resizeDirections?.value && !isTemporary.value && isHorizontal.value ? ResizeBox : 'div',
  );
  const resizeDirectionsProps = computed(() =>
    componentTag.value === ResizeBox && resizeDirections?.value
      ? { directions: resizeDirections.value }
      : {},
  );
  const showTrigger = computed(
    () => collapsible.value && !hideTrigger.value && !isTemporary.value && isHorizontal.value,
  );
  const siderSize = computed(() => {
    let rawSize = props.width;

    if (localCollapsed.value) {
      rawSize = props.collapsedWidth;
    } else if (railCollapsed.value) {
      rawSize = props.railWidth;
    }

    return isNumber(rawSize) ? `${rawSize}px` : String(rawSize);
  });
  const crossAxisSize = computed(() => {
    const rawSize = height?.value ?? props.width;

    return isNumber(rawSize) ? `${rawSize}px` : String(rawSize);
  });
  const siderStyles = computed(() => {
    const style = isHorizontal.value ? { width: siderSize.value } : { height: crossAxisSize.value };

    if (!isTemporary.value) {
      if (sticky.value && isHorizontal.value) {
        return {
          ...style,
          position: 'sticky',
          top: '0',
          alignSelf: 'flex-start',
          maxHeight: '100vh',
        };
      }

      return style;
    }

    return {
      ...style,
      [physicalLocation.value]: 0,
      zIndex: zIndex.value || undefined,
    };
  });
  const triggerStyles = computed(() => ({ width: siderSize.value }));
  const showMask = computed(() => isTemporary.value && isDrawerActive.value && mask.value);
  const maskStyles = computed(() => {
    const baseStyle: Record<string, string | number | undefined> = {
      zIndex: zIndex.value ? zIndex.value - 1 : undefined,
    };

    if (!showMask.value) {
      return baseStyle;
    }

    if (physicalLocation.value === 'left') {
      return {
        ...baseStyle,
        top: 0,
        right: 0,
        bottom: 0,
        left: siderSize.value,
      };
    }

    if (physicalLocation.value === 'right') {
      return {
        ...baseStyle,
        top: 0,
        right: siderSize.value,
        bottom: 0,
        left: 0,
      };
    }

    if (physicalLocation.value === 'top') {
      return {
        ...baseStyle,
        top: crossAxisSize.value,
        right: 0,
        bottom: 0,
        left: 0,
      };
    }

    return {
      ...baseStyle,
      top: 0,
      right: 0,
      bottom: crossAxisSize.value,
      left: 0,
    };
  });

  const classNames = computed(() => [
    prefixCls,
    {
      [`${prefixCls}-light`]: theme.value === 'light',
      [`${prefixCls}-has-trigger`]: showTrigger.value,
      [`${prefixCls}-collapsed`]: localCollapsed.value,
      [`${prefixCls}-temporary`]: isTemporary.value,
      [`${prefixCls}-persistent`]: persistent.value,
      [`${prefixCls}-active`]: isDrawerActive.value,
      [`${prefixCls}-rail`]: railCollapsed.value,
      [`${prefixCls}-expand-on-hover`]: expandOnHover.value,
      [`${prefixCls}-floating`]: floating.value,
      [`${prefixCls}-sticky`]: sticky.value,
      [`${prefixCls}-${physicalLocation.value}`]: true,
    },
  ]);
  const triggerClassNames = computed(() => [
    `${prefixCls}-trigger`,
    {
      [`${prefixCls}-trigger-light`]: theme.value === 'light',
    },
  ]);

  const setVisibleState = (nextVisible: boolean) => {
    setDrawerVisible(nextVisible);
    emit('update:modelValue', nextVisible);
  };
  const setRailState = (nextRail: boolean) => {
    setRailCollapsed(nextRail);
    emit('update:rail', nextRail);
  };

  const toggleTrigger = () => {
    const nextCollapsed = !localCollapsed.value;
    setLocalCollapsed(nextCollapsed);
    emit('update:collapsed', nextCollapsed);
    emit('collapse', nextCollapsed, 'clickTrigger');
  };
  const handleMaskClick = () => {
    if (!maskClosable.value || persistent.value) {
      return;
    }

    setVisibleState(false);
  };
  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === KEYBOARD_KEY.ESC &&
      escToClose.value &&
      isTemporary.value &&
      !persistent.value
    ) {
      setVisibleState(false);
    }
  };
  const handleRouteChange = () => {
    if (isTemporary.value && isDrawerActive.value && !disableRouteWatcher.value) {
      setVisibleState(false);
    }
  };
  const handleMouseEnter = () => {
    if (expandOnHover.value && railModeEnabled.value && railCollapsed.value) {
      setRailState(false);
    }
  };
  const handleMouseLeave = () => {
    if (expandOnHover.value && railModeEnabled.value && !railCollapsed.value) {
      setRailState(true);
    }
  };

  useResponsive(breakpoint, (checked) => {
    if (disableResizeWatcher.value) {
      return;
    }

    const nextCollapsed = !checked;
    if (nextCollapsed !== localCollapsed.value) {
      setLocalCollapsed(nextCollapsed);
      emit('update:collapsed', nextCollapsed);
      emit('collapse', nextCollapsed, 'responsive');
      emit('breakpoint', nextCollapsed);
    }
  });

  watch(
    () => props.permanent,
    (nextPermanent) => {
      if (nextPermanent) {
        setVisibleState(true);
      }
    },
  );
  watch(
    [isTemporary, isDrawerActive, escToClose],
    ([nextTemporary, nextActive, nextEsc]) => {
      off(document.documentElement, 'keydown', handleGlobalKeyDown);

      if (nextTemporary && nextActive && nextEsc) {
        on(document.documentElement, 'keydown', handleGlobalKeyDown);
      }
    },
    { immediate: true },
  );
  watch(
    [isTemporary, isDrawerActive, disableRouteWatcher],
    ([nextTemporary, nextActive, nextDisableRouteWatcher]) => {
      off(window, 'popstate', handleRouteChange);
      off(window, 'hashchange', handleRouteChange);

      if (nextTemporary && nextActive && !nextDisableRouteWatcher) {
        on(window, 'popstate', handleRouteChange);
        on(window, 'hashchange', handleRouteChange);
      }
    },
    { immediate: true },
  );

  const uniqueId = generateId('__arco_layout_sider');
  const siderHook = inject(LayoutSiderInjectionKey, undefined);

  onMounted(() => {
    siderHook?.onSiderMount?.(uniqueId);
  });

  onUnmounted(() => {
    off(document.documentElement, 'keydown', handleGlobalKeyDown);
    off(window, 'popstate', handleRouteChange);
    off(window, 'hashchange', handleRouteChange);
    siderHook?.onSiderUnMount?.(uniqueId);
  });

  provide(
    SiderInjectionKey,
    reactive({
      theme,
      collapsed: computed(() => localCollapsed.value || railCollapsed.value) as Ref<boolean>,
      collapsedWidth,
    }),
  );
</script>
