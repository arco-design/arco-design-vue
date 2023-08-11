<template>
  <div role="listitem" :class="cls">
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
        <slot v-if="$slots.label" name="label" />
        <template v-else>{{ label }}</template>
      </div>
    </div>
    <div v-if="labelPosition === 'relative'" :class="`${prefixCls}-label`">
      <slot v-if="$slots.label" name="label" />
      <template v-else>{{ label }}</template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  computed,
  PropType,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TimelineContext, timelineInjectionKey } from './context';
import { DotType, LineType, PositionType, ModeType } from './interface';
import { Direction } from '../_utils/constant';

const getDefaultPosition = (
  index: number,
  mode: ModeType,
  direction: Direction,
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
      default: 'solid',
    },
    /**
     * @zh 时间轴类型：实线/虚线/点状线
     * @en Line type
     * @values 'solid', 'dashed', 'dotted'
     */
    lineType: {
      type: String as PropType<LineType>,
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
    },
  },
  /**
   * @zh 自定义节点
   * @en Custom dot
   * @slot dot
   */
  /**
   * @zh 自定义标签
   * @en Custom label
   * @slot label
   * @version 2.50.0
   */
  setup(props) {
    const prefixCls = getPrefixCls('timeline-item');
    const instance = getCurrentInstance();
    const context = inject<Partial<TimelineContext>>(timelineInjectionKey, {});

    const index = computed(
      () => context.items?.indexOf(instance?.uid ?? -1) ?? -1
    );

    const contextDirection = computed(() => {
      return context?.direction ?? 'vertical';
    });

    const contextLabelPosition = computed(() => {
      return context?.labelPosition ?? 'same';
    });

    const cls = computed(() => {
      const { items = [], reverse, labelPosition, mode = 'left' } = context;
      const direction = contextDirection.value;
      const computedPosition = getDefaultPosition(
        index.value,
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
            index.value === (reverse === true ? 0 : items.length - 1),
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
