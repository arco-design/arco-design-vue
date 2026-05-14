import { computed, reactive, Ref } from 'vue';

import { tryOnScopeDispose, useEventListener } from '@vueuse/core';

import { TableDraggable } from '../interface';

export const useDrag = (draggable: Ref<TableDraggable | undefined>) => {
  const dragType = computed(() => {
    if (draggable.value) {
      if (draggable.value.type === 'handle') {
        return 'handle';
      }
      return 'row';
    }
    return undefined;
  });

  const dragState = reactive({
    dragging: false,
    sourceKey: '',
    sourcePath: [] as number[],
    targetPath: [] as number[],
    data: {} as Record<string, unknown>,
    dropIndicatorPath: [] as number[],
  });

  const clearDragState = () => {
    dragState.dragging = false;
    dragState.sourceKey = '';
    dragState.sourcePath = [];
    dragState.targetPath = [];
    dragState.data = {};
    dragState.dropIndicatorPath = [];
  };

  const stopGlobalDragListeners = [
    useEventListener(typeof window !== 'undefined' ? window : undefined, 'dragend', () => {
      clearDragState();
    }),
    useEventListener(typeof window !== 'undefined' ? window : undefined, 'drop', () => {
      clearDragState();
    }),
  ];

  tryOnScopeDispose(() => {
    stopGlobalDragListeners.forEach((stop) => stop());
  });

  const handleDragStart = (
    ev: DragEvent,
    sourceKey: string,
    sourcePath: number[],
    data: Record<string, unknown>,
  ) => {
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      if (ev.target && (ev.target as HTMLElement).tagName === 'TD') {
        const { parentElement } = ev.target as HTMLElement;
        if (parentElement && parentElement.tagName === 'TR') {
          ev.dataTransfer.setDragImage(parentElement, 0, 0);
        }
      }
    }
    dragState.dragging = true;
    dragState.sourceKey = sourceKey;
    dragState.sourcePath = sourcePath;
    dragState.targetPath = [...sourcePath];
    dragState.data = data;
  };

  const handleDragEnter = (ev: DragEvent, targetPath: number[]) => {
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    // prevent unnecessary data update, which will cause the table to re-render
    if (dragState.targetPath.toString() !== targetPath.toString()) {
      // drag row to another row
      dragState.targetPath = targetPath;
      // Update the drop indicator position
      dragState.dropIndicatorPath = targetPath;
    }
    ev.preventDefault();
  };

  const handleDragLeave = (_ev: DragEvent) => {};

  const handleDragover = (ev: DragEvent) => {
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    ev.preventDefault();
  };

  const handleDragEnd = (ev: DragEvent) => {
    if (ev.dataTransfer?.dropEffect === 'none') {
      clearDragState();
    }
  };

  const handleDrop = (ev: DragEvent) => {
    clearDragState();
    ev.preventDefault();
  };

  return {
    dragType,
    dragState,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragover,
    handleDragEnd,
    handleDrop,
  };
};
