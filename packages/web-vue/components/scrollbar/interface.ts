import type {
  Elements as OverlayScrollbarElements,
  EventListener,
  EventListenerArgs,
  EventListeners,
  InstancePlugin,
  OnUpdatedEventListenerArgs,
  OverflowBehavior,
  Options as OverlayScrollbarOptions,
  PartialOptions as OverlayScrollbarPartialOptions,
  ReadonlyOptions as OverlayScrollbarReadonlyOptions,
  ScrollbarsAutoHideBehavior,
  ScrollbarsVisibilityBehavior,
  State as OverlayScrollbarState,
} from 'overlayscrollbars';

import type { CSSProperties } from 'vue';

export type ScrollbarType = 'track' | 'embed';

export interface ScrollbarClickScrollBehaviorOptions {
  clickScrollDistance: number;
  clickScrollDuration: number;
  clickPressDelay: number;
  pressDistanceDuration: number;
}

export type ScrollbarClickScrollBehavior =
  | boolean
  | 'instant'
  | ((
      isHorizontal: boolean,
    ) => Partial<ScrollbarClickScrollBehaviorOptions> | false | null | undefined | void);

export type ScrollbarUpdateDebounceValue =
  | [
      timeout?: number | false | null | undefined,
      maxWait?: number | false | null | undefined,
      leading?: boolean | null | undefined,
    ]
  | number
  | false
  | null;

export interface ScrollbarUpdateOptions {
  elementEvents?: Array<[elementSelector: string, eventNames: string]> | null;
  debounce?:
    | {
        mutation?: ScrollbarUpdateDebounceValue;
        resize?: ScrollbarUpdateDebounceValue;
        event?: ScrollbarUpdateDebounceValue;
        env?: ScrollbarUpdateDebounceValue;
      }
    | ScrollbarUpdateDebounceValue;
  attributes?: string[] | null;
  ignoreMutation?: ((mutation: MutationRecord) => boolean) | null;
  flowDirectionStyles?: ((viewport: HTMLElement) => Record<string, unknown>) | null;
}

export interface ScrollbarOverflowOptions {
  x?: OverflowBehavior;
  y?: OverflowBehavior;
}

export interface ScrollbarScrollbarsOptions {
  theme?: string | null;
  visibility?: ScrollbarsVisibilityBehavior;
  autoHide?: ScrollbarsAutoHideBehavior;
  autoHideDelay?: number;
  autoHideSuspend?: boolean;
  dragScroll?: boolean;
  clickScroll?: ScrollbarClickScrollBehavior;
  pointers?: string[] | null;
}

export interface ScrollbarOptions {
  paddingAbsolute?: OverlayScrollbarPartialOptions['paddingAbsolute'];
  showNativeOverlaidScrollbars?: OverlayScrollbarPartialOptions['showNativeOverlaidScrollbars'];
  update?: ScrollbarUpdateOptions;
  overflow?: ScrollbarOverflowOptions;
  scrollbars?: ScrollbarScrollbarsOptions;
}

export type ScrollbarOptionsResolved = OverlayScrollbarOptions;
export type ScrollbarReadonlyOptions = OverlayScrollbarReadonlyOptions;
export type ScrollbarEventListeners = EventListeners;
export type ScrollbarEventListenerArgs = EventListenerArgs;
export type ScrollbarEventListener<Name extends keyof EventListenerArgs> = EventListener<Name>;
export type ScrollbarUpdatedEvent = OnUpdatedEventListenerArgs;
export type ScrollbarElements = OverlayScrollbarElements;
export type ScrollbarState = OverlayScrollbarState;
export type ScrollbarPlugin = InstancePlugin;

export interface ScrollbarProps {
  type?: ScrollbarType;
  outerClass?: string | Record<string, any> | unknown[];
  outerStyle?: CSSProperties | CSSProperties[];
  paddingAbsolute?: OverlayScrollbarPartialOptions['paddingAbsolute'];
  showNativeOverlaidScrollbars?: OverlayScrollbarPartialOptions['showNativeOverlaidScrollbars'];
  updateOptions?: ScrollbarUpdateOptions;
  overflow?: ScrollbarOverflowOptions;
  scrollbars?: ScrollbarScrollbarsOptions;
  overlayOptions?: ScrollbarOptions;
  events?: EventListeners;
}

export interface ScrollbarExpose {
  options(): OverlayScrollbarOptions | undefined;
  options(newOptions: ScrollbarOptions, pure?: boolean): OverlayScrollbarOptions | undefined;
  on(eventListeners: EventListeners, pure?: boolean): (() => void) | undefined;
  on<Name extends keyof EventListenerArgs>(
    name: Name,
    listener: EventListener<Name>,
  ): (() => void) | undefined;
  on<Name extends keyof EventListenerArgs>(
    name: Name,
    listener: EventListener<Name>[],
  ): (() => void) | undefined;
  off<Name extends keyof EventListenerArgs>(name: Name, listener: EventListener<Name>): void;
  off<Name extends keyof EventListenerArgs>(name: Name, listener: EventListener<Name>[]): void;
  update(force?: boolean): boolean;
  sleep(sleeping: boolean): void;
  state(): OverlayScrollbarState | undefined;
  elements(): OverlayScrollbarElements | undefined;
  destroy(): void;
  plugin<P extends InstancePlugin>(osPlugin: P): unknown;
  scrollTo(options?: number | { left?: number; top?: number }, y?: number): void;
  scrollTop(top: number): void;
  scrollLeft(left: number): void;
  getOSInstance(): {
    options(): OverlayScrollbarOptions;
    options(newOptions: ScrollbarOptions, pure?: boolean): OverlayScrollbarOptions;
    on(eventListeners: EventListeners, pure?: boolean): () => void;
    on<Name extends keyof EventListenerArgs>(name: Name, listener: EventListener<Name>): () => void;
    on<Name extends keyof EventListenerArgs>(
      name: Name,
      listener: EventListener<Name>[],
    ): () => void;
    off<Name extends keyof EventListenerArgs>(name: Name, listener: EventListener<Name>): void;
    off<Name extends keyof EventListenerArgs>(name: Name, listener: EventListener<Name>[]): void;
    update(force?: boolean): boolean;
    sleep(sleeping: boolean): void;
    state(): OverlayScrollbarState;
    elements(): OverlayScrollbarElements;
    destroy(): void;
    plugin<P extends InstancePlugin>(osPlugin: P): unknown;
  } | null;
}
