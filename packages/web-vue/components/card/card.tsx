import {
  defineComponent,
  PropType,
  computed,
  reactive,
  provide,
  VNode,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Spin from '../spin';
import { CardContext, cardInjectionKey } from './context';
import { getAllElements } from '../_utils/vue-utils';

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

    const renderActions = (vns: VNode[]) => {
      const actions = getAllElements(vns);

      return (
        <div class={`${prefixCls}-actions`}>
          <div class={`${prefixCls}-actions-right`}>
            {actions.map((action, index) => (
              <span key={`action-${index}`} class={`${prefixCls}-actions-item`}>
                {action}
              </span>
            ))}
          </div>
        </div>
      );
    };

    const cardContext = reactive({
      hasMeta: false,
      hasGrid: false,
      slots,
      renderActions,
    });
    provide(cardInjectionKey, cardContext);

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-bordered`]: props.bordered,
        [`${prefixCls}-hoverable`]: props.hoverable,
        [`${prefixCls}-contain-grid`]: cardContext.hasGrid,
      },
    ]);

    return () => {
      const hasTitle = Boolean(slots.title ?? props.title);
      const hasExtra = Boolean(slots.extra ?? props.extra);

      return (
        <div class={cls.value}>
          {(hasTitle || hasExtra) && (
            <div
              class={[
                `${prefixCls}-header`,
                { [`${prefixCls}-header-no-title`]: !hasTitle },
              ]}
              style={props.headerStyle}
            >
              {hasTitle && (
                <div class={`${prefixCls}-header-title`}>
                  {slots.title?.() ?? props.title}
                </div>
              )}
              {hasExtra && (
                <div class={`${prefixCls}-header-extra`}>
                  {slots.extra?.() ?? props.extra}
                </div>
              )}
            </div>
          )}
          {slots.cover && (
            <div class={`${prefixCls}-cover`}>{slots.cover()}</div>
          )}
          <div class={`${prefixCls}-body`} style={props.bodyStyle}>
            {props.loading ? <Spin /> : slots.default?.()}
            {slots.actions &&
              !cardContext.hasMeta &&
              renderActions(slots.actions())}
          </div>
        </div>
      );
    };
  },
});
