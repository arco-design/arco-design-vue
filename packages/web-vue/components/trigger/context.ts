import type { ComponentPublicInstance, InjectionKey } from 'vue';

export interface TriggerContext {
  onMouseenter: (ev: MouseEvent) => void;
  onMouseleave: (ev: MouseEvent) => void;
  addChildRef: (ref: HTMLElement | ComponentPublicInstance) => void;
  removeChildRef: (ref: HTMLElement | ComponentPublicInstance) => void;
}

export const triggerInjectionKey: InjectionKey<TriggerContext> = Symbol('SDTrigger');
