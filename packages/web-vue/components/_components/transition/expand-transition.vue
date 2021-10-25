<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExpandTransition',
  setup() {
    return {
      onBeforeEnter(el: HTMLDivElement) {
        el.style.height = '0';
      },
      onEnter(el: HTMLDivElement) {
        el.style.height = `${el.scrollHeight}px`;
      },
      onAfterEnter(el: HTMLDivElement) {
        el.style.height = '';
      },
      onBeforeLeave(el: HTMLDivElement) {
        el.style.height = `${el.scrollHeight}px`;
      },
      onLeave(el: HTMLDivElement) {
        el.style.height = `0`;
      },
      onAfterLeave(el: HTMLElement) {
        el.style.height = ``;
      },
    };
  },
});
</script>
