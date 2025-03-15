import type { NativeElements, ReservedProps, VNode } from '@vue/runtime-dom';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  namespace JSX {
    export type Element = VNode;
    export interface ElementClass {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      $props: {};
    }
    export interface ElementAttributesProperty {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
      $props: {};
    }
    export interface IntrinsicElements extends NativeElements {
      [name: string]: any;
    }
    export type IntrinsicAttributes = ReservedProps;
  }
}

declare module '*.less';
