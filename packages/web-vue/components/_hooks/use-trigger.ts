import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import type { EmitFn2 } from '../_utils/types';

export const useTrigger = ({
  popupVisible,
  defaultPopupVisible,
  emit,
}: {
  popupVisible?: Ref<boolean | undefined>;
  defaultPopupVisible?: Ref<boolean>;
  emit: EmitFn2<{
    'update:popupVisible': (visible: boolean) => true;
    'popupVisibleChange': (visible: boolean) => true;
  }>;
}) => {
  const _popupVisible = ref(defaultPopupVisible?.value ?? false);
  const computedPopupVisible = computed(
    () => popupVisible?.value ?? _popupVisible.value
  );

  const handlePopupVisibleChange = (visible: boolean) => {
    if (visible !== computedPopupVisible.value) {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    }
  };

  watch(computedPopupVisible, (visible) => {
    if (_popupVisible.value !== visible) {
      _popupVisible.value = visible;
    }
  });

  return {
    computedPopupVisible,
    handlePopupVisibleChange,
  };
};
