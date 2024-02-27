<template>
  <Trigger
    :class="prefixCls"
    trigger="hover"
    :position="position"
    :popup-visible="computedPopupVisible"
    :popup-offset="10"
    show-arrow
    :content-class="contentCls"
    :content-style="computedContentStyle"
    :arrow-class="arrowCls"
    :arrow-style="computedArrowStyle"
    :popup-container="popupContainer"
    animation-name="zoom-in-fade-out"
    auto-fit-transform-origin
    role="tooltip"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <slot />
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </Trigger>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, CSSProperties, defineComponent, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TriggerPosition } from '../_utils/constant';
import Trigger from '../trigger';
import { ClassName } from '../_utils/types';

export default defineComponent({
  name: 'Tooltip',
  components: {
    Trigger,
  },
  props: {
    /**
     * @zh 文字气泡是否可见
     * @en Whether the tooltip is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 文字气泡默认是否可见（非受控模式）
     * @en Whether the tooltip is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 文字气泡内容
     * @en Tooltip content
     */
    content: String,
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
     */
    position: {
      type: String as PropType<TriggerPosition>,
      default: 'top',
    },
    /**
     * @zh 是否展示为迷你尺寸
     * @en Whether to display as a mini size
     */
    mini: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 弹出框的背景颜色
     * @en Background color of the popover
     */
    backgroundColor: {
      type: String,
    },
    /**
     * @zh 弹出框内容的类名
     * @en The class name of the popup content
     */
    contentClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 弹出框内容的样式
     * @en The style of the popup content
     */
    contentStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 弹出框箭头的类名
     * @en The class name of the popup arrow
     */
    arrowClass: {
      type: [String, Array, Object] as PropType<ClassName>,
    },
    /**
     * @zh 弹出框箭头的样式
     * @en The style of the popup arrow
     */
    arrowStyle: {
      type: Object as PropType<CSSProperties>,
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<string | HTMLElement>,
    },
  },
  emits: {
    'update:popupVisible': (visible: boolean) => true,
    /**
     * @zh 文字气泡显示状态改变时触发
     * @en Emitted when the tooltip display status changes
     * @param {boolean} visible
     */
    'popupVisibleChange': (visible: boolean) => true,
  },
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('tooltip');

    const _popupVisible = ref(props.defaultPopupVisible);
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );

    const handlePopupVisibleChange = (visible: boolean) => {
      _popupVisible.value = visible;
      emit('update:popupVisible', visible);
      emit('popupVisibleChange', visible);
    };

    const contentCls = computed(() => [
      `${prefixCls}-content`,
      props.contentClass,
      { [`${prefixCls}-mini`]: props.mini },
    ]);

    const computedContentStyle = computed<CSSProperties | undefined>(() => {
      if (props.backgroundColor || props.contentStyle) {
        return {
          backgroundColor: props.backgroundColor,
          ...props.contentStyle,
        };
      }
      return undefined;
    });

    const arrowCls = computed(() => [
      `${prefixCls}-popup-arrow`,
      props.arrowClass,
    ]);

    const computedArrowStyle = computed<CSSProperties | undefined>(() => {
      if (props.backgroundColor || props.arrowStyle) {
        return {
          backgroundColor: props.backgroundColor,
          ...props.arrowStyle,
        };
      }
      return undefined;
    });

    return {
      prefixCls,
      computedPopupVisible,
      contentCls,
      computedContentStyle,
      arrowCls,
      computedArrowStyle,
      handlePopupVisibleChange,
    };
  },
});
</script>
