import { VNode } from 'vue';
import { isArray, isUndefined } from '../_utils/is';
import { Option, OptionInfo } from '../_components/dropdown/interface';
import { TagData } from '../input-tag/interface';
import {
  getChildrenString,
  isArrayChildren,
  isNamedComponent,
  isSlotsChildren,
  resolveProps,
} from '../_utils/vue-utils';

export const travelSelectChildren = (children: VNode[]): Option[] => {
  const options: Option[] = [];

  for (const child of children) {
    if (isNamedComponent(child, 'Optgroup')) {
      let groupOptions: Option[] = [];

      if (isSlotsChildren(child, child.children)) {
        const _children = child.children.default?.();
        if (_children) {
          groupOptions = travelSelectChildren(_children);
        }
      } else if (isArrayChildren(child, child.children)) {
        groupOptions = travelSelectChildren(child.children);
      }

      const props = resolveProps(child);

      options.push({
        ...props,
        isGroup: true,
        label: props.label,
        options: groupOptions,
      });
    } else if (isNamedComponent(child, 'Option')) {
      let childrenString = '';
      let render;
      if (isSlotsChildren(child, child.children) && child.children.default) {
        childrenString = getChildrenString(child.children.default());
        render = child.children.default;
      }

      const props = resolveProps(child);

      options.push({
        ...props,
        value: props.value ?? childrenString,
        label: props.label ?? childrenString,
        render,
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

const getValueData = (
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

export const getValueDataFromModelValue = (
  modelValue: string | number | Array<string | number>,
  optionInfoMap: Map<string | number, OptionInfo>
) => {
  if (isArray(modelValue)) {
    const result = [];
    for (const item of modelValue) {
      const valueData = getValueData(item, optionInfoMap);
      if (valueData) {
        result.push(valueData);
      }
    }
    return result;
  }
  return getValueData(modelValue, optionInfoMap);
};
