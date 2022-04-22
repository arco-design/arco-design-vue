import { AppContext, RenderFunction } from 'vue';
import { RenderContent } from '../_utils/types';
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
   * @zh 位置
   * @en Position
   * @type 'topLeft'|'topRight'|'bottomLeft'|'bottomRight'
   */
  position?: NotificationPosition;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * @zh 是否可关闭
   * @en Whether it can be closed
   */
  closable?: boolean;
  /**
   * @zh 显示的持续时间
   * @en Display duration
   * @default 3000
   */
  duration?: number;
  /**
   * @zh 底部内容
   * @en Footer Content
   * @version 2.25.0
   */
  footer?: RenderFunction;
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
  title?: RenderContent;
  icon?: RenderFunction;
  footer?: RenderFunction;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetOnUpdate?: boolean;
  onClose?: (id: number | string) => void;
}
