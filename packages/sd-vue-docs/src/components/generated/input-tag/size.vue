<template>
  <sd-space direction="vertical" size="large">
    <sd-radio-group type="button" v-model="size">
      <sd-radio value="mini">mini</sd-radio>
      <sd-radio value="small">small</sd-radio>
      <sd-radio value="medium">medium</sd-radio>
      <sd-radio value="large">large</sd-radio>
    </sd-radio-group>
    <sd-input-tag
      :default-value="['one']"
      class="sd:w-80"
      placeholder="Please enter something"
      :size="size"
      allow-clear
    />
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const size = ref('medium');
</script>
