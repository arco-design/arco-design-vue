import { reactive, ref, Ref } from 'vue';
import { off, on } from '../../_utils/dom';
import { EmitFn2 } from '../../_utils/types';

export const useColumnResize = (
  thRefs: Ref<Record<string, HTMLElement>>,
  emit: EmitFn2<{ columnResize: (dataIndex: string, width: number) => true }>
) => {
  const resizingColumn = ref('');
  const columnWidth = reactive<Record<string, number>>({});

  const handleThMouseDown = (dataIndex: string, ev: MouseEvent) => {
    ev.preventDefault();

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
    const element = thRefs.value[resizingColumn.value];
    if (element) {
      const { clientX } = ev;
      const { x } = element.getBoundingClientRect();
      let width = Math.ceil(clientX - x);
      if (width < 40) {
        width = 40;
      }
      columnWidth[resizingColumn.value] = width;
      emit('columnResize', resizingColumn.value, width);
    }
  };

  return {
    resizingColumn,
    columnWidth,
    handleThMouseDown,
    handleThMouseUp,
  };
};
