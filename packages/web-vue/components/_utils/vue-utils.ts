import type {
  Component,
  Slot,
  Slots,
  VNode,
  VNodeTypes,
  VNodeArrayChildren,
  ComponentPublicInstance,
  RenderFunction,
} from 'vue';
import { createVNode, cloneVNode, Fragment, isVNode } from 'vue';
import { Data, RenderContent } from './types';
import { isArray, isFunction, isNumber, isObject, isString } from './is';
import { toCamelCase, toKebabCase } from './convert-case';

// Quoted from vue-next
// https://github.com/vuejs/vue-next/blob/master/packages/shared/src/shapeFlags.ts
export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
}

// Quoted from vue-next
// https://github.com/vuejs/vue-next/blob/master/packages/shared/src/patchFlags.ts
export enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  DEV_ROOT_FRAGMENT = 2048,
  HOISTED = -1,
  BAIL = -2,
}

export const getValueFromSlotsOrProps = (
  name: string,
  props?: Data,
  slots?: Slots
) => {
  if (slots?.[name]) {
    return slots[name];
  }
  if (props?.[name]) {
    return () => props[name];
  }
  return undefined;
};

export const isComponentInstance = (
  value: any
): value is ComponentPublicInstance => {
  return value?.$ !== undefined;
};

export const isElement = (vn: VNode) => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT);
};

export const isComponent = (
  vn: VNode,
  type?: VNodeTypes
): type is Component => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT);
};

export const isText = (
  vn: VNode,
  children: VNode['children']
): children is string => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.TEXT_CHILDREN);
};

export const isNamedComponent = (child: VNode, name: string) => {
  return isComponent(child, child.type) && child.type.name === name;
};

export const isTextChildren = (
  child: VNode,
  children: VNode['children']
): children is string => {
  return Boolean(child && child.shapeFlag & 8);
};

export const isArrayChildren = (
  vn: VNode,
  children: VNode['children']
): children is VNode[] => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
};

export const isSlotsChildren = (
  vn: VNode,
  children: VNode['children']
): children is Slots => {
  return Boolean(vn && vn.shapeFlag & ShapeFlags.SLOTS_CHILDREN);
};

export const getChildrenString = (children: VNode[]): string => {
  let text = '';
  for (const child of children) {
    if (isString(child) || isNumber(child)) {
      text += String(child);
    } else if (isTextChildren(child, child.children)) {
      text += child.children;
    } else if (isArrayChildren(child, child.children)) {
      text += getChildrenString(child.children);
    } else if (isSlotsChildren(child, child.children)) {
      const _children = child.children.default?.();
      if (_children) {
        text += getChildrenString(_children);
      }
    }
  }

  return text;
};

export const getVNodeChildrenString = (vn: VNode): string => {
  if (isText(vn, vn.children)) {
    return vn.children;
  }
  // Used to splice the content of sub-components and return the text of all sub-components
  let text = '';
  if (isArrayChildren(vn, vn.children)) {
    for (const child of vn.children) {
      text += getVNodeChildrenString(child);
    }
  } else if (isSlotsChildren(vn, vn.children)) {
    const children = vn.children.default?.() ?? [];
    for (const child of children) {
      text += getVNodeChildrenString(child);
    }
  }
  return text;
};

export const getChildrenFunc = (vn: VNode): RenderFunction | undefined => {
  if (isTextChildren(vn, vn.children) || isArrayChildren(vn, vn.children)) {
    return (() => vn.children) as RenderFunction;
  }
  if (isSlotsChildren(vn, vn.children)) {
    return vn.children.default;
  }
  return undefined;
};

export const getChildrenTextOrSlot = (vn: VNode): string | Slot | undefined => {
  if (isText(vn, vn.children)) {
    return vn.children;
  }
  if (isSlotsChildren(vn, vn.children)) {
    const children = vn.children.default?.();
    // 如果slot的内容是文字，优先返回字符串
    if (children && children.length === 1) {
      const child = children[0];
      if (isTextChildren(child, child.children)) {
        return child.children;
      }
    }
    return vn.children.default;
  }
  if (isArrayChildren(vn, vn.children)) {
    if (vn.children.length === 1) {
      const child = vn.children[0];
      if (isTextChildren(child, child.children)) {
        return child.children;
      }
    }
    return () => vn.children as VNode[];
  }
  return undefined;
};

export const getFirstComponent = (children: VNode[]): VNode | undefined => {
  if (!children) {
    return undefined;
  }

  for (const child of children) {
    if (isElement(child) || isComponent(child)) {
      return child;
    }
    // If the current node is not a component, continue to find subcomponents
    if (isArrayChildren(child, child.children)) {
      const result = getFirstComponent(child.children);
      if (result) return result;
    } else if (isSlotsChildren(child, child.children)) {
      const children = child.children.default?.();
      if (children) {
        const result = getFirstComponent(children);
        if (result) return result;
      }
    } else if (isArray(child)) {
      const result = getFirstComponent(child);
      if (result) return result;
    }
  }

  return undefined;
};

