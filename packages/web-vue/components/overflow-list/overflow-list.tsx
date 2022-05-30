import type { PropType, VNode } from 'vue';
import {
  computed,
  defineComponent,
  mergeProps,
  onMounted,
  ref,
  watch,
} from 'vue';
import ResizeObserver from '../_components/resize-observer-v2';
import { getAllElements } from '../_utils/vue-utils';
import { getPrefixCls } from '../_utils/global-config';
import Tag from '../tag';
import { getReverse } from '../_utils/array';

export default defineComponent({
  name: 'OverflowList',
  props: {
    /**
     * @zh 最少展示的元素个数
     * @en Minimum number of elements to display
     */
    min: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 项目间隔
     * @en Item Margin
     */
    margin: {
      type: Number,
      default: 8,
    },
    /**
     * @zh 折叠方向
     * @en Overflow From
     */
    from: {
      type: String as PropType<'start' | 'end'>,
      default: 'end',
    },
  },
  /**
   * @zh 折叠元素
   * @en Overflow
   * @slot overflow
   * @binding {number} number
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('overflow-list');

    const listRef = ref<HTMLElement>();
    const overflowRef = ref<HTMLElement>();
    const spacerRef = ref<HTMLElement>();
    const children: { value?: VNode[] } = {};
    const itemWidths: number[] = [];

    const total = ref(0);
    const overflowNumber = ref(0);
    const showOverflow = computed(() => overflowNumber.value > 0);
    const nextWidth = ref(0);

    const isStart = computed(() => props.from === 'start');

    watch(total, (cur, pre) => {
      if (overflowNumber.value > 0) {
        overflowNumber.value += cur - pre;
        if (overflowNumber.value < 0) {
          overflowNumber.value = 0;
        }
      }
    });

    const onResize = () => {
      if (listRef.value && children.value && spacerRef.value) {
        const spacerWidth = spacerRef.value.offsetWidth;
        if (
          spacerWidth > 1 &&
          (overflowNumber.value === 0 || spacerWidth < nextWidth.value)
        ) {
          return;
        }

        // get new item width
        for (let i = 0; i < children.value.length; i++) {
          const element = children.value[i].el as HTMLElement;
          if (element && element.offsetWidth) {
            itemWidths[i] = element.offsetWidth + props.margin;
          }
        }

        let remainingWidth =
          listRef.value.clientWidth -
          (overflowRef.value?.offsetWidth ?? 0) -
          (isStart.value ? props.margin : 0);

        const _itemWidths = isStart.value ? getReverse(itemWidths) : itemWidths;
        let count = 0;
        for (let i = 0; i < _itemWidths.length; i++) {
          const itemWidth = _itemWidths[i] ?? 0;
          if (itemWidth < remainingWidth - 1) {
            remainingWidth -= itemWidth;
            count += 1;
          } else {
            nextWidth.value = itemWidth;
            break;
          }
        }
        if (count < props.min && props.min < total.value) {
          count = props.min;
        }
        if (overflowNumber.value !== total.value - count) {
          overflowNumber.value = total.value - count;
        }
      }
    };

    watch(showOverflow, () => onResize(), { flush: 'post' });

    onMounted(() => {
      if (spacerRef.value && spacerRef.value.offsetWidth < 1) {
        onResize();
      }
    });

    const renderOverflow = () => {
      const style = isStart.value
        ? { marginRight: `${props.margin}px` }
        : undefined;

      return (
        <div ref={overflowRef} class={`${prefixCls}-overflow`} style={style}>
          {slots.overflow?.({ number: overflowNumber.value }) ?? (
            <Tag>+{overflowNumber.value}</Tag>
          )}
        </div>
      );
    };

    return () => {
      children.value = getAllElements(slots.default?.());

      if (total.value !== children.value.length) {
        total.value = children.value.length;
        itemWidths.length = total.value;
      }
      let visibleChildren = children.value;
      if (overflowNumber.value > 0) {
        visibleChildren = isStart.value
          ? children.value.slice(overflowNumber.value)
          : children.value.slice(0, -overflowNumber.value);
      }
      const withMarginNumber =
        overflowNumber.value === 0 || isStart.value
          ? visibleChildren.length - 1
          : visibleChildren.length;
      for (let i = 0; i < withMarginNumber; i++) {
        visibleChildren[i].props = mergeProps(visibleChildren[i].props ?? {}, {
          style: { marginRight: `${props.margin}px` },
        });
      }

      return (
        <div ref={listRef} class={prefixCls}>
          {isStart.value && overflowNumber.value > 0 && renderOverflow()}
          {visibleChildren}
          {!isStart.value && overflowNumber.value > 0 && renderOverflow()}
          <ResizeObserver onResize={onResize}>
            <div ref={spacerRef} class={`${prefixCls}-spacer`} />
          </ResizeObserver>
        </div>
      );
    };
  },
});
