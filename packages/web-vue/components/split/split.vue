<template>
  <component :is="component" ref="wrapperRef" :class="classNames">
    <div
      :class="[`${prefixCls}-pane`, `${prefixCls}-pane-first`]"
      :style="firstPaneStyles"
    >
      <slot name="first" />
    </div>
    <ResizeTrigger
      v-if="!disabled"
      :prefix-cls="`${prefixCls}-trigger`"
      :direction="isHorizontal ? 'vertical' : 'horizontal'"
      @mousedown="onMoveStart"
      @resize="onTiggerResize"
    >
      <template #default>
        <slot name="resize-trigger" />
      </template>
      <template #icon>
        <slot name="resize-trigger-icon" />
      </template>
    </ResizeTrigger>
    <div :class="[`${prefixCls}-pane`, `${prefixCls}-pane-second`]">
      <slot name="second" />
    </div>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
} from 'vue';
import ResizeTrigger from '../_components/resize-trigger.vue';
import useMergeState from '../_hooks/use-merge-state';
import { getPrefixCls } from '../_utils/global-config';
import { off, on } from '../_utils/dom';

function px2percent(numerator: number | string, denominator: number | string) {
  return parseFloat(numerator as string) / parseFloat(denominator as string);
}

export default defineComponent({
  name: 'Split',
  components: {
    ResizeTrigger,
  },
  props: {
    /**
     * @zh 分割框的 html 标签
     * @en The html tag of the split box
     */
    component: {
      type: String,
      default: 'div',
    },
    /**
     * @zh 分割的方向
     * @en Direction of division
     */
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    /**
     * @zh 分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px
     * @en The size of the segmentation can be 0~1 representing a percentage, or a specific number of pixels, such as 300px
     * @vModel
     */
    size: {
      type: [Number, String],
      default: undefined,
    },
    /**
     * @zh 默认分割的大小
     * @en Default split size
     */
    defaultSize: {
      type: [Number, String],
      default: 0.5,
    },
    /**
     * @zh 最小阈值
     * @en Minimum threshold
     */
    min: {
      type: [Number, String],
    },
    /**
     * @zh 最大阈值
     * @en Maximum threshold
     * */
    max: {
      type: [Number, String],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
    },
  },
  emits: [
    /**
     * @zh 开始拖拽之前触发
     * @en Triggered before dragging
     * */
    'moveStart',
    /**
     * @zh 拖拽时触发
     * @en Triggered when dragging
     */
    'moving',
    /**
     * @zh 拖拽结束之后触发
     * @en Triggered after dragging ends
     */
    'moveEnd',
    'update:size',
  ],
  /**
   * @zh 第一个面板的内容
   * @en The contents of the first panel
   * @slot first
   */
  /**
   * @zh 第二个面板的内容
   * @en The contents of the second panel
   * @slot second
   */
  /**
   * @zh 伸缩杆的内容
   * @en The contents of the resize pole
   * @slot resize-trigger
   */
  /**
   * @zh 伸缩杆的图标
   * @en Resize pole icon
   * @slot resize-trigger-icon
   */
  setup(props, { emit }) {
    const { direction, size: propSize, defaultSize, min, max } = toRefs(props);
    const triggerSize = ref(0);
    const record = {
      startPageX: 0,
      startPageY: 0,
      startWidth: 0,
      startHeight: 0,
      startSize: 0,
      moving: false,
    };
    const wrapperRef = ref<HTMLDivElement>();
    const prefixCls = getPrefixCls('split');
    const [size, setSize] = useMergeState(
      defaultSize.value,
      reactive({
        value: propSize,
      })
    );
    const numberSize = computed(() => {
      return parseFloat(size.value as string);
    });
    const isHorizontal = computed(() => direction.value === 'horizontal');
    const classNames = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-horizontal`]: isHorizontal.value,
        [`${prefixCls}-vertical`]: !isHorizontal.value,
      },
    ]);
    const isPxSize = computed(
      () => propSize && typeof propSize.value === 'string'
    );
    const firstPaneStyles = computed(() => {
      let firstPaneSize = '0';
      if (numberSize.value) {
        const unit = isPxSize.value ? 'px' : '%';
        const baseVal = isPxSize.value
          ? numberSize.value
          : numberSize.value * 100;
        firstPaneSize = `calc(${baseVal}${unit} - ${triggerSize.value / 2}px)`;
      }
      return {
        flexBasis: firstPaneSize,
      };
    });

    function getNewSize({
      startWrapperSize,
      startSize,
      startPosition,
      endPosition,
    }: {
      startWrapperSize: number;
      startSize: number;
      startPosition: number;
      endPosition: number;
    }) {
      const minOffset = min.value ? parseFloat(min.value as string) : 0;
      const maxOffset = max.value
        ? parseFloat(max.value as string)
        : isPxSize.value
        ? startWrapperSize
        : 1;
      let newSize = isPxSize.value
        ? startSize + (endPosition - startPosition)
        : px2percent(
            startWrapperSize * startSize + endPosition - startPosition,
            startWrapperSize
          );
      newSize = Math.max(newSize, minOffset);
      newSize = Math.min(newSize, maxOffset);
      return newSize;
    }

    // 移动中，更新 firstPane 的占位大小
    function onMoving(e: MouseEvent) {
      if (!record.moving) return;

      emit('moving', e);

      let newSize: number | string = isHorizontal.value
        ? getNewSize({
            startWrapperSize: record.startWidth,
            startSize: record.startSize,
            startPosition: record.startPageX,
            endPosition: e.pageX,
          })
        : getNewSize({
            startWrapperSize: record.startHeight,
            startSize: record.startSize,
            startPosition: record.startPageY,
            endPosition: e.pageY,
          });
      if (isPxSize.value) newSize = `${newSize}px`;
      setSize(newSize);
      emit('update:size', newSize);
    }

    // 移动结束，解除事件绑定
    function onMovingEnd(e: MouseEvent) {
      record.moving = false;

      off(window, 'mousemove', onMoving);
      off(window, 'mouseup', onMovingEnd);
      off(window, 'contextmenu', onMovingEnd);

      document.body.style.cursor = 'default';
      emit('moveEnd', e);
    }

    // 移动开始，记录初始值，绑定移动事件
    function onMoveStart(e: MouseEvent) {
      emit('moveStart', e);

      record.moving = true;
      record.startPageX = e.pageX;
      record.startPageY = e.pageY;
      record.startWidth = wrapperRef.value?.clientWidth || 0;
      record.startHeight = wrapperRef.value?.clientHeight || 0;
      record.startSize = numberSize.value;

      on(window, 'mousemove', onMoving);
      on(window, 'mouseup', onMovingEnd);
      on(window, 'contextmenu', onMovingEnd);

      document.body.style.cursor = isHorizontal.value
        ? 'col-resize'
        : 'row-resize';
    }

    function onTiggerResize(entry: ResizeObserverEntry) {
      const { width, height } = entry.contentRect;
      triggerSize.value = isHorizontal.value ? width : height;
    }

    return {
      size1: size,
      numberSize,
      prefixCls,
      classNames,
      isHorizontal,
      wrapperRef,
      onMoveStart,
      onTiggerResize,
      firstPaneStyles,
    };
  },
});
</script>
