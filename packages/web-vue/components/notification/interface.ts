import { AppContext, CSSProperties, RenderFunction } from 'vue';
import { ClassName, RenderContent } from '../_utils/types';
import { MessageType } from '../_utils/constant';

export const NOTIFICATION_POSITION = [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
] as const;

export type NotificationPosition = typeof NOTIFICATION_POSITION[number];

export interface NotificationMethod {
  /**
   * @zh 显示信息提醒框
   * @en Show info notification
   */
  info: (
    config: string | NotificationConfig,
    appContext?: AppContext
  ) => NotificationReturn;
  /**
   * @zh 显示成功提醒框
   * @en Show success notification
   */
  success: (
    config: string | NotificationConfig,
    appContext?: AppContext
  ) => NotificationReturn;
  /**
   * @zh 显示警告提醒框
   * @en Show warning notification
   */
  warning: (
    config: string | NotificationConfig,
    appContext?: AppContext
  ) => NotificationReturn;
  /**
   * @zh 显示错误提醒框
   * @en Show error notification
   */
  error: (
    config: string | NotificationConfig,
    appContext?: AppContext
  ) => NotificationReturn;
  /**
   * @zh 清除对应 `id` 的提醒框
   * @en remove the notification for the corresponding `id`
   */
  remove: (id: string) => void;
  /**
   * @zh 清除全部提醒框
   * @en Clear all notifications
   */
  clear: (position?: NotificationPosition) => void;
}

export interface NotificationConfig {
  /**
   * @zh 内容
   * @en Content
   */
  content: RenderContent;
  /**
   * @zh 标题
   * @en Title
   */
  title?: RenderContent;
  /**
   * @zh 图标
   * @en Icon
   */
  icon?: RenderFunction;
  /**
   * @zh 唯一id
   * @en Unique id
   */
  id?: string;
  /**
   * @zh 样式
   * @en Style
   */
  style?: CSSProperties;
  /**
   * @zh 样式类名
   * @en Style class name
   */
  class?: ClassName;
  /**
   * @zh 位置
   * @en Position
   * @type 'topLeft'|'topRight'|'bottomLeft'|'bottomRight'
   */
  position?: NotificationPosition;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 是否可关闭
   * @en Whether it can be closed
   * @defaultValue false
   */
  closable?: boolean;
  /**
   * @zh 显示的持续时间，单位为 `ms`
   * @en Display duration, the unit is `ms`
   * @defaultValue 3000
   */
  duration?: number;
  /**
   * @zh 底部内容
   * @en Footer Content
   * @version 2.25.0
   */
  footer?: RenderFunction;
  /**
   * @zh 关闭按钮图标
   * @en Close button icon
   */
  closeIcon?: RenderFunction;
  /**
   * @zh 关闭按钮元素
   * @en Close button element
   */
  closeIconElement?: RenderFunction;
  /**
   * @zh 关闭时的回调函数
   * @en Callback function when closing
   * @param id
   */
  onClose?: (id: number | string) => void;
}

export interface NotificationReturn {
  /**
   * @zh 关闭当前通知提醒框
   * @en Close the current notification
   */
  close: () => void;
}

export interface NotificationItem {
  id: number | string;
  type: MessageType;
  content: RenderContent;
  style?: CSSProperties;
  class?: ClassName;
  title?: RenderContent;
  icon?: RenderFunction;
  footer?: RenderFunction;
  closeIcon?: RenderFunction;
  closeIconElement?: RenderFunction;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetOnUpdate?: boolean;
  onClose?: (id: number | string) => void;
}
