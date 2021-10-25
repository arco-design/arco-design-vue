<template>
  <div :class="cls">
    <slot />
    <Item v-if="hasPending" line-type="dashed">
      <template #dot>
        <slot v-if="$slots.dot" name="dot" />
        <spin v-else :size="12" />
      </template>
      <div v-if="pending !== true"> {{ pending }}</div>
    </Item>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  provide,
  reactive,
  ref,
  computed,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import {
  DIRECTIONS,
  DirectionType,
  ModeType,
  MODES,
  LabelPositionType,
  LABEL_POSITIONS,
} from './constants';
import { timelineInjectionKey, VItem } from './context';
import Item from './item.vue';
import Spin from '../spin';

export default defineComponent({
  name: 'Timeline',
  components: {
    Item,
    Spin,
  },
  props: {
    /**
     * @zh 是否倒序
     * @en Whether reverse order
     */
    reverse: {
      type: Boolean,
    },
    /**
     * @zh 时间轴方向
     * @en Timeline direction
     * @values 'horizontal', 'vertical'
     */
    direction: {
      type: String as PropType<DirectionType>,
      validator: (value: DirectionType) => {
        return DIRECTIONS.includes(value);
      },
      default: 'vertical',
    },
    /**
     * @zh 时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。
     * @en The display mode of Timeline
     * @values 'left','right','top','bottom','alternate'
     */
    mode: {
      type: String as PropType<ModeType>,
      validator: (value: ModeType) => {
        return MODES.includes(value);
      },
      default: 'left',
    },
    /**
     * @zh 是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。
     * @en Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content
     */
    pending: {
      type: Boolean,
    },
    /**
     * @zh 设置标签文本的位置
     * @en Position of label text
     * @values 'relative', 'same'
     */
    labelPosition: {
      type: String as PropType<LabelPositionType>,
      validator: (value: LabelPositionType) => {
        return LABEL_POSITIONS.includes(value);
      },
      default: 'same',
    },
  },
  /**
   * @zh 幽灵节点
   * @en Custom dot
   * @slot dot
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('timeline');
    const hasPending = computed(() => {
      return props.pending || slots.pending;
    });
    const {
      reverse: reverseRef,
      direction: directionRef,
      labelPosition: labelPositionRef,
      mode: modeRef,
    } = toRefs(props);
    const itemsRef = ref<VItem[]>([]);

    function addItem(item: VItem) {
      itemsRef.value.push(item);
    }

    function removeItem(uid: number) {
      const index = itemsRef.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        itemsRef.value.splice(index, 1);
      }
    }

    const timelineContext = reactive({
      addItem,
      removeItem,
      items: itemsRef.value,
      direction: directionRef,
      reverse: reverseRef,
      labelPosition: labelPositionRef,
      mode: modeRef,
    });
    provide(timelineInjectionKey, timelineContext);

    const cls = computed(() => {
      return [
        prefixCls,
        `${prefixCls}-${props.mode}`,
        `${prefixCls}-direction-${props.direction}`,
        {
          [`${prefixCls}-is-reverse`]: props.reverse,
        },
      ];
    });

    return {
      prefixCls,
      hasPending,
      cls,
    };
  },
});
</script>
