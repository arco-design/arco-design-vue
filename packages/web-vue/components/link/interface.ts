import type { Status } from '../_utils/constant';
import type { EllipsisTooltipProps } from '../ellipsis';

export interface LinkProps {
  /**
   * @zh 链接地址
   * @en Link address
   */
  href?: string;
  /**
   * @zh 链接的状态
   * @en Link status
   * @values 'normal','warning','success','danger'
   */
  status?: Status;
  /**
   * @zh 鼠标悬浮时存在底色
   * @en Whether to show background when hover
   * @version 2.7.0
   */
  hoverable?: boolean;
  /**
   * @zh 图标
   * @en icon
   * @version 2.7.0
   */
  icon?: boolean;
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
   * @zh 图标提示文案
   * @en Tooltip content for the icon
   */
  iconTooltip?: string;
  /**
   * @zh 链接是否为加载中状态
   * @en Whether the link is in the loading state
   * @version 2.37.0
   */
  loading?: boolean;
  /**
   * @zh 链接是否禁用
   * @en Whether the link is disabled
   */
  disabled?: boolean;
}
