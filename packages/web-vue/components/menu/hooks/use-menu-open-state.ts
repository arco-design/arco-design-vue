import { computed, toRefs, watch, onMounted, ref } from 'vue';
import { isUndefined } from '../../_utils/is';
import { MenuData } from '../interface';

interface MenuOpenStateProps {
  modelValue: string[] | undefined;
  defaultValue: string[] | undefined;
  autoOpen: boolean;
  autoOpenSelected: boolean;
  selectedKeys: string[];
  subMenuKeys: string[];
  menuData: MenuData;
  accordion: boolean;
}

function getPath(data: MenuData, key: string) {
  const path: string[] = [];
  const loop = (list: MenuData) => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.key === key) {
        return true;
      }
      if (item.children) {
        path.push(item.key);
        const matched = loop(item.children);
        if (matched) {
          return true;
        }
        path.pop();
      }
    }
    return false;
  };

  loop(data);

  return path;
}

function isSameKeys(keys1: string[], keys2: string[]) {
  if (keys1.length !== keys2.length) return false;
  return keys1.toString() === keys2.toString();
}

export default function useMenuOpenState(props: MenuOpenStateProps) {
  const {
    modelValue,
    defaultValue,
    autoOpen,
    autoOpenSelected,
    subMenuKeys,
    selectedKeys,
    menuData,
    accordion,
  } = toRefs(props);

  const localValue = ref(
    !isUndefined(modelValue.value)
      ? modelValue.value
      : !isUndefined(defaultValue.value)
      ? defaultValue.value
      : []
  );
  const setLocalValue = (val: string[]) => {
    localValue.value = val;
  };

  watch(modelValue, () => {
    if (isUndefined(modelValue.value)) {
      setLocalValue([]);
    }
  });

  let mountedSubMenuKeys: string[] = [];
  onMounted(() => {
    mountedSubMenuKeys = [...subMenuKeys.value];
    let newOpenKeys: string[] = [];
    if (autoOpen.value) {
      newOpenKeys = accordion.value
        ? subMenuKeys.value.slice(0, 1)
        : [...subMenuKeys.value];
    }
    if (autoOpenSelected.value) {
      const pathList = selectedKeys.value.map((key) =>
        getPath(menuData.value, key)
      );
      if (pathList.length && (!autoOpen.value || accordion.value)) {
        newOpenKeys = accordion.value
          ? pathList[0]
          : [...new Set(([] as string[]).concat(...pathList))];
      }
    }
    if (newOpenKeys.length) {
      setLocalValue(newOpenKeys);
    }
  });

  let hasTriggered = false;
  watch(subMenuKeys, (currentKeys, prevKeys = []) => {
    if (hasTriggered || !isSameKeys(currentKeys, mountedSubMenuKeys)) {
      const newOpenKeys = openKeys.value.filter((key) =>
        currentKeys.includes(key)
      );
      if (autoOpen.value) {
        const keysAdded = currentKeys.filter((key) => !prevKeys.includes(key));
        newOpenKeys.push(...keysAdded);
      }
      setLocalValue(accordion.value ? newOpenKeys.slice(0, 1) : newOpenKeys);
    }
    hasTriggered = true;
  });

  const openKeys = computed(() => modelValue.value || localValue.value);

  return {
    openKeys,
    localOpenKeys: localValue,
    setOpenKeys: setLocalValue,
    open(key: string, level: number) {
      let newOpenKeys: string[] = [];
      if (openKeys.value.indexOf(key) > -1) {
        if (accordion.value && level === 1) {
          newOpenKeys = [];
        } else {
          newOpenKeys = openKeys.value.filter((i) => i !== key);
        }
      } else if (accordion.value && level === 1) {
        newOpenKeys = [key];
      } else {
        newOpenKeys = openKeys.value.concat([key]);
      }
      setLocalValue(newOpenKeys);
      return newOpenKeys;
    },
  };
}
