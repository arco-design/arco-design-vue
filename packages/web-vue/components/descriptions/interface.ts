import { RenderFunction, VNode } from 'vue';

export type DescData = {
  /**
   * @zh 标签
   * @en Label
   */
  label: string | RenderFunction;
  /**
   * @zh 数据
   * @en Data
   */
  value: string | RenderFunction;
  /**
   * @zh 所占列数
   * @en number of columns
   */
  span?: number;
};

export type DescLayout =
  | 'horizontal'
  | 'vertical'
  | 'inline-horizontal'
  | 'inline-vertical';

export interface DescItemData {
  index: number;
  span: number;
}

export interface RenderData {
  data: DescData | VNode;
  span: number;
}
