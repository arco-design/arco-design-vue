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

  import { useTrigger } from '../_hooks/use-trigger';
  import { TriggerEvent } from '../_utils/constant';
  import { getPrefixCls } from '../_utils/global-config';
  import Trigger from '../trigger';
  import { dropdownInjectionKey } from './context';
  import DropdownPanel from './dropdown-panel.vue';
  import { DropdownPosition } from './interface';

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
        type: [String, Object] as PropType<string | HTMLElement>,
      },
      /**
       * @zh 弹出框最大高度
       * @en Maximum height of the popup
       * @version 2.29.0
       */
      popupMaxHeight: {
        type: [Boolean, Number],
        default: true,
      },
      /**
       * @zh 是否在用户选择后隐藏弹出框
       * @en Whether to hide popup when the user selects
       * @version 2.43.0
       */
      hideOnSelect: {
        type: Boolean,
        default: true,
      },
    },
    emits: {
      'update:popupVisible': (_visible: boolean) => true,
      /**
       * @zh 下拉框显示状态发生改变时触发
       * @en Triggered when the display status of the drop-down box changes
       * @param {boolean} visible
       */
      'popupVisibleChange': (_visible: boolean) => true,
      /**
       * @zh 用户选择时触发
       * @en Triggered when the user selects
       * @param {string | number | Record<string, any> | undefined } value
       * @param {Event} ev
       */
      'select': (_value: string | number | Record<string, unknown> | undefined, _ev: Event) => true,
    },
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
      const { defaultPopupVisible, popupVisible, popupMaxHeight } = toRefs(props);
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

      const handleOptionClick = (
        value: string | number | Record<string, any> | undefined,
        ev: Event,
      ) => {
        emit('select', value, ev);
        props.hideOnSelect && handlePopupVisibleChange(false);
      };

      provide(
        dropdownInjectionKey,
        reactive({
          popupMaxHeight,
          onOptionClick: handleOptionClick,
        }),
      );

      return {
        prefixCls,
        computedPopupVisible,
        handlePopupVisibleChange,
      };
    },
  });
</script>
