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
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { isUndefined } from '../_utils/is';
import { TimeList, TimeListItem } from './interface';
import { scrollTo } from './utils';

export default defineComponent({
  name: 'TimePickerColumn',
  props: {
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
  },
  emits: ['select'],
  setup(props, { emit }) {
    const { visible, value } = toRefs(props);
    const refMap = ref(new Map<TimeListItem['value'], HTMLElement>());
    const refWrapper = ref<HTMLElement>();

    function scrollToTop(easing = false) {
      if (!refWrapper.value || isUndefined(value?.value) || !visible?.value) {
        return;
      }

      const refSelected = refMap.value.get(value.value);

      if (refSelected) {
        scrollTo(refWrapper.value, refSelected.offsetTop, easing ? 100 : 0);
      }
    }

    watch([value, visible], (_, [, preVisible]) => {
      if (visible.value !== preVisible) {
        nextTick(() => {
          scrollToTop();
        });
      } else {
        scrollToTop(true);
      }
    });

    onMounted(() => {
      scrollToTop();
    });

    return {
      refWrapper,
      refMap,
      onItemRef(el: HTMLElement, item: TimeListItem) {
        refMap.value.set(item.value, el);
      },
      onItemClick(item: TimeListItem) {
        if (!item.disabled) {
          emit('select', item.value);
        }
      },
    };
  },
});
</script>
