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
   * @zh 自动开启虚拟滚动的元素数量阈值，传入 null 表示禁止虚拟滚动
   * @en Threshold for the number of elements that automatically turn on virtual scrolling, passing in null means that virtual scrolling is prohibited
   */
  threshold?: number | null;
  /**
   * @zh 元素高度是否是固定的
   * @en Is the element height fixed
   */
  isStaticItemHeight?: boolean;
  estimatedItemHeight?: number;
  data?: unknown[];
  itemKey?: string;
  component?: keyof HTMLElementTagNameMap;
}

export type ScrollOptions =
  | number
  | { index?: number; key?: VirtualItemKey; align?: 'auto' | 'top' | 'bottom' };

export interface VirtualListRef {
  scrollTo: (options: ScrollOptions) => void;
}
