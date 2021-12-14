import { CSSProperties } from 'vue';
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
   */
  footer?: RenderContent;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
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
  okButtonProps?: any;
  /**
   * @zh 取消按钮的Props
   * @en Props of cancel button
   */
  cancelButtonProps?: any;
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
   */
  alignCenter?: boolean;
  /**
   * @zh 点击确定按钮的回调函数
   * @en Callback function for clicking the OK button
   */
  onOk?: () => void;
  /**
   * @zh 点击取消按钮的回调函数
   * @en Callback function for clicking the Cancel button
   */
  onCancel?: () => void;
}

export interface ModalReturn {
  /**
   * @zh 关闭对话框
   * @en Close Modal
   */
  close: () => void;
}

export interface ModalMethod {
  /**
   * @zh 打开对话框
   * @en Open modal
   */
  open: (config: ModalConfig) => ModalReturn;
  /**
   * @zh 打开对话框（简单模式）
   * @en Open modal (simple mode)
   */
  confirm: (config: ModalConfig) => ModalReturn;
  /**
   * @zh 打开信息对话框
   * @en Open info modal
   */
  info: (config: ModalConfig) => ModalReturn;
  /**
   * @zh 打开成功对话框
   * @en Open success modal
   */
  success: (config: ModalConfig) => ModalReturn;
  /**
   * @zh 打开警告对话框
   * @en Open warning modal
   */
  warning: (config: ModalConfig) => ModalReturn;
  /**
   * @zh 打开错误对话框
   * @en Open error modal
   */
  error: (config: ModalConfig) => ModalReturn;
}
