/**
 * @title Layout
 */
export interface LayoutProps {
  /**
   * @zh
   * 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动
   * @en
   * Indicates that there is a `Sider` in the children. Generally no need to specify.
   * It's used to avoid flicker during server-side rendering
   */
  hasSider?: boolean;
}

export type LayoutHeaderDensity = 'default' | 'prominent' | 'comfortable' | 'compact';

export type LayoutHeaderScrollBehavior =
  | 'hide'
  | 'fully-hide'
  | 'inverted'
  | 'collapse'
  | 'elevate'
  | 'fade-image';

/**
 * @title Layout.Header
 */
export interface LayoutHeaderProps {
  /**
   * @zh 标题内容
   * @en Header title
   */
  title?: string;
  /**
   * @zh 头图地址
   * @en Header image url
   */
  image?: string;
  /**
   * @zh 当前是否显示
   * @en Whether header is visible
   */
  modelValue?: boolean;
  /**
   * @zh 默认是否显示（非受控模式）
   * @en Whether header is visible by default
   * @defaultValue true
   */
  defaultVisible?: boolean;
  /**
   * @zh 内容区域高度
   * @en Header content height
   * @defaultValue 64
   */
  height?: number | string;
  /**
   * @zh 密度
   * @en Header density
   * @defaultValue default
   */
  density?: LayoutHeaderDensity;
  /**
   * @zh 是否启用扩展区域
   * @en Whether extension area is enabled
   */
  extended?: boolean;
  /**
   * @zh 扩展区域高度
   * @en Extension area height
   * @defaultValue 48
   */
  extensionHeight?: number | string;
  /**
   * @zh 是否强制折叠扩展区域
   * @en Whether to collapse extension area
   */
  collapse?: boolean;
  /**
   * @zh 是否移除阴影
   * @en Whether to remove shadow
   */
  flat?: boolean;
  /**
   * @zh 是否启用浮动态
   * @en Whether to use floating style
   */
  floating?: boolean;
  /**
   * @zh 是否固定在视口边缘
   * @en Whether header is fixed to viewport edge
   */
  fixed?: boolean;
  /**
   * @zh 是否启用粘性定位
   * @en Whether header uses sticky positioning
   */
  sticky?: boolean;
  /**
   * @zh 是否脱离文档流绝对定位
   * @en Whether header uses absolute positioning
   */
  absolute?: boolean;
  /**
   * @zh 停靠位置
   * @en Header location
   * @defaultValue top
   */
  location?: 'top' | 'bottom';
  /**
   * @zh 滚动行为，可组合 hide、fully-hide、inverted、collapse、elevate、fade-image
   * @en Scroll behavior tokens
   */
  scrollBehavior?: string;
  /**
   * @zh 滚动容器选择器，默认监听 window
   * @en Scroll container selector, defaults to window
   */
  scrollTarget?: string;
  /**
   * @zh 触发滚动行为的阈值
   * @en Scroll threshold
   * @defaultValue 300
   */
  scrollThreshold?: number | string;
}

/**
 * @title Layout.Sider
 */
export interface SiderProps {
  /**
   * @zh 主题颜色
   * @en Theme of layout
   * @defaultValue light
   */
  theme?: 'dark' | 'light';
  /**
   * @zh 抽屉是否可见
   * @en Whether navigation drawer is visible
   */
  modelValue?: boolean;
  /**
   * @zh 默认是否显示抽屉（非受控模式）
   * @en Whether navigation drawer is visible by default
   */
  defaultVisible?: boolean;
  /**
   * @zh 当前收起状态
   * @en Whether sider is collapsed
   */
  collapsed?: boolean;
  /**
   * @zh 是否默认收起
   * @en Whether sider is collapsed by default
   */
  defaultCollapsed?: boolean;
  /**
   * @zh 是否可收起
   * @en Whether sider can be collapsed
   */
  collapsible?: boolean;
  /**
   * @zh 是否启用 rail 模式
   * @en Whether to enable rail mode
   */
  rail?: boolean;
  /**
   * @zh 默认是否启用 rail 模式（非受控模式）
   * @en Whether to enable rail mode by default
   */
  defaultRail?: boolean;
  /**
   * @zh rail 模式下的宽度
   * @en Width in rail mode
   * @defaultValue 56
   */
  railWidth?: number | string;
  /**
   * @zh 是否在 hover 时临时展开 rail
   * @en Whether to expand rail on hover
   */
  expandOnHover?: boolean;
  /**
   * @zh 是否禁用响应式宽度监听
   * @en Whether to disable resize watcher
   */
  disableResizeWatcher?: boolean;
  /**
   * @zh 是否禁用路由切换时自动关闭临时抽屉
   * @en Whether to disable route watcher
   */
  disableRouteWatcher?: boolean;
  /**
   * @zh 宽度
   * @en Width of sider
   * @defaultValue 200
   */
  width?: number | string;
  /**
   * @zh 顶部或底部抽屉的高度
   * @en Height of top or bottom drawer
   */
  height?: number | string;
  /**
   * @zh 收缩宽度，设置为 0 会出现特殊 trigger
   * @en Width of collapsed sider
   * @defaultValue 48
   */
  collapsedWidth?: number;
  /**
   * @zh 是否为临时抽屉模式
   * @en Whether to use temporary drawer mode
   */
  temporary?: boolean;
  /**
   * @zh 是否始终显示抽屉
   * @en Whether to always keep the drawer active
   */
  permanent?: boolean;
  /**
   * @zh 临时抽屉模式下点击遮罩后是否保持显示
   * @en Whether temporary drawer should stay open after scrim click
   */
  persistent?: boolean;
  /**
   * @zh 是否显示遮罩层
   * @en Whether to show the temporary drawer mask
   */
  mask?: boolean;
  /**
   * @zh 点击遮罩层是否可以关闭抽屉
   * @en Whether the drawer can be closed by clicking the mask
   */
  maskClosable?: boolean;
  /**
   * @zh 是否支持通过 ESC 键关闭临时抽屉
   * @en Whether temporary drawer can be closed with ESC
   */
  escToClose?: boolean;
  /**
   * @zh 抽屉停靠位置
   * @en Navigation drawer location
   * @defaultValue start
   */
  location?: 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom';
  /**
   * @zh 是否启用浮动模式
   * @en Whether to enable floating mode
   */
  floating?: boolean;
  /**
   * @zh 是否启用粘性定位
   * @en Whether to enable sticky mode
   */
  sticky?: boolean;
  /**
   * @zh 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用
   * @en Reverse the direction of the fold arrow, can be used when sider is on the right
   */
  reverseArrow?: boolean;
  /**
   * @zh 触发响应式布局的断点, 详见[响应式栅格](/vue/components/Grid)
   * @en Breakpoint in responsive layout. See details [Grid](/vue/components/Grid)
   */
  breakpoint?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /**
   * @zh
   * 可以用 ResizeBox 替换原生的 `aside` 标签，这个参数即 ResizeBox的 `directions` 参数。
   * 详情请看 [ResizeBox](/vue/components/resize-box)。
   * @en
   * You can replace the native `aside` tag with `ResizeBox`, under which case this param will be the `directions` property of `ResizeBox`.
   * See details [ResizeBox](/vue/components/resize-box).
   */
  resizeDirections?: string[];
  /**
   * @zh 隐藏底部折叠触发器
   * @en Hide the trigger element to collapse sider at bottom.
   */
  hideTrigger?: boolean;
}
