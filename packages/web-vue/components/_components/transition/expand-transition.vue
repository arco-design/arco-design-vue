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

  const toHTMLElement = (element: Element) => element as HTMLElement;

  export default defineComponent({
    name: 'ExpandTransition',
    setup() {
      return {
        onBeforeEnter(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = '0';
        },
        onEnter(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = `${element.scrollHeight}px`;
        },
        onAfterEnter(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = '';
        },
        onBeforeLeave(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = `${element.scrollHeight}px`;
        },
        onLeave(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = `0`;
        },
        onAfterLeave(el: Element) {
          const element = toHTMLElement(el);
          element.style.height = ``;
        },
      };
    },
  });
</script>
