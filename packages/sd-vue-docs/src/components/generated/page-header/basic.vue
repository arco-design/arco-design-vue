<template>
  <div class="sd:p-7" :style="{ backgroundColor: `var(${getCssVarToken('--color-fill-2')})` }">
    <sd-page-header
      :style="{ backgroundColor: `var(${getCssVarToken('--color-bg-2')})` }"
      title="SD Design"
      subtitle="SD Design Vue"
    >
      <template #extra>
        <sd-radio-group type="button" default-value="large">
          <sd-radio value="mini">Mini</sd-radio>
          <sd-radio value="small">Small</sd-radio>
          <sd-radio value="large">Large</sd-radio>
        </sd-radio-group>
      </template>
    </sd-page-header>
  </div>
</template>

<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
