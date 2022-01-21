import { reactive, ref, Ref } from 'vue';
import { off, on } from '../../_utils/dom';

export const useColumnResize = (
  thRefs: Ref<{
    operation: HTMLElement[];
    data: Record<string, HTMLElement>;
  }>
) => {
  const resizingColumn = ref('');
  const columnWidth = reactive<Record<string, number>>({});

  const handleThMouseDown = (e: MouseEvent, dataIndex: string) => {
    e.preventDefault();

    resizingColumn.value = dataIndex;
    on(window, 'mousemove', handleThMouseMoving);
    on(window, 'mouseup', handleThMouseUp);
    on(window, 'contextmenu', handleThMouseUp);
  };

  const handleThMouseUp = () => {
    resizingColumn.value = '';
    off(window, 'mousemove', handleThMouseMoving);
    off(window, 'mouseup', handleThMouseUp);
    off(window, 'contextmenu', handleThMouseUp);
  };

  const handleThMouseMoving = (ev: MouseEvent) => {
    const element = thRefs.value.data[resizingColumn.value];
    if (element) {
      const { clientX } = ev;
      const { x } = element.getBoundingClientRect();
      let width = Math.ceil(clientX - x);
      if (width < 40) {
        width = 40;
      }
      columnWidth[resizingColumn.value] = width;
    }
  };

  return {
    resizingColumn,
    columnWidth,
    handleThMouseDown,
    handleThMouseUp,
  };
};
