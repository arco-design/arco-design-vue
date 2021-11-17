import {
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  computed,
  Ref,
  watchEffect,
} from 'vue';

const BASE_Z_INDEX = 1000;
const Z_INDEX_STEP = 1;

class PopupManager {
  zIndex = 0;

  popupStack: Set<string> = new Set();

  instanceMap: Map<string, ComponentInternalInstance> = new Map();

  getInstance(id: string) {
    return this.instanceMap.get(id);
  }

  registerInstance(id: string, instance: ComponentInternalInstance | null) {
    if (!instance) return;
    this.instanceMap.set(id, instance);
  }

  deregisterInstance(id: string) {
    this.instanceMap.delete(id);
  }

  nextZIndex() {
    if (!this.zIndex) {
      this.zIndex = BASE_Z_INDEX;
    } else {
      this.zIndex += Z_INDEX_STEP;
    }
    return this.zIndex;
  }

  open(id: string) {
    this.popupStack.add(id);
  }

  close(id: string) {
    this.popupStack.delete(id);
  }
}

let popupManager: PopupManager;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default function usePopupManager(visible?: Ref<boolean>) {
  const id = generateId();
  const _zIndex = ref<number>();

  if (!popupManager) {
    popupManager = new PopupManager();
  }

  const zIndex = computed(() => {
    return _zIndex.value || 0;
  });

  const nextZIndex = () => {
    _zIndex.value = popupManager.nextZIndex();
    return _zIndex.value;
  };

  onMounted(() => {
    const instance = getCurrentInstance();
    popupManager.registerInstance(id, instance);
  });

  onUnmounted(() => {
    popupManager.deregisterInstance(id);
  });

  const open = () => {
    popupManager.open(id);
    _zIndex.value = nextZIndex();
  };

  const close = () => {
    popupManager.close(id);
  };

  if (visible) {
    watchEffect(() => {
      if (visible.value) {
        open();
      } else {
        close();
      }
    });
  }

  return {
    id,
    zIndex,
    nextZIndex,
    close,
    open,
  };
}
