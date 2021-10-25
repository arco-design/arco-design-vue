import {
  defineComponent,
  PropType,
  toRefs,
  computed,
  reactive,
  provide,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Spin from '../spin';
import usePropOrSlot from '../_utils/use-prop-or-slot';
import { CardContext, cardInjectionKey } from './context';

export const SIZES = ['medium', 'small'] as const;
export type SizeType = typeof SIZES[number];

export default defineComponent({
  name: 'Card',
  components: {
    Spin,
  },
  props: {
    /**
     * @zh 是否有边框
     * @en Whether to render the border
     */
    bordered: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否为加载中
     * @en Loading status
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否可悬浮
     * @en Can be hovered
     */
    hoverable: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 卡片尺寸
     * @en Size of card
     * @values 'medium', 'small'
     */
    size: {
      type: String as PropType<SizeType>,
      default: 'medium',
      validator: (value: SizeType) => {
        return SIZES.includes(value);
      },
    },
    /**
     * @zh 自定义标题区域样式
     * @en The additional css style to apply to card head
     */
    headerStyle: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @zh 内容区域自定义样式
     * @en The additional css style to apply to card content
     */
    bodyStyle: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @zh 卡片标题
     * @en Title of card
     */
    title: {
      type: String,
    },
    /**
     * @zh 卡片右上角的操作区域
     * @en Content to render in the top-right corner of the card
     */
    extra: {
      type: String,
    },
  },
  /**
   * @zh 卡片标题
   * @en Title of card
   * @slot title
   */
  /**
   * @zh 卡片右上角的操作区域
   * @en Content to render in the top-right corner of the card
   * @slot extra
   */
  /**
   * @zh 卡片封面
   * @en Cover of card
   * @slot cover
   */
  /**
   * @zh 卡片底部的操作组
   * @en The action list which shows at the bottom of the Card
   * @slot actions
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('card');

    const actionListRef = computed(() => {
      const actions = slots.actions && slots.actions();
      if (actions === undefined || actions.length === 0) {
        return null;
      }
      return (
        <div class={`${prefixCls}-actions`}>
          <div class={`${prefixCls}-actions-right`}>
            {(actions || []).map((action, index) => (
              <span key={`action-${index}`} class={`${prefixCls}-actions-item`}>
                {action}
              </span>
            ))}
          </div>
        </div>
      );
    });

    const cardContext = reactive<CardContext>({
      hasMeta: false,
      hasGrid: false,
      actions: actionListRef.value,
    });
    provide(cardInjectionKey, cardContext);

    const titleRef = usePropOrSlot(props, slots, 'title');
    const extraRef = usePropOrSlot(props, slots, 'extra');

    return {
      cardContext,
      slots,
      computedTitle: titleRef,
      computedExtra: extraRef,
      prefixCls,
      props,
    };
  },
  render() {
    const {
      props,
      computedTitle,
      computedExtra,
      cardContext,
      prefixCls,
      slots,
    } = this;
    const children = slots.default && slots.default();
    const { hasGrid, hasMeta, actions } = cardContext;
    const { bordered, loading, hoverable, size, headerStyle, bodyStyle } =
      toRefs(props);
    return (
      <div
        class={[
          prefixCls,
          `${prefixCls}-size-${size.value}`,
          {
            [`${prefixCls}-loading`]: loading.value,
            [`${prefixCls}-bordered`]: bordered.value,
            [`${prefixCls}-hoverable`]: hoverable.value,
            [`${prefixCls}-contain-grid`]: hasGrid,
          },
        ]}
      >
        {computedTitle || computedExtra ? (
          <div
            class={[
              `${prefixCls}-header`,
              { [`${prefixCls}-header-no-title`]: !computedTitle },
            ]}
            style={headerStyle.value}
          >
            {computedTitle && (
              <div class={`${prefixCls}-header-title`}>{computedTitle}</div>
            )}
            {computedExtra && (
              <div class={`${prefixCls}-header-extra`}>{computedExtra}</div>
            )}
          </div>
        ) : null}

        {slots.cover ? (
          <div class={`${prefixCls}-cover`}>{slots.cover()}</div>
        ) : null}

        <div class={`${prefixCls}-body`} style={bodyStyle.value}>
          {loading.value ? <Spin /> : children}
          {hasMeta ? null : actions}
        </div>
      </div>
    );
  },
});
