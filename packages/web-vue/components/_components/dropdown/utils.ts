import { isArray, isFunction, isObject } from '../../_utils/is';
import {
  Option,
  OptionData,
  OptionInfo,
  GroupOption,
  FilterOption,
  OptionNode,
} from './interface';

const isGroupOption = (option: Option): option is GroupOption => {
  return isObject(option) && 'isGroup' in option;
};

export const getOptionNodes = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  optionInfoMap,
  enabledOptionSet,
}: {
  options?: Option[];
  extraOptions?: Array<string | number>;
  inputValue?: string;
  filterOption?: FilterOption;
  optionInfoMap: Map<string | number, OptionInfo>;
  enabledOptionSet: Set<string | number>;
}) => {
  const nodes: OptionNode[] = [];
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

  const extendChildrenFromOptions = (
    options: Option[],
    origin: 'options' | 'extraOptions'
  ) => {
    for (const item of options) {
      if (isGroupOption(item)) {
        if (isArray(item.options) && item.options.length > 0) {
          nodes.push({
            type: 'optGroup',
            key: `group-${item.label}`,
            label: item.label,
          });
          extendChildrenFromOptions(item.options, origin);
        }
      } else {
        const optionInfo = getAndSaveOptionInfo(item, origin);
        if (optionInfo && isValidOption(optionInfo)) {
          nodes.push({
            type: 'option',
            key: optionInfo.key,
            value: optionInfo.value,
            label: optionInfo.label,
            render: optionInfo.render,
            disabled: optionInfo.disabled,
          });
          if (!optionInfo.disabled) {
            enabledOptionSet.add(optionInfo.value);
          }
        }
      }
    }
  };

  if (options) {
    extendChildrenFromOptions(options, 'options');
  }
  if (extraOptions) {
    extendChildrenFromOptions(extraOptions, 'extraOptions');
  }

  return nodes;
};
