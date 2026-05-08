import type { ComponentPublicInstance, PropType } from 'vue';
import { computed, defineComponent, nextTick, ref, toRefs, watch, watchEffect } from 'vue';

import type { SelectViewValue } from '../_components/select-view/interface';
import type { VirtualListProps } from '../_components/virtual-list-v2/interface';
import type { Size } from '../_utils/constant';
import type { ScrollbarProps } from '../scrollbar';
import type {
  OptionValueWithKey,
  SelectFieldNames,
  SelectModelValue,
  SelectOption,
  SelectOptionData,
  SelectOptionGroupInfo,
  SelectOptionInfo,
  SelectOptionValue,
} from './interface';

import SelectView from '../_components/select-view/select-view';
import VirtualList from '../_components/virtual-list-v2';
import { useAllowClear } from '../_hooks/use-allow-clear';
import { useFormItem } from '../_hooks/use-form-item';
import { useTrigger } from '../_hooks/use-trigger';
import { debounce } from '../_utils/debounce';
import { getPrefixCls } from '../_utils/global-config';
import {
  isArray,
  isEmptyObject,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isBoolean,
  isUndefined,
} from '../_utils/is';
import Trigger, { type TriggerProps } from '../trigger';
import { useSelect } from './hooks/use-select';
import OptGroup from './optgroup.vue';
import Option from './option.vue';
import SelectDropdown from './select-dropdown.vue';
import { getKeyFromValue, hasEmptyStringKey, isGroupOptionInfo, isValidOption } from './utils';

const DEFAULT_FIELD_NAMES: Required<SelectFieldNames> = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  tagProps: 'tagProps',
};

interface SelectViewInstance {
  focus?: () => void;
  blur?: () => void;
}

