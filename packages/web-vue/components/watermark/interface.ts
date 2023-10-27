export interface WatermarkFont {
  /**
   * @zh 字体颜色
   * @en Font color
   * @defaultValue rgba(0, 0, 0, 0.15)
   */
  color?: string;
  /**
   * @zh 字体大小
   * @en Font size
   * @defaultValue 16
   */
  fontSize?: number;
  /**
   * @zh 字体类型
   * @en Font family
   * @defaultValue sans-serif
   */
  fontFamily?: string;
  /**
   * @zh 字体样式
   * @en Font style
   * @defaultValue normal
   */
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  /**
   * @zh 字体对齐方式
   * @en Font align
   * @defaultValue center
   */
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
  /**
   * @zh 字体粗细
   * @en Font weight
   * @defaultValue normal
   */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}
