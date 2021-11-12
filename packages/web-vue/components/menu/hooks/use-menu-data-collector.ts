import { ref, provide, inject, onMounted, onUnmounted, watch } from 'vue';
import { DataCollectorContext, DataCollectorInjectionKey } from '../context';

function union(arr1: string[], arr2: string[]) {
  return [...new Set([...arr1, ...arr2])];
}

function without(arr: string[], excludeValues: string[]) {
  return arr.filter((val) => !excludeValues.includes(val));
}

function update(arr: string[], arrCur: string[], arrPrev: string[]) {
  const newArr = without(arr, arrPrev);
  return union(newArr, arrCur);
}

export function useMenuDataCollectorProvider() {
  const subMenuKeys = ref<string[]>([]);
  const menuItemKeys = ref<string[]>([]);

  provide<DataCollectorContext>(DataCollectorInjectionKey, {
    collectSubMenuKey(key) {
      subMenuKeys.value = union(subMenuKeys.value, [key]);
    },
    removeSubMenuKey(key) {
      subMenuKeys.value = without(subMenuKeys.value, [key]);
    },
    updateSubMenuKeys(keys, prevKeys) {
      subMenuKeys.value = update(subMenuKeys.value, keys, prevKeys);
    },
    collectMenuItemKey(key) {
      menuItemKeys.value = union(menuItemKeys.value, [key]);
    },
    removeMenuItemKey(key) {
      menuItemKeys.value = without(menuItemKeys.value, [key]);
    },
    updateMenuItemKeys(keys, prevKeys) {
      menuItemKeys.value = update(menuItemKeys.value, keys, prevKeys);
    },
  });

  return {
    subMenuKeys,
    menuItemKeys,
  };
}

export function useMenuDataCollectorContext(): Partial<DataCollectorContext> {
  const menuContext = inject<DataCollectorContext>(DataCollectorInjectionKey);
  return menuContext || {};
}

export default function useMenuDataCollector({
  key,
  isRoot,
}: {
  key?: string;
  isRoot?: boolean;
}) {
  const { subMenuKeys, menuItemKeys } = useMenuDataCollectorProvider();

  if (!isRoot) {
    const {
      collectSubMenuKey,
      removeSubMenuKey,
      updateSubMenuKeys,
      updateMenuItemKeys,
    } = useMenuDataCollectorContext();

    watch(subMenuKeys, (curSubMenuKeys, prevSubMenuKeys) => {
      updateSubMenuKeys && updateSubMenuKeys(curSubMenuKeys, prevSubMenuKeys);
    });

    watch(menuItemKeys, (curMenuItemKeys, prevMenuItemKeys) => {
      updateMenuItemKeys &&
        updateMenuItemKeys(curMenuItemKeys, prevMenuItemKeys);
    });

    if (key !== undefined) {
      onMounted(() => {
        collectSubMenuKey && collectSubMenuKey(key);
      });

      onUnmounted(() => {
        removeSubMenuKey && removeSubMenuKey(key);
      });
    }
  }

  return {
    subMenuKeys,
    menuItemKeys,
  };
}
