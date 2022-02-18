import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import type { EmitFn } from '../_utils/types';

export const useTrigger = ({
  popupVisible,
  defaultPopupVisible,
  emit,
}: {
  popupVisible?: Ref<boolean | undefined>;
  defaultPopupVisible?: Ref<boolean>;
  emit: EmitFn<'update:popupVisible' | 'popupVisibleChange'>;
}) => {
  const _popupVisible = ref(defaultPopupVisible?.value ?? false);
  const computedPopupVisible = computed(
    () => popupVisible?.value ?? _popupVisible.value
  );

  const handlePopupVisibleChange = (visible: boolean) => {
    if (visible !== _popupVisible.value) {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    }
  };

  return {
    _popupVisible,
    computedPopupVisible,
    handlePopupVisibleChange,
  };
};
