import {
  defineComponent,
  PropType,
  provide,
  reactive,
  computed,
  toRefs,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import type { ModeType, LabelPositionType } from './interface';
import { timelineInjectionKey } from './context';
import Item from './item.vue';
import Spin from '../spin';
import { Direction } from '../_utils/constant';
import { useChildrenComponents } from '../_hooks/use-children-components';

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
      type: String as PropType<Direction>,
      default: 'vertical',
    },
    /**
     * @zh 时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。
     * @en The display mode of Timeline
     * @values 'left','right','top','bottom','alternate'
     */
    mode: {
      type: String as PropType<ModeType>,
      default: 'left',
    },
    /**
     * @zh 是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。
     * @en Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content
     */
    pending: {
      type: [Boolean, String],
    },
    /**
     * @zh 设置标签文本的位置
     * @en Position of label text
     * @values 'relative', 'same'
     */
    labelPosition: {
      type: String as PropType<LabelPositionType>,
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
    const { children, components } = useChildrenComponents('TimelineItem');
    const {
      reverse: reverseRef,
      direction: directionRef,
      labelPosition: labelPositionRef,
      mode: modeRef,
    } = toRefs(props);

    const timelineContext = reactive({
      items: components,
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

    return () => {
      if (hasPending.value) {
        children.value = slots.default?.().concat(
          <Item
            v-slots={{
              dot: () => slots.dot?.() ?? <Spin size={12} />,
            }}
            lineType="dashed"
          >
            {props.pending !== true && <div>{props.pending}</div>}
          </Item>
        );
      } else {
        children.value = slots.default?.();
      }

      return (
        <div role="list" class={cls.value}>
          {children.value}
        </div>
      );
    };
  },
});
