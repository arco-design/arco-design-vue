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
    // TransitionProps 的钩子参数类型是 Element，这里统一断言为 HTMLElement
    const html = (el: Element) => el as HTMLElement;
    return {
      onBeforeEnter(el: Element) {
        html(el).style.height = '0';
      },
      onEnter(el: Element) {
        html(el).style.height = `${html(el).scrollHeight}px`;
      },
      onAfterEnter(el: Element) {
        html(el).style.height = '';
      },
      onBeforeLeave(el: Element) {
        html(el).style.height = `${html(el).scrollHeight}px`;
      },
      onLeave(el: Element) {
        html(el).style.height = `0`;
      },
      onAfterLeave(el: Element) {
        html(el).style.height = ``;
      },
    };
  },
});
</script>
