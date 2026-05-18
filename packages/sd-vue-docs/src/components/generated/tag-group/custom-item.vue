<template>
  <sd-tag-group :options="options" :max-count="2">
    <template #item="{ data, itemClass, itemStyle }">
      <sd-link :class="itemClass" :style="itemStyle" :href="data.href">
        {{ data.label }}
      </sd-link>
    </template>
  </sd-tag-group>
</template>

<script setup lang="ts">
  const options = [
    { label: '监控看板', value: 'dashboard', href: '/dashboard' },
    { label: '告警中心', value: 'alert', href: '/alert' },
    { label: '排障手册', value: 'playbook', href: '/playbook' },
  ];
</script>
