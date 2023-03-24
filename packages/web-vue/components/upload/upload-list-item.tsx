import { defineComponent, inject, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconHover from '../_components/icon-hover.vue';
import UploadProgress from './upload-progress';
import { FileItem, ListType } from './interfaces';
import Tooltip from '../tooltip';
import IconDelete from '../icon/icon-delete';
import IconFile from '../icon/icon-file';
import IconFilePdf from '../icon/icon-file-pdf';
import IconFileImage from '../icon/icon-file-image';
import IconFileVideo from '../icon/icon-file-video';
import IconFileAudio from '../icon/icon-file-audio';
import IconExclamationCircleFill from '../icon/icon-exclamation-circle-fill';
import { useI18n } from '../locale';
import { uploadInjectionKey } from './context';

export default defineComponent({
  name: 'UploadListItem',
  props: {
    file: {
      type: Object as PropType<FileItem>,
      required: true,
    },
    listType: {
      type: String as PropType<ListType>,
      required: true,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('upload-list');
    const itemCls = `${prefixCls}-item`;
    const { t } = useI18n();

    const uploadCtx = inject(uploadInjectionKey, undefined);

    const renderFileIcon = () => {
      let type = '';
      if (props.file.file && props.file.file.type) {
        type = props.file.file.type;
      } else {
        const extension = props.file.name?.split('.')[1] ?? '';
        if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'].includes(extension)) {
          type = 'image';
        } else if (['mp4', 'm2v', 'mkv', 'm4v', 'mov'].includes(extension)) {
          type = 'video';
        } else if (
          ['mp3', 'wav', 'wmv', 'm4a', 'acc', 'flac'].includes(extension)
        ) {
          type = 'audio';
        }
      }

      if (type.includes('image')) {
        return <IconFileImage />;
      }
      if (type.includes('pdf')) {
        return <IconFilePdf />;
      }
      if (type.includes('audio')) {
        return <IconFileAudio />;
      }
      if (type.includes('video')) {
        return <IconFileVideo />;
      }
      return <IconFile />;
    };

    return () => (
      <div class={[itemCls, `${itemCls}-${props.file.status}`]}>
        <div class={`${itemCls}-content`}>
          {uploadCtx?.listType === 'picture' && (
            <span class={`${itemCls}-thumbnail`}>
              {uploadCtx?.slots.image?.({ fileItem: props.file }) ?? (
                <img
                  src={props.file.url}
                  alt={props.file.name}
                  {...(uploadCtx?.imageLoading
                    ? { loading: uploadCtx.imageLoading }
                    : undefined)}
                />
              )}
            </span>
          )}
          <div class={`${itemCls}-name`}>
            {uploadCtx?.listType === 'text' && (
              <span class={`${itemCls}-file-icon`}>
                {uploadCtx?.slots['file-icon']?.({ fileItem: props.file }) ??
                  uploadCtx?.customIcon?.fileIcon?.(props.file) ??
                  renderFileIcon()}
              </span>
            )}
            {uploadCtx?.showLink && props.file.url ? (
              <a
                class={`${itemCls}-name-link`}
                target="_blank"
                href={props.file.url}
                {...(uploadCtx?.download
                  ? { download: props.file.name }
                  : undefined)}
              >
                {uploadCtx?.slots['file-name']?.({ fileItem: props.file }) ??
                  uploadCtx?.customIcon?.fileName?.(props.file) ??
                  props.file.name}
              </a>
            ) : (
              <span
                class={`${itemCls}-name-text`}
                onClick={() => uploadCtx?.onPreview(props.file)}
              >
                {uploadCtx?.slots['file-name']?.({ fileItem: props.file }) ??
                  uploadCtx?.customIcon?.fileName?.(props.file) ??
                  props.file.name}
              </span>
            )}
            {props.file.status === 'error' && (
              <Tooltip content={t('upload.error')}>
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-error`]}
                >
                  {uploadCtx?.slots['error-icon']?.() ??
                    uploadCtx?.customIcon?.errorIcon?.() ?? (
                      <IconExclamationCircleFill />
                    )}
                </span>
              </Tooltip>
            )}
          </div>
          <UploadProgress file={props.file} listType={props.listType} />
        </div>
        {uploadCtx?.showRemoveButton && (
          <span class={`${itemCls}-operation`}>
            <IconHover
              // @ts-ignore
              onClick={() => uploadCtx?.onRemove?.(props.file)}
            >
              <span
                class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-remove`]}
              >
                {uploadCtx?.slots['remove-icon']?.() ??
                  uploadCtx?.customIcon?.removeIcon?.() ?? <IconDelete />}
              </span>
            </IconHover>
          </span>
        )}
        {uploadCtx?.slots['extra-button']?.({ fileItem: props.file })}
      </div>
    );
  },
});
