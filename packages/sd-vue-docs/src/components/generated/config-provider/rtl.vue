<template>
  <div>
    <sd-switch v-model="rtlType" class="sd:mb-5">
      <template #checked> RTL </template>
      <template #unchecked> LTR </template>
    </sd-switch>
    <sd-config-provider :rtl="rtlType">
      <sd-tabs :default-active-key="2" class="sd:mb-5">
        <sd-tab-pane v-for="i in 36" :key="i" :title="`Tab ${i}`">
          Content of Tab Panel {{ i }}
        </sd-tab-pane>
      </sd-tabs>
      <sd-space :direction="'vertical'" class="sd:w-full">
        <sd-space :size="40">
          <sd-badge :count="9">
            <sd-avatar shape="square" />
          </sd-badge>
          <sd-badge :count="9" dot :dotStyle="{ width: '10px', height: '10px' }">
            <sd-avatar shape="square" />
          </sd-badge>
          <sd-badge :dotStyle="{ height: '16px', width: '16px', fontSize: '14px' }">
            <template #content>
              <IconClockCircle class="sd:align-middle sd:text-[var(--color-text-2)]" />
            </template>
            <sd-avatar shape="square" />
          </sd-badge>
          <sd-tag :color="'red'" closable>red</sd-tag>
          <sd-tag :color="'blue'" closable>blue</sd-tag>
          <sd-tag :color="'green'" closable>green</sd-tag>
        </sd-space>
      </sd-space>
    </sd-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const rtlType = ref(true);
</script>
