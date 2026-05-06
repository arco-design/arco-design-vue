export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface HSVA extends HSV {
  a: number;
}

export interface GradientColorPoint {
  id: string;
  left: number;
  color: string;
  hsva: HSVA;
}

export type ColorMode = 'monochrome' | 'linear-gradient';

export interface ColorValueState {
  mode: ColorMode;
  hsva: HSVA;
  gradientDegree: number;
  gradientSelectedId: string;
  gradientColors: GradientColorPoint[];
}

export interface Color {
  hsv: HSV;
  rgb: RGB;
  hex: string;
}

export type LegacyFormat = 'hex' | 'rgb';

export type ColorFormat =
  | 'HEX'
  | 'HEX8'
  | 'RGB'
  | 'RGBA'
  | 'HSL'
  | 'HSLA'
  | 'HSV'
  | 'HSVA'
  | 'CMYK'
  | 'CSS';

export type RecentColorsValue = string[] | boolean | null;

export type ColorModes = ColorMode[];

export type ColorPickerChangeTrigger =
  | 'palette-saturation-brightness'
  | 'palette-saturation'
  | 'palette-brightness'
  | 'palette-hue-bar'
  | 'palette-alpha-bar'
  | 'input'
  | 'preset'
  | 'recent'
  | 'clear';

export interface ColorObject {
  alpha: number;
  css: string;
  hex: string;
  hex8: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  rgb: string;
  rgba: string;
  saturation: number;
  value: number;
  isGradient: boolean;
  linearGradient?: string;
  red: number;
  green: number;
  blue: number;
}
