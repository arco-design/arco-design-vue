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
        if (['png', 'jpg', 'jpeg', 'bmp', 'gif'].includes(extension)) {
          type = 'image';
        } else if (['mp4', 'm2v', 'mkv'].includes(extension)) {
          type = 'video';
        } else if (['mp3', 'wav', 'wmv'].includes(extension)) {
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
      <li class={[itemCls, `${itemCls}-${props.file.status}`]}>
        <span class={`${itemCls}-content`}>
          {uploadCtx?.listType === 'picture' && (
            <span class={`${itemCls}-thumbnail`}>
              <img src={props.file.url} />
            </span>
          )}
          {uploadCtx?.listType === 'text' && (
            <span class={`${itemCls}-file-icon`}>
              {uploadCtx?.customIcon?.fileIcon?.(props.file) ||
                renderFileIcon()}
            </span>
          )}
          <span class={`${itemCls}-name`}>
            {uploadCtx?.customIcon?.fileName?.(props.file) || props.file.url ? (
              <a class={`${itemCls}-name-link`} href={props.file.url}>
                {props.file.name}
              </a>
            ) : (
              <span class={`${itemCls}-name-text`}>{props.file.name}</span>
            )}
          </span>
          {props.file.status === 'error' && (
            <Tooltip content={t('upload.error')}>
              <span class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-error`]}>
                {uploadCtx?.customIcon?.errorIcon?.() || (
                  <IconExclamationCircleFill />
                )}
              </span>
            </Tooltip>
          )}
          <UploadProgress file={props.file} listType={props.listType} />
        </span>
        <span class={`${itemCls}-operation`}>
          <IconHover onClick={() => uploadCtx?.onRemove?.(props.file)}>
            <span class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-remove`]}>
              {uploadCtx?.customIcon?.removeIcon?.() || <IconDelete />}
            </span>
          </IconHover>
        </span>
      </li>
    );
  },
});
