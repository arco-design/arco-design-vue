import { Fragment, isVNode, VNode, Component, Slots } from 'vue';
import { isArray } from '../../_utils/is';
import { ShapeFlags } from '../../_utils/vue-utils';

export function isFragmentChildren(children: VNode[]) {
  return (
    isArray(children) && children.length === 1 && children[0].type === Fragment
  );
}

export function isVNodeComponent(vNode: VNode) {
  return !!(isVNode(vNode) && vNode.shapeFlag & ShapeFlags.COMPONENT);
}

export function isArrayChildren(vNode: VNode) {
  return !!(isVNode(vNode) && vNode.shapeFlag & ShapeFlags.ARRAY_CHILDREN);
}

export function isSlotChildren(vNode: VNode) {
  return !!isVNode(vNode) && vNode.shapeFlag & ShapeFlags.SLOTS_CHILDREN;
}

export function isChildrenSelected(
  children: VNode[] | undefined,
  keys: string[]
): boolean {
  if (!isArray(children) || !children.length) return false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNodeComponent(child)) {
      const { name } = child.type as Component;
      if (name === 'MenuItem' || name === 'SubMenu') {
        if (keys.includes(child.key as any)) {
          return true;
        }
      }
      if (name === 'MenuItem') {
        continue;
      }
    }

    if (isSlotChildren(child)) {
      const _children = (child.children as Slots).default?.();
      if (isChildrenSelected(_children, keys)) {
        return true;
      }
    }

    if (
      isArrayChildren(child) &&
      isChildrenSelected(child.children as VNode[], keys)
    ) {
      return true;
    }
  }

  return false;
}
