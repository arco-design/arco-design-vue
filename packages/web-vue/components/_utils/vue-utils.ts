import type {
  Component,
  Slot,
  Slots,
  VNode,
  VNodeTypes,
  VNodeArrayChildren,
} from 'vue';
import {
  cloneVNode,
  ComponentPublicInstance,
  mergeProps,
  Fragment,
  isVNode,
} from 'vue';
import { Data, RenderContent } from './types';
import { isFunction, isString } from './is';

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

export const getValueFromSlotsOrProps = (
  name: string,
  props: Data,
  slots: Slots
) => {
  if (slots[name]) {
    return slots[name];
  }
  if (props[name]) {
    return () => props[name];
  }
  return undefined;
};

export const isComponentInstance = (
  value: any
): value is ComponentPublicInstance => {
  return value?.$ !== undefined;
};

export const isElement = (child: VNode) => {
  return child && child.shapeFlag & 1;
};

export const isComponent = (
  child: VNode,
  type?: VNodeTypes
): type is Component => {
  return Boolean(child && child.shapeFlag & 6);
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
  child: VNode,
  children: VNode['children']
): children is VNode[] => {
  return Boolean(child && child.shapeFlag & 16);
};

export const isSlotsChildren = (
  child: VNode,
  children: VNode['children']
): children is Slots => {
  return Boolean(child && child.shapeFlag & 32);
};

export const getVNodeChildrenString = (vn: VNode): string => {
  if (isTextChildren(vn, vn.children)) {
    return vn.children;
  }
  // Used to splice the content of sub-components and return the text content of all sub-components
  let text = '';
  if (isArrayChildren(vn, vn.children)) {
    for (const child of vn.children) {
      text += getVNodeChildrenString(child);
    }
  } else if (isSlotsChildren(vn, vn.children)) {
    const children = vn.children.default?.();
    if (children) {
      for (const child of children) {
        text += getVNodeChildrenString(child);
      }
    }
  }
  return text;
};

export const getChildrenTextOrSlot = (
  vNode: VNode
): string | Slot | undefined => {
  if (isTextChildren(vNode, vNode.children)) {
    return vNode.children;
  }
  if (isSlotsChildren(vNode, vNode.children)) {
    const children = vNode.children.default?.();
    // 如果slot的内容是文字，优先返回字符串
    if (children && children.length === 1) {
      const child = children[0];
      if (isTextChildren(child, child.children)) {
        return child.children;
      }
    }
    return vNode.children.default;
  }
  if (isArrayChildren(vNode, vNode.children)) {
    if (vNode.children.length === 1) {
      const child = vNode.children[0];
      if (isTextChildren(child, child.children)) {
        return child.children;
      }
    }
    return () => vNode.children as VNode[];
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

export const mergePropsWithIndex = (
  vNodes: VNode[],
  componentName: string,
  mergedProps: (index: number) => Data,
  startIndex = 0
) => {
  let index = startIndex;
  for (const item of vNodes) {
    if (isComponent(item, item.type) && item.type.name === componentName) {
      item.props = mergeProps(item.props ?? {}, mergedProps(index));
      index++;
    } else if (isArrayChildren(item, item.children)) {
      index = mergePropsWithIndex(
        item.children,
        componentName,
        mergedProps,
        index
      );
    }
  }
  return index;
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
  props?: Data | ((node: VNode) => Data)
): VNode[] => {
  const result = [];
  for (const item of children) {
    if (isComponent(item, item.type) && item.type.name === name) {
      if (props) {
        const mergedProps = isFunction(props) ? props(item) : props;
        item.props = mergeProps(item.props ?? {}, mergedProps);
      }
      result.push(item);
    }
    if (isArrayChildren(item, item.children)) {
      result.push(...getChildrenComponents(item.children, name, props));
    }
  }
  return result;
};

export const mergeFirstChild = (
  children: VNode[],
  extraProps: Data | ((vn: VNode) => Data)
): boolean => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isElement(child) || isComponent(child)) {
      const props = isFunction(extraProps) ? extraProps(child) : extraProps;

      children[i] = cloneVNode(child, props, true);
      return true;
    }
    if (isArrayChildren(child, child.children)) {
      const result = mergeFirstChild(child.children, extraProps);
      if (result) return true;
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
