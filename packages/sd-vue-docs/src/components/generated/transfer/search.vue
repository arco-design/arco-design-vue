<template>
  <sd-transfer
    show-search
    :data="data"
    :default-value="value"
    :source-input-search-props="{
      placeholder: 'source item search',
    }"
    :target-input-search-props="{
      placeholder: 'target item search',
    }"
  />
</template>

<script setup lang="ts">
  import type { TransferItem, TreeNodeData } from '@sdata/web-vue';

  const data = Array(8)
    .fill(undefined)
    .map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`,
    }));
  const value = ['option1', 'option3', 'option5'];
</script>
