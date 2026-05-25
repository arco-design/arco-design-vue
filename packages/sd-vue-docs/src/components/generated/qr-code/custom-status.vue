<template>
  <div class="sd:flex sd:flex-wrap sd:gap-6">
    <QrCode :value="value" status="loading">
      <template #status>
        <div class="sd:flex sd:flex-col sd:items-center sd:gap-2">
          <Spin dot :size="20" />
          <span class="sd:text-sm">正在生成中</span>
        </div>
      </template>
    </QrCode>

    <QrCode :value="value" status="expired">
      <template #status="{ onRefresh }">
        <div class="sd:flex sd:flex-col sd:items-center sd:gap-2">
          <span class="sd:text-sm sd:text-(--sd-color-danger-6)">登录码已失效</span>
          <Button type="text" size="small" @click="onRefresh">立即刷新</Button>
        </div>
      </template>
    </QrCode>
  </div>
</template>

<script setup>
  import { Button, QrCode, Spin } from '@sdata/web-vue';

  const value = 'https://sd.design/vue';
</script>
