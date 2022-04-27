<template>
  <div :class="`${prefixCls}-shortcuts`">
    <Button v-if="showNowBtn" size="mini" @click="() => onNowClick()">
      {{ datePickerT('datePicker.now') }}
    </Button>
    <Button
      v-for="(item, index) in shortcuts"
      :key="index"
      size="mini"
      @click="() => onItemClick(item)"
      @mouseenter="() => onItemMouseEnter(item)"
      @mouseleave="() => onItemMouseLeave(item)"
    >
      <RenderFunction v-if="isFunction(item.label)" :render-func="item.label" />
      <template v-else>
        {{ item.label }}
      </template>
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ShortcutType } from '../interface';
import Button from '../../button';
import RenderFunction from '../../_components/render-function';
import { isFunction } from '../../_utils/is';
import useInjectDatePickerTransform from '../hooks/use-inject-datepicker-transform';

export interface ShortcutsProps {
  prefixCls: string;
  shortcuts: ShortcutType[];
}

export default defineComponent({
  name: 'PanelShortcuts',
  components: {
    Button,
    RenderFunction,
  },
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    shortcuts: {
      type: Array as PropType<ShortcutsProps['shortcuts']>,
      default: () => [],
    },
    showNowBtn: {
      type: Boolean,
    },
  },
  emits: ['item-click', 'item-mouse-enter', 'item-mouse-leave', 'now-click'],
  setup(props: ShortcutsProps, { emit }) {
    const datePickerT = useInjectDatePickerTransform();
    return {
      datePickerT,
      onItemClick: (item: ShortcutType) => {
        emit('item-click', item);
      },
      onItemMouseEnter: (item: ShortcutType) => {
        emit('item-mouse-enter', item);
      },
      onItemMouseLeave: (item: ShortcutType) => {
        emit('item-mouse-leave', item);
      },
      onNowClick: () => {
        emit('now-click');
      },
      isFunction,
    };
  },
});
</script>
