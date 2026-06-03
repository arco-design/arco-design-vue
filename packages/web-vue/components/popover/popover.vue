<template>
  <trigger
    :class="prefixCls"
    :trigger="trigger"
    :position="position"
    :popup-visible="computedPopupVisible"
    :popup-offset="10"
    :content-class="contentCls"
    :content-style="contentStyle"
    :arrow-class="arrowCls"
    :arrow-style="arrowStyle"
    show-arrow
    :popup-container="popupContainer"
    animation-name="zoom-in-fade-out"
    auto-fit-transform-origin
    @popup-visible-change="handlePopupVisibleChange"
  >
    <slot />
    <template #content>
      <div v-if="title || $slots.title" :class="`${prefixCls}-title`">
        <slot name="title">{{ title }}</slot>
      </div>
      <Scrollbar :class="`${prefixCls}-content`" v-bind="scrollbarProps">
        <slot name="content">{{ content }}</slot>
      </Scrollbar>
    </template>
  </trigger>
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { computed, CSSProperties, defineComponent, ref, toRefs } from 'vue';

  import type { TriggerEvent, TriggerPosition } from '../_utils/constant';

  import { useScrollbar } from '../_hooks/use-scrollbar';
  import { getPrefixCls } from '../_utils/global-config';
  import { ClassName } from '../_utils/types';
  import Scrollbar, { ScrollbarProps } from '../scrollbar';
  import Trigger from '../trigger';

  export default defineComponent({
    name: 'Popover',
    components: {
      Scrollbar,
      Trigger,
    },
    props: {
      /**
       * @zh 文字气泡是否可见
       * @en Whether the popover is visible
       * @vModel
       */
      popupVisible: {
        type: Boolean,
        default: undefined,
      },
      /**
       * @zh 文字气泡默认是否可见（非受控模式）
       * @en Whether the popover is visible by default (uncontrolled mode)
       */
      defaultPopupVisible: {
        type: Boolean,
        default: false,
      },
      /**
       * @zh 标题
       * @en Title
       */
      title: String,
      /**
       * @zh 内容
       * @en Content
       */
      content: String,
      /**
       * @zh 触发方式
       * @en Trigger method
       * @values 'hover','click','focus','contextMenu'
       */
      trigger: {
        type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
        default: 'hover',
      },
      /**
       * @zh 弹出位置
       * @en Pop-up position
       * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
       */
      position: {
        type: String as PropType<TriggerPosition>,
        default: 'top',
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
      scrollbar: {
        type: [Boolean, Object] as PropType<boolean | ScrollbarProps>,
        default: true,
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
       * @en Mount container for pop-up box
       */
      popupContainer: {
        type: [String, Object] as PropType<string | HTMLElement>,
      },
    },
    emits: {
      'update:popupVisible': (_visible: boolean) => true,
      /**
       * @zh 文字气泡显示状态改变时触发
       * @en Triggered when the text bubble display status changes
       * @param {boolean} visible
       */
      'popupVisibleChange': (_visible: boolean) => true,
    },
    /**
     * @zh 标题
     * @en Title
     * @slot title
     */
    /**
     * @zh 内容
     * @en Content
     * @slot content
     */
    setup(props, { emit }) {
      const prefixCls = getPrefixCls('popover');
      const _popupVisible = ref(props.defaultPopupVisible);
      const computedPopupVisible = computed(() => props.popupVisible ?? _popupVisible.value);
      const { scrollbar } = toRefs(props);
      const { scrollbarProps } = useScrollbar(scrollbar);

      const handlePopupVisibleChange = (visible: boolean) => {
        _popupVisible.value = visible;
        emit('update:popupVisible', visible);
        emit('popupVisibleChange', visible);
      };

      const contentCls = computed(() => [`${prefixCls}-popup-content`, props.contentClass]);

      const arrowCls = computed(() => [`${prefixCls}-popup-arrow`, props.arrowClass]);

      return {
        prefixCls,
        computedPopupVisible,
        contentCls,
        arrowCls,
        handlePopupVisibleChange,
        scrollbarProps,
      };
    },
  });
</script>
