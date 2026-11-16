import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import Tooltip from '../../tooltip';
import ResizeObserver from '../resize-observer-v2';
import { getPrefixCls } from '../../_utils/global-config';

export default defineComponent({
  name: 'AutoTooltip',
  inheritAttrs: false,
  props: {
    tooltipProps: {
      type: Object,
    },
  },
  setup(props, { attrs, slots }) {
    const prefix = getPrefixCls('auto-tooltip');

    const containerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const text = ref('');
    const showTooltip = ref(false);

    const calTooltip = () => {
      if (containerRef.value && contentRef.value) {
        const _show =
          contentRef.value.offsetWidth > containerRef.value.offsetWidth;
        if (_show !== showTooltip.value) {
          showTooltip.value = _show;
        }
      }
    };

    const getText = () => {
      if (
        contentRef.value?.textContent &&
        contentRef.value.textContent !== text.value
      ) {
        text.value = contentRef.value.textContent;
      }
    };

    const onResize = () => {
      getText();
      calTooltip();
    };

    onMounted(() => {
      getText();
      calTooltip();
    });

    onUpdated(() => {
      getText();
      calTooltip();
    });

    const renderContent = () => {
      return (
        <span ref={containerRef} class={prefix} {...attrs}>
          <ResizeObserver onResize={onResize}>
            <span ref={contentRef} class={`${prefix}-content`}>
              {slots.default?.()}
            </span>
          </ResizeObserver>
        </span>
      );
    };

    // Tooltip 的根组件是 Trigger，attrs 会透传给 Trigger；
    // Trigger 声明并触发了 resize 事件，所以这里挂 onResize 是有效监听
    // （Tooltip 的公共 props 没有声明该监听，做局部断言）
    const resizeListener = { onResize } as unknown as Record<string, any>;

    return () => {
      if (showTooltip.value) {
        return (
          <Tooltip
            content={text.value}
            {...resizeListener}
            {...props.tooltipProps}
          >
            {renderContent()}
          </Tooltip>
        );
      }

      return (
        <ResizeObserver onResize={onResize}>{renderContent()}</ResizeObserver>
      );
    };
  },
});
