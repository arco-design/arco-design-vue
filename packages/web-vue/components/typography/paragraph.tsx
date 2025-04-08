import { computed, defineComponent, PropType, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Base from './base';
import useListeners from '../_hooks/use-listeners';

export default defineComponent({
  name: 'TypographyParagraph',
  extends: Base,
  props: {
    /**
     * @zh 长引用
     * @en Whether enable blockquote
     */
    blockquote: {
      type: Boolean,
    },
    /**
     * @zh 段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。
     * @en The line height of the paragraph, the default line height is recommended for long text (more than 5 lines). `close` line height is recommended for short text (less than or equal to 3 lines).
     */
    spacing: {
      type: String as PropType<'default' | 'close'>,
      default: 'default',
    },
  },
  setup(props, { attrs, slots }) {
    const { blockquote, spacing } = toRefs(props);
    const prefixCls = getPrefixCls('typography');
    const component = computed(() =>
      blockquote?.value ? 'blockquote' : 'div'
    );
    const classNames = computed(() => [
      {
        [`${prefixCls}-spacing-close`]: spacing?.value === 'close',
      },
    ]);

    const { listeners } = useListeners();

    return () => (
      <Base
        {...props}
        {...attrs}
        {...listeners.value}
        class={classNames.value}
        component={component.value}
        v-slots={slots}
      />
    );
  },
});
