<template>
  <sd-card class="sd:w-90">
    <template #actions>
      <span class="icon-hover"> <IconThumbUp /> </span>
      <span class="icon-hover"> <IconShareInternal /> </span>
      <span class="icon-hover"> <IconMore /> </span>
    </template>
    <template #cover>
      <div class="sd:h-51 sd:overflow-hidden">
        <img
          class="sd:w-full sd:-translate-y-5"
          alt="dessert"
          src="https://picsum.photos/1260/840"
        />
      </div>
    </template>
    <sd-card-meta title="Card Title" description="This is the description">
      <template #avatar>
        <div class="sd:flex sd:items-center sd:text-[#1d2129]">
          <sd-avatar :size="24" class="sd:mr-2"> A </sd-avatar>
          <sd-typography-text>Username</sd-typography-text>
        </div>
      </template>
    </sd-card-meta>
  </sd-card>
</template>

<script setup lang="ts">
  import { IconThumbUp, IconShareInternal, IconMore } from '@sdata/web-vue/es/icon/index.js';
</script>
<style scoped>
  .icon-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.1s;
  }

  .icon-hover:hover {
    background-color: rgb(var(--gray-2));
  }
</style>
