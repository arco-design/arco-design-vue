import { onMounted, Ref, ref, watch } from 'vue';

import { getElement } from '../_utils/dom';

export const useTeleportContainer = ({
  popupContainer,
  visible,
  defaultContainer = 'body',
  documentContainer,
}: {
  popupContainer: Ref<string | HTMLElement | null | undefined>;
  visible: Ref<boolean>;
  defaultContainer?: string;
  documentContainer?: boolean;
}) => {
  const teleportContainer = ref(popupContainer.value);
  const containerRef = ref<HTMLElement>();

  const getContainer = () => {
    const resolvedPopupContainer = popupContainer.value ?? undefined;
    const element = getElement(resolvedPopupContainer);
    const _teleportContainer = element ? resolvedPopupContainer : defaultContainer;
    const _containerElement =
      element ?? (documentContainer ? document.documentElement : getElement(defaultContainer));
    if (_teleportContainer !== teleportContainer.value) {
      teleportContainer.value = _teleportContainer;
    }
    if (_containerElement !== containerRef.value) {
      containerRef.value = _containerElement;
    }
  };

  onMounted(() => getContainer());

  watch([popupContainer, visible], ([nextPopupContainer, nextVisible]) => {
    if (!nextVisible) {
      return;
    }

    if (teleportContainer.value !== nextPopupContainer) {
      getContainer();
    }
  });

  return {
    teleportContainer,
    containerRef,
  };
};
