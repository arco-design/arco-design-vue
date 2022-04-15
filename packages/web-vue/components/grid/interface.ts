export interface ResponsiveValue {
  /**
   * @zh >= 1600px 响应式配置
   * @en >= 1600px responsive configuration
   */
  xxl?: number;
  /**
   * @zh >= 1200px 响应式配置
   * @en >= 1200px responsive configuration
   */
  xl?: number;
  /**
   * @zh >= 992px 响应式配置
   * @en >= 992px responsive configuration
   */
  lg?: number;
  /**
   * @zh >= 768px 响应式配置
   * @en >= 768px responsive configuration
   */
  md?: number;
  /**
   * @zh >= 576px 响应式配置
   * @en >= 576px responsive configuration
   */
  sm?: number;
  /**
   * @zh < 576px 响应式配置
   * @en <576px responsive configuration
   */
  xs?: number;
}

export type FlexType = number | string | 'initial' | 'auto' | 'none';

export interface RowProps {
  gutter?: number | ResponsiveValue | ResponsiveValue[];
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
  align?: 'start' | 'center' | 'end' | 'stretch';
  div?: boolean;
  wrap?: boolean;
}

export interface ColProps {
  span?: number;
  offset?: number | undefined;
  order?: number | undefined;
  xs?: number | { [key: string]: any } | undefined;
  sm?: number | { [key: string]: any } | undefined;
  md?: number | { [key: string]: any } | undefined;
  lg?: number | { [key: string]: any } | undefined;
  xl?: number | { [key: string]: any } | undefined;
  xxl?: number | { [key: string]: any } | undefined;
  flex?: number | string | 'initial' | 'auto' | 'none' | undefined;
}

export interface GridProps {
  cols?: number | ResponsiveValue;
  rowGap?: number | ResponsiveValue;
  colGap?: number | ResponsiveValue;
  collapsed?: boolean;
  collapsedRows?: number;
}

export interface GridItemProps {
  span?: number | ResponsiveValue;
  offset?: number | ResponsiveValue;
  suffix?: boolean;
}

export interface GridItemData extends GridItemProps {
  span: number;
  offset: number;
}
