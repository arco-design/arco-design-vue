import { Slots, VNode } from 'vue';
import {
  getChildrenString,
  isArrayChildren,
  isNamedComponent,
  isSlotsChildren,
  resolveProps,
} from '../_utils/vue-utils';
import { DropdownOption, DGroup, DSubmenu } from './interface';
import { isObject } from '../_utils/is';

export const isGroup = (option: DropdownOption): option is DGroup => {
  return isObject(option) && 'isGroup' in option;
};

export const isSubmenu = (option: DropdownOption): option is DSubmenu => {
  return isObject(option) && 'isSubmenu' in option;
};

export const travelDropDownChildren = (children: VNode[]): DropdownOption[] => {
  const options: DropdownOption[] = [];

  for (const child of children) {
    if (isNamedComponent(child, 'Dgroup')) {
      const props = resolveProps(child);

      options.push({
        _props: props,
        isGroup: true,
        render: (child.children as Slots).title ?? (() => props.title),
      });

      if (isSlotsChildren(child, child.children)) {
        const _children = child.children.default?.();
        if (_children) {
          options.push(...travelDropDownChildren(_children));
        }
      } else if (isArrayChildren(child, child.children)) {
        options.push(...travelDropDownChildren(child.children));
      }
    } else if (isNamedComponent(child, 'Doption')) {
      const props = resolveProps(child);

      options.push({
        _props: props,
        value:
          props.value ??
          getChildrenString((child.children as Slots).default?.() ?? []),
        disabled: props.disabled,
        render: (child.children as Slots).default,
        icon: (child.children as Slots).icon,
      });
    } else if (isNamedComponent(child, 'Dsubmenu')) {
      const props = resolveProps(child);

      options.push({
        _props: props,
        isSubmenu: true,
        value:
          props.value ??
          getChildrenString((child.children as Slots).default?.() ?? []),
        disabled: props.disabled,
        render: (child.children as Slots).default,
        children: travelDropDownChildren(
          (child.children as Slots).content?.() ?? []
        ),
        footer: (child.children as Slots).footer,
      });
    } else if (isArrayChildren(child, child.children)) {
      options.push(...travelDropDownChildren(child.children));
    } else if (isSlotsChildren(child, child.children)) {
      const _children = child.children.default?.();
      if (_children) {
        options.push(...travelDropDownChildren(_children));
      }
    }
  }

  return options;
};
