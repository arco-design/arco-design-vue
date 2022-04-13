<template>
  <section class="code-block">
    <h2 class="article-head-level">
      <a class="article-head-anchor" :href="`#${$attrs.id}`"><icon-link /></a>
      {{ title }}
    </h2>
    <slot name="description" />
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { articleInjectionKey } from '../article/context';

export default defineComponent({
  name: 'CodeBlock',
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
