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
    // TransitionProps 的钩子参数类型是 Element，这里统一断言为 HTMLElement
    const html = (el: Element) => el as HTMLElement;
    return {
      onEnter(el: Element) {
        const endHeight = `${html(el).scrollHeight}px`;
        html(el).style.height = props.expanded ? '0' : endHeight;
        // eslint-disable-next-line no-unused-expressions
        html(el).offsetHeight;
        html(el).style.height = props.expanded ? endHeight : '0';
      },
      onAfterEnter(el: Element) {
        html(el).style.height = props.expanded ? '' : '0';
        emit('end');
      },
      onBeforeLeave(el: Element) {
        html(el).style.display = 'none';
      },
    };
  },
});
</script>
