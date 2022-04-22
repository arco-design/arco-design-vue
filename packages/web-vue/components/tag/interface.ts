export const TAG_COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
] as const;

export type TagColor = typeof TAG_COLORS[number];

export interface TagProps {
  /**
   * @zh 标签的颜色
   * @en Label color
   */
  color?: TagColor | string;
  /**
   * @zh 标签的大小
   * @en Label size
   */
  size?: 'small' | 'medium' | 'large';
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
}
