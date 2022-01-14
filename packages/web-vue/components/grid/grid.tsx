import { createVNode, FunctionalComponent } from 'vue';
import BaseGrid from './base-grid';
import BaseGridItem from './base-grid-item';
import { GridProps } from './interface';
import { setItemVisible, getGridItemChildren, resolveItemData } from './utils';

const Grid: FunctionalComponent<GridProps> = (props, { slots }) => {
  const cols = props.cols ?? 24;
  const collapsedRows = props.collapsedRows ?? 1;
  const colGap = props.colGap ?? 0;
  const itemList = slots.default ? getGridItemChildren(slots.default()) : [];
  const itemData = itemList.map((node) => ({
    ...resolveItemData(cols, node.props || {}),
    node,
  }));
  const { overflow, displayItemData } = setItemVisible({
    cols,
    collapsed: props.collapsed,
    collapsedRows,
    itemData,
  });

  return (
    <BaseGrid {...props} cols={cols} collapsedRows={collapsedRows}>
      {displayItemData.map((item) => {
        const { span, offset, node, visible } = item;
        const { scopeId, children, props, key } = node;
        const isVisible = visible !== false && span !== 0;
        return createVNode(
          { ...BaseGridItem, __scopeId: scopeId },
          {
            ...(props || {}),
            span,
            offset,
            key: key || undefined,
            style: isVisible ? {} : { display: 'none' },
            colGap,
            cols,
            overflow,
          },
          children
        );
      })}
    </BaseGrid>
  );
};

Grid.displayName = 'Grid';

export type { GridProps };
export { Grid };
