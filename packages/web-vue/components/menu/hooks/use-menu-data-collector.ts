import { ref, provide, inject, computed, onMounted, onUnmounted } from 'vue';
import { isUndefined } from '../../_utils/is';
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

export function useMenuDataCollectorContext(isRoot = false) {
  const menuContext = isRoot ? undefined : inject(DataCollectorInjectionKey);
  return menuContext;
}

export default function useMenuDataCollector(props: {
  key?: string | undefined;
  type: 'menu' | 'popupMenu' | 'subMenu';
}) {
  const { key, type } = props;
  const data = ref<MenuData>([]);
  const menuContext = useMenuDataCollectorContext(type === 'menu');

  const provideContext: DataCollectorContext = {
    collectSubMenu(key, children, isReport = false) {
      const item = {
        key,
        children,
      };
      if (isReport) {
        const oldOne = data.value.find((i) => i.key === key);
        if (oldOne) {
          oldOne.children = children;
        } else {
          data.value.push(item);
        }
      } else {
        data.value = [...data.value, item];
      }

      // 当接收到了更新数据，除了 menu，继续向上更新
      if (isReport) {
        if (type === 'popupMenu') {
          menuContext?.reportMenuData(data.value);
        } else if (type === 'subMenu' && !isUndefined(key)) {
          menuContext?.collectSubMenu(key, data.value, true);
        }
      }
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
      // 继续向上更新，注意：只有 popup submenu 会接收到 report
      if (type === 'subMenu' && !isUndefined(key)) {
        menuContext?.collectSubMenu(key, data.value, true);
      }
    },
  };

  provide(DataCollectorInjectionKey, provideContext);

  if (type === 'subMenu' && !isUndefined(key)) {
    onMounted(() => {
      menuContext?.collectSubMenu(key, data.value);
    });
    onUnmounted(() => {
      menuContext?.removeSubMenu(key);
    });
  } else if (type === 'popupMenu') {
    onMounted(() => {
      menuContext?.reportMenuData(data.value);
    });
  }

  return {
    menuData: data,
    subMenuKeys: computed(() => getKeys(data.value, (item) => !!item.children)),
    menuItemKeys: computed(() => getKeys(data.value, (item) => !item.children)),
  };
}
