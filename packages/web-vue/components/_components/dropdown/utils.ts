import { isArray, isFunction, isObject } from '../../_utils/is';
import {
  Option,
  OptionData,
  OptionInfo,
  GroupOption,
  FilterOption,
  OptionNode,
} from '../../select/interface';

const isGroupOption = (option: Option): option is GroupOption => {
  return isObject(option) && 'isGroup' in option;
};

export const getOptionNodes = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  showExtraOptions,
  optionInfoMap,
  enabledOptionSet,
}: {
  options?: Option[];
  extraOptions?: Option[];
  inputValue?: string;
  filterOption?: FilterOption;
  showExtraOptions?: boolean;
  optionInfoMap: Map<string | number, OptionInfo>;
  enabledOptionSet: Set<string | number>;
}) => {
  optionInfoMap.clear();
  enabledOptionSet.clear();

  const getAndSaveOptionInfo = (
    option: string | number | OptionData,
    origin: 'options' | 'extraOptions'
  ): OptionInfo | undefined => {
    const index = optionInfoMap.size;

    const optionInfo: OptionInfo = isObject(option)
      ? {
          ...option,
          index,
          key: `option-${typeof option.value}-${option.value}`,
          value: option.value,
          label: option.label ?? String(option.value),
          disabled: Boolean(option.disabled),
          origin,
        }
      : {
          index,
          key: `option-${typeof option}-${option}`,
          value: option,
          label: String(option),
          disabled: false,
          origin,
        };

    // Duplicate value is no longer added
    if (optionInfoMap.get(optionInfo.value)) {
      return undefined;
    }

    optionInfoMap.set(optionInfo.value, optionInfo);
    return optionInfo;
  };

  const isValidOption = (optionInfo: OptionInfo) => {
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

  const travelOptions = (
    options: Option[],
    origin: 'options' | 'extraOptions'
  ) => {
    const result: OptionNode[] = [];

    for (const item of options) {
      if (isGroupOption(item)) {
        if (isArray(item.options) && item.options.length > 0) {
          result.push({
            ...item,
            key: `group-${item.label}`,
            options: travelOptions(item.options, origin),
          });
        }
      } else {
        const optionInfo = getAndSaveOptionInfo(item, origin);
        if (
          optionInfo &&
          isValidOption(optionInfo) &&
          (origin !== 'extraOptions' || showExtraOptions)
        ) {
          result.push({
            ...(isObject(item) ? item : undefined),
            key: optionInfo.key,
            value: optionInfo.value,
            label: optionInfo.label,
          });
          if (!optionInfo.disabled) {
            enabledOptionSet.add(optionInfo.value);
          }
        }
      }
    }
    return result;
  };

  const nodes: OptionNode[] = [];

  if (options) {
    nodes.push(...travelOptions(options, 'options'));
  }
  if (extraOptions) {
    nodes.push(...travelOptions(extraOptions, 'extraOptions'));
  }

  return nodes;
};
