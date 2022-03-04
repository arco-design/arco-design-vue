import type { Ref } from 'vue';
import { computed, reactive, watch } from 'vue';
import { FilterOption, Option, OptionInfo } from '../interface';
import { createOptionInfoMap, getOptionInfos, isValidOption } from '../utils';

export const useOptions = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  showExtraOptions,
  valueKey,
}: {
  options?: Ref<Option[]>;
  extraOptions?: Ref<Option[]>;
  inputValue?: Ref<string>;
  filterOption?: Ref<FilterOption>;
  showExtraOptions?: Ref<boolean>;
  valueKey?: Ref<string>;
}) => {
  const slotOptionInfoMap = reactive(new Map<number, OptionInfo>());
  const sortedSlotOptionInfos = computed(() =>
    Array.from(slotOptionInfoMap.values()).sort((a, b) => a.index - b.index)
  );
  const propOptionInfos = computed(() =>
    getOptionInfos(options?.value ?? [], {
      valueKey: valueKey?.value,
      origin: 'options',
    })
  );
  const propOptionInfoMap = computed(() =>
    createOptionInfoMap(propOptionInfos.value)
  );
  const extraOptionInfos = computed(() =>
    getOptionInfos(extraOptions?.value ?? [], {
      valueKey: valueKey?.value,
      origin: 'extraOptions',
    })
  );
  const extraOptionInfoMap = computed(() =>
    createOptionInfoMap(extraOptionInfos.value)
  );
  const optionInfoMap = reactive(new Map<string, OptionInfo>());

  watch(
    [slotOptionInfoMap, propOptionInfoMap, extraOptionInfoMap],
    ([_, propMap, extraMap]) => {
      optionInfoMap.clear();

      sortedSlotOptionInfos.value.forEach((info, index) => {
        optionInfoMap.set(info.key, { ...info, index });
      });
      propMap.forEach((info) => {
        if (!optionInfoMap.has(info.key)) {
          info.index = optionInfoMap.size;
          optionInfoMap.set(info.key, info);
        }
      });
      extraMap.forEach((info) => {
        if (!optionInfoMap.has(info.key)) {
          info.index = optionInfoMap.size;
          optionInfoMap.set(info.key, info);
        }
      });
    },
    { immediate: true }
  );

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

  const addSlotOptionInfo = (id: number, optionInfo: OptionInfo) => {
    slotOptionInfoMap.set(id, optionInfo);
  };

  const removeSlotOptionInfo = (id: number) => {
    slotOptionInfoMap.delete(id);
  };

  return {
    propOptionInfos,
    extraOptionInfos,
    optionInfoMap,
    validOptionInfos,
    enabledOptionKeys,
    addSlotOptionInfo,
    removeSlotOptionInfo,
  };
};
