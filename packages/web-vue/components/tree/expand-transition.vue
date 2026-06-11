<template>
  <transition @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave">
    <slot />
  </transition>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ExpandTransition' });

  const props = defineProps({
    expanded: Boolean,
  });

  const emit = defineEmits<{ end: [] }>();

  const getElement = (el: Element) => el as HTMLDivElement;

  function onEnter(el: Element) {
    const target = getElement(el);
    const endHeight = `${target.scrollHeight}px`;
    target.style.height = props.expanded ? '0' : endHeight;
    // oxlint-disable-next-line no-unused-expressions
    target.getBoundingClientRect();
    target.style.height = props.expanded ? endHeight : '0';
  }
  function onAfterEnter(el: Element) {
    const target = getElement(el);
    target.style.height = props.expanded ? '' : '0';
    emit('end');
  }
  function onBeforeLeave(el: Element) {
    getElement(el).style.display = 'none';
  }
</script>
