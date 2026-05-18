<template>
  <div :class="rootClass" :style="rootStyle" v-bind="attrs">
    <img ref="imgRef" :src="props.src" alt="" :class="`${prefixCls}-source-image`" />
  </div>
</template>

<script setup lang="ts">
  import type Cropper from 'cropperjs';
  import type { CropperCanvas, CropperImage, CropperSelection } from 'cropperjs';
  import type { UnknownRecord } from 'type-fest';

  import type { CSSProperties } from 'vue';
  import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue';

  import { isNumber, isString } from 'es-toolkit';

  import type {
    CropperCanvasProps,
    CropperExpose,
    CropperImageProps,
    CropperProps,
    CropperSelectionChangeDetail,
    CropperSelectionProps,
  } from './interface';

  import { getPrefixCls } from '../_utils/global-config';

  defineOptions({
    name: 'Cropper',
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<CropperProps>(), {
    src: '',
    canvasProps: () => ({}),
    imageProps: () => ({}),
    selectionProps: () => ({}),
    template: undefined,
    selectionX: undefined,
    selectionY: undefined,
    selectionWidth: undefined,
    selectionHeight: undefined,
    width: '100%',
    height: '100%',
    fitSelectionToImage: true,
  });

  const emit = defineEmits<{
    /**
     * @zh 选区变化时触发
     * @en Emitted when the selection changes
     */
    'selection:change': [detail: CropperSelectionChangeDetail];
    /**
     * @zh 选区 x 坐标变化时触发
     * @en Emitted when the selection x changes
     */
    'update:selectionX': [value: number];
    /**
     * @zh 选区 y 坐标变化时触发
     * @en Emitted when the selection y changes
     */
    'update:selectionY': [value: number];
    /**
     * @zh 选区宽度变化时触发
     * @en Emitted when the selection width changes
     */
    'update:selectionWidth': [value: number];
    /**
     * @zh 选区高度变化时触发
     * @en Emitted when the selection height changes
     */
    'update:selectionHeight': [value: number];
    /**
     * @zh 画布 action 事件
     * @en Cropper canvas action event
     */
    'canvas:action': [detail: unknown];
    /**
     * @zh 画布 actionstart 事件
     * @en Cropper canvas actionstart event
     */
    'canvas:actionstart': [detail: unknown];
    /**
     * @zh 画布 actionmove 事件
     * @en Cropper canvas actionmove event
     */
    'canvas:actionmove': [detail: unknown];
    /**
     * @zh 画布 actionend 事件
     * @en Cropper canvas actionend event
     */
    'canvas:actionend': [detail: unknown];
    /**
     * @zh 图片变换时触发
     * @en Emitted when the cropper image transforms
     */
    'image:transform': [detail: { matrix: number[]; oldMatrix: number[] }];
  }>();

  type CropperEventListener = (event: Event) => void;
  type TrackedHandler = { el: Element; event: string; fn: CropperEventListener };

  const attrs = useAttrs();
  const prefixCls = getPrefixCls('cropper');
  const imgRef = ref<HTMLImageElement>();
  const trackedHandlers: TrackedHandler[] = [];

  let cropperInstance: Cropper | null = null;
  let cropperConstructorPromise: Promise<typeof import('cropperjs').default> | null = null;

  function loadCropperConstructor() {
    if (!cropperConstructorPromise) {
      cropperConstructorPromise = import('cropperjs').then((module) => module.default);
    }

    return cropperConstructorPromise;
  }

  const resolveSize = (value: number | string) => {
    if (isNumber(value)) {
      return `${value}px`;
    }
    if (isString(value)) {
      return value;
    }
    return '100%';
  };

  const rootClass = computed(() => [prefixCls]);
  const rootStyle = computed<CSSProperties>(() => ({
    '--sd-cropper-width': resolveSize(props.width),
    '--sd-cropper-height': resolveSize(props.height),
  }));

  function addTrackedListener(el: Element, event: string, fn: CropperEventListener) {
    el.addEventListener(event, fn);
    trackedHandlers.push({ el, event, fn });
  }

  function toKebabCase(key: string) {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  function syncPropsToElement(el: Element | null | undefined, propsObject: UnknownRecord) {
    if (!el) {
      return;
    }

    for (const [key, value] of Object.entries(propsObject)) {
      const attrName = toKebabCase(key);

      if (value === undefined || value === null || value === false) {
        el.removeAttribute(attrName);
        continue;
      }

      if (value === true) {
        el.setAttribute(attrName, '');
        continue;
      }

      el.setAttribute(attrName, String(value));
    }
  }

  function getCropperCanvas() {
    return cropperInstance?.getCropperCanvas() ?? null;
  }

  function getCropperImage() {
    return cropperInstance?.getCropperImage() ?? null;
  }

  function getCropperSelection() {
    return cropperInstance?.getCropperSelection() ?? null;
  }

  function getCropperSelections() {
    return cropperInstance?.getCropperSelections() ?? null;
  }

  function alignSelectionToImage() {
    const image = getCropperImage();
    const selection = getCropperSelection();
    const imageElement = imgRef.value;

    if (!image || !selection || !imageElement) {
      return;
    }

    const naturalWidth = imageElement.naturalWidth;
    const naturalHeight = imageElement.naturalHeight;

    if (!naturalWidth || !naturalHeight) {
      return;
    }

    const matrix = image.$getTransform();
    const scaleX = matrix[0] ?? 0;
    const scaleY = matrix[3] ?? 0;

    if (!scaleX || !scaleY) {
      return;
    }

    const renderedWidth = naturalWidth * scaleX;
    const renderedHeight = naturalHeight * scaleY;

    selection.$change(
      1,
      1,
      (scaleX > 1 ? renderedWidth : image.clientWidth) - 2,
      (scaleY > 1 ? renderedHeight : image.clientHeight) - 2,
    );
  }

  function bindCanvasEvents(canvas: CropperCanvas) {
    const canvasEventNames = ['action', 'actionstart', 'actionmove', 'actionend'] as const;

    for (const eventName of canvasEventNames) {
      addTrackedListener(canvas, eventName, (event) => {
        const detail = (event as CustomEvent).detail;

        if (eventName === 'action') {
          emit('canvas:action', detail);
        }
        if (eventName === 'actionstart') {
          emit('canvas:actionstart', detail);
        }
        if (eventName === 'actionmove') {
          emit('canvas:actionmove', detail);
        }
        if (eventName === 'actionend') {
          emit('canvas:actionend', detail);
        }
      });
    }
  }

  function bindSelectionEvents(selection: CropperSelection) {
    addTrackedListener(selection, 'change', (event) => {
      const detail = (event as CustomEvent<CropperSelectionChangeDetail>).detail;

      emit('selection:change', detail);
      emit('update:selectionX', detail.x);
      emit('update:selectionY', detail.y);
      emit('update:selectionWidth', detail.width);
      emit('update:selectionHeight', detail.height);
    });
  }

  function bindImageEvents(image: CropperImage) {
    addTrackedListener(image, 'transform', (event) => {
      emit(
        'image:transform',
        (event as CustomEvent).detail as { matrix: number[]; oldMatrix: number[] },
      );
    });

    if (!props.fitSelectionToImage) {
      return;
    }

    const imageElement = imgRef.value;
    if (!imageElement) {
      return;
    }

    const align = () => nextTick(() => alignSelectionToImage());

    if (imageElement.complete && imageElement.naturalWidth > 0) {
      align();
      return;
    }

    const onLoad = () => {
      imageElement.removeEventListener('load', onLoad);
      align();
    };

    imageElement.addEventListener('load', onLoad);
  }

  function syncChildProps() {
    syncPropsToElement(
      getCropperCanvas(),
      props.canvasProps as CropperCanvasProps as UnknownRecord,
    );
    syncPropsToElement(getCropperImage(), props.imageProps as CropperImageProps as UnknownRecord);
    syncPropsToElement(
      getCropperSelection(),
      props.selectionProps as CropperSelectionProps as UnknownRecord,
    );
  }

  function destroy() {
    for (const { el, event, fn } of trackedHandlers) {
      el.removeEventListener(event, fn);
    }

    trackedHandlers.length = 0;
    cropperInstance?.destroy();
    cropperInstance = null;
  }

  onMounted(async () => {
    if (!imgRef.value) {
      return;
    }

    const CropperConstructor = await loadCropperConstructor();

    const options: ConstructorParameters<typeof CropperConstructor>[1] = {};
    if (props.template !== undefined) {
      options.template = props.template;
    }

    cropperInstance = new CropperConstructor(imgRef.value, options);

    nextTick(() => {
      syncChildProps();

      const canvas = getCropperCanvas();
      if (canvas) {
        bindCanvasEvents(canvas);
      }

      const selection = getCropperSelection();
      if (selection) {
        bindSelectionEvents(selection);
      }

      const image = getCropperImage();
      if (image) {
        bindImageEvents(image);
      }
    });
  });

  onBeforeUnmount(() => {
    destroy();
  });

  watch(
    () => props.src,
    (value) => {
      const cropperImage = getCropperImage();

      if (cropperImage) {
        (cropperImage as unknown as HTMLImageElement).src = value ?? '';
        return;
      }

      if (imgRef.value) {
        imgRef.value.src = value ?? '';
      }
    },
  );

  watch(
    () => props.canvasProps,
    () => {
      nextTick(() => {
        syncPropsToElement(
          getCropperCanvas(),
          props.canvasProps as CropperCanvasProps as UnknownRecord,
        );
      });
    },
    { deep: true },
  );

  watch(
    () => props.imageProps,
    () => {
      nextTick(() => {
        syncPropsToElement(
          getCropperImage(),
          props.imageProps as CropperImageProps as UnknownRecord,
        );
      });
    },
    { deep: true },
  );

  watch(
    () => props.selectionProps,
    () => {
      nextTick(() => {
        syncPropsToElement(
          getCropperSelection(),
          props.selectionProps as CropperSelectionProps as UnknownRecord,
        );
      });
    },
    { deep: true },
  );

  watch(
    [
      () => props.selectionX,
      () => props.selectionY,
      () => props.selectionWidth,
      () => props.selectionHeight,
    ],
    ([x, y, width, height]) => {
      if (x === undefined && y === undefined && width === undefined && height === undefined) {
        return;
      }

      const selection = getCropperSelection();
      if (!selection) {
        return;
      }

      nextTick(() => {
        const nextX = x ?? selection.x;
        const nextY = y ?? selection.y;
        const nextWidth = width ?? selection.width;
        const nextHeight = height ?? selection.height;

        if (typeof selection.$change !== 'function') {
          selection.x = nextX;
          selection.y = nextY;
          selection.width = nextWidth;
          selection.height = nextHeight;
          return;
        }

        selection.$change(nextX, nextY, nextWidth, nextHeight);
      });
    },
  );

  defineExpose<CropperExpose>({
    getInstance: () => cropperInstance,
    getCropperCanvas,
    getCropperImage,
    getCropperSelection,
    getCropperSelections,
    destroy,
  });
</script>
