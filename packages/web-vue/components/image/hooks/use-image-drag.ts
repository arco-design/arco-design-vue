import { nextTick, ref, toRefs, watch, watchEffect } from 'vue';
import { off, on } from '../../_utils/dom';
import getFixTranslate from '../utils/get-fix-translate';

interface ImageDragProps {
  wrapperEl: HTMLElement;
  imageEl: HTMLElement;
  scale: number;
}

export default function useImageDrag(props: ImageDragProps) {
  const { wrapperEl, imageEl, scale } = toRefs(props);

  const translate = ref([0, 0]);

  const moving = ref(false);

  let startPageX = 0;
  let startPageY = 0;
  let startTranslate = [0, 0];

  // Check and correct the offset
  const checkAndFixTranslate = () => {
    if (!wrapperEl.value || !imageEl.value) return;
    const wrapperRect = wrapperEl.value.getBoundingClientRect();
    const imgRect = imageEl.value.getBoundingClientRect();
    const [x, y] = getFixTranslate(
      wrapperRect,
      imgRect,
      translate.value[0],
      translate.value[1],
      scale.value
    );
    if (x !== translate.value[0] || y !== translate.value[1]) {
      translate.value = [x, y];
    }
  };

  // Picture is moving: calculate and update displacement
  const onMoving = (e: MouseEvent) => {
    e.preventDefault && e.preventDefault();
    const nextX = startTranslate[0] + (e.pageX - startPageX) / scale.value;
    const nextY = startTranslate[1] + (e.pageY - startPageY) / scale.value;
    translate.value = [nextX, nextY];
  };

  // Picture ends moving
  const onMoveEnd = (e: MouseEvent) => {
    e.preventDefault && e.preventDefault();
    moving.value = false;
    checkAndFixTranslate();
    offEvents();
  };

  // Grab the picture and start moving: record the initial data
  const onMoveStart = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault && e.preventDefault();
    moving.value = true;

    startPageX = e.pageX;
    startPageY = e.pageY;
    startTranslate = [...translate.value];

    on(window, 'mousemove', onMoving as any, false);
    on(window, 'mouseup', onMoveEnd as any, false);
  };

  function offEvents() {
    off(window, 'mousemove', onMoving as any, false);
    off(window, 'mouseup', onMoveEnd as any, false);
  }

  // Initialization, each time the image changes will be re-initialized
  watchEffect((onInvalidate) => {
    imageEl.value && on(imageEl.value, 'mousedown', onMoveStart as any);

    onInvalidate(() => {
      imageEl.value && off(imageEl.value, 'mousedown', onMoveStart as any);
      offEvents();
    });
  });

  // scale to correct the offset
  watch([scale], () => {
    nextTick(() => checkAndFixTranslate());
  });

  return {
    translate,
    moving,
    resetTranslate() {
      translate.value = [0, 0];
    },
  };
}
