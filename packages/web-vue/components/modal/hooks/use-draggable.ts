import { Ref, ref } from 'vue';
import { off, on } from '../../_utils/dom';

export const useDraggable = ({
  modalRef,
  wrapperRef,
  draggable,
}: {
  modalRef: Ref<HTMLElement | undefined>;
  wrapperRef: Ref<HTMLElement | undefined>;
  draggable: Ref<boolean>;
}) => {
  const isDragging = ref(false);
  const startMouse = ref([0, 0]);
  const diffMouse = ref([0, 0]);

  const initialPosition = ref([0, 0]);

  const position = ref<[number, number]>();

  const maxPosition = ref<[number, number]>([0, 0]);

  const getInitialPosition = () => {
    if (wrapperRef.value && modalRef.value) {
      const {
        top: wrapperTop,
        left: wrapperLeft,
        width: wrapperWidth,
        height: wrapperHeight,
      } = wrapperRef.value.getBoundingClientRect();
      const { top, left, width, height } =
        modalRef.value.getBoundingClientRect();

      const initialX = left - wrapperLeft;
      const initialY = top - wrapperTop;
      if (
        initialX !== initialPosition.value?.[0] ||
        initialY !== initialPosition.value?.[1]
      ) {
        initialPosition.value = [initialX, initialY];
      }
      const maxX = wrapperWidth - width;
      const maxY = wrapperHeight - height;
      if (maxX !== maxPosition.value[0] || maxY !== maxPosition.value[1]) {
        maxPosition.value = [maxX, maxY];
      }
    }
  };

  const handleMoveDown = (ev: MouseEvent) => {
    if (draggable.value) {
      ev.preventDefault();

      isDragging.value = true;
      getInitialPosition();
      startMouse.value = [ev.x, ev.y];
      diffMouse.value = [0, 0];
      on(window, 'mousemove', handleMouseMove);
      on(window, 'mouseup', handleMouseUp);
      on(window, 'contextmenu', handleMouseUp);
    }
  };

  const handleMouseMove = (ev: MouseEvent) => {
    if (isDragging.value) {
      const diffX = ev.x - startMouse.value[0];
      const diffY = ev.y - startMouse.value[1];

      let x = initialPosition.value[0] + diffX;
      let y = initialPosition.value[1] + diffY;
      if (x < 0) x = 0;
      // eslint-disable-next-line prefer-destructuring
      if (x > maxPosition.value[0]) x = maxPosition.value[0];
      if (y < 0) y = 0;
      // eslint-disable-next-line prefer-destructuring
      if (y > maxPosition.value[1]) y = maxPosition.value[1];

      position.value = [x, y];
    }
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    off(window, 'mousemove', handleMouseMove);
    off(window, 'mouseup', handleMouseUp);
  };

  return {
    position,
    handleMoveDown,
  };
};
