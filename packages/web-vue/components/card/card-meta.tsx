import { defineComponent, inject, onMounted } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
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

    const context = inject<CardContext>(cardInjectionKey);

    onMounted(() => {
      if (context) {
        context.hasMeta = true;
      }
    });

    return () => {
      const hasTitle = Boolean(slots.title ?? props.title);
      const hasDesc = Boolean(slots.description ?? props.description);

      return (
        <div class={prefixCls}>
          {(hasTitle || hasDesc) && (
            <div class={`${prefixCls}-content`}>
              {hasTitle && (
                <div class={`${prefixCls}-title`}>
                  {slots.title?.() ?? props.title}
                </div>
              )}
              {hasDesc && (
                <div class={`${prefixCls}-description`}>
                  {slots.description?.() ?? props.description}
                </div>
              )}
            </div>
          )}
          {(slots.avatar || context?.slots.actions) && (
            <div
              class={[
                `${prefixCls}-footer `,
                {
                  [`${prefixCls}-footer-only-actions`]: !slots.avatar,
                },
              ]}
            >
              {slots.avatar && (
                <div class={`${prefixCls}-avatar`}>{slots.avatar()}</div>
              )}
              {context &&
                context.slots.actions &&
                context.renderActions(context.slots.actions())}
            </div>
          )}
        </div>
      );
    };
  },
});
