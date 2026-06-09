<template>
  <sd-select class="sd:w-80" placeholder="Please select ..." loading :options="options" />
</template>

<script setup lang="ts">
  const options = ['Beijing', 'Shanghai', 'Guangzhou', { label: 'Disabled', disabled: true }];
</script>
