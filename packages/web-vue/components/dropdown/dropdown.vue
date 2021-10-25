<template>
  <a-trigger
    :popup-visible="computedPopupVisible"
    :trigger="trigger"
    :position="position"
    :popup-offset="4"
    :popup-container="popupContainer"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <slot />
    <template #content>
      <div :class="`${prefixCls}`">
        <ul :class="`${prefixCls}-list`">
          <slot name="content" />
        </ul>
      </div>
    </template>
  </a-trigger>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, provide, reactive, ref } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { TriggerEvent } from '../_utils/constant';
import ATrigger from '../trigger';
import { dropdownKey } from './context';

const DROPDOWN_POSITIONS = ['top', 'tl', 'tr', 'bottom', 'bl', 'br'] as const;
type DropdownPosition = typeof DROPDOWN_POSITIONS[number];

export default defineComponent({
  name: 'Dropdown',
  components: {
    ATrigger,
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
      type: String as PropType<TriggerEvent>,
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
    /**
     * @zh 下拉框显示状态发生改变时触发
     * @en Triggered when the display status of the drop-down box changes
     */
    'popupVisibleChange',
    /**
     * @zh 用户选择时触发
     * @en Triggered when the user selects
     */
    'select',
  ],
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('dropdown');
    const _popupVisible = ref(props.defaultPopupVisible);
    const computedPopupVisible = computed(
      () => props.popupVisible ?? _popupVisible.value
    );

    const handleClickOption = (value: string | number) => {
      emit('select', value);
      handlePopupVisibleChange(false);
    };

    const handlePopupVisibleChange = (popupVisible: boolean) => {
      _popupVisible.value = popupVisible;
      emit('popupVisibleChange', popupVisible);
    };

    provide(
      dropdownKey,
      reactive({
        onClickOption: handleClickOption,
      })
    );

    return {
      prefixCls,
      computedPopupVisible,
      handleClickOption,
      handlePopupVisibleChange,
    };
  },
});
</script>
