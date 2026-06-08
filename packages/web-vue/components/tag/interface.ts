import type { EllipsisTooltipProps } from '../ellipsis';

export const TAG_COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'sdblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
] as const;

export type TagColor = (typeof TAG_COLORS)[number];

export interface TagProps {
  /**
   * @zh 标签的颜色
   * @en Label color
   */
  color?: string;
  /**
   * @zh 标签的大小
   * @en Label size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * @zh 是否显示边框
   * @en Whether the tag is bordered
   */
  bordered?: boolean;
  /**
   * @zh 标签是否可见
   * @en Whether the tag is visible
   */
  visible?: boolean;
  /**
   * @zh 标签默认是否可见
   * @en Whether the tag is visible by default
   */
  defaultVisible?: boolean;
  /**
   * @zh 标签是否为加载中状态
   * @en Whether the tag is loading state
   */
  loading?: boolean;
  /**
   * @zh 标签是否可关闭
   * @en Whether the tag can be closed
   */
  closable?: boolean;
  /**
   * @zh 标签是否可选中
   * @en Whether the tag can be checked
   */
  checkable?: boolean;
  /**
   * @zh 标签是否选中（标签可选中时可用）
   * @en Whether the tag is checked (available when the tag is checkable)
   */
  checked?: boolean;
  /**
   * @zh 标签默认选中状态（标签可选中时可用）
   * @en Whether the tag is checked by default (available when the tag is checkable)
   */
  defaultChecked?: boolean;
  /**
   * @zh 标签内容不换行。已废弃，建议改用 ellipsis。
   * @en Tag content does not wrap. Deprecated, use ellipsis instead.
   */
  nowrap?: boolean;
  /**
   * @zh 是否开启默认内容省略
   * @en Whether to enable ellipsis for the default slot content
   * @defaultValue true
   */
  ellipsis?: boolean;
  /**
   * @zh 默认内容省略的最大显示行数
   * @en Maximum number of displayed lines for ellipsis content
   */
  ellipsisLineClamp?: number | string;
  /**
   * @zh 省略内容的展开触发方式
   * @en Trigger mode for ellipsis expansion
   * @values 'click'
   */
  ellipsisExpandTrigger?: 'click';
  /**
   * @zh 省略时是否展示提示。可传入 Tooltip 属性。
   * @en Whether to show a tooltip when ellipsis is active. Tooltip props are supported.
   * @defaultValue true
   */
  ellipsisTooltip?: boolean | EllipsisTooltipProps;
  /**
   * @zh 是否使用高性能省略实现
   * @en Whether to use the performant ellipsis implementation
   */
  ellipsisPerformant?: boolean;
  /**
   * @zh 自定义颜色的文字颜色，仅在自定义颜色时生效
   * @en Text color for custom color tags, only effective when using a custom color
   */
  textColor?: string;
  /**
   * @zh 自定义颜色的背景透明度，仅在自定义颜色时生效，默认 0.2
   * @en Background opacity for custom color tags, only effective when using a custom color, default 0.2
   */
  backgroundAlpha?: number;
}
