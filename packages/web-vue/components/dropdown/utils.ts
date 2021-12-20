import { Slots, VNode } from 'vue';
import {
  getChildrenString,
  isArrayChildren,
  isNamedComponent,
  isSlotsChildren,
  resolveProps,
} from '../_utils/vue-utils';
import { DropdownOption, DGroup, DSubmenu } from './interface';
import { isArray, isObject } from '../_utils/is';
import { omit } from '../_utils/omit';

export const isGroup = (option: DropdownOption): option is DGroup => {
  return isObject(option) && 'isGroup' in option;
};

export const isSubmenu = (option: DropdownOption): option is DSubmenu => {
  return isObject(option) && 'isSubmenu' in option;
};

export const travelDropDownChildren = (children: VNode[]): DropdownOption[] => {
  const options: DropdownOption[] = [];

  for (const child of children) {
    if (!child) continue;
    if (isNamedComponent(child, 'Dgroup')) {
      const props = resolveProps(child);
      let slots: Slots | undefined;
      const _options = [];

      if (isSlotsChildren(child, child.children)) {
        slots = child.children;
        if (child.children.default) {
          _options.push(...travelDropDownChildren(child.children.default()));
        }
      } else if (isArrayChildren(child, child.children)) {
        _options.push(...travelDropDownChildren(child.children));
      }

      options.push({
        _props: omit(props, ['title']),
        _slots: slots,
        isGroup: true,
        title: props.title,
        options: _options,
      });
    } else if (isNamedComponent(child, 'Doption')) {
      const props = resolveProps(child);
      let slots: Slots | undefined;
      if (isSlotsChildren(child, child.children)) {
        slots = child.children;
      }

      options.push({
        _props: props,
        _slots: slots,
        value:
          props.value ??
          getChildrenString((child.children as Slots).default?.() ?? []),
        disabled: props.disabled,
      });
    } else if (isNamedComponent(child, 'Dsubmenu')) {
      const props = resolveProps(child);

      options.push({
        _props: omit(props, ['trigger', 'position', 'triggerProps']),
        isSubmenu: true,
        value:
          props.value ??
          getChildrenString((child.children as Slots).default?.() ?? []),
        disabled: props.disabled,
        footer: (child.children as Slots).footer,
        render: (child.children as Slots).default,
        trigger: props.trigger,
        position: props.position,
        children: travelDropDownChildren(
          (child.children as Slots).content?.() ?? []
        ),
      });
    } else if (isArrayChildren(child, child.children)) {
      options.push(...travelDropDownChildren(child.children));
    } else if (isSlotsChildren(child, child.children)) {
      const _children = child.children.default?.();
      if (_children) {
        options.push(...travelDropDownChildren(_children));
      }
    } else if (isArray(child)) {
      options.push(...travelDropDownChildren(child));
    }
  }

  return options;
};
