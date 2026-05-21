<template>
  <sd-transfer :data="data" :default-value="value">
    <template
      #source-title="{ countTotal, countSelected, checked, indeterminate, onSelectAllChange }"
    >
      <div class="sd:flex sd:items-center sd:justify-between sd:pr-2">
        Source Title {{ countSelected }}-{{ countTotal }}
        <sd-checkbox
          :model-value="checked"
          :indeterminate="indeterminate"
          @change="onSelectAllChange"
        />
      </div>
    </template>

    <template #target-title="{ countTotal, countSelected, onClear }">
      <div class="sd:flex sd:items-center sd:justify-between sd:pr-2">
        Target Title {{ countSelected }}-{{ countTotal }}
        <IconDelete @click="onClear" />
      </div>
    </template>
  </sd-transfer>
</template>

<script setup lang="ts">
  import { IconDelete } from '@sdata/web-vue/es/icon/index.js';

  const data = Array(8)
    .fill(undefined)
    .map((_, index) => ({
      value: `option${index + 1}`,
      label: `Option ${index + 1}`,
    }));

  const value = ['option1', 'option3', 'option5'];
</script>
