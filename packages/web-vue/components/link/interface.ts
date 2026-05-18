import type { Status } from '../_utils/constant';

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
   * @en Whether to hide background when hover
   * @defaultValue true
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
