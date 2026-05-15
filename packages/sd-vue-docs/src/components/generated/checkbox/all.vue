<template>
  <sd-space direction="vertical">
    <sd-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll"
      >Check All
    </sd-checkbox>
    <sd-checkbox-group v-model="data" @change="handleChange">
      <sd-checkbox value="1">Option 1</sd-checkbox>
      <sd-checkbox value="2">Option 2</sd-checkbox>
      <sd-checkbox value="3">Option 3</sd-checkbox>
    </sd-checkbox-group>
  </sd-space>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const indeterminate = ref(false);
  const checkedAll = ref(false);
  const data = ref<string[]>([]);

  const handleChangeAll = (value: boolean | (string | number | boolean)[], _event: Event) => {
    const checked = Array.isArray(value) ? value.length > 0 : value;

    indeterminate.value = false;
    if (checked) {
      checkedAll.value = true;
      data.value = ['1', '2', '3'];
    } else {
      checkedAll.value = false;
      data.value = [];
    }
  };

  const handleChange = (values: (string | number | boolean)[], _event: Event) => {
    if (values.length === 3) {
      checkedAll.value = true;
      indeterminate.value = false;
    } else if (values.length === 0) {
      checkedAll.value = false;
      indeterminate.value = false;
    } else {
      checkedAll.value = false;
      indeterminate.value = true;
    }
  };
</script>
