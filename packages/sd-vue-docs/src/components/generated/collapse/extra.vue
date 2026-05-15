<template>
  <sd-collapse>
    <sd-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1">
      <template #extra>
        <icon-copy />
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </sd-collapse-item>
    <sd-collapse-item header="Beijing Toutiao Technology Co., Ltd." :key="2">
      <template #extra>
        <sd-button type="primary" size="mini" @click.stop="sayHello">hello</sd-button>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </sd-collapse-item>
    <sd-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
      <template #extra>
        <sd-tag size="small">city</sd-tag>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </sd-collapse-item>
  </sd-collapse>
</template>

<script setup lang="ts">
  import { Message } from '@sdata/web-vue';

  const sayHello = () => {
    Message.info('hello');
  };
</script>
