import { Fragment, VNode } from 'vue';
import { isNamedComponent, PatchFlags } from '../../_utils/vue-utils';
import { GridItemProps, GridItemVNode, GridItemData } from '../interface';

export function getGridItemChildren(children: VNode[]) {
  let ret: GridItemVNode[] = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === Fragment) {
      if (child.patchFlag & PatchFlags.KEYED_FRAGMENT) keyedFragmentCount++;
      ret = ret.concat(getGridItemChildren(child.children as VNode[]));
    } else if (isNamedComponent(child, 'GridItem')) {
      ret.push(child as any);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = PatchFlags.BAIL;
    }
  }
  return ret;
}

export function resolveItemData(
  cols: number,
  props: Partial<GridItemProps>
): GridItemProps {
  const originSpan = props.span ?? 1;
  const originOffset = props.offset ?? 0;
  const offset = Math.min(originOffset, cols);
  const span = Math.min(
    offset > 0 ? originSpan + originOffset : originSpan,
    cols
  );
  return {
    span,
    offset,
    suffix: 'suffix' in props ? props.suffix !== false : false,
  };
}

export function setItemVisible({
  cols,
  collapsed,
  collapsedRows,
  itemData,
}: {
  cols: number;
  collapsed: boolean;
  collapsedRows: number;
  itemData: GridItemData[];
}) {
  let overflow = false;
  const displayList: number[] = [];

  function isOverflow(span: number) {
    return Math.ceil(span / cols) > collapsedRows;
  }

  if (collapsed) {
    let spanSum = 0;

    for (let i = 0; i < itemData.length; i++) {
      if (itemData[i].suffix) {
        spanSum += itemData[i].span;
        displayList.push(i);
      }
    }

    if (!isOverflow(spanSum)) {
      let current = 0;
      while (current < itemData.length) {
        const item = itemData[current];

        if (!item.suffix) {
          spanSum += item.span;

          if (isOverflow(spanSum)) {
            break;
          }

          displayList.push(current);
        }

        current++;
      }
    }

    overflow = itemData.some(
      (item, index) => !item.suffix && !displayList.includes(index)
    );
  }

  return {
    overflow,
    displayItemData: collapsed
      ? itemData.map((item, index) => ({
          ...item,
          visible: displayList.includes(index),
        }))
      : itemData,
  };
}
