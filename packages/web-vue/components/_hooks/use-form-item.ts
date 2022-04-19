import { computed, inject, Ref, toRef } from 'vue';
import { FormItemContext, formItemInjectionKey } from '../form/context';
import { Size } from '../_utils/constant';

export const useFormItem = ({
  size,
  disabled,
  error,
  uninject,
}: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
  // private
  uninject?: boolean;
} = {}) => {
  const formItemCtx = !uninject
    ? inject(formItemInjectionKey, {} as FormItemContext)
    : ({} as FormItemContext);

  const mergedSize = computed(() => size?.value ?? formItemCtx.size);

  const mergedDisabled = computed(
    () => disabled?.value || formItemCtx.disabled
  );

  const mergedError = computed(() => error?.value || formItemCtx.error);

  const feedback = toRef(formItemCtx, 'feedback');
  const eventHandlers = toRef(formItemCtx, 'eventHandlers');

  return {
    formItemCtx,
    mergedSize,
    mergedDisabled,
    mergedError,
    feedback,
    eventHandlers,
  };
};
