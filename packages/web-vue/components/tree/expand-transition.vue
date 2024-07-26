<template>
  <transition
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
      onEnter(el: HTMLDivElement) {
        const endHeight = `${el.scrollHeight}px`;
        el.style.height = props.expanded ? '0' : endHeight;
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight;
        el.style.height = props.expanded ? endHeight : '0';
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
