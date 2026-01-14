import { InjectionKey } from 'vue';

export interface ColorPickerContext {
  isEmptyColor: boolean;
  formatValue: string | null;
  clearColor: boolean;
  defaultRgba: () => {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
}

export const colorPickerInjectionKey: InjectionKey<ColorPickerContext> =
  Symbol('ArcoColorPicker');
