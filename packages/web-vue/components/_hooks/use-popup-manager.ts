import type { Ref } from 'vue';
import {
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';

export type PopupType = 'popup' | 'dialog' | 'message';

const POPUP_BASE_Z_INDEX = 1000;
const MESSAGE_BASE_Z_INDEX = 5000;
const Z_INDEX_STEP = 1;

class PopupManager {
  private popupStack = {
    popup: new Set<number>(),
    dialog: new Set<number>(),
    message: new Set<number>(),
  };

  private getNextZIndex = (type: PopupType) => {
    if (type === 'message') {
      return MESSAGE_BASE_Z_INDEX + this.popupStack.message.size * Z_INDEX_STEP;
    }
    return POPUP_BASE_Z_INDEX + this.popupStack.popup.size * Z_INDEX_STEP;
  };

  public add = (id: number, type: PopupType) => {
    this.popupStack[type].add(id);
    if (type === 'dialog') {
      this.popupStack.popup.add(id);
    }
    return this.getNextZIndex(type);
  };

  public delete = (id: number, type: PopupType) => {
    this.popupStack[type].delete(id);
    if (type === 'dialog') {
      this.popupStack.popup.delete(id);
    }
  };

  public isLastDialog = (id: number) => {
    if (this.popupStack.dialog.size > 1) {
      const array = Array.from(this.popupStack.dialog);
      return id === array[array.length - 1];
    }
    return true;
  };
}

const popupManager = new PopupManager();

export default function usePopupManager(
  type: PopupType,
  {
    visible,
    runOnMounted,
  }: {
    visible?: Ref<boolean>;
    runOnMounted?: boolean;
  } = {}
) {
  const id = getCurrentInstance()?.uid ?? Date.now();
  const zIndex = ref(0);

  const open = () => {
    zIndex.value = popupManager.add(id, type);
  };

  const close = () => {
    popupManager.delete(id, type);
  };

  const isLastDialog = () => {
    if (type === 'dialog') {
      return popupManager.isLastDialog(id);
    }
    return false;
  };

  watch(
    () => visible?.value,
    (visible) => {
      if (visible) {
        open();
      } else {
        close();
      }
    },
    {
      immediate: true,
    }
  );

  if (runOnMounted) {
    onMounted(() => {
      open();
    });

    onBeforeUnmount(() => {
      close();
    });
  }

  return {
    id,
    zIndex,
    open,
    close,
    isLastDialog,
  };
}
