import type { App, RenderFunction } from 'vue';

export interface ArcoOptions {
  classPrefix?: string;
  componentPrefix?: string;
}

export interface ArcoIconOptions {
  iconPrefix?: string;
}

export interface ArcoGlobalConfig {
  classPrefix?: string;
}

export type BaseType = string | number;
export type Data = Record<string, any>;
export type RenderContent = string | RenderFunction;

export type EmitFn<T> = (event: T, ...args: any[]) => void;

export type EmitType<T> = T | T[];

export type SFCWithInstall<T, D = Record<string, never>> = T &
  D & {
    install: (app: App, opt?: ArcoOptions) => void;
  };

export type ClassName = string | Array<ClassName> | Record<string, boolean>;

export type FieldString<T> = {
  [K in keyof T]?: string;
};

export interface ValueData {
  value: string | number;
  label: string;
  closable?: boolean;

  [other: string]: any;
}

export type AnimationDuration =
  | number
  | {
      enter: number;
      leave: number;
    };
