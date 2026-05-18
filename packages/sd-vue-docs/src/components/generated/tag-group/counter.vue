<template>
  <sd-tag-group :options="options" :max-count="2">
    <template #counter="{ hiddenCount, counterClass }">
      <span :class="counterClass">还有 {{ hiddenCount }} 项</span>
    </template>
  </sd-tag-group>
</template>

<script setup lang="ts">
  const options = ['运行中', '高优先级', '数据库', '已同步'];
</script>
