/* eslint-disable no-use-before-define */
import { Slot } from 'vue';

export interface ImageProps {
  /** 图片获取地址 */
  src?: string;
  /** 图片显示宽度 */
  width?: string | number;
  /** 图片显示高度 */
  height?: string | number;
  /** 标题 */
  title?: string;
  /** 描述，同 alt */
  description?: string;
  alt?: string;
  /** 不显示底部 */
  hideFooter: boolean;
  /** 底部显示的位置 */
  footerPosition: 'inner' | 'outer';
  /** 是否显示加载效果 */
  showLoader: boolean;
  /** 是否开启预览 */
  preview: boolean;
  /** 控制预览的打开状态，可与 previewVisibleChange 配合使用 */
  previewVisible?: boolean;
  /** 预览的默认打开状态 */
  defaultPreviewVisible: boolean;
  /** 预览的配置项 （所有选项都是可选的） [ImagePreviewProps](#imagepreview) */
  previewProps?: Partial<ImagePreviewProps>;

  // slots
  /** 额外的底部内容 */
  extra?: Slot;
  /** 自定义错误状态下的显示内容 */
  error?: Slot;
  /** 自定义 loader */
  loader?: Slot;

  // events
  /** 预览的打开和关闭事件 */
  onPreviewVisibleChange?: (visible: boolean) => void;
}

export interface ImagePreviewProps {
  /** 图片获取地址 */
  src?: string;
  /** 是否可见，受控属性 */
  visible?: boolean;
  /** 默认是否可见，非受控 */
  defaultVisible: boolean;
  /** 触发 toolbar 切换为 simple 模式的宽度 */
  // breakPoint?: number;
  /** 点击 mask 是否触发关闭 */
  maskClosable: boolean;
  /** 是否显示关闭按钮 */
  closable: boolean;
  /** 控制条的布局 */
  actionsLayout: string[];
  /** 设置弹出框的挂载点，默认是 document.body */
  popupContainer?: HTMLElement | string;

  // events
  /** 关闭事件 */
  onClose?: () => void;
}

export interface ImagePreviewGroupProps
  extends Omit<ImagePreviewProps, 'src' | 'onClose'> {
  /** 图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息） */
  srcList?: string[];
  /** 当前展示的图片的下标 */
  current?: number;
  /** 第一张展示的图片的下标 */
  defaultCurrent: number;
  /** 是否无限循环 */
  infinite: boolean;

  // events
  /** 切换图片触发的事件 */
  onChange?: (index: number, preIndex: number) => void;
  /** 预览的打开和关闭事件 */
  onPreviewVisibleChange?: (visible: boolean) => void;
}
