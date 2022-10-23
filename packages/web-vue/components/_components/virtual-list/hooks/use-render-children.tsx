import { toRefs, VNode, cloneVNode, watch } from 'vue';
import { ItemSlot, InternalDataItem, VirtualItemKey } from '../interface';

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
  events: {
    onItemResize?: (height: HTMLElement, key: VirtualItemKey) => void;
  } = {}
) {
  const { internalData, visibleData, itemRender } = toRefs(props);
  const itemRenderCache: Map<VirtualItemKey, VNode> = new Map();

  const renderChildren = () => {
    return visibleData.value.map(({ item, index, key }) => {
      if (!itemRenderCache.has(key)) {
        const [node] = itemRender.value({ item, index });
        let dom: HTMLElement | undefined;
        const resizeHandler = () => {
          if (dom) {
            events.onItemResize?.(dom, key);
          }
        };
        itemRenderCache.set(
          key,
          cloneVNode(node, {
            key,
            ref: (el) => {
              if (!dom) {
                dom = findElement(el);
              }
            },
            onVnodeMounted() {
              resizeHandler();
            },
            onVnodeUpdated() {
              resizeHandler();
            },
          })
        );
      }
      return itemRenderCache.get(key);
    });
  };

  watch([internalData, itemRender], () => {
    itemRenderCache.clear();
  });

  return renderChildren;
}
