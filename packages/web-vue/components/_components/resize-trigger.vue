<template>
  <ResizeObserver @resize="onResize">
    <div :class="classNames">
      <!-- @slot 自定义内容 -->
      <slot>
        <div :class="`${prefixCls}-icon-wrapper`">
          <!-- @slot 自定义 icon -->
          <slot name="icon">
            <IconDragDot v-if="isHorizontal" :class="`${prefixCls}-icon`" />
            <IconDragDotVertical v-else :class="`${prefixCls}-icon`" />
          </slot>
        </div>
      </slot>
    </div>
  </ResizeObserver>
</template>
<script setup lang="tsx">
  import { computed, PropType, toRefs } from 'vue';

  import IconDragDot from '../icon/icon-drag-dot';
  import IconDragDotVertical from '../icon/icon-drag-dot-vertical';
  import ResizeObserver from './resize-observer';

  defineOptions({ name: 'ResizeTrigger' });

  const emit = defineEmits<{ resize: [_entry: ResizeObserverEntry] }>();

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true,
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  });

  const { direction, prefixCls } = toRefs(props);
  const isHorizontal = computed(() => direction?.value === 'horizontal');
  const classNames = computed(() => [
    prefixCls.value,
    {
      [`${prefixCls.value}-horizontal`]: isHorizontal.value,
      [`${prefixCls.value}-vertical`]: !isHorizontal.value,
    },
  ]);
  const onResize = (entry: ResizeObserverEntry) => {
    emit('resize', entry);
  };
</script>
