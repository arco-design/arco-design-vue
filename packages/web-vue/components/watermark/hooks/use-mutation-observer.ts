import {
  unref,
  watch,
  getCurrentScope,
  onScopeDispose,
  Ref,
  ComponentPublicInstance,
} from 'vue';

export const defaultWindow = typeof window !== 'undefined' ? window : undefined;

export interface MutationObserverOptions extends MutationObserverInit {
  window?: Window;
}

export type MaybeRef<T> = T | Ref<T>;
export type MaybeElement =
  | HTMLElement
  | SVGElement
  | ComponentPublicInstance
  | undefined
  | null;
export type UnRefElementReturn<T extends MaybeElement = MaybeElement> =
  T extends ComponentPublicInstance
    ? Exclude<MaybeElement, ComponentPublicInstance>
    : T | undefined;

export type Fn = () => void;

export function unrefElement<T extends MaybeElement>(
  elRef: MaybeRef<T>
): UnRefElementReturn<T> {
  const plain = unref(elRef);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}

export function tryOnScopeDispose(fn: Fn): boolean {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

export function useMutationObserver(
  target: MaybeRef<MaybeElement>,
  callback: MutationCallback,
  options: MutationObserverOptions = {}
) {
  const { window = defaultWindow, ...mutationOptions } = options;
  const isSupported = window && 'MutationObserver' in window;
  let observer: MutationObserver | undefined;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();

      if (isSupported && window && el) {
        observer = new MutationObserver(callback);
        observer.observe(el, mutationOptions);
      }
    },
    { immediate: true }
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
  };
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>;
