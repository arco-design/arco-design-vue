<template>
  <li
    :class="cls"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <checkbox
      v-if="multiple"
      :class="`${prefixCls}-checkbox`"
      :model-value="isSelected"
      :disabled="disabled"
    >
      <slot />
    </checkbox>
    <template v-else>
      <slot />
    </template>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import Checkbox from '../../checkbox';

export default defineComponent({
  name: 'Option',
  components: {
    Checkbox,
  },
  props: {
    /**
     * @zh 选项值（如不填，会从内容中获取）
     * @en Option value (if not filled, it will be obtained from the content)
     */
    value: [String, Number],
    /**
     * @zh 选项标签（如不填，会从内容中获取）
     * @en Option label (if not filled, it will be obtained from the content)
     */
    label: String,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     */
    disabled: Boolean,
    // private
    isSelected: Boolean,
    isActive: Boolean,
    multiple: Boolean,
  },
  emits: ['click', 'mouseenter', 'mouseleave'],
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('dropdown-option');

    const handleClick = (e: Event) => {
      if (!props.disabled) {
        emit('click', props.value, e);
      }
    };

    const handleMouseEnter = (e: Event) => {
      if (!props.disabled) {
        emit('mouseenter', props.value, e);
      }
    };

    const handleMouseLeave = (e: Event) => {
      if (!props.disabled) {
        emit('mouseleave', props.value, e);
      }
    };

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-selected`]: props.isSelected,
        [`${prefixCls}-active`]: props.isActive,
        [`${prefixCls}-multiple`]: props.multiple,
        // [`${prefixCls}-empty`]: !children,
      },
    ]);

    return {
      prefixCls,
      cls,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
});
</script>
