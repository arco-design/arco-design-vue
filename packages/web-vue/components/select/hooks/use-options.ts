import type { Ref } from 'vue';
import { computed, reactive, ref, watch } from 'vue';
import type {
  FilterOption,
  SelectOption,
  SelectOptionInfo,
  SelectFieldNames,
} from '../interface';
import { getOptionInfos, getValidOptions, isValidOption } from '../utils';
import { isNumber } from '../../_utils/is';

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  tagProps: 'tagProps',
  render: 'render',
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

  const slotOptionInfoMap = reactive(new Map<number, SelectOptionInfo>());
  const sortedSlotOptionInfos = computed<SelectOptionInfo[]>(() =>
    Array.from(slotOptionInfoMap.values()).sort((a, b) => {
      if (isNumber(a.index) && isNumber(b.index)) {
        return a.index - b.index;
      }
      return 0;
    })
  );

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
    [
      sortedSlotOptionInfos,
      options ?? ref([]),
      extraOptions ?? ref([]),
      valueKey ?? ref('value'),
    ],
    () => {
      optionInfoMap.clear();

      sortedSlotOptionInfos.value.forEach((info, index) => {
        optionInfoMap.set(info.key, { ...info, index });
      });
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
    { immediate: true, deep: true }
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
        })
      );
    }
    return options;
  });

  const validOptionInfos = computed(() =>
    Array.from(optionInfoMap.values()).filter((optionInfo) => {
      if (
        optionInfo.origin === 'extraOptions' &&
        showExtraOptions?.value === false
      ) {
        return false;
      }
      return isValidOption(optionInfo, {
        inputValue: inputValue?.value,
        filterOption: filterOption?.value,
      });
    })
  );

  const enabledOptionKeys = computed(() =>
    validOptionInfos.value
      .filter((optionInfo) => !optionInfo.disabled)
      .map((info) => info.key)
  );

  const getNextSlotOptionIndex = () => slotOptionInfoMap.size;

  const addSlotOptionInfo = (id: number, optionInfo: SelectOptionInfo) => {
    slotOptionInfoMap.set(id, optionInfo);
  };

  const removeSlotOptionInfo = (id: number) => {
    slotOptionInfoMap.delete(id);
  };

  return {
    validOptions,
    optionInfoMap,
    validOptionInfos,
    enabledOptionKeys,
    getNextSlotOptionIndex,
    addSlotOptionInfo,
    removeSlotOptionInfo,
  };
};
