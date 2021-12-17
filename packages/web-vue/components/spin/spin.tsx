import { cloneVNode, computed, defineComponent } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconLoading from '../icon/icon-loading';
import DotLoading from './dot-loading';
import { getFirstComponent } from '../_utils/vue-utils';

export default defineComponent({
  name: 'Spin',
  props: {
    /**
     * @zh 尺寸
     * @en Size
     */
    size: {
      type: Number,
    },
    /**
     * @zh 是否为加载中状态（仅在容器模式下生效）
     * @en Whether it is loading state (Only effective in container mode)
     */
    loading: Boolean,
    /**
     * @zh 是否使用点类型的动画
     * @en Whether to use dot type animation
     */
    dot: Boolean,
    /**
     * @zh 提示内容
     * @en Prompt content
     */
    tip: String,
  },
  /**
   * @zh 自定义图标（自动旋转）
   * @en Custom icon (auto-rotation)
   * @slot icon
   */
  /**
   * @zh 自定义元素
   * @en Custom element
   * @slot element
   */
  setup(props, { slots, attrs }) {
    const prefixCls = getPrefixCls('spin');

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-loading`]: props.loading,
        [`${prefixCls}-with-tip`]: props.tip && !slots.default,
      },
    ]);

    const renderIcon = () => {
      if (slots.icon) {
        const iconVNode = getFirstComponent(slots.icon());
        if (iconVNode) {
          return cloneVNode(iconVNode, { spin: true });
        }
      }
      if (slots.element) {
        return slots.element();
      }
      if (props.dot) {
        return <DotLoading size={props.size} />;
      }
      return <IconLoading spin={true} />;
    };

    const renderSpinIcon = () => {
      const style = props.size ? { fontSize: `${props.size}px` } : undefined;

      return (
        <>
          <div class={`${prefixCls}-icon`} style={style}>
            {renderIcon()}
          </div>
          {props.tip && <div class={`${prefixCls}-tip`}>{props.tip}</div>}
        </>
      );
    };

    return () => (
      <div class={cls.value}>
        {slots.default ? (
          <>
            {slots.default()}
            {props.loading && (
              <div class={`${prefixCls}-mask`}>
                <div class={`${prefixCls}-mask-icon`}>{renderSpinIcon()}</div>
              </div>
            )}
          </>
        ) : (
          renderSpinIcon()
        )}
      </div>
    );
  },
});
