<template>
  <div class="sd:flex sd:flex-wrap sd:gap-6">
    <sd-qr-code :value="value" status="loading">
      <template #status>
        <div class="sd:flex sd:flex-col sd:items-center sd:gap-2">
          <sd-spin dot :size="20" />
          <span class="sd:text-sm">正在生成中</span>
        </div>
      </template>
    </sd-qr-code>

    <sd-qr-code :value="value" status="expired">
      <template #status="{ onRefresh }">
        <div class="sd:flex sd:flex-col sd:items-center sd:gap-2">
          <span class="sd:text-sm sd:text-(--sd-color-danger-6)">登录码已失效</span>
          <sd-button type="text" size="small" @click="onRefresh">立即刷新</sd-button>
        </div>
      </template>
    </sd-qr-code>
  </div>
</template>

<script setup>
  const value = 'https://sd-design.js.org';
</script>
