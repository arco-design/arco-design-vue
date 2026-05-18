<template>
  <sd-space direction="vertical" size="large">
    <sd-input-number
      v-model="stringValue"
      mode="button"
      allow-clear
      placeholder="请输入数字"
      class="input-demo sd:w-80"
    />
    <div>当前值：{{ stringValue === '' ? '空字符串' : stringValue }}</div>
    <div>值类型：{{ typeof stringValue }}</div>
  </sd-space>
</template>

<script setup lang="ts">
  import { shallowRef } from 'vue';

  const stringValue = shallowRef('12');
</script>