/**
 * Used to get the number of specified components in children
 * @param vNodes
 * @param componentName
 */
export const getComponentNumber = (vNodes: VNode[], componentName: string) => {
  let count = 0;
  for (const item of vNodes) {
    if (isComponent(item, item.type) && item.type.name === componentName) {
      count++;
    } else if (isArrayChildren(item, item.children)) {
      count += getComponentNumber(item.children, componentName);
    }
  }
  return count;
};

export const foreachComponent = (
  children: VNode[],
  name: string,
  cb: (node: VNode) => void
) => {
  for (const item of children) {
    if (isComponent(item, item.type) && item.type.name === name) {
      cb(item);
    }
    if (isArrayChildren(item, item.children)) {
      foreachComponent(item.children, name, cb);
    }
  }
};

export const isEmptyChildren = (children?: VNode[]) => {
  if (!children) {
    return true;
  }

  for (const item of children) {
    if (item.children) {
      return false;
    }
  }

  return true;
};

export const getChildrenComponents = (
  children: VNode[],
  name: string,
  props?: Data | ((node: VNode, index: number) => Data),
  startIndex = 0
): VNode[] => {
  const result = [];
  for (const item of children) {
    if (isNamedComponent(item, name)) {
      if (props) {
        const index: number = startIndex + result.length;
        const extraProps = isFunction(props) ? props(item, index) : props;
        result.push(cloneVNode(item, extraProps, true));
      } else {
        result.push(item);
      }
    } else if (isArrayChildren(item, item.children)) {
      result.push(
        ...getChildrenComponents(item.children, name, props, result.length)
      );
    } else if (isSlotsChildren(item, item.children)) {
      const defaultChildren = item.children.default?.() ?? [];
      result.push(
        ...getChildrenComponents(defaultChildren, name, props, result.length)
      );
    }
  }
  return result;
};

export const mergeFirstChild = (
  vns: VNode[],
  extraProps: Data | ((vn: VNode) => Data)
): boolean => {
  for (let i = 0; i < vns.length; i++) {
    const child = vns[i];
    if (isElement(child) || isComponent(child)) {
      const props = isFunction(extraProps) ? extraProps(child) : extraProps;

      vns[i] = cloneVNode(child, props, true);
      return true;
    }
    if (isArrayChildren(child, child.children)) {
      const result = mergeFirstChild(child.children, extraProps);
      if (result) return true;
    } else if (isSlotsChildren(child, child.children)) {
      const children = child.children.default?.() ?? [];
      const result = mergeFirstChild(children, extraProps);
      if (result) {
        vns[i] = createVNode(child, null, { default: () => children });
        return true;
      }
    }
  }
  return false;
};

/**
 * Get the value of boolean type prop
 * @param value
 */
export const getBooleanProp = (value: string | boolean | undefined) => {
  return !!(value || isString(value));
};

export const getRenderFunc = (content: RenderContent) => {
  if (isFunction(content)) {
    return content;
  }
  return () => content;
};

export const getAllElements = (vns: VNode[] | undefined) => {
  const results: VNode[] = [];
  for (const vn of vns ?? []) {
    if (isElement(vn) || isComponent(vn) || isTextChildren(vn, vn.children)) {
      results.push(vn);
    } else if (isArrayChildren(vn, vn.children)) {
      results.push(...getAllElements(vn.children));
    } else if (isSlotsChildren(vn, vn.children)) {
      results.push(...getAllElements(vn.children.default?.()));
    }
  }
  return results;
};

/**
 * Remove Fragment
 * @param nodeList
 */
export function unFragment(nodeList: VNode[]) {
  function loop(nodes: VNodeArrayChildren) {
    const unFragmentNodeList: VNodeArrayChildren = [];

    nodes.forEach((node) => {
      if (isVNode(node) && node.type === Fragment) {
        if (isSlotsChildren(node, node.children)) {
          // RowSlots
          unFragmentNodeList.push(...loop(node.children.default?.() || []));
        } else if (isArrayChildren(node, node.children)) {
          // VNodeArrayChildren
          unFragmentNodeList.push(...loop(node.children));
        } else if (isString(node.children)) {
          // string
          unFragmentNodeList.push(node.children);
        }
      } else {
        unFragmentNodeList.push(node);
      }
    });

    return unFragmentNodeList;
  }

  return loop(nodeList);
}

export const resolveProps = (vn: VNode) => {
  const props: Data = {};
  // @ts-ignore
  const options = vn.type?.props ?? {};
  for (const key of Object.keys(vn.props ?? {})) {
    const rawValue = vn.props?.[key];
    const camelKey = toCamelCase(key);
    let resolveValue = rawValue;
    if (rawValue === '' || rawValue === toKebabCase(camelKey)) {
      const type = isObject(options[camelKey])
        ? options[camelKey].type
        : options[camelKey];
      if (type === Boolean) {
        resolveValue = true;
      }
    }
    props[camelKey] = resolveValue;
  }
  return props;
};
