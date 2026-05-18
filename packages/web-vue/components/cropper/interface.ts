import type Cropper from 'cropperjs';
import type { CropperCanvas, CropperImage, CropperSelection } from 'cropperjs';

export interface CropperCanvasProps {
  /**
   * @zh 是否显示棋盘格背景
   * @en Whether to show the checkerboard background
   */
  background?: boolean;
  /**
   * @zh 是否禁用画布交互
   * @en Whether to disable canvas interaction
   */
  disabled?: boolean;
  /**
   * @zh 滚轮缩放步进
   * @en Wheel zoom step
   */
  scaleStep?: number;
  /**
   * @zh 主题色
   * @en Theme color
   */
  themeColor?: string;
}

export interface CropperImageProps {
  /**
   * @zh 图片初始居中尺寸模式
   * @en Initial centered image sizing mode
   */
  initialCenterSize?: 'contain' | 'cover';
  /**
   * @zh 是否允许旋转
   * @en Whether rotation is enabled
   */
  rotatable?: boolean;
  /**
   * @zh 是否允许缩放与翻转
   * @en Whether scaling and flipping are enabled
   */
  scalable?: boolean;
  /**
   * @zh 是否允许斜切
   * @en Whether skewing is enabled
   */
  skewable?: boolean;
  /**
   * @zh 是否允许平移
   * @en Whether translation is enabled
   */
  translatable?: boolean;
}

export interface CropperSelectionProps {
  /**
   * @zh 选区宽高比约束
   * @en Selection aspect ratio constraint
   */
  aspectRatio?: number;
  /**
   * @zh 初始宽高比
   * @en Initial aspect ratio
   */
  initialAspectRatio?: number;
  /**
   * @zh 初始覆盖率
   * @en Initial coverage
   */
  initialCoverage?: number;
  /**
   * @zh 是否跟随图片变换动态调整
   * @en Whether to keep selection in sync with image transforms
   */
  dynamic?: boolean;
  /**
   * @zh 是否可移动
   * @en Whether the selection can move
   */
  movable?: boolean;
  /**
   * @zh 是否可调整尺寸
   * @en Whether the selection can resize
   */
  resizable?: boolean;
  /**
   * @zh 是否支持滚轮缩放选区
   * @en Whether wheel zoom is enabled on selection
   */
  zoomable?: boolean;
  /**
   * @zh 是否启用键盘控制
   * @en Whether keyboard control is enabled
   */
  keyboard?: boolean;
  /**
   * @zh 是否显示轮廓
   * @en Whether the outline is visible
   */
  outlined?: boolean;
  /**
   * @zh 是否保留坐标和尺寸的小数精度
   * @en Whether to preserve decimal precision for coordinates and sizes
   */
  precise?: boolean;
}

export interface CropperSelectionChangeDetail {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropperImageTransformDetail {
  matrix: number[];
  oldMatrix: number[];
}

export interface CropperProps {
  /**
   * @zh 图片地址
   * @en Image source
   */
  src?: string;
  /**
   * @zh CropperCanvas 配置
   * @en CropperCanvas props
   */
  canvasProps?: CropperCanvasProps;
  /**
   * @zh CropperImage 配置
   * @en CropperImage props
   */
  imageProps?: CropperImageProps;
  /**
   * @zh CropperSelection 配置，不包含位置与尺寸控制
   * @en CropperSelection props without position and size controls
   */
  selectionProps?: CropperSelectionProps;
  /**
   * @zh 自定义 Cropper 内部模板
   * @en Custom cropper template
   */
  template?: string;
  /**
   * @zh 选区 x 坐标
   * @en Selection x position
   */
  selectionX?: number;
  /**
   * @zh 选区 y 坐标
   * @en Selection y position
   */
  selectionY?: number;
  /**
   * @zh 选区宽度
   * @en Selection width
   */
  selectionWidth?: number;
  /**
   * @zh 选区高度
   * @en Selection height
   */
  selectionHeight?: number;
  /**
   * @zh 容器宽度
   * @en Container width
   */
  width?: number | string;
  /**
   * @zh 容器高度
   * @en Container height
   */
  height?: number | string;
  /**
   * @zh 图片加载后是否自动让选区贴合图片可见区域
   * @en Whether to fit the selection to the visible image area after load
   */
  fitSelectionToImage?: boolean;
}

export interface CropperExpose {
  getInstance(): Cropper | null;
  getCropperCanvas(): CropperCanvas | null;
  getCropperImage(): CropperImage | null;
  getCropperSelection(): CropperSelection | null;
  getCropperSelections(): ReturnType<Cropper['getCropperSelections']> | null;
  destroy(): void;
}
