<template>
  <ButtonGroup>
    <Button
      :size="size"
      :type="type"
      :disabled="disabled"
      v-bind="buttonProps"
      @click="handleClick"
    >
      <slot />
    </Button>
    <Dropdown
      :popup-visible="computedPopupVisible"
      :trigger="trigger"
      :position="position"
      :popup-container="popupContainer"
      @select="handleSelect"
      @popup-visible-change="handlePopupVisibleChange"
    >
      <Button :size="size" :type="type" :disabled="disabled">
        <template #icon>
          <slot name="icon">
            <IconMore />
          </slot>
        </template>
      </Button>
      <template #content>
        <slot name="content" />
      </template>
    </Dropdown>
  </ButtonGroup>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import IconMore from '../icon/icon-more';
import Button, { ButtonGroup } from '../button';
import Dropdown from './dropdown.vue';
import { getPrefixCls } from '../_utils/global-config';
import { TriggerEvent } from '../_utils/constant';
import { useTrigger } from '../_hooks/use-trigger';

type DropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

export default defineComponent({
  name: 'DropdownButton',
  components: {
    IconMore,
    Button,
    ButtonGroup,
    Dropdown,
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
      default: 'br',
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
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 按钮类型
     * @en Button type
     */
    type: {
      type: String,
    },
    /**
     * @zh 按钮大小
     * @en Button size
     */
    size: {
      type: String,
    },
    /**
     * @zh 按钮属性
     * @en Button props
     */
    buttonProps: {
      type: Object,
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
     * @zh 点击按钮时触发
     * @en Emitted when the button is clicked
     * @property {Event} event
     */
    'click',
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
   * @zh 按钮图标
   * @en Button icon
   * @slot icon
   */
  setup(props, { emit }) {
    const { defaultPopupVisible, popupVisible } = toRefs(props);
    const prefixCls = getPrefixCls('dropdown');

    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
      defaultPopupVisible,
      popupVisible,
      emit,
    });

    const handleClick = (ev: Event) => {
      emit('click', ev);
    };

    const handleSelect = (
      value: string | number | Record<string, unknown> | undefined,
      ev: Event
    ) => {
      emit('select', value, ev);
    };

    return {
      prefixCls,
      computedPopupVisible,
      handleClick,
      handleSelect,
      handlePopupVisibleChange,
    };
  },
});
</script>
