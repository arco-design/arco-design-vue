<template>
  <div>
    <sd-split
      component="div"
      direction="horizontal"
      class="sd:h-50 sd:w-full sd:min-w-125 sd:border sd:border-solid"
      :style="{ borderColor: `var(${getCssVarToken('--color-border')})` }"
      v-model:size="size"
      :default-size="0.5"
      min="80px"
      :max="undefined"
      :disabled="false"
    >
      <template #first>
        <sd-typography-paragraph>Left</sd-typography-paragraph>
      </template>
      <template #second>
        <sd-typography-paragraph>Right</sd-typography-paragraph>
      </template>
    </sd-split>
  </div>
</template>
<script setup lang="ts">
  import { shallowRef } from 'vue';

  import { getCssVarToken } from '@sdata/web-vue';

  const size = shallowRef(0.5);
</script>
