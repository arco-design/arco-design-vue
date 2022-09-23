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
   * @zh 宽度
   * @en Width of sider
   * @defaultValue 200
   */
  width?: number | string;
  /**
   * @zh 收缩宽度，设置为 0 会出现特殊 trigger
   * @en Width of collapsed sider
   * @defaultValue 48
   */
  collapsedWidth?: number;
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
