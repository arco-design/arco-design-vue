<template>
  <Trigger
    :popup-visible="computedPopupVisible"
    :trigger="trigger"
    :position="position"
    :disabled="disabled"
    :popup-offset="4"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <dropdown-option
      v-bind="optionProps"
      :active="computedPopupVisible"
      uninject-context
    >
      <slot />
      <template v-if="$slots.icon" #icon>
        <slot name="icon" />
      </template>
      <template #suffix>
        <slot name="suffix">
          <IconRight />
        </slot>
      </template>
    </dropdown-option>
    <template #content>
      <dropdown-panel :class="`${prefixCls}-submenu`">
        <slot name="content" />
        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
      </dropdown-panel>
    </template>
  </Trigger>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import Trigger from '../trigger';
import DropdownPanel from './dropdown-panel.vue';
import DropdownOption from './dropdown-option.vue';
import IconRight from '../icon/icon-right';
import { getPrefixCls } from '../_utils/global-config';
import { useTrigger } from '../_hooks/use-trigger';

export default defineComponent({
  name: 'Dsubmenu',
  components: {
    Trigger,
    DropdownPanel,
    DropdownOption,
    IconRight,
  },
  props: {
    /**
     * @zh 选项值（2.16.0 版本后暂无用处）
     * @en Value (Not useful after version 2.16.0)
     */
    value: {
      type: [String, Number],
    },
    /**
     * @zh 是否禁用
     * @en Whether to disable
     * @version 2.10.0
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 触发方式
     * @en Trigger method
     * @values 'hover','click'
     * @version 2.10.0
     */
    trigger: {
      type: [String, Array] as PropType<
        'hover' | 'click' | ('hover' | 'click')[]
      >,
      default: 'click',
    },
    /**
     * @zh 弹出位置
     * @en Popup position
     * @values 'rt','lt'
     * @version 2.10.0
     */
    position: {
      type: String as PropType<'rt' | 'lt'>,
      default: 'rt',
    },
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
     * @zh 自定义选项属性
     * @en Custom option properties
     * @version 2.29.0
     */
    optionProps: {
      type: Object,
    },
  },
  emits: {
    'update:popupVisible': (visible: boolean) => true,
    /**
     * @zh 下拉框显示状态发生改变时触发
     * @en Triggered when the display status of the drop-down box changes
     * @property {boolean} visible
     */
    'popupVisibleChange': (visible: boolean) => true,
  },
  /**
   * @zh 子菜单内容
   * @en Submenu content
   * @slot content
   */
  /**
   * @zh 页脚
   * @en Footer
   * @slot footer
   * @version 2.10.0
   */
  /**
   * @zh 图标
   * @en Icon
   * @slot icon
   * @version 2.29.0
   */
  setup(props, { emit }) {
    const { defaultPopupVisible, popupVisible } = toRefs(props);
    const prefixCls = getPrefixCls('dropdown');

    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger({
      defaultPopupVisible,
      popupVisible,
      emit,
    });

    return {
      prefixCls,
      computedPopupVisible,
      handlePopupVisibleChange,
    };
  },
});
</script>
