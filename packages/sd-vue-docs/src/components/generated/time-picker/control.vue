<template>
  <sd-time-picker class="sd:w-48.5" v-model="value" />
</template>
<script setup lang="ts">
  import type { TimeValue } from '@sdata/web-vue';

  import { shallowRef } from 'vue';

  const value = shallowRef<TimeValue | undefined>();
</script>
