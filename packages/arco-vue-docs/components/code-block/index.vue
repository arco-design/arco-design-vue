<template>
  <section class="code-block">
    <anchor-head :level="2" :href="$attrs.id">{{ title }}</anchor-head>
    <slot name="description" />
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import AnchorHead from '../anchor-head/index.vue';
import { articleInjectionKey } from '../article/context';

export default defineComponent({
  name: 'CodeBlock',
  components: {
    AnchorHead,
  },
  props: {
    title: String,
  },
  setup(props, { attrs }) {
    const articleCtx = inject(articleInjectionKey);

    articleCtx?.addAnchor({
      href: `#${attrs.id}`,
      title: props.title,
    });
  },
});
</script>

<style scoped lang="less" src="./style.less" />
