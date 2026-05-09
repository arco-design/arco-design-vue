import type {
  Elements as OverlayScrollbarElements,
  EventListener,
  EventListenerArgs,
  EventListeners,
  InstancePlugin,
  OnUpdatedEventListenerArgs,
  Options as OverlayScrollbarOptions,
  PartialOptions as OverlayScrollbarPartialOptions,
  ReadonlyOptions as OverlayScrollbarReadonlyOptions,
  State as OverlayScrollbarState,
} from 'overlayscrollbars';

import type { CSSProperties } from 'vue';

export type ScrollbarType = 'track' | 'embed';

export type ScrollbarOptions = OverlayScrollbarPartialOptions;
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
  updateOptions?: OverlayScrollbarPartialOptions['update'];
  overflow?: OverlayScrollbarPartialOptions['overflow'];
  scrollbars?: OverlayScrollbarPartialOptions['scrollbars'];
  overlayOptions?: OverlayScrollbarPartialOptions;
  events?: EventListeners;
}

export interface ScrollbarExpose {
  options(): OverlayScrollbarOptions | undefined;
  options(
    newOptions: OverlayScrollbarPartialOptions,
    pure?: boolean,
  ): OverlayScrollbarOptions | undefined;
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
    options(newOptions: OverlayScrollbarPartialOptions, pure?: boolean): OverlayScrollbarOptions;
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
