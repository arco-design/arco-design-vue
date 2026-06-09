<template>
  <sd-space>
    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      allow-search
      :options="options"
    >
      <template #footer>
        <div class="sd:py-1.5 sd:text-center">
          <sd-button>Click Me</sd-button>
        </div>
      </template>
    </sd-select>
    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      allow-search
      show-footer-on-empty
      :options="options"
    >
      <template #footer>
        <div class="sd:py-1.5 sd:text-center">
          <sd-button>Click Me</sd-button>
        </div>
      </template>
    </sd-select>
  </sd-space>
</template>

<script setup lang="ts">
  const options = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    { label: 'Disabled', disabled: true },
    'Shenzhen',
    'Wuhan',
  ];
</script>
