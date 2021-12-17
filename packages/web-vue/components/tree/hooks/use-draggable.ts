import { ref, toRefs } from 'vue';
import { throttleByRaf } from '../../_utils/throttle-by-raf';
import { DropPosition, TreeNodeKey } from '../interface';
import useTreeContext from './use-tree-context';

export default function useDraggable(props: {
  key: TreeNodeKey;
  refTitle: HTMLElement | undefined;
}) {
  const { key, refTitle } = toRefs(props);
  const treeContext = useTreeContext();

  const isDragOver = ref(false);
  const isDragging = ref(false);
  const isAllowDrop = ref(false);
  const dropPosition = ref<DropPosition>(0);

  const updateDropPosition = throttleByRaf((e: DragEvent) => {
    if (!refTitle.value) return;

    const rect = refTitle.value.getBoundingClientRect();
    const offsetY = window.pageYOffset + rect.top;
    const { pageY } = e;
    const gapHeight = rect.height / 4;
    const diff = pageY - offsetY;

    dropPosition.value =
      diff < gapHeight ? -1 : diff < rect.height - gapHeight ? 0 : 1;
    isAllowDrop.value = treeContext.allowDrop
      ? treeContext.allowDrop(key.value, dropPosition.value)
      : true;
  });

  return {
    isDragOver,
    isDragging,
    isAllowDrop,
    dropPosition,
    setDragStatus(
      status: 'dragStart' | 'dragOver' | 'dragLeave' | 'dragEnd' | 'drop',
      e: DragEvent
    ) {
      switch (status) {
        case 'dragStart':
          isDragging.value = true;
          dropPosition.value = 0;
          treeContext.onDragStart && treeContext.onDragStart(key.value, e);
          break;
        case 'dragEnd':
          isDragging.value = false;
          isDragOver.value = false;
          dropPosition.value = 0;
          updateDropPosition.cancel();
          treeContext.onDragEnd && treeContext.onDragEnd(key.value, e);
          break;
        case 'dragOver':
          isDragOver.value = true;
          updateDropPosition(e);
          treeContext.onDragOver && treeContext.onDragOver(key.value, e);
          break;
        case 'dragLeave':
          isDragOver.value = false;
          dropPosition.value = 0;
          updateDropPosition.cancel();
          treeContext.onDragLeave && treeContext.onDragLeave(key.value, e);
          break;
        case 'drop':
          treeContext.onDrop &&
            treeContext.onDrop(key.value, dropPosition.value, e);
          isDragOver.value = false;
          dropPosition.value = 0;
          updateDropPosition.cancel();
          break;
        default:
          break;
      }
    },
  };
}
