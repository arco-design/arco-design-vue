import { AppContext, RenderFunction } from 'vue';
import { RenderContent } from '../_utils/types';
import { MessageType } from '../_utils/constant';

export const MESSAGE_POSITION = ['top', 'bottom'] as const;

export type MessagePosition = typeof MESSAGE_POSITION[number];

export interface MessageMethod {
  /**
   * @zh 显示信息提示
   * @en Show info message
   */
  info: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 显示成功提示
   * @en Show success message
   */
  success: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 显示警告提示
   * @en Show warning message
   */
  warning: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 显示错误提示
   * @en Show error message
   */
  error: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 显示加载中提示
   * @en Show loading message
   */
  loading: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 显示提示
   * @en Show message
   * @version 2.41.0
   */
  normal: (
    config: string | MessageConfig,
    appContext?: AppContext
  ) => MessageReturn;
  /**
   * @zh 清空全部提示
   * @en Clear all messages
   */
  clear: (position?: MessagePosition) => void;
}

export interface MessageConfig {
  /**
   * @zh 内容
   * @en Content
   */
  content: RenderContent;
  /**
   * @zh 唯一id
   * @en Unique id
   */
  id?: string;
  /**
   * @zh 消息的图标
   * @en Message icon
   */
  icon?: RenderFunction;
  /**
   * @zh 消息的位置
   * @en Location of the message
   * @type 'top'|'bottom'
   */
  position?: MessagePosition;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   */
  showIcon?: boolean;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
   */
  closable?: boolean;
  /**
   * @zh 消息显示的持续时间
   * @en The duration of the message display
   */
  duration?: number;
  /**
   * @zh 关闭时的回调函数
   * @en Callback function when closing
   * @param id
   */
  onClose?: (id: number | string) => void;
  /**
   * @zh 设置鼠标移入后不会自动关闭
   * @en The mouse to move into the component will not automatically close
   * @version 2.39.0
   */
  resetOnHover?: boolean;
}

export interface MessageReturn {
  /**
   * @zh 关闭当前消息
   * @en Close current message
   */
  close: () => void;
}

export interface MessageItem {
  id: number | string;
  content: RenderContent;
  type?: MessageType | 'loading' | 'normal';
  icon?: RenderFunction;
  showIcon?: boolean;
  closable?: boolean;
  duration?: number;
  resetOnUpdate?: boolean;
  onClose?: (id: number | string) => void;
  resetOnHover?: boolean;
}
