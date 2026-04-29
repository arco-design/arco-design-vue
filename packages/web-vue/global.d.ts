/// <reference types="vitest/globals" />

import type { NativeElements, ReservedProps, VNode } from '@vue/runtime-dom';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // oxlint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  namespace JSX {
    export type Element = VNode;
    export interface ElementClass {
      // oxlint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      $props: {};
    }
    export interface ElementAttributesProperty {
      // oxlint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      $props: {};
    }
    export interface IntrinsicElements extends NativeElements {
      [name: string]: any;
    }
    export type IntrinsicAttributes = ReservedProps;
  }
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.md' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}

declare module 'b-tween';
declare module 'clean-css';
