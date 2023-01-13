import type { InjectionKey, Slots } from 'vue';
import { CustomIcon, FileItem, ListType } from './interfaces';

export interface UploadContext {
  listType?: ListType;
  disabled?: boolean;
  iconCls?: string;
  customIcon?: CustomIcon;
  showRemoveButton?: boolean;
  showRetryButton?: boolean;
  showCancelButton?: boolean;
  showPreviewButton?: boolean;
  showLink?: boolean;
  imageLoading?: 'eager' | 'lazy';
  download?: boolean;
  slots: Slots;
  onRemove: (fileItem: FileItem) => void;
  onAbort: (fileItem: FileItem) => void;
  onUpload: (fileItem: FileItem) => void;
  onPreview: (fileItem: FileItem) => void;
}

export const uploadInjectionKey: InjectionKey<UploadContext> =
  Symbol('ArcoUpload');
