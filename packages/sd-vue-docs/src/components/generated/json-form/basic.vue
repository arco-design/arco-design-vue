<template>
  <sd-json-form v-model="formState" :schemas="schemas" />

  <sd-alert type="info"> 当前数据：{{ JSON.stringify(formState) }} </sd-alert>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import { defineJsonFormSchemas } from '@sdata/web-vue';

  const formState = ref({
    name: '',
    city: '',
    bio: '',
  });

  const createSchemas = defineJsonFormSchemas();
  const schemas = createSchemas([
    {
      field: 'name',
      label: '姓名',
      type: 'input',
      required: true,
    },
    {
      field: 'city',
      label: '城市',
      type: 'select',
      componentProps: {
        options: [
          { label: '上海', value: 'shanghai' },
          { label: '杭州', value: 'hangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
      },
    },
    {
      field: 'bio',
      label: '简介',
      type: 'textarea',
    },
  ]);
</script>

<style scoped>
  :deep(.sd-alert) {
    margin-top: 16px;
  }
</style>
