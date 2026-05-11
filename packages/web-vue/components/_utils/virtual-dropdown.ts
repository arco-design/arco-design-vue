import type { VirtualListProps } from '../_components/virtual-list/interface';
import type { TriggerProps } from '../trigger';

export const DEFAULT_VIRTUAL_DROPDOWN_HEIGHT = '200px';

export function resolveDropdownVirtualListProps(
  virtualListProps?: VirtualListProps,
  triggerProps?: Pick<TriggerProps, 'popupStyle'>,
  defaultItemSize?: number,
): VirtualListProps | undefined {
  if (!virtualListProps) {
    return undefined;
  }

  const nextVirtualListProps: VirtualListProps = {
    ...virtualListProps,
  };

  if (
    nextVirtualListProps.itemSize === undefined &&
    nextVirtualListProps.minItemSize === undefined
  ) {
    if (defaultItemSize !== undefined) {
      nextVirtualListProps.itemSize = defaultItemSize;
    }
  }

  if (nextVirtualListProps.height !== undefined) {
    return nextVirtualListProps;
  }

  const popupStyle = triggerProps?.popupStyle;
  const fallbackHeight =
    popupStyle?.maxHeight ?? popupStyle?.height ?? DEFAULT_VIRTUAL_DROPDOWN_HEIGHT;

  return {
    ...nextVirtualListProps,
    height: fallbackHeight,
  };
}
