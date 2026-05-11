<template>
  <transition @enter="onEnter" @after-enter="onAfterEnter" @before-leave="onBeforeLeave">
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
      const getElement = (el: Element) => el as HTMLDivElement;

      return {
        onEnter(el: Element) {
          const target = getElement(el);
          const endHeight = `${target.scrollHeight}px`;
          target.style.height = props.expanded ? '0' : endHeight;
          // oxlint-disable-next-line no-unused-expressions
          target.getBoundingClientRect();
          target.style.height = props.expanded ? endHeight : '0';
        },
        onAfterEnter(el: Element) {
          const target = getElement(el);
          target.style.height = props.expanded ? '' : '0';
          emit('end');
        },
        onBeforeLeave(el: Element) {
          getElement(el).style.display = 'none';
        },
      };
    },
  });
</script>
