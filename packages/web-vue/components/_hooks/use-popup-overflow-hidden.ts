import { toRefs, watchEffect } from 'vue';

interface PopupOverflowHiddenProps {
  container: HTMLElement | undefined;
  hidden: boolean;
}

export default function usePopupOverflowHidden(
  props: PopupOverflowHiddenProps
) {
  const { container, hidden } = toRefs(props);

  let needResetContainerStyle = false;
  let originContainerStyle: Partial<CSSStyleDeclaration> = {};

  const getScrollBarWidth = (element: HTMLElement) => {
    return element.tagName === 'BODY'
      ? window.innerWidth -
          (document.body.clientWidth || document.documentElement.clientWidth)
      : element.offsetWidth - element.clientWidth;
  };

  const setContainerStyle = () => {
    if (container.value && container.value.style.overflow !== 'hidden') {
      const originStyle = container.value.style;
      needResetContainerStyle = true;

      // Record and set the width
      const containerScrollBarWidth = getScrollBarWidth(container.value);
      if (containerScrollBarWidth) {
        originContainerStyle.width = originStyle.width;
        container.value.style.width = `calc(${
          container.value.style.width || '100%'
        } - ${containerScrollBarWidth}px)`;
      }

      // Record and set overflow
      originContainerStyle.overflow = originStyle.overflow;
      container.value.style.overflow = 'hidden';
    }
  };

  const resetContainerStyle = () => {
    if (container.value && needResetContainerStyle) {
      const originStyle = originContainerStyle;
      Object.keys(originStyle).forEach((i) => {
        // @ts-ignore-next-line
        container.value.style[i] = originStyle[i];
      });
    }
    needResetContainerStyle = false;
    originContainerStyle = {};
  };

  watchEffect((onInvalidate) => {
    hidden.value ? setContainerStyle() : resetContainerStyle();

    onInvalidate(() => {
      resetContainerStyle();
    });
  });

  return [resetContainerStyle, setContainerStyle];
}
