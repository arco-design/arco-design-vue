<template>
  <sd-space>
    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      :options="options"
    >
      <template #header>
        <div class="sd:py-1.5 sd:px-3">
          <sd-checkbox value="1">全选</sd-checkbox>
        </div>
      </template>
    </sd-select>

    <sd-select
      :default-value="'Beijing'"
      class="sd:w-90"
      placeholder="Please select ..."
      multiple
      show-header-on-empty
      :options="options"
    >
      <template #header>
        <div class="sd:py-1.5 sd:px-3">
          <sd-checkbox value="1">全选</sd-checkbox>
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
