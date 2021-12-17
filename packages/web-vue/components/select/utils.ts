import { Slot, Slots, VNode } from 'vue';
import { isArray, isUndefined } from '../_utils/is';
import { Option, OptionInfo } from './interface';
import { TagData } from '../input-tag/interface';
import {
  getChildrenString,
  isArrayChildren,
  isNamedComponent,
  isSlotsChildren,
  resolveProps,
} from '../_utils/vue-utils';
import { omit } from '../_utils/omit';

export const travelSelectChildren = (children: VNode[]): Option[] => {
  const options: Option[] = [];

  for (const child of children) {
    if (isNamedComponent(child, 'Optgroup')) {
      const props = resolveProps(child);
      let slots: Slots | undefined;
      let groupOptions: Option[] = [];

      if (isSlotsChildren(child, child.children)) {
        slots = child.children;
        if (child.children.default) {
          groupOptions = travelSelectChildren(child.children.default());
        }
      } else if (isArrayChildren(child, child.children)) {
        groupOptions = travelSelectChildren(child.children);
      }

      options.push({
        isGroup: true,
        label: props.label,
        options: groupOptions,
        _props: props,
        _slots: slots,
      });
    } else if (isNamedComponent(child, 'Option')) {
      const props = resolveProps(child);
      let slots: Slots | undefined;
      let childrenString = '';
      let render: Slot | undefined;

      if (isSlotsChildren(child, child.children)) {
        slots = child.children;
        if (child.children.default) {
          render = child.children.default;
          childrenString = getChildrenString(child.children.default());
        }
      }

      options.push({
        ...props.extra,
        value: props.value ?? childrenString,
        label: props.label ?? childrenString,
        render,
        disabled: props.disabled,
        tagProps: props.tagProps,
        _props: omit(props, ['tagProps', 'extra']),
        _slots: slots,
      });
    } else if (isArrayChildren(child, child.children)) {
      options.push(...travelSelectChildren(child.children));
    } else if (isSlotsChildren(child, child.children)) {
      const _children = child.children.default?.();
      if (_children) {
        options.push(...travelSelectChildren(_children));
      }
    }
  }

  return options;
};

const getTagData = (
  value: string | number | undefined,
  optionInfoMap: Map<string | number, OptionInfo>
): TagData | undefined => {
  if (isUndefined(value)) {
    return undefined;
  }

  const optionInfo = optionInfoMap.get(value);

  if (!optionInfo) {
    return undefined;
  }

  return {
    ...optionInfo,
    label: optionInfo.label,
    closable: !optionInfo.disabled,
  };
};

export const getTagDataFromModelValue = (
  modelValue: string | number | Array<string | number>,
  optionInfoMap: Map<string | number, OptionInfo>
) => {
  if (isArray(modelValue)) {
    const result = [];
    for (const item of modelValue) {
      const valueData = getTagData(item, optionInfoMap);
      if (valueData) {
        result.push(valueData);
      }
    }
    return result;
  }
  return getTagData(modelValue, optionInfoMap);
};
