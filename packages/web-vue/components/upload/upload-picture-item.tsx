import { computed, defineComponent, inject, PropType } from 'vue';
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
    const cls = computed(() => [
      itemCls,
      {
        [`${itemCls}-status-error`]: props.file.status === 'error',
      },
    ]);

    const uploadCtx = inject(uploadInjectionKey, undefined);

    const renderCard = () => {
      if (props.file.status === 'uploading') {
        return <UploadProgress file={props.file} listType="picture-card" />;
      }

      return (
        <>
          {uploadCtx?.slots.image?.({ fileItem: props.file }) ?? (
            <img
              src={props.file.url}
              alt={props.file.name}
              {...(uploadCtx?.imageLoading
                ? { loading: uploadCtx.imageLoading }
                : undefined)}
            />
          )}
          <div class={`${itemCls}-mask`}>
            {props.file.status === 'error' && uploadCtx?.showCancelButton && (
              <div class={`${itemCls}-error-tip`}>
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-error`]}
                >
                  {uploadCtx?.slots['error-icon']?.() ??
                    uploadCtx?.customIcon?.errorIcon?.() ?? <IconImageClose />}
                </span>
              </div>
            )}
            <div class={`${itemCls}-operation`}>
              {props.file.status !== 'error' && uploadCtx?.showPreviewButton && (
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-preview`]}
                  onClick={() => uploadCtx?.onPreview(props.file)}
                >
                  {uploadCtx?.slots['preview-icon']?.() ??
                    uploadCtx?.customIcon?.previewIcon?.() ?? <IconEye />}
                </span>
              )}
              {['init', 'error'].includes(props.file.status as string) &&
                uploadCtx?.showRetryButton && (
                  <span
                    class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-upload`]}
                    onClick={() => uploadCtx?.onUpload(props.file)}
                  >
                    {uploadCtx?.slots['retry-icon']?.() ??
                      uploadCtx?.customIcon?.retryIcon?.() ?? <IconUpload />}
                  </span>
                )}
              {!uploadCtx?.disabled && uploadCtx?.showRemoveButton && (
                <span
                  class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-remove`]}
                  onClick={() => uploadCtx?.onRemove(props.file)}
                >
                  {uploadCtx?.slots['remove-icon']?.() ??
                    uploadCtx?.customIcon?.removeIcon?.() ?? <IconDelete />}
                </span>
              )}
              {uploadCtx?.slots['extra-button']?.(props.file)}
            </div>
          </div>
        </>
      );
    };

    return () => <span class={cls.value}>{renderCard()}</span>;
  },
});
