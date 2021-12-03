import { ComponentPublicInstance, Ref, ref, watch } from 'vue';
import { getRelativeRect } from '../_utils/dom';
import {
  FilterOption,
  Option,
  OptionInfo,
  OptionNode,
} from '../_components/dropdown/interface';
import { getOptionNodes } from '../_components/dropdown/utils';

export const useOptions = ({
  options,
  extraOptions,
  inputValue,
  filterOption,
  dropdownRef,
  optionRefs,
  virtualListRef,
}: {
  options?: Ref<Option[]>;
  extraOptions?: Ref<Array<string | number>>;
  inputValue?: Ref<string>;
  filterOption?: Ref<FilterOption>;
  dropdownRef?: Ref<ComponentPublicInstance>;
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
      optionInfoMap,
      enabledOptionSet,
    });
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
