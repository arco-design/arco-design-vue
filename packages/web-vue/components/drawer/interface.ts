import { AppContext, CSSProperties } from 'vue';
import { ButtonProps } from '../button';
import { RenderContent } from '../_utils/types';

export interface DrawerConfig {
  /**
   * @zh 抽屉放置的位置
   * @en Where the drawer is placed
   * @values 'top','right','bottom','left'
   * @defaultValue 'right'
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @zh 标题
   * @en Title
   */
  title?: RenderContent;
  /**
   * @zh 内容
   * @en Content
   */
  content: RenderContent;
  /**
   * @zh 是否显示遮罩层
   * @en Whether to show the mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh 点击遮罩层是否可以关闭
   * @en Click on the mask layer to be able to close
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 是否展示关闭按钮
   * @en Whether to show the close button
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 确认按钮的内容
   * @en The content of the ok button
   */
  okText?: string;
  /**
   * @zh 取消按钮的内容
   * @en The content of the cancel button
   */
  cancelText?: string;
  /**
   * @zh 确认按钮是否为加载中状态
   * @en Whether the ok button is in the loading state
   * @defaultValue false
   */
  okLoading?: boolean;
  /**
   * @zh 确认按钮的Props
   * @en Props of confirm button
   * @version 2.9.0
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的Props
   * @en Props of cancel button
   * @version 2.9.0
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 抽屉的宽度（仅在placement为right,left时可用）
   * @en The width of the drawer (only available when placement is right, left)
   * @defaultValue 250
   */
  width?: number | string;
  /**
   * @zh 抽屉的高度（仅在placement为top,bottom时可用）
   * @en The height of the drawer (only available when placement is top, bottom)
   * @defaultValue 250
   */
  height?: number | string;
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for popup
   * @defaultValue 'body'
   */
  popupContainer?: string | HTMLElement;
  /**
   * @zh 抽屉的样式
   * @en Drawer style
   */
  drawerStyle?: CSSProperties;
  /**
   * @zh 点击确定按钮时触发
   * @en Triggered when the OK button is clicked
   */
  onOk?: (e?: Event) => void;
  /**
   * @zh 点击取消、关闭按钮时触发
   * @en Triggered when the cancel or close button is clicked
   */
  onCancel?: (e?: Event) => void;
  /**
   * @zh 触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。
   * @en The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.
   */
  onBeforeOk?: (
    done: (closed: boolean) => void
  ) => void | boolean | Promise<void | boolean>;
  /**
   * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
   * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
   */
  onBeforeCancel?: () => boolean;
  /**
   * @zh 抽屉打开后（动画结束）触发
   * @en Triggered after the drawer is opened (the animation ends)
   */
  onOpen?: () => void;
  /**
   * @zh 抽屉关闭后（动画结束）触发
   * @en Triggered when the drawer is closed (the animation ends)
   */
  onClose?: () => void;
  /**
   * @zh 抽屉打开前触发
   * @en Triggered before drawer is opened
   * @version 2.43.0
   */
  onBeforeOpen?: () => void;
  /**
   * @zh 抽屉关闭前触发
   * @en Triggered before drawer is closed
   * @version 2.43.0
   */
  onBeforeClose?: () => void;
  /**
   * @zh 是否支持 ESC 键关闭抽屉
   * @en Whether to support the ESC key to close the drawer
   * @version 2.15.0
   * @defaultValue true
   */
  escToClose?: boolean;
  /**
   * @zh 是否展示头部内容
   * @en Whether to display high-quality content
   * @version 2.33.0
   * @defaultValue true
   */
  header?: boolean | RenderContent;
  /**
   * @zh 是否展示底部内容
   * @en Whether to display the bottom content
   * @version 2.11.0
   * @defaultValue true
   */
  footer?: boolean | RenderContent;
  /**
   * @zh 是否隐藏取消按钮
   * @en Whether to hide the cancel button
   * @version 2.19.0
   * @defaultValue false
   */
  hideCancel?: boolean;
}

export type DrawerUpdateConfig = Omit<
  DrawerConfig,
  | 'title'
  | 'content'
  | 'onOk'
  | 'onCancel'
  | 'onBeforeOk'
  | 'onBeforeCancel'
  | 'onOpen'
  | 'onClose'
  | 'onBeforeOpen'
  | 'onBeforeClose'
  | 'header'
  | 'footer'
>;

export interface DrawerReturn {
  /**
   * @zh 关闭抽屉
   * @en Close Drawer
   */
  close: () => void;
  /**
   * @zh 更新抽屉
   * @en Update Drawer
   * @version 2.43.2
   */
  update: (config: DrawerUpdateConfig) => void;
}

export interface DrawerMethod {
  /**
   * @zh 打开抽屉
   * @en Open drawer
   */
  open: (config: DrawerConfig, appContext?: AppContext) => DrawerReturn;
}
