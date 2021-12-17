import { computed, defineComponent, PropType, TransitionGroup } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import UploadListItem from './upload-list-item';
import UploadPictureItem from './upload-picture-item';
import { FileItem, ListType } from './interfaces';
import { isFunction } from '../_utils/is';
import { uploadInjectionKey } from './context';

export default defineComponent({
  name: 'UploadList',
  components: {
    UploadListItem,
    UploadPictureItem,
  },
  props: {
    fileList: {
      type: Array as PropType<FileItem[]>,
      required: true,
    },
    listType: {
      type: String as PropType<ListType>,
      required: true,
    },
    isMax: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('upload');

    const cls = computed(() => [
      `${prefixCls}-list`,
      `${prefixCls}-list-type-${props.listType}`,
    ]);

    const uploadCtx = inject(uploadInjectionKey, undefined);

    const renderItem = (fileItem: FileItem, index: number) => {
      if (isFunction(slots['upload-item'])) {
        return slots['upload-item']({ fileItem, index });
      }

      if (props.listType === 'picture-card') {
        return <UploadPictureItem file={fileItem} key={`item-${index}`} />;
      }
      return (
        <UploadListItem
          file={fileItem}
          listType={props.listType}
          key={`item-${index}`}
        />
      );
    };

    return () => (
      <TransitionGroup tag="div" class={cls.value}>
        {props.fileList.map((item, index) => renderItem(item, index))}
        {props.listType === 'picture-card' && !props.isMax && uploadCtx?.showUploadButton && slots['upload-button']?.()}
      </TransitionGroup>
    );
  },
});
