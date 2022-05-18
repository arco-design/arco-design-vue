<template>
  <component
    :is="component"
    ref="wrapperRef"
    :class="classNames"
    v-bind="$attrs"
    :style="styles"
  >
    <slot />
    <ResizeTrigger
      v-for="direction in allowDirections"
      :key="direction"
      :prefix-cls="`${prefixCls}-trigger`"
      :class="`${prefixCls}-direction-${direction}`"
      :direction="isHorizontal(direction) ? 'horizontal' : 'vertical'"
      @mousedown="
        (e) => {
          onMoveStart(direction, e);
        }
      "
      @resize="
        (entry) => {
          onTiggerResize(direction, entry);
        }
      "
    >
      <slot
        v-if="$slots['resize-trigger']"
        name="resize-trigger"
        :direction="direction"
      />
      <template v-if="$slots['resize-trigger-icon']" #icon>
        <slot name="resize-trigger-icon" :direction="direction" />
      </template>
    </ResizeTrigger>
  </component>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRefs,
  ref,
  reactive,
} from 'vue';
import ResizeTrigger from '../_components/resize-trigger.vue';
import useMergeState from '../_hooks/use-merge-state';
import { getPrefixCls } from '../_utils/global-config';
import { isNumber } from '../_utils/is';
import { off, on } from '../_utils/dom';

export type DirectionType = 'left' | 'right' | 'top' | 'bottom';

type PaddingCSSProperties =
  | 'padding-left'
  | 'padding-right'
  | 'padding-top'
  | 'padding-bottom';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_TOP = 'top';
const DIRECTION_BOTTOM = 'bottom';

const allDirections: DirectionType[] = [
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  DIRECTION_BOTTOM,
];

function getRealSize(pageSize: number, padding: number) {
  if (pageSize === 0) return 0;

  const res = pageSize - padding;
  return res <= 0 ? 0 : res;
}

function isHorizontal(direction: DirectionType) {
  return [DIRECTION_TOP, DIRECTION_BOTTOM].indexOf(direction) > -1;
}

