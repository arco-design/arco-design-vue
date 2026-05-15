<template>
  <sd-input-number
    v-model="value"
    placeholder="Please Enter"
    class="input-demo sd:w-80"
    :min="10"
    :max="100"
    model-event="input"
  />
  <div>value: {{ value }}</div>
</template>

<script setup lang="ts">
  import { shallowRef } from 'vue';

  const value = shallowRef(15);
</script>
