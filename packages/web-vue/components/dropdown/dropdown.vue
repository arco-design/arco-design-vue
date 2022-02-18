<template>
  <Trigger
    :popup-visible="computedPopupVisible"
    animation-name="slide-dynamic-origin"
    auto-fit-transform-origin
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :popup-container="popupContainer"
    :opened-class="`${prefixCls}-open`"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <slot />
    <template #content>
      <DropdownPanel>
        <slot name="content" />
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
      </DropdownPanel>
    </template>
  </Trigger>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, reactive, toRefs } from 'vue';
import { TriggerEvent } from '../_utils/constant';
import { getPrefixCls } from '../_utils/global-config';
import Trigger from '../trigger';
import DropdownPanel from './dropdown-panel.vue';
import { useTrigger } from '../_hooks/use-trigger';
import { dropdownInjectionKey } from './context';

type DropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

export default defineComponent({
  name: 'Dropdown',
  components: {
    Trigger,
    DropdownPanel,
  },
  props: {
    /**
     * @zh 弹出框是否可见
     * @en Whether the popup is visible
     * @vModel
     */
    popupVisible: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 弹出框默认是否可见（非受控模式）
     * @en Whether the popup is visible by default (uncontrolled mode)
     */
    defaultPopupVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click','focus','contextMenu'
     */
    trigger: {
      type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
      default: 'click',
    },
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'top','tl','tr','bottom','bl','br'
     */
    position: {
      type: String as PropType<DropdownPosition>,
      default: 'bottom',
    },
    /**
     * @zh 弹出框的挂载容器
     * @en Mount container for popup
     */
    popupContainer: {
      type: [String, Object] as PropType<
        string | HTMLElement | null | undefined
      >,
    },
  },
  emits: [
    'update:popupVisible',
    /**
     * @zh 下拉框显示状态发生改变时触发
     * @en Triggered when the display status of the drop-down box changes
     */
    'popupVisibleChange',
    /**
     * @zh 用户选择时触发
     * @en Triggered when the user selects
     * @property {string | number | Record<string, unknown>} value
     */
    'select',
  ],
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  /**
   * @zh 页脚
   * @en Footer
   * @slot footer
   * @version 2.10.0
   */
  setup(props, { emit }) {
    const { defaultPopupVisible, popupVisible } = toRefs(props);
    const prefixCls = getPrefixCls('dropdown');

    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
      defaultPopupVisible,
      popupVisible,
      emit,
    });

    const handleOptionClick = (
      value: string | number | Record<string, unknown> | undefined,
      ev: Event
    ) => {
      emit('select', value, ev);
      handlePopupVisibleChange(false);
    };

    provide(
      dropdownInjectionKey,
      reactive({
        onOptionClick: handleOptionClick,
      })
    );

    return {
      prefixCls,
      computedPopupVisible,
      handlePopupVisibleChange,
    };
  },
});
</script>
