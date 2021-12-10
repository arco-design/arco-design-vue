<template>
  <component
    :is="component"
    :class="cls"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span v-if="$slots.icon" :class="`${prefixCls}-icon`">
      <slot name="icon" />
    </span>
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
    <span v-if="$slots.suffix" :class="`${prefixCls}-suffix`">
      <slot name="suffix" />
    </span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getPrefixCls } from '../../_utils/global-config';
import Checkbox from '../../checkbox';
import { EmitType } from '../../_utils/types';

export default defineComponent({
  name: 'DropdownOption',
  components: {
    Checkbox,
  },
  props: {
    value: [String, Number],
    label: String,
    disabled: Boolean,
    multiple: Boolean,
    isSelected: Boolean,
    isActive: Boolean,
    component: {
      type: String,
      default: 'li',
    },
    onClick: {
      type: [Function, Array] as PropType<
        EmitType<(value: string | number, ev: Event) => void>
      >,
    },
    onMouseenter: {
      type: [Function, Array] as PropType<
        EmitType<(value: string | number, ev: Event) => void>
      >,
    },
    onMouseleave: {
      type: [Function, Array] as PropType<
        EmitType<(value: string | number, ev: Event) => void>
      >,
    },
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
        [`${prefixCls}-active`]: props.isActive,
        [`${prefixCls}-multiple`]: props.multiple,
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