export default defineComponent({
  name: 'ResizeBox',
  components: {
    ResizeTrigger,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 宽度
     * @en Width
     * @vModel
     */
    width: {
      type: Number,
    },
    /**
     * @zh 高度
     * @en Height
     * @vModel
     */
    height: {
      type: Number,
    },
    /**
     * @zh 伸缩框的 html 标签
     * @en The html tag of the telescopic box
     */
    component: {
      type: String,
      default: 'div',
    },
    /**
     * @zh 可以进行伸缩的边，有上、下、左、右可以使用
     * @en Can be stretched side, there are up, down, left and right can be used
     * */
    directions: {
      type: Array as PropType<('left' | 'right' | 'top' | 'bottom')[]>,
      default: () => ['right'],
    },
  },
  emits: {
    'update:width': (width: number) => true,
    'update:height': (height: number) => true,
    /**
     * @zh 拖拽开始时触发
     * @en Triggered when dragging starts
     * @param {MouseEvent} ev
     */
    'movingStart': (ev: MouseEvent) => true,
    /**
     * @zh 拖拽时触发
     * @en Triggered when dragging
     * @param {{ width: number; height: number; }} size
     * @param {MouseEvent} ev
     */
    'moving': (size: { width: number; height: number }, ev: MouseEvent) => true,
    /**
     * @zh 拖拽结束时触发
     * @en Triggered when the drag ends
     * @param {MouseEvent} ev
     */
    'movingEnd': (ev: MouseEvent) => true,
  },
  /**
   * @zh 伸缩杆的内容
   * @en The contents of the resize pole
   * @slot resize-trigger
   * @binding {'left' | 'right' | 'top' | 'bottom'} direction
   */
  /**
   * @zh 伸缩杆的图标
   * @en Resize pole icon
   * @slot resize-trigger-icon
   * @binding {'left' | 'right' | 'top' | 'bottom'} direction
   */
  setup(props, { emit }) {
    const { height: propHeight, width: propWidth, directions } = toRefs(props);

    const [width, setWidth] = useMergeState<number | null>(
      null,
      reactive({
        value: propWidth,
      })
    );

    const [height, setHeight] = useMergeState<number | null>(
      null,
      reactive({
        value: propHeight,
      })
    );

    const wrapperRef = ref<HTMLDivElement>();

    const paddingStyles = reactive<
      Partial<Record<PaddingCSSProperties, string>>
    >({});

    const prefixCls = getPrefixCls('resizebox');
    const classNames = computed(() => [prefixCls]);
    const styles = computed(() => {
      return {
        ...(isNumber(width.value) ? { width: `${width.value}px` } : {}),
        ...(isNumber(height.value) ? { height: `${height.value}px` } : {}),
        ...paddingStyles,
      };
    });
    const allowDirections = computed(() =>
      directions.value.filter((direction) => allDirections.includes(direction))
    );

    const record = {
      direction: '',
      startPageX: 0,
      startPageY: 0,
      startWidth: 0,
      startHeight: 0,
      moving: false,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    };

    function onMoving(e: MouseEvent) {
      if (!record.moving) return;

      const { startPageX, startPageY, startWidth, startHeight, direction } =
        record;
      let newWidth = startWidth;
      let newHeight = startHeight;

      // 往右移动的距离
      const offsetX = e.pageX - startPageX;
      // 往下移动的距离
      const offsetY = e.pageY - startPageY;

      switch (direction) {
        case DIRECTION_LEFT:
          newWidth = startWidth - offsetX;
          setWidth(newWidth);
          emit('update:width', newWidth);
          break;
        case DIRECTION_RIGHT:
          newWidth = startWidth + offsetX;
          setWidth(newWidth);
          emit('update:width', newWidth);
          break;
        case DIRECTION_TOP:
          newHeight = startHeight - offsetY;
          setHeight(newHeight);
          emit('update:height', newHeight);
          break;
        case DIRECTION_BOTTOM:
          newHeight = startHeight + offsetY;
          setHeight(newHeight);
          emit('update:height', newHeight);
          break;
        default:
          break;
      }

      emit(
        'moving',
        {
          width: newWidth,
          height: newHeight,
        },
        e
      );
    }

    function onMoveEnd(e: MouseEvent) {
      record.moving = false;

      off(window, 'mousemove', onMoving);
      off(window, 'mouseup', onMoveEnd);
      off(window, 'contextmenu', onMoveEnd);

      document.body.style.cursor = 'default';

      emit('movingEnd', e);
    }

    function onMoveStart(direction: DirectionType, e: MouseEvent) {
      emit('movingStart', e);

      record.moving = true;
      record.startPageX = e.pageX;
      record.startPageY = e.pageY;
      record.direction = direction;

      const { top, left, right, bottom } = record.padding;
      record.startWidth = getRealSize(
        wrapperRef.value?.clientWidth || 0,
        left + right
      );
      record.startHeight = getRealSize(
        wrapperRef.value?.clientHeight || 0,
        top + bottom
      );

      on(window, 'mousemove', onMoving);
      on(window, 'mouseup', onMoveEnd);
      on(window, 'contextmenu', onMoveEnd);

      document.body.style.cursor = isHorizontal(direction)
        ? 'row-resize'
        : 'col-resize';
    }

    function onTiggerResize(
      direction: DirectionType,
      entry: ResizeObserverEntry
    ) {
      const { width, height } = entry.contentRect;
      const size = isHorizontal(direction) ? height : width;
      record.padding[direction] = size;
      paddingStyles[
        `padding-${direction}` as PaddingCSSProperties
      ] = `${size}px`;
    }

    return {
      prefixCls,
      classNames,
      styles,
      wrapperRef,
      onMoveStart,
      isHorizontal,
      allowDirections,
      onTiggerResize,
    };
  },
});
</script>
