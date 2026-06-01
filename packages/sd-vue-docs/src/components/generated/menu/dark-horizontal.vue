<template>
  <div class="menu-demo">
    <sd-menu mode="horizontal" theme="dark" :default-selected-keys="['1']">
      <sd-menu-item key="0" class="sd:mr-[38px] sd:p-0" disabled>
        <div
          class="sd:h-[30px] sd:w-20 sd:cursor-text"
          :style="{ backgroundColor: `var(${getCssVarToken('--color-fill-3')})` }"
        />
      </sd-menu-item>
      <sd-menu-item key="1">Home</sd-menu-item>
      <sd-menu-item key="2">Solution</sd-menu-item>
      <sd-menu-item key="3">Cloud Service</sd-menu-item>
      <sd-menu-item key="4">Cooperation</sd-menu-item>
    </sd-menu>
  </div>
</template>
<script setup>
  import { getCssVarToken } from '@sdata/web-vue';
</script>
<style scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    padding: 40px;
    background-color: var(--sd-color-neutral-2);
  }
</style>
