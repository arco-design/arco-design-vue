<template>
  <sd-comment
    align="right"
    author="Balzac"
    avatar="https://picsum.photos/1000/1000"
    content="A design is a plan or specification for the construction of an object
          or system or for the implementation of an activity or process, or the
          result of that plan or specification in the form of a prototype,
          product or process."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <sd-comment align="right" avatar="https://picsum.photos/1000/1000">
      <template #actions>
        <sd-button key="0" type="secondary"> Cancel </sd-button>
        <sd-button key="1" type="primary"> Reply </sd-button>
      </template>
      <template #content>
        <sd-input placeholder="Here is you content." />
      </template>
    </sd-comment>
  </sd-comment>
</template>

<script setup lang="ts">
  import { IconMessage } from '@sdata/web-vue/es/icon/index.js';
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
