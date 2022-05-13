import { defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import Tooltip from '../tooltip';

/**
 * @version 2.17.0
 */
export default defineComponent({
  name: 'ImagePreviewAction',
  components: {
    Tooltip,
  },
  inheritAttrs: false,
  props: {
    /**
     * @zh 名称
     * @en the name of the action
     */
    name: {
      type: String,
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable the action
     */
    disabled: {
      type: Boolean,
    },
  },
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('image-preview-toolbar-action');
    return () => {
      const { name, disabled } = props;
      const children = slots.default?.();

      if (!children || !children.length) return null;

      const content = (
        <div
          class={[
            `${prefixCls}`,
            {
              [`${prefixCls}-disabled`]: disabled,
            },
          ]}
          onMousedown={(e) => {
            /** 解决快速点击按钮的情况下 tooltip 被选中 */
            e.preventDefault();
          }}
          {...attrs}
        >
          <span class={`${prefixCls}-content`}>{children}</span>
        </div>
      );

      return name ? (
        <Tooltip class={`${prefixCls}-tooltip`} content={name}>
          {content}
        </Tooltip>
      ) : (
        content
      );
    };
  },
});
