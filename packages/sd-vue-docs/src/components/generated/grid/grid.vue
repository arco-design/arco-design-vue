<template>
  <div class="sd:mb-5">
    <sd-typography-text>折叠：</sd-typography-text>
    <sd-switch :checked="collapsed" @click="collapsed = !collapsed" />
  </div>
  <sd-grid :cols="3" :colGap="12" :rowGap="16" class="grid-demo-grid" :collapsed="collapsed">
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item" :offset="1">item | offset - 1</sd-grid-item>
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item" :span="3">item | span - 3</sd-grid-item>
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item">item</sd-grid-item>
    <sd-grid-item class="demo-item" suffix #="{ overflow }">
      suffix | overflow: {{ overflow }}
    </sd-grid-item>
  </sd-grid>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const collapsed = ref(false);
</script>

<style scoped>
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 48px;
    color: var(--color-white);
    line-height: 48px;
    text-align: center;
  }

  .grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgb(var(--sdblue-6), 0.9);
  }

  .grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
</style>
