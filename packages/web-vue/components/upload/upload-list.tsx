import { computed, defineComponent, PropType, TransitionGroup } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import UploadListItem from './upload-list-item';
import UploadPictureItem from './upload-picture-item';
import { FileItem, ListType } from './interfaces';

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
  },
  setup(props) {
    const prefixCls = getPrefixCls('upload');

    const cls = computed(() => [
      `${prefixCls}-list`,
      `${prefixCls}-list-type-${props.listType}`,
    ]);

    const renderItem = (fileItem: FileItem, index: number) => {
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
      <TransitionGroup tag="ul" class={cls.value}>
        {props.fileList.map((item, index) => renderItem(item, index))}
      </TransitionGroup>
    );
  },
});
