import { Slot } from 'vue';

export interface ImageProps {
  src?: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  description?: string;
  alt?: string;
  hideFooter: boolean;
  footerPosition: 'inner' | 'outer';
  showLoader: boolean;
  preview: boolean;
  previewVisible?: boolean;
  defaultPreviewVisible: boolean;
  previewProps?: Partial<ImagePreviewProps>;
  extra?: Slot;
  error?: Slot;
  loader?: Slot;
  onPreviewVisibleChange?: (visible: boolean) => void;
}

export interface ImagePreviewProps {
  src?: string;
  visible?: boolean;
  defaultVisible: boolean;
  maskClosable: boolean;
  closable: boolean;
  actionsLayout: string[];
  popupContainer?: HTMLElement | string;
  onClose?: () => void;
}

export interface ImagePreviewGroupProps
  extends Omit<ImagePreviewProps, 'src' | 'onClose'> {
  srcList?: string[];
  current?: number;
  defaultCurrent: number;
  infinite: boolean;
  onChange?: (index: number, preIndex: number) => void;
  onPreviewVisibleChange?: (visible: boolean) => void;
}
