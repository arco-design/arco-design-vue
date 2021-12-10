import { computed, ref } from 'vue';

export const useTrigger = (props, { emit }) => {
  const _popupVisible = ref(props.defaultPopupVisible);
  const computedPopupVisible = computed(
    () => props.popupVisible ?? _popupVisible.value
  );

  const handlePopupVisibleChange = (visible: boolean) => {
    _popupVisible.value = visible;
    emit('update:popupVisible', visible);
    emit('popupVisibleChange', visible);
  };

  return {
    _popupVisible,
    computedPopupVisible,
    handlePopupVisibleChange,
  };
};
