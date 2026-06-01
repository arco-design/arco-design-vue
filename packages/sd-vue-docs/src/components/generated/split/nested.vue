<template>
  <div>
    <sd-split
      component="div"
      direction="horizontal"
      class="sd:h-50 sd:w-full sd:min-w-125 sd:border sd:border-solid"
      :style="{ borderColor: `var(${getCssVarToken('--color-border')})` }"
      :size="undefined"
      :default-size="0.5"
      :min="undefined"
      :max="undefined"
      :disabled="false"
    >
      <template #first>
        <sd-typography-paragraph>Left</sd-typography-paragraph>
      </template>
      <template #second>
        <div>
          <sd-split
            component="div"
            direction="vertical"
            class="sd:h-50"
            :size="undefined"
            :default-size="0.5"
            :min="undefined"
            :max="undefined"
            :disabled="false"
          >
            <template #first><sd-typography-paragraph>Top</sd-typography-paragraph></template>
            <template #second><sd-typography-paragraph>Bottom</sd-typography-paragraph></template>
          </sd-split>
        </div>
      </template>
    </sd-split>
  </div>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
