import type { InjectionKey } from 'vue';

export interface TriggerContext {
  onMouseenter: () => void;
  onMouseleave: () => void;
  onFocusin: () => void;
  onFocusout: () => void;
  addChildRef: (ref: any) => void;
  removeChildRef: (ref: any) => void;
}

export const triggerInjectionKey: InjectionKey<TriggerContext> =
  Symbol('ArcoTrigger');
