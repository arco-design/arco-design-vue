import {
  cloneVNode,
  computed,
  CSSProperties,
  defineComponent,
  inject,
  PropType,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconLoading from '../icon/icon-loading';
import DotLoading from './dot-loading';
import { getFirstComponent } from '../_utils/vue-utils';
import { configProviderInjectionKey } from '../config-provider/context';
import { ClassName } from '../_utils/types';
import { debounce } from '../_utils/debounce';

export default defineComponent({
  name: 'Spin',
  props: {
    /**
     * @zh 是否为块级元素
     * @en Whether block element
     */
    block: Boolean,
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
    /**
     * @zh 延迟显示加载的时间 (ms)
     * @en Specifies a delay(ms) for loading state
     */
    delay: Number,
    /**
     * @zh 自定义容器类名
     * @en Custom wrapper class name
     */
    wrapperClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 自定义容器样式
     * @en Custom wrapper style
     */
    wrapperStyle: {
      type: Object as PropType<CSSProperties>,
    },
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
  /**
   * @zh 自定义提示内容
   * @en Customize the tip content
   * @slot tip
   */
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('spin');
    const configCtx = inject(configProviderInjectionKey, undefined);

    const loading = ref(props.delay ? false : props.loading);

    const countDelay = debounce((value: boolean) => {
      loading.value = value;
    }, props.delay || 0);

    watchEffect(() => {
      if (props.delay) {
        countDelay(props.loading);
      } else {
        loading.value = props.loading;
      }
    });

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-block`]: props.block,
        [`${prefixCls}-loading`]: loading,
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
      if (configCtx?.slots.loading) {
        return configCtx.slots.loading();
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
          {(slots.tip || props.tip) && (
            <div class={`${prefixCls}-tip`}>{slots.tip?.() ?? props.tip}</div>
          )}
        </>
      );
    };

    return () => (
      <div class={cls.value}>
        {slots.default ? (
          <>
            {slots.default()}
            {loading.value && (
              <div
                class={[`${prefixCls}-mask`, props.wrapperClass]}
                style={props.wrapperStyle}
              >
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
