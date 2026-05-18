<template>
  <sd-tag-group :options="options" :max-count="2" />
</template>

<script setup lang="ts">
  const options = ['运行中', '高优先级', '数据库', '已同步'];
</script>
