import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';

export const useTrigger = ({
  popupVisible,
  defaultPopupVisible,
  show,
  defaultShow,
  emit,
}: {
  popupVisible?: Ref<boolean | undefined>;
  defaultPopupVisible?: Ref<boolean>;
  show?: Ref<boolean | undefined>;
  defaultShow?: Ref<boolean | undefined>;
  emit: (
    event: 'update:popupVisible' | 'popupVisibleChange' | 'update:show' | 'showChange',
    visible: boolean,
  ) => void;
}) => {
  const _popupVisible = ref(defaultPopupVisible?.value ?? defaultShow?.value ?? false);
  const computedPopupVisible = computed(
    () => popupVisible?.value ?? show?.value ?? _popupVisible.value,
  );

  const handlePopupVisibleChange = (visible: boolean) => {
    if (visible !== computedPopupVisible.value) {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
      emit('update:show', visible);
      emit('showChange', visible);
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
