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

<script setup lang="ts">
  defineOptions({ name: 'ExpandTransition' });

  const toHTMLElement = (element: Element) => element as HTMLElement;

  const onBeforeEnter = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = '0';
  };
  const onEnter = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = `${element.scrollHeight}px`;
  };
  const onAfterEnter = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = '';
  };
  const onBeforeLeave = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = `${element.scrollHeight}px`;
  };
  const onLeave = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = `0`;
  };
  const onAfterLeave = (el: Element) => {
    const element = toHTMLElement(el);
    element.style.height = ``;
  };
</script>
