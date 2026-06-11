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

<script setup lang="ts">
  import { PropType } from 'vue';

  import RenderFunction from '../../_components/render-function';
  import { isFunction } from '../../_utils/is';
  import Button from '../../button';
  import useInjectDatePickerTransform from '../hooks/use-inject-datepicker-transform';
  import { ShortcutType } from '../interface';

  export interface ShortcutsProps {
    prefixCls: string;
    shortcuts: ShortcutType[];
  }

  defineOptions({ name: 'PanelShortcuts' });

  const props = defineProps({
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
  });

  const emit = defineEmits<{
    'item-click': [_item: ShortcutType];
    'item-mouse-enter': [_item: ShortcutType];
    'item-mouse-leave': [_item: ShortcutType];
    'now-click': [];
  }>();

  const datePickerT = useInjectDatePickerTransform();

  const onItemClick = (item: ShortcutType) => {
    emit('item-click', item);
  };
  const onItemMouseEnter = (item: ShortcutType) => {
    emit('item-mouse-enter', item);
  };
  const onItemMouseLeave = (item: ShortcutType) => {
    emit('item-mouse-leave', item);
  };
  const onNowClick = () => {
    emit('now-click');
  };
</script>
