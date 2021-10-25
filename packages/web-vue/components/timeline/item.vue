<template>
  <div :class="cls">
    <div :class="`${prefixCls}-dot-wrapper`">
      <div :class="dotLineCls" :style="computedDotLineStyle" />
      <div :class="`${prefixCls}-dot-content`">
        <div v-if="$slots.dot" :class="`${prefixCls}-dot-custom`">
          <slot name="dot" />
        </div>
        <div v-else :class="dotTypeCls" :style="computedDotStyle" />
      </div>
    </div>
    <div :class="`${prefixCls}-content-wrapper`">
      <div v-if="$slots.default" :class="`${prefixCls}-content`">
        <slot />
      </div>
      <div v-if="labelPosition !== 'relative'" :class="`${prefixCls}-label`">
        {{ label }}
      </div>
    </div>
    <div v-if="labelPosition === 'relative'" :class="`${prefixCls}-label`">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  inject,
  computed,
  PropType,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { timelineInjectionKey } from './context';
import {
  DOTS,
  DotType,
  LineType,
  LINES,
  PositionType,
  POSITIONS,
  ModeType,
} from './constants';
import { DirectionType } from '../carousel/constants';

const getDefaultPosition = (
  index: number,
  mode: ModeType,
  direction: DirectionType,
  position?: string
) => {
  let map = ['left', 'right'];
  if (direction === 'horizontal') {
    map = ['top', 'bottom'];
  }
  const res = mode === 'alternate' ? position || map[index % 2] : mode;

  return map.indexOf(res) > -1 ? res : map[0];
};

export default defineComponent({
  name: 'TimelineItem',
  props: {
    /**
     * @zh 节点颜色
     * @en Dot color
     */
    dotColor: {
      type: String,
    },
    /**
     * @zh 节点类型：空心圆/实心圆
     * @en Dot type
     * @values 'hollow', 'solid'
     */
    dotType: {
      type: String as PropType<DotType>,
      validator: (value: DotType) => {
        return DOTS.includes(value);
      },
      default: 'solid',
    },
    /**
     * @zh 时间轴类型：实线/虚线/点状线
     * @en Line type
     * @values 'solid', 'dashed', 'dotted'
     */
    lineType: {
      type: String as PropType<LineType>,
      validator: (value: LineType) => {
        return LINES.includes(value);
      },
      default: 'solid',
    },
    /**
     * @zh 时间轴颜色
     * @en Line Color
     */
    lineColor: {
      type: String,
    },
    /**
     * @zh 标签文本
     * @en Label text
     */
    label: {
      type: String,
    },
    /**
     * @zh Item 位置
     * @en Item position
     */
    position: {
      type: String as PropType<PositionType>,
      validator: (value: PositionType) => {
        return POSITIONS.includes(value);
      },
    },
  },
  /**
   * @zh 自定义节点
   * @en Custom dot
   * @slot dot
   */
  setup(props) {
    const prefixCls = getPrefixCls('timeline-item');
    const instance = getCurrentInstance();
    const context = inject(timelineInjectionKey, undefined);
    onMounted(() => {
      if (context?.addItem) {
        context.addItem({
          uid: instance!.uid,
        });
      }
    });
    onUnmounted(() => {
      if (context?.removeItem) {
        context.removeItem(instance!.uid);
      }
    });
    const myIndexRef = computed(() => {
      const items = context?.items || [];
      const index = items.findIndex((it) => it.uid === instance?.uid);
      return index;
    });

    const contextDirection = computed(() => {
      return context?.direction;
    });

    const contextLabelPosition = computed(() => {
      return context?.labelPosition;
    });

    const cls = computed(() => {
      const index = myIndexRef.value;
      const { items = [], reverse, labelPosition, mode } = context! || {};
      const direction = contextDirection.value;
      const computedPosition = getDefaultPosition(
        index,
        mode,
        direction,
        props.position
      );
      return [
        prefixCls,
        {
          [`${prefixCls}-${direction}-${computedPosition}`]: direction,
          [`${prefixCls}-label-${labelPosition}`]: labelPosition,
          [`${prefixCls}-last`]:
            index === (reverse === true ? 0 : items.length - 1),
        },
      ];
    });

    const dotLineCls = computed(() => {
      return [
        `${prefixCls}-dot-line`,
        `${prefixCls}-dot-line-is-${contextDirection.value}`,
      ];
    });

    const computedDotLineStyle = computed(() => {
      const { direction } = context! || {};
      return {
        [direction === 'horizontal' ? 'borderTopStyle' : 'borderLeftStyle']:
          props.lineType,
        ...(props.lineColor ? { borderColor: props.lineColor } : {}),
      };
    });

    const dotTypeCls = computed(() => {
      return [`${prefixCls}-dot`, `${prefixCls}-dot-${props.dotType}`];
    });

    const computedDotStyle = computed(() => {
      return {
        [props.dotType === 'solid' ? 'backgroundColor' : 'borderColor']:
          props.dotColor,
      };
    });

    return {
      cls,
      dotLineCls,
      dotTypeCls,
      prefixCls,
      computedDotLineStyle,
      computedDotStyle,
      labelPosition: contextLabelPosition,
    };
  },
});
</script>
