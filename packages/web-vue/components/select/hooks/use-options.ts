import type { Ref } from 'vue';
import { computed, reactive, ref, watch } from 'vue';

import type { FilterOption, SelectOption, SelectOptionInfo, SelectFieldNames } from '../interface';

import { getOptionInfos, getValidOptions, isValidOption } from '../utils';

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  tagProps: 'tagProps',
};

export const useOptions = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  showExtraOptions,
  valueKey,
  fieldNames,
}: {
  options?: Ref<SelectOption[]>;
  extraOptions?: Ref<SelectOption[]>;
  inputValue?: Ref<string>;
  filterOption?: Ref<FilterOption>;
  showExtraOptions?: Ref<boolean>;
  valueKey?: Ref<string>;
  fieldNames?: Ref<SelectFieldNames | undefined>;
}) => {
  const mergedFieldNames = computed(() => ({
    ...DEFAULT_FIELD_NAMES,
    ...fieldNames?.value,
  }));

  const propOptionData = computed(() => {
    const optionInfoMap = new Map<string, SelectOptionInfo>();
    const optionInfos = getOptionInfos(options?.value ?? [], {
      valueKey: valueKey?.value ?? 'value',
      fieldNames: mergedFieldNames.value,
      origin: 'options',
      optionInfoMap,
    });

    return {
      optionInfos,
      optionInfoMap,
    };
  });

  const extraOptionData = computed(() => {
    const optionInfoMap = new Map<string, SelectOptionInfo>();

    const optionInfos = getOptionInfos(extraOptions?.value ?? [], {
      valueKey: valueKey?.value ?? 'value',
      fieldNames: mergedFieldNames.value,
      origin: 'extraOptions',
      optionInfoMap,
    });
    return {
      optionInfos,
      optionInfoMap,
    };
  });

  const optionInfoMap = reactive(new Map<string, SelectOptionInfo>());

  watch(
    [options ?? ref([]), extraOptions ?? ref([]), valueKey ?? ref('value')],
    () => {
      optionInfoMap.clear();

      propOptionData.value.optionInfoMap.forEach((info) => {
        if (!optionInfoMap.has(info.key)) {
          info.index = optionInfoMap.size;
          optionInfoMap.set(info.key, info);
        }
      });
      extraOptionData.value.optionInfoMap.forEach((info) => {
        if (!optionInfoMap.has(info.key)) {
          info.index = optionInfoMap.size;
          optionInfoMap.set(info.key, info);
        }
      });
    },
    { immediate: true, deep: true },
  );

  const validOptions = computed(() => {
    const options = getValidOptions(propOptionData.value.optionInfos, {
      inputValue: inputValue?.value,
      filterOption: filterOption?.value,
    });
    if (showExtraOptions?.value ?? true) {
      options.push(
        ...getValidOptions(extraOptionData.value.optionInfos, {
          inputValue: inputValue?.value,
          filterOption: filterOption?.value,
        }),
      );
    }
    return options;
  });

  const validOptionInfos = computed(() =>
    Array.from(optionInfoMap.values()).filter((optionInfo) => {
      if (optionInfo.origin === 'extraOptions' && showExtraOptions?.value === false) {
        return false;
      }
      return isValidOption(optionInfo, {
        inputValue: inputValue?.value,
        filterOption: filterOption?.value,
      });
    }),
  );

  const enabledOptionKeys = computed(() =>
    validOptionInfos.value.filter((optionInfo) => !optionInfo.disabled).map((info) => info.key),
  );

  return {
    validOptions,
    optionInfoMap,
    validOptionInfos,
    enabledOptionKeys,
  };
};
