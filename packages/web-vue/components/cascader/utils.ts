import { Ref } from 'vue';
import {
  CascaderOption,
  CascaderOptionWithTotal,
  CascaderOptionInfo,
} from './interface';
import { isArray, isNumber, isString } from '../_utils/is';

const getOptionsWithTotalLeaves = (options: CascaderOption[]) => {
  const _options: CascaderOptionWithTotal[] = [];

  for (const item of options) {
    const data: CascaderOptionWithTotal = { ...item };
    if (data.children) {
      data.children = getOptionsWithTotalLeaves(data.children);
      data.totalLeafOptions = data.children.reduce((pre, item) => {
        return pre + (item.totalLeafOptions ?? 1);
      }, 0);
    }
    _options.push(data);
  }

  return _options;
};

export const getOptionInfos = (
  options: CascaderOption[],
  {
    leafOptionSet,
    leafOptionMap,
    leafOptionValueMap,
    totalLevel: innerLevel,
    checkStrictly,
  }: {
    leafOptionSet: Set<CascaderOptionInfo>;
    leafOptionMap: Map<string | number, CascaderOptionInfo>;
    leafOptionValueMap: Map<string | number, CascaderOptionInfo>;
    totalLevel: Ref<number>;
    checkStrictly: Ref<boolean>;
  }
) => {
  const _options = getOptionsWithTotalLeaves(options);
  let totalLevel = 0;

  const travelOptions = (
    options: CascaderOptionWithTotal[],
    parent?: CascaderOptionInfo,
    level?: number
  ) => {
    const parentPath = parent?.path ?? [];
    totalLevel = level ?? 1;

    return options.map((item, index) => {
      const data = {
        ...item,
        label: item.label ?? String(item.value),
        disabled: Boolean(item.disabled),
        level: parentPath.length,
        index,
        parent,
      } as CascaderOptionInfo;
      const path = parentPath.concat(data);
      const key = path.map((item) => item.value).join('-');
      data.path = path;
      data.key = key;

      if (item.children) {
        data.isLeaf = false;
        data.children = travelOptions(item.children, data, (level ?? 1) + 1);
      } else {
        data.isLeaf = true;
      }

      if (data.isLeaf || checkStrictly.value) {
        leafOptionSet.add(data);
        leafOptionMap.set(data.key, data);
        if (!leafOptionValueMap.has(data.value)) {
          leafOptionValueMap.set(data.value, data);
        }
      }

      return data;
    });
  };

  const result = travelOptions(_options);
  innerLevel.value = totalLevel;
  return result;
};

export const getCheckedStatus = (
  option: CascaderOptionInfo,
  computedKeys: string[]
) => {
  let checked = false;
  let indeterminate = false;

  if (option.isLeaf) {
    if (computedKeys.includes(option.key)) {
      checked = true;
    }
  } else {
    const reg = new RegExp(`^${option.key}(-|$)`);
    const checkedLeafOptionNumber = computedKeys.reduce((pre, key) => {
      if (reg.test(key)) {
        return pre + 1;
      }
      return pre;
    }, 0);
    if (checkedLeafOptionNumber === (option.totalLeafOptions ?? 1)) {
      checked = true;
    } else if (checkedLeafOptionNumber > 0) {
      indeterminate = true;
    }
  }

  return {
    checked,
    indeterminate,
  };
};

export const getLeafOptionKeys = (option: CascaderOptionInfo) => {
  const keys: string[] = [];
  if (option.isLeaf) {
    keys.push(option.key);
  } else if (option.children) {
    for (const item of option.children) {
      keys.push(...getLeafOptionKeys(item));
    }
  }
  return keys;
};

export const getKeysFromValue = (
  value:
    | string
    | number
    | Array<string | number>
    | undefined
    | (string | number | Array<string | number>)[],
  {
    pathMode,
    leafOptionMap,
    leafOptionValueMap,
  }: {
    pathMode: boolean;
    leafOptionMap: Map<string | number, CascaderOptionInfo>;
    leafOptionValueMap: Map<string | number, CascaderOptionInfo>;
  }
) => {
  const keys: string[] = [];
  if (!pathMode) {
    if (isArray(value)) {
      value.forEach((item) => {
        if (isString(item) || isNumber(item)) {
          const option = leafOptionValueMap.get(item);
          if (option) {
            keys.push(option.key);
          }
        }
      });
    } else if (isString(value) || isNumber(value)) {
      const option = leafOptionValueMap.get(value);
      if (option) {
        keys.push(option.key);
      }
    }
  } else if (isArray(value) && value.length > 0) {
    // TODO: 更好的写法？
    if (isString(value[0]) || isNumber(value[0])) {
      const key = value.join('-');
      if (leafOptionMap.has(key)) {
        keys.push(key);
      }
    } else {
      value.forEach((item) => {
        if (isArray(item)) {
          const key = item.join('-');
          if (leafOptionMap.has(key)) {
            keys.push(key);
          }
        }
      });
    }
  }
  return keys;
};
