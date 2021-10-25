import { defineComponent, inject, PropType } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import UploadProgress from './upload-progress';
import { FileItem } from './interfaces';
import { uploadInjectionKey } from './context';
import IconImageClose from '../icon/icon-image-close';
import IconEye from '../icon/icon-eye';
import IconUpload from '../icon/icon-upload';
import IconDelete from '../icon/icon-delete';

export default defineComponent({
  name: 'UploadPictureItem',
  props: {
    file: {
      type: Object as PropType<FileItem>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prefixCls = getPrefixCls('upload-list');
    const itemCls = `${prefixCls}-picture`;

    const uploadCtx = inject(uploadInjectionKey, undefined);

    const renderCard = () => {
      if (props.file.status === 'uploading') {
        return <UploadProgress file={props.file} listType="picture-card" />;
      }

      return (
        <>
          <img src={props.file.url} />
          <div class={`${itemCls}-mask`}>
            {props.file.status === 'error' && (
              <div class={`${itemCls}-error-tip`}>
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-error`]}
                >
                  {uploadCtx?.customIcon?.errorIcon?.() || <IconImageClose />}
                </span>
              </div>
            )}
            <div class={`${itemCls}-operation`}>
              {props.file.status !== 'error' && (
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-preview`]}
                  onClick={() => uploadCtx?.onPreview(props.file)}
                >
                  {uploadCtx?.customIcon?.previewIcon?.() || <IconEye />}
                </span>
              )}
              {['init', 'error'].includes(props.file.status as string) && (
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-upload`]}
                  onClick={() => uploadCtx?.onUpload(props.file)}
                >
                  {uploadCtx?.customIcon?.retryIcon?.() || <IconUpload />}
                </span>
              )}
              {!uploadCtx.disabled && (
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-remove`]}
                  onClick={() => uploadCtx?.onRemove(props.file)}
                >
                  {uploadCtx?.customIcon?.removeIcon?.() || <IconDelete />}
                </span>
              )}
            </div>
          </div>
        </>
      );
    };

    return () => <span class={itemCls}>{renderCard()}</span>;
  },
});
