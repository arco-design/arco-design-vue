<template>
  <Trigger
    :popup-visible="computedPopupVisible"
    :trigger="trigger"
    :position="position"
    :disabled="disabled"
    :popup-offset="4"
    @popup-visible-change="handlePopupVisibleChange"
  >
    <dropdown-option :active="computedPopupVisible" uninject-context>
      <slot />
      <template #suffix>
        <IconRight />
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
import { defineComponent, PropType } from 'vue';
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
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('dropdown');

    const { computedPopupVisible, handlePopupVisibleChange } = useTrigger(
      props,
      { emit }
    );

    return {
      prefixCls,
      computedPopupVisible,
      handlePopupVisibleChange,
    };
  },
});
</script>
