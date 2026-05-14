import { reactive, ref, Ref } from 'vue';

import { tryOnScopeDispose, useEventListener } from '@vueuse/core';

import { EmitFn2 } from '../../_utils/types';

export const useColumnResize = (
  thRefs: Ref<Record<string, HTMLElement>>,
  emit: EmitFn2<{ columnResize: (dataIndex: string, width: number) => true }>,
  getColExplicitWidth?: (dataIndex: string) => number | undefined,
) => {
  const resizingColumn = ref('');
  const columnWidth = reactive<Record<string, number>>({});
  let stopResizeListeners: Array<() => void> = [];

  const clearResizeListeners = () => {
    stopResizeListeners.forEach((stop) => stop());
    stopResizeListeners = [];
  };

  const resetBodyResizeStyle = () => {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  tryOnScopeDispose(() => {
    clearResizeListeners();
    resetBodyResizeStyle();
  });

  const handleThMouseDown = (dataIndex: string, ev: PointerEvent) => {
    if (typeof document === 'undefined') {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();

    resizingColumn.value = dataIndex;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const element = thRefs.value[dataIndex];
    const rect = element?.getBoundingClientRect();
    const startX = ev.clientX;
    const explicitWidth = columnWidth[dataIndex] ?? getColExplicitWidth?.(dataIndex);
    const startWidth = explicitWidth ?? rect?.width ?? 0;
    const renderWidth = rect?.width ?? startWidth;

    // Calculate the stretch ratio from `table-layout: fixed`.
    const scale = renderWidth > 0 && startWidth > 0 ? renderWidth / startWidth : 1;

    const target = ev.target as HTMLElement;
    if (target && 'setPointerCapture' in target) {
      target.setPointerCapture(ev.pointerId);
    }

    const onPointerMove = (e: PointerEvent) => {
      const element = thRefs.value[resizingColumn.value];
      if (!element) return;

      const { clientX } = e;
      // Convert visual mouse movement into explicit CSS width movement
      const deltaX = (clientX - startX) / (scale || 1);
      const rawWidth = startWidth + deltaX;
      let width = Math.ceil(rawWidth);
      if (width < 40) width = 40;

      columnWidth[resizingColumn.value] = width;
      emit('columnResize', resizingColumn.value, width);
    };

    const onPointerUp = () => {
      resizingColumn.value = '';
      resetBodyResizeStyle();
      clearResizeListeners();
    };

    clearResizeListeners();
    stopResizeListeners = [
      useEventListener(document, 'pointermove', onPointerMove),
      useEventListener(document, 'pointerup', onPointerUp),
      useEventListener(document, 'contextmenu', onPointerUp),
    ];
  };

  return {
    resizingColumn,
    columnWidth,
    handleThMouseDown,
  };
};
