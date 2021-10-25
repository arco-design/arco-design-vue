import { toRefs, computed, ComputedRef } from 'vue';
import { querySelector } from '../_utils/dom';
import { isString } from '../_utils/is';

interface PopupContainerProps {
  popupContainer: string | HTMLElement | undefined;
}
export default function usePopupContainer(
  defaultPopupContainer: HTMLElement,
  props: PopupContainerProps
) {
  const { popupContainer } = toRefs(props);

  const container = computed(
    () =>
      (isString(popupContainer.value)
        ? querySelector(popupContainer.value)
        : popupContainer.value) || defaultPopupContainer
  );

  return container as ComputedRef<HTMLElement>;
}
