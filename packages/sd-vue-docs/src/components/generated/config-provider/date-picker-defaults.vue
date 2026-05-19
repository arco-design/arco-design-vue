<template>
  <sd-config-provider :date-picker="datePickerDefaults">
    <div class="config-provider-date-picker-demo">
      <sd-date-picker v-model="dateValue" show-time class="sd:w-52" />
      <sd-range-picker v-model="rangeValue" show-time class="sd:w-88" />
      <sd-range-picker v-model="monthRangeValue" mode="month" class="sd:w-88" />
    </div>
  </sd-config-provider>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import type { ConfigProviderDatePicker } from '../../../../../web-vue/components/config-provider/context';

  const dateValue = ref('2026-04-16 08:00:00');
  const rangeValue = ref(['2026-04-16 08:00:00', '2026-04-18 18:00:00']);
  const monthRangeValue = ref(['2026-04', '2026-09']);

  const datePickerDefaults = {
    shortcuts: [
      {
        label: '今天',
        value: () => new Date(),
      },
      {
        label: '7 天后',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date;
        },
      },
      {
        label: '30 天后',
        value: () => {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          return date;
        },
      },
    ],
    shortcutsPosition: 'right',
    previewShortcut: true,
    showConfirmBtn: true,
    showNowBtn: false,
    dayStartOfWeek: 1,
    abbreviation: false,
  } satisfies ConfigProviderDatePicker;
</script>

<style scoped>
  .config-provider-date-picker-demo {
    display: grid;
    gap: 12px;
  }
</style>
