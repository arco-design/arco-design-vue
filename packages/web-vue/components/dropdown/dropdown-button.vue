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
      :hide-on-select="hideOnSelect"
      @select="handleSelect"
      @popup-visible-change="handlePopupVisibleChange"
    >
      <Button :size="size" :type="type" :disabled="disabled">
        <template #icon>
          <slot name="icon" :popup-visible="computedPopupVisible">
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

<script setup lang="ts">
  import { PropType, toRefs } from 'vue';

  import { useTrigger } from '../_hooks/use-trigger';
  import { TriggerEvent } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import Button, { ButtonGroup, ButtonProps } from '../button';
  import IconMore from '../icon/icon-more';
  import Dropdown from './dropdown.vue';

  type DropdownPosition = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';

  defineOptions({ name: 'DropdownButton' });

  const props = defineProps({
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
      type: [String, Object] as PropType<string | HTMLElement>,
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
      type: String as PropType<ButtonProps['type']>,
    },
    /**
     * @zh 按钮大小
     * @en Button size
     */
    size: {
      type: String as PropType<ButtonProps['size']>,
    },
    /**
     * @zh 按钮属性
     * @en Button props
     */
    buttonProps: {
      type: Object as PropType<ButtonProps>,
    },
    /**
     * @zh 是否在用户选择后隐藏弹出框
     * @en Whether to hide popup when the user selects
     */
    hideOnSelect: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits<{
    'update:popupVisible': [_visible: boolean];
    /**
     * @zh 下拉框显示状态发生改变时触发
     * @en Triggered when the display status of the drop-down box changes
     * @param {boolean} visible
     */
    'popupVisibleChange': [_visible: boolean];
    /**
     * @zh 点击按钮时触发
     * @en Emitted when the button is clicked
     * @param {MouseEvent} ev
     */
    'click': [_ev: MouseEvent];
    /**
     * @zh 用户选择时触发
     * @en Triggered when the user selects
     * @param {string | number | Record<string, any> | undefined} value
     * @param {Event} ev
     */
    'select': [_value: string | number | Record<string, any> | undefined, _ev: Event];
  }>();
  /**
   * @zh 内容
   * @en Content
   * @slot content
   */
  /**
   * @zh 按钮图标
   * @en Button icon
   * @slot icon
   * @binding {boolean} popupVisible
   */

  const { defaultPopupVisible, popupVisible } = toRefs(props);
  const prefixCls = getPrefixCls('dropdown');

  const emitVisibleChange = (
    event: 'update:popupVisible' | 'popupVisibleChange' | 'update:show' | 'showChange',
    visible: boolean,
  ) => {
    if (event === 'update:popupVisible') {
      emit('update:popupVisible', visible);
    } else if (event === 'popupVisibleChange') {
      emit('popupVisibleChange', visible);
    }
  };

  const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
    defaultPopupVisible,
    popupVisible,
    emit: emitVisibleChange,
  });

  const handleClick = (ev: MouseEvent) => {
    emit('click', ev);
  };

  const handleSelect = (
    value: string | number | Record<string, unknown> | undefined,
    ev: Event,
  ) => {
    emit('select', value, ev);
  };
</script>
