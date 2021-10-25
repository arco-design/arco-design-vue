<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExpandTransition',
  props: {
    expanded: Boolean,
  },
  emits: ['end'],
  setup(props, { emit }) {
    return {
      onBeforeEnter(el: HTMLDivElement) {
        el.style.height = props.expanded ? '0' : `${el.scrollHeight}px`;
      },
      onEnter(el: HTMLDivElement) {
        el.style.height = props.expanded ? `${el.scrollHeight}px` : '0';
      },
      onAfterEnter(el: HTMLDivElement) {
        el.style.height = props.expanded ? '' : '0';
        emit('end');
      },
      onBeforeLeave(el: HTMLDivElement) {
        el.style.display = 'none';
      },
    };
  },
});
</script>
