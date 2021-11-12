import { toRefs, VNode, cloneVNode, watch } from 'vue';
import { ItemSlot, InternalDataItem } from '../interface';

export function useRenderChildren(props: {
  internalData: InternalDataItem[];
  visibleData: InternalDataItem[];
  itemRef: (el: HTMLElement, key: string) => void;
  itemRender: ItemSlot;
}) {
  const { internalData, visibleData, itemRender, itemRef } = toRefs(props);
  let itemRenderCache: { [index: number]: VNode } = {};

  const internalItemRender = (item: unknown, index: number) => {
    if (!Object.prototype.hasOwnProperty.call(itemRenderCache, index)) {
      [itemRenderCache[index]] = itemRender.value({ item, index });
    }
    return itemRenderCache[index];
  };

  const findElement = (node: any) => {
    let res = (node?.$el ?? node) as HTMLElement | undefined;
    while (res && !res.tagName) {
      res = res.nextSibling as HTMLElement;
    }
    return res;
  };

  const renderChildren = () => {
    const children = visibleData.value.map(({ item, index, key }) => {
      const node = internalItemRender(item, index);
      return cloneVNode(
        node,
        {
          key,
          ref: (el) => {
            const dom = findElement(el);
            if (dom) {
              itemRef.value(dom, key);
            }
          },
        },
        true
      );
    });
    return children;
  };

  watch([internalData, itemRender], () => {
    itemRenderCache = {};
  });

  return renderChildren;
}
