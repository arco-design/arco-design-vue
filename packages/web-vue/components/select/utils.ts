import { isFunction, isNumber, isObject } from '../_utils/is';
import type {
  FilterOption,
  GroupOption,
  GroupOptionInfo,
  Option,
  OptionData,
  OptionInfo,
  OptionValue,
  SelectFieldNames,
} from './interface';

export const isGroupOption = (option: Option): option is GroupOption => {
  return isObject(option) && 'isGroup' in option;
};

export const isGroupOptionInfo = (
  option: Option | GroupOptionInfo
): option is GroupOptionInfo => {
  return isObject(option) && 'isGroup' in option;
};

export const getValueString = (value: OptionValue, valueKey = 'value') =>
  String(isObject(value) ? value[valueKey] : value);

export const getKeyFromValue = (value?: OptionValue, valueKey = 'value') => {
  if (isObject(value)) {
    return `__arco__option__object__${value[valueKey]}`;
  }
  if (value || isNumber(value)) {
    return `__arco__option__${typeof value}-${value}`;
  }
  return '';
};

export const createOptionInfo = (
  option: string | number | OptionData,
  {
    valueKey,
    fieldNames,
    origin,
    index = -1,
  }: {
    valueKey: string;
    fieldNames: Required<SelectFieldNames>;
    origin: 'slot' | 'options' | 'extraOptions';
    index?: number;
  }
): OptionInfo => {
  if (isObject(option)) {
    const value = option[fieldNames.value];

    return {
      raw: option,
      index,
      key: getKeyFromValue(value, valueKey),
      origin,
      value,
      label: option[fieldNames.label] ?? getValueString(value, valueKey),
      disabled: Boolean(option[fieldNames.disabled]),
    };
  }
  const raw = {
    value: option,
    label: String(option),
    disabled: false,
  };

  return {
    raw,
    index,
    key: getKeyFromValue(option, valueKey),
    origin,
    ...raw,
  };
};

export const getOptionInfos = (
  options: Option[],
  {
    valueKey,
    fieldNames,
    origin,
    optionInfoMap,
  }: {
    valueKey: string;
    fieldNames: Required<SelectFieldNames>;
    origin: 'options' | 'extraOptions';
    optionInfoMap: Map<string, OptionInfo>;
  }
) => {
  const infos: (OptionInfo | GroupOptionInfo)[] = [];
  optionInfoMap.clear();

  for (const item of options) {
    if (isGroupOption(item)) {
      const options = getOptionInfos(item.options ?? [], {
        valueKey,
        fieldNames,
        origin,
        optionInfoMap,
      });
      if (options.length > 0) {
        infos.push({
          ...item,
          key: `__arco__group__${item.label}`,
          options,
        });
      }
    } else {
      const optionInfo = createOptionInfo(item, {
        valueKey,
        fieldNames,
        origin,
      });
      infos.push(optionInfo);
      if (!optionInfoMap.get(optionInfo.key)) {
        optionInfoMap.set(optionInfo.key, optionInfo);
      }
    }
  }
  return infos;
};

export const createOptionInfoMap = (
  optionInfos: (OptionInfo | GroupOptionInfo)[]
) => {
  const optionInfoMap = new Map<string, OptionInfo>();

  const travel = (optionInfos: (OptionInfo | GroupOptionInfo)[]) => {
    for (const item of optionInfos) {
      if (isGroupOptionInfo(item)) {
        travel(item.options ?? []);
      } else if (!optionInfoMap.get(item.key)) {
        optionInfoMap.set(item.key, item);
      }
    }
  };

  travel(optionInfos);

  return optionInfoMap;
};

export const getValidOptions = (
  optionInfos: (OptionInfo | GroupOptionInfo)[],
  {
    inputValue,
    filterOption,
  }: {
    inputValue?: string;
    filterOption?: FilterOption;
  }
) => {
  const travel = (optionInfos: (OptionInfo | GroupOptionInfo)[]) => {
    const options: (OptionInfo | GroupOptionInfo)[] = [];

    for (const item of optionInfos) {
      if (isGroupOptionInfo(item)) {
        const _options = travel(item.options ?? []);
        if (_options.length > 0) {
          options.push({ ...item, options: _options });
        }
      } else if (isValidOption(item, { inputValue, filterOption })) {
        options.push(item);
      }
    }
    return options;
  };

  return travel(optionInfos);
};

export const isValidOption = (
  optionInfo: OptionInfo,
  {
    inputValue,
    filterOption,
  }: {
    inputValue?: string;
    filterOption?: FilterOption;
  }
) => {
  if (isFunction(filterOption)) {
    return !inputValue || filterOption(inputValue, optionInfo.raw);
  }

  if (filterOption) {
    return optionInfo.label
      .toLowerCase()
      .includes((inputValue ?? '').toLowerCase());
  }

  return true;
};
