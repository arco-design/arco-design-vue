import { defineComponent, inject, onMounted } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import usePropOrSlot from '../_utils/use-prop-or-slot';
import { CardContext, cardInjectionKey } from './context';

export const SIZES = ['default', 'small'] as const;
export type SizeType = typeof SIZES[number];

export default defineComponent({
  name: 'CardMeta',
  props: {
    /**
     * @zh 标题
     * @en Title of card
     */
    title: {
      type: String,
    },
    /**
     * @zh 描述
     * @en Description of card
     */
    description: {
      type: String,
    },
  },
  /**
   * @zh 头像
   * @en Avatar of card
   * @slot avatar
   */
  /**
   * @zh 标题
   * @en Title of card
   * @slot title
   */
  /**
   * @zh 描述
   * @en Description of card
   * @slot description
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('card-meta');

    const titleRef = usePropOrSlot(props, slots, 'title');
    const descRef = usePropOrSlot(props, slots, 'description');

    const context = inject<CardContext>(cardInjectionKey);

    onMounted(() => {
      if (context) {
        context.hasMeta = true;
      }
    });

    return {
      computedTitle: titleRef,
      computedDesc: descRef,
      prefixCls,
      context,
      slots,
    };
  },
  render() {
    const { computedTitle, computedDesc, prefixCls, context, slots } = this;
    const { actions } = context || {};
    return (
      <div class={prefixCls}>
        {computedTitle || computedDesc ? (
          <div class={`${prefixCls}-content`}>
            {computedTitle && (
              <div class={`${prefixCls}-title`}>{computedTitle}</div>
            )}
            {computedDesc && (
              <div class={`${prefixCls}-description`}>{computedDesc}</div>
            )}
          </div>
        ) : null}
        {slots.avatar || actions ? (
          <div
            class={[
              `${prefixCls}-footer `,
              {
                [`${prefixCls}-footer-only-actions`]: !slots.avatar,
              },
            ]}
          >
            {slots.avatar ? (
              <div class={`${prefixCls}-avatar`}>{slots.avatar()}</div>
            ) : null}
            {actions}
          </div>
        ) : null}
      </div>
    );
  },
});
