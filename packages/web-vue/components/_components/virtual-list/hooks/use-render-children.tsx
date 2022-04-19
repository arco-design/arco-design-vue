import { toRefs, VNode, cloneVNode, watch } from 'vue';
import { ItemSlot, InternalDataItem, Key } from '../interface';

const findElement = (node: any) => {
  let res = (node?.$el ?? node) as HTMLElement | undefined;
  while (res && !res.tagName) {
    res = res.nextSibling as HTMLElement;
  }
  return res;
};

export function useRenderChildren(
  props: {
    internalData: InternalDataItem[];
    visibleData: InternalDataItem[];
    itemRender: ItemSlot;
  },
  events: { onItemResize?: (height: HTMLElement, key: Key) => void } = {}
) {
  const { internalData, visibleData, itemRender } = toRefs(props);
  let itemRenderCache: { [key: Key]: VNode } = {};

  const renderChildren = () => {
    return visibleData.value.map(({ item, index, key }) => {
      if (!Object.prototype.hasOwnProperty.call(itemRenderCache, key)) {
        const [node] = itemRender.value({ item, index });
        let dom: HTMLElement | undefined;
        let hasMounted = false;
        let hasUpdated = false;
        const resizeHandler = () => {
          if (dom) {
            events.onItemResize?.(dom, key);
          }
        };
        itemRenderCache[key] = cloneVNode(node, {
          key,
          ref: (el) => {
            if (!hasMounted) {
              dom = findElement(el);
              resizeHandler();
              hasMounted = true;
            }
          },
          onVnodeUpdated() {
            if (!hasUpdated) {
              resizeHandler();
              hasUpdated = true;
            }
          },
        });
      }
      return itemRenderCache[key];
    });
  };

  watch([internalData, itemRender], () => {
    itemRenderCache = {};
  });

  return renderChildren;
}
