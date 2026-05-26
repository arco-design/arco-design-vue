<template>
  <sd-comment
    author="Socrates"
    avatar="https://picsum.photos/1000/1000"
    content="Comment body content."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <sd-comment
      author="Balzac"
      avatar="https://picsum.photos/1000/1000"
      content="Comment body content."
      datetime="1 hour"
    >
      <template #actions>
        <span class="action"> <IconMessage /> Reply </span>
      </template>
      <sd-comment
        author="Austen"
        avatar="https://picsum.photos/1000/1000"
        content="Reply content"
        datetime="1 hour"
      >
        <template #actions>
          <span class="action"> <IconMessage /> Reply </span>
        </template>
      </sd-comment>
      <sd-comment
        author="Plato"
        avatar="https://picsum.photos/1000/1000"
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
