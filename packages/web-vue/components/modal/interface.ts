import { AppContext, CSSProperties } from 'vue';
import { ButtonProps } from '../button';
import { RenderContent } from '../_utils/types';

export interface ModalConfig {
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
   * @zh 页脚
   * @en Footer
   * @defaultValue true
   */
  footer?: boolean | RenderContent;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 确认按钮的内容
   * @en The content of the confirm button
   */
  okText?: string;
  /**
   * @zh 取消按钮的内容
   * @en The content of the cancel button
   */
  cancelText?: string;
  /**
   * @zh 确认按钮的Props
   * @en Props of confirm button
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的Props
   * @en Props of cancel button
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 确认按钮是否为加载中状态
   * @en Whether the confirm button is in the loading state
   */
  okLoading?: boolean;
  /**
   * @zh 是否隐藏取消按钮
   * @en Whether to hide the cancel button
   */
  hideCancel?: boolean;
  /**
   * @zh 是否显示遮罩层
   * @en Whether to show the mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh 是否开启简单模式
   * @en Whether to enable simple mode
   */
  simple?: boolean;
  /**
   * @zh 是否点击遮罩层可以关闭对话框
   * @en Whether to close the modal when click the mask
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 蒙层的样式
   * @en Mask style
   */
  maskStyle?: CSSProperties;
  /**
   * @zh 对话框是否居中显示
   * @en Whether the dialog box is displayed in the center
   * @defaultValue true
   */
  alignCenter?: boolean;
  /**
   * @zh 是否支持 ESC 键关闭对话框
   * @en Whether to support the ESC key to close the dialog
   * @defaultValue true
   * @version 2.15.0
   */
  escToClose?: boolean;
  /**
   * @zh 是否支持拖动
   * @en Whether to support drag
   * @version 2.19.0
   */
  draggable?: boolean;
  /**
   * @zh 是否开启全屏
   * @en Whether to enable full screen
   * @version 2.19.0
   */
  fullscreen?: boolean;
  /**
   * @zh 点击确定按钮的回调函数
   * @en Callback function for clicking the OK button
   */
  onOk?: (e?: Event) => void;
  /**
   * @zh 点击取消按钮的回调函数
   * @en Callback function for clicking the Cancel button
   */
  onCancel?: (e?: Event) => void;
  /**
   * @zh 触发 ok 事件前的回调函数。如果返回 false 则不会触发后续事件，也可使用 done 进行异步关闭。
   * @en The callback function before the ok event is triggered. If false is returned, subsequent events will not be triggered, and done can also be used to close asynchronously.
   * @version 2.7.0
   */
  onBeforeOk?: (
    done: (closed: boolean) => void
  ) => void | boolean | Promise<void | boolean>;
  /**
   * @zh 触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。
   * @en The callback function before the cancel event is triggered. If it returns false, no subsequent events will be triggered.
   * @version 2.7.0
   */
  onBeforeCancel?: () => boolean;
  /**
   * @zh 对话框打开后（动画结束）触发
   * @en Triggered after the modal is opened (the animation ends)
   */
  onOpen?: () => void;
  /**
   * @zh 对话框关闭后（动画结束）触发
   * @en Triggered after the modal is closed (the animation ends)
   */
  onClose?: () => void;
  /**
   * @zh 对话框打开前触发
   * @en Triggered before dialog is opened
   * @version 2.16.0
   */
  onBeforeOpen?: () => void;
  /**
   * @zh 对话框关闭前触发
   * @en Triggered before dialog is closed
   * @version 2.16.0
   */
  onBeforeClose?: () => void;
  /**
   * @zh 对话框的宽度，不设置的情况下会使用样式中的宽度值
   * @en The width of the dialog box, if not set, the width value in the style will be used
   * @version 2.12.0
   */
  width?: number | string;
  /**
   * @zh 对话框的距离顶部的高度，居中显示开启的情况下不生效
   * @en The height from the top of the dialog box. It does not take effect when the center display is turned on.
   * @version 2.12.0
   */
  top?: number | string;
  /**
   * @zh 标题的水平对齐方向
   * @en horizontal alignment of the title
   * @defaultValue 'center'
   * @version 2.17.0
   */
  titleAlign?: 'start' | 'center';
  /**
   * @zh 对话框是否挂载在 `body` 元素下
   * @en Whether the modal is mounted under the `body` element
   * @defaultValue true
   */
  renderToBody?: boolean;
  /**
   * @zh 弹出框的挂载容器
   * @en Mount container for modal
   * @defaultValue 'body'
   */
  popupContainer?: string | HTMLElement;
  /**
   * @zh 对话框的类名
   * @en The classname of the modal
   */
  modalClass?: string | any[];
  /**
   * @zh 对话框的样式
   * @en Modal style
   */
  modalStyle?: CSSProperties;
  /**
   * @zh 遮罩层动画名字
   * @en Mask layer animation name
   * @version 2.24.0
   */
  maskAnimationName?: string;
  /**
   * @zh 对话框动画名字
   * @en Modal animation name
   * @version 2.24.0
   */
  modalAnimationName?: string;
}

export type ModalUpdateConfig = Omit<
  ModalConfig,
  | 'title'
  | 'content'
  | 'footer'
  | 'onOk'
  | 'onCancel'
  | 'onBeforeOk'
  | 'onBeforeCancel'
  | 'onOpen'
  | 'onClose'
  | 'onBeforeOpen'
  | 'onBeforeClose'
>;

export interface ModalReturn {
  /**
   * @zh 关闭对话框
   * @en Close Modal
   */
  close: () => void;
  /**
   * @zh 更新对话框
   * @en Update Modal
   * @version 2.43.2
   */
  update: (config: ModalUpdateConfig) => void;
}

export interface ModalMethod {
  /**
   * @zh 打开对话框
   * @en Open modal
   */
  open: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
  /**
   * @zh 打开对话框（简单模式）
   * @en Open modal (simple mode)
   */
  confirm: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
  /**
   * @zh 打开信息对话框
   * @en Open info modal
   */
  info: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
  /**
   * @zh 打开成功对话框
   * @en Open success modal
   */
  success: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
  /**
   * @zh 打开警告对话框
   * @en Open warning modal
   */
  warning: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
  /**
   * @zh 打开错误对话框
   * @en Open error modal
   */
  error: (config: ModalConfig, appContext?: AppContext) => ModalReturn;
}
