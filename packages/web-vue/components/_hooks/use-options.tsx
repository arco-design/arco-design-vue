import { ComponentPublicInstance, Ref, ref, watch } from 'vue';
import { getRelativeRect } from '../_utils/dom';
import {
  FilterOption,
  Option,
  OptionInfo,
  OptionNode,
} from '../select/interface';
import { getOptionNodes } from '../_components/dropdown/utils';

export const useOptions = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  showExtraOptions,
  dropdownRef,
  optionRefs,
  virtualListRef,
}: {
  options?: Ref<Option[]>;
  extraOptions?: Ref<Option[]>;
  inputValue?: Ref<string>;
  filterOption?: Ref<FilterOption>;
  showExtraOptions?: Ref<boolean>;
  dropdownRef?: Ref<ComponentPublicInstance | undefined>;
  optionRefs?: Ref<Record<string | number, HTMLElement>>;
  virtualListRef?: Ref<any>;
}) => {
  const optionInfoMap = new Map<string | number, OptionInfo>();
  const enabledOptionSet = new Set<string | number>();
  const activeOption = ref<OptionInfo>();

  const getNextActiveOption = (direction: 'up' | 'down') => {
    const enabledOptions = Array.from(enabledOptionSet);
    const _length = enabledOptions.length;
    if (_length === 0) {
      return undefined;
    }

    if (!activeOption.value) {
      if (direction === 'down') {
        return optionInfoMap.get(enabledOptions[0]);
      }
      return optionInfoMap.get(enabledOptions[_length - 1]);
    }

    const activeIndex = enabledOptions.indexOf(activeOption.value.value);
    const nextIndex =
      (_length + activeIndex + (direction === 'up' ? -1 : 1)) % _length;
    return optionInfoMap.get(enabledOptions[nextIndex]);
  };

  const scrollIntoView = (value: string | number) => {
    if (virtualListRef?.value) {
      virtualListRef.value.scrollTo();
    }
    const wrapperEle = dropdownRef?.value?.$refs?.wrapperRef as HTMLElement;
    const optionEle = optionRefs?.value[value];

    if (!wrapperEle || !optionEle) {
      return;
    }
    if (wrapperEle.scrollHeight === wrapperEle.offsetHeight) {
      return;
    }
    const optionRect = getRelativeRect(optionEle, wrapperEle);
    const wrapperScrollTop = wrapperEle.scrollTop;

    if (optionRect.top < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop + optionRect.top);
    } else if (optionRect.bottom < 0) {
      wrapperEle.scrollTo(0, wrapperScrollTop - optionRect.bottom);
    }
  };

  const nodes = ref<OptionNode[]>([]);

  const setOptionNodes = () => {
    nodes.value = getOptionNodes({
      options: options?.value,
      extraOptions: extraOptions?.value,
      inputValue: inputValue?.value,
      filterOption: filterOption?.value,
      showExtraOptions: showExtraOptions?.value ?? true,
      optionInfoMap,
      enabledOptionSet,
    });

    if (
      enabledOptionSet.size > 0 &&
      (!activeOption.value || !enabledOptionSet.has(activeOption.value.value))
    ) {
      const enabledOptions = Array.from(enabledOptionSet);
      activeOption.value = optionInfoMap.get(enabledOptions[0]);
    }
  };

  watch(
    [options, extraOptions, inputValue, filterOption],
    () => {
      setOptionNodes();
    },
    { immediate: true }
  );

  return {
    nodes,
    optionInfoMap,
    enabledOptionSet,
    activeOption,
    getNextActiveOption,
    scrollIntoView,
  };
};
