import { Ref } from 'vue';

import { isArray, isNull, isNumber, isObject, isString, isUndefined } from '../_utils/is';
import { BaseType } from '../_utils/types';
import {
  CascaderFieldNames,
  CascaderModelValue,
  CascaderOption,
  CascaderOptionInfo,
  CascaderOptionValue,
  CascaderPathValue,
  CascaderSingleValue,
} from './interface';

export const getOptionInfos = (
  options: CascaderOption[],
  {
    optionMap,
    leafOptionMap,
    leafOptionSet,
    leafOptionValueMap,
    totalLevel: innerLevel,
    checkStrictly,
    enabledLazyLoad,
    lazyLoadOptions,
    valueKey,
    fieldNames,
  }: {
    optionMap: Map<string, CascaderOptionInfo>;
    leafOptionMap: Map<string, CascaderOptionInfo>;
    leafOptionSet: Set<CascaderOptionInfo>;
    leafOptionValueMap: Map<BaseType, string>;
    totalLevel: Ref<number>;
    checkStrictly: Ref<boolean>;
    enabledLazyLoad: boolean;
    lazyLoadOptions: Record<string, CascaderOption[]>;
    valueKey: Ref<string>;
    fieldNames: Required<CascaderFieldNames>;
  },
) => {
  let totalLevel = 0;

  const getTotalLeafOptions = (children: CascaderOptionInfo[]) => {
    return children.reduce((pre, item) => {
      if (isNumber(item.totalLeafOptions)) {
        return pre + item.totalLeafOptions;
      }

      if (item.disabled || item.selectionDisabled) {
        return pre;
      }

      return pre + (item.isLeaf ? 1 : 0);
    }, 0);
  };

  const resolveChildren = (
    item: CascaderOption,
    data: CascaderOptionInfo,
    key: string,
    level: number,
  ) => {
    if (item[fieldNames.children]) {
      data.isLeaf = false;
      data.children = travelOptions(item[fieldNames.children], data, level + 1);
      return;
    }

    if (enabledLazyLoad && !data.isLeaf) {
      data.isLeaf = false;
      if (lazyLoadOptions[key]) {
        data.children = travelOptions(lazyLoadOptions[key], data, level + 1);
      }
      return;
    }

    data.isLeaf = true;
  };

  const travelOptions = (
    options: CascaderOption[],
    parent?: CascaderOptionInfo,
    level?: number,
  ) => {
    const parentPath = parent?.path ?? [];
    totalLevel = Math.max(totalLevel, level ?? 1);

    return options.map((item, index) => {
      const value = item[fieldNames.value];
      const normalizedValue = (value ?? '') as CascaderOptionValue;
      const fallbackLabel = isObject(normalizedValue)
        ? String(normalizedValue[valueKey.value])
        : String(normalizedValue);
      const data: CascaderOptionInfo = {
        raw: item,
        // raw
        value: normalizedValue,
        label: (item[fieldNames.label] as string | undefined) ?? fallbackLabel,
        disabled: Boolean(item[fieldNames.disabled]),
        selectionDisabled: false,
        tagProps: item[fieldNames.tagProps],
        isLeaf: item[fieldNames.isLeaf],
        // other
        level: parentPath.length,
        index,
        key: '',
        valueKey: String(isObject(value) ? value[valueKey.value] : value),
        parent,
        path: [],
        pathValue: [],
      };
      const path = parentPath.concat(data);
      const pathValue: CascaderPathValue = [];
      const key = path
        .map((pathItem) => {
          pathValue.push(pathItem.value);
          return pathItem.valueKey;
        })
        .join('-');
      data.path = path;
      data.pathValue = pathValue;
      data.key = key;

      resolveChildren(item, data, key, level ?? 1);

      if (data.children && !data.disabled) {
        data.totalLeafOptions = getTotalLeafOptions(data.children);

        if (data.totalLeafOptions === 0 && !checkStrictly.value) {
          data.selectionDisabled = true;
        }
      }

      optionMap.set(data.key, data);
      if (data.isLeaf || checkStrictly.value) {
        leafOptionSet.add(data);
        leafOptionMap.set(data.key, data);
        if (!leafOptionValueMap.has(data.valueKey)) {
          leafOptionValueMap.set(data.valueKey, data.key);
        }
      }

      return data;
    });
  };

  const result = travelOptions(options);
  innerLevel.value = totalLevel;
  return result;
};

export const getCheckedStatus = (option: CascaderOptionInfo, valueMap?: Map<string, unknown>) => {
  let checked = false;
  let indeterminate = false;

  if (option.isLeaf) {
    if (valueMap?.has(option.key)) {
      checked = true;
    }
  } else {
    const reg = new RegExp(`^${option.key}(-|$)`);
    const checkedLeafOptionNumber = Array.from(valueMap?.keys() ?? []).reduce((pre, key) => {
      if (reg.test(key)) {
        return pre + 1;
      }
      return pre;
    }, 0);
    if (checkedLeafOptionNumber > 0 && checkedLeafOptionNumber >= (option.totalLeafOptions ?? 1)) {
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

export const getLeafOptionInfos = (option: CascaderOptionInfo) => {
  const infos: CascaderOptionInfo[] = [];
  if (option.disabled || option.selectionDisabled) {
    return infos;
  }

  if (option.isLeaf) {
    infos.push(option);
  } else if (option.children) {
    for (const item of option.children) {
      infos.push(...getLeafOptionInfos(item));
    }
  }
  return infos;
};

export const getValueKey = (
  value: CascaderSingleValue,
  { valueKey, leafOptionValueMap }: { valueKey: string; leafOptionValueMap: Map<BaseType, string> },
): string => {
  if (isArray(value)) {
    return value
      .map((item) => {
        if (isObject(item)) return item[valueKey];
        return item;
      })
      .join('-');
  }
  const _value = isObject(value) ? value[valueKey] : value;
  return leafOptionValueMap.get(String(_value)) ?? String(_value);
};

export const getValidValues = (
  value: CascaderModelValue,
  { multiple, pathMode }: { multiple: boolean; pathMode: boolean },
): CascaderSingleValue[] => {
  if (!isArray(value)) {
    return isUndefined(value) || isNull(value) || value === '' ? [] : [value];
  }
  if (pathMode && !multiple && value.length > 0 && !isArray(value[0])) {
    return [value as CascaderPathValue];
  }
  return value as CascaderSingleValue[];
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
  },
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

export const getOptionLabel = (
  option: CascaderOptionInfo,
  {
    separator = ' / ',
    showPath = true,
  }: {
    separator?: string;
    showPath?: boolean;
  } = {},
) => {
  if (!showPath) {
    return option.label;
  }

  return option.path.map((item) => item.label).join(separator);
};
