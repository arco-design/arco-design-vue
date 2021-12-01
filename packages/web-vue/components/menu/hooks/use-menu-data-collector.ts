import { ref, provide, inject, computed, onMounted, onUnmounted } from 'vue';
import { DataCollectorContext, DataCollectorInjectionKey } from '../context';
import { MenuData, MenuDataItem } from '../interface';

function getKeys(data: MenuData, condition: (item: MenuDataItem) => boolean) {
  const keys: string[] = [];

  const loop = (list: MenuData) => {
    list.forEach((item) => {
      if (condition(item)) {
        keys.push(item.key);
      }
      if (item.children) {
        loop(item.children);
      }
    });
  };

  loop(data);

  return keys;
}

export function useMenuDataCollectorProvider() {
  const data = ref<MenuData>([]);
  const subMenuKeys = computed(() =>
    getKeys(data.value, (item) => !!item.children)
  );
  const menuItemKeys = computed(() =>
    getKeys(data.value, (item) => !item.children)
  );

  provide(DataCollectorInjectionKey, {
    collectSubMenu(key, children) {
      data.value = [
        ...data.value,
        {
          key,
          children,
        },
      ];
    },
    removeSubMenu(key) {
      data.value = data.value.filter((item) => item.key !== key);
    },
    collectMenuItem(key) {
      data.value.push({ key });
    },
    removeMenuItem(key) {
      data.value = data.value.filter((item) => item.key !== key);
    },
    reportMenuData(reportData) {
      data.value = reportData;
    },
  });

  return {
    data,
    subMenuKeys,
    menuItemKeys,
  };
}

export function useMenuDataCollectorContext(
  isRoot = false
): Partial<DataCollectorContext> {
  const menuContext = isRoot ? {} : inject(DataCollectorInjectionKey);
  return menuContext || {};
}

export default function useMenuDataCollector(
  props: { isRoot?: boolean; key?: string } = { isRoot: false }
) {
  const { isRoot, key } = props;
  const { data, subMenuKeys, menuItemKeys } = useMenuDataCollectorProvider();
  const { collectSubMenu, removeSubMenu, reportMenuData } =
    useMenuDataCollectorContext(isRoot);

  if (key !== undefined) {
    onMounted(() => {
      collectSubMenu && collectSubMenu(key, data.value);
    });

    onUnmounted(() => {
      removeSubMenu && removeSubMenu(key);
    });
  }

  if (!isRoot && key === undefined) {
    onMounted(() => {
      reportMenuData && reportMenuData(data.value);
    });
  }

  return {
    menuData: data,
    subMenuKeys,
    menuItemKeys,
  };
}
