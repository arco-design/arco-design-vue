<template>
  <div
    class="sd:flex sd:w-full sd:box-border sd:p-10"
    :style="{ backgroundColor: `var(${getCssVarToken('--color-fill-2')})` }"
  >
    <sd-card class="sd:w-90" title="SD Card" :bordered="false">
      <template #extra>
        <sd-link>More</sd-link>
      </template>
      Card content
      <br />
      Card content
    </sd-card>
    <sd-card class="sd:w-90 sd:ml-6" title="Hover me" hoverable :bordered="false">
      <template #extra>
        <sd-link>More</sd-link>
      </template>
      Card content
      <br />
      Card content
    </sd-card>
  </div>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
