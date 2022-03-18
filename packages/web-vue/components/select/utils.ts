import { isFunction, isNumber, isObject } from '../_utils/is';
import type {
  FilterOption,
  GroupOption,
  GroupOptionInfo,
  Option,
  OptionData,
  OptionInfo,
  OptionValue,
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
    return `option-object-${value[valueKey]}`;
  }
  if (value || isNumber(value)) {
    return `option-${typeof value}-${value}`;
  }
  return '';
};

export const createOptionInfo = (
  option: string | number | OptionData,
  {
    origin,
    index = -1,
    valueKey,
  }: {
    origin: 'slot' | 'options' | 'extraOptions';
    index?: number;
    valueKey?: string;
  }
): OptionInfo => {
  const key = getKeyFromValue(
    isObject(option) ? option.value : option,
    valueKey
  );

  return isObject(option)
    ? {
        ...option,
        index,
        key,
        origin,
        value: option.value,
        label: option.label ?? getValueString(option.value, valueKey),
        disabled: Boolean(option.disabled),
      }
    : {
        index,
        key,
        origin,
        value: option,
        label: String(option),
        disabled: false,
      };
};

export const getOptionInfos = (
  options: Option[],
  {
    valueKey,
    origin,
    optionInfoMap,
  }: {
    valueKey?: string;
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
        origin,
        optionInfoMap,
      });
      if (options.length > 0) {
        infos.push({
          ...item,
          key: `group-${item.label}`,
          options,
        });
      }
    } else {
      const optionInfo = createOptionInfo(item, {
        origin,
        valueKey,
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
    return !inputValue || filterOption(inputValue, optionInfo);
  }

  if (filterOption) {
    return optionInfo.label
      .toLowerCase()
      .includes((inputValue ?? '').toLowerCase());
  }

  return true;
};
