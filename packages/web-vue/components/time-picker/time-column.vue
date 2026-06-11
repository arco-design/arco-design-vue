<template>
  <div ref="refWrapper" :class="`${prefixCls}-column`">
    <ul>
      <li
        v-for="item in list"
        :key="item.value"
        :ref="
          (el) => {
            onItemRef(el, item);
          }
        "
        :class="[
          `${prefixCls}-cell`,
          {
            [`${prefixCls}-cell-disabled`]: item.disabled,
            [`${prefixCls}-cell-selected`]: item.selected,
          },
        ]"
        @click="
          () => {
            onItemClick(item);
          }
        "
      >
        <div :class="`${prefixCls}-cell-inner`">{{ item.label }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { nextTick, onMounted, PropType, ref, watch, type ComponentPublicInstance } from 'vue';

  import { isUndefined } from '../_utils/is';
  import { TimeList, TimeListItem } from './interface';
  import { scrollTo } from './utils';

  defineOptions({ name: 'TimePickerColumn' });

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true,
    },
    list: {
      type: Array as PropType<TimeList>,
      required: true,
    },
    value: {
      type: [Number, String],
    },
    visible: {
      type: Boolean,
    },
  });

  const emit = defineEmits<{
    select: [_value: number | string];
  }>();

  const refMap = ref(new Map<TimeListItem['value'], HTMLElement>());
  const refWrapper = ref<HTMLElement>();

  function scrollToTop(easing = false) {
    if (!refWrapper.value || isUndefined(props.value) || !props.visible) {
      return;
    }

    const refSelected = refMap.value.get(props.value);

    if (refSelected) {
      scrollTo(refWrapper.value, refSelected.offsetTop, easing ? 100 : 0);
    }
  }

  watch(
    () => [props.value, props.visible],
    (_, [, preVisible]) => {
      if (props.visible !== preVisible) {
        nextTick(() => {
          scrollToTop();
        });
      } else {
        scrollToTop(true);
      }
    },
  );

  onMounted(() => {
    scrollToTop();
  });

  const onItemRef = (el: Element | ComponentPublicInstance | null, item: TimeListItem) => {
    const element =
      el instanceof HTMLElement
        ? el
        : el && '$el' in el && el.$el instanceof HTMLElement
          ? el.$el
          : null;

    if (element) {
      refMap.value.set(item.value, element);
    }
  };

  const onItemClick = (item: TimeListItem) => {
    if (!item.disabled) {
      emit('select', item.value);
    }
  };
</script>
