import { VNode } from 'vue';

export type VirtualItemKey = string | number;

export interface InternalDataItem {
  key: VirtualItemKey;
  index: number;
  item: unknown;
}

export type ItemSlot = (props: { item: unknown; index: number }) => VNode[];

export interface ScrollIntoViewOptions {
  index?: number;
  key?: VirtualItemKey;
  align: 'auto' | 'top' | 'bottom';
}

export interface VirtualListProps {
  /**
   * @zh 可视区域高度
   * @en Viewable area height
   */
  height: number | string;
  /**
   * @zh （已废除）自动开启虚拟滚动的元素数量阈值，传入 null 表示禁止虚拟滚动。2.34.1 版本废除
   * @en (Repealed) Threshold for the number of elements that automatically turn on virtual scrolling, passing in null means that virtual scrolling is prohibited. Version 2.18.0 deprecated
   */
  threshold?: number | null;
  /**
   * @zh （已废除）元素高度是否是固定的。2.34.1 版本废除，请使用 `fixedSize`
   * @en (Repealed) Is the element height fixed. Version 2.18.0 deprecated, please use `fixedSize`
   */
  isStaticItemHeight?: boolean;
  /**
   * @zh 元素高度是否是固定的。
   * @en Is the element height fixed.
   * @version 2.34.1
   */
  fixedSize?: boolean;
  /**
   * @zh 元素高度不固定时的预估高度。
   * @en Is the element height fixed.
   * @version 2.34.1
   */
  estimatedSize?: number;
  /**
   * @zh 视口边界外提前挂载的元素数量。
   * @en The number of elements mounted in advance outside the boundary of the viewport.
   * @defaultValue 10
   * @version 2.34.1
   */
  buffer?: number;
  data?: unknown[];
  itemKey?: string | ((item: unknown) => VirtualItemKey);
  component?: keyof HTMLElementTagNameMap;
}

export type ScrollOptions =
  | number
  | { index?: number; key?: VirtualItemKey; align?: 'auto' | 'top' | 'bottom' };

export interface VirtualListRef {
  scrollTo: (options: ScrollOptions) => void;
}