export default defineComponent({
  name: 'Select',
  components: {
    Trigger,
    SelectView,
  },
  inheritAttrs: false,
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean, Object, Array] as PropType<SelectModelValue>,
      default: undefined,
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array] as PropType<SelectModelValue>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Number, Boolean, Object, Array] as PropType<SelectModelValue>,
      default: (props: { multiple?: boolean }) => (props.multiple ? [] : ''),
    },
    inputValue: {
      type: String,
    },
    defaultInputValue: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<Size>,
    },
    placeholder: String,
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    allowSearch: {
      type: [Boolean, Object] as PropType<boolean | { retainInputValue?: boolean }>,
      default: true,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    maxTagCount: {
      type: [Number, String] as PropType<number | 'responsive'>,
      default: 'responsive',
    },
    popupContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    defaultActiveFirstOption: {
      type: Boolean,
      default: true,
    },
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    show: {
      type: Boolean,
      default: undefined,
    },
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    defaultShow: {
      type: Boolean,
      default: undefined,
    },
    unmountOnClose: {
      type: Boolean,
      default: false,
    },
    filterOption: {
      type: [Boolean, Function] as PropType<
        boolean | ((inputValue: string, option: SelectOptionData) => boolean)
      >,
      default: true,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    triggerProps: {
      type: Object as PropType<TriggerProps>,
    },
    fallbackOption: {
      type: [Boolean, Function] as PropType<
        boolean | ((value: SelectOptionValue) => SelectOptionData)
      >,
      default: true,
    },
    showExtraOptions: {
      type: Boolean,
      default: true,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    searchDelay: {
      type: Number,
      default: 500,
    },
    limit: {
      type: Number,
      default: 0,
    },
    fieldNames: {
      type: Object as PropType<SelectFieldNames>,
    },
    scrollbar: {
      type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
    showHeaderOnEmpty: {
      type: Boolean,
      default: false,
    },
    showFooterOnEmpty: {
      type: Boolean,
      default: false,
    },
    tagNowrap: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (_value: SelectModelValue) => true,
    'update:value': (_value: SelectModelValue) => true,
    'update:inputValue': (_inputValue: string) => true,
    'update:popupVisible': (_visible: boolean) => true,
    'update:show': (_visible: boolean) => true,
    'change': (_value: SelectModelValue) => true,
    'inputValueChange': (_inputValue: string) => true,
    'popupVisibleChange': (_visible: boolean) => true,
    'showChange': (_visible: boolean) => true,
    'clear': (_ev: Event) => true,
    'remove': (_removed: SelectOptionValue | undefined) => true,
    'search': (_inputValue: string) => true,
    'dropdownScroll': (_ev: Event) => true,
    'dropdownReachBottom': (_ev: Event) => true,
    'exceedLimit': (_value: SelectOptionValue | undefined, _ev: Event) => true,
  },
  setup(props, { slots, emit, attrs, expose }) {
    const {
      size,
      disabled,
      error,
      options,
      filterOption,
      valueKey,
      multiple,
      value: valueProp,
      popupVisible,
      show,
      defaultPopupVisible,
      defaultShow,
      showExtraOptions,
      modelValue,
      fieldNames,
      loading,
      defaultActiveFirstOption,
      allowClear,
    } = toRefs(props);

    const prefixCls = getPrefixCls('select');
    const selectViewRef = ref<ComponentPublicInstance<SelectViewInstance> | null>(null);
    const { mergedSize, mergedDisabled, mergedError, eventHandlers } = useFormItem({
      size,
      disabled,
      error,
    });
    const { mergedAllowClear } = useAllowClear(allowClear);
    const component = computed(() => (props.virtualListProps ? 'div' : 'li'));
    const retainInputValue = computed(
      () => isObject(props.allowSearch) && Boolean(props.allowSearch.retainInputValue),
    );

    const dropdownRef = ref<ComponentPublicInstance>();
    const optionRefs = ref<Record<string, HTMLElement>>({});
    const virtualListRef = ref();

    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
      popupVisible,
      defaultPopupVisible,
      show,
      defaultShow,
      emit: emit as unknown as (
        event: 'update:popupVisible' | 'popupVisibleChange' | 'update:show' | 'showChange',
        visible: boolean,
      ) => void,
    });

    const _value = ref<SelectModelValue>(props.defaultValue);
    const computedValueObjects = computed<OptionValueWithKey[]>(() => {
      const mergedValue = props.modelValue ?? props.value ?? _value.value;
      const valueArray: SelectOptionValue[] = [];

      if (isArray(mergedValue)) {
        valueArray.push(...mergedValue);
      } else if (
        mergedValue ||
        isNumber(mergedValue) ||
        isString(mergedValue) ||
        isBoolean(mergedValue)
      ) {
        valueArray.push(mergedValue);
      }

      return valueArray.map((item) => ({
        value: item,
        key: getKeyFromValue(item, props.valueKey),
      }));
    });

    watch([modelValue, valueProp], ([nextModelValue, nextValue]) => {
      const mergedValue = nextModelValue ?? nextValue;
      if (isUndefined(mergedValue) || isNull(mergedValue)) {
        _value.value = multiple.value ? [] : mergedValue;
      }
    });

    const computedValueKeys = computed(() => computedValueObjects.value.map((item) => item.key));
    const mergedFieldNames = computed(() => ({
      ...DEFAULT_FIELD_NAMES,
      ...fieldNames.value,
    }));

    const selectedOptionMap = ref<Record<string, unknown>>({});
    const getRawOptionFromValueKeys = (valueKeys: string[]) => {
      const optionMap: Record<string, unknown> = {};

      valueKeys.forEach((key) => {
        optionMap[key] = optionInfoMap.get(key);
      });

      return optionMap;
    };

    const updateSelectedOption = (valueKeys: string[]) => {
      selectedOptionMap.value = getRawOptionFromValueKeys(valueKeys);
    };

    const getFallBackOption = (value: SelectOptionValue): SelectOptionData => {
      if (isFunction(props.fallbackOption)) {
        return props.fallbackOption(value);
      }

      return {
        [mergedFieldNames.value.value]: value,
        [mergedFieldNames.value.label]: String(isObject(value) ? value[valueKey.value] : value),
      };
    };

    const shouldAppendExtraValue = (
      keyArray: string[],
      optionKey: string,
      optionValue: SelectOptionValue,
    ) => {
      if (keyArray.includes(optionKey) || optionValue === '') {
        return false;
      }

      const optionInfo = optionInfoMap.get(optionKey);
      return !optionInfo || optionInfo.origin === 'extraOptions';
    };

    const appendExtraValue = (
      valueArray: OptionValueWithKey[],
      keyArray: string[],
      option: OptionValueWithKey,
    ) => {
      valueArray.push(option);
      keyArray.push(option.key);
    };

    const getExtraValueData = (): OptionValueWithKey[] => {
      const valueArray: OptionValueWithKey[] = [];
      const keyArray: string[] = [];

      if (props.allowCreate || props.fallbackOption) {
        for (const item of computedValueObjects.value) {
          if (shouldAppendExtraValue(keyArray, item.key, item.value)) {
            appendExtraValue(valueArray, keyArray, item);
          }
        }
      }

      if (props.allowCreate && computedInputValue.value) {
        const createdOption = {
          value: computedInputValue.value,
          key: getKeyFromValue(computedInputValue.value),
        };

        if (shouldAppendExtraValue(keyArray, createdOption.key, createdOption.value)) {
          appendExtraValue(valueArray, keyArray, createdOption);
        }
      }

      return valueArray;
    };

    const extraValueObjects = ref<OptionValueWithKey[]>([]);
    const extraOptions = computed<SelectOptionData[]>(() =>
      extraValueObjects.value.map((item) => {
        let optionInfo = getFallBackOption(item.value);
        const extraOptionRawInfo = selectedOptionMap.value[item.key];

        if (!isUndefined(extraOptionRawInfo) && !isEmptyObject(extraOptionRawInfo)) {
          optionInfo = { ...optionInfo, ...(extraOptionRawInfo as Record<string, unknown>) };
        }

        return optionInfo;
      }),
    );

    nextTick(() => {
      watchEffect(() => {
        const valueData = getExtraValueData();
        if (valueData.length !== extraValueObjects.value.length) {
          extraValueObjects.value = valueData;
          return;
        }

        for (let index = 0; index < valueData.length; index += 1) {
          if (valueData[index].key !== extraValueObjects.value[index]?.key) {
            extraValueObjects.value = valueData;
            break;
          }
        }
      });
    });

    const _inputValue = ref(props.defaultInputValue);
    const computedInputValue = computed(() => props.inputValue ?? _inputValue.value);

    watch(computedPopupVisible, (visible) => {
      if (!visible && !retainInputValue.value && computedInputValue.value) {
        updateInputValue('');
      }
    });

    const getValueFromValueKeys = (valueKeys: string[]): SelectModelValue => {
      if (!props.multiple) {
        return (
          optionInfoMap.get(valueKeys[0])?.value ??
          (hasEmptyStringKey(optionInfoMap) ? (undefined as unknown as string) : '')
        );
      }

      return valueKeys.map((key) => optionInfoMap.get(key)?.value ?? '');
    };

    const updateValue = (valueKeys: string[]) => {
      const nextValue = getValueFromValueKeys(valueKeys);
      _value.value = nextValue;
      emit('update:modelValue', nextValue);
      emit('update:value', nextValue);
      emit('change', nextValue);
      eventHandlers.value?.onChange?.();
      updateSelectedOption(valueKeys);
    };

    const updateInputValue = (inputValue: string) => {
      _inputValue.value = inputValue;
      emit('update:inputValue', inputValue);
      emit('inputValueChange', inputValue);
    };

    const handleMultipleSelect = (key: string, ev: Event) => {
      if (!computedValueKeys.value.includes(key)) {
        if (enabledOptionKeys.value.includes(key)) {
          if (props.limit > 0 && computedValueKeys.value.length >= props.limit) {
            const info = optionInfoMap.get(key);
            emit('exceedLimit', info?.value, ev);
          } else {
            updateValue(computedValueKeys.value.concat(key));
          }
        }
      } else {
        updateValue(computedValueKeys.value.filter((valueKeyItem) => valueKeyItem !== key));
      }

      if (!retainInputValue.value) {
        updateInputValue('');
      }
    };

    const handleSingleSelect = (key: string) => {
      if (key !== computedValueKeys.value[0]) {
        updateValue([key]);
      }

      if (retainInputValue.value) {
        const optionInfo = optionInfoMap.get(key);
        if (optionInfo) {
          updateInputValue(optionInfo.label);
        }
      }

      handlePopupVisibleChange(false);
    };

    const handleSelect = (key: string, ev: Event) => {
      if (props.multiple) {
        handleMultipleSelect(key, ev);
        return;
      }

      handleSingleSelect(key);
    };

    const handleSearch = debounce((value: string) => {
      emit('search', value);
    }, props.searchDelay);

    const handleInputValueChange = (inputValue: string) => {
      if (inputValue === computedInputValue.value) {
        return;
      }

      if (!computedPopupVisible.value) {
        handlePopupVisibleChange(true);
      }

      updateInputValue(inputValue);

      if (props.allowSearch) {
        handleSearch(inputValue);
      }
    };

    const handleRemove = (key: string) => {
      const optionInfo = optionInfoMap.get(key);
      updateValue(computedValueKeys.value.filter((currentKey) => currentKey !== key));
      emit('remove', optionInfo?.value);
    };

    const handleClear = (event: Event) => {
      event.stopPropagation();
      const newKeys = computedValueKeys.value.filter((key) => optionInfoMap.get(key)?.disabled);
      updateValue(newKeys);
      updateInputValue('');
      emit('clear', event);
    };

    const handleDropdownScroll = (event: Event) => {
      emit('dropdownScroll', event);
    };

    const handleDropdownReachBottom = (event: Event) => {
      emit('dropdownReachBottom', event);
    };

    const { validOptions, optionInfoMap, validOptionInfos, enabledOptionKeys, handleKeyDown } =
      useSelect({
        multiple,
        options,
        extraOptions,
        inputValue: computedInputValue,
        filterOption,
        showExtraOptions,
        component,
        valueKey,
        fieldNames,
        loading,
        popupVisible: computedPopupVisible,
        valueKeys: computedValueKeys,
        dropdownRef,
        optionRefs,
        virtualListRef,
        defaultActiveFirstOption,
        onSelect: handleSelect,
        onPopupVisibleChange: handlePopupVisibleChange,
      });

    const selectViewValue = computed<SelectViewValue[]>(() => {
      const result: SelectViewValue[] = [];

      for (const item of computedValueObjects.value) {
        const optionInfo = optionInfoMap.get(item.key);
        if (!optionInfo) {
          continue;
        }

        result.push({
          ...optionInfo,
          value: item.key,
          label:
            optionInfo.label ??
            String(isObject(item.value) ? item.value[valueKey.value] : item.value),
          closable: !optionInfo.disabled,
          tagProps: optionInfo.tagProps,
          option: optionInfo.raw,
        });
      }

      return result;
    });

    const getOptionContentFunc = (optionInfo: SelectOptionInfo) => {
      if (isFunction(slots.option)) {
        return () => slots.option?.({ data: optionInfo.raw });
      }

      return () => optionInfo.label;
    };

    const renderOption = (optionInfo: SelectOptionInfo | SelectOptionGroupInfo) => {
      if (isGroupOptionInfo(optionInfo)) {
        return (
          <OptGroup key={optionInfo.key} label={optionInfo.label}>
            {optionInfo.options.map((child) => renderOption(child))}
          </OptGroup>
        );
      }

      if (
        !isValidOption(optionInfo, {
          inputValue: computedInputValue.value,
          filterOption: filterOption.value,
        })
      ) {
        return null;
      }

      return (
        <Option
          v-slots={{
            default: getOptionContentFunc(optionInfo),
          }}
          ref={(refInstance: Element | ComponentPublicInstance | null) => {
            const element = (refInstance as (ComponentPublicInstance & { $el?: Element }) | null)
              ?.$el;
            if (element instanceof HTMLElement) {
              optionRefs.value[optionInfo.key] = element;
            }
          }}
          key={optionInfo.key}
          value={optionInfo.value}
          label={optionInfo.label}
          disabled={optionInfo.disabled}
          internal
        />
      );
    };

    const renderDropDown = () => (
      <SelectDropdown
        ref={dropdownRef}
        v-slots={{
          'default': () => [...(slots.default?.() ?? []), ...validOptions.value.map(renderOption)],
          'virtual-list': () => (
            <VirtualList
              {...props.virtualListProps}
              ref={virtualListRef}
              data={validOptions.value}
              v-slots={{
                item: ({ item }: { item: SelectOptionInfo | SelectOptionGroupInfo }) =>
                  renderOption(item),
              }}
            />
          ),
          'empty': slots.empty,
          'header': slots.header,
          'footer': slots.footer,
        }}
        loading={props.loading}
        empty={validOptionInfos.value.length === 0}
        virtualList={Boolean(props.virtualListProps)}
        scrollbar={props.scrollbar}
        showHeaderOnEmpty={props.showHeaderOnEmpty}
        showFooterOnEmpty={props.showFooterOnEmpty}
        onScroll={handleDropdownScroll}
        onReachBottom={handleDropdownReachBottom}
      />
    );

    const renderLabel = ({ data }: { data: SelectViewValue }) => {
      if (slots.label && data) {
        const optionData =
          (data.option as SelectOptionData | undefined) ??
          optionInfoMap.get(data.value as string)?.raw;
        if (optionData) {
          return slots.label({ data: optionData });
        }
      }

      return data.label ?? '';
    };

    const renderTag = ({ data }: { data: SelectViewValue }) => {
      const optionData =
        (data.option as SelectOptionData | undefined) ??
        optionInfoMap.get(data.value as string)?.raw;

      if (!optionData) {
        return renderLabel({ data });
      }

      return slots.tag?.({ data: optionData }) ?? renderLabel({ data });
    };

    expose({
      focus: () => selectViewRef.value?.focus?.(),
      blur: () => selectViewRef.value?.blur?.(),
    });

    return () => (
      <Trigger
        v-slots={{ content: renderDropDown }}
        trigger="click"
        position="bl"
        popupOffset={4}
        animationName="slide-dynamic-origin"
        hideEmpty
        preventFocus
        autoFitPopupWidth
        autoFitTransformOrigin
        disabled={mergedDisabled.value}
        popupVisible={computedPopupVisible.value}
        unmountOnClose={props.unmountOnClose}
        clickToClose={!(props.allowSearch || props.allowCreate)}
        popupContainer={props.popupContainer}
        onPopupVisibleChange={handlePopupVisibleChange}
        {...props.triggerProps}
      >
        {slots.trigger?.() ?? (
          <SelectView
            ref={selectViewRef}
            v-slots={{
              'label': renderLabel,
              'tag': renderTag,
              'prefix': slots.prefix,
              'arrow-icon': slots['arrow-icon'],
              'loading-icon': slots['loading-icon'],
              'search-icon': slots['search-icon'],
            }}
            class={prefixCls}
            modelValue={selectViewValue.value}
            inputValue={computedInputValue.value}
            multiple={props.multiple}
            disabled={mergedDisabled.value}
            error={mergedError.value}
            loading={props.loading}
            allowClear={mergedAllowClear.value}
            allowCreate={props.allowCreate}
            allowSearch={Boolean(props.allowSearch)}
            showArrow={props.showArrow}
            opened={computedPopupVisible.value}
            maxTagCount={props.maxTagCount}
            placeholder={props.placeholder}
            bordered={props.bordered}
            size={mergedSize.value}
            tagNowrap={props.tagNowrap}
            // @ts-ignore
            onInputValueChange={handleInputValueChange}
            onRemove={handleRemove}
            onClear={handleClear}
            onKeydown={handleKeyDown}
            {...attrs}
          />
        )}
      </Trigger>
    );
  },
});
