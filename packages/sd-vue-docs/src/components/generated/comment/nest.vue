<template>
  <sd-comment
    author="Socrates"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    content="Comment body content."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <sd-comment
      author="Balzac"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
      content="Comment body content."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <sd-comment
        author="Austen"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
        content="Reply content"
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
      </sd-comment>
      <sd-comment
        author="Plato"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        content="Reply content"
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
      </sd-comment>
    </sd-comment>
  </sd-comment>
</template>

<script setup lang="ts">
  import { IconHeart, IconMessage, IconStar } from '@sdata/web-vue/es/icon/index.js';
</script>

<style scoped>
  .action {
    display: inline-block;
    padding: 0 4px;
    color: var(--color-text-1);
    line-height: 24px;
    background: transparent;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.1s ease;
  }

  .action:hover {
    background: var(--color-fill-3);
  }
</style>
