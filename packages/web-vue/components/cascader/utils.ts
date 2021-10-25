import {
  CascaderOption,
  CascaderOptionWithTotal,
  CascaderOptionInfo,
} from './interface';
import { isArray, isString } from '../_utils/is';

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
  }: {
    leafOptionSet: Set<CascaderOptionInfo>;
    leafOptionMap: Map<string, CascaderOptionInfo>;
    leafOptionValueMap: Map<string, CascaderOptionInfo>;
  }
) => {
  const _options = getOptionsWithTotalLeaves(options);

  const travelOptions = (
    options: CascaderOptionWithTotal[],
    parent?: CascaderOptionInfo
  ) => {
    const parentPath = parent?.path ?? [];
    return options.map((item, index) => {
      const data = {
        ...item,
        label: item.label ?? item.value,
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
        data.children = travelOptions(item.children, data);
      } else {
        data.isLeaf = true;
        leafOptionSet.add(data);
        leafOptionMap.set(data.key, data);
        if (!leafOptionValueMap.has(data.value)) {
          leafOptionValueMap.set(data.value, data);
        }
      }

      return data;
    });
  };

  return travelOptions(_options);
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
  value: string | string[] | undefined | (string | string[])[],
  {
    pathMode,
    leafOptionMap,
    leafOptionValueMap,
  }: {
    pathMode: boolean;
    leafOptionMap: Map<string, CascaderOptionInfo>;
    leafOptionValueMap: Map<string, CascaderOptionInfo>;
  }
) => {
  const keys: string[] = [];
  if (!pathMode) {
    if (isArray(value)) {
      value.forEach((item) => {
        if (isString(item)) {
          const option = leafOptionValueMap.get(item);
          if (option) {
            keys.push(option.key);
          }
        }
      });
    } else if (isString(value)) {
      const option = leafOptionValueMap.get(value);
      if (option) {
        keys.push(option.key);
      }
    }
  } else if (isArray(value) && value.length > 0) {
    // TODO: 更好的写法？
    if (isString(value[0])) {
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
