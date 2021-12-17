import type { InjectionKey } from 'vue';

export interface TriggerContext {
  onMouseenter: (ev: MouseEvent) => void;
  onMouseleave: (ev: MouseEvent) => void;
  addChildRef: (ref: any) => void;
  removeChildRef: (ref: any) => void;
}

export const triggerInjectionKey: InjectionKey<TriggerContext> =
  Symbol('ArcoTrigger');
