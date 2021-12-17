import type { InjectionKey } from 'vue';
import { CustomIcon, FileItem } from './interfaces';

export interface UploadContext {
  listType?: string;
  disabled?: boolean;
  iconCls?: string;
  customIcon?: CustomIcon;
  showRemoveButton?: boolean;
  showRetryButton?: boolean;
  showCancelButton?: boolean;
  imageLoading?: 'eager' | 'lazy';
  download?: boolean;
  onRemove: (fileItem: FileItem) => void;
  onAbort: (fileItem: FileItem) => void;
  onUpload: (fileItem: FileItem) => void;
  onPreview: (fileItem: FileItem) => void;
}

export const uploadInjectionKey: InjectionKey<UploadContext> =
  Symbol('ArcoUpload');
