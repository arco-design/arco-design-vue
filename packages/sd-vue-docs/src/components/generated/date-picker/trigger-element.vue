<template>
  <sd-space>
    <sd-date-picker class="sd:w-67" v-model="value">
      <sd-button>{{ value || '请选择日期' }}</sd-button>
    </sd-date-picker>
    <sd-range-picker class="sd:w-67" v-model="rangeValue">
      <sd-button>{{ (rangeValue && rangeValue.join(' - ')) || '请选择日期范围' }}</sd-button>
    </sd-range-picker>
  </sd-space>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref();
  const rangeValue = ref();
</script>
